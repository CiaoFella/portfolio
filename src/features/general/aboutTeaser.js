let $ = window.$

import { gsap, ScrollTrigger, SplitType } from '../../vendor.js'
import { bottomClipPath, fullClipPath, isDesktop, isLandscape, topClipPath } from '../../utils/variables.js'

let ctx

const mm = gsap.matchMedia()

export default function initAboutTeaser() {
  ctx = gsap.context(() => {
    const section = $('[data-animate-about=teaser-section]')
    const button = section.find('.button')
    const imgWrap = section.find('[data-animate=about-teaser-img-wrap]')
    const img = section.find('[data-img=about-teaser]')
    const text = section.find('[data-animate=about-teaser-text]')

    const textSplit = new SplitType(text, { types: 'lines', absolute: true })

    const aboutTeaserTl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } })

    aboutTeaserTl
      .fromTo(button, { clipPath: topClipPath }, { clipPath: fullClipPath })
      .fromTo(
        textSplit.lines,
        { yPercent: 100, clipPath: bottomClipPath },
        { yPercent: 0, clipPath: fullClipPath, stagger: 0.05 },
        '<'
      )

    mm.add(isDesktop, () => {
      aboutTeaserTl.fromTo(
        imgWrap,
        { clipPath: topClipPath },
        { clipPath: fullClipPath, duration: 1.5, ease: 'power4.inOut' },
        '<-0.2'
      )
    })
    mm.add(isLandscape, () => {
      aboutTeaserTl.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power4.inOut' }, '<-0.2')
    })

    ScrollTrigger.create({
      animation: aboutTeaserTl,
      trigger: section,
      start: 'top bottom',
      end: 'top center',
      toggleActions: 'none play none reset',
    })
  })
}

export function killAboutTeaser() {
  if (ctx) {
    ctx.revert()
  }
}
