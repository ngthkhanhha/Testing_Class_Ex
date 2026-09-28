const { runTestCaseScript } = require('./test_runner_base.js');

runTestCaseScript('TC-10', 'Concatenation hides and clears integer option', page => {
  const { context, elements } = page;
  elements.selectOperationDropdown.value = '4';
  context.operationChanged();
  const ok = elements.integerSelect.hidden && elements.intSelectionLabel.hidden && !elements.integerSelect.checked;
  return { ok, actual: `hidden=${elements.integerSelect.hidden}; checked=${elements.integerSelect.checked}` };
});
