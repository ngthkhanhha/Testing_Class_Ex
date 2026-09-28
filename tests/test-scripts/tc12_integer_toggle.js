const { runTestCaseScript, calculate, equal } = require('./test_runner_base.js');

runTestCaseScript('TC-12', 'Integer toggle truncates 7 / 2 to 3', page => {
  const { context, elements } = page;
  calculate(page, '7', '2', '3');
  elements.integerSelect.checked = true;
  context.displayAnswer();
  return equal(elements.numberAnswerField.value, 3);
});
