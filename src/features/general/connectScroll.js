let $ = window.$

import { gsap, ScrollTrigger } from '../../vendor.js'

let ctx

export default function initConnectScroll() {
  ctx = gsap.context(() => {
    const section = $('[data-animate=connect-scroll-section]')
    section.each((index, item) => {
      const leftPath = $(item).find('[data-animate=icon-connect-path][data-direction=left]')
      const rightPath = $(item).find('[data-animate=icon-connect-path][data-direction=right]')
      const leftHeadline = $(item).find('[data-animate=connect-scroll-headline][data-direction=left]')
      const rightHeadline = $(item).find('[data-animate=connect-scroll-headline][data-direction=right]')

      const connectTl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' } })

      connectTl.from(leftHeadline, { x: '-20vw' }).from(rightHeadline, { x: '20vw' }, '<')
      if (leftPath.length > 0 && rightPath.length > 0) {
        connectTl.from(leftPath, { x: '-5rem', duration: 0.75 }, '<').from(rightPath, { x: '5rem', duration: 0.75 }, '<')
      }

      ScrollTrigger.create({
        animation: connectTl,
        trigger: item,
        start: 'top 80%',
        end: 'bottom 75%',
        scrub: 1,
      })
    })
  })
}

export function killConnectScroll() {
  if (ctx) {
    ctx.revert()
  }
}
