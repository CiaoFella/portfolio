let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function animateConnectScroll() {
  const section = $('[data-animate=connect-scroll-section]')
  const leftPath = $(section).find('[data-animate=icon-connect-path][data-direction=left]')
  const rightPath = $(section).find('[data-animate=icon-connect-path][data-direction=right]')
  const leftHeadline = $(section).find('[data-animate=connect-scroll-headline][data-direction=left]')
  const rightHeadline = $(section).find('[data-animate=connect-scroll-headline][data-direction=right]')

  const connectTl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' } })

  connectTl
    .from(leftHeadline, { x: '-15rem' })
    .from(rightHeadline, { x: '15rem' }, '<')
    if (leftPath.length > 0 && rightPath.length > 0) {
      connectTl.from(leftPath, { x: '-5rem', duration: 0.75 }, '<').from(rightPath, { x: '5rem', duration: 0.75 }, '<')
    }
    connectTl.to(leftHeadline, { yPercent: 100, duration: 0.1 })
    connectTl.to(rightHeadline, { yPercent: 100, duration: 0.1 }, '<')


  ScrollTrigger.create({
    animation: connectTl,
    trigger: section,
    start: 'top 90%',
    end: 'bottom 75%',
    scrub: 1,
  })
}
