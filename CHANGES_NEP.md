# NẾP – sửa phần nhân vật / phụ kiện (bản thử nghiệm)

Đã thay `src/components/preview/OutfitCanvas.tsx`:

- Vẽ lại nhân vật nữ 2D theo hướng minh họa thời trang mềm hơn: tóc dài, mắt/môi có nét vẽ chi tiết, gương mặt rộng và cân đối hơn.
- Vẽ áo dài, áo tứ thân và áo ngũ thân theo 3 bộ silhouette riêng, nhưng dùng chung các điểm neo của cơ thể; không vẽ các mảng da vai và bắp tay bên dưới ống tay.
- Đặt nón lá với hai điểm neo dây dưới vành, dây dẫn về dưới cằm; nón quai thao có hai dải lụa xuất phát dưới vành nón; quạt gắn tại bàn tay phải.
- Giữ nguyên `OutfitCanvas` API, cấu trúc `OutfitState`, danh mục màu và các tính năng của app. Các component Studio/AI/Lookbook không phải sửa.
- Dùng ID gradient độc lập cho mỗi bản render để nhiều outfit trên Lookbook không dùng lẫn gradient.

## Kiểm tra đã thực hiện
- Chuyển TSX sang JS bằng TypeScript `transpileModule` để kiểm tra cú pháp.
- Render thử các SVG tương ứng: áo dài hồng + nón lá, tứ thân hồng + nón quai thao, ngũ thân đỏ + khăn đóng/quạt. Các SVG chuyển thành PNG thành công.
- Chưa kiểm tra được `npm run build` đầy đủ trong môi trường này do không cài đặt được dependencies. Vì vậy cần mở lại project trong AI Studio Build và kiểm tra giao diện thật.

## Cách cập nhật
- Dùng mã nguồn ZIP đã sửa, **hoặc** chỉ thay file `src/components/preview/OutfitCanvas.tsx` trong project NẾP đang có.
- Không đưa API key vào mã nguồn. Giữ biến `GEMINI_API_KEY` trong Secrets phía server.
- Sau khi cập nhật, thử lần lượt 3 kiểu áo, tất cả màu, và các phụ kiện; xem cả Studio và Lookbook.

**Giới hạn thẩm mỹ:** Bản này vẫn là SVG vẽ tay bằng code (vector illustration), không phải tranh chì minh họa chất lượng họa sĩ như ảnh tham chiếu. Để đạt gần ảnh tham chiếu hơn, cần một bộ illustration/layer chuyên dụng do họa sĩ hoặc công cụ đồ họa tạo ra, căn chỉnh chung tọa độ cho 3 trang phục.
