import { gsap } from '../../vendor.js'
import { isLandscape, isTablet } from '../../utils/variables.js'

let ctx

const mm = gsap.matchMedia()

export default function initPattern() {
  ctx = gsap.context(() => {
    const patternWrap = document.querySelector('[data-pattern=wrap]')
    const patternElementWraps = patternWrap.querySelectorAll('[data-pattern=element-wrap]')
    let maxDistance = 200 // Adjust the maximum distance for scaling change as needed
    let maxScale = 3 // Maximum scale factor
    let minScale = 1 // Minimum scale factor

    let eventListener = 'mousemove'

    mm.add(isLandscape, () => {
      maxDistance = 100
      maxScale = 2
      minScale = 1
    })

    mm.add(isTablet, () => {
      eventListener = 'touchmove'
    })

    // Add mousemove event listener to change font weight based on mouse position
    window.addEventListener(eventListener, (event) => {
      // Get the mouse position
      const mouseX = event.pageX
      const mouseY = event.pageY

      patternElementWraps.forEach((item) => {
        item.querySelectorAll('[data-pattern=element]').forEach((element) => {
          // Get the center of each character and calculate the distance from the mouse
          const itemRect = element.getBoundingClientRect()
          const itemCenterX = itemRect.left + itemRect.width / 2 + window.scrollX
          const itemCenterY = itemRect.top + itemRect.height / 2 + window.scrollY

          const distance = Math.sqrt(Math.pow(mouseX - itemCenterX, 2) + Math.pow(mouseY - itemCenterY, 2))

          let scale = minScale // Default scale when distance is greater than maxDistance

          if (distance < maxDistance) {
            const scaleRange = maxScale - minScale
            const distanceRatio = 1 - distance / maxDistance // Invert distance ratio
            scale = minScale + scaleRange * distanceRatio
          }

          gsap.to(element, { scale, duration: 0.5, ease: 'power2.out' })
        })
      })
    })
  })
}

export function killPattern() {
  if (ctx) {
    ctx.revert()
  }
}
