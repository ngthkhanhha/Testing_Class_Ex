const { runTestCaseScript, calculate } = require('./test_runner_base.js');

runTestCaseScript('TC-06', 'Reject nonnumeric first operand', page => {
  const elements = calculate(page, 'abc', '2');
  return { ok: elements.errorMsgField.innerHTML === 'Number 1 is not a number' && elements.numberAnswerField.value === '', actual: `error=${elements.errorMsgField.innerHTML || '(blank)'}; answer=${elements.numberAnswerField.value || '(blank)'}` };
});
