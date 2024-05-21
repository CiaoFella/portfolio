let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { bottomClipPath, fullClipPath, topClipPath } from '../../utils/variables'
import SplitType from 'split-type'
gsap.registerPlugin(ScrollTrigger)

export default function animateAboutTeaser() {
  const section = $('[data-animate-about=teaser-section]')
  const button = section.find('.button')
  const headline = section.find('[data-animate=about-teaser-headline]')
  const imgWrap = section.find('[data-animate=about-teaser-img-wrap]')
  const text = section.find('[data-animate=about-teaser-text]')

  const headlineSplit = new SplitType(headline, { types: 'chars' })
  const textSplit = new SplitType(text, { types: 'lines', absolute: true })

  const aboutTeaserTl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } })

  aboutTeaserTl
    .fromTo(button, { clipPath: topClipPath }, { clipPath: fullClipPath })
    .from(headlineSplit.chars, { yPercent: 100, stagger: 0.01 }, '<')
    .fromTo(
      textSplit.lines,
      { yPercent: 100, clipPath: bottomClipPath },
      { yPercent: 0, clipPath: fullClipPath, stagger: 0.05 },
      '<'
    )
    .fromTo(imgWrap, { clipPath: topClipPath }, { clipPath: fullClipPath }, '<')

  ScrollTrigger.create({
    animation: aboutTeaserTl,
    trigger: section,
    start: 'top bottom',
    end: 'top center',
    toggleActions: 'none play none reset',
  })
}
