let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'
import { bottomClipPath, centerVerticalClipPath, fullClipPath, leftClipPath, topClipPath } from '../../utils/variables'

gsap.registerPlugin(ScrollTrigger)

export default function animateHero() {
  const sectionHero = $('[data-hero]')
  const heroType = sectionHero.data('hero')
  const heroHeadline = sectionHero.find('[data-hero-element=headline]')

  const heroParagraph = sectionHero.find('[data-hero-element=paragraph]')
  const heroTeaser = sectionHero.find('[data-hero-element=teaser-wrap]')
  const heroTeaserImg = sectionHero.find('[data-hero-element=teaser-img]')

  const heroTl = gsap.timeline({
    paused: true,
    defaults: { immediateRender: true, duration: 1, ease: 'expo.out' },
  })

  heroTl.set(heroHeadline, { visibility: 'visible' }, 0)

  switch (heroType) {
    case 'text':
      const headlineTextSplit = new SplitType(heroHeadline, { types: 'chars' })
      heroTl.to([headlineTextSplit.chars, heroHeadline], { y: 0, duration: 1.5, delay: 0.2, stagger: 0.03 }, 0)
      break
    case 'home':
      const headlineHomeSplit = new SplitType(heroHeadline, { types: 'chars' })
      const paragraphSplit = new SplitType(heroParagraph, { types: 'lines' })
      const heroPattern = $('[data-hero-element=pattern]')
      const trustElements = $('[data-hero-element=trust]')
      const patternLines = heroPattern.find('[data-pattern=line]')
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
        .to(trustElements, { y: 0, duration: 1, stagger: 0.1 }, '>-50%')
      patternLines.each((index, line) => {
        const elements = $(line).find('[data-pattern=element-wrap]')
        heroTl.to(elements, { scale: 1, duration: 2, stagger: 0.025, ease: 'power2.out' }, '<')
      })

      heroTeaserImg.each((index, teaserImg) => {
        const heroInteractionTl = gsap.timeline({ paused: true, defaults: { duration: 0.75, ease: 'power3.inOut' } })
        heroInteractionTl.to(teaserImg, { scale: 1.1 })
        $(teaserImg).on('mouseenter', function () {
          heroInteractionTl.play()
        })
        $(teaserImg).on('mouseleave', function () {
          heroInteractionTl.reverse()
        })
      })
      break
    case 'detail':
      const headlineDetailSplit = new SplitType(heroHeadline, { types: 'chars' })
      const endFlipElement = $('[data-flip-element=end]:not(.is-hidden)')
      heroTl.to([headlineDetailSplit.chars, heroHeadline], { y: 0, duration: 1.5, delay: 0.2, stagger: 0.03 }, 0)
      endFlipElement.length > 0
        ? heroTl.fromTo(
            $('[data-flip-element=end]:not(.is-hidden)'),
            { clipPath: bottomClipPath },
            { clipPath: fullClipPath, duration: 1.5 },
            '<'
          )
        : null
      break
    default:
      break
  }
  // set defaults

  return heroTl
}
