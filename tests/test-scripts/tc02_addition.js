const { runTestCaseScript, calculate, equal } = require('./test_runner_base.js');

runTestCaseScript('TC-02', 'Addition 7 + 3 = 10', page => equal(calculate(page, '7', '3').numberAnswerField.value, 10));
