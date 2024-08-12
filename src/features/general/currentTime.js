let $ = window.$

import { gsap } from '../../vendor.js'

let ctx

export default function initCurrentTime() {
  ctx = gsap.context(() => {
    let timeElement
    timeElement = document.querySelectorAll('[data-time=element]')

    timeElement.length > 1 ? (timeElement = timeElement[timeElement.length - 1]) : (timeElement = timeElement[0])

    function updateTime() {
      const now = new Date()
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
      const parts = formatter.formatToParts(now)

      const dateString = `${parts.find((part) => part.type === 'month').value} ${
        parts.find((part) => part.type === 'day').value
      }`
      const hours = parts.find((part) => part.type === 'hour').value
      const minutes = parts.find((part) => part.type === 'minute').value

      timeElement.innerHTML = `${dateString}, ${hours}<strong id="colon">:</strong>${minutes}`

      if ($('#colon').length > 0) {
        gsap.to('#colon', {
          opacity: 0.5,
          duration: 1,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })
      }
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
