let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

let ctx

export default function initFullScreenImage() {
  ctx = gsap.context(() => {
    const sections = $('[data-animate=full-screen-image-section]')

    sections.each((index, section) => {
      const image = $(section).find('[data-animate=full-screen-image-img]')

      const imageTl = gsap.timeline()

      imageTl.fromTo(image, { yPercent: -10 }, { yPercent: 10, duration: 1, ease: 'none' })

      ScrollTrigger.create({
        animation: imageTl,
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      })
    })
  })
}

export function killFullScreenImage() {
  if (ctx) {
    ctx.revert()
  }
}
