let $ = window.$

import gsap from 'gsap'
import SplitType from 'split-type'

import { varBlack } from '../../utils/variables'

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

      if ($(button).hasClass('is-background')) {
      } else {
        const buttonBackground = $(button).find('.button_background')
        if (buttonBackground) {
          buttonHoverTl.to(
            buttonText,
            {
              color: varBlack,
              duration: 0.2,
              ease: 'expo.out',
            },
            '<'
          )
          buttonHoverTl.fromTo(
            buttonBackground,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.2,
              ease: 'expo.out',
            },
            '<'
          )
        }
      }

      $(button).on('mouseenter', () => {
        buttonHoverTl.play()
      })
      $(button).on('mouseleave', () => {
        buttonHoverTl.reverse()
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
