PS D:\project\Testing\InClassWeek2\Testing_Class_Ex> git log --graph --stat      
* commit 506e4a8bdccea0991d8959a233fc58ce3a13b9aa (HEAD -> main, origin/main, origin/HEAD)
| Author: XuXinhNo1 <khaihungpro2005@gmail.com>
| Date:   Mon Sep 28 19:38:39 2026 +0700
|
|     feat: add script to generate bug report
|
|  ...meric_first_operand_validation_failure.md |  36 ++++
|  ...eric_second_operand_validation_failure.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...BUG-2-TC02_addition_calculation_defect.md |  36 ++++
|  ...meric_first_operand_validation_failure.md |  36 ++++
|  ...eric_second_operand_validation_failure.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...-TC09_concatenate_text_operands_defect.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...-TC09_concatenate_text_operands_defect.md |  36 ++++
|  ...er_option_not_hidden_for_concatenation.md |  36 ++++
|  ...-4-TC05_division_decimal_result_defect.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...tion_disabled_for_arithmetic_operation.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...G-5-TC14_clear_button_remains_disabled.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...BUG-7-TC02_addition_calculation_defect.md |  36 ++++
|  ...-7-TC03_subtraction_calculation_defect.md |  36 ++++
|  ...TC04_multiplication_calculation_defect.md |  36 ++++
|  ...-7-TC05_division_decimal_result_defect.md |  36 ++++
|  ...meric_first_operand_validation_failure.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...-TC09_concatenate_text_operands_defect.md |  36 ++++
|  ...-TC12_integer_toggle_truncation_defect.md |  36 ++++
|  ...-8-TC03_subtraction_calculation_defect.md |  36 ++++
|  ...-8-TC05_division_decimal_result_defect.md |  36 ++++
|  ...meric_first_operand_validation_failure.md |  36 ++++
|  ...eric_second_operand_validation_failure.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...-TC09_concatenate_text_operands_defect.md |  36 ++++
|  ...-TC12_integer_toggle_truncation_defect.md |  36 ++++
|  ...ld_selection_hides_calculator_controls.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...calculator_controls_hidden_or_disabled.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  bug-report/summary.md                        |  42 ++++
|  ...meric_first_operand_validation_failure.md |  36 ++++
|  ...eric_second_operand_validation_failure.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...BUG-2-TC02_addition_calculation_defect.md |  36 ++++
|  ...meric_first_operand_validation_failure.md |  36 ++++
|  ...eric_second_operand_validation_failure.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...-TC09_concatenate_text_operands_defect.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...-TC09_concatenate_text_operands_defect.md |  36 ++++
|  ...er_option_not_hidden_for_concatenation.md |  36 ++++
|  ...-4-TC05_division_decimal_result_defect.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...tion_disabled_for_arithmetic_operation.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...G-5-TC14_clear_button_remains_disabled.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...BUG-7-TC02_addition_calculation_defect.md |  36 ++++
|  ...-7-TC03_subtraction_calculation_defect.md |  36 ++++
|  ...TC04_multiplication_calculation_defect.md |  36 ++++
|  ...-7-TC05_division_decimal_result_defect.md |  36 ++++
|  ...meric_first_operand_validation_failure.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...-TC09_concatenate_text_operands_defect.md |  36 ++++
|  ...-TC12_integer_toggle_truncation_defect.md |  36 ++++
|  ...-8-TC03_subtraction_calculation_defect.md |  36 ++++
|  ...-8-TC05_division_decimal_result_defect.md |  36 ++++
|  ...meric_first_operand_validation_failure.md |  36 ++++
|  ...eric_second_operand_validation_failure.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...-TC09_concatenate_text_operands_defect.md |  36 ++++
|  ...-TC12_integer_toggle_truncation_defect.md |  36 ++++
|  ...ld_selection_hides_calculator_controls.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  ...calculator_controls_hidden_or_disabled.md |  36 ++++
|  ..._handling_and_control_recovery_failure.md |  36 ++++
|  tests/bug-report/summary.md                  |  42 ++++
|  tests/test-scripts/generate_bug_reports.js   | 188 +++++++++++++++++
|  75 files changed, 2864 insertions(+)
|
* commit 323f0712fe270353fa7ce12dda573682f5a4b61a
| Author: XuXinhNo1 <khaihungpro2005@gmail.com>
| Date:   Mon Sep 28 19:38:13 2026 +0700
|
|     feat: split script to make one script for one test case
|
|  tests/test-scripts/run_all_test_scripts.js   |  54 +++++
|  tests/test-scripts/run_calculator_tests.js   |   2 +-
|  tests/test-scripts/split_build_tests.js      |   3 +-
|  tests/test-scripts/tc01_build_selection.js   |   7 +
|  tests/test-scripts/tc02_addition.js          |   3 +
|  tests/test-scripts/tc03_subtraction.js       |   3 +
|  tests/test-scripts/tc04_multiplication.js    |   3 +
|  tests/test-scripts/tc05_division.js          |   3 +
|  .../tc06_reject_nonnumeric_first.js          |   6 +
|  .../tc07_reject_nonnumeric_second.js         |   6 +
|  .../tc08_reject_division_by_zero.js          |   7 +
|  tests/test-scripts/tc09_concatenate.js       |   3 +
|  .../tc10_integer_option_hidden.js            |   9 +
|  .../tc11_arithmetic_enables_integer.js       |   8 +
|  tests/test-scripts/tc12_integer_toggle.js    |   9 +
|  tests/test-scripts/tc13_clear_resets.js      |  10 +
|  tests/test-scripts/tc14_clear_enabled.js     |   3 +
|  tests/test-scripts/tc15_controls_visible.js  |   7 +
|  tests/test-scripts/test_runner_base.js       | 178 +++++++++++++++++
|  tests/test-summary/summary.csv               |  11 +
|  tests/test-summary/summary.md                |  14 ++
|  21 files changed, 347 insertions(+), 2 deletions(-)
|
* commit 6d292a07e0ed8e9c778ee95ad5460f87495e49c6
| Author: XuXinhNo1 <khaihungpro2005@gmail.com>
| Date:   Mon Sep 28 14:58:25 2026 +0700
|
|     feat: divide test case by function, add test run for build 1-2
|
|  tests/test-cases/add/add_testcases.csv       |   2 +
|  tests/test-cases/all_testcases.csv           |  16 ++
|  .../concatenate/concatenate_testcases.csv    |   3 +
|  tests/test-cases/divide/divide_testcases.csv |   3 +
|  .../multiply/multiply_testcases.csv          |   2 +
|  .../subtract/subtract_testcases.csv          |   2 +
|  tests/test-runs/build_1/build_1.csv          |  16 ++
|  tests/test-runs/build_1/build_1.md           |  19 ++
|  tests/test-runs/build_2/build_2.csv          |  16 ++
|  tests/test-runs/build_2/build_2.md           |  19 ++
|  .../test-scripts/run_calculator_tests.js     |   9 +
|  tests/test-scripts/split_build_tests.js      | 249 +++++++++++++++++
|  12 files changed, 356 insertions(+)