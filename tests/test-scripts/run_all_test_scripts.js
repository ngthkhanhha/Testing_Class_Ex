const path = require('node:path');
const fs = require('node:fs');

const scriptFiles = [
  'tc01_build_selection.js',
  'tc02_addition.js',
  'tc03_subtraction.js',
  'tc04_multiplication.js',
  'tc05_division.js',
  'tc06_reject_nonnumeric_first.js',
  'tc07_reject_nonnumeric_second.js',
  'tc08_reject_division_by_zero.js',
  'tc09_concatenate.js',
  'tc10_integer_option_hidden.js',
  'tc11_arithmetic_enables_integer.js',
  'tc12_integer_toggle.js',
  'tc13_clear_resets.js',
  'tc14_clear_enabled.js',
  'tc15_controls_visible.js'
];

async function runAll() {
  const targetBuildArg = process.argv.slice(2)[0];
  const buildLabel = targetBuildArg ? ` (Target Build: ${targetBuildArg})` : ' (All Builds)';
  console.log(`--- Running all 15 Test Case Scripts${buildLabel} ---`);
  for (const script of scriptFiles) {
    console.log(`\nExecuting: ${script}`);
    const scriptPath = path.join(__dirname, script);
    delete require.cache[require.resolve(scriptPath)];
    require(scriptPath);
    // Give brief delay between async fetches
    await new Promise(res => setTimeout(res, 300));
  }

  console.log('\n--- Syncing combined build files & summaries ---');
  try {
    const { splitBuildTests } = require('./split_build_tests.js');
    splitBuildTests();
  } catch (err) {
    console.error('Error running splitBuildTests:', err.message);
  }

  console.log('\n--- Generating Bug Reports for failed test cases ---');
  try {
    const { generateBugReports } = require('./generate_bug_reports.js');
    generateBugReports();
  } catch (err) {
    console.error('Error running generateBugReports:', err.message);
  }
}

runAll().catch(err => {
  console.error('Master runner failed:', err.message);
});
