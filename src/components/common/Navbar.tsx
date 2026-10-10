import React, { useState } from 'react';
import { Sparkles, Bookmark, Compass, Palette, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'discover' | 'studio' | 'lookbook';
  onSelectTab: (tab: 'home' | 'discover' | 'studio' | 'lookbook') => void;
  onOpenStylist: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenStylist,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'home' | 'discover' | 'studio' | 'lookbook') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EAE1D1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <div 
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Traditional Seal Icon */}
          <div className="w-10 h-10 rounded-xl bg-[#8B1E2F] flex items-center justify-center text-[#FFF8EE] shadow-md shadow-[#8B1E2F]/20 group-hover:scale-105 transition-transform">
            <span className="font-serif font-black text-xl tracking-tighter">N</span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif font-black tracking-widest text-2xl text-[#222120] leading-none group-hover:text-[#8B1E2F] transition-colors">
              NẾP
            </span>
            <span className="text-[10px] tracking-wider text-[#8A8174] uppercase font-medium mt-1">
              Chạm nét xưa • Mặc chất nay
            </span>
          </div>
        </div>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
          <button
            onClick={() => handleNav('home')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              currentTab === 'home'
                ? 'text-[#8B1E2F] bg-[#8B1E2F]/10 font-semibold'
                : 'text-[#595146] hover:text-[#222120] hover:bg-black/5'
            }`}
          >
            Trang Chủ
          </button>

          <button
            onClick={() => handleNav('discover')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'discover'
                ? 'text-[#8B1E2F] bg-[#8B1E2F]/10 font-semibold'
                : 'text-[#595146] hover:text-[#222120] hover:bg-black/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Khám Phá Việt Phục</span>
          </button>

          <button
            onClick={() => handleNav('studio')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'studio'
                ? 'text-[#8B1E2F] bg-[#8B1E2F]/10 font-semibold'
                : 'text-[#595146] hover:text-[#222120] hover:bg-black/5'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Việt Phục Studio</span>
          </button>

          <button
            onClick={() => handleNav('lookbook')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'lookbook'
                ? 'text-[#8B1E2F] bg-[#8B1E2F]/10 font-semibold'
                : 'text-[#595146] hover:text-[#222120] hover:bg-black/5'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Lookbook</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#8B1E2F] text-white text-[10px] flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* CTA BUTTON: GEMINI STYLIST */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenStylist}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1E2F] to-[#A32338] text-white text-xs font-medium flex items-center gap-2 shadow-md shadow-[#8B1E2F]/20 hover:opacity-95 transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EBD292] animate-pulse" />
            <span>AI Cultural Stylist</span>
          </button>
        </div>

        {/* MOBILE MENU HAMBURGER BUTTON */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenStylist}
            className="p-2 rounded-xl bg-[#8B1E2F] text-white text-xs flex items-center"
            title="AI Stylist"
          >
            <Sparkles className="w-4 h-4 text-[#EBD292]" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-black/5 text-[#595146]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EAE1D1] px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium flex items-center justify-between ${
              currentTab === 'home' ? 'bg-[#8B1E2F]/10 text-[#8B1E2F] font-semibold' : 'text-[#4A433A]'
            }`}
          >
            <span>Trang Chủ</span>
          </button>

          <button
            onClick={() => handleNav('discover')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              currentTab === 'discover' ? 'bg-[#8B1E2F]/10 text-[#8B1E2F] font-semibold' : 'text-[#4A433A]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Khám Phá Việt Phục</span>
          </button>

          <button
            onClick={() => handleNav('studio')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              currentTab === 'studio' ? 'bg-[#8B1E2F]/10 text-[#8B1E2F] font-semibold' : 'text-[#4A433A]'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Việt Phục Studio (Phối Đồ)</span>
          </button>

          <button
            onClick={() => handleNav('lookbook')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium flex items-center justify-between ${
              currentTab === 'lookbook' ? 'bg-[#8B1E2F]/10 text-[#8B1E2F] font-semibold' : 'text-[#4A433A]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              <span>NẾP Lookbook</span>
            </div>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#8B1E2F] text-white text-[10px] flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
