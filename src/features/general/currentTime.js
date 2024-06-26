let $ = window.$

import gsap from 'gsap'

let ctx

export default function initCurrentTime() {
  const timeElement = document.querySelector('[data-time=element]')

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

    gsap.to('#colon', {
      opacity: 0,
      duration: 0.5,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })
  }

  updateTime()
  setInterval(updateTime, 1000)
}

export function killCurrentTime() {
  if (ctx) {
    ctx.revert()
  }
}
