# AI Audit Report — 23120045

Tôi sử dụng các công cụ AI cho những tác vụ sau:

## Lần 1

- **Tên công cụ AI:** Gemini Antigravity
- **Ngày và giờ:** 28/09/2026; 2:27pm.
- **Câu lệnh (prompt) của bạn:** “hãy chia các test case, test result lại thành từng file riêng cho từng build, mỗi build là 1 file vào trong cây thư mục được tạo”
- **Kết quả do AI tạo ra:** 
📂 Cấu trúc cây thư mục được tạo (tests/)
text
tests/
├── test-cases/                      # Phân loại Test Case theo tính năng / module
│   ├── add/
│   │   └── add_testcases.csv
│   ├── subtract/
│   │   └── subtract_testcases.csv
│   ├── multiply/
│   │   └── multiply_testcases.csv
│   ├── divide/
│   │   └── divide_testcases.csv
│   ├── concatenate/
│   │   └── concatenate_testcases.csv
│   └── all_testcases.csv
│
├── test-runs/                       # Các file Test Case & Test Result chia theo từng Build
│   ├── prototype/
│   │   ├── prototype.csv            # Data CSV đầy đủ của Prototype
│   │   └── prototype.md             # Báo cáo Markdown dạng bảng hiển thị PASS/FAIL
│   ├── build_1/
│   │   ├── build_1.csv
│   │   └── build_1.md
│   ├── build_2/
│   │   ├── build_2.csv
│   │   └── build_2.md
│   ├── build_3/ ... build_9/
│   └── prototype.csv, build_1.csv, ..., build_9.csv
│
└── test-summary/                    # Báo cáo tổng hợp kết quả của tất cả các Build
    ├── summary.csv
    └── summary.md
📋 Nội dung từng file Build (CSV & Markdown)
Mỗi file theo build chứa thông tin chi tiết kết hợp giữa Test Case và Test Result:

Cột	Mô tả
Build	Tên/Số hiệu Build (Prototype, 1, 2, ..., 9)
TC-ID	Mã Test Case (TC-01 đến TC-15)
Area	Module / Tính năng cần test
Scenario	Kịch bản kiểm thử
Input	Dữ liệu đầu vào
Expected Result	Kết quả mong đợi
Priority	Mức độ ưu tiên (P1, P2)
Status	Trạng thái test run (PASS / FAIL)
Actual Result	Kết quả thực tế thu được từ runner
📊 Tổng hợp kết quả các Build (tests/test-summary/summary.md)
Build	Dynamic Tests	Passed	Failed	Pass Rate
Prototype	15	14	1	93.3%
Build 1	15	12	3	80.0%
Build 2	15	10	5	66.7%
Build 3	15	12	3	80.0%
Build 4	15	12	3	80.0%
Build 5	15	13	2	86.7%
Build 6	15	14	1	93.3%
Build 7	15	7	8	46.7%
Build 8	15	8	7	53.3%
Build 9	15	12	3	80.0%
⚙️ Tự động hóa
Script run_calculator_tests.js đã được cập nhật. Khi chạy lệnh:

powershell
node .\run_calculator_tests.js
Runner sẽ tự động chạy bộ test suite và cập nhật đồng bộ lại toàn bộ các file per-build trong thư mục 

tests/test-runs/ và tests/test-summary/

## Lần 2

- **Tên công cụ AI:** Gemini Antigravity
- **Ngày và giờ:** 28/09/2026; 2:45pm.
- **Câu lệnh (prompt) của bạn:** “đang bị lỗi dòng trong các file CSV, cột Status, actual result đang bị xuống hàng so với hàng của nó,
hãy tạo lại các file test run theo form các cột theo thứ tự: test case ID, module, tester, result, related, note, không cần điền tester, note, related”
- **Kết quả do AI tạo ra:** 
Đã sửa xong toàn bộ các file test run CSV cho từng build theo đúng yêu cầu:

Khắc phục lỗi xuống hàng (line wrapping): Đã loại bỏ các ký tự xuống dòng \r (CRLF) thừa trong file CSV, giúp mỗi test case nằm gọn trên 1 dòng chuẩn xác.
Định dạng đúng các cột theo thứ tự: Test Case ID,Module,Tester,Result,Related Bug,Note
Giữ nguyên các cột Tester, Related Bug, Note nhưng để trống (không tự động điền dữ liệu).
📄 Cấu trúc mẫu 1 file Test Run (tests/test-runs/build_7.csv)
csv
Test Case ID,Module,Tester,Result,Related Bug,Note
TC-01,Build selection,,Pass,,
TC-02,Arithmetic,,Fail,,
TC-03,Arithmetic,,Fail,,
TC-04,Arithmetic,,Fail,,
TC-05,Arithmetic,,Fail,,
TC-06,Validation,,Fail,,
TC-07,Validation,,Pass,,
TC-08,Division,,Fail,,
TC-09,Concatenation,,Fail,,
TC-10,Operation state,,Pass,,
TC-11,Operation state,,Pass,,
TC-12,Formatting,,Fail,,
TC-13,Clear,,Pass,,
TC-14,Build state,,Pass,,
TC-15,Build state,,Pass,,
Tất cả các file trong 

tests/test-runs/
 (Prototype và Build 1–9) đều đã được cập nhật đồng bộ.



## Lần 3

- **Tên công cụ AI:** Gemini Antigravity
- **Ngày và giờ:** 28/09/2026; 3:20pm.
- **Câu lệnh (prompt) của bạn:** “Hãy chia file run_calculator_tests.js thành 15 file test script riêng biệt, mỗi file script ứng với 1 test case, mỗi script sẽ sinh ra 1 file test run riêng biệt chứ không gộp hết vào 1 file, các file sinh ra sẽ được chia vào các folder build_x thích hợp ứng với x là build được test”
- **Kết quả do AI tạo ra:**
Đã hoàn thành việc tách file run_calculator_tests.js thành 15 file test script riêng biệt và cấu hình để mỗi script sinh ra file test run độc lập trong từng thư mục build tương ứng.

📁 1. Danh sách 15 file Test Script (tests/test-scripts/)
Mỗi file script đại diện cho 1 test case cụ thể:

STT	Tên file Script	Test Case ID	Nội dung kiểm thử
1	tc01_build_selection.js	TC-01	Build selection and calculator controls
2	tc02_addition.js	TC-02	Addition 7 + 3 = 10
3	tc03_subtraction.js	TC-03	Subtraction 7 - 3 = 4
4	tc04_multiplication.js	TC-04	Multiplication 7 * 3 = 21
5	tc05_division.js	TC-05	Division 7 / 2 = 3.5
6	tc06_reject_nonnumeric_first.js	TC-06	Reject nonnumeric first operand
7	tc07_reject_nonnumeric_second.js	TC-07	Reject nonnumeric second operand
8	tc08_reject_division_by_zero.js	TC-08	Reject division by zero and recover controls
9	tc09_concatenate.js	TC-09	Concatenate foo + bar = foobar
10	tc10_integer_option_hidden.js	TC-10	Concatenation hides and clears integer option
11	tc11_arithmetic_enables_integer.js	TC-11	Arithmetic enables integer option
12	tc12_integer_toggle.js	TC-12	Integer toggle truncates 7 / 2 to 3
13	tc13_clear_resets.js	TC-13	Clear resets answer, error, and integer option
14	tc14_clear_enabled.js	TC-14	Clear button enabled
15	tc15_controls_visible.js	TC-15	Calculator controls remain visible and enabled
📁 2. Cấu trúc các file Test Run được sinh ra (tests/test-runs/)
Mỗi script khi chạy sẽ tự tạo ra file test run CSV riêng biệt (tc01.csv đến tc15.csv) nằm trong đúng thư mục build được test (prototype, build_1, build_2, ..., build_9):

text
tests/test-runs/
├── prototype/
│   ├── tc01.csv
│   ├── tc02.csv
│   ├── ...
│   └── tc15.csv
├── build_1/
│   ├── tc01.csv
│   ├── tc02.csv
│   ├── ...
│   └── tc15.csv
├── build_2/ ... build_9/
Dạng nội dung chuẩn form của 1 file test run lẻ (ví dụ: tests/test-runs/build_1/tc01.csv):

csv
Test Case ID,Module,Tester,Result,Related Bug,Note
TC-01,Build selection,,Pass,,
🚀 3. Cách thực thi
Chạy từng test case script đơn lẻ:
powershell
node tests/test-scripts/tc01_build_selection.js
Chạy toàn bộ 15 test scripts cùng lúc:
powershell
node tests/test-scripts/run_all_test_scripts.js

## Lần 4

- **Tên công cụ AI:** Gemini Antigravity
- **Ngày và giờ:** 28/09/2026; 3:29pm.
- **Câu lệnh (prompt) của bạn:** “ví dụ tôi muốn chạy tc03, làm sao để tôi chạy tc03 trên 1 build cụ thể ví dụ (3) mà không phải chạy ra hết tất cả build”
- **Kết quả do AI tạo ra:**
Để chạy một test case cụ thể (ví dụ TC-03) trên 1 build duy nhất (ví dụ build 3 hoặc prototype), bạn chỉ cần truyền thêm tham số build vào sau lệnh thực thi.

💻 Cú pháp thực thi
1. Chạy TC-03 trên Build 3:
powershell
node tests/test-scripts/tc03_subtraction.js 3
2. Chạy TC-03 trên Build Prototype:
powershell
node tests/test-scripts/tc03_subtraction.js prototype
3. Các dạng tham số được hỗ trợ:
Số build (0 đến 9): node tests/test-scripts/tc03_subtraction.js 3
Tên build: node tests/test-scripts/tc03_subtraction.js build_3
Cờ (flag): node tests/test-scripts/tc03_subtraction.js --build=3
Prototype: node tests/test-scripts/tc03_subtraction.js prototype (hoặc 0)
💡 Ví dụ kết quả xuất ra màn hình:
text
Executing Script for TC-03: Subtraction 7 - 3 = 4 [Build(s): 3]
  [build_3] TC-03: Pass
File kết quả test run chỉ được tạo/cập nhật riêng trong thư mục tests/test-runs/build_3/tc03.csv.

Lưu ý: Nếu không truyền tham số build, script sẽ mặc định chạy trên tất cả các build (0 đến 9).

## Lần 5

- **Tên công cụ AI:** Gemini Antigravity
- **Ngày và giờ:** 28/09/2026; 3:30pm.
- **Câu lệnh (prompt) của bạn:** “vậy ví dụ chạy run_all_test script thì có chọn được build không”
- **Kết quả do AI tạo ra:** 
Có, hoàn toàn được! Khi chạy run_all_test_scripts.js, bạn chỉ cần truyền thêm số build (hoặc tên build) vào sau lệnh, toàn bộ 15 test scripts sẽ tự động lọc và chỉ chạy duy nhất trên build mà bạn chọn.

💻 Cú pháp thực thi run_all_test_scripts.js theo build:
1. Chạy tất cả 15 test scripts cho Build 3:
powershell
node tests/test-scripts/run_all_test_scripts.js 3
2. Chạy tất cả 15 test scripts cho Prototype:
powershell
node tests/test-scripts/run_all_test_scripts.js prototype
3. Chạy tất cả 15 test scripts cho tất cả các builds (Mặc định khi không truyền tham số):
powershell
node tests/test-scripts/run_all_test_scripts.js
📊 Minh họa kết quả xuất ra khi chạy node tests/test-scripts/run_all_test_scripts.js 3:
text
--- Running all 15 Test Case Scripts (Target Build: 3) ---
Executing: tc01_build_selection.js
Executing Script for TC-01: Build selection and calculator controls [Build(s): 3]
  [build_3] TC-01: Pass
Executing: tc02_addition.js
Executing Script for TC-02: Addition 7 + 3 = 10 [Build(s): 3]
  [build_3] TC-02: Pass
Executing: tc03_subtraction.js
Executing Script for TC-03: Subtraction 7 - 3 = 4 [Build(s): 3]
  [build_3] TC-03: Pass
... (chạy tiếp tục từ TC-04 đến TC-15 cho duy nhất Build 3)


## Lần 6


- **Tên công cụ AI:** Gemini Antigravity
- **Ngày và giờ:** 28/09/2026; 3:50pm.
- **Câu lệnh (prompt) của bạn:** “tạo bug report cho từng build trong folder bug-report ứng với từng test case fail, mỗi test case fail là 1 bug report”
- **Kết quả do AI tạo ra:** 
Đã tạo thành công 36 file Bug Report riêng biệt tương ứng với từng test case bị FAIL ở từng build trong thư mục 

tests/bug-report/
.

📂 Cấu trúc cây thư mục Bug Reports (tests/bug-report/)
Mỗi build có 1 thư mục riêng chứa các file Bug Report cho từng test case thất bại của build đó:

text
tests/bug-report/
├── prototype/
│   └── BUG-PROTOTYPE-TC08_division_by_zero_handling_and_control_recovery_failure.md
├── build_1/
│   ├── BUG-1-TC06_nonnumeric_first_operand_validation_failure.md
│   ├── BUG-1-TC07_nonnumeric_second_operand_validation_failure.md
│   └── BUG-1-TC08_division_by_zero_handling_and_control_recovery_failure.md
├── build_2/
│   ├── BUG-2-TC02_addition_calculation_defect.md
│   ├── BUG-2-TC06_nonnumeric_first_operand_validation_failure.md
│   ├── BUG-2-TC07_nonnumeric_second_operand_validation_failure.md
│   ├── BUG-2-TC08_division_by_zero_handling_and_control_recovery_failure.md
│   └── BUG-2-TC09_concatenate_text_operands_defect.md
├── build_3/ (3 bug reports: TC08, TC09, TC10)
├── build_4/ (3 bug reports: TC05, TC08, TC11)
├── build_5/ (2 bug reports: TC08, TC14)
├── build_6/ (1 bug report: TC08)
├── build_7/ (8 bug reports: TC02, TC03, TC04, TC05, TC06, TC08, TC09, TC12)
├── build_8/ (7 bug reports: TC03, TC05, TC06, TC07, TC08, TC09, TC12)
├── build_9/ (3 bug reports: TC01, TC08, TC15)
└── summary.md  # File tổng hợp toàn bộ 36 lỗi tìm thấy
📋 Mẫu nội dung 1 file Bug Report (ví dụ BUG-2-TC02)
Mỗi file bug report chứa đầy đủ thông tin chuẩn QA:

markdown
# Bug Report: BUG-2-TC02 - Addition calculation defect
| Attribute | Details |
|---|---|
| **Bug ID** | `BUG-2-TC02` |
| **Build** | 2 |
| **Test Case ID** | TC-02 |
| **Module / Area** | Arithmetic |
| **Priority / Severity** | P1 |
| **Status** | Open (Failed in Test Run) |
### 1. Description
During test execution of test case **TC-02** on **Build 2**, the application failed to produce the expected output.
### 2. Steps to Reproduce
1. Open the Basic Calculator test page at `https://testsheepnz.github.io/BasicCalculator.html`.
2. Select **Build 2** from the **Build** dropdown.
3. Perform test input: `7 + 3 (Operation: Add)`.
4. Trigger calculation.
### 3. Expected Result
10
### 4. Actual Result
73 (Ghép chuỗi thay vì cộng số)
📊 Thống kê số lượng Bug Reports sinh ra theo Build:
Prototype: 1 bug report (TC-08)
Build 1: 3 bug reports (TC-06, TC-07, TC-08)
Build 2: 5 bug reports (TC-02, TC-06, TC-07, TC-08, TC-09)
Build 3: 3 bug reports (TC-08, TC-09, TC-10)
Build 4: 3 bug reports (TC-05, TC-08, TC-11)
Build 5: 2 bug reports (TC-08, TC-14)
Build 6: 1 bug report (TC-08)
Build 7: 8 bug reports (TC-02, TC-03, TC-04, TC-05, TC-06, TC-08, TC-09, TC-12)
Build 8: 7 bug reports (TC-03, TC-05, TC-06, TC-07, TC-08, TC-09, TC-12)
Build 9: 3 bug reports (TC-01, TC-08, TC-15)
Tất cả đã được tích hợp tự động vào bộ runner tests/test-scripts/generate_bug_reports.js và tests/test-scripts/run_all_test_scripts.js.
