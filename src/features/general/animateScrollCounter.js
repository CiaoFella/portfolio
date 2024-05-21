let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import helperFunctions from '../../utils/helperFunctions'
gsap.registerPlugin(ScrollTrigger)

export default function animateScrollCounter() {
  const sections = $('[data-scroll-count=section]')

  sections.each((index, section) => {
    const counter = $(section).find('[data-scroll-count=counter]')

    const sectionTl = gsap.timeline()
    counter.each((index, singleCounter) => {
      sectionTl.call(() => helperFunctions.animateCountdown(singleCounter, 4, 0), [], 0.5)
    })

    ScrollTrigger.create({
      animation: sectionTl,
      trigger: section,
      start: 'top bottom',
      end: 'top center',
      toggleActions: 'none play none reset',
    })
  })
}
