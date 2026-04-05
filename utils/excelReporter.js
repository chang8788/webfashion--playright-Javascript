const xlsx = require('xlsx');
const path = require('path');

class ExcelReporter {
  onBegin(config, suite) {
    this.suiteStart = Date.now();
    this.testsMap = {}; 
  }

  onTestEnd(test, result) {
    const title = test.title;
    const project = test.parent.project().name;

    if (!this.testsMap[title]) {
      this.testsMap[title] = { id: Object.keys(this.testsMap).length + 1 };
    }

    let status = 'Skip';
    if (result.status === 'passed') status = 'Pass';
    else if (result.status === 'failed' || result.status === 'timedOut') status = 'Fail';

    this.testsMap[title][project] = {
      time: (result.duration / 1000).toFixed(1) + 's',
      status: status
    };
  }

  onEnd() {
    const filePath = path.join(process.cwd(), 'Report_test.xlsx');
    let wb;
    try {
      wb = xlsx.readFile(filePath);
    } catch {
      wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, xlsx.utils.aoa_to_sheet([]), 'Trang tính1');
    }
    
    const wsName = wb.SheetNames[0];
    let ws = wb.Sheets[wsName] || xlsx.utils.aoa_to_sheet([]);

    let passedCount = 0;
    let failedCount = 0;
    const rows = [];

    // Map the aggregated data into the new row structure
    for (const [title, data] of Object.entries(this.testsMap)) {
      const chr = data['chromium'] || { time: '', status: 'Skip' };
      const ffx = data['firefox'] || { time: '', status: 'Skip' };
      const web = data['webkit'] || { time: '', status: 'Skip' };

      if (chr.status === 'Pass') passedCount++; else if (chr.status === 'Fail') failedCount++;
      if (ffx.status === 'Pass') passedCount++; else if (ffx.status === 'Fail') failedCount++;
      if (web.status === 'Pass') passedCount++; else if (web.status === 'Fail') failedCount++;

      rows.push([
        data.id,       // A: ID
        '',            // B: Precondition (we leave blank for you)
        title,         // C: Testcase (name)
        '',            // D: Steps
        '',            // E: Expect
        chr.time,      // F: Chromium Time run
        chr.status,    // G: Chromium Status
        ffx.time,      // H: Firefox Time run
        ffx.status,    // I: Firefox Status
        web.time,      // J: Webkit Time run
        web.status     // K: Webkit Status
      ]);
    }

    const totalTime = ((Date.now() - this.suiteStart) / 1000).toFixed(1) + 's';
    const totalTests = passedCount + failedCount;

    // Update Top Counters exactly at Column B indices
    xlsx.utils.sheet_add_aoa(ws, [[totalTests]], { origin: 'B1' });
    xlsx.utils.sheet_add_aoa(ws, [[passedCount]], { origin: 'B2' });
    xlsx.utils.sheet_add_aoa(ws, [[failedCount]], { origin: 'B3' });
    xlsx.utils.sheet_add_aoa(ws, [[totalTime]], { origin: 'B4' });

    // Append Rows starting at Row 9
    xlsx.utils.sheet_add_aoa(ws, rows, { origin: 'A9' });

    wb.Sheets[wsName] = ws;
    xlsx.writeFile(wb, filePath);
    console.log(`\n✅ Đã xuất Test Report vào file mới Report_test.xlsx (Chuẩn Template Matrix Nhóm Trình Duyệt)`);
  }
}

module.exports = ExcelReporter;
