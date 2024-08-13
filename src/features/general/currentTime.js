let $ = window.$
import { gsap } from '../../vendor.js'

let ctx
let timeElement
let formatter
let colonAnimation

export default function initCurrentTime() {
  // Create the formatter once and reuse it
  formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  // Find the time element once and store it
  timeElement = document.querySelector('[data-time=element]')

  if (!timeElement) return

  ctx = gsap.context(() => {
    function updateTime() {
      const now = new Date()
      const parts = formatter.formatToParts(now)

      const dateString = `${parts.find((part) => part.type === 'month').value} ${
        parts.find((part) => part.type === 'day').value
      }`
      const hours = parts.find((part) => part.type === 'hour').value
      const minutes = parts.find((part) => part.type === 'minute').value

      timeElement.innerHTML = `${dateString}, ${hours}<strong id="colon">:</strong>${minutes}`

      // Start the GSAP animation once, if it's not already running
      if (!colonAnimation) {
        colonAnimation = gsap.to('#colon', {
          opacity: 0.5,
          duration: 1,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })
      }
    }

    // Use requestAnimationFrame for more efficient updates
    function tick() {
      updateTime()
      requestAnimationFrame(tick)
    }

    // Start updating the time
    tick()
  })
}

export function killCurrentTime() {
  if (ctx) {
    ctx.revert()
  }
  if (colonAnimation) {
    colonAnimation.kill()
    colonAnimation = null
  }
}
