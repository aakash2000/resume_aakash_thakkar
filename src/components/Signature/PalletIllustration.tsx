import type { CSSProperties } from 'react'
import { EASE } from '../../lib/motion'

/* Isometric projection */
const CELL = 26
const COS30 = 0.866
const SIN30 = 0.5
const LAYER_HEIGHT = 19
const BASE_HEIGHT = 9
const GRID = 3
const LAYERS = 4
const GAP = 0.06

type Point = [x: number, y: number, z: number]

const project = ([x, y, z]: Point) =>
  `${((x - y) * CELL * COS30).toFixed(1)},${((x + y) * CELL * SIN30 - z).toFixed(1)}`

interface Faces {
  top: string
  left: string
  right: string
}

function cuboid(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): Faces {
  const poly = (...pts: Point[]) => pts.map(project).join(' ')
  return {
    top: poly([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]),
    right: poly([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]),
    left: poly([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]),
  }
}

interface Palette {
  top: string
  left: string
  right: string
  stroke: string
}

const PALETTES = {
  base: {
    top: 'var(--color-neutral-900)',
    left: 'var(--color-bg)',
    right: 'var(--color-bg)',
    stroke: 'var(--color-neutral-700)',
  },
  box: {
    top: 'var(--color-neutral-800)',
    left: 'var(--color-surface)',
    right: 'var(--color-neutral-900)',
    stroke: 'var(--color-neutral-600)',
  },
  topLayer: {
    top: 'var(--color-accent-800)',
    left: 'var(--color-accent-900)',
    right: 'var(--color-bg)',
    stroke: 'var(--color-accent-500)',
  },
  steel: {
    top: 'var(--color-neutral-700)',
    left: 'var(--color-neutral-800)',
    right: 'var(--color-neutral-900)',
    stroke: 'var(--color-neutral-500)',
  },
} satisfies Record<string, Palette>

function Box({ faces, palette, style }: { faces: Faces; palette: Palette; style?: CSSProperties }) {
  const face = (fill: string): CSSProperties => ({
    fill,
    stroke: palette.stroke,
    strokeWidth: 0.8,
    strokeLinejoin: 'round',
  })
  return (
    <g style={style}>
      <polygon points={faces.left} style={face(palette.left)} />
      <polygon points={faces.right} style={face(palette.right)} />
      <polygon points={faces.top} style={face(palette.top)} />
    </g>
  )
}

interface BoxSpec {
  key: string
  faces: Faces
  palette: Palette
  layer: number
  i: number
  j: number
}

/** All boxes back to front, so later ones paint over earlier ones. */
function buildBoxes(): BoxSpec[] {
  const boxes: BoxSpec[] = []
  for (let layer = 0; layer < LAYERS; layer++) {
    const cells: [number, number][] = []
    for (let i = 0; i < GRID; i++) for (let j = 0; j < GRID; j++) cells.push([i, j])
    cells.sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
    for (const [i, j] of cells) {
      const z0 = BASE_HEIGHT + layer * LAYER_HEIGHT
      const z1 = z0 + LAYER_HEIGHT - 1.5
      boxes.push({
        key: `b${layer}${i}${j}`,
        faces: cuboid(i + GAP, j + GAP, z0, i + 1 - GAP, j + 1 - GAP, z1),
        palette: layer === LAYERS - 1 ? PALETTES.topLayer : PALETTES.box,
        layer,
        i,
        j,
      })
    }
  }
  return boxes
}

const BOXES = buildBoxes()
/** The front-most box of the top layer is the one the gripper places last. */
const PLACED_BOX = BOXES[BOXES.length - 1]
const STACKED_BOXES = BOXES.slice(0, -1)

const TOP_Z = BASE_HEIGHT + (LAYERS - 1) * LAYER_HEIGHT + LAYER_HEIGHT - 1.5
const GRIP_Z = TOP_Z + 0.5
const GRIP_Y = (2 * GRID - 1) * CELL * SIN30 - (GRIP_Z + 3)

/** Time until the last animation (gripper retract) ends. */
export const PALLET_RUN_MS = 2750 + 600

const animation = (animate: boolean, value: string): CSSProperties | undefined =>
  animate ? { animation: value } : undefined

/** Robotics signature: boxes stacked layer by layer, the last one set down by a gripper. */
export function PalletIllustration({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="-82 -120 164 212" width={260} height={336} style={{ overflow: 'visible', display: 'block' }}>
      <Box faces={cuboid(-0.1, -0.1, 0, GRID + 0.1, GRID + 0.1, BASE_HEIGHT)} palette={PALETTES.base} />
      {STACKED_BOXES.map(({ key, faces, palette, layer, i, j }) => (
        <Box
          key={key}
          faces={faces}
          palette={palette}
          style={animation(
            animate,
            `palletDrop 420ms ${EASE} ${300 + layer * 380 + (i + j) * 55 + j * 18}ms both`,
          )}
        />
      ))}
      <g style={animation(animate, 'palletPlace 850ms cubic-bezier(.45,0,.2,1) 1850ms both')}>
        <Box faces={PLACED_BOX.faces} palette={PLACED_BOX.palette} />
        <g style={animate ? { animation: `gripRetract 600ms ${EASE} 2750ms both` } : { display: 'none' }}>
          <line x1={0} y1={GRIP_Y} x2={0} y2={GRIP_Y - 80} style={{ stroke: 'var(--color-neutral-500)', strokeWidth: 1.4 }} />
          <Box
            faces={cuboid(GRID - 0.75, GRID - 0.75, GRIP_Z, GRID - 0.25, GRID - 0.25, GRIP_Z + 3)}
            palette={PALETTES.steel}
          />
        </g>
      </g>
    </svg>
  )
}
