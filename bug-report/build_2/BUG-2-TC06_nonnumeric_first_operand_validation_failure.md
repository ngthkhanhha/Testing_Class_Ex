# Bug Report: BUG-2-TC06 - Nonnumeric first operand validation failure

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-2-TC06` |
| **Build** | 2 |
| **Test Case ID** | TC-06 |
| **Module / Area** | Validation |
| **Priority / Severity** | P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-06** on **Build 2**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 2** from the **Build** dropdown.
3. Perform test input: `abc + 2`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
Error message identifies Number 1 is not a number; no answer produced
```

### 4. Actual Result
```text
error=(blank); answer=abc2
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Validation module on Build 2.
- **Observed Behavior**: `error=(blank); answer=abc2`.
