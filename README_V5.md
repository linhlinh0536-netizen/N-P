# NẾP v5 — hand-drawn outfits + interactive illustrated accessories

## Đã bổ sung
- `src/components/preview/OutfitCanvas.tsx` dùng tranh minh họa vẽ tay và đổi hình theo cả loại Việt phục + 7 sắc màu.
- `src/assets/illustrations/v5/`: 21 ảnh WebP từ bộ 9 tranh NẾP v4; có biến thể màu kỹ thuật số giữ chất liệu minh họa.
- `src/components/preview/AccessoryArt.tsx`: phụ kiện có tọa độ cố định trên canvas 1086 × 1448 gồm nón lá có quai, nón quai thao có dây, khăn đóng, khăn mỏ quạ, quạt xếp, túi gấm và kiềng bạc.
- Chọn một kiểu đội đầu tại một thời điểm; phụ kiện không tương thích bị khóa trong phần Studio.
- Sửa preset Lễ hội chỉ dùng nón quai thao, tránh tự đeo hai loại khăn/nón cùng một lúc.
- Giữ `OutfitCanvas` API dùng chung cho trang chủ, khám phá, Studio và Lookbook.

## Cách dùng với repo `N-P` trên Mac
1. Giải nén `NEP_v5_patch_GitHub.zip` **vào chính thư mục repo N-P**, không tạo thư mục con:
   `unzip -o "$HOME/Downloads/NEP_v5_patch_GitHub.zip" -d "$HOME/Documents/GitHub/N-P"`
2. Mở GitHub Desktop > Changes, kiểm tra file mới; Commit > Push origin.
3. Trong Google AI Studio Build, mở dự án cũ, phần GitHub sync để lấy commit mới từ `main` (hoặc làm mới nếu công cụ tự đồng bộ), sau đó mở Preview.
4. Thử 3 bộ mẫu và các lựa chọn màu/phụ kiện. Trước khi deploy, kiểm tra `npm install`, `npm run lint`, `npm run build` trong môi trường có kết nối mạng.

## Giới hạn hiện tại
- Đây là minh họa thời trang kỹ thuật số lấy cảm hứng từ Việt phục, **không phải phục dựng lịch sử chính xác**; những mô tả Cultural DNA vẫn phải được rà soát với nguồn tư liệu đáng tin cậy.
- Các biến thể xanh lam, vàng, tím, xanh lục... là **tô màu kỹ thuật số** trên tranh nền, không phải tranh minh họa mới vẽ từ đầu cho từng sắc.
- Phụ kiện là đồ họa SVG có nét mềm đặt tại điểm neo trên hình: vẫn có thể lệch nhẹ với vài kiểu dáng tóc hoặc tư thế, và không phải thử đồ AI trên ảnh thật.
- Ở môi trường tạo bản vá, thiếu dependencies NPM và không thể kiểm tra build toàn bộ ứng dụng. Đã kiểm tra cú pháp TS/TSX, định dạng asset và dựng thử hình phụ kiện độc lập. Hãy chạy build trong AI Studio và gửi log nếu lỗi.
