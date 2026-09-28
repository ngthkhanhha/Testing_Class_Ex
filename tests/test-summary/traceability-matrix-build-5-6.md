# Traceability Matrix - Build 5 and Build 6

> Requirement IDs are not defined in the supplied general test cases. This matrix therefore traces each test case to its execution result and related local bug report.

| Test Case ID | Module | Build 5 Result | Build 5 Related Bug | Build 6 Result | Build 6 Related Bug |
|---|---|---|---|---|---|
| TC-01 | Build selection | Pass | | Pass | |
| TC-02 | Arithmetic | Pass | | Pass | |
| TC-03 | Arithmetic | Pass | | Pass | |
| TC-04 | Arithmetic | Pass | | Pass | |
| TC-05 | Arithmetic | Pass | | Pass | |
| TC-06 | Validation | Pass | | Pass | |
| TC-07 | Validation | Pass | | Pass | |
| TC-08 | Division | Fail | [BUG-5-TC08](../bug-report/build_5/BUG-5-TC08_division_by_zero_handling_and_control_recovery_failure.md) | Fail | [BUG-6-TC08](../bug-report/build_6/BUG-6-TC08_division_by_zero_handling_and_control_recovery_failure.md) |
| TC-09 | Concatenation | Pass | | Pass | |
| TC-10 | Operation state | Pass | | Pass | |
| TC-11 | Operation state | Pass | | Pass | |
| TC-12 | Formatting | Pass | | Pass | |
| TC-13 | Clear | Pass | | Pass | |
| TC-14 | Build state | Fail | [BUG-5-TC14](../bug-report/build_5/BUG-5-TC14_clear_button_remains_disabled.md) | Pass | |
| TC-15 | Build state | Pass | | Pass | |

## Summary

| Build | Total | Pass | Fail | Pass Rate |
|---|---:|---:|---:|---:|
| Build 5 | 15 | 13 | 2 | 86.7% |
| Build 6 | 15 | 14 | 1 | 93.3% |
