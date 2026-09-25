/* Contact form.

   With no form service connected (the default), submitting opens the
   visitor's email app with everything already filled in, which works on a
   static site with zero setup.

   To use a real form service instead, set `contact.formEndpoint` in
   src/site.config.js to your Formspree (or similar) URL. See README.md.      */

import { config } from '../site.config.js'

export function initForm() {
  const form = document.querySelector('[data-contact-form]')
  if (!form) return

  const status = form.querySelector('[data-form-status]')
  const endpoint = config.contact.formEndpoint

  const say = (message) => {
    if (!status) return
    status.textContent = message
    status.dataset.show = 'true'
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const name = (data.get('name') || '').toString().trim()
    const email = (data.get('email') || '').toString().trim()
    const topic = (data.get('topic') || '').toString().trim()
    const message = (data.get('message') || '').toString().trim()

    if (!endpoint) {
      const subject = `[${config.site.name}] ${topic || 'Website enquiry'}`
      const body = [
        message,
        '',
        '---',
        name ? `From: ${name}` : '',
        email ? `Reply to: ${email}` : '',
      ]
        .filter(Boolean)
        .join('\n')

      window.location.href =
        `mailto:${config.contact.email}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`

      say('Opening your email app… if nothing happens, email us directly at ' + config.contact.email + '.')
      return
    }

    const button = form.querySelector('[type="submit"]')
    if (button) button.disabled = true
    say('Sending…')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error(`Form service returned ${response.status}`)
      form.reset()
      say('Thank you. We’ve got your message and will reply soon.')
    } catch (error) {
      console.error(error)
      say(`Sorry, that didn’t send. Please email us at ${config.contact.email} instead.`)
    } finally {
      if (button) button.disabled = false
    }
  })
}
