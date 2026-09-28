# Bug Report: BUG-4-TC11 - Integer option disabled for arithmetic operation

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-4-TC11` |
| **Build** | 4 |
| **Test Case ID** | TC-11 |
| **Module / Area** | Operation state |
| **Priority / Severity** | P2 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-11** on **Build 4**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 4** from the **Build** dropdown.
3. Perform test input: `Choose Add operation`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
Integer option checkbox is visible and enabled
```

### 4. Actual Result
```text
hidden=false; disabled=true
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Operation state module on Build 4.
- **Observed Behavior**: `hidden=false; disabled=true`.
