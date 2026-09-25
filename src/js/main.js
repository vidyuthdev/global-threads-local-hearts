/* Entry point. Loaded by every page.

   Order matters: the header, footer and config-driven content are built first
   so that navigation always works. Everything decorative afterwards is
   wrapped in its own try/catch, so a broken animation can never take the
   site's content down with it.                                              */

import '../styles/main.css'

import { applyStoredTheme, initLayout } from './layout.js'
import { renderContent } from './render.js'
import { initCounters } from './counters.js'
import { initLightbox } from './lightbox.js'
import { initThread } from './thread.js'
import { initCursor } from './cursor.js'
import { initForm } from './form.js'
import { prefersReducedMotion } from './motion.js'

function attempt(label, fn) {
  try {
    fn()
  } catch (error) {
    console.error(`[${label}] failed`, error)
  }
}

/* ---- Essential: content and navigation ------------------------------- */
applyStoredTheme()
attempt('layout', initLayout)
attempt('content', renderContent)
attempt('form', initForm)

/* ---- Enhancements ---------------------------------------------------- */
attempt('counters', initCounters)
attempt('lightbox', initLightbox)
attempt('thread', initThread)
attempt('cursor', initCursor)

/* ---- Smooth scrolling + scroll animations (loaded on demand) --------- */
async function initMotion() {
  if (prefersReducedMotion()) return

  let lenis = null

  try {
    const { default: Lenis } = await import('lenis')
    lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native scrolling on touch feels better than an emulated version
      // and keeps the address bar behaving normally.
      syncTouch: false,
    })

    // In-page anchor links need to go through Lenis
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const id = link.getAttribute('href')
        if (!id || id === '#') return
        const target = document.querySelector(id)
        if (!target) return
        event.preventDefault()
        lenis.scrollTo(target, { offset: -90 })
      })
    })
  } catch (error) {
    console.error('[lenis] failed', error)
  }

  try {
    const { initReveal } = await import('./reveal.js')
    initReveal(lenis)
  } catch (error) {
    console.error('[reveal] failed', error)
    // If GSAP never arrived, make sure nothing is left hidden.
    document.documentElement.classList.remove('anim-ready')
  }

  // Lenis needs its own frame loop if GSAP's ticker isn't driving it
  if (lenis && !document.documentElement.classList.contains('anim-ready')) {
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }
}

initMotion()
