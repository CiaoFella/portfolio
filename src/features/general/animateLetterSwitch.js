let $ = window.$

import { gsap, SplitType } from '../../vendor.js'

function setLetterSwitch(item) {
  const letterSwitchElement = $(item)

  // prettier-ignore
  const possibleLetters = [
    'A',
    'B',
    'E',
    'F',
    'H',
    'K',
    'L',
    'N',
    'P',
    'R',
    'S',
    'T',
    'U',
    'V',
    'X',
    'Y',
    'Z',
  ]

  const switchElementSplit = new SplitType(letterSwitchElement, {
    types: 'chars,words',
  })
  $(switchElementSplit.chars).each((index, char) => {
    const currentSwitchElement = $(char).closest('[data-animate=letter-switch]')
    const word = $(char).closest('.word')
    const charWrap = $(document.createElement('div'))
    const randomCharWrap = $(document.createElement('div'))
    let randomLetter = gsap.utils.random(possibleLetters)

    switch ($(char).text()) {
      case 'i':
      case 'I':
        randomLetter = 'I'
        break
      case 'o':
      case 'O':
        randomLetter = 'O'
        break
      case 'v':
      case 'V':
        randomLetter = 'V'
        break
      case 'd':
      case 'D':
        randomLetter = 'D'
        break
      case 'a':
      case 'A':
      case 'r':
      case 'R':
        randomLetter = 'A'
        break
      case 'l':
      case 'L':
        randomLetter = 'L'
        break
      case 'j':
      case 'J':
        randomLetter = 'J'
        break
      case 'w':
      case 'W':
        randomLetter = 'W'
        break
      case 'c':
      case 'C':
        randomLetter = 'C'
        break
    }

    randomCharWrap.addClass('swap-letter')
    randomCharWrap.text(randomLetter)

    currentSwitchElement.append(charWrap)

    charWrap.append(char)
    charWrap.append(randomCharWrap)
    charWrap.addClass('char-wrap')
    word.append(charWrap)
  })
}

function animateLetter(item, delay) {
  const originalLetter = $(item).find('.char')

  const letterTl = gsap.timeline({
    paused: true,
    delay: delay,
    immediateRender: false,
  })

  const randomLetter = $(item).find('.swap-letter')
  const randomDelay = gsap.utils.random(0.1, 0.125, 0.15, 0.175, 0.2)

  letterTl
    .fromTo(
      randomLetter,
      { yPercent: -100 },
      {
        yPercent: 0,
        duration: 0.75,
        stagger: 0.02,
        ease: 'expo.out',
        delay: randomDelay,
      }
    )
    .to(
      randomLetter,
      {
        yPercent: 100,
        duration: 0.75,
        stagger: 0.02,
        ease: 'expo.in',
      },
      '>-0.6'
    )
    .fromTo(
      originalLetter,
      { yPercent: -100 },
      {
        yPercent: 0,
        duration: 0.75,
        stagger: 0.02,
        ease: 'expo.out',
      },
      '<+0.6'
    )

  return letterTl
}

export default { setLetterSwitch, animateLetter }
