import React from 'react';
import { 
  OutfitState, 
  GarmentType, 
  OccasionType, 
  StyleType, 
  ColorId, 
  AccessoryId 
} from '../../types';
import { 
  COLOR_PALETTE, 
  OCCASIONS_LIST, 
  STYLES_LIST, 
  ACCESSORIES_CATALOG 
} from '../../data/options';
import { GARMENTS_DATA } from '../../data/garments';
import { applyOccasionPreset, applyStylePreset, getOutfitSummary } from '../../services/stylingPresets';
import { 
  Sparkles, 
  RotateCcw, 
  Dices, 
  Bookmark, 
  BookOpen, 
  Check, 
  Info 
} from 'lucide-react';

interface OutfitControlsProps {
  outfit: OutfitState;
  onChange: (updated: OutfitState) => void;
  onReset: () => void;
  onRandom: () => void;
  onSaveLook: () => void;
  onOpenStylist: () => void;
  onOpenCulturalDna: () => void;
}

export const OutfitControls: React.FC<OutfitControlsProps> = ({
  outfit,
  onChange,
  onReset,
  onRandom,
  onSaveLook,
  onOpenStylist,
  onOpenCulturalDna,
}) => {
  const currentGarment = GARMENTS_DATA[outfit.garmentType];
  const exclusiveHeadwear: AccessoryId[] = ['non_la','non_quai_thao','khan_dong','khan_mo_qua'];

  const handleGarmentChange = (type: GarmentType) => {
    const garment = GARMENTS_DATA[type];
    // Keep compatible accessories, or fallback to default
    const validAccessories = outfit.accessories.filter(accId => {
      const item = ACCESSORIES_CATALOG.find(a => a.id === accId);
      return item && item.compatibleGarments.includes(type);
    });

    onChange({
      ...outfit,
      garmentType: type,
      accessories: validAccessories.length > 0 ? validAccessories : garment.defaultAccessories
    });
  };

  const handleAccessoryToggle = (accId: AccessoryId) => {
    if (accId === 'none') {
      onChange({ ...outfit, accessories: ['none'] });
      return;
    }

    let next: AccessoryId[] = outfit.accessories.filter(id => id !== 'none');
    if (next.includes(accId)) {
      next = next.filter(id => id !== accId);
      if (next.length === 0) next = ['none'];
    } else {
      if (exclusiveHeadwear.includes(accId)) {
        next = next.filter(id => !exclusiveHeadwear.includes(id));
      }
      next.push(accId);
    }
    onChange({ ...outfit, accessories: next });
  };

  return (
    <div className="flex flex-col gap-8 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#EDE5D8] shadow-sm">
      
      {/* SECTION 1: GARMENT SELECTOR */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-widest text-[#7C756B] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8B1E2F]" />
            1. Loại Việt Phục
          </label>
          <span className="text-xs text-[#8B1E2F] font-serif italic">{currentGarment.era}</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {(Object.keys(GARMENTS_DATA) as GarmentType[]).map((type) => {
            const g = GARMENTS_DATA[type];
            const isSelected = outfit.garmentType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleGarmentChange(type)}
                className={`py-3.5 px-3 rounded-2xl text-center border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-[#8B1E2F] text-white border-[#8B1E2F] shadow-md shadow-[#8B1E2F]/20 scale-[1.02]'
                    : 'bg-[#F9F6F0] text-[#403B35] border-[#E8DFC9] hover:bg-white hover:border-[#8B1E2F]/40'
                }`}
              >
                <span className="font-serif font-semibold text-sm sm:text-base leading-tight">
                  {g.name}
                </span>
                <span className={`text-[10px] leading-tight line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#8E8478]'}`}>
                  {type === 'ao_dai' ? 'Tân thời duyên dáng' : type === 'ao_tu_than' ? 'Kinh Bắc phóng khoáng' : 'Trang nghiêm triều Nguyễn'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: OCCASION */}
      <div>
        <label className="text-xs uppercase tracking-widest text-[#7C756B] font-semibold mb-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C69A52]" />
          2. Sự Kiện & Không Gian
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {OCCASIONS_LIST.map((occ) => {
            const isSelected = outfit.occasion === occ.id;
            return (
              <button
                key={occ.id}
                type="button"
                onClick={() => onChange(applyOccasionPreset(outfit, occ.id))}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#F5EFEB] border-[#8B1E2F] text-[#8B1E2F] shadow-sm'
                    : 'bg-[#FAF7F2] border-[#EAE2D2] text-[#423C36] hover:bg-white'
                }`}
              >
                <div className="font-medium text-xs sm:text-sm">{occ.name}</div>
                <div className="text-[11px] text-[#857B70] mt-0.5 line-clamp-1">{occ.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: STYLE */}
      <div>
        <label className="text-xs uppercase tracking-widest text-[#7C756B] font-semibold mb-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#3D7C85]" />
          3. Phong Cách Định Hình
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STYLES_LIST.map((style) => {
            const isSelected = outfit.style === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange(applyStylePreset(outfit, style.id))}
                className={`py-2.5 px-2 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2E2824] text-[#FDFCFB] border-[#2E2824] font-medium shadow-sm'
                    : 'bg-[#FAF7F2] border-[#E8DFCF] text-[#554D45] hover:bg-white'
                }`}
              >
                <div>{style.name}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#C69A52]' : 'text-[#8C8377]'}`}>
                  {style.tag}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* These selectors now affect the visible outfit, not only the selected state. */}
      <div aria-live="polite" className="rounded-2xl border border-[#D9C9B3] bg-[#FFF9F0] p-4 shadow-sm">
        <div className="font-semibold text-[#812A39] text-xs uppercase tracking-wider mb-1">Gợi ý đang hiển thị</div>
        <p className="text-sm font-serif font-semibold text-[#302A26]">{getOutfitSummary(outfit).title}</p>
        <p className="text-xs text-[#716358] mt-1 leading-relaxed">{getOutfitSummary(outfit).detail}</p>
        <p className="text-[11px] text-[#8A7667] mt-2 italic">Bấm Sự kiện để thử một bản phối được tuyển chọn; bấm Phong cách để đổi màu và phụ kiện. Bạn vẫn có thể tự chỉnh từng món phía dưới.</p>
      </div>

      {/* SECTION 4: COLOR PALETTE */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-widest text-[#7C756B] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#A32338]" />
            4. Sắc Màu Truyền Thống
          </label>
          <span className="text-xs font-serif text-[#8B1E2F]">
            {COLOR_PALETTE.find(c => c.id === outfit.primaryColor)?.vietnameseName}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {COLOR_PALETTE.map((color) => {
            const isSelected = outfit.primaryColor === color.id;
            return (
              <button
                key={color.id}
                type="button"
                title={`${color.name}: ${color.meaning}`}
                onClick={() => onChange({ ...outfit, primaryColor: color.id })}
                className={`group relative w-11 h-11 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'ring-2 ring-offset-2 ring-[#8B1E2F] scale-110 shadow-md'
                    : 'hover:scale-105 border border-black/10'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <Check className={`w-5 h-5 ${color.id === 'white_ivory' ? 'text-black' : 'text-white'} drop-shadow`} />
                )}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-[#7E7468] italic mt-2.5">
          {COLOR_PALETTE.find(c => c.id === outfit.primaryColor)?.meaning}
        </p>
      </div>

      {/* SECTION 5: ACCESSORIES */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-widest text-[#7C756B] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C69A52]" />
            5. Phụ Kiện Đi Kèm
          </label>
          <span className="text-xs text-[#8A8073]">Chọn 1 hoặc nhiều</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {ACCESSORIES_CATALOG.map((acc) => {
            const isSelected = outfit.accessories.includes(acc.id);
            const isCompatible = acc.id === 'none' || acc.compatibleGarments.includes(outfit.garmentType);

            return (
              <button
                key={acc.id}
                type="button"
                onClick={() => isCompatible && handleAccessoryToggle(acc.id)}
                disabled={!isCompatible}
                aria-pressed={isSelected}
                title={!isCompatible ? 'Phụ kiện này chưa hỗ trợ với loại Việt phục đang chọn' : acc.description}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-[#8B1E2F]/10 border-[#8B1E2F] text-[#8B1E2F]'
                    : isCompatible
                    ? 'bg-[#FAF7F2] border-[#E8DFC9] text-[#423C36] hover:bg-white'
                    : 'bg-[#F2EFE9]/50 border-dashed border-[#DDD5C5] text-[#9E9589] opacity-60 cursor-not-allowed'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                  isSelected ? 'bg-[#8B1E2F] text-white border-[#8B1E2F]' : 'border-[#C2B7A5]'
                }`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate flex items-center gap-1">
                    <span>{acc.name}</span>
                    {!isCompatible && acc.id !== 'none' && (
                      <span className="text-[10px] text-[#C69A52] font-normal" title="Có thể không chuẩn vùng miền">
                        (Cách tân)
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#877D70] truncate mt-0.5">{acc.vietnameseName}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="pt-4 border-t border-[#EDE4D5] flex flex-col gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={onRandom}
            className="py-2.5 px-3 rounded-xl border border-[#D9CEBA] bg-[#F7F3EB] hover:bg-white text-[#4A433A] text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <Dices className="w-4 h-4 text-[#C69A52]" />
            <span>Ngẫu nhiên</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="py-2.5 px-3 rounded-xl border border-[#D9CEBA] bg-[#F7F3EB] hover:bg-white text-[#4A433A] text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-4 h-4 text-[#8C8275]" />
            <span>Khôi phục</span>
          </button>

          <button
            type="button"
            onClick={onOpenCulturalDna}
            className="py-2.5 px-3 rounded-xl border border-[#D9CEBA] bg-[#F7F3EB] hover:bg-white text-[#4A433A] text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-[#3D7C85]" />
            <span>Cultural DNA</span>
          </button>

          <button
            type="button"
            onClick={onSaveLook}
            className="py-2.5 px-3 rounded-xl border border-[#8B1E2F] bg-white text-[#8B1E2F] hover:bg-[#8B1E2F] hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <Bookmark className="w-4 h-4" />
            <span>Lưu Lookbook</span>
          </button>
        </div>

        {/* PRIMARY GEMINI STYLIST ACTION */}
        <button
          type="button"
          onClick={onOpenStylist}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#8B1E2F] via-[#A32338] to-[#8B1E2F] text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#8B1E2F]/25 hover:opacity-95 transition-all cursor-pointer active:scale-[0.99]"
        >
          <Sparkles className="w-4 h-4 text-[#EBD292] animate-pulse" />
          <span>Gợi Ý & Phối Bằng Gemini AI Stylist</span>
        </button>
      </div>
    </div>
  );
};
