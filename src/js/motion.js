/* Small shared helpers. */

/** True when the visitor has asked their system to reduce motion. */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** True on desktop-ish devices with a real mouse. Used for the custom cursor. */
export function hasFinePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1024
}

/** Escape text before it goes into innerHTML. */
export function esc(value) {
  if (value === null || value === undefined) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Read 'a.b.c' out of an object. Returns undefined if any step is missing. */
export function get(object, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), object)
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

/** Run fn at most once per animation frame. */
export function rafThrottle(fn) {
  let queued = false
  return (...args) => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      fn(...args)
    })
  }
}

export function debounce(fn, wait = 150) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}
