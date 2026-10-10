# NẾP v3 - Sửa nút Sự kiện và Phong cách

## Đã thay đổi
- `src/services/stylingPresets.ts` (file mới): preset cho 4 sự kiện / 4 phong cách, chỉ chọn phụ kiện phù hợp danh mục.
- `src/components/studio/OutfitControls.tsx`: bấm Sự kiện đổi sang mẫu phối gợi ý (áo + màu + phụ kiện + phong cách). Bấm Phong cách đổi màu và phụ kiện của áo đang chọn; vẫn cho phép tùy chỉnh tay sau đó.
- `src/pages/StudioPage.tsx`: hiển thị bản phối đang chọn dưới preview.
- `src/components/preview/OutfitCanvas.tsx`: tô vải chuyển sắc nhẹ và thêm chú thích sự kiện/phong cách trên preview. Không thay đổi kiến trúc layer SVG.

## Thử trực tiếp
- Tết Nguyên Đán => Áo dài đỏ, nón lá, túi gấm
- Kỷ yếu => Áo dài trắng, kiềng bạc
- Lễ hội => Áo tứ thân hồng, nón quai thao, khăn mỏ quạ
- Di tích => Áo ngũ thân xanh, khăn đóng, quạt xếp
- Traditional, Elegant, Minimalist, Gen Z Remix => bảng màu và phụ kiện đổi khác; vẫn giữ loại áo đang chọn.

## Lưu ý quan trọng về hình minh họa
`docs/MAU_THAM_KHAO_TRANH_VE_TAY.png` là hình tham khảo art direction, KHÔNG phải UI/renderer đang hoạt động. Mã nguồn vẫn sử dụng SVG động, nên chưa đạt chất lượng tranh vẽ tay như ảnh tham chiếu. Muốn chất lượng ấy và đồng thời đổi màu/đổi phụ kiện thực sự, cần một bộ tài sản minh họa tách lớp (nhân vật nền / mỗi kiểu áo / từng phụ kiện) cùng hệ tọa độ nhất quán. Không nên dùng ảnh minh họa tĩnh rồi giả vờ các nút phối đồ đã làm thay đổi áo.

## Cách cập nhật trong AI Studio Build
Mở Code của project hiện tại, thay ba file tương ứng và tạo mới `src/services/stylingPresets.ts`, xem Preview và bấm refresh. Không đưa file `docs` vào trình dựng SVG. Nếu sử dụng ZIP để làm việc ở local, chạy theo README gốc của project.

## Trạng thái kiểm thử
- Kiểm tra parser TypeScript/TSX cho bốn file thay đổi: không có lỗi cú pháp.
- Chạy unit checks cho 4 sự kiện / 4 phong cách và phụ kiện hợp lệ: đã qua.
- Chưa xác nhận full Vite build hay browser E2E vì bộ dependency chưa cài được trong container này.
