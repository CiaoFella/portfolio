let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function animateHeroModel() {
  const animationWrap = $('[data-animate="main-model-animation"]')
  const heroModel = $('[data-animate=hero-model]')

  const heroModelTl = gsap.timeline()

  heroModelTl
    .to(heroModel, { xPercent: -35, duration: 1, ease: 'power2.inOut' })
    .to(heroModel, { xPercent: 30, duration: 0.75, ease: 'power2.inOut' })
    .to(heroModel, { y: 200, duration: 0.5, ease: 'power3.inOut' })
    .to(heroModel, { opacity: 0, duration: 0.1 })

  ScrollTrigger.create({
    animation: heroModelTl,
    trigger: animationWrap,
    start: 'top top',
    end: '+=4000',
    scrub: 0,
  })
}
