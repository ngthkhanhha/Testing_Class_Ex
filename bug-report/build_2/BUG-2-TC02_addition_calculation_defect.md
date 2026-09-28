# Bug Report: BUG-2-TC02 - Addition calculation defect

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-2-TC02` |
| **Build** | 2 |
| **Test Case ID** | TC-02 |
| **Module / Area** | Arithmetic |
| **Priority / Severity** | P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-02** on **Build 2**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 2** from the **Build** dropdown.
3. Perform test input: `7 + 3 (Operation: Add)`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
10
```

### 4. Actual Result
```text
73
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Arithmetic module on Build 2.
- **Observed Behavior**: `73`.
