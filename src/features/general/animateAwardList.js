let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'
import { bottomClipPath, centerClipPath, fullClipPath, leftClipPath } from '../../utils/variables'
import animateCountdown from './animateCountdown'

gsap.registerPlugin(ScrollTrigger)

export default function animateAwardList() {
  const section = $('[data-animate=award-list-wrap]')
  const items = section.find('[data-animate=award-list-item]')
  const divider = section.find('[data-animate=divider]')
  const count = section.find('[data-animate=award-count]')
  const headline = section.find('[data-animate=award-headline]')

  const headlineSplit = new SplitType(headline, { types: 'lines' })

  const awardTl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } })

  awardTl
    .from(items, { yPercent: 100, delay: 0.2, stagger: 0.025 })
    .fromTo(divider, { clipPath: leftClipPath }, { clipPath: fullClipPath, duration: 1.5 }, '<')
    .fromTo(headlineSplit.lines, { yPercent: 100, clipPath: bottomClipPath }, { yPercent: 0, clipPath: fullClipPath, stagger: 0.1 }, '<')
    .call(() => animateCountdown(count, 5), [], 0)

  ScrollTrigger.create({
    animation: awardTl,
    trigger: section,
    start: 'top bottom',
    toggleActions: 'play none none none',
  })
}
