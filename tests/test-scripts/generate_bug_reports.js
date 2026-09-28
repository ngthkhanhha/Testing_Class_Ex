const fs = require('node:fs');
const path = require('node:path');

const metadata = {
  'TC-01': ['Build selection hides calculator controls', 'Build selection', 'P1', 'Select build from dropdown', 'Selected build is retained and expected controls are visible'],
  'TC-02': ['Addition calculation defect', 'Arithmetic', 'P1', '7 + 3 (Operation: Add)', '10'],
  'TC-03': ['Subtraction calculation defect', 'Arithmetic', 'P1', '7 - 3 (Operation: Subtract)', '4'],
  'TC-04': ['Multiplication calculation defect', 'Arithmetic', 'P1', '7 * 3 (Operation: Multiply)', '21'],
  'TC-05': ['Division decimal result defect', 'Arithmetic', 'P1', '7 / 2 (Operation: Divide)', '3.5'],
  'TC-06': ['Nonnumeric first operand validation failure', 'Validation', 'P1', 'abc + 2', 'Error identifies Number 1; no answer is produced'],
  'TC-07': ['Nonnumeric second operand validation failure', 'Validation', 'P1', '2 + abc', 'Error identifies Number 2; no answer is produced'],
  'TC-08': ['Division by zero handling and control recovery failure', 'Division', 'P1', '7 / 0 (Operation: Divide)', 'Divide-by-zero error is displayed, no non-finite answer is produced, and controls recover'],
  'TC-09': ['Concatenate text operands defect', 'Concatenation', 'P1', 'foo concatenate bar', 'foobar'],
  'TC-10': ['Integer option not hidden for concatenation', 'Operation state', 'P2', 'Choose Concatenate', 'Integer option is hidden and unchecked'],
  'TC-11': ['Integer option disabled for arithmetic operation', 'Operation state', 'P2', 'Choose Add', 'Integer option is visible and enabled'],
  'TC-12': ['Integer toggle truncation defect', 'Formatting', 'P2', '7 / 2 with Integers only checked', 'Answer is 3 when enabled and 3.5 when disabled'],
  'TC-13': ['Clear action fails to reset fields', 'Clear', 'P2', 'Calculate then select Clear', 'Answer and error are blank; integer checkbox is unchecked'],
  'TC-14': ['Clear button remains disabled', 'Build state', 'P2', 'Inspect Clear button', 'Clear button is enabled'],
  'TC-15': ['Calculator controls hidden or disabled', 'Build state', 'P1', 'Select build and inspect controls', 'Operands and Calculate are visible and enabled']
};

function parseCsv(text) {
  text = text.replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { value += '"'; i += 1; } else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(value); value = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(value);
      if (row.some(cell => cell !== '')) rows.push(row);
      row = []; value = '';
    } else value += char;
  }
  if (value !== '' || row.length) { row.push(value); rows.push(row); }
  return rows;
}

function writeIfChanged(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const normalized = content.replace(/\r\n/g, '\n');
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n') === normalized) return;
  fs.writeFileSync(filePath, normalized, 'utf8');
}

function generateBugReports() {
  const projectRoot = path.join(__dirname, '..', '..');
  const rows = parseCsv(fs.readFileSync(path.join(projectRoot, 'calculator-test-results.csv'), 'utf8'));
  const headers = rows.shift();
  const results = rows.map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])));
  const failures = results.filter(result => result.Status === 'FAIL' && /^[1-6]$/.test(result.Build));
  const reportRoot = path.join(projectRoot, 'tests', 'bug-report');
  const reportDate = new Date().toISOString().slice(0, 10);
  const summary = [];

  for (const failure of failures) {
    const build = failure.Build;
    const testCaseId = failure['Test Case'];
    const [title, area, priority, input, expected] = metadata[testCaseId];
    const bugId = `BUG-${build.toUpperCase()}-${testCaseId.replace('-', '')}`;
    const buildName = `Build ${build}`;
    const folder = `build_${build}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    const filename = `${bugId}_${slug}.md`;
    const actual = failure['Actual Result'] || '(blank)';
    const markdown = [
      `# [BUG][${area}] ${title}`,
      '',
      '| Attribute | Details |',
      '|---|---|',
      `| **Bug ID** | \`${bugId}\` |`,
      `| **Build** | ${build} |`,
      `| **Found by Test Case** | ${testCaseId} |`,
      `| **Module / Area** | ${area} |`,
      `| **Severity / Priority** | Major / ${priority} |`,
      '| **Status** | Open (Failed in Test Run) |',
      `| **Date Reported** | ${reportDate} |`,
      '',
      '## Description',
      '',
      `${testCaseId} failed during automated execution on ${buildName}.`,
      '',
      '## Environment',
      '',
      '- URL: `https://testsheepnz.github.io/BasicCalculator.html`',
      `- Build: ${build}`,
      '- Execution method: Repository automated test runner using an isolated DOM model',
      '',
      '## Steps to Reproduce',
      '',
      '1. Open the Basic Calculator test page.',
      `2. Select **${buildName}**.`,
      `3. Perform test input: \`${input}\`.`,
      '4. Trigger calculation or inspect the relevant control state.',
      '',
      '## Expected Result',
      '',
      expected,
      '',
      '## Actual Result',
      '',
      actual,
      '',
      '## Evidence',
      '',
      `Automated test output: \`${actual}\``,
      '',
      '## Impact',
      '',
      `Functional defect in the ${area} module on ${buildName}.`,
      ''
    ].join('\n');
    writeIfChanged(path.join(reportRoot, folder, filename), markdown);
    summary.push({ bugId, build, testCaseId, area, title, priority, actual });
  }

  const summaryMarkdown = [
    '# All Bug Reports Summary',
    '',
    `Total Defective Cases Identified: **${summary.length}**`,
    '',
    '| Bug ID | Build | Test Case ID | Module | Title | Priority | Actual Result |',
    '|---|---|---|---|---|---|---|',
    ...summary.map(item => `| \`${item.bugId}\` | ${item.build} | ${item.testCaseId} | ${item.area} | ${item.title} | ${item.priority} | \`${item.actual.replaceAll('|', '\\|')}\` |`),
    ''
  ].join('\n');
  writeIfChanged(path.join(reportRoot, 'summary.md'), summaryMarkdown);
}

module.exports = { generateBugReports };

if (require.main === module) generateBugReports();
