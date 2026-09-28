# Bug Report: BUG-9-TC15 - Calculator controls hidden or disabled

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-9-TC15` |
| **Build** | 9 |
| **Test Case ID** | TC-15 |
| **Module / Area** | Build state |
| **Priority / Severity** | P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-15** on **Build 9**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 9** from the **Build** dropdown.
3. Perform test input: `Select build and inspect page controls`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
Operands and Calculate button are visible and enabled
```

### 4. Actual Result
```text
number2Hidden=true; calculateHidden=true
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Build state module on Build 9.
- **Observed Behavior**: `number2Hidden=true; calculateHidden=true`.
