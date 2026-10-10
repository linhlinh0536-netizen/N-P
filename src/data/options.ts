import { 
  GarmentColor, 
  AccessoryItem, 
  OccasionType, 
  StyleType 
} from '../types';

export const COLOR_PALETTE: GarmentColor[] = [
  {
    id: 'red_crimson',
    name: 'Đỏ Son / Đỏ Điều',
    vietnameseName: 'Đỏ Son Truyền Thống',
    hex: '#A32338',
    accentHex: '#D44A61',
    meaning: 'Tượng trưng cho sự may mắn, hoan hỷ, hưng vượng trong những ngày Tết và hôn lễ truyền thống.'
  },
  {
    id: 'white_ivory',
    name: 'Trắng Ngà Tơ Tằm',
    vietnameseName: 'Bạch Lụa Thuần Khiết',
    hex: '#F4EFE6',
    accentHex: '#D5C7B0',
    meaning: 'Nét đẹp thanh khiết của tơ tằm nguyên bản, gắn liền với vẻ đẹp nữ sinh và sự tinh khôi.'
  },
  {
    id: 'blue_teal',
    name: 'Xanh Cổ Vịt / Lam Ngọc',
    vietnameseName: 'Thanh Lam Cung Đình',
    hex: '#1D4D54',
    accentHex: '#3D7C85',
    meaning: 'Sắc thái điềm đạm, trí tuệ và quyền quý, lấy cảm hứng từ pháp lam và kiến trúc cung đình xưa.'
  },
  {
    id: 'pink_lotus',
    name: 'Hồng Phấn Cánh Sen',
    vietnameseName: 'Hồng Sen Nhẹ Nhàng',
    hex: '#D97D8E',
    accentHex: '#F0A8B6',
    meaning: 'Sắc hoa sen Việt Nam, toát lên nét thiếu nữ dịu dàng, trang nhã và ngọt ngào của tuổi trẻ.'
  },
  {
    id: 'yellow_gold',
    name: 'Vàng Hoàng Cúc / Hoàng Gia',
    vietnameseName: 'Hoàng Kim Đất Việt',
    hex: '#C89332',
    accentHex: '#E2B45A',
    meaning: 'Sắc vàng của hoa mai, mùa gặt trù phú và gam màu sang trọng của phục trang triều Nguyễn.'
  },
  {
    id: 'violet_hue',
    name: 'Tím Hoa Cà Xứ Huế',
    vietnameseName: 'Tím Thơ Cố Đô',
    hex: '#644365',
    accentHex: '#8C678E',
    meaning: 'Vẻ đẹp e ấp, thủy chung và thơ mộng, gắn với hình ảnh nữ sinh Đồng Khánh xứ Huế.'
  },
  {
    id: 'emerald_green',
    name: 'Xanh Lục Trúc',
    vietnameseName: 'Lục Trúc Tươi Sáng',
    hex: '#2E583A',
    accentHex: '#4C835D',
    meaning: 'Màu của ngọc bích và lũy tre làng, biểu trưng cho sức sống dẻo dai, thanh tao và bình yên.'
  }
];

export const OCCASIONS_LIST: { id: OccasionType; name: string; description: string; recommendedStyles: StyleType[] }[] = [
  {
    id: 'tet_nguyen_dan',
    name: 'Tết Nguyên Đán',
    description: 'Du xuân, chúc Tết gia đình, lễ chùa cầu an và chụp ảnh đón năm mới rực rỡ.',
    recommendedStyles: ['traditional', 'elegant', 'genz_remix']
  },
  {
    id: 'chup_ky_yeu',
    name: 'Chụp Kỷ Yếu & Tốt Nghiệp',
    description: 'Lưu giữ khoảnh khắc thanh xuân cùng bạn bè, trang phục cần thanh lịch, tôn dáng và ảnh lên hình sáng sủa.',
    recommendedStyles: ['elegant', 'minimalist']
  },
  {
    id: 'le_hoi_van_hoa',
    name: 'Lễ Hội Văn Hóa Dân Gian',
    description: 'Tham gia hội làng mùa xuân, hội Lim, các sự kiện tôn vinh di sản dân tộc.',
    recommendedStyles: ['traditional', 'genz_remix']
  },
  {
    id: 'tham_quan_di_tich',
    name: 'Tham Quan Di Tích Lịch Sử',
    description: 'Check-in Đại Nội Huế, Hoàng thành Thăng Long, Văn Miếu với phục trang trang nghiêm, đúng khuôn thước.',
    recommendedStyles: ['traditional', 'elegant']
  }
];

export const STYLES_LIST: { id: StyleType; name: string; tag: string; description: string }[] = [
  {
    id: 'traditional',
    name: 'Truyền Thống Nguyên Bản',
    tag: 'Classic Heritage',
    description: 'Tôn trọng tối đa form dáng, màu sắc và phụ kiện cổ truyền chuẩn mực.'
  },
  {
    id: 'elegant',
    name: 'Thanh Lịch Quý Phái',
    tag: 'Refined Elegance',
    description: 'Đường nét chỉn chu, gam màu nhã nhặn phối phụ kiện tối giản cao cấp.'
  },
  {
    id: 'minimalist',
    name: 'Tối Giản Hiện Đại',
    tag: 'Modern Minimal',
    description: 'Lược bớt chi tiết cầu kỳ, tôn vinh chất liệu và sự thoải mái cho Gen Z.'
  },
  {
    id: 'genz_remix',
    name: 'Gen Z Remix Đương Đại',
    tag: 'Heritage x Streetwear',
    description: 'Phá cách bảng màu, phối layering trẻ trung đầy cá tính nhưng không phản cảm.'
  }
];

export const ACCESSORIES_CATALOG: AccessoryItem[] = [
  {
    id: 'khan_dong',
    name: 'Khăn Đóng / Khăn Xếp',
    vietnameseName: 'Khăn Vấn Truyền Thống',
    description: 'Vấn nếp chữ Nhân hoặc chữ Nhất trên trán, mang phong thái trang trọng, chỉnh chu.',
    compatibleGarments: ['ao_dai', 'ao_ngu_than'],
    iconName: 'Crown'
  },
  {
    id: 'non_la',
    name: 'Nón Lá Bài Thơ',
    vietnameseName: 'Nón Lá Duyên Dáng',
    description: 'Biểu tượng hồn quê mộc mạc, che nắng dịu dàng và tôn nét e ấp của tà áo dài.',
    compatibleGarments: ['ao_dai', 'ao_tu_than', 'ao_ngu_than'],
    iconName: 'Sun'
  },
  {
    id: 'non_quai_thao',
    name: 'Nón Quai Thao (Nón Ba Tầm)',
    vietnameseName: 'Nón Quai Thao Kinh Bắc',
    description: 'Chiếc nón tròn phẳng rộng vành gắn liền với các liền chị Quan họ và bộ Áo Tứ Thân.',
    compatibleGarments: ['ao_tu_than'],
    iconName: 'Circle'
  },
  {
    id: 'khan_mo_qua',
    name: 'Khăn Mỏ Quạ',
    vietnameseName: 'Khăn Vấn Mỏ Quạ',
    description: 'Khăn lụa vuông đen gấp chéo vấn ôm sát đầu, nhô ra hình mỏ quạ trước trán khéo léo.',
    compatibleGarments: ['ao_tu_than'],
    iconName: 'Sparkles'
  },
  {
    id: 'tui_gam',
    name: 'Túi Gấm Thêu Hoa',
    vietnameseName: 'Túi Gấm Đeo Chéo Nhỏ',
    description: 'Túi mini may từ gấm hoa văn mây sóng, vừa đựng điện thoại vừa làm phụ kiện bắt mắt.',
    compatibleGarments: ['ao_dai', 'ao_tu_than', 'ao_ngu_than'],
    iconName: 'ShoppingBag'
  },
  {
    id: 'quat_xep',
    name: 'Quạt Xếp Phong Vân',
    vietnameseName: 'Quạt Xếp Giấy Điệp / Lụa',
    description: 'Cầm tay tạo dáng thanh tao, phe phẩy nét nho nhã của tao nhân mặc khách.',
    compatibleGarments: ['ao_dai', 'ao_ngu_than', 'ao_tu_than'],
    iconName: 'Feather'
  },
  {
    id: 'kieng_bac',
    name: 'Kiềng Bạc / Vòng Cổ Bạc Tối Giản',
    vietnameseName: 'Kiềng Bạc Chạm Hoa',
    description: 'Vòng tròn ôm sát chân cổ bằng bạc tinh xảo, điểm nhấn sang trọng cho Áo Dài.',
    compatibleGarments: ['ao_dai', 'ao_tu_than', 'ao_ngu_than'],
    iconName: 'Disc'
  },
  {
    id: 'none',
    name: 'Không Dùng Phụ Kiện',
    vietnameseName: 'Tối Giản Mộc Mạc',
    description: 'Tập trung trọn vẹn vào phom dáng và chất liệu của chiếc áo truyền thống.',
    compatibleGarments: ['ao_dai', 'ao_tu_than', 'ao_ngu_than'],
    iconName: 'Slash'
  }
];
