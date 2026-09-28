const { runTestCaseScript } = require('./test_runner_base.js');

runTestCaseScript('TC-14', 'Clear button enabled', page => ({ ok: !page.elements.clearButton.disabled, actual: `disabled=${page.elements.clearButton.disabled}` }));
