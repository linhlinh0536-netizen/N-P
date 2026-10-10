import React, { useMemo } from 'react';
import { OutfitState } from '../../types';
import { GARMENTS_DATA } from '../../data/garments';
import { runCultureCheck } from '../../services/culturalRules';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  Lightbulb, 
  BookOpen, 
  Check, 
  Layers, 
  History, 
  Sparkles 
} from 'lucide-react';

interface CulturalDnaModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: OutfitState;
}

export const CulturalDnaModal: React.FC<CulturalDnaModalProps> = ({
  isOpen,
  onClose,
  outfit
}) => {
  if (!isOpen) return null;

  const garment = GARMENTS_DATA[outfit.garmentType];
  const cultureCheck = useMemo(() => runCultureCheck(outfit), [outfit]);

  const getStatusBadge = () => {
    switch (cultureCheck.status) {
      case 'fully_appropriate':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2E7D52]/10 text-[#2E7D52] border border-[#2E7D52]/20 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#2E7D52]" />
            <span>Tuyệt Đối Chuẩn Mực & Phù Hợp</span>
          </div>
        );
      case 'modern_adaptation':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C69A52]/10 text-[#A67E36] border border-[#C69A52]/20 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-[#C69A52]" />
            <span>Cách Tân Đương Đại – Nhận Diện Sáng Tạo</span>
          </div>
        );
      case 'needs_consideration':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A32338]/10 text-[#A32338] border border-[#A32338]/20 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-[#A32338]" />
            <span>Có Chi Tiết Cần Cân Nhắc</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#EADBCC] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-5 bg-[#F2ECE2] border-b border-[#E2D6C3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B1E2F] text-[#F9F4EB] flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-[#222120]">
                Cultural DNA & Culture Check
              </h2>
              <p className="text-xs text-[#756D62]">
                Hồ sơ di sản & thẩm định trang phục truyền thống
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#6E6659] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* SECTION A: CULTURE CHECK AUDIT */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5DAC6] shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#736B60] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8B1E2F]" />
                Đánh Giá Chuẩn Mực Văn Hóa (Culture Check)
              </div>
              {getStatusBadge()}
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-[#222120] text-base">
                {cultureCheck.headline}
              </h3>
              <p className="text-xs text-[#786F62] italic">
                {cultureCheck.contextValidation}
              </p>
            </div>

            {/* Cultural notes list */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-semibold text-[#4F473E] flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#2E7D52]" />
                Nhận định từ chuyên gia:
              </div>
              <ul className="space-y-1.5 pl-4 text-xs text-[#524B41]">
                {cultureCheck.culturalNotes.map((n, idx) => (
                  <li key={idx} className="list-disc leading-relaxed">{n}</li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            {cultureCheck.suggestions.length > 0 && (
              <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E8DFC9] space-y-1">
                <div className="text-xs font-semibold text-[#8B1E2F] flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-[#C69A52]" />
                  Gợi ý nâng tầm phong cách:
                </div>
                <ul className="text-xs text-[#574F45] space-y-1 pl-4">
                  {cultureCheck.suggestions.map((s, idx) => (
                    <li key={idx} className="list-disc leading-relaxed">{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* SECTION B: CULTURAL DNA OF THE GARMENT */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5DAC6] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#736B60] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C69A52]" />
                Căn Cước Di Sản (Cultural DNA)
              </div>
              <span className="text-xs font-serif text-[#8B1E2F] font-semibold">{garment.name}</span>
            </div>

            {/* Era & Significance */}
            <div className="p-3.5 rounded-xl bg-[#FAF5ED] border border-[#E9DFCE] space-y-1">
              <div className="text-xs font-semibold text-[#8B1E2F] flex items-center gap-1.5">
                <History className="w-4 h-4 text-[#8B1E2F]" />
                <span>Niên đại & Dấu ấn: {garment.era}</span>
              </div>
              <p className="text-xs text-[#524A40] leading-relaxed">
                {garment.culturalSignificance}
              </p>
            </div>

            {/* Garment Components Breakdown */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#736B60] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#3D7C85]" />
                Cấu trúc giải phẫu y phục:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {garment.components.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADBCC] text-xs">
                    <div className="font-semibold text-[#292624]">{c.name}</div>
                    <div className="text-[11px] text-[#73695E] mt-0.5 leading-relaxed">{c.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Styling Tips */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#736B60]">
                Lưu ý cho Gen Z khi phối đồ đương đại:
              </h4>
              <ul className="text-xs text-[#554D43] space-y-1 pl-4 list-disc">
                {garment.modernStylingTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">{tip}</li>
                ))}
              </ul>
            </div>

            {/* History citation notice */}
            <div className="text-[11px] text-[#8C8375] italic pt-2 border-t border-[#ECE3D5]">
              * Tư liệu lịch sử được đối chiếu với các nguồn nghiên cứu phục dựng cổ phục Việt Nam uy tín (Chỉ dụ Minh Mạng, Gia Định Thành Thông Chí, phong trào Lemur - Lê Phổ).
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 bg-[#F2ECE2] border-t border-[#E2D6C3] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#8B1E2F] hover:bg-[#721524] text-white text-xs font-medium transition-colors cursor-pointer shadow-sm"
          >
            Đã hiểu & Tiếp tục phối đồ
          </button>
        </div>
      </div>
    </div>
  );
};
