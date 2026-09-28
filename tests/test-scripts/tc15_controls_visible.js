const { runTestCaseScript } = require('./test_runner_base.js');

runTestCaseScript('TC-15', 'Calculator controls remain visible and enabled', page => {
  const { elements } = page;
  const ok = !elements.number1Field.hidden && !elements.number2Field.hidden && !elements.calculateButton.hidden && !elements.number2Field.disabled && !elements.calculateButton.disabled;
  return { ok, actual: `number2Hidden=${elements.number1Field.hidden}; calculateHidden=${elements.calculateButton.hidden}` };
});
