import { gsap } from '../../vendor.js'

let ctx
let timeElement

export default function initCurrentTime() {
  ctx = gsap.context(() => {
    // Find the time element once and store it
    const timeElement = document.querySelector('[data-time=element]')

    if (!timeElement) return

    function formatRomeTime() {
      const now = new Date()

      // Format date and time separately
      const dateOptions = { timeZone: 'Europe/Rome', month: 'long', day: 'numeric' }
      const timeOptions = { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit', hour12: false }

      const dateInRome = now.toLocaleDateString('en-US', dateOptions)
      const timeInRome = now.toLocaleTimeString('en-US', timeOptions)

      // Extract date and time
      const [monthDay, day] = dateInRome.split(' ')
      const [hours, minutes] = timeInRome.split(':')

      // Add day suffix
      const daySuffix = getDaySuffix(parseInt(day, 10))

      // Construct formatted time
      const formattedTime = `${monthDay} ${day}${daySuffix} ${hours}:${minutes}`

      return formattedTime.replace(':', '<span class="colon">:</span>')
    }

    function getDaySuffix(day) {
      if (day > 3 && day < 21) return 'th'
      switch (day % 10) {
        case 1:
          return 'st'
        case 2:
          return 'nd'
        case 3:
          return 'rd'
        default:
          return 'th'
      }
    }

    function updateTime(element) {
      element.innerHTML = formatRomeTime()

      // GSAP animation for the colon
      gsap.fromTo('.colon', { opacity: 0 }, { opacity: 1, duration: 0.8, repeat: -1, yoyo: true })
    }

    // Initial time setting
    updateTime(timeElement)

    // Update time every minute without blocking page load
    setInterval(() => updateTime(timeElement), 60000)
  })
}

export function killCurrentTime() {
  if (ctx) {
    ctx.revert()
  }
}
