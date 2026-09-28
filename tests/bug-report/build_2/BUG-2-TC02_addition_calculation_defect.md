# [BUG][Arithmetic] Addition calculation defect

| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-2-TC02` |
| **Build** | 2 |
| **Found by Test Case** | TC-02 |
| **Module / Area** | Arithmetic |
| **Severity / Priority** | Major / P1 |
| **Status** | Open (Failed in Test Run) |
| **Date Reported** | 2026-09-28 |

## Description

TC-02 failed during automated execution on Build 2.

## Environment

- URL: `https://testsheepnz.github.io/BasicCalculator.html`
- Build: 2
- Execution method: Repository automated test runner using an isolated DOM model

## Steps to Reproduce

1. Open the Basic Calculator test page.
2. Select **Build 2**.
3. Perform test input: `7 + 3 (Operation: Add)`.
4. Trigger calculation or inspect the relevant control state.

## Expected Result

10

## Actual Result

73

## Evidence

Automated test output: `73`

## Impact

Functional defect in the Arithmetic module on Build 2.
