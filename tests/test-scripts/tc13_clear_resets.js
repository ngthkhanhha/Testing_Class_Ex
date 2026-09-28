const { runTestCaseScript, calculate } = require('./test_runner_base.js');

runTestCaseScript('TC-13', 'Clear resets answer, error, and integer option', page => {
  const { context, elements } = page;
  calculate(page, '7', '2', '3');
  elements.integerSelect.checked = true;
  context.clearAnswer();
  const ok = elements.numberAnswerField.value === '' && elements.errorMsgField.innerHTML === '' && !elements.integerSelect.checked;
  return { ok, actual: `answer=${elements.numberAnswerField.value || '(blank)'}; error=${elements.errorMsgField.innerHTML || '(blank)'}; checked=${elements.integerSelect.checked}` };
});
