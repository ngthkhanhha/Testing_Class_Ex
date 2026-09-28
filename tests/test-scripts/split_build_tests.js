const fs = require('node:fs');
const path = require('node:path');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') {
        value += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === ',' && !quoted) {
      row.push(value);
      value = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(value);
      if (row.some(cell => cell !== '')) rows.push(row);
      row = [];
      value = '';
    } else {
      value += char;
    }
  }

  if (value !== '' || row.length) {
    row.push(value);
    rows.push(row);
  }
  return rows;
}

function escapeCsv(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeIfChanged(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const normalized = content.replace(/\r\n/g, '\n');
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n') === normalized) return;
  fs.writeFileSync(filePath, normalized, 'utf8');
}

function recordsFromCsv(filePath) {
  const rows = parseCsv(fs.readFileSync(filePath, 'utf8'));
  const headers = rows.shift();
  return rows.map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])));
}

function splitBuildTests() {
  const projectRoot = path.join(__dirname, '..', '..');
  const cases = recordsFromCsv(path.join(projectRoot, 'calculator-testcases.csv'));
  const results = recordsFromCsv(path.join(projectRoot, 'calculator-test-results.csv'));
  const caseMap = new Map(cases.map(testCase => [testCase['Test Case ID'] || testCase['TC-ID'], testCase]));
  const testRunsDir = path.join(projectRoot, 'tests', 'test-runs');

  // Existing build folders define the assignment scope. This prevents a full
  // calculator scan from creating placeholder run reports for future builds.
  const managedBuilds = fs.readdirSync(testRunsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^build_\d+$/.test(entry.name))
    .map(entry => entry.name.replace('build_', ''))
    .sort((a, b) => Number(a) - Number(b));

  const summary = [['Build', 'Total Tests', 'Pass', 'Fail', 'Pass Rate']];
  const executionDate = new Date().toISOString().slice(0, 10);

  for (const build of managedBuilds) {
    const buildResults = results.filter(result => result.Build === build);
    if (!buildResults.length) continue;

    const outputRows = buildResults.map(result => {
      const testCase = caseMap.get(result['Test Case']) || {};
      const passed = result.Status === 'PASS';
      return {
        'Test Case ID': result['Test Case'],
        Module: testCase.Module || testCase.Area || 'General',
        Tester: 'Automated test runner',
        Result: passed ? 'Pass' : 'Fail',
        'Related Bug': passed ? '' : `BUG-${build}-${result['Test Case'].replace('-', '')}`,
        Note: result['Actual Result'] || ''
      };
    });

    const headers = ['Test Case ID', 'Module', 'Tester', 'Result', 'Related Bug', 'Note'];
    const csv = [headers, ...outputRows.map(item => headers.map(header => item[header]))]
      .map(row => row.map(escapeCsv).join(','))
      .join('\n') + '\n';

    const passed = outputRows.filter(row => row.Result === 'Pass').length;
    const failed = outputRows.length - passed;
    const passRate = `${((passed / outputRows.length) * 100).toFixed(1)}%`;
    const markdown = [
      `# Test Run Report - Build ${build}`,
      '',
      `- **Execution date:** ${executionDate}`,
      '- **Tester:** Automated test runner',
      "- **Environment:** Basic Calculator web page; page JavaScript executed in the repository's isolated DOM model",
      `- **Summary:** ${passed} passed, ${failed} failed, ${outputRows.length} total`,
      '',
      '| Test Case ID | Module | Tester | Result | Related Bug | Note |',
      '|---|---|---|---|---|---|',
      ...outputRows.map(row => `| ${row['Test Case ID']} | ${row.Module} | ${row.Tester} | ${row.Result} | ${row['Related Bug']} | ${row.Note.replaceAll('|', '\\|')} |`),
      ''
    ].join('\n');

    const buildDir = path.join(testRunsDir, `build_${build}`);
    writeIfChanged(path.join(buildDir, `build_${build}.csv`), csv);
    writeIfChanged(path.join(buildDir, `build_${build}.md`), markdown);
    summary.push([build, outputRows.length, passed, failed, passRate]);
  }

  const summaryDir = path.join(projectRoot, 'tests', 'test-summary');
  const summaryCsv = summary.map(row => row.map(escapeCsv).join(',')).join('\n') + '\n';
  const summaryMd = [
    '# Calculator Build Test Summary',
    '',
    '| Build | Total Tests | Pass | Fail | Pass Rate |',
    '|---|---:|---:|---:|---:|',
    ...summary.slice(1).map(row => `| ${row[0]} | ${row[1]} | ${row[2]} | ${row[3]} | **${row[4]}** |`),
    ''
  ].join('\n');
  writeIfChanged(path.join(summaryDir, 'summary.csv'), summaryCsv);
  writeIfChanged(path.join(summaryDir, 'summary.md'), summaryMd);
}

module.exports = { splitBuildTests };

if (require.main === module) splitBuildTests();
