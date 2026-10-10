import React from 'react';
import { ColorId, GarmentType, OutfitState } from '../../types';
import { GARMENTS_DATA } from '../../data/garments';
import { COLOR_PALETTE, OCCASIONS_LIST, STYLES_LIST, ACCESSORIES_CATALOG } from '../../data/options';
import { AccessoryArt } from './AccessoryArt';
import art_ao_dai_red_crimson from '../../assets/illustrations/v5/ao_dai_red_crimson.webp';
import art_ao_dai_white_ivory from '../../assets/illustrations/v5/ao_dai_white_ivory.webp';
import art_ao_dai_blue_teal from '../../assets/illustrations/v5/ao_dai_blue_teal.webp';
import art_ao_dai_pink_lotus from '../../assets/illustrations/v5/ao_dai_pink_lotus.webp';
import art_ao_dai_yellow_gold from '../../assets/illustrations/v5/ao_dai_yellow_gold.webp';
import art_ao_dai_violet_hue from '../../assets/illustrations/v5/ao_dai_violet_hue.webp';
import art_ao_dai_emerald_green from '../../assets/illustrations/v5/ao_dai_emerald_green.webp';
import art_ao_tu_than_red_crimson from '../../assets/illustrations/v5/ao_tu_than_red_crimson.webp';
import art_ao_tu_than_white_ivory from '../../assets/illustrations/v5/ao_tu_than_white_ivory.webp';
import art_ao_tu_than_blue_teal from '../../assets/illustrations/v5/ao_tu_than_blue_teal.webp';
import art_ao_tu_than_pink_lotus from '../../assets/illustrations/v5/ao_tu_than_pink_lotus.webp';
import art_ao_tu_than_yellow_gold from '../../assets/illustrations/v5/ao_tu_than_yellow_gold.webp';
import art_ao_tu_than_violet_hue from '../../assets/illustrations/v5/ao_tu_than_violet_hue.webp';
import art_ao_tu_than_emerald_green from '../../assets/illustrations/v5/ao_tu_than_emerald_green.webp';
import art_ao_ngu_than_red_crimson from '../../assets/illustrations/v5/ao_ngu_than_red_crimson.webp';
import art_ao_ngu_than_white_ivory from '../../assets/illustrations/v5/ao_ngu_than_white_ivory.webp';
import art_ao_ngu_than_blue_teal from '../../assets/illustrations/v5/ao_ngu_than_blue_teal.webp';
import art_ao_ngu_than_pink_lotus from '../../assets/illustrations/v5/ao_ngu_than_pink_lotus.webp';
import art_ao_ngu_than_yellow_gold from '../../assets/illustrations/v5/ao_ngu_than_yellow_gold.webp';
import art_ao_ngu_than_violet_hue from '../../assets/illustrations/v5/ao_ngu_than_violet_hue.webp';
import art_ao_ngu_than_emerald_green from '../../assets/illustrations/v5/ao_ngu_than_emerald_green.webp';

interface OutfitCanvasProps {
  outfit: OutfitState;
  showDetails?: boolean;
}

const ART_MAP: Record<GarmentType, Record<ColorId, string>> = {
    ao_dai: {red_crimson: art_ao_dai_red_crimson, white_ivory: art_ao_dai_white_ivory, blue_teal: art_ao_dai_blue_teal, pink_lotus: art_ao_dai_pink_lotus, yellow_gold: art_ao_dai_yellow_gold, violet_hue: art_ao_dai_violet_hue, emerald_green: art_ao_dai_emerald_green},
    ao_tu_than: {red_crimson: art_ao_tu_than_red_crimson, white_ivory: art_ao_tu_than_white_ivory, blue_teal: art_ao_tu_than_blue_teal, pink_lotus: art_ao_tu_than_pink_lotus, yellow_gold: art_ao_tu_than_yellow_gold, violet_hue: art_ao_tu_than_violet_hue, emerald_green: art_ao_tu_than_emerald_green},
    ao_ngu_than: {red_crimson: art_ao_ngu_than_red_crimson, white_ivory: art_ao_ngu_than_white_ivory, blue_teal: art_ao_ngu_than_blue_teal, pink_lotus: art_ao_ngu_than_pink_lotus, yellow_gold: art_ao_ngu_than_yellow_gold, violet_hue: art_ao_ngu_than_violet_hue, emerald_green: art_ao_ngu_than_emerald_green},
};

/** v5 art files use correct garment names & palette-specific digital fabric studies. */
export const OutfitCanvas: React.FC<OutfitCanvasProps> = ({ outfit, showDetails = true }) => {
  const haloId = React.useId().replace(/:/g, '');
  const garment = GARMENTS_DATA[outfit.garmentType] || GARMENTS_DATA.ao_dai;
  const color = COLOR_PALETTE.find(c => c.id === outfit.primaryColor) || COLOR_PALETTE[0];
  const illustration = ART_MAP[outfit.garmentType]?.[outfit.primaryColor] || ART_MAP.ao_dai.white_ivory;
  const accessoryLabels = outfit.accessories.filter(a => a !== 'none').map(a => ACCESSORIES_CATALOG.find(item => item.id === a)?.name).filter(Boolean);
  const occasion = OCCASIONS_LIST.find(o => o.id === outfit.occasion);
  const style = STYLES_LIST.find(o => o.id === outfit.style);
  return (
    <div className="relative w-full aspect-[3/4] max-h-[640px] overflow-hidden rounded-3xl border border-[#e4d5c8] bg-[#f8f1e9] shadow-[0_16px_50px_rgba(69,47,48,0.08)] select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_#fffaf5,_#f0e5dc)]" />
      <div className="absolute inset-3 rounded-[1.15rem] border border-[#d8c8b8]/60 pointer-events-none" />
      <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'radial-gradient(#cfbba7 .8px,transparent .8px)', backgroundSize:'36px 36px' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 1086 1448" preserveAspectRatio="xMidYMid meet" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`Bản phối ${garment.name}, ${color.name}, phụ kiện: ${accessoryLabels.join(', ') || 'không phụ kiện'}`}>
          <defs>
            <radialGradient id={`${haloId}-nep-canvas-halo`}>
              <stop stopColor={color.accentHex} stopOpacity=".10" />
              <stop offset="1" stopColor={color.accentHex} stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="540" cy="540" rx="430" ry="620" fill={`url(#${haloId}-nep-canvas-halo)`} />
          <g transform="translate(65 110) scale(.86)">
            <image href={illustration} x="0" y="0" width="1086" height="1448" preserveAspectRatio="xMidYMid meet" />
            <AccessoryArt accessories={outfit.accessories} />
          </g>
        </svg>
      </div>
      <div className="pointer-events-none absolute left-4 right-4 top-4 flex justify-between items-start gap-2">
        <div className="bg-[#fff9f2]/90 border border-white/90 rounded-2xl px-3 py-2 shadow-sm backdrop-blur-sm">
          <div className="uppercase tracking-widest text-[9px] text-[#8b776b]">NẾP atelier</div>
          <div className="font-serif font-semibold text-sm text-[#633244]">{garment.name}</div>
        </div>
        <div className="bg-[#fff9f2]/90 border border-white/90 rounded-full px-3 py-2 shadow-sm flex items-center gap-2 backdrop-blur-sm">
          <span className="h-3 w-3 rounded-full border border-black/10" style={{backgroundColor:color.hex}} />
          <span className="font-serif text-[11px] text-[#56483f]">{color.vietnameseName}</span>
        </div>
      </div>
      {showDetails && (
        <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl bg-[#fffaf5]/92 backdrop-blur-md border border-white/80 shadow-md px-3.5 py-3">
          <div className="flex justify-between gap-2 text-[#5f5048] text-xs">
            <span className="font-serif font-semibold">{style?.name || 'Vẻ đẹp Việt'}</span>
            <span className="text-[10px]">{occasion?.name}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5" aria-live="polite">
            {accessoryLabels.length ? accessoryLabels.map((name, i)=>(
              <span key={`${name}-${i}`} className="rounded-full border border-[#e3d3c1] bg-white/70 px-2 py-1 text-[10px] text-[#6e5552]">{name}</span>
            )) : <span className="text-[10px] text-[#816d64]">Không dùng phụ kiện</span>}
          </div>
          <p className="mt-2 text-[9px] text-[#94857b]">Minh họa thời trang kỹ thuật số lấy cảm hứng từ Việt phục</p>
        </div>
      )}
    </div>
  );
};
