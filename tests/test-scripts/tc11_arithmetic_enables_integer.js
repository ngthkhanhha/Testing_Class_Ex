const { runTestCaseScript } = require('./test_runner_base.js');

runTestCaseScript('TC-11', 'Arithmetic enables integer option', page => {
  const { context, elements } = page;
  elements.selectOperationDropdown.value = '0';
  context.operationChanged();
  return { ok: !elements.integerSelect.hidden && !elements.integerSelect.disabled, actual: `hidden=${elements.integerSelect.hidden}; disabled=${elements.integerSelect.disabled}` };
});
