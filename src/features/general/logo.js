let $ = window.$

import { gsap } from '../../vendor.js'

let ctx

export default function initLogo() {
  ctx = gsap.context(() => {
    const logo = $('[data-animate=logo]')
    const pathLeft = logo.find('[data-animate=logo-path-left]')
    const pathRight = logo.find('[data-animate=logo-path-right]')

    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: 'back.inOut' }, paused: true })
    tl.to(pathLeft, { xPercent: -35 }).to(pathRight, { xPercent: 35 }, '<')

    logo.on('mouseenter', () => {
      tl.play()
    })
    logo.on('mouseleave', () => {
      tl.reverse()
    })
  })
}

export function killLogo() {
  if (ctx) {
    ctx.revert()
  }
}
