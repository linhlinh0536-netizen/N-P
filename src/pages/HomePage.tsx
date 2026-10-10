import React from 'react';
import { OutfitState, GarmentType } from '../types';
import { GARMENTS_DATA } from '../data/garments';
import { OutfitCanvas } from '../components/preview/OutfitCanvas';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Palette, 
  ShieldCheck, 
  BookOpen, 
  Feather,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface HomePageProps {
  onNavigateToStudio: (initialGarment?: GarmentType) => void;
  onNavigateToDiscover: (garmentId?: GarmentType) => void;
  onOpenStylist: () => void;
}

const HERO_PREVIEW_OUTFIT: OutfitState = {
  garmentType: 'ao_dai',
  occasion: 'tet_nguyen_dan',
  style: 'elegant',
  primaryColor: 'red_crimson',
  accessories: ['kieng_bac', 'quat_xep']
};

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToStudio,
  onNavigateToDiscover,
  onOpenStylist
}) => {
  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* ---------------- 1. HERO SECTION ---------------- */}
      <section className="relative pt-6 sm:pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: EDITORIAL COPY & CALLS TO ACTION */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1E2F]/10 border border-[#8B1E2F]/20 text-[#8B1E2F] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C69A52]" />
              <span>Vietnamese Heritage x Gen Z Fashion</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#222120] leading-[1.08]">
                Chạm nét xưa.<br />
                <span className="italic font-normal text-[#8B1E2F]">Mặc chất nay.</span>
              </h1>
              <p className="font-serif italic text-base sm:text-xl text-[#7A7165]">
                Your Style, Our Heritage.
              </p>
            </div>

            {/* Inspiring Subtitle */}
            <p className="text-sm sm:text-base text-[#595147] max-w-xl leading-relaxed">
              NẾP là nền tảng sáng tạo và cá nhân hóa trang phục truyền thống Việt Nam dành riêng cho người trẻ. Khám phá vẻ đẹp di sản qua công nghệ phối đồ trực quan cùng trợ lý thời trang văn hóa <strong>Google Gemini</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigateToStudio()}
                className="px-7 py-4 rounded-2xl bg-[#8B1E2F] hover:bg-[#721524] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-[#8B1E2F]/25 hover:shadow-2xl transition-all cursor-pointer active:scale-95"
              >
                <Palette className="w-4 h-4 text-[#EBD292]" />
                <span>Bắt đầu phối đồ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateToDiscover()}
                className="px-6 py-4 rounded-2xl bg-white hover:bg-[#F2EFE9] border border-[#E0D5C3] text-[#423C35] font-medium text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm"
              >
                <Compass className="w-4 h-4 text-[#8B1E2F]" />
                <span>Khám phá 3 loại Việt phục</span>
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="pt-4 border-t border-[#EDE4D5] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="font-serif font-bold text-xl sm:text-2xl text-[#222120]">100%</div>
                <div className="text-[11px] text-[#786E61]">Chuẩn xác văn hóa</div>
              </div>
              <div>
                <div className="font-serif font-bold text-xl sm:text-2xl text-[#8B1E2F]">3+</div>
                <div className="text-[11px] text-[#786E61]">Dòng Việt phục biểu tượng</div>
              </div>
              <div>
                <div className="font-serif font-bold text-xl sm:text-2xl text-[#222120]">Gemini</div>
                <div className="text-[11px] text-[#786E61]">AI Cultural Stylist</div>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE LIVE OUTFIT PREVIEW TEASER */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[420px]">
              
              {/* Outer decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#8B1E2F]/15 via-[#C69A52]/10 to-transparent rounded-[36px] blur-xl" />
              
              <div className="relative">
                <OutfitCanvas outfit={HERO_PREVIEW_OUTFIT} showDetails={true} />
              </div>

              {/* Floating interactive badge */}
              <button
                onClick={() => onNavigateToStudio('ao_dai')}
                className="absolute -bottom-4 -left-4 sm:left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E5DAC8] shadow-lg flex items-center gap-3 cursor-pointer hover:scale-105 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-[#8B1E2F] text-white flex items-center justify-center text-xs">
                  <Palette className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-[#8B1E2F]">Thử phối đồ ngay</div>
                  <div className="font-serif font-bold text-xs text-[#222120]">Áo Dài • Sắc Đỏ Son</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 2. THREE ICONIC GARMENTS SPOTLIGHT ---------------- */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#8B1E2F] font-bold">
            Di Sản Trang Phục Việt
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#222120]">
            Ba Dòng Phục Trang Tiêu Biểu
          </h2>
          <p className="text-xs sm:text-sm text-[#736B60] leading-relaxed">
            Mỗi bộ trang phục mang trong mình một câu chuyện lịch sử, cấu trúc thẩm mỹ và thông điệp triết học riêng biệt của người Việt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(['ao_dai', 'ao_tu_than', 'ao_ngu_than'] as GarmentType[]).map((type) => {
            const garment = GARMENTS_DATA[type];
            return (
              <div
                key={type}
                className="bg-white rounded-3xl border border-[#E8DFC9] p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#8B1E2F]/40"
              >
                <div className="space-y-4">
                  {/* Era pill */}
                  <span className="text-[11px] px-3 py-1 rounded-full bg-[#FAF5EE] text-[#8B1E2F] border border-[#EADECC] font-medium">
                    {garment.era}
                  </span>

                  <h3 className="font-serif font-bold text-2xl text-[#222120] group-hover:text-[#8B1E2F] transition-colors">
                    {garment.name}
                  </h3>

                  <p className="text-xs text-[#6B6358] leading-relaxed">
                    {garment.shortDescription}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 space-y-1.5 border-t border-[#F2ECE1]">
                    <div className="text-[11px] font-semibold text-[#423C35] uppercase tracking-wider">
                      Đặc điểm nhận diện:
                    </div>
                    <ul className="text-xs text-[#5C5449] space-y-1 pl-4 list-disc">
                      {garment.keyFeatures.slice(0, 2).map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card actions */}
                <div className="pt-6 mt-6 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onNavigateToDiscover(type)}
                    className="text-xs text-[#524B41] hover:text-[#8B1E2F] font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigateToStudio(type)}
                    className="px-4 py-2 rounded-xl bg-[#8B1E2F]/10 hover:bg-[#8B1E2F] text-[#8B1E2F] hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Thử phối đồ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- 3. AI CULTURAL STYLIST SHOWCASE ---------------- */}
      <section className="bg-gradient-to-br from-[#2E2824] via-[#24201E] to-[#1C1917] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
        
        {/* Glow circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B1E2F]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E2F]/40 border border-[#8B1E2F] text-[#EBD292] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Gemini AI Cultural Stylist</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Thời trang cá nhân hóa,
              <br />
              <span className="text-[#EBD292] font-normal italic">đậm chất tri thức văn hóa.</span>
            </h2>

            <p className="text-sm text-[#D1C7B7] max-w-xl leading-relaxed">
              Bạn không chỉ phối một chiếc áo. Bạn đang hiểu vì sao người xưa cài 5 hạt cúc, vì sao chiếc nón quai thao đi liền với câu quan họ, và làm thế nào để Gen Z diện Việt phục vừa phong cách, vừa chuẩn mực.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-[#E5DDD0]">
                <CheckCircle2 className="w-4 h-4 text-[#EBD292] shrink-0" />
                <span>Nhận diện ngôn ngữ tự nhiên: "Phối áo dài du xuân thanh lịch..."</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#E5DDD0]">
                <CheckCircle2 className="w-4 h-4 text-[#EBD292] shrink-0" />
                <span>Thẻ "Vì sao NẾP chọn outfit này?" giải thích cặn kẽ ý nghĩa</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#E5DDD0]">
                <CheckCircle2 className="w-4 h-4 text-[#EBD292] shrink-0" />
                <span>Áp dụng tức thì vào Live Studio chỉ với một chạm</span>
              </div>
            </div>

            <button
              onClick={onOpenStylist}
              className="mt-4 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#8B1E2F] to-[#B0283F] hover:from-[#721524] hover:to-[#8B1E2F] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#8B1E2F]/40 cursor-pointer active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#EBD292]" />
              <span>Trò chuyện với AI Stylist ngay</span>
            </button>
          </div>

          {/* AI Stylist Demo Bubble */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-4">
            <div className="text-xs uppercase tracking-wider text-[#EBD292] font-semibold">
              Mô phỏng tư vấn từ Gemini:
            </div>

            <div className="bg-white/10 p-3.5 rounded-xl text-xs text-white/90 italic">
              "Tớ muốn phối áo dài xanh để đi chơi Tết, nhìn trẻ trung nhưng vẫn thanh lịch."
            </div>

            <div className="bg-black/30 p-4 rounded-xl text-xs space-y-2 border border-white/10">
              <div className="font-serif font-bold text-[#EBD292] text-sm">
                Đề xuất: Áo Dài Sắc Lam Ngọc Cung Đình
              </div>
              <p className="text-white/80 leading-relaxed text-[11px]">
                NẾP chọn sắc Lam Ngọc biểu trưng cho sự điềm đạm, phối cùng Kiềng Bạc và Quạt Xếp hoa sen. Outfit vừa mang nét tươi mới của Gen Z, vừa kín đáo thanh nhã cho những ngày đầu năm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4. THE 3 CORE PILLARS ---------------- */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#8B1E2F] font-bold">
            Triết Lý Của NẾP
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#222120]">
            Ba Giá Trị Cốt Lõi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E8DFC9] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B1E2F]/10 text-[#8B1E2F] flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#222120]">
              Fashion Personalization
            </h3>
            <p className="text-xs text-[#6B6357] leading-relaxed">
              Tự do sáng tạo, mix & match phụ kiện và sắc màu theo cá tính của bạn nhưng vẫn đảm bảo tính hài hòa tổng thể.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8DFC9] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C69A52]/15 text-[#9E7328] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#222120]">
              Cultural Intelligence
            </h3>
            <p className="text-xs text-[#6B6357] leading-relaxed">
              Trí tuệ nhân tạo Gemini hiểu sâu bối cảnh lễ nghi, ngăn ngừa sự tùy tiện và giúp bạn tự tin trong mọi không gian xuất hiện.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8DFC9] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3D7C85]/15 text-[#245D65] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#222120]">
              Interactive Learning
            </h3>
            <p className="text-xs text-[#6B6357] leading-relaxed">
              Học lịch sử và văn hóa không qua những trang sách khô cứng, mà qua từng cú nhấp chuột chọn vải, cài cúc và đội nón.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
