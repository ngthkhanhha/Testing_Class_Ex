const { runTestCaseScript, calculate, equal } = require('./test_runner_base.js');

runTestCaseScript('TC-03', 'Subtraction 7 - 3 = 4', page => equal(calculate(page, '7', '3', '1').numberAnswerField.value, 4));
