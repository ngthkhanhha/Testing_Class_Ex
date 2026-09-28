const { runTestCaseScript, calculate, equal } = require('./test_runner_base.js');

runTestCaseScript('TC-09', 'Concatenate foo + bar = foobar', page => equal(calculate(page, 'foo', 'bar', '4').numberAnswerField.value, 'foobar'));
