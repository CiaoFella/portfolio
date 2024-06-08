let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { fullClipPath, topClipPath } from '../../utils/variables'
import SplitType from 'split-type'

let ctx

export default function initDetailDescription() {
  ctx = gsap.context(() => {
    const section = $('[data-animate=detail-description]')
    const horizontalDivider = section.find('[data-animate=divider][data-direction=horizontal]')
    const revealItems = section.find('[data-animate=detail-description-item]')
    const revealText = section.find('[data-animate=detail-description-text]')

    const textSplit = new SplitType(revealText, { types: 'lines' })

    const detailDescriptionTl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } })

    detailDescriptionTl
      .from(horizontalDivider, { width: 0 })
      .from(revealItems, { yPercent: 100, stagger: 0.05 }, '<')
      .fromTo(
        textSplit.lines,
        { clipPath: topClipPath, yPercent: 100 },
        { clipPath: fullClipPath, yPercent: 0, stagger: 0.1 },
        '<+0.25'
      )
    ScrollTrigger.create({
      animation: detailDescriptionTl,
      trigger: section,
      start: 'top bottom',
      end: 'top center',
      toggleActions: 'none play none reset',
    })
  })
}

export function killDetailDescription() {
  if (ctx) {
    ctx.revert()
  }
}
