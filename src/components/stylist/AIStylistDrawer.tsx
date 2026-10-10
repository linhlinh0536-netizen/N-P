import React, { useState } from 'react';
import { OutfitState, StylistRecommendation } from '../../types';
import { requestStylistAdvice } from '../../services/geminiService';
import { GARMENTS_DATA } from '../../data/garments';
import { COLOR_PALETTE, ACCESSORIES_CATALOG, OCCASIONS_LIST, STYLES_LIST } from '../../data/options';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  X, 
  Send, 
  Check, 
  Wand2, 
  BookOpen, 
  Lightbulb, 
  Layers, 
  RefreshCw,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface AIStylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfit: OutfitState;
  onApplyOutfit: (updated: OutfitState) => void;
}

const PRESET_PROMPTS = [
  'Phối Áo ngũ thân đỏ son đi chúc Tết thanh lịch, trang nhã cùng gia đình',
  'Áo dài trắng tinh khôi chụp kỷ yếu lưu giữ tuổi học trò thanh xuân',
  'Bộ Áo tứ thân duyên dáng trẩy hội quan họ Kinh Bắc đầu xuân',
  'Thăm Cố đô Huế hoài cổ, trang trọng nhưng vẫn trẻ trung',
  'Gen Z remix: phối Việt phục hiện đại, tối giản nhưng đậm bản sắc'
];

export const AIStylistDrawer: React.FC<AIStylistDrawerProps> = ({
  isOpen,
  onClose,
  currentOutfit,
  onApplyOutfit
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<StylistRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (userPrompt?: string) => {
    const textToSubmit = (userPrompt ?? prompt).trim();
    if (!textToSubmit) return;

    if (userPrompt) setPrompt(userPrompt);
    setLoading(true);
    setError(null);

    try {
      const result = await requestStylistAdvice({
        prompt: textToSubmit,
        currentOutfit,
        taskType: 'recommend'
      });
      setRecommendation(result);
    } catch (err: any) {
      console.error('Stylist error:', err);
      setError('Có lỗi khi kết nối với AI Stylist. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!recommendation) return;
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#8B1E2F', '#C89D42', '#D97706', '#E9D5A1']
      });
    } catch {
      // ignore
    }
    onApplyOutfit(recommendation.outfit);
    onClose();
  };

  const garment = recommendation ? GARMENTS_DATA[recommendation.outfit.garmentType] : null;
  const color = recommendation ? COLOR_PALETTE.find(c => c.id === recommendation.outfit.primaryColor) : null;
  const occasion = recommendation ? OCCASIONS_LIST.find(o => o.id === recommendation.outfit.occasion) : null;
  const style = recommendation ? STYLES_LIST.find(s => s.id === recommendation.outfit.style) : null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-lg bg-[#FAF7F2] shadow-2xl flex flex-col h-full border-l border-[#D9CEBA]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#8B1E2F] to-[#721524] text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs text-[#E9D5A1] border border-white/20 shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold tracking-wide text-[#FAF7F2]">AI Cultural Stylist</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C89D42]/30 border border-[#C89D42]/40 text-[#E9D5A1] uppercase tracking-wider">
                  Gemini
                </span>
              </div>
              <p className="text-xs text-white/80">Trợ lý cố vấn trang phục & quy chuẩn di sản Việt</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Natural language input */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5DECF] shadow-xs space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#736B5E] flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-[#8B1E2F]" />
              Bạn muốn phối đồ cho dịp gì hoặc phong cách nào?
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Ví dụ: Mình muốn phối một bộ Áo ngũ thân đỏ son đi chụp ảnh Tết ở Văn Miếu, cần nét thanh nhã trang trọng..."
                className="w-full h-24 p-3 pr-10 text-xs sm:text-sm text-[#241F1A] bg-[#FAF7F2] border border-[#D9CEBA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B1E2F]/40 focus:border-[#8B1E2F] resize-none placeholder:text-[#A89F91]"
              />
              <button
                onClick={() => handleSubmit()}
                disabled={loading || !prompt.trim()}
                className="absolute right-2.5 bottom-3.5 p-2 rounded-lg bg-[#8B1E2F] hover:bg-[#721524] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] text-[#8C8273] font-medium flex items-center gap-1.5">
                <Lightbulb className="w-3 h-3 text-[#C89D42]" />
                Gợi ý nhanh cho bạn:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSubmit(p)}
                    className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-[#F5EFE6] hover:bg-[#EFE5D5] text-[#52493E] border border-[#E5DECF] transition-colors line-clamp-1"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="p-8 text-center space-y-3 bg-white rounded-2xl border border-[#E5DECF]">
              <div className="w-12 h-12 rounded-full border-3 border-[#8B1E2F]/20 border-t-[#8B1E2F] animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#241F1A] font-serif">Đang tra cứu điển chế & văn hóa trang phục...</p>
                <p className="text-xs text-[#8C8273]">AI Stylist đang đối chiếu màu sắc, dịp lễ và phụ kiện phù hợp</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Recommendation card */}
          {recommendation && !loading && (
            <div className="space-y-4">
              {/* Header result badge */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-[#8B1E2F] flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Bản phối gợi ý từ NẾP
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  {recommendation.source === 'gemini' ? 'Gemini 2.5 API' : 'Cultural Rule Engine'}
                </span>
              </div>

              {/* Proposed Outfit Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#D9CEBA] shadow-sm space-y-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#241F1A]">
                    {garment?.name || 'Việt Phục'}
                  </h4>
                  <p className="text-xs text-[#736B5E]">{recommendation.explanation}</p>
                </div>

                {/* Attributes grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F0EAE1]">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE5D5]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8273] block">Màu sắc chủ đạo</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs" 
                        style={{ backgroundColor: color?.hex }}
                      />
                      <span className="text-xs font-medium text-[#241F1A]">{color?.name}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE5D5]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8273] block">Sự kiện phù hợp</span>
                    <span className="text-xs font-medium text-[#241F1A] block mt-1">{occasion?.name}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE5D5]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8273] block">Phong cách</span>
                    <span className="text-xs font-medium text-[#241F1A] block mt-1">{style?.name}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE5D5]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8273] block">Phụ kiện đính kèm</span>
                    <span className="text-xs font-medium text-[#241F1A] block mt-1">
                      {recommendation.outfit.accessories.filter(a => a !== 'none').length} món
                    </span>
                  </div>
                </div>

                {/* Accessories tags */}
                {recommendation.outfit.accessories.filter(a => a !== 'none').length > 0 && (
                  <div className="pt-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8273] block mb-1.5">Chi tiết phụ kiện:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {recommendation.outfit.accessories
                        .filter(a => a !== 'none')
                        .map(accId => {
                          const acc = ACCESSORIES_CATALOG.find(a => a.id === accId);
                          return acc ? (
                            <span 
                              key={acc.id}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[#52493E] border border-[#E2D8C6]"
                            >
                              {acc.name}
                            </span>
                          ) : null;
                        })}
                    </div>
                  </div>
                )}

                {/* Why Nếp chose this */}
                {recommendation.whyNepChoseThis && (
                  <div className="p-3.5 rounded-xl bg-[#FBF7F0] border border-[#E5DECF] space-y-1">
                    <span className="text-[11px] font-semibold text-[#8B1E2F] flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Vì sao NẾP gợi ý bản phối này?
                    </span>
                    <p className="text-xs text-[#52493E] leading-relaxed">
                      {recommendation.whyNepChoseThis}
                    </p>
                  </div>
                )}

                {/* Cultural DNA Highlights */}
                {recommendation.culturalDNAHighlights && recommendation.culturalDNAHighlights.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-[#736B5E] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#C89D42]" /> Điểm nhấn Văn Hóa (Cultural DNA)
                    </span>
                    <ul className="space-y-1">
                      {recommendation.culturalDNAHighlights.map((hl, idx) => (
                        <li key={idx} className="text-xs text-[#52493E] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C89D42] mt-1.5 shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleApply}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#8B1E2F] hover:bg-[#721524] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#E9D5A1]" />
                  <span>Áp Dụng Vào Studio Ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setRecommendation(null)}
                  className="p-3 rounded-xl border border-[#D9CEBA] bg-white text-[#52493E] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  title="Thử yêu cầu khác"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIStylistDrawer;
