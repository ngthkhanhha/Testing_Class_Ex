# Bug Report: BUG-4-TC05 - Division decimal result defect

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-4-TC05` |
| **Build** | 4 |
| **Test Case ID** | TC-05 |
| **Module / Area** | Arithmetic |
| **Priority / Severity** | P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-05** on **Build 4**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 4** from the **Build** dropdown.
3. Perform test input: `7 / 2 (Operation: Divide)`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
3.5
```

### 4. Actual Result
```text
3
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Arithmetic module on Build 4.
- **Observed Behavior**: `3`.
