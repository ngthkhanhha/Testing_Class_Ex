# All Bug Reports Summary

Total Defective Cases Identified: **17**

| Bug ID | Build | Test Case ID | Module | Title | Priority | Actual Result |
|---|---|---|---|---|---|---|
| `BUG-1-TC06` | 1 | TC-06 | Validation | Nonnumeric first operand validation failure | P1 | `error=(blank); answer=(blank)` |
| `BUG-1-TC07` | 1 | TC-07 | Validation | Nonnumeric second operand validation failure | P1 | `error=(blank); answer=(blank)` |
| `BUG-1-TC08` | 1 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-2-TC02` | 2 | TC-02 | Arithmetic | Addition calculation defect | P1 | `73` |
| `BUG-2-TC06` | 2 | TC-06 | Validation | Nonnumeric first operand validation failure | P1 | `error=(blank); answer=abc2` |
| `BUG-2-TC07` | 2 | TC-07 | Validation | Nonnumeric second operand validation failure | P1 | `error=(blank); answer=2abc` |
| `BUG-2-TC08` | 2 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-2-TC09` | 2 | TC-09 | Concatenation | Concatenate text operands defect | P1 | `(blank)` |
| `BUG-3-TC08` | 3 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-3-TC09` | 3 | TC-09 | Concatenation | Concatenate text operands defect | P1 | `(blank)` |
| `BUG-3-TC10` | 3 | TC-10 | Operation state | Integer option not hidden for concatenation | P2 | `hidden=false; checked=false` |
| `BUG-4-TC05` | 4 | TC-05 | Arithmetic | Division decimal result defect | P1 | `3` |
| `BUG-4-TC08` | 4 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-4-TC11` | 4 | TC-11 | Operation state | Integer option disabled for arithmetic operation | P2 | `hidden=false; disabled=true` |
| `BUG-5-TC08` | 5 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-5-TC14` | 5 | TC-14 | Build state | Clear button remains disabled | P2 | `disabled=true` |
| `BUG-6-TC08` | 6 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=(blank); answer=Infinity; calculateDisabled=false; calculatingHidden=true` |
