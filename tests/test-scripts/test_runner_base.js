const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const url = 'https://testsheepnz.github.io/BasicCalculator.html';

const tcModuleMap = {
  'TC-01': 'Build selection',
  'TC-02': 'Arithmetic',
  'TC-03': 'Arithmetic',
  'TC-04': 'Arithmetic',
  'TC-05': 'Arithmetic',
  'TC-06': 'Validation',
  'TC-07': 'Validation',
  'TC-08': 'Division',
  'TC-09': 'Concatenation',
  'TC-10': 'Operation state',
  'TC-11': 'Operation state',
  'TC-12': 'Formatting',
  'TC-13': 'Clear',
  'TC-14': 'Build state',
  'TC-15': 'Build state'
};

let cachedPageSource = null;

async function getPageSource() {
  if (cachedPageSource) return cachedPageSource;
  let retries = 5;
  while (retries > 0) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        cachedPageSource = await response.text();
        return cachedPageSource;
      }
    } catch (err) {
      retries--;
      if (retries === 0) throw err;
      await new Promise(res => setTimeout(res, 500));
    }
  }
}

function createPage(pageSource, build) {
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

function safeWriteFileSync(filePath, content) {
  content = content.replace(/\r\n/g, '\n');
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (fs.existsSync(filePath)) {
    try {
      const existing = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
      if (existing === content) return;
    } catch (_) {}
  }
  let retries = 15;
  while (retries > 0) {
    try {
      fs.writeFileSync(filePath, content);
      return;
    } catch (err) {
      retries--;
      if (retries === 0) {
        console.warn(`Warning: Could not write ${filePath}: ${err.message}`);
        return;
      }
      try {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
      } catch (_) {}
    }
  }
}

function parseTargetBuilds() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    return [1, 2, 3, 4, 5, 6];
  }
  const rawArg = args[0].toLowerCase().replace(/^--build=/, '').replace(/^build_?/, '');
  const parsed = parseInt(rawArg, 10);
  if (!isNaN(parsed) && parsed >= 1 && parsed <= 6) {
    return [parsed];
  }
  console.warn(`Unknown build parameter "${args[0]}", running for all builds.`);
  return [1, 2, 3, 4, 5, 6];
}

async function runTestCaseScript(tcId, tcDescription, checkFn) {
  const pageSource = await getPageSource();
  const testRunsDir = path.join(__dirname, '..', 'test-runs');
  const buildsToRun = parseTargetBuilds();
  
  console.log(`Executing Script for ${tcId}: ${tcDescription} [Build(s): ${buildsToRun.join(', ')}]`);

  for (const build of buildsToRun) {
    const folderName = build === 0 ? 'prototype' : `build_${build}`;
    const buildFolder = path.join(testRunsDir, folderName);

    const page = createPage(pageSource, build);
    let ok = false;
    let actual = '';
    try {
      const res = checkFn(page);
      ok = res.ok;
      actual = res.actual;
    } catch (err) {
      ok = false;
      actual = err.message;
    }

    const resultStatus = ok ? 'Pass' : 'Fail';
    const moduleName = tcModuleMap[tcId] || 'General';

    // Header form requested: Test Case ID,Module,Tester,Result,Related Bug,Note
    const csvContent = [
      'Test Case ID,Module,Tester,Result,Related Bug,Note',
      `${tcId},${moduleName},,${resultStatus},,`
    ].join('\n') + '\n';

    const tcFilename = `${tcId.toLowerCase().replace('-', '')}.csv`;
    safeWriteFileSync(path.join(buildFolder, tcFilename), csvContent);
    console.log(`  [${folderName}] ${tcId}: ${resultStatus}`);
  }
}

module.exports = {
  createPage,
  calculate,
  equal,
  runTestCaseScript
};
