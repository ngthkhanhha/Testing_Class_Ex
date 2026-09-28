# Test Run Report - Build 5

- **Execution date:** 2026-09-28
- **Tester:** Automated test runner
- **Environment:** Basic Calculator web page; page JavaScript executed in the repository's isolated DOM model
- **Summary:** 13 passed, 2 failed, 15 total

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-01 | Build selection | Automated test runner | Pass |  | build=5; controlsVisible=true |
| TC-02 | Arithmetic | Hải | Pass |  | 10 |
| TC-03 | Arithmetic | Hải | Pass |  | 4 |
| TC-04 | Arithmetic | Hải | Pass |  | 21 |
| TC-05 | Arithmetic | Hải | Pass |  | 3.5 |
| TC-06 | Validation | Hải | Pass |  | error=Number 1 is not a number; answer=(blank) |
| TC-07 | Validation | Hải | Pass |  | error=Number 2 is not a number; answer=(blank) |
| TC-08 | Division | Hải | Fail | BUG-5-TC08 | error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false |
| TC-09 | Concatenation | Hải | Pass |  | foobar |
| TC-10 | Operation state | Hải | Pass |  | hidden=true; checked=false |
| TC-11 | Operation state | Hải | Pass |  | hidden=false; disabled=false |
| TC-12 | Formatting | Hảir | Pass |  | 3 |
| TC-13 | Clear |Hải | Pass |  | answer=(blank); error=(blank); checked=false |
| TC-14 | Build state | Hải | Fail | BUG-5-TC14 | disabled=true |
| TC-15 | Build state | Hải | Pass |  | number2Hidden=false; calculateHidden=false |
