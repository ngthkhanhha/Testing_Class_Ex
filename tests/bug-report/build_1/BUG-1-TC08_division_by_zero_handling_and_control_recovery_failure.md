# [BUG][Division] Division by zero handling and control recovery failure

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-1-TC08` |
| **Build** | 1 |
| **Found by Test Case** | TC-08 |
| **Module / Area** | Division |
| **Severity / Priority** | Major / P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

## Description

TC-08 failed during automated execution on Build 1.

## Environment

- URL: `https://testsheepnz.github.io/BasicCalculator.html`
- Build: 1
- Execution method: Repository automated test runner using an isolated DOM model

## Steps to Reproduce

1. Open the Basic Calculator test page.
2. Select **Build 1**.
3. Perform test input: `7 / 0 (Operation: Divide)`.
4. Trigger calculation or inspect the relevant control state.

## Expected Result

Divide-by-zero error is displayed, no non-finite answer is produced, and controls recover

## Actual Result

error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false

## Evidence

Automated test output: `error=Divide by zero error!; answer=(blank); calculateDisabled=true; calculatingHidden=false`

## Impact

Functional defect in the Division module on Build 1.
