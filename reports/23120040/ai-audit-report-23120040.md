# AI Audit Report — 23120040

Tôi sử dụng công cụ AI **Codex** để hỗ trợ hoàn thiện test run, bug report và cấu trúc thư mục cho bài kiểm thử Basic Calculator.

> **Ngày làm việc:** 28/09/2026 (UTC+07:00). Lịch sử hội thoại không cung cấp timestamp riêng cho từng prompt, vì vậy báo cáo không tự suy đoán giờ gửi.

## Lần tương tác 1

- **Tên công cụ AI:** Codex
- **Ngày và giờ:** 28/09/2026; giờ không khả dụng.
- **Câu lệnh (prompt):** Yêu cầu đọc trang Basic Calculator và tài liệu đính kèm, sau đó viết test run cho build 6–7 theo template trong slide.
- **Kết quả do AI tạo ra:** AI khảo sát repository, đọc testcase tổng quát, các test run đã có và tài liệu quản lý bug. Yêu cầu này chưa được hoàn tất vì phạm vi build được đính chính ở lần tương tác tiếp theo.

## Lần tương tác 2

- **Tên công cụ AI:** Codex
- **Ngày và giờ:** 28/09/2026; giờ không khả dụng.
- **Câu lệnh (prompt):** “Tôi đính chính: Build 5-6. Và việc tiếp theo bạn cần làm là dọn dẹp các file bị trùng trong src code này (có vẻ là bug reports bị trùng). Tổ chức lại file theo giống như trong slide.”
- **Kết quả do AI tạo ra:** AI đổi phạm vi sang build 5–6, đối chiếu hai thư mục bug report và xác nhận 37 file ở `bug-report/` trùng nội dung với `tests/bug-report/`. Thư mục `tests/bug-report/` được chọn làm nơi lưu chính; script sinh bug report được chỉnh để không tạo bản sao ở cấp gốc.

## Lần tương tác 3

- **Tên công cụ AI:** Codex
- **Ngày và giờ:** 28/09/2026; giờ không khả dụng.
- **Câu lệnh (prompt):** “Tôi vừa thêm file hãy đọc template trong đấy làm tham chiếu, các build 5 6 tồn tại trước đó liên quan đến task chỉ là placeholder tôi đã xóa.”
- **Kết quả do AI tạo ra:** AI đọc tài liệu `03 - github_testcase_management.pptx.pdf` và áp dụng mẫu sáu cột `Test Case ID, Module, Tester, Result, Related Bug, Note`. Runner được chạy lại với dữ liệu trực tiếp từ trang Basic Calculator. Kết quả:
  - Build 5: 15 test case, 13 Pass, 2 Fail, tỷ lệ 86.7%.
  - Build 6: 15 test case, 14 Pass, 1 Fail, tỷ lệ 93.3%.
  - Build 5 phát hiện lỗi tại TC-08 và TC-14.
  - Build 6 phát hiện lỗi tại TC-08.

AI tạo lại test run Markdown/CSV, chuẩn hóa bug report theo các mục Found by Test Case, Environment, Severity/Priority, Expected Result, Actual Result và Evidence; đồng thời tạo traceability matrix cho build 5–6.

## Lần tương tác 4

- **Tên công cụ AI:** Codex
- **Ngày và giờ:** 28/09/2026; giờ không khả dụng.
- **Câu lệnh (prompt):** “Tất cả các folder trong folder tests các build chỉ nên có từ 1-6. Đây là tiến độ chuẩn, xóa các build không cần thiết.”
- **Kết quả do AI tạo ra:** AI xóa các thư mục `prototype`, `build_7`, `build_8`, `build_9` khỏi `tests/bug-report/`, tổng cộng 19 bug report ngoài phạm vi. `tests/test-runs/` và `tests/bug-report/` hiện chỉ có `build_1` đến `build_6`. Runner, script tách test run và script sinh bug report được giới hạn ở build 1–6. Dữ liệu kết quả còn 90 lượt kiểm tra và bug summary còn 17 lỗi thuộc build 1–6.

## Lần tương tác 5

- **Tên công cụ AI:** Codex
- **Ngày và giờ:** 28/09/2026; khoảng 20:50 UTC+07:00.
- **Câu lệnh (prompt):** “Với những gì tôi hỏi bạn nãy giờ hãy tạo 1 các file report theo template, như các mã số sv khác làm trong folder report (tôi là 23120040).”
- **Kết quả do AI tạo ra:** AI đối chiếu report mẫu của MSSV 23120037 và 23120045, đọc Git history thực tế, sau đó tạo ba file cho MSSV 23120040: AI audit report, AI critique và Git commit log. Trong quá trình kiểm tra, AI phát hiện summary rỗng do parser chưa loại UTF-8 BOM và đã sửa trước khi lập báo cáo.

## Các artifact chính

- `tests/test-runs/build_5/build_5.md` và `build_5.csv`
- `tests/test-runs/build_6/build_6.md` và `build_6.csv`
- `tests/bug-report/build_5/` và `tests/bug-report/build_6/`
- `tests/test-summary/summary.md`
- `tests/test-summary/traceability-matrix-build-5-6.md`
- `tests/test-scripts/split_build_tests.js`
- `tests/test-scripts/generate_bug_reports.js`

## Giới hạn

Runner đánh giá JavaScript của trang trong mô hình DOM cô lập. Kết quả xác nhận logic và trạng thái control được mô phỏng, nhưng không thay thế kiểm thử trực quan, thao tác chuột/bàn phím hoặc kiểm thử tương thích trên trình duyệt thật.
