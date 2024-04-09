let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function myPhilosophy() {
  const myPhilosophyWrap = $('[data-animate=my-philosophy-wrap]')
  const myPhilosophyHeadline = myPhilosophyWrap.find('h2')
  const myPhilosophModelWrap = myPhilosophyWrap.find(
    '[data-animate=my-philosophy-model-wrap]'
  )
  const myPhilosophModel = myPhilosophyWrap.find(
    '[data-animate=my-philosophy-model]'
  )
  const myPhilosophSteps = myPhilosophyWrap.find(
    '[data-animate=my-philosophy-step]'
  )
  const myPhilosophyTl = gsap.timeline({ defaults: { ease: 'power1.inOut' } })
  myPhilosophyTl
    .from(myPhilosophModel, { yPercent: -100, duration: 0.5 })
    .from(myPhilosophyHeadline, { yPercent: -100, duration: 0.2 })
    .to(myPhilosophModelWrap, { xPercent: 25, duration: 0.25 }, '<')
    .from($(myPhilosophSteps[0]).children(), {
      y: '-10rem',
      opacity: 0,
      duration: 0.2,
    })
    .to(myPhilosophModelWrap, { xPercent: -25, duration: 0.25 }, '<')
    .to(myPhilosophModelWrap, { xPercent: 0, duration: 0.5 })
    .from(
      $(myPhilosophSteps[1]).children(),
      { y: '-10rem', opacity: 0, duration: 0.2 },
      '>-0.3'
    )
    .from(
      $(myPhilosophSteps[2]).children(),
      {
        y: '-10rem',
        opacity: 0,
        duration: 0.2,
      },
      '>+0.15'
    )
    .to(myPhilosophModelWrap, { yPercent: 100, duration: 0.75 }, '<')
  ScrollTrigger.create({
    animation: myPhilosophyTl,
    trigger: myPhilosophyWrap,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  })

  return [myPhilosophyTl]
}
