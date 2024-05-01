let $ = window.$

import gsap from 'gsap'
import SplitType from 'split-type'

export default function animateTextSlide(items, duration) {
  $(items).each((index, wrap) => {
    const typeData = $(wrap).data('slideType')

    const textOut = $(wrap).find('[data-animate=text-slide-out]')
    const textIn = $(wrap).find('[data-animate=text-slide-in]')

    const textOutWidth = textOut.width()
    const textInWidth = textIn.width()

    const biggerWith = Math.max(textOutWidth, textInWidth)

    const slideOutSplit = new SplitType(textOut, { types: 'chars' })
    const slideInSplit = new SplitType(textIn, { types: 'chars' })

    const textSlideTl = gsap.timeline({
      defaults: { stagger: 0.005, duration: duration, ease: 'expo.inOut' },
    })
    textSlideTl.set(wrap, { width: biggerWith, duration: 0 })
    switch (typeData) {
      case 'bottom':
        textSlideTl
          .to(slideOutSplit.chars, {
            yPercent: -100,
          })
          .to(
            slideInSplit.chars,
            {
              yPercent: -100,
            },
            '<'
          )
        break

      case 'top':
        textSlideTl.to(slideOutSplit.chars, {
          yPercent: 100,
        })
        textSlideTl.to(
          slideInSplit.chars,
          {
            yPercent: 100,
          },
          '<'
        )
        break
    }

    return textSlideTl
  })
}
