export type GarmentType = 'ao_dai' | 'ao_tu_than' | 'ao_ngu_than';

export type OccasionType = 
  | 'tet_nguyen_dan'
  | 'chup_ky_yeu'
  | 'le_hoi_van_hoa'
  | 'tham_quan_di_tich';

export type StyleType = 
  | 'traditional'
  | 'elegant'
  | 'minimalist'
  | 'genz_remix';

export type ColorId = 
  | 'red_crimson'
  | 'white_ivory'
  | 'blue_teal'
  | 'pink_lotus'
  | 'yellow_gold'
  | 'violet_hue'
  | 'emerald_green';

export type AccessoryId = 
  | 'khan_dong'
  | 'non_la'
  | 'non_quai_thao'
  | 'khan_mo_qua'
  | 'tui_gam'
  | 'quat_xep'
  | 'kieng_bac'
  | 'none';

export interface GarmentColor {
  id: ColorId;
  name: string;
  vietnameseName: string;
  hex: string;
  accentHex: string;
  meaning: string;
}

export interface AccessoryItem {
  id: AccessoryId;
  name: string;
  vietnameseName: string;
  description: string;
  compatibleGarments: GarmentType[];
  iconName: string;
}

export interface GarmentDetail {
  id: GarmentType;
  name: string;
  era: string;
  subtitle: string;
  shortDescription: string;
  fullHistory: string;
  keyFeatures: string[];
  components: {
    name: string;
    description: string;
  }[];
  culturalSignificance: string;
  modernStylingTips: string[];
  historicalNotes: string;
  defaultColor: ColorId;
  defaultAccessories: AccessoryId[];
}

export interface OutfitState {
  id?: string;
  title?: string;
  garmentType: GarmentType;
  occasion: OccasionType;
  style: StyleType;
  primaryColor: ColorId;
  secondaryColor?: ColorId; // for yếm / belt / trousers
  accessories: AccessoryId[];
  createdAt?: string;
  notes?: string;
}

export type CultureCheckStatus = 
  | 'fully_appropriate'
  | 'modern_adaptation'
  | 'needs_consideration'
  | 'insufficient_data';

export interface CultureCheckResult {
  status: CultureCheckStatus;
  headline: string;
  score: number; // 0 - 100
  culturalNotes: string[];
  suggestions: string[];
  contextValidation: string;
}

export interface StylistRecommendation {
  outfit: OutfitState;
  explanation: string;
  whyNepChoseThis: string;
  culturalDNAHighlights: string[];
  changedFields?: string[];
  source: 'gemini' | 'rule_engine';
}
