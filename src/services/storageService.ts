import { OutfitState } from '../types';

const STORAGE_KEY = 'nep_viet_phuc_lookbook_v1';

export const DEFAULT_LOOKBOOK: OutfitState[] = [
  {
    id: 'look-tet-sac-xuan',
    title: 'Sắc Xuân Cố Đô',
    garmentType: 'ao_ngu_than',
    occasion: 'tet_nguyen_dan',
    style: 'traditional',
    primaryColor: 'red_crimson',
    secondaryColor: 'yellow_gold',
    accessories: ['khan_dong', 'quat_xep'],
    createdAt: '2026-02-10T10:00:00.000Z',
    notes: 'Áo ngũ thân sắc đỏ son du xuân Hoàng thành Huế, phối quạt xếp và khăn đóng trang nhã.'
  },
  {
    id: 'look-ha-noi-thanh-xuan',
    title: 'Thanh Xuân Ba Đình',
    garmentType: 'ao_dai',
    occasion: 'chup_ky_yeu',
    style: 'elegant',
    primaryColor: 'white_ivory',
    secondaryColor: 'white_ivory',
    accessories: ['kieng_bac', 'non_la'],
    createdAt: '2026-03-15T14:30:00.000Z',
    notes: 'Tà áo dài trắng ngà tơ tằm cổ điển chụp kỷ yếu bên bờ hồ Hoàn Kiếm, kiềng bạc thanh tao.'
  },
  {
    id: 'look-kinh-bac-tray-hoi',
    title: 'Hội Lim Nắng Mới',
    garmentType: 'ao_tu_than',
    occasion: 'le_hoi_van_hoa',
    style: 'traditional',
    primaryColor: 'pink_lotus',
    secondaryColor: 'emerald_green',
    accessories: ['non_quai_thao', 'khan_mo_qua'],
    createdAt: '2026-04-01T09:15:00.000Z',
    notes: 'Áo tứ thân yếm đào duyên dáng trẩy hội vùng Kinh Bắc, tay nâng nón quai thao thắt dải thao xanh.'
  }
];

let inMemoryLooks: OutfitState[] = [...DEFAULT_LOOKBOOK];

export function getSavedLooks(): OutfitState[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LOOKBOOK));
        } catch {
          // ignore set error in restricted storage
        }
        return inMemoryLooks;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryLooks = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn('LocalStorage unavailable, using in-memory lookbook storage', e);
  }
  return inMemoryLooks;
}

export function saveLook(outfit: Omit<OutfitState, 'id' | 'createdAt'> & { id?: string }): OutfitState {
  const looks = getSavedLooks();
  const newLook: OutfitState = {
    ...outfit,
    id: outfit.id || `nep-look-${Date.now()}`,
    title: outfit.title || `Bộ Phối #${looks.length + 1}`,
    createdAt: new Date().toISOString()
  };

  const existingIndex = looks.findIndex(l => l.id === newLook.id);
  let updated: OutfitState[];
  if (existingIndex >= 0) {
    updated = [...looks];
    updated[existingIndex] = newLook;
  } else {
    updated = [newLook, ...looks];
  }

  inMemoryLooks = updated;

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn('LocalStorage setItem unavailable', e);
  }

  return newLook;
}

export function deleteLook(id: string): OutfitState[] {
  const looks = getSavedLooks();
  const updated = looks.filter(l => l.id !== id);
  inMemoryLooks = updated;

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn('LocalStorage removeItem unavailable', e);
  }
  return updated;
}
