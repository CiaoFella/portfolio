let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'
import { bottomClipPath, centerHorizontalClipPath, centerVerticalClipPath, fullClipPath } from '../../utils/variables'
import helperFunctions from '../../utils/helperFunctions'

gsap.registerPlugin(ScrollTrigger)

export default function animateAwardList() {
  const section = $('[data-animate=award-list-section]')
  const items = section.find('[data-animate=award-list-single]')
  const dividerHorizontal = section.find('[data-animate=divider][data-direction=horizontal]')
  const count = section.find('[data-animate=award-count]')
  const headline = section.find('[data-animate=award-headline]')
  const scrollIcon = section.find('[data-animate=award-list-scroll-icon]')

  const headlineSplit = new SplitType(headline, { types: 'lines' })

  const awardTl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } })
  const scrubTl = gsap.timeline()

  awardTl
    .from(items, { yPercent: 100, delay: 0.2, stagger: 0.05 })
    .fromTo(dividerHorizontal, { clipPath: centerHorizontalClipPath }, { clipPath: fullClipPath, duration: 1.5 }, '<')
    .fromTo(
      headlineSplit.lines,
      { yPercent: 100, clipPath: bottomClipPath },
      { yPercent: 0, clipPath: fullClipPath, stagger: 0.1 },
      '<'
    )
    .call(() => helperFunctions.animateCountdown(count, 3, 0), [], 0)

  scrubTl.to(scrollIcon, { rotateZ: 720, duration: 1 })

  ScrollTrigger.create({
    animation: scrubTl,
    trigger: section,
    start: 'top center',
    end: 'bottom top',
    scrub: 1,
  })

  ScrollTrigger.create({
    animation: awardTl,
    trigger: section,
    start: 'top bottom',
    toggleActions: 'play none none none',
  })
}
