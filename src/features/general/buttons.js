let $ = window.$

import { gsap, SplitType } from '../../vendor.js'

let ctx

export default function initButtons() {
  ctx = gsap.context(() => {
    const allNormalButtons = $('.button:not(.is-round)')
    allNormalButtons.each((index, button) => {
      const textOut = $(button).find('.button_text.is-out')
      const textIn = $(button).find('.button_text.is-in')
      const buttonText = $(button).find('.button_text')
      const textOutSplit = new SplitType(textOut, { types: 'chars' })
      const textInSplit = new SplitType(textIn, { types: 'chars' })
      const buttonHoverTl = gsap.timeline({
        paused: true,
        defaults: { stagger: 0.005, ease: 'expo.out' },
      })
      buttonHoverTl
        .to(textOutSplit.chars, { y: '-120%', duration: 0.5 })
        .to(textInSplit.chars, { y: '-100%', duration: 0.4 }, '<+0.1')

      $(button).on('mouseenter', () => {
        buttonHoverTl.timeScale(1).play()
      })
      $(button).on('mouseleave', () => {
        buttonHoverTl.timeScale(1.5).reverse()
      })
    })

    const allRoundButtons = $('.button.is-round')
    allRoundButtons.each((index, roundButton) => {
      const buttonText = $(roundButton).find('.button_text')
      const buttonIcon = $(roundButton).find('.button-icon')
      const buttonSplit = new SplitType(buttonText, { types: 'words' })
      const buttonTl = gsap.timeline({ paused: true })

      buttonTl
        .to(buttonSplit.words, {
          y: '-100%',
          stagger: 0.025,
          duration: 0.75,
          ease: 'expo.inOut',
        })
        .to(
          buttonIcon,
          {
            clipPath: 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)',
            duration: 0.5,
            ease: 'expo.inOut',
          },
          '>-0.4'
        )

      $(roundButton).on('mouseenter', () => {
        buttonTl.timeScale(1).play()
      })
      $(roundButton).on('mouseleave', () => {
        buttonTl.timeScale(1).reverse()
      })
    })
  })
}

export function killButtons() {
  if (ctx) {
    ctx.revert()
  }
}
