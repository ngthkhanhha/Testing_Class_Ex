# Bug Report: BUG-7-TC03 - Subtraction calculation defect

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-7-TC03` |
| **Build** | 7 |
| **Test Case ID** | TC-03 |
| **Module / Area** | Arithmetic |
| **Priority / Severity** | P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-03** on **Build 7**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 7** from the **Build** dropdown.
3. Perform test input: `7 - 3 (Operation: Subtract)`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
4
```

### 4. Actual Result
```text
-3
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Arithmetic module on Build 7.
- **Observed Behavior**: `-3`.
