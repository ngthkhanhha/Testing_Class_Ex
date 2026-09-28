# Basic Calculator test suite

General test cases are listed in `calculator-testcases.csv`. The runner downloads the current page, evaluates its embedded calculator JavaScript in an isolated DOM model, and runs 15 assertions against each selectable build (Prototype and builds 1–9).

Run from this folder with Node.js 18 or newer:

```powershell
node .\run_calculator_tests.js
```

The command prints a summary for every build and writes detailed results to `calculator-test-results.csv`. It needs network access to fetch the page. The DOM model covers the page's calculator controls and state; it does not test layout, browser rendering, or real mouse and keyboard interaction.

## Run summary

| Build | Passed | Failed |
|---|---:|---:|
| Prototype | 14 | 1 |
| 1 | 12 | 3 |
| 2 | 10 | 5 |
| 3 | 12 | 3 |
| 4 | 12 | 3 |
| 5 | 13 | 2 |
| 6 | 14 | 1 |
| 7 | 7 | 8 |
| 8 | 8 | 7 |
| 9 | 12 | 3 |

Failures identify calculation, validation, option-state, clear-button, and control-visibility defects in the selected build. The division-by-zero case also exposes a shared page defect: for builds that detect zero division, the error path leaves the Calculate and Clear buttons disabled and the calculating form visible.
