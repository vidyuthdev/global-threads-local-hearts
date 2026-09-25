/* Header, mobile menu, theme toggle and footer.
   All built from src/site.config.js so there is one source of truth. */

import { config } from '../site.config.js'
import { icon } from './icons.js'
import { esc } from './motion.js'

const THEME_KEY = 'gtlh-theme'

/* ---------------------------------------------------------------- header */

function currentPage() {
  const file = window.location.pathname.split('/').pop()
  return !file || file === '' ? 'index.html' : file
}

function navLinks(page, linkClass) {
  return config.nav
    .map((item, i) => {
      const active = item.href === page ? ' aria-current="page"' : ''
      if (linkClass === 'mobile-menu__link') {
        return `<li class="mobile-menu__item">
            <a class="mobile-menu__link" href="${esc(item.href)}"${active}>
              <span>${esc(item.label)}</span>
              <span class="mobile-menu__num">${String(i + 1).padStart(2, '0')}</span>
            </a>
          </li>`
      }
      return `<li><a class="nav__link" href="${esc(item.href)}"${active}>${esc(item.label)}</a></li>`
    })
    .join('')
}

function brandMarkup() {
  return `
    <a class="brand" href="index.html" aria-label="${esc(config.site.name)} home">
      ${icon('jacketHeart', { cls: 'brand__mark' })}
      <span class="brand__text">
        <span class="brand__name">Global Threads</span>
        <span class="brand__sub">Local Hearts</span>
      </span>
    </a>`
}

function renderHeader() {
  const host = document.querySelector('[data-site-header]')
  if (!host) return
  const page = currentPage()

  host.className = 'site-header'
  host.innerHTML = `
    <div class="container site-header__inner">
      ${brandMarkup()}

      <nav class="nav" aria-label="Main">
        <ul class="nav__list">${navLinks(page, 'nav__link')}</ul>
      </nav>

      <div class="header__actions">
        <button class="icon-btn theme-toggle" type="button" data-theme-toggle
                aria-label="Switch between light and dark mode">
          ${icon('sun', { cls: 'icon-sun' })}
          ${icon('moon', { cls: 'icon-moon' })}
        </button>
        <a class="btn btn--sm header__cta" href="donate.html">
          Donate Clothes ${icon('arrowRight')}
        </a>
        <button class="nav-toggle" type="button" data-nav-toggle
                aria-expanded="false" aria-controls="mobile-menu"
                aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>`

  const menu = document.createElement('div')
  menu.className = 'mobile-menu'
  menu.id = 'mobile-menu'
  menu.dataset.open = 'false'
  menu.innerHTML = `
    <nav aria-label="Main (mobile)">
      <ul class="mobile-menu__list">${navLinks(page, 'mobile-menu__link')}</ul>
    </nav>
    <div class="mobile-menu__foot">
      <hr class="seam" />
      <a class="btn" href="donate.html">Donate Clothes ${icon('arrowRight')}</a>
      <p class="muted" style="font-size:var(--fs-xs)">
        An IB CAS project at ${esc(config.site.school)}.
      </p>
    </div>`
  host.after(menu)

  wireMobileMenu(host, menu)
  wireScrollState(host)
}

function wireMobileMenu(host, menu) {
  const toggle = host.querySelector('[data-nav-toggle]')
  if (!toggle) return
  const links = menu.querySelectorAll('a')

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    menu.dataset.open = String(open)
    document.documentElement.style.overflow = open ? 'hidden' : ''
    // Stagger the links in, matching the CSS transition
    menu.querySelectorAll('.mobile-menu__link').forEach((link, i) => {
      link.style.transitionDelay = open ? `${70 + i * 45}ms` : '0ms'
    })
    if (open) links[0]?.focus()
    else toggle.focus()
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true')
  })

  links.forEach((link) => link.addEventListener('click', () => setOpen(false)))

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.dataset.open === 'true') setOpen(false)
  })

  // Keep focus inside the open menu
  menu.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || menu.dataset.open !== 'true') return
    const focusable = [toggle, ...menu.querySelectorAll('a, button')]
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  })

  // Close if the viewport grows past the desktop breakpoint
  window.matchMedia('(min-width: 960px)').addEventListener('change', (event) => {
    if (event.matches && menu.dataset.open === 'true') setOpen(false)
  })
}

function wireScrollState(host) {
  const update = () => {
    host.dataset.scrolled = String(window.scrollY > 8)
  }
  update()
  window.addEventListener('scroll', update, { passive: true })
}

/* ----------------------------------------------------------------- theme */

export function applyStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.dataset.theme = stored
    }
  } catch {
    /* localStorage can be blocked, but the OS preference still applies */
  }
}

function wireThemeToggle() {
  const button = document.querySelector('[data-theme-toggle]')
  if (!button) return

  button.addEventListener('click', () => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const current = document.documentElement.dataset.theme || (systemDark ? 'dark' : 'light')
    const next = current === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      /* ignore */
    }
  })
}

/* ---------------------------------------------------------------- footer */

function renderFooter() {
  const host = document.querySelector('[data-site-footer]')
  if (!host) return
  const { site, partner, contact, details } = config

  const pageLinks = config.nav
    .map((item) => `<a href="${esc(item.href)}">${esc(item.label)}</a>`)
    .join('')

  // "Reach us" is the email only. The social handle lives on the contact page.
  const social = contact.email
    ? [`<a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>`]
    : []

  host.className = 'site-footer'
  host.innerHTML = `
    <div class="container">
      <div class="footer__top">
        <div>
          <p class="footer__wordmark">${esc(site.name)}</p>
          <p class="muted" style="margin-top:1rem;font-size:var(--fs-sm);max-width:34ch">
            An IB CAS Project at ${esc(site.school)} · ${esc(site.season)}
          </p>
          <div class="tag-row" style="margin-top:1.25rem">
            <span class="woven-tag">Student Made</span>
            <span class="woven-tag">100% Community</span>
          </div>
        </div>

        <div class="footer__col">
          <h3>This site</h3>
          <div class="footer__links">${pageLinks}</div>
        </div>

        <div class="footer__col">
          <h3>Our partner</h3>
          <div class="footer__links">
            <a href="${esc(partner.website)}" rel="noopener">${esc(partner.name)} ↗</a>
            <a href="${esc(partner.mapsUrl)}" rel="noopener">${esc(partner.address)}</a>
            <a href="${esc(partner.phoneHref)}">${esc(partner.phone)}</a>
            ${partner.instagram ? `<a href="${esc(partner.instagram)}" rel="noopener">Instagram ↗</a>` : ''}
            ${partner.facebook ? `<a href="${esc(partner.facebook)}" rel="noopener">Facebook ↗</a>` : ''}
          </div>
          ${social.length ? `<h3 style="margin-top:1.75rem">Reach us</h3><div class="footer__links">${social.join('')}</div>` : ''}
        </div>
      </div>

      <div class="footer__bottom">
        <p>
          This website is student-made and is not operated by ${esc(partner.name)}.
          ${esc(details.credit)}
        </p>
        <p>© <span data-year>${new Date().getFullYear()}</span> ${esc(site.name)}</p>
      </div>
    </div>`
}

/* ------------------------------------------------------------------ boot */

export function initLayout() {
  renderHeader()
  renderFooter()
  wireThemeToggle()
}
