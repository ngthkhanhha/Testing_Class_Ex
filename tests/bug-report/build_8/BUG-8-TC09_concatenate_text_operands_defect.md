# Bug Report: BUG-8-TC09 - Concatenate text operands defect

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-8-TC09` |
| **Build** | 8 |
| **Test Case ID** | TC-09 |
| **Module / Area** | Concatenation |
| **Priority / Severity** | P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

---

### 1. Description
During test execution of test case **TC-09** on **Build 8**, the application failed to produce the expected output.

### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 8** from the **Build** dropdown.
3. Perform test input: `foo concatenate bar (Operation: Concatenate)`.
4. Trigger calculation / inspect control state.

### 3. Expected Result
```text
foobar
```

### 4. Actual Result
```text
barfoo
```

### 5. Root Cause / Defect Impact
- **Impact**: Functional defect in Concatenation module on Build 8.
- **Observed Behavior**: `barfoo`.
