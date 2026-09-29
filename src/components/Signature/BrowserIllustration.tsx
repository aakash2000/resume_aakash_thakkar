import type { CSSProperties, ReactNode } from 'react'
import { EASE } from '../../lib/motion'

const N5 = 'var(--color-neutral-500)'
const N6 = 'var(--color-neutral-600)'
const N7 = 'var(--color-neutral-700)'
const N8 = 'var(--color-neutral-800)'
const N9 = 'var(--color-neutral-900)'

/** Transforms relative to the element's own box (for pop/scale animations). */
const OWN_BOX: CSSProperties = { transformBox: 'fill-box', transformOrigin: 'center' }

const CARD_W = 58
const CARD_H = 50
const CARD_SLOTS: [number, number][] = [
  [62, 82],
  [124, 82],
  [186, 82],
  [62, 140],
  [124, 140],
]
/** Where the dragged "pallet status" card lands. */
const DROP_X = 186
const DROP_Y = 140

/** Contents of the five dashboard cards: bars, donut, text lines, toggles, sparkline. */
function CardContent({ index, x, y }: { index: number; x: number; y: number }): ReactNode {
  switch (index) {
    case 0:
      return [10, 16, 12, 22].map((h, i) => (
        <rect
          key={i}
          x={x + 9 + i * 10}
          y={y + 43 - h}
          width={6}
          height={h}
          rx={1}
          style={{ fill: i === 3 ? 'var(--color-accent-500)' : N6 }}
        />
      ))
    case 1:
      return (
        <>
          <circle cx={x + 29} cy={y + 29} r={11} style={{ fill: 'none', stroke: N7, strokeWidth: 3 }} />
          <circle
            cx={x + 29}
            cy={y + 29}
            r={11}
            transform={`rotate(-90 ${x + 29} ${y + 29})`}
            style={{
              fill: 'none',
              stroke: 'var(--color-accent-500)',
              strokeWidth: 3,
              strokeDasharray: '46 70',
              strokeLinecap: 'round',
            }}
          />
        </>
      )
    case 2:
      return [40, 30, 36].map((w, i) => (
        <rect key={i} x={x + 8} y={y + 20 + i * 8} width={w} height={3.5} rx={1.75} style={{ fill: N6 }} />
      ))
    case 3:
      return (
        <>
          <rect x={x + 8} y={y + 20} width={18} height={9} rx={4.5} style={{ fill: 'var(--color-accent-700)', stroke: 'var(--color-accent-500)' }} />
          <circle cx={x + 21.5} cy={y + 24.5} r={3} style={{ fill: 'var(--color-accent-200)' }} />
          <rect x={x + 8} y={y + 33} width={18} height={9} rx={4.5} style={{ fill: N9, stroke: N6 }} />
          <circle cx={x + 12.5} cy={y + 37.5} r={3} style={{ fill: N5 }} />
        </>
      )
    default:
      return (
        <>
          <rect x={x + 8} y={y + 16} width={42} height={27} rx={3} style={{ fill: N9 }} />
          <polyline
            points={[x + 10, y + 40, x + 22, y + 28, x + 30, y + 35, x + 36, y + 30, x + 48, y + 40].join(' ')}
            style={{ fill: 'none', stroke: N6, strokeLinejoin: 'round' }}
          />
        </>
      )
  }
}

/** Platform signature: a browser-based editor where a "pallet status" widget is dragged into place. */
export function BrowserIllustration({ animate }: { animate: boolean }) {
  const anim = (name: string, duration: number, delay: number, base: CSSProperties = {}): CSSProperties =>
    animate ? { ...base, animation: `${name} ${duration}ms ${EASE} ${delay}ms both` } : base

  return (
    <svg viewBox="0 0 260 220" width={280} height={237} style={{ overflow: 'visible', display: 'block' }}>
      {/* Window */}
      <rect x={6} y={16} width={248} height={188} rx={8} style={anim('webFade', 500, 700, { fill: 'var(--color-surface)' })} />
      <path d="M6,34 H52 V204 H14 A8,8 0 0 1 6,196 Z" style={anim('webFade', 400, 1100, { fill: N9 })} />
      <line x1={52} y1={34} x2={52} y2={204} style={anim('webFade', 400, 1100, { stroke: N7 })} />
      <line x1={6} y1={34} x2={254} y2={34} style={anim('webFade', 400, 800, { stroke: N7 })} />
      <rect
        x={6}
        y={16}
        width={248}
        height={188}
        rx={8}
        pathLength={1}
        style={anim('webDraw', 900, 150, { fill: 'none', stroke: N6, strokeDasharray: 1 })}
      />
      {[18, 28, 38].map((cx, i) => (
        <circle key={cx} cx={cx} cy={25} r={2.6} style={anim('webPop', 300, 850 + i * 60, { fill: N6, ...OWN_BOX })} />
      ))}
      <rect
        x={54}
        y={20.5}
        width={130}
        height={9}
        rx={4.5}
        style={anim('webGrow', 500, 950, { fill: N9, stroke: N7, transformBox: 'fill-box', transformOrigin: 'left' })}
      />

      {/* Sidebar navigation, second item active */}
      {[0, 1, 2, 3, 4].map((i) => {
        const active = i === 1
        return (
          <g key={i} style={anim('webFadeUp', 350, 1200 + i * 60)}>
            {active && <rect x={8} y={45 + i * 14} width={2} height={7} rx={1} style={{ fill: 'var(--color-accent)' }} />}
            <rect
              x={14}
              y={46 + i * 14}
              width={active ? 30 : 24}
              height={5}
              rx={2.5}
              style={{ fill: active ? 'var(--color-accent-600)' : N7 }}
            />
          </g>
        )
      })}

      {/* Page header */}
      <g style={anim('webFadeUp', 450, 1400)}>
        <rect x={62} y={44} width={182} height={30} rx={5} style={{ fill: N8 }} />
        <rect x={70} y={52} width={70} height={5} rx={2.5} style={{ fill: N5 }} />
        <rect x={70} y={62} width={104} height={4} rx={2} style={{ fill: N7 }} />
        <rect x={206} y={53} width={30} height={12} rx={6} style={{ fill: 'none', stroke: 'var(--color-accent-500)' }} />
      </g>

      {/* Widget cards */}
      {CARD_SLOTS.map(([x, y], i) => (
        <g key={i} style={anim('webFadeUp', 450, 1550 + i * 90)}>
          <rect x={x} y={y} width={CARD_W} height={CARD_H} rx={4} style={{ fill: N8, stroke: N7 }} />
          <rect x={x + 8} y={y + 8} width={22} height={3.5} rx={1.75} style={{ fill: N5 }} />
          <CardContent index={i} x={x} y={y} />
        </g>
      ))}

      {/* Empty drop slot */}
      <rect
        x={DROP_X}
        y={DROP_Y}
        width={CARD_W}
        height={CARD_H}
        rx={4}
        style={{
          fill: 'none',
          stroke: N6,
          strokeDasharray: '3 3',
          ...(animate
            ? { animation: 'webFade 300ms ease 2000ms both, webFadeOut 300ms ease 3250ms forwards' }
            : { opacity: 0 }),
        }}
      />

      {/* Dragged pallet-status card with cursor */}
      <g style={animate ? { animation: 'webDrag 1300ms cubic-bezier(.5,0,.2,1) 2050ms both' } : undefined}>
        <rect
          x={DROP_X}
          y={DROP_Y}
          width={CARD_W}
          height={CARD_H}
          rx={4}
          style={{ fill: 'var(--color-accent-900)', stroke: 'var(--color-accent-500)' }}
        />
        <rect x={DROP_X + 8} y={DROP_Y + 8} width={22} height={3.5} rx={1.75} style={{ fill: 'var(--color-accent-300)' }} />
        {[0, 1].flatMap((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}${c}`}
              x={DROP_X + 9 + c * 14}
              y={DROP_Y + 18 + r * 12}
              width={12}
              height={10}
              rx={1.5}
              style={{
                fill: r === 0 && c < 2 ? 'var(--color-accent-600)' : 'var(--color-accent-800)',
                stroke: 'var(--color-accent-400)',
                strokeWidth: 0.8,
              }}
            />
          )),
        )}
        <g style={animate ? { animation: 'webFadeOut 300ms ease 3600ms forwards' } : { display: 'none' }}>
          <polygon
            points={[
              DROP_X + 36, DROP_Y + 30, DROP_X + 36, DROP_Y + 44, DROP_X + 39.5, DROP_Y + 40.6, DROP_X + 42, DROP_Y + 46,
              DROP_X + 44.2, DROP_Y + 45, DROP_X + 41.8, DROP_Y + 39.8, DROP_X + 46.5, DROP_Y + 39.8,
            ].join(' ')}
            style={{ fill: 'var(--color-neutral-100)', stroke: 'var(--color-bg)', strokeWidth: 1, strokeLinejoin: 'round' }}
          />
        </g>
      </g>

      {animate && (
        <rect
          x={DROP_X - 3}
          y={DROP_Y - 3}
          width={64}
          height={56}
          rx={6}
          style={{ fill: 'none', stroke: 'var(--color-accent-400)', animation: 'webPing 700ms ease-out 3300ms both', ...OWN_BOX }}
        />
      )}
    </svg>
  )
}
