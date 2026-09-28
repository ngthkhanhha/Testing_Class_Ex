const { runTestCaseScript, calculate } = require('./test_runner_base.js');

runTestCaseScript('TC-08', 'Reject division by zero and recover controls', page => {
  const elements = calculate(page, '7', '0', '3');
  const ok = elements.errorMsgField.innerHTML === 'Divide by zero error!' && elements.numberAnswerField.value === '' && !elements.calculateButton.disabled && elements.calculatingForm.hidden;
  return { ok, actual: `error=${elements.errorMsgField.innerHTML || '(blank)'}; answer=${elements.numberAnswerField.value || '(blank)'}` };
});
