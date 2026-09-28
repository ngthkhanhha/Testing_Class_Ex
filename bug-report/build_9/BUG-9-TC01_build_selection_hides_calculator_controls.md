# Bug Report: BUG-9-TC01 - Build selection hides calculator controls

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-9-TC01` |
| **Build** | 9 |
| **Test Case ID** | TC-01 |
| **Module / Area** | Build selection |
| **Priority / Severity** | P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-01** on **Build 9**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 9** from the **Build** dropdown.
3. Perform test input: `Select build from dropdown`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
Selected build is retained and expected controls are visible
```

### 4. Actual Result
```text
build=9; controlsVisible=false
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Build selection module on Build 9.
- **Observed Behavior**: `build=9; controlsVisible=false`.
