import { 
  OutfitState, 
  CultureCheckResult 
} from '../types';
import { ACCESSORIES_CATALOG } from '../data/options';
import { GARMENTS_DATA } from '../data/garments';

export function runCultureCheck(outfit: OutfitState): CultureCheckResult {
  const notes: string[] = [];
  const suggestions: string[] = [];
  let score = 95;
  let status: CultureCheckResult['status'] = 'fully_appropriate';
  let headline = 'Phối đồ chuẩn mực và hài hòa văn hóa';

  const garment = GARMENTS_DATA[outfit.garmentType];

  // 1. Accessory compatibility check
  for (const accId of outfit.accessories) {
    if (accId === 'none') continue;
    const accItem = ACCESSORIES_CATALOG.find(a => a.id === accId);
    if (!accItem) continue;

    if (!accItem.compatibleGarments.includes(outfit.garmentType)) {
      score -= 20;
      if (accId === 'non_quai_thao' && outfit.garmentType !== 'ao_tu_than') {
        notes.push(`Nón quai thao (nón ba tầm) là phụ vật mang tính định danh của phụ nữ Kinh Bắc khi mặc Áo tứ thân. Phối cùng ${garment.name} là sự kết hợp cách tân ngẫu hứng, chưa chuẩn chỉnh theo phong tục xưa.`);
        suggestions.push(`Thử thay thế bằng Khăn đóng hoặc Nón lá truyền thống để hòa hợp trọn vẹn với dáng áo ${garment.name}.`);
      } else if (accId === 'khan_mo_qua' && outfit.garmentType !== 'ao_tu_than') {
        notes.push(`Khăn mỏ quạ là nếp vấn đặc trưng của phụ nữ nông thôn Bắc Bộ đi liền với Áo tứ thân và yếm đào.`);
        suggestions.push(`Với ${garment.name}, bạn nên chọn Khăn đóng hoặc vấn tóc trần tự nhiên.`);
      }
    }
  }

  // 2. Occasion & Style nuance checks
  if (outfit.occasion === 'tham_quan_di_tich') {
    if (outfit.garmentType === 'ao_ngu_than') {
      notes.push(`Áo ngũ thân là trang phục hoàn hảo nhất cho không gian di tích cổ kính (Đại Nội, Hoàng thành, Văn Miếu), thể hiện sự trang nghiêm và hiểu biết sâu sắc về lịch sử.`);
    }

    if (outfit.style === 'genz_remix') {
      score -= 15;
      notes.push(`Tại các khu di tích lịch sử và đền miếu linh thiêng, phong cách Gen Z Remix cần chú ý giữ kín đáo: không xẻ tà quá cao, không mặc hở yếm lót quá đà.`);
      suggestions.push(`Cân nhắc chuyển sang phong cách 'Truyền Thống Nguyên Bản' hoặc 'Thanh Lịch Quý Phái' khi bước vào không gian thờ tự.`);
    }
  }

  if (outfit.occasion === 'chup_ky_yeu') {
    if (outfit.garmentType === 'ao_dai' && (outfit.primaryColor === 'white_ivory' || outfit.primaryColor === 'pink_lotus')) {
      notes.push(`Sắc trắng ngà hoặc hồng sen của tà Áo Dài là lựa chọn kinh điển tôn lên nét thuần khiết, rạng ngời của thời khắc tốt nghiệp và thanh xuân.`);
    }
  }

  if (outfit.occasion === 'le_hoi_van_hoa') {
    if (outfit.garmentType === 'ao_tu_than') {
      notes.push(`Áo tứ thân kết hợp yếm đào rực rỡ là linh hồn của các hội làng xuân xứ Bắc, tạo nên không khí trẩy hội vui tươi và đậm chất thơ.`);
    }
  }

  if (outfit.occasion === 'tet_nguyen_dan') {
    if (outfit.primaryColor === 'red_crimson' || outfit.primaryColor === 'yellow_gold') {
      notes.push(`Gam màu Đỏ son và Vàng hoàng cúc rất hợp phong thủy đầu năm mới, mang ý nghĩa may mắn, hưng thịnh và tràn đầy năng lượng tươi vui.`);
    }
  }

  // 3. Style categorization
  if (outfit.style === 'genz_remix') {
    if (score >= 80) {
      status = 'modern_adaptation';
      headline = 'Phong cách cách tân hài hòa – Cần phân biệt với trang phục cổ truyền nguyên bản';
      notes.push(`Bạn đang chọn phong cách cách tân đương đại. Đây là hướng đi trẻ trung giúp đưa Việt phục vào đời sống, nhưng người mặc nên hiểu rõ các chi tiết biến tấu so với nguyên bản.`);
    }
  }

  if (score < 80) {
    status = 'needs_consideration';
    headline = 'Có chi tiết cần cân nhắc để outfit tinh tế hơn';
  } else if (score >= 90 && status !== 'modern_adaptation') {
    status = 'fully_appropriate';
    headline = 'Tuyệt đối phù hợp bối cảnh & chuẩn mực văn hóa';
  }

  // Fallback defaults
  if (notes.length === 0) {
    notes.push(`Trang phục ${garment.name} được phối màu sắc và phụ kiện trang nhã, tôn lên nét duyên dáng của người mặc.`);
  }
  if (suggestions.length === 0) {
    suggestions.push(`Outfit này rất cân đối, bạn có thể tự tin diện đi sự kiện hoặc lưu lại vào Lookbook.`);
  }

  return {
    status,
    headline,
    score: Math.max(50, Math.min(100, score)),
    culturalNotes: notes,
    suggestions,
    contextValidation: `Đánh giá dựa trên quy tắc phục trang triều Nguyễn & dân gian Bắc Bộ kết hợp thẩm mỹ đương đại.`
  };
}
