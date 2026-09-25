/* Inline SVG icons. All 24×24, stroked with currentColor so they inherit
   whatever color their container uses. */

const paths = {
  // brand: a heart inside a zip-up jacket
  jacketHeart: `
    <path d="M8.9 3.6 4.9 5.1a2.9 2.9 0 0 0-1.8 2.3l-.6 4.2 2.4.8V20a1.2 1.2 0 0 0 1.2 1.2h11.6A1.2 1.2 0 0 0 19 20v-7.6l2.4-.8-.6-4.2a2.9 2.9 0 0 0-1.8-2.3l-4-1.5"/>
    <path d="M8.9 3.6 12 6.2l3.1-2.6"/>
    <path d="M12 6.2v6.4M12 18.3v2.9"/>
    <path d="M12 17.9 9.5 15.4a1.77 1.77 0 0 1 2.5-2.5 1.77 1.77 0 0 1 2.5 2.5Z"/>`,

  // a single cross-stitch, used as a section ornament
  stitchX: `<path d="M5 5l14 14M19 5 5 19"/>`,

  arrowRight: `<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>`,
  arrowDown: `<path d="M12 4v15"/><path d="m6 13 6 6 6-6"/>`,
  arrowUpRight: `<path d="M7 17 17 7"/><path d="M8 7h9v9"/>`,
  check: `<path d="m4 12.5 5 5L20 6.5"/>`,
  cross: `<path d="M6 6l12 12M18 6 6 18"/>`,
  close: `<path d="M6 6l12 12M18 6 6 18"/>`,
  chevronLeft: `<path d="m14.5 5-7 7 7 7"/>`,
  chevronRight: `<path d="m9.5 5 7 7-7 7"/>`,
  mail: `<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.8 7 7.5 5.8a1.2 1.2 0 0 0 1.4 0L20.2 7"/>`,
  instagram: `<rect x="3.5" y="3.5" width="17" height="17" rx="4.6"/><circle cx="12" cy="12" r="3.9"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/>`,
  facebook: `<path d="M14.6 21v-7.4h2.6l.4-3h-3V8.8c0-.9.3-1.5 1.5-1.5h1.6V4.6A20 20 0 0 0 15.4 4c-2.3 0-3.9 1.4-3.9 4.1v2.5H9v3h2.5V21Z"/>`,
  phone: `<path d="M6.5 3.5h3l1.5 4-2 1.4a10 10 0 0 0 5.1 5.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"/>`,
  pin: `<path d="M19 10.5c0 5-7 11-7 11s-7-6-7-11a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10.3" r="2.6"/>`,
  clock: `<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>`,
  calendar: `<rect x="3.5" y="5.5" width="17" height="15" rx="2.2"/><path d="M3.5 10h17M8.5 3.5v4M15.5 3.5v4"/>`,
  info: `<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.4"/>`,
  image: `<rect x="3.5" y="4.5" width="17" height="15" rx="2.2"/><circle cx="9" cy="10" r="1.8"/><path d="m4.5 17.5 4.7-4.3a1.6 1.6 0 0 1 2.2 0l5 4.8"/>`,
  sun: `<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.1M12 19.3v2.1M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2.6 12h2.1M19.3 12h2.1M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5"/>`,
  moon: `<path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2Z"/>`,
  globe: `<circle cx="12" cy="12" r="8.5"/><path d="M3.6 9.5h16.8M3.6 14.5h16.8"/><path d="M12 3.5c-4.5 5-4.5 12 0 17 4.5-5 4.5-12 0-17Z"/>`,
  hanger: `<path d="M12 7.5a2.2 2.2 0 1 1 2.2-2.2"/><path d="M12 7.5v2.2L3.8 15c-1 .6-.6 2.1.6 2.1h15.2c1.2 0 1.6-1.5.6-2.1L12 9.7"/>`,
  users: `<circle cx="9" cy="8.5" r="3.4"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16.2 5.5a3.4 3.4 0 0 1 0 6.6M17.5 14.4A6 6 0 0 1 21 20"/>`,
  // care symbols for the care label
  wash: `<path d="M3.5 8.5h17l-1.4 9.2a2.4 2.4 0 0 1-2.4 2.1H7.3a2.4 2.4 0 0 1-2.4-2.1Z"/><path d="M3.5 8.5 6.8 4.4a2 2 0 0 1 1.6-.8"/><path d="M6.8 12.6c1.3-1.2 2.5-1.2 3.7 0s2.4 1.2 3.7 0 2.4-1.2 3.7 0"/>`,
  dry: `<rect x="3.5" y="4.5" width="17" height="15" rx="2.2"/><circle cx="12" cy="12" r="4.6"/><path d="M12 7.4v9.2"/>`,
  iron: `<path d="M3.5 17.5v-3a5 5 0 0 1 5-5h9.3a2.7 2.7 0 0 1 2.7 2.7v5.3Z"/><path d="M6.5 9.5 7.8 6"/>`,
  noBleach: `<path d="M12 4.2 20.5 19.5h-17Z"/><path d="M5.5 5.5l13 13"/>`,
}

/**
 * Build an <svg> string.
 * @param {keyof typeof paths} name
 * @param {{ cls?: string, fill?: boolean, width?: number }} [options]
 */
export function icon(name, options = {}) {
  const body = paths[name]
  if (!body) return ''
  const cls = options.cls ? ` class="${options.cls}"` : ''
  const fill = options.fill ? 'currentColor' : 'none'
  const stroke = options.fill ? 'none' : 'currentColor'
  return `<svg${cls} viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`
}

export default icon
