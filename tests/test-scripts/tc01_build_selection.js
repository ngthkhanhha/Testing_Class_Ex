const { runTestCaseScript } = require('./test_runner_base.js');

runTestCaseScript('TC-01', 'Build selection and calculator controls', page => {
  const { context, elements } = page;
  const visible = !elements.number1Field.hidden && !elements.number2Field.hidden && !elements.calculateButton.hidden;
  return { ok: String(context.selectedBuild) === String(context.selectedBuild) && visible, actual: `build=${context.selectedBuild}; controlsVisible=${visible}` };
});
