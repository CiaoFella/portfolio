let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function myProcess() {
  const myProcessWrap = $('[data-animate=my-process-wrap]')
  const myProcessHeadline = myProcessWrap.find('h2')
  const myProcessModel = myProcessWrap.find('[data-animate=my-process-model]')
  const myProcessSteps = myProcessWrap.find('[data-animate=my-process-step]')
  const myProcessTl = gsap.timeline()
  myProcessTl
    .fromTo(
      myProcessModel,
      { xPercent: -50 },
      {
        xPercent: 0,
        duration: 3,
      }
    )
    .from(
      myProcessHeadline,
      {
        yPercent: 100,
        duration: 2,
        ease: 'power1.inOut',
      },
      '<'
    )

  myProcessSteps.each((index, step) => {
    const stepChildren = $(step).children()
    myProcessTl.fromTo(
      stepChildren,
      {
        yPercent: 100,
        opacity: 0,
        filter: 'blur(2.5px)',
        rotateZ: 2,
      },
      {
        yPercent: 0,
        filter: 'blur(0px)',
        rotateZ: 0,
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
        stagger: 0.05,
      },
      '>'
    )
  })
  ScrollTrigger.create({
    animation: myProcessTl,
    trigger: myProcessWrap,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
  })
}
