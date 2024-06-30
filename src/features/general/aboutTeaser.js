let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { bottomClipPath, fullClipPath, topClipPath } from '../../utils/variables'
import SplitType from 'split-type'
gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initAboutTeaser() {
  ctx = gsap.context(() => {
    const section = $('[data-animate-about=teaser-section]')
    const button = section.find('.button')
    const imgWrap = section.find('[data-animate=about-teaser-img-wrap]')
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
      .fromTo(imgWrap, { clipPath: topClipPath }, { clipPath: fullClipPath, duration: 1.5, ease: 'power4.inOut' }, '<-0.2')

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
