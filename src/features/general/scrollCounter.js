let $ = window.$

import { gsap, ScrollTrigger } from '../../vendor.js'
import helperFunctions from '../../utils/helperFunctions.js'

let ctx

export default function initScrollCounter() {
  ctx = gsap.context(() => {
    const sections = $('[data-scroll-count=section]')
    sections.each((index, section) => {
      const counter = $(section).find('[data-scroll-count=counter]')

      const sectionTl = gsap.timeline()

      counter.each((index, singleCounter) => {
        sectionTl.call(() => helperFunctions.animateCountdown(singleCounter, 4, 0), [], 0.5)
      })

      ScrollTrigger.create({
        animation: sectionTl,
        trigger: section,
        start: 'top bottom',
        end: 'top center',
        toggleActions: 'none play none reset',
      })
    })
  })
}

export function killScrollCounter() {
  if (ctx) {
    ctx.revert()
  }
}
