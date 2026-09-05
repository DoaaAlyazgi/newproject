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
};

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
};

interface Props {
  art: ArtKind;
  tone: MetalTone;
  /** Optional ribbon colour token for medals. */
  ribbon?: string | null;
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

export default function ProductArt({ art, tone, ribbon, className = '' }: Props) {
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
