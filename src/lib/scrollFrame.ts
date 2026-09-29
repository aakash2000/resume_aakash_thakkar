type Listener = () => void

const listeners = new Set<Listener>()
let frame = 0

function schedule() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    listeners.forEach((listener) => listener())
  })
}

/**
 * Run `listener` at most once per animation frame after scroll or resize.
 * One shared window listener serves every subscriber.
 */
export function subscribeScrollFrame(listener: Listener): () => void {
  if (listeners.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  }
  listeners.add(listener)
  requestAnimationFrame(listener)

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }
}

export function scrollMetrics() {
  const el = document.scrollingElement ?? document.documentElement
  const max = el.scrollHeight - window.innerHeight
  return { top: el.scrollTop, max }
}
