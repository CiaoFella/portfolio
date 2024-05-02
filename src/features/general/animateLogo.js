let $ = window.$

import gsap from 'gsap'
import SplitType from 'split-type'

export default function animateLogo() {
  const logoWrap = $('[data-animate=logo-wrap]')
  const logoWords = logoWrap.find('[data-animate=logo-word]')
  const logoWordSplit = new SplitType(logoWords, { types: 'chars' })
  const logoTl = gsap.timeline({ paused: true })
  logoWords.each((index, word) => {
    const chars = $(word).find('.char')
    const initialWordWith = $(word).width()
    const firstCharWidth = $(chars[0]).width()
    const firstCharHeight = $(chars[0]).height()
    $(word).width(firstCharWidth)
    $(word).height(firstCharHeight)
    logoTl.to(
      word,
      {
        width: initialWordWith + 5,
        duration: 0.75,
        ease: 'back.inOut',
      },
      '<'
    )
  })
  logoWrap.on('mouseenter', function () {
    logoTl.play()
  })
  logoWrap.on('mouseleave', function () {
    logoTl.reverse()
  })
  return [logoTl]
}
