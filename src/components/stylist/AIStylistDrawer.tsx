import React, { useState } from 'react';
import { OutfitState, StylistRecommendation } from '../../types';
import { requestStylistAdvice } from '../../services/geminiService';
import { GARMENTS_DATA } from '../../data/garments';
import { COLOR_PALETTE } from '../../data/options';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  X, 
  Send, 
  Loader2, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  Cpu, 
  Bot, 
  Lightbulb 
} from 'lucide-react';

interface AIStylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfit: OutfitState;
  onApplyOutfit: (outfit: OutfitState) => void;
}

const PRESET_PROMPTS = [
  'Tớ muốn phối áo dài xanh đi chơi Tết, trẻ trung nhưng vẫn thanh lịch.',
  'Áo tứ thân du xuân trẩy hội Kinh Bắc đầy chất thơ với nón quai thao.',
  'Áo ngũ thân trang nghiêm đi lễ chùa và tham quan di tích cố đô Huế.',
  'Gen Z Remix: Áo dài phối phụ kiện tối giản để chụp kỷ yếu thanh xuân.'
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
  const [applied, setApplied] = useState(false);

  if (!isOpen) return null;

  const handleConsult = async (customPrompt?: string) => {
    const query = customPrompt || prompt;
    if (!query.trim()) return;

    setLoading(true);
    setApplied(false);
    try {
      const result = await requestStylistAdvice({
        prompt: query,
        currentOutfit,
        taskType: 'recommend'
      });
      setRecommendation(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!recommendation) return;
    onApplyOutfit(recommendation.outfit);
    setApplied(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#8B1E2F', '#C69A52', '#3D7C85', '#EBD292']
    });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const currentGarment = GARMENTS_DATA[recommendation?.outfit.garmentType || currentOutfit.garmentType];
  const currentColor = COLOR_PALETTE.find(c => c.id === (recommendation?.outfit.primaryColor || currentOutfit.primaryColor));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-lg h-full bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E5DAC8] overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* HEADER */}
        <div className="px-6 py-5 bg-[#F2ECE3] border-b border-[#E2D6C3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8B1E2F] to-[#681120] flex items-center justify-center text-[#EBD292] shadow-md shadow-[#8B1E2F]/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-[#222120] flex items-center gap-2">
                NẾP Cultural Stylist
              </h2>
              <p className="text-xs text-[#7A7268]">Cố vấn phối Việt phục thông minh bằng Gemini</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#686054] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Status Badge */}
          <div className="flex items-center justify-between text-xs px-3.5 py-2 rounded-xl bg-white/70 border border-[#E8DFC9]">
            <span className="flex items-center gap-1.5 text-[#595248]">
              <Bot className="w-4 h-4 text-[#8B1E2F]" />
              Trạng thái AI:
            </span>
            {recommendation?.source === 'gemini' ? (
              <span className="font-medium text-[#2E7D52] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2E7D52] animate-ping" />
                Google Gemini 3.8 Flash (Live)
              </span>
            ) : (
              <span className="font-medium text-[#C69A52] flex items-center gap-1" title="Chạy bằng bộ quy tắc văn hóa thông minh">
                <Cpu className="w-3.5 h-3.5 text-[#C69A52]" />
                Smart Cultural Engine (Demo Mode)
              </span>
            )}
          </div>

          {/* Natural Language Prompt Input */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-[#736B60] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8B1E2F]" />
              Bạn muốn diện trang phục thế nào hôm nay?
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="VD: Tớ muốn mặc áo dài màu xanh hoặc hồng pastel đi chụp kỷ yếu, phong cách trẻ trung và thanh lịch..."
                rows={3}
                className="w-full p-3.5 rounded-2xl bg-white border border-[#E0D5C3] text-sm text-[#222120] placeholder-[#A09689] focus:outline-none focus:ring-2 focus:ring-[#8B1E2F] focus:border-transparent resize-none shadow-inner"
              />
              <button
                type="button"
                disabled={loading || !prompt.trim()}
                onClick={() => handleConsult()}
                className="absolute right-3 bottom-3 p-2 rounded-xl bg-[#8B1E2F] text-white disabled:opacity-40 hover:bg-[#701524] transition-all cursor-pointer shadow-md"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Preset Prompts */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-[#8A8174] font-medium flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-[#C69A52]" />
              Gợi ý câu lệnh mẫu:
            </span>
            <div className="flex flex-col gap-1.5">
              {PRESET_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPrompt(p);
                    handleConsult(p);
                  }}
                  className="text-left text-xs p-2.5 rounded-xl bg-white/80 hover:bg-white border border-[#EAE1D1] text-[#4F473E] hover:border-[#8B1E2F]/30 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{p}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#8B1E2F] transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center bg-white/60 rounded-2xl border border-[#EAE2D2] flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-7 h-7 text-[#8B1E2F] animate-spin" />
              <div className="text-sm font-medium text-[#443D35]">Gemini đang tra cứu tri thức văn hóa...</div>
              <div className="text-xs text-[#877E72]">Cân đối ngũ hành màu sắc, sự kiện và phụ kiện thích hợp</div>
            </div>
          )}

          {/* RESULT CARD */}
          {recommendation && !loading && (
            <div className="bg-white rounded-2xl border border-[#E5DAC6] p-5 shadow-sm space-y-4 animate-in fade-in duration-300">
              
              {/* Header result */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8B1E2F]/10 text-[#8B1E2F] font-semibold">
                    Đề xuất từ AI Stylist
                  </span>
                  <h3 className="font-serif font-bold text-[#222120] text-base mt-1.5">
                    {recommendation.outfit.title || `Outfit ${currentGarment.name}`}
                  </h3>
                </div>

                <div 
                  className="w-6 h-6 rounded-full border border-black/10 shadow-sm shrink-0"
                  style={{ backgroundColor: currentColor?.hex }}
                  title={currentColor?.vietnameseName}
                />
              </div>

              {/* General Explanation */}
              <p className="text-xs text-[#524A40] leading-relaxed">
                {recommendation.explanation}
              </p>

              {/* "VÌ SAO NẾP CHỌN OUTFIT NÀY?" CARD */}
              <div className="p-3.5 rounded-xl bg-[#FAF5EE] border border-[#EADECA] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B1E2F]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C69A52]" />
                  <span>Vì sao NẾP chọn outfit này?</span>
                </div>
                <p className="text-xs text-[#4F463D] leading-relaxed italic">
                  "{recommendation.whyNepChoseThis}"
                </p>
              </div>

              {/* Cultural Highlights */}
              {recommendation.culturalDNAHighlights && recommendation.culturalDNAHighlights.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-[#736B60] uppercase tracking-wider">
                    Điểm nhấn văn hóa:
                  </span>
                  <ul className="text-xs text-[#5A5146] space-y-1 pl-4 list-disc">
                    {recommendation.culturalDNAHighlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Changed fields if modified */}
              {recommendation.changedFields && recommendation.changedFields.length > 0 && (
                <div className="text-[11px] text-[#7C7469] flex items-center gap-1 bg-[#F5EFEB] px-2.5 py-1.5 rounded-lg">
                  <Info className="w-3.5 h-3.5 text-[#3D7C85]" />
                  <span>Thay đổi: {recommendation.changedFields.join(', ')}</span>
                </div>
              )}

              {/* APPLY TO STUDIO BUTTON */}
              <button
                type="button"
                onClick={handleApply}
                disabled={applied}
                className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  applied
                    ? 'bg-[#2E7D52] text-white'
                    : 'bg-[#8B1E2F] hover:bg-[#721524] text-white active:scale-95'
                }`}
              >
                {applied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đã áp dụng vào Studio!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#EBD292]" />
                    <span>Áp dụng vào Studio ngay</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
