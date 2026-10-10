import React from 'react';
import { Heart, Sparkles, BookOpen, Compass } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'discover' | 'studio' | 'lookbook') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#24201E] text-[#D8CFBF] border-t border-[#3D3732] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* UPPER FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#3B342E]">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#8B1E2F] flex items-center justify-center text-white font-serif font-black text-lg">
                N
              </div>
              <span className="font-serif font-bold text-2xl text-[#FFF8EE] tracking-widest">
                NẾP
              </span>
            </div>

            <p className="text-sm text-[#A89F90] max-w-md leading-relaxed font-serif italic">
              "Chạm nét xưa, mặc chất nay. Tôn vinh vẻ đẹp ngàn năm của y phục dân tộc bằng lăng kính thời trang đương đại, trao quyền cho Gen Z tự tin khoác lên niềm tự hào cội nguồn."
            </p>

            <div className="flex items-center gap-2 text-xs text-[#8B1E2F] bg-[#8B1E2F]/10 px-3 py-1.5 rounded-lg border border-[#8B1E2F]/20 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#EBD292]" />
              <span className="text-[#E5D7BF]">Ứng dụng công nghệ Google Gemini 3.8 Flash</span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#EADBCC]">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F90]">
              <li>
                <button onClick={() => onSelectTab('discover')} className="hover:text-white transition-colors cursor-pointer">
                  Áo Dài Tân Thời
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('discover')} className="hover:text-white transition-colors cursor-pointer">
                  Áo Tứ Thân Kinh Bắc
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('discover')} className="hover:text-white transition-colors cursor-pointer">
                  Áo Ngũ Thân Triều Nguyễn
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('studio')} className="hover:text-white transition-colors cursor-pointer">
                  Việt Phục Studio 3D/SVG
                </button>
              </li>
            </ul>
          </div>

          {/* CULTURE & ETHICS */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#EADBCC]">
              Tri Thức Văn Hóa
            </h4>
            <p className="text-xs text-[#998F81] leading-relaxed">
              Mọi tư liệu về lịch sử, ý nghĩa ngũ khuy, tà áo và bối cảnh sử dụng đều được chắt lọc dựa trên nghiên cứu khảo cứu phục trang cổ truyền Việt Nam, tránh võ đoán lịch sử.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#807669] gap-4">
          <p>© 2026 NẾP – Chạm nét xưa, mặc chất nay. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Được thiết kế với tình yêu di sản Việt Nam <Heart className="w-3.5 h-3.5 text-[#8B1E2F] fill-[#8B1E2F]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
