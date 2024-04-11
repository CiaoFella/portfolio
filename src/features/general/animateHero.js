let $ = window.$

import letterSwitch from './animateLetterSwitch'

import gsap from 'gsap'
import SplitType from 'split-type'
import { bottomClipPath } from '../../utils/variables'
import app from '../homePage/initHeroModel'

export default function animateHero() {
  const sectionHero = document.querySelector('.section--hero')
  const heroText = $('[data-animate=letter-switch]')
  const heroModel = sectionHero.querySelector(
    '[data-animate=hero-model] canvas'
  )
  const heroItemRight = $(sectionHero).find(
    '[data-animate=hero-item-move][data-move=right]'
  )
  const heroItemLeft = $(sectionHero).find(
    '[data-animate=hero-item-move][data-move=left]'
  )
  const heroItemRightDecorativeItem = heroItemRight.find(
    '[data-animate=hero-decorative-item]'
  )
  const heroItemLeftDecorativeItem = heroItemLeft.find(
    '[data-animate=hero-decorative-item]'
  )
  const heroDetailWrap = $(sectionHero).find('[data-animate=hero-detail-wrap]')
  const heroDetailText = heroDetailWrap.find('p')
  const heroDetailButtons = heroDetailWrap.find('.button')

  const heroTl = gsap.timeline()

  letterSwitch.setLetterSwitch(heroText)
  heroTl.call(() => letterSwitch.animateLetter(heroText, 1).play())

  if (heroModel) {
    heroTl.call(() => app.emitEvent('keyDown', 'Main'), [], 0.5)
  }

  heroTl
    .from(
      heroItemRight,
      { xPercent: -25, duration: 2, ease: 'expo.inOut' },
      '>+1'
    )
    .from(
      heroItemLeft,
      { xPercent: 25, duration: 2, ease: 'expo.inOut' },
      '<+0.1'
    )
    .from(
      heroItemRightDecorativeItem.children(),
      {
        yPercent: -100,
        duration: 1.5,
        stagger: 0.1,
        ease: 'expo.out',
      },
      '>-1'
    )
    .from(
      heroItemLeftDecorativeItem.children(),
      { yPercent: 100, duration: 1.5, stagger: 0.1, ease: 'expo.out' },
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
      '<+0.5'
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

  return []
}
