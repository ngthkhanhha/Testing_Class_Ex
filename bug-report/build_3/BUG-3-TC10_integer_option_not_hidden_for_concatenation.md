# Bug Report: BUG-3-TC10 - Integer option not hidden for concatenation

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-3-TC10` |
| **Build** | 3 |
| **Test Case ID** | TC-10 |
| **Module / Area** | Operation state |
| **Priority / Severity** | P2 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-10** on **Build 3**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 3** from the **Build** dropdown.
3. Perform test input: `Choose Concatenate operation`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
Integer option checkbox and label are hidden and unchecked
```

### 4. Actual Result
```text
hidden=false; checked=false
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Operation state module on Build 3.
- **Observed Behavior**: `hidden=false; checked=false`.
