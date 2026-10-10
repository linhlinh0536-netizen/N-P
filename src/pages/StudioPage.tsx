import React, { useState } from 'react';
import { OutfitState, GarmentType, ColorId, AccessoryId } from '../types';
import { OutfitControls } from '../components/studio/OutfitControls';
import { OutfitCanvas } from '../components/preview/OutfitCanvas';
import { AIStylistDrawer } from '../components/stylist/AIStylistDrawer';
import { CulturalDnaModal } from '../components/culture/CulturalDnaModal';
import { saveLook } from '../services/storageService';
import { runCultureCheck } from '../services/culturalRules';
import { GARMENTS_DATA } from '../data/garments';
import { COLOR_PALETTE } from '../data/options';
import { getOutfitSummary } from '../services/stylingPresets';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Bookmark, 
  ShieldCheck, 
  AlertTriangle, 
  BookOpen, 
  X, 
  Check, 
  Share2 
} from 'lucide-react';

interface StudioPageProps {
  outfit: OutfitState;
  onUpdateOutfit: (outfit: OutfitState) => void;
  onLookSaved: () => void;
  isStylistOpen: boolean;
  onOpenStylist: () => void;
  onCloseStylist: () => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({
  outfit,
  onUpdateOutfit,
  onLookSaved,
  isStylistOpen,
  onOpenStylist,
  onCloseStylist
}) => {
  const [isDnaOpen, setIsDnaOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [lookTitle, setLookTitle] = useState('');
  const [lookNotes, setLookNotes] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const garment = GARMENTS_DATA[outfit.garmentType];
  const color = COLOR_PALETTE.find(c => c.id === outfit.primaryColor);
  const cultureCheck = runCultureCheck(outfit);

  const handleReset = () => {
    onUpdateOutfit({
      garmentType: outfit.garmentType,
      occasion: 'tet_nguyen_dan',
      style: 'traditional',
      primaryColor: garment.defaultColor,
      accessories: garment.defaultAccessories
    });
  };

  const handleRandom = () => {
    const garmentKeys = Object.keys(GARMENTS_DATA) as GarmentType[];
    const randomGarment = garmentKeys[Math.floor(Math.random() * garmentKeys.length)];
    const randomColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)].id;
    const g = GARMENTS_DATA[randomGarment];

    onUpdateOutfit({
      garmentType: randomGarment,
      occasion: 'tet_nguyen_dan',
      style: 'elegant',
      primaryColor: randomColor,
      accessories: g.defaultAccessories
    });
  };

  const handleOpenSaveModal = () => {
    setLookTitle(`Outfit ${garment.name} - ${color?.name}`);
    setLookNotes('');
    setSaveSuccess(false);
    setSaveModalOpen(true);
  };

  const handleConfirmSave = () => {
    saveLook({
      ...outfit,
      title: lookTitle.trim() || `Outfit ${garment.name}`,
      notes: lookNotes.trim()
    });

    setSaveSuccess(true);
    onLookSaved();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B1E2F', '#C69A52', '#3D7C85']
    });

    setTimeout(() => {
      setSaveModalOpen(false);
      setSaveSuccess(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* STUDIO HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8DFC9] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B1E2F] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#8B1E2F]" />
            Không Gian Sáng Tạo
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-4xl text-[#222120] mt-1">
            Việt Phục Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#736A5E] mt-1">
            Cá nhân hóa trang phục truyền thống với công nghệ hiển thị từng lớp trực quan (Layer-Based)
          </p>
        </div>

        {/* TOP STATUS PILL */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDnaOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white/80 border border-[#E5DAC8] hover:border-[#8B1E2F] text-xs font-medium text-[#4A4237] flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            {cultureCheck.status === 'fully_appropriate' ? (
              <ShieldCheck className="w-4 h-4 text-[#2E7D52]" />
            ) : cultureCheck.status === 'modern_adaptation' ? (
              <Sparkles className="w-4 h-4 text-[#C69A52]" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-[#A32338]" />
            )}
            <span>Culture Check: {cultureCheck.score}/100</span>
          </button>
        </div>
      </div>

      {/* TWO COLUMNS STUDIO LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: OUTFIT CONTROLS (7 cols) */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <OutfitControls
            outfit={outfit}
            onChange={onUpdateOutfit}
            onReset={handleReset}
            onRandom={handleRandom}
            onSaveLook={handleOpenSaveModal}
            onOpenStylist={onOpenStylist}
            onOpenCulturalDna={() => setIsDnaOpen(true)}
          />
        </div>

        {/* RIGHT COLUMN: LIVE OUTFIT PREVIEW (5 cols, sticky on desktop) */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-4 lg:sticky lg:top-24">
          
          <div className="w-full">
            <OutfitCanvas outfit={outfit} showDetails={true} />
          </div>
          <div aria-live="polite" className="rounded-xl border border-[#E5DAC8] bg-white/85 px-4 py-3">
            <p className="text-xs font-semibold text-[#8B1E2F]">Bản phối theo lựa chọn</p>
            <p className="font-serif font-semibold text-sm mt-1">{getOutfitSummary(outfit).title}</p>
            <p className="text-xs mt-1 text-[#72665D]">{getOutfitSummary(outfit).detail}</p>
          </div>

          {/* Quick Cultural Assessment Bar below canvas */}
          <div 
            onClick={() => setIsDnaOpen(true)}
            className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E5DAC8] shadow-sm hover:border-[#8B1E2F] transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#8B1E2F]/10 text-[#8B1E2F] flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-serif font-bold text-[#222120]">
                  {cultureCheck.headline}
                </div>
                <div className="text-[11px] text-[#7A7165]">
                  Nhấn để xem phân tích Cultural DNA chi tiết
                </div>
              </div>
            </div>

            <span className="text-xs text-[#8B1E2F] font-semibold shrink-0">
              Chi tiết →
            </span>
          </div>
        </div>

      </div>

      {/* MODAL: SAVE LOOKBOOK */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#EADBCC] p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#EADBCC] pb-3">
              <h3 className="font-serif font-bold text-base text-[#222120] flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#8B1E2F]" />
                Lưu Vào NẾP Lookbook
              </h3>
              <button
                onClick={() => setSaveModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-[#6E6659] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#544C42] uppercase tracking-wider block mb-1">
                  Tên bản phối:
                </label>
                <input
                  type="text"
                  value={lookTitle}
                  onChange={(e) => setLookTitle(e.target.value)}
                  placeholder="VD: Du Xuân Cố Đô, Nắng Ba Đình..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D5C3] text-sm text-[#222120] focus:ring-2 focus:ring-[#8B1E2F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#544C42] uppercase tracking-wider block mb-1">
                  Cảm hứng / Ghi chú (Tùy chọn):
                </label>
                <textarea
                  value={lookNotes}
                  onChange={(e) => setLookNotes(e.target.value)}
                  placeholder="Ghi lại cảm xúc hoặc dịp bạn dự định diện trang phục này..."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-white border border-[#E0D5C3] text-xs text-[#222120] focus:ring-2 focus:ring-[#8B1E2F] focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleConfirmSave}
                disabled={saveSuccess}
                className={`flex-1 py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  saveSuccess ? 'bg-[#2E7D52] text-white' : 'bg-[#8B1E2F] hover:bg-[#721524] text-white'
                }`}
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Đã lưu thành công!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Xác nhận lưu lookbook</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSaveModalOpen(false)}
                className="py-3 px-4 rounded-xl border border-[#D9CEBA] bg-white text-xs text-[#52493E] cursor-pointer"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CULTURAL DNA */}
      <CulturalDnaModal
        isOpen={isDnaOpen}
        onClose={() => setIsDnaOpen(false)}
        outfit={outfit}
      />

      {/* DRAWER: AI STYLIST */}
      <AIStylistDrawer
        isOpen={isStylistOpen}
        onClose={onCloseStylist}
        currentOutfit={outfit}
        onApplyOutfit={(updated) => onUpdateOutfit(updated)}
      />

    </div>
  );
};
