import { OutfitState, OccasionType, StyleType, GarmentType, ColorId, AccessoryId } from '../types';
import { OCCASIONS_LIST, STYLES_LIST, ACCESSORIES_CATALOG, COLOR_PALETTE } from '../data/options';
import { GARMENTS_DATA } from '../data/garments';

/**
 * Studio behavior, distinct from the Gemini service.
 * These are transparent, deterministic starter looks, not AI generated results.
 * Any subsequent manual change to garments, colors or accessories is respected.
 */
type LookPreset = { garmentType: GarmentType; style: StyleType; primaryColor: ColorId; accessories: AccessoryId[] };

const OCCASION_PRESETS: Record<OccasionType, LookPreset> = {
  tet_nguyen_dan:       { garmentType: 'ao_dai',    style: 'elegant',     primaryColor: 'red_crimson',  accessories: ['non_la', 'tui_gam'] },
  chup_ky_yeu:         { garmentType: 'ao_dai',    style: 'minimalist',  primaryColor: 'white_ivory', accessories: ['kieng_bac'] },
  le_hoi_van_hoa:      { garmentType: 'ao_tu_than',style: 'traditional', primaryColor: 'pink_lotus',  accessories: ['non_quai_thao'] },
  tham_quan_di_tich:   { garmentType: 'ao_ngu_than',style: 'traditional', primaryColor: 'blue_teal',   accessories: ['khan_dong', 'quat_xep'] },
};

const STYLE_PRESETS: Record<StyleType, { color: ColorId; accessories: AccessoryId[] }> = {
  traditional: { color: 'red_crimson', accessories: ['khan_dong'] },
  elegant:     { color: 'pink_lotus', accessories: ['kieng_bac'] },
  minimalist:  { color: 'white_ivory', accessories: ['none'] },
  genz_remix:  { color: 'emerald_green', accessories: ['tui_gam', 'quat_xep'] },
};

function compatibleAccessories(garment: GarmentType, accessories: AccessoryId[]): AccessoryId[] {
  const options = accessories.filter((id) =>
    id !== 'none' && ACCESSORIES_CATALOG.some((a) => a.id === id && a.compatibleGarments.includes(garment))
  );
  return options.length ? options : ['none'];
}

export function applyOccasionPreset(outfit: OutfitState, occasion: OccasionType): OutfitState {
  const preset = OCCASION_PRESETS[occasion];
  return {
    ...outfit,
    occasion,
    garmentType: preset.garmentType,
    style: preset.style,
    primaryColor: preset.primaryColor,
    accessories: compatibleAccessories(preset.garmentType, preset.accessories),
    title: undefined,
    secondaryColor: undefined,
  };
}

export function applyStylePreset(outfit: OutfitState, style: StyleType): OutfitState {
  const preset = STYLE_PRESETS[style];
  let accessories = compatibleAccessories(outfit.garmentType, preset.accessories);
  // For áo tứ thân, keep its own characteristic accessory when the user selects a heritage style.
  if (outfit.garmentType === 'ao_tu_than' && style === 'traditional') accessories = ['non_quai_thao'];
  if (outfit.garmentType === 'ao_ngu_than' && style === 'traditional') accessories = ['khan_dong'];
  return { ...outfit, style, primaryColor: preset.color, accessories, title: undefined };
}

export function getOutfitSummary(outfit: OutfitState): { title: string; detail: string } {
  const occasion = OCCASIONS_LIST.find((o) => o.id === outfit.occasion)?.name || '';
  const style = STYLES_LIST.find((s) => s.id === outfit.style)?.name || '';
  const garment = GARMENTS_DATA[outfit.garmentType]?.name || '';
  const color = COLOR_PALETTE.find((c) => c.id === outfit.primaryColor)?.name || '';
  const accessories = outfit.accessories.filter((a) => a !== 'none')
    .map((id) => ACCESSORIES_CATALOG.find((a) => a.id === id)?.name)
    .filter(Boolean)
    .join(' · ');
  return {
    title: `${garment} · ${occasion}`,
    detail: `${style} — ${color}${accessories ? ` · ${accessories}` : ' · Không phụ kiện'}`,
  };
}
