const { runTestCaseScript, calculate, equal } = require('./test_runner_base.js');

runTestCaseScript('TC-04', 'Multiplication 7 * 3 = 21', page => equal(calculate(page, '7', '3', '2').numberAnswerField.value, 21));
