let $ = window.$
import { gsap } from '../../vendor.js'

let ctx

export default function initCurrentTime() {
  ctx = gsap.context(() => {
    const timeElements = document.querySelectorAll('[data-time=element]')
    const timeElement = timeElements.length > 1 ? timeElements[timeElements.length - 1] : timeElements[0]

    // Create a single formatter instance
    const options = {
      timeZone: 'Europe/Berlin',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      locale: 'en-US',
    }
    const formatter = new Intl.DateTimeFormat('en-US', options)

    function updateTime() {
      const now = new Date()
      const parts = formatter.formatToParts(now)

      const dateString = `${parts.find((part) => part.type === 'month').value} ${
        parts.find((part) => part.type === 'day').value
      }`
      const hours = parts.find((part) => part.type === 'hour').value
      const minutes = parts.find((part) => part.type === 'minute').value

      // Avoid using innerHTML for performance reasons
      timeElement.textContent = `${dateString}, ${hours}:`
      const colonElement = document.getElementById('colon') || createColonElement()
      colonElement.textContent = minutes

      // Only set the animation once
      if (!colonElement.dataset.initialized) {
        gsap.to(colonElement, {
          opacity: 0.5,
          duration: 1,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })
        colonElement.dataset.initialized = true // Flag to prevent re-initialization
      }
    }

    function createColonElement() {
      const colon = document.createElement('strong')
      colon.id = 'colon'
      timeElement.appendChild(colon)
      return colon
    }

    if (timeElement) {
      updateTime()
      setInterval(updateTime, 1000)
    }
  })
}

export function killCurrentTime() {
  if (ctx) {
    ctx.revert()
  }
}
