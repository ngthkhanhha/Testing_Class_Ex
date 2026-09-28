const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const url = 'https://testsheepnz.github.io/BasicCalculator.html';
const outputPath = path.join(__dirname, '..', '..', 'calculator-test-results.csv');
let pageSource = '';

function createPage(build) {
  const ids = [
    'selectBuild', 'errorMsgField', 'calculateButton', 'clearButton',
    'calculatingForm', 'answerForm', 'selectOperationDropdown',
    'number1Field', 'number2Field', 'numberAnswerField', 'integerSelect',
    'intSelectionLabel'
  ];
  const elements = Object.fromEntries(ids.map(id => [id, {
    value: '', innerHTML: '', disabled: false, hidden: false, checked: false
  }]));
  elements.calculatingForm.hidden = true;
  elements.selectBuild.value = String(build);
  elements.selectOperationDropdown.value = '0';

  const start = pageSource.indexOf('var errorMsg = "";');
  const end = pageSource.indexOf('</script>', start);
  if (start < 0 || end < 0) throw new Error('Could not locate calculator script in downloaded page.');
  const context = {
    document: { getElementById: id => elements[id] },
    console: { log() {} },
    Math,
    isNaN,
    parseInt,
    setTimeout(callback) { callback(); }
  };
  vm.createContext(context);
  vm.runInContext(pageSource.slice(start, end), context, { timeout: 1000 });
  context.buildChanged();
  return { context, elements };
}

function runCase(build, id, description, check) {
  try {
    const result = check(createPage(build));
    return { build, id, description, status: result.ok ? 'PASS' : 'FAIL', actual: result.actual };
  } catch (error) {
    return { build, id, description, status: 'ERROR', actual: error.message };
  }
}

function calculate(page, first, second, operation = '0') {
  const { context, elements } = page;
  elements.number1Field.value = first;
  elements.number2Field.value = second;
  elements.selectOperationDropdown.value = operation;
  context.operationChanged();
  context.calculate();
  return elements;
}

function equal(actual, expected) {
  return { ok: String(actual) === String(expected), actual: String(actual) };
}

function runBuild(build) {
  return [
    runCase(build, 'TC-01', 'Build selection and calculator controls', page => {
      const { context, elements } = page;
      const visible = !elements.number1Field.hidden && !elements.number2Field.hidden && !elements.calculateButton.hidden;
      return { ok: String(context.selectedBuild) === String(build) && visible, actual: `build=${context.selectedBuild}; controlsVisible=${visible}` };
    }),
    runCase(build, 'TC-02', 'Addition 7 + 3 = 10', page => equal(calculate(page, '7', '3').numberAnswerField.value, 10)),
    runCase(build, 'TC-03', 'Subtraction 7 - 3 = 4', page => equal(calculate(page, '7', '3', '1').numberAnswerField.value, 4)),
    runCase(build, 'TC-04', 'Multiplication 7 * 3 = 21', page => equal(calculate(page, '7', '3', '2').numberAnswerField.value, 21)),
    runCase(build, 'TC-05', 'Division 7 / 2 = 3.5', page => equal(calculate(page, '7', '2', '3').numberAnswerField.value, 3.5)),
    runCase(build, 'TC-06', 'Reject nonnumeric first operand', page => {
      const elements = calculate(page, 'abc', '2');
      return { ok: elements.errorMsgField.innerHTML === 'Number 1 is not a number' && elements.numberAnswerField.value === '', actual: `error=${elements.errorMsgField.innerHTML || '(blank)'}; answer=${elements.numberAnswerField.value || '(blank)'}` };
    }),
    runCase(build, 'TC-07', 'Reject nonnumeric second operand', page => {
      const elements = calculate(page, '2', 'abc');
      return { ok: elements.errorMsgField.innerHTML === 'Number 2 is not a number' && elements.numberAnswerField.value === '', actual: `error=${elements.errorMsgField.innerHTML || '(blank)'}; answer=${elements.numberAnswerField.value || '(blank)'}` };
    }),
    runCase(build, 'TC-08', 'Reject division by zero and recover controls', page => {
      const elements = calculate(page, '7', '0', '3');
      const ok = elements.errorMsgField.innerHTML === 'Divide by zero error!' && elements.numberAnswerField.value === '' && !elements.calculateButton.disabled && elements.calculatingForm.hidden;
      return { ok, actual: `error=${elements.errorMsgField.innerHTML || '(blank)'}; answer=${elements.numberAnswerField.value || '(blank)'}; calculateDisabled=${elements.calculateButton.disabled}; calculatingHidden=${elements.calculatingForm.hidden}` };
    }),
    runCase(build, 'TC-09', 'Concatenate foo + bar = foobar', page => equal(calculate(page, 'foo', 'bar', '4').numberAnswerField.value, 'foobar')),
    runCase(build, 'TC-10', 'Concatenation hides and clears integer option', page => {
      const { context, elements } = page;
      elements.selectOperationDropdown.value = '4';
      context.operationChanged();
      const ok = elements.integerSelect.hidden && elements.intSelectionLabel.hidden && !elements.integerSelect.checked;
      return { ok, actual: `hidden=${elements.integerSelect.hidden}; checked=${elements.integerSelect.checked}` };
    }),
    runCase(build, 'TC-11', 'Arithmetic enables integer option', page => {
      const { context, elements } = page;
      elements.selectOperationDropdown.value = '0';
      context.operationChanged();
      return { ok: !elements.integerSelect.hidden && !elements.integerSelect.disabled, actual: `hidden=${elements.integerSelect.hidden}; disabled=${elements.integerSelect.disabled}` };
    }),
    runCase(build, 'TC-12', 'Integer toggle truncates 7 / 2 to 3', page => {
      const { context, elements } = page;
      calculate(page, '7', '2', '3');
      elements.integerSelect.checked = true;
      context.displayAnswer();
      return equal(elements.numberAnswerField.value, 3);
    }),
    runCase(build, 'TC-13', 'Clear resets answer, error, and integer option', page => {
      const { context, elements } = page;
      calculate(page, '7', '2', '3');
      elements.integerSelect.checked = true;
      context.clearAnswer();
      const ok = elements.numberAnswerField.value === '' && elements.errorMsgField.innerHTML === '' && !elements.integerSelect.checked;
      return { ok, actual: `answer=${elements.numberAnswerField.value || '(blank)'}; error=${elements.errorMsgField.innerHTML || '(blank)'}; checked=${elements.integerSelect.checked}` };
    }),
    runCase(build, 'TC-14', 'Clear button enabled', page => ({ ok: !page.elements.clearButton.disabled, actual: `disabled=${page.elements.clearButton.disabled}` })),
    runCase(build, 'TC-15', 'Calculator controls remain visible and enabled', page => {
      const { elements } = page;
      const ok = !elements.number1Field.hidden && !elements.number2Field.hidden && !elements.calculateButton.hidden && !elements.number2Field.disabled && !elements.calculateButton.disabled;
      return { ok, actual: `number2Hidden=${elements.number2Field.hidden}; calculateHidden=${elements.calculateButton.hidden}` };
    })
  ];
}

async function main() {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Page download failed: HTTP ${response.status}`);
  pageSource = await response.text();
  const results = Array.from({ length: 10 }, (_, build) => runBuild(build)).flat();
  const lines = ['Build,Test Case,Scenario,Status,Actual Result'];
  for (const result of results) {
    const values = [result.build === 0 ? 'Prototype' : result.build, result.id, result.description, result.status, result.actual];
    lines.push(values.map(value => `"${String(value).replaceAll('"', '""')}"`).join(','));
  }
  fs.writeFileSync(outputPath, `${lines.join('\n')}\n`);
  for (let build = 0; build < 10; build++) {
    const current = results.filter(result => result.build === build);
    const passed = current.filter(result => result.status === 'PASS').length;
    const failed = current.length - passed;
    console.log(`${build === 0 ? 'Prototype' : `Build ${build}`}: ${passed}/${current.length} PASS, ${failed} FAIL`);
    for (const result of current.filter(result => result.status !== 'PASS')) {
      console.log(`  ${result.status} ${result.id}: ${result.description} | ${result.actual}`);
    }
  }
  console.log(`Results saved to ${outputPath}`);

  // Automatically split build test cases & results into per-build files
  try {
    const { splitBuildTests } = require('./split_build_tests.js');
    splitBuildTests();
  } catch (err) {
    console.error('Error running splitBuildTests:', err.message);
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});

