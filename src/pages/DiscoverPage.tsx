import React, { useState } from 'react';
import { GarmentType, OutfitState } from '../types';
import { GARMENTS_DATA } from '../data/garments';
import { OutfitCanvas } from '../components/preview/OutfitCanvas';
import { 
  Palette, 
  History, 
  Layers, 
  BookOpen, 
  Check, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';

interface DiscoverPageProps {
  onSelectGarmentForStudio: (garment: GarmentType) => void;
  initialGarment?: GarmentType;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  onSelectGarmentForStudio,
  initialGarment = 'ao_dai'
}) => {
  const [activeGarment, setActiveGarment] = useState<GarmentType>(initialGarment);

  const garment = GARMENTS_DATA[activeGarment];

  // Dummy outfit representation for previewing this garment
  const sampleOutfit: OutfitState = {
    garmentType: activeGarment,
    occasion: activeGarment === 'ao_ngu_than' ? 'tham_quan_di_tich' : activeGarment === 'ao_tu_than' ? 'le_hoi_van_hoa' : 'chup_ky_yeu',
    style: 'traditional',
    primaryColor: garment.defaultColor,
    accessories: garment.defaultAccessories
  };

  return (
    <div className="space-y-12">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs uppercase tracking-widest text-[#8B1E2F] font-bold">
          Khám Phá Di Sản
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#222120]">
          Bản Sắc Việt Phục
        </h1>
        <p className="text-sm text-[#736A5E] leading-relaxed">
          Tìm hiểu nguồn gốc, giải phẫu cấu trúc và bối cảnh sử dụng của ba dòng trang phục biểu tượng trong dòng chảy văn hóa Việt Nam.
        </p>
      </div>

      {/* GARMENT SELECTION TABS */}
      <div className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-[#E8DFC9] flex gap-1 shadow-sm max-w-md w-full">
          {(['ao_dai', 'ao_tu_than', 'ao_ngu_than'] as GarmentType[]).map((type) => {
            const g = GARMENTS_DATA[type];
            const isSelected = activeGarment === type;
            return (
              <button
                key={type}
                onClick={() => setActiveGarment(type)}
                className={`flex-1 py-3 px-3 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8B1E2F] text-white shadow-md'
                    : 'text-[#635B50] hover:text-[#222120] hover:bg-black/5'
                }`}
              >
                {g.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE GARMENT HERO DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT: VISUAL CANVAS PREVIEW */}
        <div className="lg:col-span-5 flex flex-col items-center gap-4 sticky top-28">
          <div className="w-full max-w-[380px]">
            <OutfitCanvas outfit={sampleOutfit} showDetails={true} />
          </div>

          <button
            onClick={() => onSelectGarmentForStudio(activeGarment)}
            className="w-full max-w-[380px] py-3.5 px-4 rounded-2xl bg-[#8B1E2F] hover:bg-[#721524] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#8B1E2F]/20 transition-all cursor-pointer active:scale-95"
          >
            <Palette className="w-4 h-4 text-[#EBD292]" />
            <span>Phối đồ với {garment.name} trong Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* RIGHT: DEEP-DIVE DOCUMENTATION */}
        <div className="lg:col-span-7 space-y-8 bg-white/70 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-[#E8DFC9] shadow-sm">
          
          {/* Era & Title */}
          <div className="space-y-2 border-b border-[#EFE7DC] pb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8B1E2F]">
              <History className="w-4 h-4" />
              <span>{garment.era}</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#222120]">
              {garment.name}
            </h2>
            <p className="font-serif italic text-sm text-[#7D7365]">
              "{garment.subtitle}"
            </p>
          </div>

          {/* Historical Narrative */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-[#7A7163] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8B1E2F]" />
              Nguồn Gốc Lịch Sử
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4237] leading-relaxed whitespace-pre-line">
              {garment.fullHistory}
            </p>
          </div>

          {/* Identifying Features */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-[#7A7163] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C69A52]" />
              Đặc Điểm Nhận Diện Cốt Lõi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {garment.keyFeatures.map((feat, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#EADECC] text-xs text-[#4F463B] flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#2E7D52] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Anatomical Components Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-[#7A7163] font-bold flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#3D7C85]" />
              Các Thành Phần Cấu Trúc
            </h3>
            <div className="space-y-2.5">
              {garment.components.map((comp, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#E6DCCB] space-y-1">
                  <div className="font-serif font-bold text-xs sm:text-sm text-[#222120]">{comp.name}</div>
                  <div className="text-xs text-[#665D51] leading-relaxed">{comp.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Modern Tips for Gen Z */}
          <div className="p-4 rounded-2xl bg-[#FAF4EC] border border-[#E5DAC6] space-y-2">
            <div className="text-xs font-semibold text-[#8B1E2F] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C69A52]" />
              <span>Gợi ý cách phối hiện đại cho Gen Z:</span>
            </div>
            <ul className="text-xs text-[#524A3F] space-y-1.5 pl-4 list-disc">
              {garment.modernStylingTips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>

          {/* Historical Verifiability Note */}
          <div className="p-3 rounded-xl bg-[#F0ECE4] text-[11px] text-[#696155] italic flex items-start gap-2">
            <Info className="w-4 h-4 text-[#8B1E2F] shrink-0 mt-0.5" />
            <span>{garment.historicalNotes}</span>
          </div>

        </div>
      </div>
    </div>
  );
};
