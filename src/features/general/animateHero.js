let $ = window.$

import letterSwitch from './animateLetterSwitch'

import gsap from 'gsap'
import SplitType from 'split-type'
import { bottomClipPath } from '../../utils/variables'

export default function animateHero() {
  const sectionHero = $('.section--hero')
  const heroVideoWrap = sectionHero.find(
    '[data-animate=hero-video-target-wrap]'
  )
  const heroVideo = sectionHero.find('[data-animate=hero-video-target]')
  const heroText = sectionHero.find('[data-animate=letter-switch]')
  const heroItemRight = $(sectionHero).find(
    '[data-animate=hero-item-move][data-move=right]'
  )
  const heroItemLeft = $(sectionHero).find(
    '[data-animate=hero-item-move][data-move=left]'
  )
  const heroDetailWrap = $(sectionHero).find('[data-animate=hero-detail-wrap]')
  const heroLocationWrap = $(sectionHero).find(
    '[data-animate=hero-location-wrap]'
  )
  const heroDetailText = heroDetailWrap.find('p')
  const heroDetailButtons = heroDetailWrap.find('.button')
  const heroLocationText = heroLocationWrap.children()

  const heroTl = gsap.timeline({
    paused: true,
    defaults: { immediateRender: true },
  })

  // set defaults

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
    .from(
      heroItemRight,
      { xPercent: -50, duration: 2, ease: 'expo.inOut' },
      '>'
    )
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

  return heroTl
}
