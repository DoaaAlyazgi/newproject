import { useId } from 'react';
import type { ArtKind, MetalTone } from '../lib/types';

/**
 * Vector product artwork.
 *
 * The official Global Medal product photography could not be bundled into this
 * prototype, so rather than dressing the concept in unrelated stock imagery,
 * each catalogue item is drawn as a purpose-built illustration in the correct
 * silhouette (medal, cup, crystal, dhow) and metal tone. When the prototype is
 * connected to the real catalogue, swap this component for an <img> bound to
 * `product.image` — nothing else needs to change.
 */

const TONES: Record<MetalTone, { a: string; b: string; c: string; rim: string }> = {
  gold: { a: '#F3DEA8', b: '#C79A45', c: '#8A6425', rim: '#6E4E1B' },
  silver: { a: '#F1F0EC', b: '#C3C2BD', c: '#8E8D88', rim: '#75746F' },
  bronze: { a: '#EFCFA9', b: '#BE8354', c: '#8A5A32', rim: '#6C4626' },
  crystal: { a: '#F4F9FC', b: '#C9D9E2', c: '#8FA7B4', rim: '#6C8896' },
  wood: { a: '#E4C79C', b: '#B98A56', c: '#7E5B32', rim: '#5F4322' },
  resin: { a: '#E9E7E1', b: '#B9B5AB', c: '#87837A', rim: '#6A665E' },
};

/** Warm timber for plaque bodies, so the gold plate reads as a separate material. */
const TIMBER = { light: '#8B5E3C', mid: '#6B4426', dark: '#4A2E19', edge: '#331F10' };

/**
 * Each silhouette occupies a different height, so every art kind gets its own
 * frame. Without this the shorter pieces (cups) float in a tall box with dead
 * space under them, which reads as a broken image rather than a product shot.
 */
const FRAME: Record<ArtKind, { h: number; shadowY: number; shadowR: number; dy?: number }> = {
  medal: { h: 206, shadowY: 199, shadowR: 46 },
  'medal-mini': { h: 200, shadowY: 194, shadowR: 40 },
  'medal-sport': { h: 206, shadowY: 199, shadowR: 46 },
  cup: { h: 172, shadowY: 163, shadowR: 44 },
  'cup-tall': { h: 170, shadowY: 161, shadowR: 44 },
  'cup-set': { h: 164, shadowY: 156, shadowR: 72 },
  'crystal-cube': { h: 208, shadowY: 201, shadowR: 54 },
  'crystal-star': { h: 208, shadowY: 203, shadowR: 48 },
  'crystal-ball': { h: 186, shadowY: 180, shadowR: 52, dy: -14 },
  dhow: { h: 218, shadowY: 211, shadowR: 54 },
  'replica-cup': { h: 186, shadowY: 180, shadowR: 40, dy: -20 },
  'replica-mini': { h: 196, shadowY: 189, shadowR: 46 },
  'resin-figure': { h: 200, shadowY: 193, shadowR: 50 },
  'ball-column': { h: 212, shadowY: 205, shadowR: 44 },
  plaque: { h: 210, shadowY: 203, shadowR: 62 },
  'plaque-shield': { h: 210, shadowY: 203, shadowR: 56 },
  'plaque-round': { h: 200, shadowY: 193, shadowR: 52 },
  'plaque-box': { h: 196, shadowY: 189, shadowR: 62 },
  bobblehead: { h: 204, shadowY: 197, shadowR: 44 },
  'kuwait-tower': { h: 220, shadowY: 213, shadowR: 48 },
};

interface Props {
  art: ArtKind;
  tone: MetalTone;
  /** Optional ribbon colour token for medals. */
  ribbon?: string | null;
  /** Product id, so figurative artwork can differ piece to piece. */
  variant?: string;
  className?: string;
}

const RIBBON_HEX: Record<string, string> = {
  blue: '#1F4E8C',
  black: '#22201D',
  red: '#A32A2A',
  white: '#EFEDE7',
  orange: '#CE6C1E',
  green: '#1F6B45',
  kuwaitFlag: '#1F6B45',
};

export default function ProductArt({ art, tone, ribbon, variant, className = '' }: Props) {
  const uid = useId().replace(/:/g, '');
  const t = TONES[tone];
  const g = `g-${uid}`;
  const gs = `gs-${uid}`;

  const ribbonHex = ribbon ? RIBBON_HEX[ribbon] ?? '#1F4E8C' : '#1F4E8C';
  const isKuwait = ribbon === 'kuwaitFlag';
  const frame = FRAME[art];

  return (
    <svg
      viewBox={`0 0 200 ${frame.h}`}
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.a} />
          <stop offset="45%" stopColor={t.b} />
          <stop offset="100%" stopColor={t.c} />
        </linearGradient>
        <linearGradient id={gs} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={t.a} stopOpacity="0.95" />
          <stop offset="100%" stopColor={t.c} stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id={`sh-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#14110E" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#14110E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* grounding shadow — keeps every silhouette sitting on the same plane */}
      <ellipse
        cx="100"
        cy={frame.shadowY}
        rx={frame.shadowR}
        ry={frame.shadowR / 6}
        fill={`url(#sh-${uid})`}
      />

      <g transform={frame.dy ? `translate(0 ${frame.dy})` : undefined}>
      {art.startsWith('medal') && (
        <MedalArt
          uid={uid}
          g={g}
          gs={gs}
          tone={t}
          ribbonHex={ribbonHex}
          isKuwait={isKuwait}
          mini={art === 'medal-mini'}
          sport={art === 'medal-sport'}
        />
      )}
      {art === 'cup' && <CupArt g={g} gs={gs} tone={t} tall={false} />}
      {art === 'cup-tall' && <CupArt g={g} gs={gs} tone={t} tall />}
      {art === 'replica-cup' && <ReplicaArt g={g} tone={t} />}
      {art === 'cup-set' && <CupSetArt g={g} gs={gs} tone={t} />}
      {art === 'crystal-cube' && <CubeArt g={g} tone={t} />}
      {art === 'crystal-star' && <StarArt g={g} tone={t} />}
      {art === 'crystal-ball' && <BallArt g={g} gs={gs} tone={t} />}
      {art === 'dhow' && <DhowArt g={g} tone={t} />}
      {art === 'replica-mini' && <ReplicaMiniArt g={g} tone={t} crystalBase={tone === 'crystal'} />}
      {art === 'resin-figure' && <ResinFigureArt g={g} gs={gs} tone={t} />}
      {art === 'ball-column' && <BallColumnArt g={g} gs={gs} tone={t} />}
      {art === 'plaque' && <PlaqueArt g={g} tone={t} />}
      {art === 'plaque-shield' && <PlaqueShieldArt g={g} tone={t} />}
      {art === 'plaque-round' && <PlaqueRoundArt g={g} tone={t} />}
      {art === 'plaque-box' && <PlaqueBoxArt g={g} tone={t} />}
      {art === 'bobblehead' && <BobbleheadArt g={g} variant={variant} />}
      {art === 'kuwait-tower' && <KuwaitTowerArt g={g} gs={gs} tone={t} />}
      </g>
    </svg>
  );
}

/* --------------------------------- parts --------------------------------- */

function MedalArt({
  uid,
  g,
  gs,
  tone,
  ribbonHex,
  isKuwait,
  mini,
  sport,
}: {
  uid: string;
  g: string;
  gs: string;
  tone: { a: string; b: string; c: string; rim: string };
  ribbonHex: string;
  isKuwait: boolean;
  mini: boolean;
  sport: boolean;
}) {
  const r = mini ? 38 : 47;
  const cy = mini ? 152 : 148;
  return (
    <g>
      {/* ribbon */}
      <path
        d={`M78 18 L100 ${cy - r + 10} L122 18 Z`}
        fill={isKuwait ? '#1F6B45' : ribbonHex}
        opacity="0.95"
      />
      {isKuwait && (
        <>
          <path d={`M84 34 L100 ${cy - r + 6} L116 34 Z`} fill="#EFEDE7" />
          <path d={`M89 50 L100 ${cy - r + 4} L111 50 Z`} fill="#A32A2A" />
          <path d="M78 18 L100 46 L122 18 Z" fill="#22201D" opacity="0.9" />
        </>
      )}
      <path
        d={`M78 18 L100 ${cy - r + 10} L122 18 Z`}
        fill="#14110E"
        opacity="0.12"
        transform="translate(4,0)"
        clipPath="none"
      />
      <rect x="76" y="14" width="48" height="8" rx="3" fill={ribbonHex} opacity="0.75" />

      {/* medal body */}
      <circle cx="100" cy={cy} r={r} fill={`url(#${g})`} />
      <circle cx="100" cy={cy} r={r - 5} fill="none" stroke={tone.rim} strokeWidth="1.4" opacity="0.5" />
      <circle cx="100" cy={cy} r={r - 12} fill={`url(#${gs})`} opacity="0.85" />

      {/* woven rim ticks */}
      {!sport &&
        Array.from({ length: 36 }).map((_, i) => {
          const angle = (i / 36) * Math.PI * 2;
          const x1 = 100 + Math.cos(angle) * (r - 1.5);
          const y1 = cy + Math.sin(angle) * (r - 1.5);
          const x2 = 100 + Math.cos(angle) * (r - 5.5);
          const y2 = cy + Math.sin(angle) * (r - 5.5);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={tone.rim}
              strokeWidth="1"
              opacity="0.35"
            />
          );
        })}

      {/* centre motif */}
      {sport ? (
        <g>
          <circle cx="100" cy={cy} r={r - 20} fill="none" stroke={tone.rim} strokeWidth="1.6" opacity="0.55" />
          <path
            d={`M100 ${cy - 14} L104 ${cy - 4} L115 ${cy - 4} L106 ${cy + 3} L109 ${cy + 14} L100 ${cy + 7} L91 ${cy + 14} L94 ${cy + 3} L85 ${cy - 4} L96 ${cy - 4} Z`}
            fill={tone.rim}
            opacity="0.45"
          />
        </g>
      ) : (
        <g opacity="0.55">
          {[-1, 1].map((side) => (
            <g key={side}>
              <path
                d={`M100 ${cy + 15} C${100 + side * 13} ${cy + 12}, ${100 + side * 19} ${cy + 2}, ${100 + side * 17} ${cy - 12}`}
                fill="none"
                stroke={tone.rim}
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {[0, 1, 2, 3].map((k) => (
                <ellipse
                  key={k}
                  cx={100 + side * (13 + k * 1.6)}
                  cy={cy + 9 - k * 7}
                  rx="4.4"
                  ry="2.4"
                  fill={tone.rim}
                  transform={`rotate(${side * (38 - k * 12)} ${100 + side * (13 + k * 1.6)} ${cy + 9 - k * 7})`}
                />
              ))}
            </g>
          ))}
          <path
            d={`M100 ${cy - 20} L102.6 ${cy - 13.5} L109.5 ${cy - 13} L104.2 ${cy - 8.6} L106 ${cy - 2} L100 ${cy - 5.8} L94 ${cy - 2} L95.8 ${cy - 8.6} L90.5 ${cy - 13} L97.4 ${cy - 13.5} Z`}
            fill={tone.rim}
          />
        </g>
      )}

      {/* specular highlight */}
      <ellipse cx={100 - r * 0.34} cy={cy - r * 0.4} rx={r * 0.3} ry={r * 0.16} fill="#FFFFFF" opacity="0.4" transform={`rotate(-32 ${100 - r * 0.34} ${cy - r * 0.4})`} />
      <title>{uid}</title>
    </g>
  );
}

function CupArt({
  g,
  gs,
  tone,
  tall,
}: {
  g: string;
  gs: string;
  tone: { a: string; b: string; c: string; rim: string };
  tall: boolean;
}) {
  const top = tall ? 26 : 42;
  const bowlH = tall ? 84 : 70;
  return (
    <g>
      {tall && (
        <g>
          <circle cx="100" cy="20" r="9" fill={`url(#${g})`} />
          <path d="M91 20 L100 6 L109 20 Z" fill={`url(#${gs})`} />
        </g>
      )}
      {/* bowl */}
      <path
        d={`M68 ${top} L132 ${top} C132 ${top + bowlH - 10}, 118 ${top + bowlH}, 100 ${top + bowlH} C82 ${top + bowlH}, 68 ${top + bowlH - 10}, 68 ${top} Z`}
        fill={`url(#${g})`}
      />
      <path
        d={`M76 ${top + 6} L124 ${top + 6} C124 ${top + bowlH - 16}, 114 ${top + bowlH - 8}, 100 ${top + bowlH - 8} C86 ${top + bowlH - 8}, 76 ${top + bowlH - 16}, 76 ${top + 6} Z`}
        fill={`url(#${gs})`}
        opacity="0.55"
      />
      <ellipse cx="100" cy={top} rx="32" ry="7" fill={tone.a} opacity="0.9" />
      <ellipse cx="100" cy={top} rx="32" ry="7" fill="none" stroke={tone.rim} strokeWidth="1.2" opacity="0.5" />

      {/* handles */}
      <path
        d={`M68 ${top + 8} C50 ${top + 10}, 48 ${top + 42}, 70 ${top + 46}`}
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d={`M132 ${top + 8} C150 ${top + 10}, 152 ${top + 42}, 130 ${top + 46}`}
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* stem + base */}
      <rect x="94" y={top + bowlH} width="12" height="18" fill={`url(#${gs})`} />
      <path
        d={`M78 ${top + bowlH + 18} L122 ${top + bowlH + 18} L128 ${top + bowlH + 30} L72 ${top + bowlH + 30} Z`}
        fill={`url(#${g})`}
      />
      <rect x="68" y={top + bowlH + 30} width="64" height="14" rx="2" fill="#2B2620" />
      <rect x="74" y={top + bowlH + 34} width="52" height="6" rx="1" fill={tone.b} opacity="0.55" />
      <ellipse cx="86" cy={top + 18} rx="6" ry="14" fill="#FFFFFF" opacity="0.28" />
    </g>
  );
}

function CupSetArt({
  g,
  gs,
  tone,
}: {
  g: string;
  gs: string;
  tone: { a: string; b: string; c: string; rim: string };
}) {
  const cup = (x: number, scale: number, y: number, key: string) => (
    <g key={key} transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-26 0 L26 0 C26 44, 14 56, 0 56 C-14 56, -26 44, -26 0 Z" fill={`url(#${g})`} />
      <ellipse cx="0" cy="0" rx="26" ry="6" fill={tone.a} opacity="0.9" />
      <path d="M-26 6 C-42 8, -42 34, -24 38" fill="none" stroke={`url(#${g})`} strokeWidth="7" strokeLinecap="round" />
      <path d="M26 6 C42 8, 42 34, 24 38" fill="none" stroke={`url(#${g})`} strokeWidth="7" strokeLinecap="round" />
      <rect x="-6" y="56" width="12" height="14" fill={`url(#${gs})`} />
      <path d="M-20 70 L20 70 L26 82 L-26 82 Z" fill={`url(#${g})`} />
      <rect x="-28" y="82" width="56" height="12" rx="2" fill="#2B2620" />
    </g>
  );
  return (
    <g>
      {cup(44, 0.72, 82, 'a')}
      {cup(156, 0.72, 82, 'c')}
      {cup(100, 1, 56, 'b')}
    </g>
  );
}

function ReplicaArt({ g, tone }: { g: string; tone: { a: string; b: string; c: string; rim: string } }) {
  return (
    <g>
      {/* stylised world-cup silhouette: two rising arms cradling a globe */}
      {/* two arms with a real gap between them (evenodd hole), not a solid body */}
      <path
        fillRule="evenodd"
        d="M70 176 C64 140, 74 100, 92 72 C96 64, 104 64, 108 72 C126 100, 136 140, 130 176 Z
           M88 168 C84 138, 90 108, 100 86 C110 108, 116 138, 112 168 Z"
        fill={`url(#${g})`}
      />
      <path
        d="M70 176 C64 140, 74 100, 92 72"
        fill="none"
        stroke={tone.a}
        strokeWidth="3"
        opacity="0.5"
      />
      <circle cx="100" cy="64" r="20" fill={`url(#${g})`} />
      <circle cx="100" cy="64" r="20" fill="none" stroke={tone.rim} strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="100" cy="64" rx="20" ry="7" fill="none" stroke={tone.rim} strokeWidth="1" opacity="0.45" />
      <ellipse cx="100" cy="64" rx="8" ry="20" fill="none" stroke={tone.rim} strokeWidth="1" opacity="0.45" />
      <rect x="62" y="176" width="76" height="12" rx="2" fill="#2B2620" />
      <rect x="68" y="188" width="64" height="10" rx="2" fill="#3A342C" />
      <rect x="78" y="179" width="44" height="6" rx="1" fill={tone.b} opacity="0.6" />
      <ellipse cx="88" cy="110" rx="5" ry="26" fill="#FFFFFF" opacity="0.25" />
    </g>
  );
}

function CubeArt({
  g,
  tone,
}: {
  g: string;
  tone: { a: string; b: string; c: string; rim: string };
}) {
  return (
    <g>
      <path d="M58 60 L142 60 L142 176 L58 176 Z" fill={`url(#${g})`} />
      <path d="M58 60 L82 40 L166 40 L142 60 Z" fill={tone.a} />
      <path d="M142 60 L166 40 L166 156 L142 176 Z" fill={tone.c} opacity="0.55" />
      <path
        d="M58 60 L82 40 L166 40 L166 156 L142 176 L58 176 Z M58 60 L142 60 L142 176 M142 60 L166 40"
        fill="none"
        stroke={tone.rim}
        strokeWidth="1.4"
        strokeLinejoin="round"
        opacity="0.8"
      />
      {/* frosted engraving panel */}
      <rect x="72" y="80" width="56" height="70" rx="2" fill="#FFFFFF" opacity="0.42" />
      <rect
        x="72"
        y="80"
        width="56"
        height="70"
        rx="2"
        fill="none"
        stroke={tone.rim}
        strokeWidth="0.9"
        opacity="0.5"
      />
      {[0, 1, 2].map((k) => (
        <line
          key={k}
          x1={82}
          y1={104 + k * 14}
          x2={k === 1 ? 118 : 110}
          y2={104 + k * 14}
          stroke={tone.rim}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.4"
        />
      ))}
      <path d="M62 66 L84 66 L64 104 Z" fill="#FFFFFF" opacity="0.5" />
      <rect x="52" y="176" width="96" height="14" rx="2" fill="#2B2620" />
      <rect x="60" y="190" width="80" height="8" rx="2" fill="#3A342C" />
    </g>
  );
}

function StarArt({ g, tone }: { g: string; tone: { a: string; b: string; c: string; rim: string } }) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? 72 : 30;
    pts.push(`${100 + Math.cos(angle) * radius},${92 + Math.sin(angle) * radius}`);
  }
  return (
    <g>
      <polygon points={pts.join(' ')} fill={`url(#${g})`} opacity="0.95" />
      <polygon points={pts.join(' ')} fill="none" stroke={tone.rim} strokeWidth="1.1" opacity="0.55" />
      <polygon
        points={pts
          .filter((_, i) => i % 2 === 0)
          .join(' ')}
        fill="#FFFFFF"
        opacity="0.22"
      />
      <path d="M100 20 L116 82 L100 92 Z" fill="#FFFFFF" opacity="0.4" />
      <path d="M76 168 L124 168 L132 178 L68 178 Z" fill={`url(#${g})`} opacity="0.85" />
      <rect x="58" y="178" width="84" height="14" rx="2" fill="#2B2620" />
      <rect x="66" y="192" width="68" height="8" rx="2" fill="#3A342C" />
    </g>
  );
}

function BallArt({
  g,
  gs,
  tone,
}: {
  g: string;
  gs: string;
  tone: { a: string; b: string; c: string; rim: string };
}) {
  return (
    <g>
      <path d="M62 168 C58 130, 72 96, 100 74 C128 96, 142 130, 138 168 Z" fill={`url(#${gs})`} opacity="0.75" />
      <circle cx="100" cy="78" r="34" fill={`url(#${g})`} opacity="0.9" />
      <circle cx="100" cy="78" r="34" fill="none" stroke={tone.rim} strokeWidth="1.1" opacity="0.55" />
      <ellipse cx="100" cy="78" rx="34" ry="12" fill="none" stroke={tone.rim} strokeWidth="0.9" opacity="0.45" />
      <ellipse cx="100" cy="78" rx="13" ry="34" fill="none" stroke={tone.rim} strokeWidth="0.9" opacity="0.45" />
      <ellipse cx="88" cy="64" rx="10" ry="6" fill="#FFFFFF" opacity="0.5" transform="rotate(-30 88 64)" />
      <path d="M62 168 C58 130, 72 96, 100 74" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.35" />
      <rect x="54" y="168" width="92" height="14" rx="2" fill="#2B2620" />
      <rect x="62" y="182" width="76" height="9" rx="2" fill="#3A342C" />
    </g>
  );
}

type Tone = { a: string; b: string; c: string; rim: string };

/** The World Cup silhouette at desk scale, on a crystal or gold-banded base. */
function ReplicaMiniArt({
  g,
  tone,
  crystalBase,
}: {
  g: string;
  tone: Tone;
  crystalBase: boolean;
}) {
  return (
    <g>
      <path
        fillRule="evenodd"
        d="M78 140 C74 114, 80 84, 93 62 C96 56, 104 56, 107 62 C120 84, 126 114, 122 140 Z
           M92 134 C90 112, 94 90, 100 74 C106 90, 110 112, 108 134 Z"
        fill={`url(#${g})`}
      />
      <circle cx="100" cy="54" r="16" fill={`url(#${g})`} />
      <circle cx="100" cy="54" r="16" fill="none" stroke={tone.rim} strokeWidth="1" opacity="0.5" />
      <ellipse cx="100" cy="54" rx="16" ry="5.5" fill="none" stroke={tone.rim} strokeWidth="0.9" opacity="0.45" />
      <ellipse cx="100" cy="54" rx="6.5" ry="16" fill="none" stroke={tone.rim} strokeWidth="0.9" opacity="0.45" />
      <path d="M78 140 C74 114, 80 84, 93 62" fill="none" stroke={tone.a} strokeWidth="2.4" opacity="0.5" />

      {crystalBase ? (
        <>
          <path d="M70 142 L130 142 L136 176 L64 176 Z" fill="#DCE7EC" opacity="0.9" />
          <path d="M70 142 L130 142 L136 176 L64 176 Z" fill="none" stroke="#8FA7B4" strokeWidth="1.1" />
          <path d="M76 146 L92 146 L80 172 Z" fill="#FFFFFF" opacity="0.65" />
        </>
      ) : (
        <>
          <rect x="70" y="142" width="60" height="18" rx="2" fill="#1F6B45" />
          <rect x="70" y="142" width="60" height="6" rx="2" fill="#2E8A5C" />
          <rect x="64" y="160" width="72" height="16" rx="2" fill="#2B2620" />
        </>
      )}
      <rect x="60" y="176" width="80" height="10" rx="2" fill="#3A342C" />
    </g>
  );
}

/** Sculpted resin sport award: a star burst rising from a moulded block. */
function ResinFigureArt({ g, gs, tone }: { g: string; gs: string; tone: Tone }) {
  const star = (cx: number, cy: number, r: number, key: string) => {
    const pts: string[] = [];
    for (let i = 0; i < 10; i += 1) {
      const angle = (Math.PI / 5) * i - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * 0.42;
      pts.push(`${cx + Math.cos(angle) * rad},${cy + Math.sin(angle) * rad}`);
    }
    return <polygon key={key} points={pts.join(' ')} fill="#C79A45" stroke="#8A6425" strokeWidth="1" />;
  };
  return (
    <g>
      {/* moulded backing block */}
      <path
        d="M56 152 C52 108, 66 66, 100 48 C134 66, 148 108, 144 152 Z"
        fill={`url(#${g})`}
      />
      <path
        d="M68 150 C66 112, 78 80, 100 64 C122 80, 134 112, 132 150 Z"
        fill={`url(#${gs})`}
        opacity="0.5"
      />
      <path d="M56 152 C52 108, 66 66, 100 48" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.35" />
      {/* sculpted sphere — reads as a bowling ball or match ball */}
      <circle cx="100" cy="112" r="24" fill={tone.c} />
      <circle cx="100" cy="112" r="24" fill="none" stroke={tone.rim} strokeWidth="1.2" />
      <ellipse cx="91" cy="103" rx="7" ry="4.5" fill="#FFFFFF" opacity="0.4" transform="rotate(-30 91 103)" />
      <circle cx="95" cy="106" r="2.4" fill={tone.rim} opacity="0.75" />
      <circle cx="105" cy="105" r="2.4" fill={tone.rim} opacity="0.75" />
      <circle cx="100" cy="114" r="2.4" fill={tone.rim} opacity="0.75" />
      {star(100, 66, 16, 'a')}
      {star(72, 84, 10, 'b')}
      {star(128, 84, 10, 'c')}
      <rect x="52" y="152" width="96" height="16" rx="2" fill="#2B2620" />
      <rect x="60" y="156" width="80" height="8" rx="1" fill="#C79A45" opacity="0.55" />
      <rect x="46" y="168" width="108" height="12" rx="2" fill="#3A342C" />
    </g>
  );
}

/** A ball raised on a fluted column — the standard tournament trophy shape. */
function BallColumnArt({ g, gs, tone }: { g: string; gs: string; tone: Tone }) {
  return (
    <g>
      {/* ball */}
      <circle cx="100" cy="42" r="26" fill={`url(#${g})`} />
      <circle cx="100" cy="42" r="26" fill="none" stroke={tone.rim} strokeWidth="1.2" opacity="0.6" />
      <path
        d="M100 26 L112 35 L107 49 L93 49 L88 35 Z"
        fill={tone.rim}
        opacity="0.45"
      />
      {[0, 1, 2, 3, 4].map((k) => {
        const a = (Math.PI * 2 * k) / 5 - Math.PI / 2;
        return (
          <line
            key={k}
            x1={100 + Math.cos(a) * 13}
            y1={42 + Math.sin(a) * 13}
            x2={100 + Math.cos(a) * 25}
            y2={42 + Math.sin(a) * 25}
            stroke={tone.rim}
            strokeWidth="1.4"
            opacity="0.4"
          />
        );
      })}
      <ellipse cx="90" cy="32" rx="7" ry="4" fill="#FFFFFF" opacity="0.42" transform="rotate(-30 90 32)" />

      {/* column */}
      <path d="M86 68 L114 68 L110 156 L90 156 Z" fill={`url(#${g})`} />
      <path d="M94 68 L106 68 L104 156 L96 156 Z" fill={`url(#${gs})`} opacity="0.6" />
      {[-1, 1].map((side) => (
        <line
          key={side}
          x1={100 + side * 6}
          y1={72}
          x2={100 + side * 5}
          y2={152}
          stroke={tone.rim}
          strokeWidth="1"
          opacity="0.45"
        />
      ))}
      {/* wing stars either side of the column */}
      {[-1, 1].map((side) => (
        <path
          key={side}
          d={`M100 ${96} l${side * 22} -10 l${side * -2} 26 Z`}
          fill={`url(#${g})`}
          opacity="0.85"
        />
      ))}
      <rect x="80" y="156" width="40" height="8" rx="1.5" fill={tone.c} />
      <rect x="66" y="164" width="68" height="16" rx="2" fill="#2B2620" />
      <rect x="74" y="168" width="52" height="8" rx="1" fill={tone.b} opacity="0.55" />
      <rect x="58" y="180" width="84" height="10" rx="2" fill="#3A342C" />
    </g>
  );
}

/** Rectangular wooden plaque carrying a full mirror-finish plate. */
function PlaqueArt({ g, tone }: { g: string; tone: Tone }) {
  return (
    <g>
      <rect x="34" y="14" width="132" height="176" rx="5" fill={TIMBER.mid} />
      <rect x="34" y="14" width="132" height="176" rx="5" fill="none" stroke={TIMBER.edge} strokeWidth="2" />
      <rect x="34" y="14" width="132" height="12" rx="5" fill={TIMBER.light} opacity="0.5" />
      <rect x="34" y="178" width="132" height="12" fill={TIMBER.dark} opacity="0.55" />
      {/* full mirror plate */}
      <rect x="48" y="28" width="104" height="148" rx="3" fill={`url(#${g})`} />
      <rect x="48" y="28" width="104" height="148" rx="3" fill="none" stroke={tone.rim} strokeWidth="1.3" opacity="0.75" />
      <rect x="54" y="34" width="92" height="136" rx="2" fill="none" stroke={tone.rim} strokeWidth="0.9" opacity="0.4" />
      <circle cx="100" cy="58" r="13" fill="none" stroke={tone.rim} strokeWidth="1.6" opacity="0.55" />
      <path
        d="M100 50 l2.4 5.6 6 .4 -4.6 3.9 1.5 5.9 -5.3 -3.3 -5.3 3.3 1.5 -5.9 -4.6 -3.9 6 -.4 Z"
        fill={tone.rim}
        opacity="0.6"
      />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <line
          key={k}
          x1={k === 0 ? 74 : 62}
          y1={88 + k * 15}
          x2={k === 0 ? 126 : k === 5 ? 118 : 138}
          y2={88 + k * 15}
          stroke={tone.rim}
          strokeWidth={k === 0 ? 3.6 : 2}
          strokeLinecap="round"
          opacity={k === 0 ? 0.62 : 0.34}
        />
      ))}
      <path d="M52 32 L74 32 L56 84 Z" fill="#FFFFFF" opacity="0.32" />
    </g>
  );
}

/** Shield-shaped wooden plaque with an engraved gold plate. */
function PlaqueShieldArt({ g, tone }: { g: string; tone: Tone }) {
  return (
    <g>
      <path
        d="M40 18 L160 18 L160 150 C160 174, 132 190, 100 194 C68 190, 40 174, 40 150 Z"
        fill={TIMBER.mid}
      />
      <path
        d="M40 18 L160 18 L160 150 C160 174, 132 190, 100 194 C68 190, 40 174, 40 150 Z"
        fill="none"
        stroke={TIMBER.edge}
        strokeWidth="2"
      />
      <path d="M40 18 L160 18 L160 30 L40 30 Z" fill={TIMBER.light} opacity="0.55" />
      <path
        d="M54 32 L146 32 L146 148 C146 166, 124 178, 100 181 C76 178, 54 166, 54 148 Z"
        fill={`url(#${g})`}
      />
      <path
        d="M54 32 L146 32 L146 148 C146 166, 124 178, 100 181 C76 178, 54 166, 54 148 Z"
        fill="none"
        stroke={tone.rim}
        strokeWidth="1.2"
        opacity="0.75"
      />
      {/* laurel sprigs framing the citation */}
      {[-1, 1].map((side) => (
        <g key={side} opacity="0.45">
          <path
            d={`M100 ${150} C${100 + side * 20} ${146}, ${100 + side * 32} ${124}, ${100 + side * 30} ${96}`}
            fill="none"
            stroke={tone.rim}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {[0, 1, 2, 3].map((k) => (
            <ellipse
              key={k}
              cx={100 + side * (20 + k * 3)}
              cy={142 - k * 13}
              rx="5.6"
              ry="2.8"
              fill={tone.rim}
              transform={`rotate(${side * (46 - k * 13)} ${100 + side * (20 + k * 3)} ${142 - k * 13})`}
            />
          ))}
        </g>
      ))}
      <path
        d="M100 48 l3 7 7.4 .5 -5.7 4.8 1.9 7.3 -6.6 -4.1 -6.6 4.1 1.9 -7.3 -5.7 -4.8 7.4 -.5 Z"
        fill={tone.rim}
        opacity="0.6"
      />
      {[0, 1, 2].map((k) => (
        <line
          key={k}
          x1={k === 0 ? 76 : 70}
          y1={86 + k * 14}
          x2={k === 0 ? 124 : 130}
          y2={86 + k * 14}
          stroke={tone.rim}
          strokeWidth={k === 0 ? 3.4 : 2.1}
          strokeLinecap="round"
          opacity={k === 0 ? 0.6 : 0.36}
        />
      ))}
      <path d="M58 36 L78 36 L60 78 Z" fill="#FFFFFF" opacity="0.3" />
    </g>
  );
}

/** Circular wooden plaque with a laurel-framed centre. */
function PlaqueRoundArt({ g, tone }: { g: string; tone: Tone }) {
  return (
    <g>
      <circle cx="100" cy="98" r="82" fill={TIMBER.mid} />
      <circle cx="100" cy="98" r="82" fill="none" stroke={TIMBER.edge} strokeWidth="2" />
      <circle cx="100" cy="98" r="74" fill={TIMBER.light} opacity="0.35" />
      <circle cx="100" cy="98" r="62" fill={`url(#${g})`} />
      <circle cx="100" cy="98" r="62" fill="none" stroke={tone.rim} strokeWidth="1.2" opacity="0.7" />
      <circle cx="100" cy="98" r="50" fill="none" stroke={tone.rim} strokeWidth="1" opacity="0.4" />
      {/* laurel ring */}
      {[-1, 1].map((side) => (
        <g key={side} opacity="0.5">
          <path
            d={`M100 ${152} C${100 + side * 34} ${146}, ${100 + side * 50} ${120}, ${100 + side * 46} ${84}`}
            fill="none"
            stroke={tone.rim}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {[0, 1, 2, 3, 4].map((k) => (
            <ellipse
              key={k}
              cx={100 + side * (34 + k * 3)}
              cy={142 - k * 14}
              rx="7"
              ry="3.4"
              fill={tone.rim}
              transform={`rotate(${side * (52 - k * 14)} ${100 + side * (34 + k * 3)} ${142 - k * 14})`}
            />
          ))}
        </g>
      ))}
      <path
        d="M100 66 l4 9.6 10.4 .8 -8 6.7 2.6 10.1 -9 -5.6 -9 5.6 2.6 -10.1 -8 -6.7 10.4 -.8 Z"
        fill={tone.rim}
        opacity="0.6"
      />
      {[0, 1].map((k) => (
        <line
          key={k}
          x1={78}
          y1={108 + k * 14}
          x2={122}
          y2={108 + k * 14}
          stroke={tone.rim}
          strokeWidth={k === 0 ? 3 : 2}
          strokeLinecap="round"
          opacity={k === 0 ? 0.5 : 0.32}
        />
      ))}
      <path d="M52 74 L74 60 L58 112 Z" fill="#FFFFFF" opacity="0.22" />
    </g>
  );
}

/** Plaque presented open in a velvet-lined box. */
function PlaqueBoxArt({ g, tone }: { g: string; tone: Tone }) {
  return (
    <g>
      {/* lid, hinged open behind the box */}
      <path d="M44 100 L156 100 L146 40 L54 40 Z" fill={TIMBER.dark} />
      <path d="M44 100 L156 100 L146 40 L54 40 Z" fill="none" stroke={TIMBER.edge} strokeWidth="2" />
      <path d="M54 94 L146 94 L138 48 L62 48 Z" fill="#5E1F2A" />
      <path d="M62 90 L92 90 L74 52 Z" fill="#7A2B38" opacity="0.7" />
      {/* box body */}
      <rect x="30" y="106" width="140" height="66" rx="4" fill={TIMBER.mid} />
      <rect x="30" y="106" width="140" height="66" rx="4" fill="none" stroke={TIMBER.edge} strokeWidth="2" />
      {/* velvet lining */}
      <rect x="38" y="112" width="124" height="54" rx="3" fill="#5E1F2A" />
      <rect x="38" y="112" width="124" height="10" rx="3" fill="#7A2B38" opacity="0.8" />
      {/* plate resting in the lining */}
      <rect x="60" y="120" width="80" height="40" rx="2" fill={`url(#${g})`} />
      <rect x="60" y="120" width="80" height="40" rx="2" fill="none" stroke={tone.rim} strokeWidth="1.1" opacity="0.7" />
      {[0, 1, 2].map((k) => (
        <line
          key={k}
          x1={k === 0 ? 76 : 70}
          y1={130 + k * 10}
          x2={k === 0 ? 124 : 130}
          y2={130 + k * 10}
          stroke={tone.rim}
          strokeWidth={k === 0 ? 3 : 2}
          strokeLinecap="round"
          opacity={k === 0 ? 0.55 : 0.35}
        />
      ))}
      <path d="M62 124 L78 124 L64 152 Z" fill="#FFFFFF" opacity="0.28" />
      <rect x="36" y="172" width="128" height="8" rx="2" fill="#3A342C" />
    </g>
  );
}

/** The Kuwait Towers — main mast with two spheres, a smaller companion mast beside it. */
function KuwaitTowerArt({ g, gs, tone }: { g: string; gs: string; tone: Tone }) {
  return (
    <g>
      {/* companion mast, shorter and set behind */}
      <path d="M136 200 L140 90 L146 90 L150 200 Z" fill={tone.c} opacity="0.75" />
      <circle cx="143" cy="82" r="9" fill={tone.c} opacity="0.85" />

      {/* main mast */}
      <path d="M92 204 L97 60 L103 40 L109 60 L114 204 Z" fill={`url(#${g})`} />
      <path d="M97 204 L100 70 L103 204 Z" fill={`url(#${gs})`} opacity="0.6" />
      <path d="M92 204 L97 60 L103 40" fill="none" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.4" />

      {/* large sphere (restaurant deck) */}
      <circle cx="103" cy="120" r="26" fill={`url(#${g})`} />
      <circle cx="103" cy="120" r="26" fill="none" stroke={tone.rim} strokeWidth="1.1" opacity="0.6" />
      <ellipse cx="103" cy="120" rx="26" ry="8" fill="none" stroke={tone.rim} strokeWidth="0.8" opacity="0.4" />
      <ellipse cx="94" cy="110" rx="8" ry="4.5" fill="#FFFFFF" opacity="0.4" transform="rotate(-25 94 110)" />

      {/* small upper sphere (water tank) */}
      <circle cx="105" cy="66" r="12" fill={`url(#${g})`} />
      <circle cx="105" cy="66" r="12" fill="none" stroke={tone.rim} strokeWidth="1" opacity="0.55" />

      <rect x="70" y="204" width="66" height="10" rx="2" fill="#2B2620" />
      <rect x="60" y="214" width="86" height="8" rx="2" fill="#3A342C" />
    </g>
  );
}

/** Footballer bobblehead: oversized head, kit, ball, named base. */
const BOBBLE_KITS: Record<string, { kit: string; kitDark: string; skin: string; hair: string }> = {
  'ronaldo-bobblehead': { kit: '#B4322F', kitDark: '#8E2422', skin: '#D8A277', hair: '#2A1D14' },
  'messi-bobblehead': { kit: '#2C4C9B', kitDark: '#213A78', skin: '#D8A277', hair: '#3B2A1A' },
  'salah-bobblehead': { kit: '#A8202B', kitDark: '#7E161F', skin: '#A9714A', hair: '#1C130C' },
};

function BobbleheadArt({ g, variant }: { g: string; variant?: string }) {
  const { kit, kitDark, skin, hair } =
    BOBBLE_KITS[variant ?? ''] ?? BOBBLE_KITS['ronaldo-bobblehead'];
  return (
    <g>
      {/* base with name plate */}
      <rect x="52" y="150" width="96" height="30" rx="3" fill="#2B2620" />
      <rect x="62" y="158" width="76" height="14" rx="2" fill="#4A443B" />
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={70 + k * 13} y={163} width="9" height="4" rx="1" fill="#D9D4C8" opacity="0.85" />
      ))}
      <rect x="46" y="180" width="108" height="10" rx="2" fill="#3A342C" />

      {/* body */}
      <path d="M74 150 C74 122, 84 108, 100 108 C116 108, 126 122, 126 150 Z" fill={kit} />
      <path d="M92 108 L108 108 L104 130 L96 130 Z" fill="#FFFFFF" opacity="0.85" />
      <path d="M74 150 C74 134, 78 120, 86 112" fill="none" stroke={kitDark} strokeWidth="3" />
      {/* arms */}
      <path d="M76 122 C64 128, 60 140, 62 150" fill="none" stroke={kit} strokeWidth="11" strokeLinecap="round" />
      <path d="M124 122 C136 128, 140 140, 138 150" fill="none" stroke={kit} strokeWidth="11" strokeLinecap="round" />
      <circle cx="62" cy="150" r="5.5" fill={skin} />
      <circle cx="138" cy="150" r="5.5" fill={skin} />

      {/* ball held at the front */}
      <circle cx="100" cy="140" r="17" fill="#F2F0EA" />
      <circle cx="100" cy="140" r="17" fill="none" stroke="#7A756B" strokeWidth="1.1" />
      <path d="M100 131 l7 5 -2.6 8.3 h-8.8 L93 136 Z" fill="#2B2620" />
      {[0, 1, 2, 3, 4].map((k) => {
        const a = (Math.PI * 2 * k) / 5 - Math.PI / 2;
        return (
          <line
            key={k}
            x1={100 + Math.cos(a) * 8}
            y1={140 + Math.sin(a) * 8}
            x2={100 + Math.cos(a) * 16}
            y2={140 + Math.sin(a) * 16}
            stroke="#2B2620"
            strokeWidth="1.4"
          />
        );
      })}

      {/* oversized head */}
      <circle cx="100" cy="72" r="36" fill={skin} />
      <path d="M64 66 C66 40, 82 30, 100 30 C118 30, 134 40, 136 66 C126 52, 112 46, 100 46 C88 46, 74 52, 64 66 Z" fill={hair} />
      <circle cx="87" cy="72" r="3.6" fill={hair} />
      <circle cx="113" cy="72" r="3.6" fill={hair} />
      <path d="M88 88 C94 94, 106 94, 112 88" fill="none" stroke={hair} strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="86" cy="82" rx="5" ry="3" fill="#C9705C" opacity="0.45" />
      <ellipse cx="114" cy="82" rx="5" ry="3" fill="#C9705C" opacity="0.45" />
      <ellipse cx="86" cy="56" rx="9" ry="5" fill="#FFFFFF" opacity="0.22" />
      <rect x="90" y="104" width="20" height="8" rx="3" fill={`url(#${g})`} opacity="0.5" />
    </g>
  );
}

function DhowArt({ g, tone }: { g: string; tone: { a: string; b: string; c: string; rim: string } }) {
  return (
    <g>
      {/* sails */}
      <path d="M100 20 L100 150 L44 150 Z" fill={`url(#${g})`} opacity="0.95" />
      <path d="M108 52 L108 150 L152 150 Z" fill={`url(#${g})`} opacity="0.8" />
      <path d="M100 20 L100 150 L44 150 Z" fill="none" stroke={tone.rim} strokeWidth="1" opacity="0.5" />
      <path d="M108 52 L108 150 L152 150 Z" fill="none" stroke={tone.rim} strokeWidth="1" opacity="0.5" />
      <line x1="100" y1="20" x2="100" y2="152" stroke={tone.rim} strokeWidth="2.4" opacity="0.7" />
      <line x1="108" y1="52" x2="108" y2="152" stroke={tone.rim} strokeWidth="2" opacity="0.6" />
      {/* hull */}
      <path d="M34 152 L170 152 C160 176, 140 186, 100 186 C60 186, 42 176, 34 152 Z" fill={`url(#${g})`} />
      <path d="M46 158 L158 158 C150 172, 134 179, 100 179 C66 179, 54 172, 46 158 Z" fill={tone.c} opacity="0.35" />
      <rect x="52" y="186" width="96" height="14" rx="2" fill="#2B2620" />
      <rect x="60" y="200" width="80" height="8" rx="2" fill="#3A342C" />
      <path d="M62 46 L88 132 L52 132 Z" fill="#FFFFFF" opacity="0.22" />
    </g>
  );
}
