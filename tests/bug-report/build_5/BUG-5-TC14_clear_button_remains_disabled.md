# [BUG][Build state] Clear button remains disabled

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-5-TC14` |
| **Build** | 5 |
| **Found by Test Case** | TC-14 |
| **Module / Area** | Build state |
| **Severity / Priority** | Major / P2 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

## Description

TC-14 failed during automated execution on Build 5.

## Environment

- URL: `https://testsheepnz.github.io/BasicCalculator.html`
- Build: 5
- Execution method: Repository automated test runner using an isolated DOM model

## Steps to Reproduce

1. Open the Basic Calculator test page.
2. Select **Build 5**.
3. Perform test input: `Inspect Clear button`.
4. Trigger calculation or inspect the relevant control state.

## Expected Result

Clear button is enabled

## Actual Result

disabled=true

## Evidence

Automated test output: `disabled=true`

## Impact

Functional defect in the Build state module on Build 5.
