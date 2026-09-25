/* THE THREAD: one continuous line that weaves down the page and sews itself
   in as you scroll, with a needle riding the leading edge.

   How it works
   ------------
   An SVG is stretched over the whole <main> using viewBox "0 0 100 pageHeight"
   and preserveAspectRatio="none". That means x is a percentage (0–100) while y
   is real pixels, so the path can be described in page coordinates.
   `vector-effect: non-scaling-stroke` keeps the line hairline-thin despite the
   uneven scaling.

   The path always travels downward, so the drawn portion can be revealed with
   a simple clip rectangle that grows, which is what lets the visible line be
   a dashed stitch rather than a solid stroke.                                */

import { clamp, debounce, prefersReducedMotion } from './motion.js'

const NS = 'http://www.w3.org/2000/svg'
let uid = 0

function svgEl(name, attrs = {}) {
  const el = document.createElementNS(NS, name)
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
  return el
}

/** Smooth S-curve weaving between the left and right thirds of the page. */
function buildPathData(height) {
  const segment = clamp(window.innerHeight * 0.66, 340, 700)
  const steps = Math.max(3, Math.round(height / segment))
  const points = []

  for (let i = 0; i <= steps; i += 1) {
    const side = i % 2 === 0 ? -1 : 1
    const amplitude = 27 + 9 * Math.sin(i * 1.27) // vary so it never looks mechanical
    points.push({ x: 50 + side * amplitude, y: (height / steps) * i })
  }

  let d = `M ${points[0].x.toFixed(2)} 0`
  for (let i = 1; i < points.length; i += 1) {
    const from = points[i - 1]
    const to = points[i]
    const k = (to.y - from.y) * 0.45 // control-point reach
    d += ` C ${from.x.toFixed(2)} ${(from.y + k).toFixed(2)}, ${to.x.toFixed(2)} ${(
      to.y - k
    ).toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`
  }
  return d
}

export function initThread() {
  const wrap = document.querySelector('[data-thread]')
  if (!wrap) return

  const host = wrap.parentElement
  if (!host) return

  uid += 1
  const clipId = `thread-clip-${uid}`

  const svg = svgEl('svg', {
    class: 'thread-svg',
    preserveAspectRatio: 'none',
    'aria-hidden': 'true',
    focusable: 'false',
  })

  const clipRect = svgEl('rect', { x: '-20', y: '0', width: '140', height: '0' })
  const clipPath = svgEl('clipPath', { id: clipId, clipPathUnits: 'userSpaceOnUse' })
  clipPath.append(clipRect)
  const defs = svgEl('defs')
  defs.append(clipPath)

  const trace = svgEl('path', { class: 'thread-trace' })
  const group = svgEl('g', { 'clip-path': `url(#${clipId})` })
  const live = svgEl('path', { class: 'thread-live' })
  const stitch = svgEl('path', { class: 'thread-stitch' })
  group.append(live, stitch)

  const needle = svgEl('g', { class: 'thread-needle' })
  needle.append(
    svgEl('circle', { class: 'halo', r: '7' }),
    svgEl('circle', { r: '2.6' })
  )

  svg.append(defs, trace, group, needle)
  wrap.append(svg)

  let height = 0
  let total = 0
  let target = 0
  let shown = 0
  let ticking = false

  /** Walk the path to find how far along it the given y sits. */
  function lengthAtY(y) {
    let low = 0
    let high = total
    for (let i = 0; i < 16; i += 1) {
      const mid = (low + high) / 2
      if (live.getPointAtLength(mid).y < y) low = mid
      else high = mid
    }
    return (low + high) / 2
  }

  function paint(y) {
    clipRect.setAttribute('height', Math.max(0, y).toFixed(1))
    try {
      const point = live.getPointAtLength(lengthAtY(y))
      // Undo the horizontal stretch so the needle stays a circle
      const scaleX = 100 / Math.max(1, svg.clientWidth || host.clientWidth)
      needle.setAttribute(
        'transform',
        `translate(${point.x.toFixed(2)} ${point.y.toFixed(1)}) scale(${scaleX.toFixed(4)} 1)`
      )
    } catch {
      /* getPointAtLength can throw on a zero-length path, which is harmless */
    }
  }

  function measure() {
    height = Math.max(host.scrollHeight, 1)
    svg.setAttribute('viewBox', `0 0 100 ${height}`)
    const d = buildPathData(height)
    trace.setAttribute('d', d)
    live.setAttribute('d', d)
    stitch.setAttribute('d', d)
    total = live.getTotalLength()
  }

  /** Where the needle should be: a little below the middle of the viewport. */
  function computeTarget() {
    const top = host.getBoundingClientRect().top + window.scrollY
    const focus = window.scrollY - top + window.innerHeight * 0.62
    return clamp(focus, 0, height)
  }

  function loop() {
    const delta = target - shown
    if (Math.abs(delta) < 0.4) {
      shown = target
      paint(shown)
      ticking = false
      return
    }
    shown += delta * 0.12
    paint(shown)
    requestAnimationFrame(loop)
  }

  function onScroll() {
    target = computeTarget()
    if (!ticking) {
      ticking = true
      requestAnimationFrame(loop)
    }
  }

  measure()

  if (prefersReducedMotion()) {
    // Show the whole thread at once, no needle, no scroll work.
    clipRect.setAttribute('height', String(height))
    needle.remove()
  } else {
    shown = target = computeTarget()
    paint(shown)
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  const remeasure = debounce(() => {
    measure()
    if (prefersReducedMotion()) {
      clipRect.setAttribute('height', String(height))
    } else {
      target = computeTarget()
      shown = target
      paint(shown)
    }
  }, 180)

  window.addEventListener('resize', remeasure)
  window.addEventListener('load', remeasure)

  if ('ResizeObserver' in window) {
    // Content height changes when images load or the mobile menu opens
    new ResizeObserver(remeasure).observe(host)
  }
}
