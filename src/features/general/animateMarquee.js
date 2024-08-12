let $ = window.$

import { gsap, ScrollTrigger } from '../../vendor.js'

gsap.registerPlugin(ScrollTrigger)

export default function animateMarquee() {
  const marqueeSection = $('.section--marquee')
  const marqueeLineOdd = marqueeSection.find('.marquee-line:nth-child(odd)')
  const marqueeLineEven = marqueeSection.find('.marquee-line:nth-child(even)')
  const marqueeTl = gsap.timeline()
  marqueeTl.fromTo(marqueeLineOdd, { x: '-10rem', y: '0rem', rotateZ: -5 }, { x: '10rem', y: '-7.2rem', rotateZ: -5 })
  marqueeTl.fromTo(marqueeLineEven, { x: '10rem', y: '0rem', rotateZ: -5 }, { x: '-10rem', y: '-7.2rem', rotateZ: -5 }, '0')
  ScrollTrigger.create({
    animation: marqueeTl,
    trigger: marqueeSection,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 0.25,
  })
  return [marqueeTl]
}
