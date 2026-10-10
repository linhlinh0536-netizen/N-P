import React, { useState, useEffect } from 'react';
import { OutfitState } from '../../types';
import { getSavedLooks, deleteLook, saveLook } from '../../services/storageService';
import { GARMENTS_DATA } from '../../data/garments';
import { COLOR_PALETTE } from '../../data/options';
import { OutfitCanvas } from '../preview/OutfitCanvas';
import { 
  Bookmark, 
  Trash2, 
  Edit3, 
  Columns2, 
  Share2, 
  Sparkles, 
  Calendar, 
  X, 
  Plus, 
  ArrowRight,
  Download
} from 'lucide-react';

interface LookbookViewProps {
  onLoadOutfitToStudio: (outfit: OutfitState) => void;
  onNavigateToStudio: () => void;
}

export const LookbookView: React.FC<LookbookViewProps> = ({
  onLoadOutfitToStudio,
  onNavigateToStudio
}) => {
  const [looks, setLooks] = useState<OutfitState[]>([]);
  const [comparingIds, setComparingIds] = useState<[string, string] | null>(null);
  const [exportLook, setExportLook] = useState<OutfitState | null>(null);

  useEffect(() => {
    setLooks(getSavedLooks());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteLook(id);
    setLooks(updated);
  };

  const handleOpenStudio = (outfit: OutfitState) => {
    onLoadOutfitToStudio(outfit);
    onNavigateToStudio();
  };

  const startCompare = (firstId: string) => {
    const second = looks.find(l => l.id !== firstId);
    if (second && second.id) {
      setComparingIds([firstId, second.id]);
    }
  };

  return (
    <div className="space-y-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8DFC9] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B1E2F] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#8B1E2F]" />
            Bộ Sưu Tập Cá Nhân
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#222120] mt-1">
            NẾP Lookbook Gallery
          </h1>
          <p className="text-sm text-[#736A5E] mt-1">
            Nơi lưu giữ các bản phối Việt phục mang đậm phong cách riêng của bạn ({looks.length} bản phối)
          </p>
        </div>

        <button
          onClick={onNavigateToStudio}
          className="px-5 py-3 rounded-2xl bg-[#8B1E2F] hover:bg-[#721524] text-white text-xs font-medium flex items-center gap-2 shadow-md shadow-[#8B1E2F]/20 cursor-pointer active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo bản phối mới trong Studio</span>
        </button>
      </div>

      {/* EMPTY STATE */}
      {looks.length === 0 ? (
        <div className="p-16 text-center bg-white/60 rounded-3xl border border-dashed border-[#DDD2BE] flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#8B1E2F]/10 flex items-center justify-center text-[#8B1E2F]">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#222120]">Lookbook của bạn đang trống</h3>
          <p className="text-xs text-[#7A7165] max-w-sm">
            Hãy ghé thăm Việt Phục Studio hoặc nhờ Gemini AI Stylist gợi ý để lưu lại những bản phối ưng ý nhất!
          </p>
          <button
            onClick={onNavigateToStudio}
            className="mt-2 px-6 py-2.5 rounded-xl bg-[#8B1E2F] text-white text-xs font-medium cursor-pointer"
          >
            Đến Studio ngay
          </button>
        </div>
      ) : (
        /* LOOKBOOK GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {looks.map((look) => {
            const garment = GARMENTS_DATA[look.garmentType];
            const color = COLOR_PALETTE.find(c => c.id === look.primaryColor);

            return (
              <div
                key={look.id}
                onClick={() => handleOpenStudio(look)}
                className="group bg-white rounded-3xl border border-[#E8DFC9] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:border-[#8B1E2F]/40"
              >
                {/* Visual Canvas Snapshot */}
                <div className="relative p-4 bg-[#F7F3EB] border-b border-[#EFE8DC] overflow-hidden">
                  <div className="max-w-[260px] mx-auto pointer-events-none group-hover:scale-105 transition-transform duration-500">
                    <OutfitCanvas outfit={look} showDetails={false} />
                  </div>

                  {/* Garment tag badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold font-serif text-[#222120] border border-white/80 shadow-sm">
                    {garment?.name}
                  </div>

                  {/* Color tag */}
                  <div 
                    className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: color?.hex }}
                    title={color?.vietnameseName}
                  />
                </div>

                {/* Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#222120] group-hover:text-[#8B1E2F] transition-colors">
                      {look.title || `Outfit ${garment?.name}`}
                    </h3>
                    <p className="text-xs text-[#70685D] mt-1 line-clamp-2">
                      {look.notes || `${garment?.subtitle} kết hợp sắc ${color?.vietnameseName}.`}
                    </p>
                  </div>

                  {/* Metadata & Actions */}
                  <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-[#877E71]">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5" />
                      {look.createdAt ? new Date(look.createdAt).toLocaleDateString('vi-VN') : 'Gần đây'}
                    </span>

                    <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (look.id) startCompare(look.id);
                        }}
                        title="So sánh với outfit khác"
                        className="p-1.5 rounded-lg hover:bg-[#F2ECE1] text-[#554D43] transition-colors cursor-pointer"
                      >
                        <Columns2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExportLook(look);
                        }}
                        title="Tải thẻ Lookbook"
                        className="p-1.5 rounded-lg hover:bg-[#F2ECE1] text-[#554D43] transition-colors cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => look.id && handleDelete(look.id, e)}
                        title="Xóa bộ đồ này"
                        className="p-1.5 rounded-lg hover:bg-red-50 text-[#A32338] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: SIDE-BY-SIDE COMPARISON */}
      {comparingIds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#EADBCC] flex flex-col overflow-hidden">
            
            <div className="px-6 py-4 bg-[#F2ECE2] border-b border-[#E2D6C3] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Columns2 className="w-5 h-5 text-[#8B1E2F]" />
                <h3 className="font-serif font-bold text-base text-[#222120]">
                  So Sánh Hai Bản Phối Việt Phục
                </h3>
              </div>
              <button
                onClick={() => setComparingIds(null)}
                className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#6E6659] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0, 1].map((idx) => {
                const outfit = looks.find(l => l.id === comparingIds[idx]);
                if (!outfit) return null;
                const garment = GARMENTS_DATA[outfit.garmentType];
                const color = COLOR_PALETTE.find(c => c.id === outfit.primaryColor);

                return (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-[#E5DAC6] flex flex-col gap-4">
                    <div className="max-w-[240px] mx-auto w-full">
                      <OutfitCanvas outfit={outfit} showDetails={false} />
                    </div>

                    <div className="space-y-2 border-t border-[#F2ECE1] pt-3">
                      <h4 className="font-serif font-bold text-base text-[#222120]">{outfit.title}</h4>
                      <div className="text-xs space-y-1 text-[#5E564C]">
                        <div><strong>Trang phục:</strong> {garment?.name}</div>
                        <div><strong>Sắc màu:</strong> {color?.vietnameseName}</div>
                        <div><strong>Phụ kiện:</strong> {outfit.accessories.join(', ') || 'Không'}</div>
                        <div><strong>Dịp:</strong> {outfit.occasion}</div>
                      </div>

                      <button
                        onClick={() => {
                          setComparingIds(null);
                          handleOpenStudio(outfit);
                        }}
                        className="w-full mt-3 py-2 rounded-xl bg-[#8B1E2F] text-white text-xs font-medium cursor-pointer hover:bg-[#721524]"
                      >
                        Chỉnh sửa outfit này trong Studio
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EXPORT LOOKBOOK CARD */}
      {exportLook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#EADBCC] p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[#EADBCC] pb-3">
              <h3 className="font-serif font-bold text-base text-[#222120] flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#8B1E2F]" />
                Thẻ Trưng Bày Lookbook
              </h3>
              <button
                onClick={() => setExportLook(null)}
                className="w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-[#6E6659] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gradient-to-b from-[#F7F4EE] to-[#EAE0D1] p-5 rounded-2xl border border-[#DDD0BC] shadow-inner text-center space-y-3">
              <div className="max-w-[220px] mx-auto">
                <OutfitCanvas outfit={exportLook} showDetails={false} />
              </div>

              <div className="space-y-1 pt-2">
                <div className="text-[10px] tracking-widest uppercase text-[#8B1E2F] font-bold">NẾP HERITAGE LOOKBOOK</div>
                <h4 className="font-serif font-bold text-lg text-[#222120]">{exportLook.title}</h4>
                <p className="text-xs text-[#6B6256] italic">"{exportLook.notes || 'Chạm nét xưa, mặc chất nay.'}"</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#8B1E2F] hover:bg-[#721524] text-white text-xs font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>In / Lưu Thẻ Ảnh</span>
              </button>
              <button
                onClick={() => setExportLook(null)}
                className="py-2.5 px-4 rounded-xl border border-[#D9CEBA] bg-white text-xs text-[#4A433A] cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
