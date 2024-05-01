let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default function animateHeroVideo() {
  gsap.registerPlugin(ScrollTrigger)

  const scrollContainer = $('[data-animate=main-video-wrapper]')
  const targetElement = $('[data-animate=hero-video-target-wrap]')
  const targetWrap = $('[data-animate=hero-video-wrap]')

  const videoScrollTl = gsap.timeline()
  videoScrollTl.to(targetWrap, { xPercent: -20, duration: 0.5 })
  videoScrollTl.to(targetElement, {
    scale: 1,
    duration: 0.25,
    ease: 'back.inOut',
  })
  videoScrollTl.to(targetElement, {
    scale: 0,
    rotateX: -5,
    duration: 1.5,
    ease: 'power1.inOut',
  })

  ScrollTrigger.create({
    animation: videoScrollTl,
    trigger: scrollContainer,
    start: 'top top',
    end: '90% bottom',
    pin: targetWrap,
    pinSpacing: false,
    scrub: 0.5,
  })
}
