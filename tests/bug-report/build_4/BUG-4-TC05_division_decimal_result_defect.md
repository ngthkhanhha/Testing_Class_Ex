# [BUG][Arithmetic] Division decimal result defect

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-4-TC05` |
| **Build** | 4 |
| **Found by Test Case** | TC-05 |
| **Module / Area** | Arithmetic |
| **Severity / Priority** | Major / P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

## Description

TC-05 failed during automated execution on Build 4.

## Environment

- URL: `https://testsheepnz.github.io/BasicCalculator.html`
- Build: 4
- Execution method: Repository automated test runner using an isolated DOM model

## Steps to Reproduce

1. Open the Basic Calculator test page.
2. Select **Build 4**.
3. Perform test input: `7 / 2 (Operation: Divide)`.
4. Trigger calculation or inspect the relevant control state.

## Expected Result

3.5

## Actual Result

3

## Evidence

Automated test output: `3`

## Impact

Functional defect in the Arithmetic module on Build 4.
