/* Accessible lightbox for the photo gallery.
   Escape closes, arrow keys move, focus is trapped and then returned to the
   thumbnail that opened it. */

import { config } from '../site.config.js'
import { icon } from './icons.js'
import { esc } from './motion.js'

export function initLightbox() {
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'))
  if (!triggers.length) return

  const shots = config.gallery
  let index = 0
  let opener = null

  const box = document.createElement('div')
  box.className = 'lightbox'
  box.dataset.open = 'false'
  box.setAttribute('role', 'dialog')
  box.setAttribute('aria-modal', 'true')
  box.setAttribute('aria-label', 'Photo viewer')
  box.innerHTML = `
    <div class="lightbox__bar">
      <span data-lb-count></span>
      <button class="icon-btn" type="button" data-lb-close aria-label="Close photo viewer">
        ${icon('close')}
      </button>
    </div>
    <div class="lightbox__stage">
      <figure class="lightbox__figure">
        <div data-lb-media></div>
        <figcaption class="lightbox__caption" data-lb-caption></figcaption>
      </figure>
    </div>
    <div class="lightbox__controls">
      <button class="icon-btn" type="button" data-lb-prev aria-label="Previous photo">
        ${icon('chevronLeft')}
      </button>
      <button class="icon-btn" type="button" data-lb-next aria-label="Next photo">
        ${icon('chevronRight')}
      </button>
    </div>`
  document.body.append(box)

  const media = box.querySelector('[data-lb-media]')
  const caption = box.querySelector('[data-lb-caption]')
  const count = box.querySelector('[data-lb-count]')
  const closeBtn = box.querySelector('[data-lb-close]')
  const prevBtn = box.querySelector('[data-lb-prev]')
  const nextBtn = box.querySelector('[data-lb-next]')

  function show(i) {
    index = (i + shots.length) % shots.length
    const shot = shots[index]
    media.innerHTML = shot.src
      ? `<img src="${esc(shot.src)}" alt="${esc(shot.alt)}" />`
      : `<div class="lightbox__blank">
           <span>Photo coming soon<br /><small>${esc(shot.caption)}</small></span>
         </div>`
    caption.textContent = shot.caption || ''
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(shots.length).padStart(2, '0')}`
  }

  function open(i, trigger) {
    opener = trigger
    show(i)
    box.dataset.open = 'true'
    document.documentElement.style.overflow = 'hidden'
    closeBtn.focus()
  }

  function close() {
    box.dataset.open = 'false'
    document.documentElement.style.overflow = ''
    opener?.focus()
    opener = null
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => open(Number(trigger.dataset.lightbox) || 0, trigger))
  })

  closeBtn.addEventListener('click', close)
  prevBtn.addEventListener('click', () => show(index - 1))
  nextBtn.addEventListener('click', () => show(index + 1))

  // Click the backdrop (but not the figure) to close
  box.addEventListener('click', (event) => {
    if (event.target === box || event.target.classList.contains('lightbox__stage')) close()
  })

  document.addEventListener('keydown', (event) => {
    if (box.dataset.open !== 'true') return
    if (event.key === 'Escape') close()
    else if (event.key === 'ArrowLeft') show(index - 1)
    else if (event.key === 'ArrowRight') show(index + 1)
    else if (event.key === 'Tab') {
      const focusable = [closeBtn, prevBtn, nextBtn]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  })
}
