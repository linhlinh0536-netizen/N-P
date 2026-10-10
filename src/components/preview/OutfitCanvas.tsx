import React, { useId, useMemo } from 'react';
import { OutfitState, AccessoryId } from '../../types';
import { COLOR_PALETTE } from '../../data/options';
import { GARMENTS_DATA } from '../../data/garments';
import { OCCASIONS_LIST, STYLES_LIST } from '../../data/options';

interface OutfitCanvasProps {
  outfit: OutfitState;
  showDetails?: boolean;
}

type FigureProps = {
  outfit: OutfitState;
  cloth: string;
  shadow: string;
  dark: string;
  light: string;
  gold: string;
  lining: string;
  uid: (name: string) => string;
};

/*
 * NẾP / Atelier illustration renderer.
 * All three clothes share the same anatomical anchors (neck 250,191;
 * shoulders 213/287,203; wrists 173/327,379; waist 250,343).
 * No naked torso/arms are drawn behind sleeved garments: fabric sleeves
 * end at the wrist; only small hands are painted in the foreground.
 * This prevents the shoulder/underarm "skin triangles" from reappearing
 * when switching garments. SVGs are self-contained and re-colorable.
 */
const INK = '#513d38';
const SOFT_INK = '#80695f';
const SKIN = '#f2cbb8';

const Outlines: React.FC<FigureProps> = ({ outfit, cloth, shadow, dark, light, gold, lining, uid }) => {
  const aoDai = outfit.garmentType === 'ao_dai';
  const tuThan = outfit.garmentType === 'ao_tu_than';

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* Narrow embroidered shoes anchored to the legs */}
      <g id="figure-shoes">
        <path d="M228 630 C228 644 226 651 223 655 Q226 663 240 661 Q247 660 245 654 L243 632Z" fill="#463431" />
        <path d="M257 632 L255 655 Q252 660 260 661 Q274 663 277 655 C274 650 272 642 272 630Z" fill="#463431" />
        <path d="M228 654 Q235 656 244 654 M256 654 Q265 657 275 654" stroke={gold} strokeWidth="1.6" />
      </g>

      {/* Trousers/skirt behind the overcoat */}
      {aoDai && (
        <g id="silk-trousers">
          <path d="M213 328 Q250 320 287 329 C291 407 312 527 311 649 Q281 653 255 648 L250 404 L244 648 Q211 653 190 650 C191 528 209 412 213 328Z" fill={lining} stroke="#a9988a" strokeWidth="1.3" />
          <path d="M217 429 C210 504 207 583 207 646 M279 419 Q294 529 298 643 M247 422 L244 645" stroke="#9c9189" strokeWidth="1" opacity=".3" />
        </g>
      )}
      {tuThan && (
        <g id="long-skirt">
          <path d="M213 337 Q247 329 285 337 C294 424 324 548 329 647 Q250 660 171 647 C175 544 203 412 213 337Z" fill="#342a30" stroke="#46343d" strokeWidth="2" />
          <path d="M188 630 Q206 541 217 410 M219 646 Q226 516 235 395 M257 394 L253 651 M284 413 Q307 536 316 643" stroke="#a48d98" strokeOpacity=".18" strokeWidth="2" />
        </g>
      )}
      {!aoDai && !tuThan && (
        <g id="ngu-than-trousers">
          <path d="M217 335 Q250 324 282 335 L302 648 Q281 651 257 649 L250 421 L241 649 Q216 651 196 648Z" fill="#f5eee2" stroke="#c4b9ab" strokeWidth="1.4" />
          <path d="M213 415 L209 645 M287 425 L293 645" stroke="#a99d91" opacity=".45" />
        </g>
      )}

      {/* Garment drawn as the actual silhouette, not detached "sleeves" */}
      {aoDai && (
        <g id="dress-ao-dai">
          {/* back panel, behind the forward flap */}
          <path d="M217 319 Q213 456 181 619 Q247 635 313 620 Q285 449 282 320Z" fill={shadow} stroke={INK} strokeOpacity=".3" strokeWidth="1.4" />
          <path d="M202 582 Q213 479 220 385" stroke={light} strokeOpacity=".48" strokeWidth="2" />
          {/* seamless left sleeve + shoulder / fitted bodice */}
          <path d="M236 184 Q218 190 206 200 Q193 216 185 244 C180 269 159 331 158 349 Q168 363 184 361 C204 323 219 283 225 259 Q220 294 216 335 Q248 351 285 335 Q279 294 276 259 C285 296 300 334 317 361 Q334 362 342 349 C341 330 319 264 312 242 Q302 206 287 200 Q273 190 263 184 Z" fill={cloth} stroke={INK} strokeWidth="1.65" />
          {/* fine shoulder seaming gives continuous fit */}
          <path d="M207 201 Q223 205 229 220 M293 201 Q279 205 271 220" stroke={dark} strokeWidth="1.5" opacity=".35" />
          <path d="M188 255 Q180 298 165 344 M312 255 Q320 298 335 344" stroke={light} opacity=".36" strokeWidth="3" />
          <path d="M218 269 Q227 295 220 327 M282 269 Q274 294 280 326" stroke={dark} strokeOpacity=".32" strokeWidth="1.5" />
          {/* flowing front silk panel */}
          <path d="M216 333 C215 423 191 544 188 621 Q248 633 308 619 C299 540 284 419 285 333 Q253 344 216 333Z" fill={cloth} stroke={INK} strokeWidth="1.5" />
          <path d="M230 353 Q224 457 214 579 M255 356 Q258 477 275 596 M298 574 Q293 531 286 468" stroke={light} opacity=".32" strokeWidth="3" />
          <path d="M200 599 Q220 608 236 608 M260 612 Q281 609 300 602" stroke={dark} opacity=".18" strokeWidth="2" />
          {/* handwritten-style embroidered flower by the waist */}
          <g stroke={gold} strokeWidth="1" opacity=".75">
            <path d="M254 280 Q264 288 269 297 M257 289 Q266 283 267 278 M262 288 Q274 286 277 279" fill="none" />
            <path d="M265 293 Q260 289 258 294 Q264 300 265 293 Q267 286 272 289 Q271 296 265 293Z" fill="none" />
          </g>
          {/* lined high neck and diagonal closure */}
          <path d="M235 183 Q250 178 265 183 L266 204 Q250 210 234 203Z" fill={shadow} stroke={INK} strokeWidth="1.4" />
          <path d="M237 187 Q250 184 263 187" stroke={gold} strokeWidth="1.7" />
          <path d="M263 203 Q278 210 286 239" stroke={gold} strokeWidth="1.4" />
          {[0, 1, 2].map((n) => <circle key={n} cx={270 + n * 6.5} cy={213 + n * 11} r="2" fill={gold} stroke={light} strokeWidth=".6" />)}
          {/* ink cuffs close cleanly around wrist */}
          <path d="M158 349 Q171 358 184 361 M317 361 Q329 358 342 349" fill="none" stroke={dark} strokeWidth="1.5" />
        </g>
      )}

      {tuThan && (
        <g id="robe-tu-than">
          {/* yếm, outer shoulder-cover and softer crossed center */}
          <path d="M233 186 Q250 192 267 186 L275 291 Q252 309 226 292Z" fill="#b94f67" stroke={INK} strokeWidth="1.3" />
          <path d="M235 185 Q250 179 265 185 M236 186 Q249 210 250 234 Q257 210 265 186" stroke="#f4d7c5" strokeWidth="1.6" />
          <path d="M250 226 Q258 235 250 243 Q242 235 250 226Z" fill="#f9d5ba" opacity=".5" />
          {/* shoulder and sleeve, connected with the top of each open panel */}
          <path d="M235 187 Q210 189 201 203 C186 230 165 292 151 343 Q157 357 174 361 Q193 320 207 281 L206 342 C196 402 181 511 171 568 Q197 578 218 570 Q226 478 241 313 L241 205Z" fill={cloth} stroke={INK} strokeWidth="1.65" />
          <path d="M265 187 Q290 189 299 203 C314 230 335 292 349 343 Q343 357 326 361 Q307 320 293 281 L294 342 C304 402 319 511 329 568 Q303 578 282 570 Q274 478 259 313 L259 205Z" fill={cloth} stroke={INK} strokeWidth="1.65" />
          {/* ivory facing defining the open front */}
          <path d="M236 188 Q223 260 219 348 Q213 442 202 563 M264 188 Q277 260 281 348 Q287 442 298 563" stroke={light} strokeWidth="4" opacity=".65" />
          <path d="M203 213 Q188 265 160 341 M297 213 Q312 265 340 341" stroke={dark} strokeOpacity=".38" strokeWidth="1.5" />
          {/* red-pink secondary ribbon and jade green sash */}
          <path d="M220 317 Q250 326 280 317 L283 341 Q253 350 217 340Z" fill="#51765e" stroke="#365c49" strokeWidth="1.5" />
          <path d="M250 341 C248 403 242 466 226 520 L239 526 C253 480 257 407 257 342Z" fill="#a34f69" stroke="#6e3e49" strokeWidth=".8" />
          <path d="M255 340 C263 407 275 455 275 508 L286 511 Q283 412 263 338Z" fill="#8cac79" stroke="#47715f" strokeWidth=".8" />
          <path d="M224 343 Q239 347 249 344 M263 344 Q273 347 281 341" stroke="#ded6b9" strokeWidth="1" />
          <path d="M169 349 Q160 348 154 343 M330 361 Q342 358 348 343" stroke={dark} strokeWidth="1.2" />
        </g>
      )}

      {!aoDai && !tuThan && (
        <g id="robe-ngu-than">
          {/* asymmetric fifth panel peeks from beneath robe */}
          <path d="M215 239 C209 370 200 482 192 579 Q250 592 309 580 L284 222Z" fill={shadow} stroke={INK} strokeOpacity=".4" strokeWidth="1.5" />
          {/* covered shoulders and full sleeves, no skin under shoulder */}
          <path d="M237 184 C213 184 197 196 193 216 C179 263 164 317 153 351 Q163 366 181 362 Q202 325 217 281 L215 342 C207 418 197 504 189 578 Q252 595 314 577 C305 499 298 421 286 342 L283 281 Q302 325 319 362 Q337 365 347 351 C337 318 319 263 307 216 Q298 192 263 184Z" fill={cloth} stroke={INK} strokeWidth="1.65" />
          <path d="M217 228 Q230 242 250 257 Q270 271 286 312 Q285 425 307 575" fill="none" stroke={dark} strokeOpacity=".52" strokeWidth="2" />
          <path d="M202 275 Q183 328 163 351 M298 275 Q318 328 337 351" stroke={light} strokeOpacity=".38" strokeWidth="2" />
          <path d="M209 415 Q203 514 195 561 M280 360 Q283 484 302 560" stroke={light} strokeOpacity=".3" strokeWidth="3" />
          {/* upright collar */}
          <path d="M233 182 Q250 178 267 182 L267 205 Q250 210 233 205Z" fill={shadow} stroke={INK} strokeWidth="1.5" />
          <path d="M235 185 Q250 182 265 185" stroke={gold} strokeWidth="1.5" />
          <path d="M250 204 Q267 224 276 251 Q282 277 281 337" stroke={gold} strokeOpacity=".65" strokeWidth="1.6" />
          {[[251, 204], [264, 220], [274, 243], [280, 270], [281, 300]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="2.7" fill={gold} stroke="#7d603c" strokeWidth=".7" />
              <circle cx={cx - .6} cy={cy - .9} r=".65" fill="#fff6dc" />
            </g>
          ))}
          <path d="M153 351 Q166 358 181 362 M319 362 Q334 359 347 351" stroke={dark} strokeWidth="1.4" />
        </g>
      )}

      {/* Natural hands IN FRONT of sleeves, separate from body. */}
      <g id="hands" fill={SKIN} stroke="#b88a79" strokeWidth="1.15">
        <path d="M160 352 Q168 358 181 364 C185 370 185 385 180 390 Q175 392 173 387 Q166 379 163 372 Q157 366 160 352Z" />
        <path d="M340 352 Q332 358 319 364 C315 370 315 385 320 390 Q325 392 327 387 Q334 379 337 372 Q343 366 340 352Z" />
        <path d="M170 379 Q173 383 176 380 M324 381 Q327 381 330 377" fill="none" stroke="#d5a590" strokeWidth=".8" />
      </g>

      {/* garment stitching that should be visible only faintly */}
      <g stroke={SOFT_INK} strokeWidth=".7" opacity=".2">
        <path d="M205 205 Q201 213 199 224" />
        <path d="M294 206 Q298 215 302 227" />
      </g>
    </g>
  );
};

/* Detailed face/hairstyle are independent from clothing, but share the collar anchor. */
const Portrait: React.FC<{ uid: (name: string) => string; outfit: OutfitState }> = ({ uid, outfit }) => {
  const tuThan = outfit.garmentType === 'ao_tu_than';
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* Hair behind head and shoulders; a pencil-and-wash silhouette */}
      <path d="M217 103 C208 79 214 57 232 47 C254 34 286 50 291 76 C302 107 299 170 303 248 Q296 257 287 249 Q279 221 282 180 C270 200 237 206 222 183 C220 207 216 233 207 251 Q193 250 199 236 C210 200 200 126 217 103Z" fill={uid('hair')} stroke="#2c2324" strokeWidth="1.9" />
      <path d="M207 217 C216 177 210 141 213 117 M290 125 C287 170 296 207 290 238" stroke="#ad8a6d" strokeWidth="1.1" opacity=".65" />
      {/* neck from shoulder line, behind face */}
      <path d="M238 153 C241 163 239 179 234 190 Q250 202 266 190 C261 177 260 164 264 153Z" fill={uid('neck')} stroke="#c59783" strokeWidth="1.1" />
      <path d="M241 165 Q250 171 260 164" stroke="#d9ae99" strokeWidth="1.5" />
      {/* portrait: delicate and slightly tilted human contours */}
      <path d="M218 91 Q212 115 221 142 C230 161 241 170 250 171 C263 167 276 157 281 135 Q289 110 279 88 C268 69 233 70 218 91Z" fill={uid('skin')} stroke="#9d7467" strokeWidth="1.35" />
      <path d="M220 123 Q214 117 216 127 Q217 133 223 136 M279 124 Q287 119 284 130 Q282 136 278 137" fill={SKIN} stroke="#ad7f70" strokeWidth=".8" />
      {/* hair: flowing parted fringe and face-framing side locks */}
      <path d="M212 111 C209 75 225 60 239 58 Q268 46 286 71 C295 84 290 108 282 122 C282 97 270 85 253 81 Q236 104 217 110Z" fill={uid('hair')} stroke="#34272a" strokeWidth="1.7" />
      <path d="M248 81 Q237 103 223 115 M254 78 Q272 88 278 107" fill="none" stroke="#bc9b7e" strokeWidth="1.2" opacity=".8" />
      <path d="M218 105 Q215 132 222 152 C216 149 211 135 212 120 M280 105 Q285 135 277 154" stroke="#33292a" strokeWidth="4" fill="none" />
      <path d="M225 81 Q240 65 262 65 M226 87 Q235 81 241 76" stroke="#d1aa8d" strokeWidth=".9" opacity=".65" />
      {/* Uneven pencil strands and side-swept fringe inspired by hand-drawn fashion portraits */}
      <path d="M226 77 Q246 55 270 67 M221 91 Q233 82 244 68 M235 93 Q249 75 262 70 M260 70 Q277 77 280 91" stroke="#a68475" strokeWidth=".8" fill="none" opacity=".65" />
      <path d="M218 123 Q211 181 202 218 M282 122 Q290 170 292 213 M210 150 Q210 185 205 205" stroke="#9b7b6c" strokeWidth=".7" opacity=".72" fill="none" />

      {/* eyebrows, individually curved lashes and almond-shaped irises */}
      <path d="M225 116 C233 110 241 110 246 115 M257 115 C266 110 274 111 278 118" stroke="#473137" strokeWidth="1.6" fill="none" />
      <path d="M224 128 Q233 121 246 128 Q235 135 224 128Z M255 128 Q266 121 278 129 Q266 135 255 128Z" fill="#faf6f0" stroke="#503b39" strokeWidth="1.35" />
      <ellipse cx="236" cy="127.4" rx="4.4" ry="5" fill="#6d4b3e" />
      <ellipse cx="266" cy="127.4" rx="4.4" ry="5" fill="#6d4b3e" />
      <ellipse cx="236" cy="127.4" rx="2.6" ry="4" fill="#241f21" />
      <ellipse cx="266" cy="127.4" rx="2.6" ry="4" fill="#241f21" />
      <circle cx="237.6" cy="126" r="1.65" fill="white" />
      <circle cx="267.6" cy="126" r="1.65" fill="white" />
      <path d="M224 128 L220 124 M228 125 L226 122 M275 125 L278 122 M278 129 L282 126" stroke="#4b3336" strokeWidth="1.05" />
      <path d="M229 138 Q237 141 243 138 M257 138 Q266 141 273 138" stroke="#9a7167" opacity=".45" strokeWidth=".8" fill="none" />
      <path d="M250 132 Q248 139 247.5 142 Q250 144 253 143" stroke="#c69384" strokeWidth="1.1" fill="none" />
      <ellipse cx="228" cy="144" rx="12" ry="7" fill={uid('blush')} />
      <ellipse cx="273" cy="144" rx="12" ry="7" fill={uid('blush')} />
      <path d="M242 152 Q247 150 250 151 Q254 150 258 152 Q253 157 250 157 Q247 157 242 152Z" fill="#ab5e68" stroke="#a35361" strokeWidth=".6" />
      <path d="M245 153 Q251 154.5 256 153" stroke="#f7c2b7" strokeWidth="1.1" />
      <path d="M246 161 Q250 163 254 161" stroke="#c48f82" opacity=".6" strokeWidth=".65" />
      {/* silken hair strands flow beyond ears, but do not obscure clothing */}
      <path d="M213 113 C205 158 213 180 203 220 M283 111 C291 166 285 191 294 218" stroke="#594340" strokeWidth="2.1" opacity=".75" />
      <path d="M214 133 Q214 163 212 176 M286 133 Q286 169 290 181" stroke="#caa58b" strokeWidth=".85" opacity=".8" />
      {/* optional subtle gold earrings */}
      {!tuThan && (
        <g stroke="#b88f52" strokeWidth="1.2" fill="none">
          <path d="M221 140 Q218 150 223 151 Q227 150 223 143 M279 140 Q282 150 278 151 Q274 150 278 143" />
          <circle cx="223" cy="153" r="2.7" fill="#f9efe5" stroke="#b88f52" />
          <circle cx="278" cy="153" r="2.7" fill="#f9efe5" stroke="#b88f52" />
        </g>
      )}
    </g>
  );
};

const Accessories: React.FC<FigureProps & { has: (id: AccessoryId) => boolean }> = ({ outfit, has, uid, gold }) => {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {has('khan_dong') && !has('non_la') && (
        <g id="khan-dong">
          <path d="M213 95 C212 74 225 68 249 67 C275 66 286 76 285 97 Q251 84 213 95Z" fill="#31282b" stroke="#221c20" strokeWidth="2" />
          <path d="M215 86 Q250 70 283 88 M218 91 Q250 78 283 92" stroke="#a18d79" strokeWidth="1.4" fill="none" />
          <path d="M244 79 Q250 74 256 79" stroke={gold} strokeWidth="1.5" fill="none" />
        </g>
      )}
      {has('khan_mo_qua') && !has('non_quai_thao') && (
        <g id="khan-mo-qua">
          <path d="M214 100 C213 76 238 69 255 71 Q280 71 286 96 C276 93 264 93 251 100 L245 112 L239 102 Q227 103 214 100Z" fill="#2b262a" stroke="#201d21" strokeWidth="1.7" />
          <path d="M218 92 Q249 78 280 93" stroke="#897a79" strokeWidth="1.2" />
        </g>
      )}
      {has('non_la') && (
        <g id="non-la" aria-label="Nón lá đặt trên mái tóc, quai nón ôm dưới cằm">
          {/* front of the straps anchored to the brim at two real contact points */}
          <path d="M204 109 C207 137 223 158 243 170 Q251 175 258 171 C277 158 290 139 295 109" stroke="#a15b57" strokeWidth="2.5" fill="none" />
          <path d="M243 171 Q249 177 253 177 M252 175 C259 184 262 190 266 200" stroke="#a15b57" strokeWidth="1.35" />
          <path d="M250 16 C273 37 305 75 337 103 Q250 123 163 103 C195 75 227 36 250 16Z" fill={uid('hat')} stroke="#9e8267" strokeWidth="1.7" />
          <path d="M174 99 Q250 114 326 99 M195 77 Q250 91 305 77 M216 53 Q250 63 284 53" stroke="#c8ab83" strokeWidth="1.1" fill="none" />
          <path d="M250 16 Q237 62 178 101 M250 16 Q265 66 322 101" stroke="#cdb594" strokeWidth=".9" fill="none" />
          <path d="M169 104 Q251 121 331 104" stroke="#ac8c65" strokeWidth="2" fill="none" />
          <circle cx="204" cy="109" r="2" fill="#9a675b" />
          <circle cx="295" cy="109" r="2" fill="#9a675b" />
        </g>
      )}
      {has('non_quai_thao') && (
        <g id="non-quai-thao">
          {/* ribbons hang from *under* the brim, not mid-air */}
          <path d="M173 88 C170 155 181 237 169 310 C165 335 179 351 168 383" stroke="#77967c" strokeWidth="6" fill="none" />
          <path d="M327 88 C330 155 320 242 331 310 C337 342 323 362 335 388" stroke="#ba7d83" strokeWidth="6" fill="none" />
          <path d="M168 384 L160 393 L176 394Z" fill="#77967c" />
          <path d="M335 388 L329 399 L343 395Z" fill="#ba7d83" />
          {/* brim and bamboo concentric strokes */}
          <ellipse cx="250" cy="83" rx="105" ry="21" fill={uid('hat')} stroke="#9d886d" strokeWidth="2" />
          <ellipse cx="250" cy="82" rx="83" ry="15" fill="none" stroke="#d3bd9e" strokeWidth="1" />
          <ellipse cx="250" cy="81" rx="51" ry="9" fill="none" stroke="#d0b995" strokeWidth="1" />
          <ellipse cx="250" cy="80" rx="15" ry="4" fill="#cfb48b" />
          <path d="M147 85 Q250 110 353 85" stroke="#998066" strokeOpacity=".6" strokeWidth="1.2" />
          <circle cx="173" cy="89" r="3" fill="#af8674" />
          <circle cx="327" cy="89" r="3" fill="#af8674" />
        </g>
      )}
      {has('kieng_bac') && (
        <g id="kieng-bac">
          <path d="M230 208 Q250 227 270 208" fill="none" stroke="#f8f4ee" strokeWidth="5" />
          <path d="M230 208 Q250 227 270 208" fill="none" stroke="#a3a7aa" strokeWidth="2.2" />
          <circle cx="250" cy="219" r="3.2" fill="#e6d6bc" stroke="#9e998f" strokeWidth="1" />
        </g>
      )}
      {has('tui_gam') && (
        <g id="tui-gam">
          <path d="M216 229 C208 293 198 352 187 397" stroke="#b48e52" strokeWidth="2.6" fill="none" />
          <path d="M171 386 Q187 381 203 386 Q209 406 202 428 Q185 437 169 426 Q164 409 171 386Z" fill="#96515d" stroke="#6d3f4a" strokeWidth="1.4" />
          <path d="M172 394 Q188 397 202 392" stroke="#dfba78" strokeWidth="1.2" fill="none" />
          <path d="M184 399 Q190 390 194 401 Q201 412 188 420 Q177 412 184 399Z" stroke="#e6c58f" strokeWidth="1" fill="none" />
          <path d="M181 409 Q188 403 195 409" stroke="#e6c58f" strokeWidth="1" fill="none" />
          <path d="M185 433 L184 440 M190 433 L191 440" stroke="#bb9250" strokeWidth="1.5" />
        </g>
      )}
      {has('quat_xep') && (
        <g id="quat-xep">
          {/* Open folded fan attached to the right hand at wrist/handle (x327,382) */}
          <path d="M324 382 Q336 343 382 320 C404 347 407 374 400 394Z" fill="#f7e8d7" stroke="#8e5960" strokeWidth="1.7" />
          <path d="M324 382 L390 326 M324 382 L399 344 M324 382 L403 366 M324 382 L401 386" stroke="#bc9873" strokeWidth="1.1" />
          <path d="M336 366 Q361 352 391 350" stroke="#d5ad9a" strokeWidth="1.4" fill="none" />
          <g stroke="#b96779" opacity=".65" strokeWidth="1.1" fill="none"><path d="M373 351 Q374 338 382 341 Q383 350 373 351Z" /><path d="M376 351 Q384 343 390 351 Q384 358 376 351Z" /></g>
          <path d="M324 382 Q318 397 323 410" stroke="#a6646c" strokeWidth="1.5" />
          <circle cx="323" cy="411" r="2" fill={gold} />
          {/* thumb holding the fan handle */}
          <path d="M321 379 Q325 376 329 381" fill="none" stroke="#a56f62" strokeWidth="2.3" />
        </g>
      )}
    </g>
  );
};

export const OutfitCanvas: React.FC<OutfitCanvasProps> = ({ outfit, showDetails = true }) => {
  const garment = GARMENTS_DATA[outfit.garmentType] || GARMENTS_DATA.ao_dai;
  const color = useMemo(() => COLOR_PALETTE.find(c => c.id === outfit.primaryColor) || COLOR_PALETTE[0], [outfit.primaryColor]);
  const id = useId().replace(/:/g, '');
  const uid = (name: string) => `url(#${id}-${name})`;
  const has = (acc: AccessoryId) => outfit.accessories.includes(acc);
  const baseCloth = color.hex;
  const cloth = uid('watercolor-fabric');
  const shadow = shade(baseCloth, -.23);
  const dark = shade(baseCloth, -.39);
  const light = shade(baseCloth, .40);
  const gold = '#c79e62';
  const lining = outfit.secondaryColor ? COLOR_PALETTE.find(c => c.id === outfit.secondaryColor)?.hex || '#fbf8f1' : '#fbf8f1';
  const props = { outfit, cloth, shadow, dark, light, gold, lining, uid };

  return (
    <div className="relative w-full aspect-[3/4] max-h-[640px] overflow-hidden rounded-3xl border border-[#e4d5c8] bg-[#f6efe8] shadow-[0_16px_50px_rgba(69,47,48,0.08)] select-none">
      {/* Warm sketchbook paper, faint frame and softer editorial presentation */}
      <div className="absolute inset-3 rounded-[1.15rem] border border-[#bc9d7e]/25 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#fdfaf4] to-transparent pointer-events-none" />
      <svg viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg" className="relative w-full h-full" role="img" aria-label={`Minh họa Việt phục ${garment.name} màu ${color.name}`}>
        <defs>
          {/* Gradual textile wash rather than one flat polygon fill. */}
          <linearGradient id={`${id}-watercolor-fabric`} x1="0" y1="0" x2=".9" y2="1">
            <stop offset="0" stopColor={light} />
            <stop offset=".27" stopColor={baseCloth} />
            <stop offset=".65" stopColor={baseCloth} />
            <stop offset="1" stopColor={dark} stopOpacity=".94" />
          </linearGradient>
          <linearGradient id={`${id}-hair`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#21191d" /><stop offset=".45" stopColor="#4c3837" /><stop offset="1" stopColor="#261d22" />
          </linearGradient>
          <linearGradient id={`${id}-skin`} x1=".15" y1="0" x2=".85" y2="1">
            <stop stopColor="#ffe9d8" /><stop offset=".65" stopColor="#f3d0bc" /><stop offset="1" stopColor="#e9baa9" />
          </linearGradient>
          <linearGradient id={`${id}-neck`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f9dbc9" /><stop offset="1" stopColor="#e8b8a4" />
          </linearGradient>
          <radialGradient id={`${id}-blush`}><stop stopColor="#db7884" stopOpacity=".46"/><stop offset="1" stopColor="#db7884" stopOpacity="0"/></radialGradient>
          <linearGradient id={`${id}-hat`} x1="0" y1="0" x2=".9" y2="1">
            <stop stopColor="#fffaed"/><stop offset=".6" stopColor="#f1e6ce"/><stop offset="1" stopColor="#dcc9a9"/>
          </linearGradient>
          <pattern id={`${id}-paper`} patternUnits="userSpaceOnUse" width="42" height="42">
            <circle cx="21" cy="21" r=".7" fill="#bb977c" opacity=".16" />
          </pattern>
          <radialGradient id={`${id}-halo`}>
            <stop stopColor={color.accentHex} stopOpacity=".17" /><stop offset="1" stopColor={color.accentHex} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="500" height="700" fill={`url(#${id}-paper)`} />
        <ellipse cx="250" cy="280" rx="180" ry="260" fill={uid('halo')} />
        <ellipse cx="250" cy="655" rx="89" ry="8" fill="#72574e" opacity=".16" />
        {/* Ink-stroked figure shares exact anatomy across garment switches. */}
        <Portrait uid={uid} outfit={outfit} />
        <Outlines {...props} />
        <Accessories {...props} has={has} />
        <text x="34" y="44" fill="#8D5862" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic" opacity=".75">{OCCASIONS_LIST.find(o => o.id === outfit.occasion)?.name}</text>
        <text x="34" y="64" fill="#957D72" fontSize="10" fontFamily="Georgia, serif" opacity=".76">{STYLES_LIST.find(st => st.id === outfit.style)?.name}</text>
      </svg>
      {showDetails && (
        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex flex-wrap items-end justify-between gap-2">
          <div className="rounded-2xl border border-white/80 bg-[#fffaf3]/90 px-3 py-2 shadow-sm backdrop-blur-sm">
            <div className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#88746a]">NẾP atelier</div>
            <div className="font-serif text-sm font-semibold text-[#5b2935]">{garment.name}</div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/80 bg-[#fffaf3]/90 px-3 py-2 shadow-sm backdrop-blur-sm">
            <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: baseCloth }} />
            <span className="font-serif text-[11px] text-[#624f48]">{color.vietnameseName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

function shade(hex: string, amount: number): string {
  const base = hex.replace('#', '');
  if (!/^[a-f\d]{6}$/i.test(base)) return hex;
  const chan = (pos: number) => parseInt(base.slice(pos, pos + 2), 16);
  const mix = (v: number) => amount >= 0 ? v + (255 - v) * amount : v * (1 + amount);
  return '#' + [chan(0), chan(2), chan(4)]
    .map(v => Math.max(0, Math.min(255, Math.round(mix(v)))).toString(16).padStart(2, '0'))
    .join('');
}
