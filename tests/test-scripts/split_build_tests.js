const fs = require('fs');
const path = require('path');

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  line = line.replace(/\r/g, ''); // Strip Windows CRLF \r
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function escapeCSV(val) {
  if (val === undefined || val === null) val = '';
  val = String(val).replace(/\r/g, '').trim();
  if (val.includes('"') || val.includes(',') || val.includes('\n')) {
    val = '"' + val.replaceAll('"', '""') + '"';
  }
  return val;
}

function safeWriteFileSync(filePath, content) {
  content = content.replace(/\r\n/g, '\n'); // Normalize to LF
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
        console.warn(`Warning: Skipped writing ${filePath} due to lock: ${err.message}`);
        return;
      }
      try {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
      } catch (_) {}
    }
  }
}

function splitBuildTests() {
  const scriptDir = __dirname;
  const rootDir = path.join(scriptDir, '..', '..');
  const testcasesPath = path.join(rootDir, 'calculator-testcases.csv');
  const testresultsPath = path.join(rootDir, 'calculator-test-results.csv');
  const testCasesDir = path.join(rootDir, 'tests', 'test-cases');
  const testRunsDir = path.join(rootDir, 'tests', 'test-runs');
  const testSummaryDir = path.join(rootDir, 'tests', 'test-summary');

  if (!fs.existsSync(testcasesPath) || !fs.existsSync(testresultsPath)) {
    console.error('Missing input CSV files for splitting.');
    return;
  }

  // Read test cases
  const tcRaw = fs.readFileSync(testcasesPath, 'utf8').replace(/\r/g, '').trim().split('\n');
  const tcMap = new Map();
  const tcList = [];

  for (let i = 1; i < tcRaw.length; i++) {
    if (!tcRaw[i].trim()) continue;
    const cols = parseCSVLine(tcRaw[i]);
    const tcObj = {
      tcId: cols[0],
      area: cols[1],
      scenario: cols[2],
      input: cols[3],
      expectedResult: cols[4],
      priority: cols[5]
    };
    tcMap.set(cols[0], tcObj);
    tcList.push(tcObj);
  }

  // Populate test-cases subdirectories
  const tcCategories = {
    add: tcList.filter(tc => tc.tcId === 'TC-02' || tc.scenario.toLowerCase().includes('addition') || tc.scenario.toLowerCase().includes('add')),
    subtract: tcList.filter(tc => tc.tcId === 'TC-03' || tc.scenario.toLowerCase().includes('subtraction')),
    multiply: tcList.filter(tc => tc.tcId === 'TC-04' || tc.scenario.toLowerCase().includes('multiplication')),
    divide: tcList.filter(tc => tc.tcId === 'TC-05' || tc.tcId === 'TC-08' || tc.scenario.toLowerCase().includes('division') || tc.area.toLowerCase().includes('division')),
    concatenate: tcList.filter(tc => tc.tcId === 'TC-09' || tc.tcId === 'TC-10' || tc.scenario.toLowerCase().includes('concatenate'))
  };

  const newTCHeaders = ['Test Case ID', 'Module', 'Scenario', 'Input', 'Expected Result', 'Priority'];
  for (const [cat, items] of Object.entries(tcCategories)) {
    const catDir = path.join(testCasesDir, cat);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
    const lines = [newTCHeaders.map(escapeCSV).join(',')];
    for (const item of items) {
      lines.push([item.tcId, item.area, item.scenario, item.input, item.expectedResult, item.priority].map(escapeCSV).join(','));
    }
    safeWriteFileSync(path.join(catDir, `${cat}_testcases.csv`), lines.join('\n') + '\n');
  }

  fs.mkdirSync(testCasesDir, { recursive: true });
  const allTCLines = [newTCHeaders.map(escapeCSV).join(',')];
  for (const item of tcList) {
    allTCLines.push([item.tcId, item.area, item.scenario, item.input, item.expectedResult, item.priority].map(escapeCSV).join(','));
  }
  safeWriteFileSync(path.join(testCasesDir, 'all_testcases.csv'), allTCLines.join('\n') + '\n');

  // Read test results
  const trRaw = fs.readFileSync(testresultsPath, 'utf8').replace(/\r/g, '').trim().split('\n');
  const buildMap = new Map();

  for (let i = 1; i < trRaw.length; i++) {
    if (!trRaw[i].trim()) continue;
    const cols = parseCSVLine(trRaw[i]);
    const build = cols[0];
    const tcId = cols[1];
    const scenarioResult = cols[2];
    const status = cols[3];
    const actualResult = cols[4];

    if (!buildMap.has(build)) {
      buildMap.set(build, []);
    }
    buildMap.get(build).push({
      build,
      tcId,
      scenarioResult,
      status,
      actualResult
    });
  }

  if (!fs.existsSync(testRunsDir)) {
    fs.mkdirSync(testRunsDir, { recursive: true });
  }
  if (!fs.existsSync(testSummaryDir)) {
    fs.mkdirSync(testSummaryDir, { recursive: true });
  }

  // Exact form headers requested by user:
  // Test Case ID, Module, Tester, Result, Related Bug, Note
  // Leaves Tester, Related Bug, and Note blank as requested
  const csvHeaders = ['Test Case ID', 'Module', 'Tester', 'Result', 'Related Bug', 'Note'];
  const csvHeaderLine = csvHeaders.map(escapeCSV).join(',');

  const summaryRows = [['Build', 'Total Tests', 'Pass', 'Fail', 'Pass Rate']];

  for (const [build, results] of buildMap.entries()) {
    const folderName = build.toLowerCase() === 'prototype' ? 'prototype' : `build_${build}`;
    const buildFolder = path.join(testRunsDir, folderName);
    
    if (!fs.existsSync(buildFolder)) {
      fs.mkdirSync(buildFolder, { recursive: true });
    }

    const csvLines = [csvHeaderLine];
    const mdLines = [
      `# Test Run Report - ${build.toLowerCase() === 'prototype' ? 'Prototype' : `Build ${build}`}`,
      '',
      `| Test Case ID | Module | Tester | Result | Related Bug | Note |`,
      `|---|---|---|---|---|---|`
    ];

    let passCount = 0;
    let failCount = 0;

    for (const res of results) {
      const tcDetails = tcMap.get(res.tcId) || {
        area: 'General',
        scenario: res.scenarioResult
      };

      const moduleName = tcDetails.area || 'General';
      const tester = '';
      const statusTitleCase = res.status === 'PASS' ? 'Pass' : 'Fail';
      const relatedBug = '';
      const note = '';

      if (statusTitleCase === 'Pass') passCount++;
      else failCount++;

      const row = [
        res.tcId,
        moduleName,
        tester,
        statusTitleCase,
        relatedBug,
        note
      ];

      csvLines.push(row.map(escapeCSV).join(','));

      const statusBadge = statusTitleCase === 'Pass' ? '✅ **Pass**' : '❌ **Fail**';
      mdLines.push(`| ${res.tcId} | ${moduleName} | | ${statusBadge} | | |`);
    }

    const total = results.length;
    const passRate = ((passCount / total) * 100).toFixed(1) + '%';
    summaryRows.push([build, total, passCount, failCount, passRate]);

    const filenameBase = build.toLowerCase() === 'prototype' ? 'prototype' : `build_${build}`;
    safeWriteFileSync(path.join(buildFolder, `${filenameBase}.csv`), csvLines.join('\n') + '\n');
    safeWriteFileSync(path.join(buildFolder, `${filenameBase}.md`), mdLines.join('\n') + '\n');

    // Also write direct CSV file in test-runs directory (e.g. tests/test-runs/build_1.csv)
    safeWriteFileSync(path.join(testRunsDir, `${filenameBase}.csv`), csvLines.join('\n') + '\n');

    console.log(`Generated build file for ${build}: ${passCount}/${total} Passed (${passRate})`);
  }

  // Write summary file in tests/test-summary/
  const summaryCsvLines = summaryRows.map(r => r.map(escapeCSV).join(',')).join('\n') + '\n';
  safeWriteFileSync(path.join(testSummaryDir, 'summary.csv'), summaryCsvLines);

  const summaryMd = [
    '# Calculator Build Test Summary',
    '',
    '| Build | Total Tests | Pass | Fail | Pass Rate |',
    '|---|---:|---:|---:|---:|',
    ...summaryRows.slice(1).map(r => `| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} | **${r[4]}** |`)
  ].join('\n') + '\n';
  safeWriteFileSync(path.join(testSummaryDir, 'summary.md'), summaryMd);

  console.log('All per-build test files updated successfully with empty Tester, Related Bug, and Note columns!');
}

module.exports = { splitBuildTests };

if (require.main === module) {
  splitBuildTests();
}
