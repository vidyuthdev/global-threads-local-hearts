/* Turns src/site.config.js into HTML.

   Pages carry empty hooks like  <div data-render="collection-points"></div>
   and this file fills them in. Add a renderer below to add a new hook.        */

import { config } from '../site.config.js'
import { icon } from './icons.js'
import { debounce, esc, get } from './motion.js'

const slug = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** Drop the whole section when its list in the config is empty, so clearing a
    list out doesn't leave a heading with nothing under it. */
const hideSection = (host) => (host.closest('section') || host).remove()

/* ------------------------------------------------------------- renderers */

const renderers = {
  /* Scrolling ticker.
     The CSS animation travels exactly -50%, so the track has to be an EVEN
     number of identical runs for the loop to be seamless. It also has to be
     long enough: if half the track is narrower than the strip, a blank gap
     opens at the right-hand edge as it scrolls. So the run is repeated until
     one half covers the strip, and the duration is derived from the final
     width to keep the speed constant. */
  marquee(host) {
    const run = config.details.marquee
      .map(
        (word) =>
          `<span class="marquee__item">${esc(word)}<span class="marquee__dot" aria-hidden="true"></span></span>`
      )
      .join('')

    const SPEED = 85 // pixels per second

    host.classList.add('marquee__track')
    host.setAttribute('aria-hidden', 'true')
    host.innerHTML = run + run
    host.dataset.copies = '2'

    const fit = () => {
      const strip = host.parentElement
      if (!strip) return
      const copies = Number(host.dataset.copies) || 2
      const runWidth = host.scrollWidth / copies
      if (!runWidth) return

      // +32px of slack so sub-pixel rounding can never expose a hairline gap
      const perHalf = Math.max(1, Math.ceil((strip.clientWidth + 32) / runWidth))
      const needed = perHalf * 2
      if (needed !== copies) {
        host.innerHTML = run.repeat(needed)
        host.dataset.copies = String(needed)
      }
      host.style.animationDuration = `${((runWidth * perHalf) / SPEED).toFixed(1)}s`
    }

    requestAnimationFrame(fit)
    // Letter widths change once the display font swaps in
    if (document.fonts?.ready) document.fonts.ready.then(fit)
    window.addEventListener('resize', debounce(fit, 200))
  },

  /* Counter row + progress bar toward the goal. */
  stats(host) {
    const { stats, goal, lastUpdated } = config.impact
    const collected = Number(stats[0]?.value) || 0
    const pct = goal > 0 ? Math.min(100, Math.round((collected / goal) * 100)) : 0

    host.innerHTML = `
      <ul class="stats" data-reveal>
        ${stats
          .map(
            (stat) => `
          <li class="stat">
            <span class="stat__value" data-count="${Number(stat.value) || 0}"${
              stat.suffix ? ` data-suffix="${esc(stat.suffix)}"` : ''
            }>0</span>
            <span class="stat__label">${esc(stat.label)}</span>
            <span class="stat__note">${esc(stat.note)}</span>
          </li>`
          )
          .join('')}
      </ul>

      <div class="progress" data-reveal>
        <div class="progress__head">
          <span><strong>${collected}</strong> of ${goal} items toward our goal</span>
          <span class="muted">${pct}% · updated ${esc(lastUpdated)}</span>
        </div>
        <div class="progress__track" role="progressbar"
             aria-valuenow="${collected}" aria-valuemin="0" aria-valuemax="${goal}"
             aria-label="Items collected toward our goal of ${goal}">
          <span class="progress__fill" data-progress="${pct}"></span>
        </div>
      </div>`
  },

  'accept-yes'(host) {
    host.innerHTML = config.accept.yes
      .map((item) => `<li>${icon('check')}<span>${esc(item)}</span></li>`)
      .join('')
  },

  'accept-no'(host) {
    host.innerHTML = config.accept.no
      .map((item) => `<li>${icon('cross')}<span>${esc(item)}</span></li>`)
      .join('')
  },

  'accept-rule'(host) {
    host.innerHTML = `${icon('jacketHeart')}<p>${esc(config.accept.rule)}</p>`
  },

  'care-steps'(host) {
    host.innerHTML = config.careSteps
      .map(
        (step, i) => `
        <li class="care-step">
          <span class="care-step__num" aria-hidden="true">${i + 1}</span>
          <span class="care-step__name">${esc(step.step)}</span>
          <span class="care-step__text">${esc(step.text)}</span>
        </li>`
      )
      .join('')
  },

  'collection-points'(host) {
    host.innerHTML = config.collectionPoints
      .map(
        (point) => `
        <article class="point${point.primary ? ' point--primary' : ''}" data-reveal>
          ${point.primary ? '<span class="woven-tag woven-tag--accent">Main drop-off</span>' : ''}
          <h3 class="point__name">${esc(point.name)}</h3>
          <p class="point__row">${icon('pin')}<span>${esc(point.address)}</span></p>
          <p class="point__row">${icon('clock')}<span>${esc(point.when)}</span></p>
          <p class="point__row">${icon('calendar')}<span>${esc(point.dates)}</span></p>
          ${point.note ? `<p class="point__note">${esc(point.note)}</p>` : ''}
        </article>`
      )
      .join('')
  },

  'collection-days'(host) {
    host.innerHTML = config.collectionDays
      .map(
        (day) => `
        <div class="day" data-reveal>
          <p class="day__date">${esc(day.date)}</p>
          <p class="day__meta"><span>${esc(day.time)}</span><span>${esc(day.place)}</span></p>
          <p class="day__detail">${esc(day.detail)}</p>
        </div>`
      )
      .join('')
  },

  'other-ways'(host) {
    host.innerHTML = config.otherWays
      .map(
        (way) => `
        <article class="way" data-reveal>
          <h3>${esc(way.title)}</h3>
          <p>${esc(way.text)}</p>
        </article>`
      )
      .join('')
  },

  'partner-info'(host) {
    const p = config.partner
    host.innerHTML = `
      <div class="info-item">
        <span class="info-item__label">Where</span>
        <span class="info-item__value">
          <a class="link-stitch" href="${esc(p.mapsUrl)}" rel="noopener">
            ${esc(p.address)} ${icon('arrowUpRight')}
          </a>
        </span>
      </div>
      <div class="info-item">
        <span class="info-item__label">Phone</span>
        <span class="info-item__value">
          <a class="link-stitch" href="${esc(p.phoneHref)}">${esc(p.phone)}</a>
        </span>
      </div>
      <div class="info-item">
        <span class="info-item__label">Donation drop-off hours</span>
        <span class="info-item__value">
          <ul class="hours-list">${p.hours.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
        </span>
      </div>
      <div class="info-item">
        <span class="info-item__label">Online</span>
        <span class="info-item__value" style="display:flex;flex-wrap:wrap;gap:.5rem 1.25rem">
          <a class="link-stitch" href="${esc(p.website)}" rel="noopener">heartformonroe.com ${icon('arrowUpRight')}</a>
          ${p.instagram ? `<a class="link-stitch" href="${esc(p.instagram)}" rel="noopener">Instagram ${icon('arrowUpRight')}</a>` : ''}
          ${p.facebook ? `<a class="link-stitch" href="${esc(p.facebook)}" rel="noopener">Facebook ${icon('arrowUpRight')}</a>` : ''}
        </span>
      </div>`
  },

  'partner-programs'(host) {
    host.innerHTML = config.partner.programs
      .map(
        (program) => `
        <div class="program" data-reveal>
          <h3 class="program__name">${esc(program.name)}</h3>
          <p>${esc(program.text)}</p>
        </div>`
      )
      .join('')
  },

  'partner-disclaimer'(host) {
    host.innerHTML = `${icon('info')}<p><strong>We’re a student project.</strong> ${esc(
      config.partner.disclaimer
    )}</p>`
  },

  'why-clothing'(host) {
    host.innerHTML = config.whyClothing
      .map(
        (item) => `
        <article class="why" data-reveal>
          <p class="why__stat">${esc(item.stat)}</p>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.text)}</p>
        </article>`
      )
      .join('')
  },

  'stage-nav'(host) {
    host.innerHTML = config.casStages
      .map(
        (stage) =>
          `<a class="woven-tag" href="#stage-${slug(stage.stage)}">${esc(stage.stage)}</a>`
      )
      .join('')
  },

  'cas-stages'(host) {
    host.innerHTML = config.casStages
      .map(
        (stage) => `
        <li class="tl-item" id="stage-${slug(stage.stage)}" data-reveal>
          <span class="tl-node" aria-hidden="true"></span>
          <div class="tl-item__meta">
            <h3 class="tl-item__stage">${esc(stage.stage)}</h3>
            <span class="tl-item__date">${esc(stage.date)}</span>
          </div>
          <p class="tl-item__text">${esc(stage.text)}</p>
        </li>`
      )
      .join('')
  },

  'learning-outcomes'(host) {
    host.innerHTML = config.learningOutcomes
      .map(
        (outcome) => `
        <article class="lo" data-reveal>
          <p class="lo__code">${esc(outcome.code)}</p>
          <h3 class="lo__title">${esc(outcome.title)}</h3>
          <p>${esc(outcome.text)}</p>
        </article>`
      )
      .join('')
  },

  reflections(host) {
    host.innerHTML = config.reflections
      .map(
        (item) => `
        <article class="reflection" data-reveal>
          <p class="reflection__mark" aria-hidden="true">&ldquo;</p>
          <h3 class="reflection__title">${esc(item.title)}</h3>
          <p class="reflection__text">${esc(item.text)}</p>
          <p class="reflection__by">
            <b>${esc(item.author)}</b>
            <span>${esc(item.role)}${item.role && item.date ? ' · ' : ''}${esc(item.date)}</span>
          </p>
        </article>`
      )
      .join('')
  },

  gallery(host) {
    host.innerHTML = config.gallery
      .map((shot, i) => {
        const inner = shot.src
          ? `<img src="${esc(shot.src)}" alt="${esc(shot.alt)}" loading="lazy" decoding="async" />`
          : `<span class="shot__placeholder">${icon('image')}
               <span class="visually-hidden">Photo coming soon: ${esc(shot.caption)}</span>
             </span>`
        return `
          <button class="shot${shot.tall ? ' shot--tall' : ''}" type="button"
                  data-lightbox="${i}"
                  aria-label="Open photo: ${esc(shot.caption)}">
            <span class="shot__frame">${inner}</span>
            <span class="shot__caption">
              <span>${esc(shot.caption)}</span>
              <span>${String(i + 1).padStart(2, '0')}</span>
            </span>
          </button>`
      })
      .join('')
  },

  team(host) {
    host.innerHTML = config.team
      .map(
        (person) => `
        <li class="tag-hang" data-reveal>
          <span class="tag-hang__string" aria-hidden="true"></span>
          <article class="tag-card">
            <p class="tag-card__num">${esc(person.tag)}</p>
            <h3 class="tag-card__name">${esc(person.name)}</h3>
            <p class="tag-card__role">${esc(person.role)}</p>
            <p class="tag-card__text">${esc(person.text)}</p>
          </article>
        </li>`
      )
      .join('')
  },

  supervisor(host) {
    const s = config.supervisor
    if (!s || !s.name) {
      host.remove()
      return
    }
    host.innerHTML = `
      <div class="card" data-reveal>
        <p class="card__kicker">With thanks to</p>
        <h3 style="font-family:var(--font-display);font-size:var(--fs-lg);font-weight:400;line-height:1.1">
          ${esc(s.name)}
        </h3>
        <p><strong style="color:var(--text)">${esc(s.role)}</strong></p>
        <p>${esc(s.text)}</p>
      </div>`
  },

  /* The wall of donor names. Handles three names or three hundred. */
  'thanks-people'(host) {
    const people = config.thanks.people || []
    if (!people.length) {
      host.outerHTML = `
        <p class="notice">
          ${icon('info')}
          <span>We’re still collecting permission to list names. If you donated and
          would like to be thanked here, just let us know.</span>
        </p>`
      return
    }
    host.innerHTML = people.map((name) => `<li>${esc(name)}</li>`).join('')
  },

  'thanks-orgs'(host) {
    const orgs = config.thanks.organizations || []
    if (!orgs.length) return hideSection(host)
    host.innerHTML = orgs
      .map(
        (org) => `
        <article class="org" data-reveal>
          <p class="org__place">${esc(org.place)}</p>
          <h3 class="org__name">${esc(org.name)}</h3>
          <p class="org__text">${esc(org.text)}</p>
          ${
            org.url
              ? `<a class="link-stitch" href="${esc(org.url)}" rel="noopener"
                    style="margin-top:auto;padding-top:.9rem">Visit ${esc(org.name)} ${icon('arrowUpRight')}</a>`
              : ''
          }
        </article>`
      )
      .join('')
  },

  /* No group has run a mini-drive yet. Rather than hiding the section, it
     shows the invitation from the config, so the empty space does some work. */
  'thanks-groups'(host) {
    const groups = config.thanks.groups || []
    if (!groups.length) {
      host.outerHTML = `
        <p class="notice notice--accent" style="max-width:70ch">
          ${icon('users')}
          <span><strong>This list is empty, which is an opportunity.</strong>
          ${esc(config.thanks.groupsInvite)}</span>
        </p>`
      return
    }
    host.innerHTML = groups
      .map((group) => `<li class="woven-tag">${esc(group)}</li>`)
      .join('')
  },

  'contact-lines'(host) {
    const c = config.contact
    const rows = []
    if (c.email) {
      rows.push(`
        <a class="contact-line" href="mailto:${esc(c.email)}">
          <span class="contact-line__label">Email</span>
          <span class="contact-line__value">${esc(c.email)}</span>
        </a>`)
    }
    if (c.handle) {
      rows.push(`
        <a class="contact-line" href="${esc(c.instagram)}" rel="noopener">
          <span class="contact-line__label">Instagram</span>
          <span class="contact-line__value">${esc(c.handle)}</span>
        </a>`)
    }
    rows.push(`
      <div class="contact-line">
        <span class="contact-line__label">Reply time</span>
        <span class="contact-line__value" style="font-size:var(--fs-md)">${esc(c.responseTime)}</span>
      </div>`)
    host.innerHTML = rows.join('')
  },

  'contact-topics'(host) {
    host.innerHTML = config.contact.topics
      .map((topic) => `<option value="${esc(topic)}">${esc(topic)}</option>`)
      .join('')
  },

  'hero-labels'(host) {
    host.innerHTML = config.details.labels
      .map((label) => `<span class="woven-tag">${esc(label)}</span>`)
      .join('')
  },
}

/* --------------------------------------------------- simple text bindings */

function applyBindings() {
  // <span data-text="site.school"></span>
  document.querySelectorAll('[data-text]').forEach((el) => {
    const value = get(config, el.dataset.text)
    if (value !== undefined && value !== null) el.textContent = String(value)
  })

  // <a data-href="partner.website">
  document.querySelectorAll('[data-href]').forEach((el) => {
    const value = get(config, el.dataset.href)
    if (value) el.setAttribute('href', String(value))
  })

  // <a data-mailto="contact.email">
  document.querySelectorAll('[data-mailto]').forEach((el) => {
    const value = get(config, el.dataset.mailto)
    if (value) el.setAttribute('href', `mailto:${value}`)
  })
}

/* ------------------------------------------------------------------ boot */

export function renderContent() {
  document.querySelectorAll('[data-render]').forEach((host) => {
    const name = host.dataset.render
    const fn = renderers[name]
    if (!fn) {
      console.warn(`[render] no renderer called "${name}"`)
      return
    }
    try {
      fn(host)
    } catch (error) {
      console.error(`[render] "${name}" failed`, error)
    }
  })
  applyBindings()
}
