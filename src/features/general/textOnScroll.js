let $ = window.$

import { gsap, ScrollTrigger, SplitType } from '../../vendor.js'
import { bottomClipPath } from '../../utils/variables.js'

gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initTextOnScroll() {
  ctx = gsap.context(() => {
    const elements = document.querySelectorAll('[data-animate=text-in]')
    elements.forEach((element) => {
      const elementSection = element.closest('[class^="section"]')
      const elementSplit = new SplitType(element, {
        types: 'lines,words',
        absolute: true,
      })

      const elementTl = gsap.timeline()

      elementTl.from(elementSplit.lines, {
        clipPath: bottomClipPath,
        yPercent: 100,
        duration: 2,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.2,
      })

      ScrollTrigger.create({
        animation: elementTl,
        trigger: elementSection,
        start: 'top center',
      })
    })
  })
}

export function killTextOnScroll() {
  if (ctx) {
    ctx.revert()
  }
}
