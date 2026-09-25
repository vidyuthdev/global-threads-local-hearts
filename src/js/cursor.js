/* A small trailing ring that replaces the pointer on desktop.
   Skipped entirely on touch devices, narrow screens, and for anyone who has
   asked for reduced motion. */

import { hasFinePointer, prefersReducedMotion } from './motion.js'

const HOT_SELECTOR = 'a, button, input, select, textarea, [role="button"], .shot'

export function initCursor() {
  if (prefersReducedMotion() || !hasFinePointer()) return

  const cursor = document.createElement('div')
  cursor.className = 'cursor'
  cursor.setAttribute('aria-hidden', 'true')
  cursor.innerHTML = '<span class="cursor__ring"></span><span class="cursor__dot"></span>'
  document.body.append(cursor)
  document.documentElement.classList.add('has-cursor')

  const ring = cursor.querySelector('.cursor__ring')
  const dot = cursor.querySelector('.cursor__dot')

  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2
  let ringX = mouseX
  let ringY = mouseY
  let running = false

  function loop() {
    ringX += (mouseX - ringX) * 0.18
    ringY += (mouseY - ringY) * 0.18
    ring.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0)`
    dot.style.transform = `translate3d(${mouseX.toFixed(1)}px, ${mouseY.toFixed(1)}px, 0)`

    if (Math.abs(mouseX - ringX) < 0.1 && Math.abs(mouseY - ringY) < 0.1) {
      running = false
      return
    }
    requestAnimationFrame(loop)
  }

  function kick() {
    if (running) return
    running = true
    requestAnimationFrame(loop)
  }

  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return
      mouseX = event.clientX
      mouseY = event.clientY
      cursor.style.opacity = '1'
      kick()
    },
    { passive: true }
  )

  document.addEventListener('pointerover', (event) => {
    const hot = event.target instanceof Element && event.target.closest(HOT_SELECTOR)
    cursor.dataset.hot = String(Boolean(hot))
  })

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'
  })
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1'
  })

  // Drop back to the normal pointer if the window shrinks to tablet size
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    document.documentElement.classList.toggle('has-cursor', event.matches)
  })
}
