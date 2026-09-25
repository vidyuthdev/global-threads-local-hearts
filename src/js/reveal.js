/* Scroll-triggered reveals and line-by-line headline animation (GSAP).

   Everything here is opt-in from the markup:
     data-reveal        → fades and rises into place when scrolled to
     data-reveal-group  → its direct children reveal one after another
     data-lines         → each .line > span slides up, staggered
     data-hero          → animates on load instead of on scroll             */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './motion.js'

export function initReveal(lenis) {
  if (prefersReducedMotion()) return

  gsap.registerPlugin(ScrollTrigger)

  // Hand Lenis and ScrollTrigger the same clock so they never disagree about
  // the scroll position. Lenis still scrolls the window, so ScrollTrigger
  // needs no custom scroller.
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  // Only now is it safe to hide things: if this module had failed to load,
  // the page would have stayed fully visible.
  //
  // The class supplies opacity: 0; the offsets are set here rather than in CSS
  // because GSAP treats a transform it finds in the cascade as the element's
  // baseline and animates relative to it, which would land every reveal back
  // where it started. Both happen in one task, so nothing paints in between.
  document.documentElement.classList.add('anim-ready')

  const ALL_LINES = document.querySelectorAll('.line > span')
  const ALL_REVEALS = document.querySelectorAll('[data-reveal]')
  gsap.set(ALL_LINES, { yPercent: 105 })
  gsap.set(ALL_REVEALS, { y: 24 })

  const EASE = 'expo.out'

  /* ---- Hero / above-the-fold: animate straight away ------------------- */
  document.querySelectorAll('[data-hero]').forEach((hero) => {
    const lines = hero.querySelectorAll('.line > span')
    const rest = hero.querySelectorAll('[data-reveal]')
    const tl = gsap.timeline({ delay: 0.12 })

    if (lines.length) {
      tl.fromTo(
        lines,
        { yPercent: 105 },
        { yPercent: 0, duration: 1.15, ease: EASE, stagger: 0.085 }
      )
    }
    if (rest.length) {
      tl.fromTo(
        rest,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.09 },
        lines.length ? '-=0.75' : 0
      )
    }
  })

  /* ---- Headlines further down the page -------------------------------- */
  document.querySelectorAll('[data-lines]:not([data-hero] [data-lines])').forEach((block) => {
    const lines = block.querySelectorAll('.line > span')
    if (!lines.length) return
    gsap.fromTo(
      lines,
      { yPercent: 105 },
      {
        yPercent: 0,
        duration: 1.1,
        ease: EASE,
        stagger: 0.08,
        scrollTrigger: { trigger: block, start: 'top 88%', once: true },
      }
    )
  })

  /* ---- Groups: children reveal in sequence ---------------------------- */
  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    const kids = group.querySelectorAll(':scope > [data-reveal]')
    if (!kids.length) return
    gsap.fromTo(
      kids,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: EASE,
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      }
    )
  })

  /* ---- Everything else with data-reveal, batched ---------------------- */
  const singles = Array.from(document.querySelectorAll('[data-reveal]')).filter(
    (el) => !el.closest('[data-hero]') && !el.parentElement?.hasAttribute('data-reveal-group')
  )

  ScrollTrigger.batch(singles, {
    start: 'top 88%',
    once: true,
    batchMax: 6,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, ease: EASE, stagger: 0.07, overwrite: true }
      ),
  })

  // Images and fonts settling can change layout; re-measure once they do.
  window.addEventListener('load', () => ScrollTrigger.refresh())
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }
}
