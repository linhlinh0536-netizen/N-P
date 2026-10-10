import { GarmentDetail } from '../types';

export const GARMENTS_DATA: Record<string, GarmentDetail> = {
  ao_dai: {
    id: 'ao_dai',
    name: 'Áo Dài',
    era: 'Thế kỷ 18 đến nay (Phát triển mạnh từ thập niên 1930)',
    subtitle: 'Biểu tượng tinh hoa vẻ đẹp Việt Nam thanh thoát và duyên dáng',
    shortDescription: 'Trang phục biểu tượng với thân áo ôm sát, xẻ tà cao hai bên hông và quần lụa suông, tôn vinh nét mềm mại uyển chuyển.',
    fullHistory: `Áo dài có nguồn gốc sâu xa từ chiếc áo ngũ thân lập lĩnh thời chúa Nguyễn Phúc Khoát (thế kỷ 18). Đến thập niên 1930, phong trào cách tân của nhóm Tự Lực Văn Đoàn, nổi bật là họa sĩ Cát Tường (Le Mur) và họa sĩ Lê Phổ đã dung hòa đường nét phương Tây hiện đại với dáng dấp truyền thống. 
Sau đó, sự ra đời của kiểu ráp tay Raglan (thập niên 1960 tại Sài Gòn) giúp loại bỏ nếp nhăn ở nách áo, định hình diện mạo thanh thoát của chiếc Áo Dài đương đại như ngày nay.`,
    keyFeatures: [
      'Cổ áo đứng hoặc cổ thuyền nhẹ nhàng, ôm gọn vòng cổ',
      'Thân áo ôm nhẹ theo đường cong tự nhiên, xẻ tà hai bên từ eo',
      'Hai tà áo (tà trước và tà sau) buông dài duyên dáng',
      'Quần lụa ống rộng dài chấm gót, tạo bước đi uyển chuyển'
    ],
    components: [
      {
        name: 'Thân áo & Hai tà',
        description: 'May từ lụa, gấm hoặc tơ tằm mềm mại, tà áo bay bổng theo từng bước đi.'
      },
      {
        name: 'Cổ áo (Lập lĩnh / Cổ thuyền)',
        description: 'Cổ đứng truyền thống cao khoảng 2-3cm hoặc cổ thuyền hiện đại thoải mái.'
      },
      {
        name: 'Hàng cúc bấm chéo',
        description: 'Chạy từ cổ áo chéo sang vai và nách bên phải, giữ form áo phẳng phiu.'
      },
      {
        name: 'Quần lụa',
        description: 'Ống rộng suông dài bằng chất liệu lụa satin mượt mà, thường có màu trắng hoặc tương phản với thân áo.'
      }
    ],
    culturalSignificance: 'Áo Dài đại diện cho tính cách người phụ nữ Việt Nam: kín đáo mà gợi cảm, khiêm nhường nhưng tự tin và đầy khí chất nghệ thuật.',
    modernStylingTips: [
      'Kết hợp cùng kiềng bạc hoặc chuỗi ngọc trai tối giản để giữ nét thanh tao.',
      'Khi chụp kỷ yếu hoặc du xuân, có thể chọn tà áo lụa tơ sống với gam màu pastel trẻ trung.',
      'Tránh chọn tà quá ngắn hoặc xẻ eo quá cao làm mất đi sự trang nhã vốn có.'
    ],
    historicalNotes: 'Tài liệu lịch sử xác nhận Áo Dài hiện đại là quá trình tiến hóa liên tục từ Áo Ngũ Thân sang Áo Lemur, Áo Lê Phổ và Áo Raglan, phản ánh nhịp thở giao lưu văn hóa Đông - Tây.',
    defaultColor: 'pink_lotus',
    defaultAccessories: ['kieng_bac', 'quat_xep']
  },

  ao_tu_than: {
    id: 'ao_tu_than',
    name: 'Áo Tứ Thân',
    era: 'Thế kỷ 12 - Thế kỷ 20 (Đặc trưng vùng văn hóa Kinh Bắc)',
    subtitle: 'Nét đẹp hồn hậu, phóng khoáng gắn liền với điệu ca Quan họ và lễ hội mùa xuân',
    shortDescription: 'Trang phục mộc mạc và linh hoạt gồm 4 vạt áo, yếm đào bên trong, thắt lưng lụa và nón quai thao trứ danh.',
    fullHistory: `Áo tứ thân gắn bó mật thiết với cuộc sống của người phụ nữ nông thôn và thị dân miền Bắc xưa, đặc biệt là vùng châu thổ sông Hồng và Kinh Bắc. Thiết kế 4 thân xuất phát từ sự tiện dụng trong sinh hoạt và lao động (hai vạt sau may liền thành sống áo, hai vạt trước để buông hoặc buộc chéo trước bụng). 
Trong không gian lễ hội làng và hát dân ca Quan họ, Áo tứ thân được nâng lên tầm biểu tượng văn hóa với sự kết hợp nhiều lớp màu sắc rực rỡ tượng trưng cho ngũ hành và vẻ đẹp ý nhị.`,
    keyFeatures: [
      'Phần lưng gồm 2 thân áo may ghép lại thành một đường sống thẳng thớm',
      'Hai thân trước buông dài, có thể để mở hoặc buộc nút tự nhiên trước bụng',
      'Mặc lót bên trong là chiếc yếm đào (hoặc yếm trắng/cổ xây) tôn nét thanh xuân',
      'Thắt lưng lụa bao ngoài (ruột tượng) với dải lụa mềm bay bổng',
      'Váy đụp hoặc chân váy lụa đen chấm gót, tạo độ xòe uyển chuyển'
    ],
    components: [
      {
        name: 'Áo khoác ngoài (Tứ thân)',
        description: 'Dài qua gối, không cài cúc, để lộ lớp áo cánh và yếm thêu bên trong.'
      },
      {
        name: 'Yếm đào',
        description: 'Tấm vải hình quả trám ôm ngực với dây buộc sau gáy và sau lưng, thường mang sắc hồng đào, đỏ điều hoặc xanh nhạt.'
      },
      {
        name: 'Thắt lưng bao & Ruột tượng',
        description: 'Dải lụa màu xanh lá mạ hoặc hồng sen thắt ngang eo, vừa giữ dáng vừa tạo điểm nhấn màu sắc.'
      },
      {
        name: 'Chân váy lụa (Váy đụp)',
        description: 'Màu đen hoặc sẫm màu, rộng rãi giúp người mặc bước đi khoan thai.'
      }
    ],
    culturalSignificance: 'Bốn vạt áo tượng trưng cho tứ thân phụ mẫu (cha mẹ đẻ và cha mẹ chồng). Hai vạt trước buộc lại vào nhau tượng trưng cho tình nghĩa vợ chồng son sắt, thủy chung.',
    modernStylingTips: [
      'Bộ đôi Áo tứ thân và Nón quai thao là combo hoàn hảo cho các bộ ảnh du xuân hoặc lễ hội dân gian.',
      'Gen Z có thể kết hợp áo tứ thân dạng khoác cape với trang phục tối giản bên trong để tạo vibe thời trang đương đại.',
      'Nên giữ màu yếm đào hài hòa, tránh lạm dụng cắt xẻ yếm hở lưng quá mức trong không gian tôn nghiêm.'
    ],
    historicalNotes: 'Áo tứ thân là trang phục bình dân và lễ hội dân gian miền Bắc, cần phân biệt với Áo giao lĩnh của tầng lớp quý tộc thời Lê - Nguyễn.',
    defaultColor: 'red_crimson',
    defaultAccessories: ['non_quai_thao', 'khan_mo_qua']
  },

  ao_ngu_than: {
    id: 'ao_ngu_than',
    name: 'Áo Ngũ Thân',
    era: 'Năm 1744 (Chúa Nguyễn Phúc Khoát) - Thế kỷ 20',
    subtitle: 'Khuôn thước văn hóa cung đình, chuẩn mực y phục dân tộc Việt Nam thế kỷ 18-19',
    shortDescription: 'Chiếc áo năm thân lập lĩnh trang nghiêm với 5 hạt cúc biểu trưng cho Ngũ thường, là tiền thân trực tiếp của Áo Dài.',
    fullHistory: `Năm 1744, chúa Nguyễn Phúc Khoát ban hành quy định cải cách trang phục Đàng Trong, sáng tạo nên chiếc áo ngũ thân để phân biệt y phục Đại Việt với các nước lân cận. 
Đến năm 1827 và 1837, vua Minh Mạng triều Nguyễn ban chỉ dụ thống nhất y phục từ Bắc chí Nam, đưa Áo Ngũ Thân thành quốc phục của toàn dân từ thường dân đến quan lại và hoàng tộc. Áo có cả phiên bản tay chẽn (thuận tiện hoạt động) và tay thụng (Áo Tấc, dành cho lễ nghi long trọng).`,
    keyFeatures: [
      'Gồm 5 thân vải: 4 thân ngoài (trước - sau) và 1 thân con (thân nội) lót bên trong',
      'Cổ đứng vuông góc (Lập lĩnh) cao ôm sát cổ, giữ phong thái ngay ngắn',
      'Cài 5 hạt cúc (nút khuy) bên phải bằng ngọc, đồng, bạc hoặc gỗ quý',
      'Đường may kín đáo, giấu mối tinh tế, thể hiện đạo làm người khiêm cung, chỉnh tề',
      'Quần hai ống thụng trắng hoặc đen mặc kèm'
    ],
    components: [
      {
        name: 'Năm thân áo (Ngũ thân)',
        description: 'Tượng trưng cho Tứ thân phụ mẫu che chở cho thân con (thân thứ năm nhỏ hơn nằm bên trong).'
      },
      {
        name: 'Năm hạt cúc (Ngũ cúc)',
        description: 'Biểu trưng cho Ngũ thường: Nhân, Lễ, Nghĩa, Trí, Tín - chuẩn mực đạo đức người Việt.'
      },
      {
        name: 'Cổ lập lĩnh (Cổ đứng)',
        description: 'May đứng thẳng thớm, bên trong có lớp cổ lót trắng biểu hiện sự sạch sẽ, đoan chính.'
      },
      {
        name: 'Quần thụng & Khăn đóng',
        description: 'Quần trắng lụa suông rộng và khăn quấn (khăn đóng) chữ Nhân hoặc chữ Nhất trên trán.'
      }
    ],
    culturalSignificance: 'Mỗi đường kim mũi chỉ của Áo Ngũ Thân đều chứa đựng triết lý nhân sinh: che chở ruột thịt, tôn trọng tôn ti trật tự và giữ gìn cốt cách thanh cao của bậc chính nhân quân tử.',
    modernStylingTips: [
      'Áo ngũ thân tay chẽn phối cùng khăn đóng và giày da hoặc guốc mộc hiện đại đang là trào lưu cực hot của giới trẻ khi đi di tích cố đô Huế hay Hoàng thành Thăng Long.',
      'Nên chọn chất liệu gấm dệt hoa văn chữ Thọ hoặc mây sóng thủy ba để tạo vẻ sang trọng chuẩn mực cổ truyền.',
      'Mặc áo ngũ thân đòi hỏi cài đủ 5 nút cúc để thể hiện sự tôn trọng tri thức văn hóa tiền nhân.'
    ],
    historicalNotes: 'Ghi chép trong "Gia Định thành thông chí" của Trịnh Hoài Đức và "Đại Nam thực lục" ghi nhận rõ dấu ấn cải cách y phục của Chúa Nguyễn và vua Minh Mạng.',
    defaultColor: 'blue_teal',
    defaultAccessories: ['khan_dong', 'quat_xep']
  }
};
