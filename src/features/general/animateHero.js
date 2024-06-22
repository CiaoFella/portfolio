let $ = window.$

import letterSwitch from './animateLetterSwitch'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'
import {
  bottomClipPath,
  centerHorizontalClipPath,
  centerVerticalClipPath,
  fullClipPath,
  topClipPath,
} from '../../utils/variables'

gsap.registerPlugin(ScrollTrigger)

export default function animateHero() {
  const sectionHero = $('[data-hero]')
  const heroType = sectionHero.data('hero')
  const heroHeadline = sectionHero.find('[data-hero-element=headline]')

  const heroVideoOuter = sectionHero.find('[data-hero-element=video-outer]')
  const heroVideoWrap = sectionHero.find('[data-hero-element=video-wrap]')
  const heroVideo = sectionHero.find('[data-hero-element=video]')
  const heroCta = sectionHero.find('[data-hero-element=cta]')
  const heroScrollIndiator = sectionHero.find('[data-hero-element=scroll]')

  const heroText = sectionHero.find('[data-animate=letter-switch]')
  const heroParagraph = sectionHero.find('[data-hero-element=paragraph]')
  const heroTeaser = sectionHero.find('[data-hero-element=teaser-wrap]')
  const heroTeaserImg = sectionHero.find('[data-hero-element=teaser-img]')
  const heroItemRight = $(sectionHero).find('[data-animate=hero-item-move][data-move=right]')
  const heroItemLeft = $(sectionHero).find('[data-animate=hero-item-move][data-move=left]')

  const heroDetailWrap = $(sectionHero).find('[data-animate=hero-detail-wrap]')
  const heroLocationWrap = $(sectionHero).find('[data-animate=hero-location-wrap]')
  const heroDetailText = heroDetailWrap.find('p')
  const heroDetailButtons = heroDetailWrap.find('.button')
  const heroLocationText = heroLocationWrap.children()

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
        .fromTo(heroVideoOuter, { clipPath: bottomClipPath }, { clipPath: fullClipPath }, '>-25%')
        .fromTo(heroCta, { clipPath: bottomClipPath }, { clipPath: fullClipPath }, '<')
        .to(heroScrollIndiator, { y: 0 }, '<')
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
    case 'video':
      letterSwitch.setLetterSwitch(heroText)
      heroTl.call(() => letterSwitch.animateLetter(heroText, 1).play(), [], 0)

      heroTl
        .fromTo(
          heroVideo,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.5,
            ease: 'expo.inOut',
          },
          0 - 0.5
        )
        .from(heroItemRight, { xPercent: -50, duration: 2, ease: 'expo.inOut' }, '>')
        .from(heroItemLeft, { xPercent: 50, duration: 2, ease: 'expo.inOut' }, '<')
        .from(
          heroVideoWrap,
          {
            xPercent: -20,
            duration: 2,
            ease: 'expo.inOut',
          },
          '<'
        )

      if (heroDetailText.length > 0) {
        const heroDetailTextSplit = new SplitType(heroDetailText, {
          types: 'lines',
        })
        heroTl.from(
          heroDetailTextSplit.lines,
          {
            clipPath: bottomClipPath,
            yPercent: 100,
            duration: 2,
            stagger: 0.1,
            ease: 'expo.out',
          },
          '>'
        )
      }

      if (heroDetailButtons.length > 0) {
        heroTl.from(
          heroDetailButtons,
          {
            yPercent: 110,
            duration: 1,
            stagger: 0.05,
            ease: 'expo.out',
          },
          '<+0.5'
        )
      }

      if (heroLocationWrap.length > 0) {
        heroTl.from(
          heroLocationText,
          {
            yPercent: 110,
            duration: 1,
            stagger: 0.05,
            ease: 'expo.out',
          },
          '<'
        )
      }
      break
    default:
      break
  }
  // set defaults

  return heroTl
}
