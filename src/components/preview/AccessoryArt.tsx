import React, { useId } from 'react';
import { AccessoryId } from '../../types';

/**
 * Illustrated accessories aligned with the portrait art (1086 × 1448 artwork coordinates).
 * All hats, hat straps, fan and handbag have explicit anchor points rather than
 * relying on CSS positioning. SVG groups are layered in front of the portrait.
 * The same renderer is used by Studio, Discover and Lookbook.
 */
type Props = { accessories: AccessoryId[] };
const HEADWEAR: AccessoryId[] = ['non_la','non_quai_thao','khan_dong','khan_mo_qua'];

export const AccessoryArt: React.FC<Props> = ({ accessories }) => {
  const raw = useId().replace(/:/g,'');
  const id = (name: string) => `${raw}-${name}`;
  const present = (name: AccessoryId) => accessories.includes(name);
  const currentHat = HEADWEAR.find(present);
  return (
    <g strokeLinecap="round" strokeLinejoin="round" aria-label="Phụ kiện được chọn">
      <defs>
        <linearGradient id={id('straw')} x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="#fff8e8"/>
          <stop offset=".5" stopColor="#e8d7b8"/>
          <stop offset="1" stopColor="#ceb493"/>
        </linearGradient>
        <linearGradient id={id('silk')} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#b85068"/><stop offset=".58" stopColor="#813e52"/><stop offset="1" stopColor="#d4888d"/>
        </linearGradient>
        <linearGradient id={id('fan')} x1="0" y1="0" x2="1" y2=".9">
          <stop stopColor="#fff9e9"/><stop offset="1" stopColor="#e7cdb8"/>
        </linearGradient>
        <radialGradient id={id('silver')}>
          <stop stopColor="#fff"/><stop offset=".55" stopColor="#d2d5d6"/><stop offset="1" stopColor="#8e9396"/>
        </radialGradient>
      </defs>

      {currentHat === 'non_la' && (
        <g id="hat-non-la">
          {/* Two silk cords meet directly beneath the chin. Their ends attach at the brim. */}
          <path d="M437 46 C433 128 473 201 522 214 Q534 218 545 209 C589 189 622 127 620 46" fill="none" stroke="#974d5a" strokeWidth="7" opacity=".88"/>
          <path d="M438 46 C435 130 475 201 523 212 Q533 215 544 207 C589 188 621 125 619 46" fill="none" stroke="#cf8189" strokeWidth="3"/>
          <path d="M518 217 Q532 223 548 214" fill="none" stroke="#b85e70" strokeWidth="3"/>
          <g transform="translate(0 -55)">
          <path d="M515 -43 Q544 -21 563 -4 C625 21 696 68 739 100 Q534 133 314 101 C361 55 443 12 515 -43Z" fill={`url(#${id('straw')})`} stroke="#806958" strokeWidth="3.3" />
          <path d="M331 99 Q533 119 725 99 M367 85 Q532 105 696 86 M403 62 Q531 80 666 65" fill="none" stroke="#ae9472" strokeWidth="2.4" opacity=".72" />
          <path d="M514 -42 Q475 19 334 101 M515 -42 Q557 30 722 99 M514 -42 L531 108 M500 -31 L427 107 M532 -30 L626 105" stroke="#bba27c" strokeWidth="1.6" fill="none" opacity=".6" />
          <path d="M317 102 Q525 138 736 102" fill="none" stroke="#866b50" strokeWidth="5" opacity=".75" />
          <circle cx="437" cy="102" r="4" fill="#a36961"/><circle cx="620" cy="102" r="4" fill="#a36961"/>
          </g>
        </g>
      )}

      {currentHat === 'non_quai_thao' && (
        <g id="hat-non-quai-thao" transform="translate(0 -70)">
          {/* Ribbon anchors are beneath the two sides of the round brim */}
          <path d="M370 100 C350 200 390 350 355 475 Q365 507 351 545" fill="none" stroke={`url(#${id('silk')})`} strokeWidth="19"/>
          <path d="M692 100 C701 212 676 372 718 490 L711 556" fill="none" stroke="#b88988" strokeWidth="18"/>
          <path d="M352 531 l-19 48 36 -11Z" fill="#ad6071"/><path d="M711 546 l-15 43 33 -10Z" fill="#c49a95"/>
          <ellipse cx="531" cy="84" rx="235" ry="56" fill={`url(#${id('straw')})`} stroke="#8b775f" strokeWidth="4"/>
          <ellipse cx="531" cy="83" rx="202" ry="40" fill="none" stroke="#b39b78" strokeWidth="2"/>
          <ellipse cx="531" cy="82" rx="148" ry="28" fill="none" stroke="#cdb48b" strokeWidth="2"/>
          <ellipse cx="531" cy="79" rx="64" ry="13" fill="none" stroke="#b49a74" strokeWidth="2"/>
          <ellipse cx="531" cy="78" rx="14" ry="8" fill="#a78369"/>
          <path d="M301 86 Q530 117 765 85" fill="none" stroke="#a18b6f" strokeWidth="2.5"/>
          <circle cx="369" cy="103" r="5" fill="#b96074"/><circle cx="693" cy="102" r="5" fill="#b96074"/>
        </g>
      )}

      {currentHat === 'khan_dong' && (
        <g id="khan-dong">
          <path d="M398 95 Q391 37 429 19 Q502 -18 595 18 Q651 42 663 98 Q548 55 398 95Z" fill="#30292c" stroke="#211e21" strokeWidth="4" />
          <path d="M399 85 Q502 28 661 84 M400 76 Q502 18 656 77 M420 52 Q512 10 633 56" fill="none" stroke="#8e7870" strokeWidth="4" opacity=".75" />
          <path d="M412 89 Q510 50 647 93" fill="none" stroke="#c6a877" strokeWidth="2"/>
          <path d="M502 35 Q525 25 548 36" fill="none" stroke="#d4b379" strokeWidth="2" />
        </g>
      )}

      {currentHat === 'khan_mo_qua' && (
        <g id="khan-mo-qua">
          <path d="M408 95 Q399 32 462 14 Q541 -13 609 24 Q652 43 657 100 Q607 76 562 89 L534 113 Q515 89 495 92 Q455 84 408 95Z" fill="#292529" stroke="#211c20" strokeWidth="3.3"/>
          <path d="M425 66 Q527 7 637 70 M415 80 Q527 21 644 85" fill="none" stroke="#807078" strokeWidth="2.1"/>
          <path d="M499 88 Q519 94 533 109 Q547 90 564 85" stroke="#ae9da2" strokeWidth="1.5" fill="none" />
        </g>
      )}

      {present('kieng_bac') && (
        <g id="kieng-bac">
          <path d="M448 231 Q530 305 616 230" fill="none" stroke="#6d6762" strokeWidth="10" opacity=".38"/>
          <path d="M448 230 Q530 301 616 230" fill="none" stroke={`url(#${id('silver')})`} strokeWidth="8"/>
          <path d="M456 235 Q532 288 606 235" fill="none" stroke="#ffffff" strokeWidth="2" opacity=".95"/>
          <path d="M526 285 Q539 297 526 307 Q513 294 526 285Z" fill={`url(#${id('silver')})`} stroke="#938f8c" strokeWidth="2"/>
        </g>
      )}

      {present('tui_gam') && (
        <g id="tui-gam">
          {/* Shoulder strap is routed to the bag; its end does not float. */}
          <path d="M665 321 Q702 439 712 575 Q713 651 744 711" fill="none" stroke="#70503e" strokeWidth="11" opacity=".48"/>
          <path d="M663 319 Q702 439 713 576 Q715 652 741 712" fill="none" stroke="#c79a64" strokeWidth="6"/>
          <path d="M679 682 Q729 665 776 694 L793 819 Q737 849 679 824 L675 706Z" fill={`url(#${id('silk')})`} stroke="#754253" strokeWidth="4"/>
          <path d="M682 702 Q731 718 783 703 M684 817 Q733 834 785 812" fill="none" stroke="#c99873" strokeWidth="3"/>
          <path d="M732 726 Q760 745 737 772 Q710 748 732 726Z" fill="none" stroke="#f2d4a5" strokeWidth="3" />
          <path d="M732 734 Q742 751 732 762 M716 744 Q729 747 744 745" stroke="#f2d4a5" strokeWidth="2"/>
          <path d="M712 825 L710 854 M748 832 L754 856" stroke="#d1b17b" strokeWidth="5"/>
        </g>
      )}

      {present('quat_xep') && (
        <g id="quat-xep">
          {/* Fan hinge rests at the clasped hands (x 522, y 617). */}
          <path d="M516 629 Q548 552 591 509 Q668 472 720 510 Q748 562 737 646 L516 629Z" fill={`url(#${id('fan')})`} stroke="#8d6e62" strokeWidth="4"/>
          {[
            'M517 629 L593 510','M517 629 L625 487','M517 629 L659 485',
            'M517 629 L694 495','M517 629 L721 520','M517 629 L737 561','M517 629 L737 615'
          ].map((d,i)=><path key={i} d={d} fill="none" stroke="#b68d75" strokeWidth="2.3"/>)}
          <path d="M589 522 Q650 495 716 533 M567 568 Q650 530 735 579" fill="none" stroke="#e8baa1" strokeWidth="2.2"/>
          <path d="M652 525 q-11 -23 7 -28 q15 20 -7 28Z M656 528 q28 -18 29 4 q-20 11 -29 -4Z" fill="#b46b72" opacity=".75"/>
          <circle cx="521" cy="629" r="7" fill="#c5a170" stroke="#815c52" strokeWidth="2"/>
          <path d="M521 637 Q516 661 527 675" fill="none" stroke="#c38b79" strokeWidth="4"/>
        </g>
      )}
    </g>
  );
};
