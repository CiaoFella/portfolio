let $ = window.$

import { gsap } from '../../vendor.js'
import { fullClipPath, leftQuarterClipPath, rightQuarterClipPath } from '../../utils/variables.js'

let ctx

export default function initIcons() {
  ctx = gsap.context(() => {
    const allIcons = $('[data-animate-icon]')
    allIcons.each((index, singleIcon) => {
      let icon
      if ($(singleIcon).children().length > 1) {
        icon = $(singleIcon).find('[data-icon]')
      } else {
        icon = singleIcon
      }

      const iconName = $(singleIcon).data('animateIcon')
      const iconTl = gsap.timeline({ paused: true, defaults: { duration: 0.75 } })
      switch (iconName) {
        case 'star':
          iconTl.to(icon, { scale: 0.5, ease: 'back.inOut' })
          break

        case 'wheel':
          iconTl.to(icon, { rotateZ: 90, ease: 'back.inOut' })
          break
        case 'price':
          iconTl.to(icon, { rotateZ: 180, ease: 'back.inOut' })
          break
        case 'flower':
          iconTl.to(icon, { rotateZ: 45, ease: 'back.inOut' })
          break
        case 'menu':
          iconTl.fromTo(
            icon,
            { clipPath: fullClipPath },
            { clipPath: leftQuarterClipPath, duration: 0.5, ease: 'back.inOut' }
          )
          break
        case 'external':
          iconTl.to(icon, { xPercent: 10, ease: 'back.inOut' })
          break
      }

      $(singleIcon).on('mouseenter', function () {
        iconTl.play()
      })
      $(singleIcon).on('mouseleave', function () {
        iconTl.reverse()
      })
    })
  })
}

export function killIcons() {
  if (ctx) {
    ctx.revert()
  }
}
