# [BUG][Operation state] Integer option disabled for arithmetic operation

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-4-TC11` |
| **Build** | 4 |
| **Found by Test Case** | TC-11 |
| **Module / Area** | Operation state |
| **Severity / Priority** | Major / P2 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

## Description

TC-11 failed during automated execution on Build 4.

## Environment

- URL: `https://testsheepnz.github.io/BasicCalculator.html`
- Build: 4
- Execution method: Repository automated test runner using an isolated DOM model

## Steps to Reproduce

1. Open the Basic Calculator test page.
2. Select **Build 4**.
3. Perform test input: `Choose Add`.
4. Trigger calculation or inspect the relevant control state.

## Expected Result

Integer option is visible and enabled

## Actual Result

hidden=false; disabled=true

## Evidence

Automated test output: `hidden=false; disabled=true`

## Impact

Functional defect in the Operation state module on Build 4.
