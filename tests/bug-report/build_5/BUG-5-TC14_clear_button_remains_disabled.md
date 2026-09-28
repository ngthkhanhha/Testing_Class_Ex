# Bug Report: BUG-5-TC14 - Clear button remains disabled

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-5-TC14` |
| **Build** | 5 |
| **Test Case ID** | TC-14 |
| **Module / Area** | Build state |
| **Priority / Severity** | P2 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-14** on **Build 5**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 5** from the **Build** dropdown.
3. Perform test input: `Inspect Clear button state`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
Clear button is enabled
```

### 4. Actual Result
```text
disabled=true
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Build state module on Build 5.
- **Observed Behavior**: `disabled=true`.
