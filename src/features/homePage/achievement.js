let $ = window.$

import { gsap, ScrollTrigger, SplitType } from '../../vendor.js'
import { fullClipPath, topClipPath } from '../../utils/variables.js'

let ctx

export default function initAchievement() {
  ctx = gsap.context(() => {
    const achievementSection = $('[data-animate=achievement-section]')
    const achievementHeadline = achievementSection.find('[data-animate=achievement-headline]')
    const achievementElements = achievementSection.find('[data-animate=achievement-element]')

    const headlineSplit = new SplitType(achievementHeadline, { types: 'chars,words' })

    const achievementTl = gsap.timeline({ defaults: { duration: 1, ease: 'power1.inOut' } })

    achievementTl.fromTo(
      headlineSplit.chars,
      { clipPath: topClipPath, y: 100 },
      { y: 0, clipPath: fullClipPath, duration: 0.5, stagger: 0.005 },
      0
    )

    achievementElements.each((index, element) => {
      const value = $(element).find('[data-animate=achievement-value]')
      const type = $(element).find('[data-animate=achievement-type]')
      const unit = $(element).find('[data-animate=achievement-unit]')
      const valueSplit = new SplitType(value, { types: 'chars' })
      const typeSplit = new SplitType(type, { types: 'chars' })
      const unitSplit = new SplitType(unit, { types: 'chars' })
      achievementTl
        .from(valueSplit.chars, { y: 125, duration: 1, stagger: 0.01 }, '<+0.5')
        .from(typeSplit.chars, { y: 125, duration: 1, stagger: 0.001 }, '<')
        .from(unitSplit.chars, { y: 125, duration: 1, stagger: 0.001 }, '<')
        .to(unitSplit.chars, { y: -125, duration: 1, stagger: 0.001 }, '>+0.1')
        .to(valueSplit.chars, { y: -125, duration: 1, stagger: 0.01 }, '<')
        .to(typeSplit.chars, { y: -125, duration: 1, stagger: 0.001 }, '<')
    })

    ScrollTrigger.create({
      animation: achievementTl,
      trigger: achievementSection,
      start: 'top center',
      end: 'bottom bottom',
      scrub: 1,
    })
  })
}

export function killAchievement() {
  if (ctx) {
    ctx.revert()
  }
}
