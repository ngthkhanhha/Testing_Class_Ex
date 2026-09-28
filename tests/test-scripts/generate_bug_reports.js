const fs = require('fs');
const path = require('path');

function safeWriteFileSync(filePath, content) {
  content = content.replace(/\r\n/g, '\n');
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (fs.existsSync(filePath)) {
    try {
      const existing = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
      if (existing === content) return;
    } catch (_) {}
  }
  let retries = 15;
  while (retries > 0) {
    try {
      fs.writeFileSync(filePath, content);
      return;
    } catch (err) {
      retries--;
      if (retries === 0) {
        console.warn(`Warning: Could not write ${filePath}: ${err.message}`);
        return;
      }
      try {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
      } catch (_) {}
    }
  }
}

const tcMetadata = {
  'TC-01': { title: 'Build selection hides calculator controls', area: 'Build selection', priority: 'P1', input: 'Select build from dropdown', expected: 'Selected build is retained and expected controls are visible' },
  'TC-02': { title: 'Addition calculation defect', area: 'Arithmetic', priority: 'P1', input: '7 + 3 (Operation: Add)', expected: '10' },
  'TC-03': { title: 'Subtraction calculation defect', area: 'Arithmetic', priority: 'P1', input: '7 - 3 (Operation: Subtract)', expected: '4' },
  'TC-04': { title: 'Multiplication calculation defect', area: 'Arithmetic', priority: 'P1', input: '7 * 3 (Operation: Multiply)', expected: '21' },
  'TC-05': { title: 'Division decimal result defect', area: 'Arithmetic', priority: 'P1', input: '7 / 2 (Operation: Divide)', expected: '3.5' },
  'TC-06': { title: 'Nonnumeric first operand validation failure', area: 'Validation', priority: 'P1', input: 'abc + 2', expected: 'Error message identifies Number 1 is not a number; no answer produced' },
  'TC-07': { title: 'Nonnumeric second operand validation failure', area: 'Validation', priority: 'P1', input: '2 + abc', expected: 'Error message identifies Number 2 is not a number; no answer produced' },
  'TC-08': { title: 'Division by zero handling and control recovery failure', area: 'Division', priority: 'P1', input: '7 / 0 (Operation: Divide)', expected: 'Divide-by-zero error message displayed; controls recover and remain enabled' },
  'TC-09': { title: 'Concatenate text operands defect', area: 'Concatenation', priority: 'P1', input: 'foo concatenate bar (Operation: Concatenate)', expected: 'foobar' },
  'TC-10': { title: 'Integer option not hidden for concatenation', area: 'Operation state', priority: 'P2', input: 'Choose Concatenate operation', expected: 'Integer option checkbox and label are hidden and unchecked' },
  'TC-11': { title: 'Integer option disabled for arithmetic operation', area: 'Operation state', priority: 'P2', input: 'Choose Add operation', expected: 'Integer option checkbox is visible and enabled' },
  'TC-12': { title: 'Integer toggle truncation defect', area: 'Formatting', priority: 'P2', input: '7 / 2 with Integers only option checked', expected: 'Answer is 3 when enabled and 3.5 when disabled' },
  'TC-13': { title: 'Clear action fails to reset fields', area: 'Clear', priority: 'P2', input: 'Calculate then click Clear button', expected: 'Answer and error fields are blank; integer checkbox unchecked' },
  'TC-14': { title: 'Clear button remains disabled', area: 'Build state', priority: 'P2', input: 'Inspect Clear button state', expected: 'Clear button is enabled' },
  'TC-15': { title: 'Calculator controls hidden or disabled', area: 'Build state', priority: 'P1', input: 'Select build and inspect page controls', expected: 'Operands and Calculate button are visible and enabled' }
};

function generateBugReports() {
  const rootDir = path.join(__dirname, '..', '..');
  const testresultsPath = path.join(rootDir, 'calculator-test-results.csv');
  const bugReportDir = path.join(rootDir, 'tests', 'bug-report');

  if (!fs.existsSync(testresultsPath)) {
    console.error('Missing calculator-test-results.csv file.');
    return;
  }

  const trRaw = fs.readFileSync(testresultsPath, 'utf8').replace(/\r/g, '').trim().split('\n');
  const failures = [];

  for (let i = 1; i < trRaw.length; i++) {
    if (!trRaw[i].trim()) continue;

    // Parse CSV line
    let cols = [];
    let cur = '';
    let inQuotes = false;
    for (let c of trRaw[i]) {
      if (c === '"') inQuotes = !inQuotes;
      else if (c === ',' && !inQuotes) { cols.push(cur.trim()); cur = ''; }
      else cur += c;
    }
    cols.push(cur.trim());

    const build = cols[0].replace(/"/g, '');
    const tcId = cols[1].replace(/"/g, '');
    const scenario = cols[2].replace(/"/g, '');
    const status = cols[3].replace(/"/g, '');
    const actual = cols[4].replace(/"/g, '');

    if (status === 'FAIL') {
      failures.push({ build, tcId, scenario, actual });
    }
  }

  console.log(`Found ${failures.length} test failures across builds. Generating individual bug reports...`);

  const bugSummaryRows = [['Bug ID', 'Build', 'Test Case ID', 'Module', 'Title', 'Severity', 'Actual Result']];

  for (const fail of failures) {
    const buildStr = fail.build.toLowerCase() === 'prototype' ? 'prototype' : `build_${fail.build}`;
    const buildFolder = path.join(bugReportDir, buildStr);
    
    if (!fs.existsSync(buildFolder)) {
      fs.mkdirSync(buildFolder, { recursive: true });
    }

    const tcNum = fail.tcId.replace('TC-', '');
    const bugId = `BUG-${fail.build.toUpperCase()}-TC${tcNum}`;
    const meta = tcMetadata[fail.tcId] || { title: fail.scenario, area: 'General', priority: 'P1', input: 'Execute test case', expected: 'Test passes' };
    const tcSlug = meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    const filename = `${bugId}_${tcSlug}.md`;

    const mdContent = [
      `# Bug Report: ${bugId} - ${meta.title}`,
      '',
      `| Attribute | Details |`,
      `|---|---|`,
      `| **Bug ID** | \`${bugId}\` |`,
      `| **Build** | ${fail.build} |`,
      `| **Test Case ID** | ${fail.tcId} |`,
      `| **Module / Area** | ${meta.area} |`,
      `| **Priority / Severity** | ${meta.priority} |`,
      `| **Status** | Open (Failed in Test Run) |`,
      `| **Date Reported** | ${new Date().toISOString().split('T')[0]} |`,
      '',
      `---`,
      '',
      `### 1. Description`,
      `During test execution of test case **${fail.tcId}** on **${fail.build === 'Prototype' ? 'Prototype' : `Build ${fail.build}`}**, the application failed to produce the expected output.`,
      '',
      `### 2. Steps to Reproduce`,
      `1. Open the Basic Calculator test page at \`https://testsheepnz.github.io/BasicCalculator.html\`.`,
      `2. Select **${fail.build === 'Prototype' ? 'Prototype' : `Build ${fail.build}`}** from the **Build** dropdown.`,
      `3. Perform test input: \`${meta.input}\`.`,
      `4. Trigger calculation / inspect control state.`,
      '',
      `### 3. Expected Result`,
      `\`\`\`text`,
      meta.expected,
      `\`\`\``,
      '',
      `### 4. Actual Result`,
      `\`\`\`text`,
      fail.actual || '(blank)',
      `\`\`\``,
      '',
      `### 5. Root Cause / Defect Impact`,
      `- **Impact**: Functional defect in ${meta.area} module on ${fail.build === 'Prototype' ? 'Prototype' : `Build ${fail.build}`}.`,
      `- **Observed Behavior**: \`${fail.actual}\`.`,
      ''
    ].join('\n');

    safeWriteFileSync(path.join(buildFolder, filename), mdContent);
    bugSummaryRows.push([bugId, fail.build, fail.tcId, meta.area, meta.title, meta.priority, fail.actual]);
  }

  // Write all bugs summary in tests/bug-report/summary.md and summary.csv
  const summaryMd = [
    '# All Bug Reports Summary',
    '',
    `Total Defective Cases Identified: **${failures.length}**`,
    '',
    '| Bug ID | Build | Test Case ID | Module | Title | Priority | Actual Result |',
    '|---|---|---|---|---|---|---|',
    ...bugSummaryRows.slice(1).map(r => `| \`${r[0]}\` | ${r[1]} | ${r[2]} | ${r[3]} | ${r[4]} | ${r[5]} | \`${r[6]}\` |`)
  ].join('\n') + '\n';

  safeWriteFileSync(path.join(bugReportDir, 'summary.md'), summaryMd);

  // Also write in root bug-report if needed
  const rootBugDir = path.join(rootDir, 'bug-report');
  for (const fail of failures) {
    const buildStr = fail.build.toLowerCase() === 'prototype' ? 'prototype' : `build_${fail.build}`;
    const buildFolder = path.join(rootBugDir, buildStr);
    const tcNum = fail.tcId.replace('TC-', '');
    const bugId = `BUG-${fail.build.toUpperCase()}-TC${tcNum}`;
    const meta = tcMetadata[fail.tcId] || { title: fail.scenario, area: 'General', priority: 'P1', input: 'Execute test case', expected: 'Test passes' };
    const tcSlug = meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    const filename = `${bugId}_${tcSlug}.md`;

    const mdContent = fs.readFileSync(path.join(bugReportDir, buildStr, filename), 'utf8');
    safeWriteFileSync(path.join(buildFolder, filename), mdContent);
  }
  safeWriteFileSync(path.join(rootBugDir, 'summary.md'), summaryMd);

  console.log(`Successfully generated ${failures.length} bug report files into tests/bug-report/!`);
}

module.exports = { generateBugReports };

if (require.main === module) {
  generateBugReports();
}
