let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'
import { bottomClipPath, centerVerticalClipPath, fullClipPath, topClipPath } from '../../utils/variables'

gsap.registerPlugin(ScrollTrigger)

export default function animateHero() {
  const sectionHero = $('[data-hero]')
  const heroType = sectionHero.data('hero')
  const heroHeadline = sectionHero.find('[data-hero-element=headline]')

  const heroCta = sectionHero.find('[data-hero-element=cta]')
  const heroScrollIndiator = sectionHero.find('[data-hero-element=scroll]')

  const heroParagraph = sectionHero.find('[data-hero-element=paragraph]')
  const heroTeaser = sectionHero.find('[data-hero-element=teaser-wrap]')
  const heroTeaserImg = sectionHero.find('[data-hero-element=teaser-img]')

  const heroTl = gsap.timeline({
    paused: true,
    defaults: { immediateRender: true, duration: 1, ease: 'expo.out' },
  })

  switch (heroType) {
    case 'text':
      const headlineTextSplit = new SplitType(heroHeadline, { types: 'chars' })
      heroTl.to([headlineTextSplit.chars, heroHeadline], { y: 0, duration: 1.5, delay: 0.2, stagger: 0.03 }, 0)
      break
    case 'home':
      const headlineHomeSplit = new SplitType(heroHeadline, { types: 'chars' })
      const paragraphSplit = new SplitType(heroParagraph, { types: 'lines' })
      heroTl
        .to([headlineHomeSplit.chars, heroHeadline], { y: 0, duration: 1, delay: 0.2, stagger: 0.03 }, 0)
        .fromTo(
          heroTeaser,
          { clipPath: centerVerticalClipPath },
          { clipPath: fullClipPath, duration: 1.5, stagger: 0.1 },
          '<+50%'
        )
        .to(heroTeaserImg, { scale: 1.05, stagger: 0.1, duration: 2, ease: 'power2.out' }, '<+10%')
        .fromTo(
          paragraphSplit.lines,
          { clipPath: topClipPath, yPercent: 100 },
          { clipPath: fullClipPath, yPercent: 0, duration: 1.5, stagger: 0.1 },
          '<+25%'
        )
      break
    case 'detail':
      const headlineDetailSplit = new SplitType(heroHeadline, { types: 'chars' })
      heroTl
        .to([headlineDetailSplit.chars, heroHeadline], { y: 0, duration: 1.5, delay: 0.2, stagger: 0.03 }, 0)
        .fromTo(
          $('[data-flip-element=end]:not(.is-hidden)'),
          { clipPath: bottomClipPath },
          { clipPath: fullClipPath, duration: 1.5 },
          '<'
        )
      break
    default:
      break
  }
  // set defaults

  return heroTl
}
