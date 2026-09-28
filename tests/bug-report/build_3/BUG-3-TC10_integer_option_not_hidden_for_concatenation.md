# [BUG][Operation state] Integer option not hidden for concatenation

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-3-TC10` |
| **Build** | 3 |
| **Found by Test Case** | TC-10 |
| **Module / Area** | Operation state |
| **Severity / Priority** | Major / P2 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

## Description

TC-10 failed during automated execution on Build 3.

## Environment

- URL: `https://testsheepnz.github.io/BasicCalculator.html`
- Build: 3
- Execution method: Repository automated test runner using an isolated DOM model

## Steps to Reproduce

1. Open the Basic Calculator test page.
2. Select **Build 3**.
3. Perform test input: `Choose Concatenate`.
4. Trigger calculation or inspect the relevant control state.

## Expected Result

Integer option is hidden and unchecked

## Actual Result

hidden=false; checked=false

## Evidence

Automated test output: `hidden=false; checked=false`

## Impact

Functional defect in the Operation state module on Build 3.
