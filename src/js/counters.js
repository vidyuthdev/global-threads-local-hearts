/* Count-up numbers and the progress bar, triggered when scrolled into view. */

import { prefersReducedMotion } from './motion.js'

const DURATION = 1500

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function countUp(el, to, suffix) {
  const start = performance.now()

  function frame(now) {
    const t = Math.min(1, (now - start) / DURATION)
    el.textContent = Math.round(to * easeOutCubic(t)) + suffix
    if (t < 1) requestAnimationFrame(frame)
  }

  requestAnimationFrame(frame)
}

export function initCounters() {
  const numbers = Array.from(document.querySelectorAll('[data-count]'))
  const bars = Array.from(document.querySelectorAll('[data-progress]'))
  if (!numbers.length && !bars.length) return

  const reduce = prefersReducedMotion()

  const fill = (el) => {
    if (el.dataset.done === 'true') return
    el.dataset.done = 'true'
    if (el.hasAttribute('data-count')) {
      const to = Number(el.dataset.count) || 0
      const suffix = el.dataset.suffix || ''
      if (reduce) el.textContent = to + suffix
      else countUp(el, to, suffix)
    } else {
      el.style.width = `${Number(el.dataset.progress) || 0}%`
    }
  }

  if (reduce || !('IntersectionObserver' in window)) {
    ;[...numbers, ...bars].forEach(fill)
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        fill(entry.target)
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.35 }
  )
  ;[...numbers, ...bars].forEach((el) => observer.observe(el))
}
