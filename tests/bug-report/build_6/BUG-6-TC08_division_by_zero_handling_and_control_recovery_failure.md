# [BUG][Division] Division by zero handling and control recovery failure

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-6-TC08` |
| **Build** | 6 |
| **Found by Test Case** | TC-08 |
| **Module / Area** | Division |
| **Severity / Priority** | Major / P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

## Description

TC-08 failed during automated execution on Build 6.

## Environment

- URL: `https://testsheepnz.github.io/BasicCalculator.html`
- Build: 6
- Execution method: Repository automated test runner using an isolated DOM model

## Steps to Reproduce

1. Open the Basic Calculator test page.
2. Select **Build 6**.
3. Perform test input: `7 / 0 (Operation: Divide)`.
4. Trigger calculation or inspect the relevant control state.

## Expected Result

Divide-by-zero error is displayed, no non-finite answer is produced, and controls recover

## Actual Result

error=(blank); answer=Infinity; calculateDisabled=false; calculatingHidden=true

## Evidence

Automated test output: `error=(blank); answer=Infinity; calculateDisabled=false; calculatingHidden=true`

## Impact

Functional defect in the Division module on Build 6.
