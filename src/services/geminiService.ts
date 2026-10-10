import { 
  OutfitState, 
  StylistRecommendation, 
  GarmentType, 
  OccasionType, 
  StyleType, 
  ColorId, 
  AccessoryId 
} from '../types';
import { GARMENTS_DATA } from '../data/garments';
import { COLOR_PALETTE } from '../data/options';

export interface StylistRequest {
  prompt: string;
  currentOutfit: OutfitState;
  taskType?: 'recommend' | 'modify';
}

export async function requestStylistAdvice(req: StylistRequest): Promise<StylistRecommendation> {
  try {
    const res = await fetch('/api/gemini/stylist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.recommendation) {
        return {
          ...data.recommendation,
          source: data.mode === 'gemini' ? 'gemini' : 'rule_engine'
        };
      }
    }
  } catch (err) {
    console.warn('Backend stylist API not reachable, falling back to smart rule engine.', err);
  }

  // Fallback to Smart Demo Rule Engine
  return generateRuleBasedStylistRecommendation(req);
}

export function generateRuleBasedStylistRecommendation(req: StylistRequest): StylistRecommendation {
  const text = (req.prompt || '').toLowerCase();
  const current = req.currentOutfit;

  let garmentType: GarmentType = current.garmentType;
  let occasion: OccasionType = current.occasion;
  let style: StyleType = current.style;
  let primaryColor: ColorId = current.primaryColor;
  let accessories: AccessoryId[] = [...current.accessories];

  // Parse garment
  if (text.includes('áo dài') || text.includes('ao dai')) {
    garmentType = 'ao_dai';
  } else if (text.includes('tứ thân') || text.includes('tu than')) {
    garmentType = 'ao_tu_than';
  } else if (text.includes('ngũ thân') || text.includes('ngu than')) {
    garmentType = 'ao_ngu_than';
  }

  // Parse occasion
  if (text.includes('tết') || text.includes('tet') || text.includes('xuân') || text.includes('xuan')) {
    occasion = 'tet_nguyen_dan';
  } else if (text.includes('kỷ yếu') || text.includes('ky yeu') || text.includes('tốt nghiệp') || text.includes('tot nghiep')) {
    occasion = 'chup_ky_yeu';
  } else if (text.includes('lễ hội') || text.includes('le hoi') || text.includes('hội làng') || text.includes('quan họ')) {
    occasion = 'le_hoi_van_hoa';
  } else if (text.includes('di tích') || text.includes('di tich') || text.includes('cố đô') || text.includes('huế') || text.includes('chùa') || text.includes('hoàng thành')) {
    occasion = 'tham_quan_di_tich';
  }

  // Parse color
  if (text.includes('đỏ') || text.includes('do')) {
    primaryColor = 'red_crimson';
  } else if (text.includes('trắng') || text.includes('trang') || text.includes('bạch')) {
    primaryColor = 'white_ivory';
  } else if (text.includes('xanh') || text.includes('lam') || text.includes('ngọc')) {
    if (text.includes('lục') || text.includes('lá')) {
      primaryColor = 'emerald_green';
    } else {
      primaryColor = 'blue_teal';
    }
  } else if (text.includes('hồng') || text.includes('hong') || text.includes('sen') || text.includes('pastel')) {
    primaryColor = 'pink_lotus';
  } else if (text.includes('vàng') || text.includes('vang') || text.includes('mai')) {
    primaryColor = 'yellow_gold';
  } else if (text.includes('tím') || text.includes('tim')) {
    primaryColor = 'violet_hue';
  }

  // Parse style
  if (text.includes('truyền thống') || text.includes('nguyên bản') || text.includes('cổ')) {
    style = 'traditional';
  } else if (text.includes('thanh lịch') || text.includes('sang') || text.includes('nhẹ nhàng')) {
    style = 'elegant';
  } else if (text.includes('tối giản') || text.includes('minimal')) {
    style = 'minimalist';
  } else if (text.includes('trẻ trung') || text.includes('phá cách') || text.includes('gen z') || text.includes('remix') || text.includes('chất')) {
    style = 'genz_remix';
  }

  // Smart accessory alignment based on garment & occasion
  if (garmentType === 'ao_tu_than') {
    accessories = ['non_quai_thao', 'khan_mo_qua'];
  } else if (garmentType === 'ao_ngu_than') {
    accessories = ['khan_dong', 'quat_xep'];
  } else {
    // Ao dai
    if (occasion === 'chup_ky_yeu') {
      accessories = ['kieng_bac', 'non_la'];
    } else if (occasion === 'tet_nguyen_dan') {
      accessories = ['kieng_bac', 'quat_xep'];
    } else {
      accessories = ['kieng_bac'];
    }
  }

  if (text.includes('không phụ kiện') || text.includes('bỏ phụ kiện') || text.includes('đơn giản hết mức')) {
    accessories = ['none'];
  }

  const garment = GARMENTS_DATA[garmentType];
  const colorObj = COLOR_PALETTE.find(c => c.id === primaryColor) || COLOR_PALETTE[0];

  const changedFields: string[] = [];
  if (garmentType !== current.garmentType) changedFields.push('Loại trang phục');
  if (primaryColor !== current.primaryColor) changedFields.push('Màu sắc');
  if (occasion !== current.occasion) changedFields.push('Sự kiện');
  if (style !== current.style) changedFields.push('Phong cách');

  return {
    outfit: {
      garmentType,
      occasion,
      style,
      primaryColor,
      accessories,
      title: `Outfit ${garment.name} - ${colorObj.name}`
    },
    explanation: `NẾP đề xuất bộ ${garment.name} mang sắc ${colorObj.name}, được tối ưu cho dịp ${getOccasionName(occasion)} theo phong cách ${getStyleName(style)}.`,
    whyNepChoseThis: `Sự kết hợp giữa phom dáng ${garment.name} và gam màu ${colorObj.vietnameseName} đem lại vẻ ngoài vừa giữ trọn chiều sâu di sản, vừa có nét phóng khoáng, thanh tân của Gen Z. Các phụ kiện đi kèm đảm bảo đúng quy chuẩn văn hóa bản địa.`,
    culturalDNAHighlights: [
      `Phom dáng ${garment.name}: ${garment.subtitle}`,
      `Ý nghĩa sắc màu: ${colorObj.meaning}`,
      `Phụ kiện hòa hợp với văn hóa truyền thống Việt Nam.`
    ],
    changedFields,
    source: 'rule_engine'
  };
}

function getOccasionName(occ: OccasionType): string {
  switch (occ) {
    case 'tet_nguyen_dan': return 'Tết Nguyên Đán';
    case 'chup_ky_yeu': return 'Chụp Kỷ Yếu';
    case 'le_hoi_van_hoa': return 'Lễ Hội Văn Hóa';
    case 'tham_quan_di_tich': return 'Tham Quan Di Tích';
  }
}

function getStyleName(sty: StyleType): string {
  switch (sty) {
    case 'traditional': return 'Truyền Thống Nguyên Bản';
    case 'elegant': return 'Thanh Lịch Quý Phái';
    case 'minimalist': return 'Tối Giản Hiện Đại';
    case 'genz_remix': return 'Gen Z Remix';
  }
}
