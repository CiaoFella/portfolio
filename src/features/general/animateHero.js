import letterSwitch from './animateLetterSwitch'

let $ = window.$

export default function animateHero() {
  const heroText = $('[data-animate=letter-switch]')
  letterSwitch.setLetterSwitch(heroText)
  return [letterSwitch.animateLetter(heroText).play()]
}
