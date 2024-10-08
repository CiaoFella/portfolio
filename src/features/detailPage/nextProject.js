let $ = window.$

import { gsap, ScrollTrigger, barba } from '../../vendor.js'
import lenis from '../../utils/smoothScroll.js'

let ctx

export default function initNextProject() {
  ctx = gsap.context(() => {
    const section = $('[data-animate=next-project-section]')
    const progressBar = section.find('[data-animate=next-project-progress-bar]')
    const hideItems = section.find('[data-animate=next-project-hide]')
    const indicatorBar = section.find('[data-animate=next-project-indicator]')

    const linkTarget = section.find('[data-animate=next-project-target]').attr('href')
    const baseUrl = window.location.origin

    if (!linkTarget) {
      console.error('linkTarget is not defined or is invalid')
      return
    }

    const nextProjectUrl = new URL(linkTarget, baseUrl).href

    const scrollTl = gsap.timeline()
    const leaveTl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: 'power2.inOut' },
    })

    leaveTl
      .to(hideItems, {
        yPercent: -100,
        stagger: 0.1,
      })
      .to(indicatorBar, { width: 0 }, '<+0.5')

    ScrollTrigger.create({
      animation: scrollTl,
      trigger: section,
      onUpdate: (self) => {
        gsap.to(progressBar, { width: `${self.progress * 100}%` })
      },
      onLeave: async () => {
        leaveTl.time(0)
        await leaveTl.play()
        barba.go(nextProjectUrl)
        setTimeout(() => {
          lenis.scrollTo(0, { immediate: true })
        }, 100)
      },
      start: 'top center',
      end: '99% bottom',
      scrub: true,
    })
  })
}

export function killNextProject() {
  if (ctx) {
    ctx.revert()
  }
}
