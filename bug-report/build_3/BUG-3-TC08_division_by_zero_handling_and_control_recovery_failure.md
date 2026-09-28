# Bug Report: BUG-3-TC08 - Division by zero handling and control recovery failure

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-3-TC08` |
| **Build** | 3 |
| **Test Case ID** | TC-08 |
| **Module / Area** | Division |
| **Priority / Severity** | P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-08** on **Build 3**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 3** from the **Build** dropdown.
3. Perform test input: `7 / 0 (Operation: Divide)`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
Divide-by-zero error message displayed; controls recover and remain enabled
```

### 4. Actual Result
```text
error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Division module on Build 3.
- **Observed Behavior**: `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false`.
