let $ = window.$

import { gsap, ScrollTrigger, SplitType } from '../../vendor.js'
import { bottomClipPath, fullClipPath } from '../../utils/variables.js'

gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initTextContent() {
  ctx = gsap.context(() => {
    const section = $('[data-animate=text-content-section]')
    const headline = section.find('[data-animate=text-content-headline]')
    const text = section.find('[data-animate=text-content-text]')

    const headlineSplit = new SplitType(headline, { types: 'chars' })
    const textSplit = new SplitType(text, { types: 'lines' })

    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } })

    tl.from(headlineSplit.chars, { yPercent: 100, stagger: 0.025 }).fromTo(
      textSplit.lines,
      { yPercent: 100, clipPath: bottomClipPath },
      { yPercent: 0, clipPath: fullClipPath, stagger: 0.1 },
      '<+0.2'
    )

    ScrollTrigger.create({
      animation: tl,
      trigger: section,
      start: 'top bottom',
      end: 'top center',
      toggleActions: 'none play none reset',
    })
  })
}

export function killTextContent() {
  if (ctx) {
    ctx.revert()
  }
}
