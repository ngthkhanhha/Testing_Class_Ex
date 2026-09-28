# Test Run Report - Build 2

- **Execution date:** 2026-09-28
- **Tester:** Automated test runner
- **Environment:** Basic Calculator web page; page JavaScript executed in the repository's isolated DOM model
- **Summary:** 10 passed, 5 failed, 15 total

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-01 | Build selection | Automated test runner | Pass |  | build=2; controlsVisible=true |
| TC-02 | Arithmetic | Automated test runner | Fail | BUG-2-TC02 | 73 |
| TC-03 | Arithmetic | Automated test runner | Pass |  | 4 |
| TC-04 | Arithmetic | Automated test runner | Pass |  | 21 |
| TC-05 | Arithmetic | Automated test runner | Pass |  | 3.5 |
| TC-06 | Validation | Automated test runner | Fail | BUG-2-TC06 | error=(blank); answer=abc2 |
| TC-07 | Validation | Automated test runner | Fail | BUG-2-TC07 | error=(blank); answer=2abc |
| TC-08 | Division | Automated test runner | Fail | BUG-2-TC08 | error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false |
| TC-09 | Concatenation | Automated test runner | Fail | BUG-2-TC09 |  |
| TC-10 | Operation state | Automated test runner | Pass |  | hidden=true; checked=false |
| TC-11 | Operation state | Automated test runner | Pass |  | hidden=false; disabled=false |
| TC-12 | Formatting | Automated test runner | Pass |  | 3 |
| TC-13 | Clear | Automated test runner | Pass |  | answer=(blank); error=(blank); checked=false |
| TC-14 | Build state | Automated test runner | Pass |  | disabled=false |
| TC-15 | Build state | Automated test runner | Pass |  | number2Hidden=false; calculateHidden=false |
