# AI Audit Report — 23120027

Tôi sử dụng các công cụ AI cho những tác vụ sau,

> Tên công cụ AI: Codex

**Lưu ý về thời gian:** Ngày làm việc được ghi nhận là 28/09/2026 (Asia/Saigon). Lịch sử phiên không cung cấp dấu thời gian riêng cho từng prompt, vì vậy giờ cụ thể được ghi là không khả dụng thay vì ước đoán.

## Lần tương tác 1

- **Tên công cụ AI:** Codex
- **Ngày và giờ:** 28/09/2026; 2:16pm.
- **Câu lệnh (prompt) của bạn:** “[https://testsheepnz.github.io/BasicCalculator.html](https://testsheepnz.github.io/BasicCalculator.html) thiết kế testcase tổng quát cho trang web, sau đó chạy test run cho từng build cụ thể.”
- **Kết quả do AI tạo ra:** Thiết kế 15 testcase tổng quát và script Node.js chạy trên Prototype cùng các build 1–9. Báo cáo lượt chạy có 114 PASS và 36 FAIL trên 150 lượt kiểm tra. Tạo `calculator-testcases.csv`, `run_calculator_tests.js`, `calculator-test-results.csv` và `README.md`. Bộ chạy tải JavaScript của trang và kiểm thử bằng mô hình DOM, không thao tác trên trình duyệt thật.

## Lần tương tác 2

- **Tên công cụ AI:** Codex
- **Ngày và giờ:** 28/09/2026; 2:22pm.
- **Câu lệnh (prompt) của bạn:** “push lên github”
- **Kết quả do AI tạo ra:** Commit và push bộ testcase, script, hướng dẫn và kết quả lên `https://github.com/ngthkhanhha/Testing_Class_Ex`, nhánh `main`, commit `aefe31f` (`Add calculator build test suite`). Không đưa PDF đang untracked vào commit.

## Lần tương tác 3

- **Tên công cụ AI:** Codex
- **Ngày và giờ:** 28/09/2026; 3:03pm.
- **Câu lệnh (prompt) của bạn:** “pull codde mới về”
- **Kết quả do AI tạo ra:** Cập nhật repo đến commit `6d292a0` (`feat: divide test case by function, add test run for build 1-2`), gồm testcase chia theo phép toán và kết quả chạy build 1–2. Git báo có xung đột với một số file untracked trong lúc pull; trạng thái cuối cùng cho thấy nhánh `main` đồng bộ với `origin/main`.

## Lần tương tác 4

- **Tên công cụ AI:** Codex
- **Ngày và giờ:** 28/09/2026; 3:07.
- **Câu lệnh (prompt) của bạn:** “push len github”
- **Kết quả do AI tạo ra:** Push commit `117147c` (`feat: add test run for buid 3, 4`) lên `origin/main` và xác nhận nhánh local đồng bộ với GitHub.

## Lần tương tác 5

- **Tên công cụ AI:** Codex
- **Ngày và giờ:** 28/09/2026; 7:01pm.
- **Câu lệnh (prompt) của bạn:** “bạn có thể cung cấp lại cho tôi các câu lệnh (promt) của tôi từ khi bắt đầu, ngày và giờ, kết quả do AI tạo ra”
- **Kết quả do AI tạo ra:** Tổng hợp các yêu cầu từ đầu phiên, ngày làm việc, giới hạn về timestamp, kết quả test và các thao tác Git chính.

