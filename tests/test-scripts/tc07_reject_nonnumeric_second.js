const { runTestCaseScript, calculate } = require('./test_runner_base.js');

runTestCaseScript('TC-07', 'Reject nonnumeric second operand', page => {
  const elements = calculate(page, '2', 'abc');
  return { ok: elements.errorMsgField.innerHTML === 'Number 2 is not a number' && elements.numberAnswerField.value === '', actual: `error=${elements.errorMsgField.innerHTML || '(blank)'}; answer=${elements.numberAnswerField.value || '(blank)'}` };
});
