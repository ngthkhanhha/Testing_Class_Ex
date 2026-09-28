const { runTestCaseScript, calculate, equal } = require('./test_runner_base.js');

runTestCaseScript('TC-05', 'Division 7 / 2 = 3.5', page => equal(calculate(page, '7', '2', '3').numberAnswerField.value, 3.5));
