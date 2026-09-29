import { EASE } from './motion'

/**
 * Scroll-triggered entrance animations.
 * - fade:    the element rises 14px and fades in
 * - rule:    a horizontal rule draws from the left
 * - stagger: each child fades up in turn (tag rows, bullet lists)
 */
export type RevealKind = 'fade' | 'rule' | 'stagger'

/** Delay between elements that reveal together. */
const STAGGER_MS = 70

function play(el: HTMLElement, kind: RevealKind, delay: number) {
  el.style.opacity = ''
  if (kind === 'rule') {
    el.animate([{ transform: 'scaleX(0)' }, { transform: 'none' }], {
      duration: 900,
      delay: delay + 120,
      easing: EASE,
      fill: 'backwards',
    })
    return
  }
  if (kind === 'stagger') {
    Array.from(el.children).forEach((child, i) =>
      child.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], {
        duration: 420,
        delay: delay + 140 + i * 40,
        easing: EASE,
        fill: 'backwards',
      }),
    )
    return
  }
  el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], {
    duration: 560,
    delay,
    easing: EASE,
    fill: 'backwards',
  })
}

/* Elements registered in the same frame (e.g. everything visible on load) share one stagger sequence. */
let batchIndex = 0
let batchFrame = 0
function nextBatchDelay() {
  if (!batchFrame) {
    batchFrame = requestAnimationFrame(() => {
      batchIndex = 0
      batchFrame = 0
    })
  }
  return batchIndex++ * STAGGER_MS
}

const pendingKinds = new WeakMap<Element, RevealKind>()
let observer: IntersectionObserver | null = null

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      let index = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        observer?.unobserve(el)
        play(el, pendingKinds.get(el) ?? 'fade', index++ * STAGGER_MS)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  return observer
}

/**
 * Animate `el` in: right away if it is already on screen, otherwise when it
 * scrolls into view. Returns a cleanup function.
 */
export function registerReveal(el: HTMLElement, kind: RevealKind): () => void {
  // Marker for the print stylesheet, which forces everything visible.
  el.dataset.reveal = kind
  const rect = el.getBoundingClientRect()
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    play(el, kind, nextBatchDelay())
    return () => {}
  }
  el.style.opacity = '0'
  pendingKinds.set(el, kind)
  getObserver().observe(el)
  return () => observer?.unobserve(el)
}

/** Jump every running animation to its end state (before printing, or when motion is off). */
export function finishAllAnimations() {
  for (const animation of document.getAnimations()) {
    try {
      animation.finish()
    } catch {
      // Infinite animations (the live pulse) cannot be finished; they are harmless.
    }
  }
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.style.opacity = ''
  })
}
