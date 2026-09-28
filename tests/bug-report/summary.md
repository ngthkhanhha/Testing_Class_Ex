# All Bug Reports Summary

Total Defective Cases Identified: **36**

| Bug ID | Build | Test Case ID | Module | Title | Priority | Actual Result |
|---|---|---|---|---|---|---|
| `BUG-PROTOTYPE-TC08` | Prototype | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-1-TC06` | 1 | TC-06 | Validation | Nonnumeric first operand validation failure | P1 | `error=(blank); answer=(blank)` |
| `BUG-1-TC07` | 1 | TC-07 | Validation | Nonnumeric second operand validation failure | P1 | `error=(blank); answer=(blank)` |
| `BUG-1-TC08` | 1 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-2-TC02` | 2 | TC-02 | Arithmetic | Addition calculation defect | P1 | `73` |
| `BUG-2-TC06` | 2 | TC-06 | Validation | Nonnumeric first operand validation failure | P1 | `error=(blank); answer=abc2` |
| `BUG-2-TC07` | 2 | TC-07 | Validation | Nonnumeric second operand validation failure | P1 | `error=(blank); answer=2abc` |
| `BUG-2-TC08` | 2 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-2-TC09` | 2 | TC-09 | Concatenation | Concatenate text operands defect | P1 | `` |
| `BUG-3-TC08` | 3 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-3-TC09` | 3 | TC-09 | Concatenation | Concatenate text operands defect | P1 | `` |
| `BUG-3-TC10` | 3 | TC-10 | Operation state | Integer option not hidden for concatenation | P2 | `hidden=false; checked=false` |
| `BUG-4-TC05` | 4 | TC-05 | Arithmetic | Division decimal result defect | P1 | `3` |
| `BUG-4-TC08` | 4 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-4-TC11` | 4 | TC-11 | Operation state | Integer option disabled for arithmetic operation | P2 | `hidden=false; disabled=true` |
| `BUG-5-TC08` | 5 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-5-TC14` | 5 | TC-14 | Build state | Clear button remains disabled | P2 | `disabled=true` |
| `BUG-6-TC08` | 6 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=(blank); answer=Infinity; calculateDisabled=false; calculatingHidden=true` |
| `BUG-7-TC02` | 7 | TC-02 | Arithmetic | Addition calculation defect | P1 | `3` |
| `BUG-7-TC03` | 7 | TC-03 | Arithmetic | Subtraction calculation defect | P1 | `-3` |
| `BUG-7-TC04` | 7 | TC-04 | Arithmetic | Multiplication calculation defect | P1 | `0` |
| `BUG-7-TC05` | 7 | TC-05 | Arithmetic | Division decimal result defect | P1 | `0` |
| `BUG-7-TC06` | 7 | TC-06 | Validation | Nonnumeric first operand validation failure | P1 | `error=(blank); answer=2` |
| `BUG-7-TC08` | 7 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-7-TC09` | 7 | TC-09 | Concatenation | Concatenate text operands defect | P1 | `bar` |
| `BUG-7-TC12` | 7 | TC-12 | Formatting | Integer toggle truncation defect | P2 | `0` |
| `BUG-8-TC03` | 8 | TC-03 | Arithmetic | Subtraction calculation defect | P1 | `-4` |
| `BUG-8-TC05` | 8 | TC-05 | Arithmetic | Division decimal result defect | P1 | `0.2857142857142857` |
| `BUG-8-TC06` | 8 | TC-06 | Validation | Nonnumeric first operand validation failure | P1 | `error=Number 2 is not a number; answer=(blank)` |
| `BUG-8-TC07` | 8 | TC-07 | Validation | Nonnumeric second operand validation failure | P1 | `error=Number 1 is not a number; answer=(blank)` |
| `BUG-8-TC08` | 8 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=(blank); answer=(blank); calculateDisabled=false; calculatingHidden=true` |
| `BUG-8-TC09` | 8 | TC-09 | Concatenation | Concatenate text operands defect | P1 | `barfoo` |
| `BUG-8-TC12` | 8 | TC-12 | Formatting | Integer toggle truncation defect | P2 | `0` |
| `BUG-9-TC01` | 9 | TC-01 | Build selection | Build selection hides calculator controls | P1 | `build=9; controlsVisible=false` |
| `BUG-9-TC08` | 9 | TC-08 | Division | Division by zero handling and control recovery failure | P1 | `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false` |
| `BUG-9-TC15` | 9 | TC-15 | Build state | Calculator controls hidden or disabled | P1 | `number2Hidden=true; calculateHidden=true` |
