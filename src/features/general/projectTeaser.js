let $ = window.$

import { gsap, ScrollTrigger } from '../../vendor.js'

gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initProjectTeaser() {
  ctx = gsap.context(() => {
    const projectTeaserItems = $('[data-animate=project-teaser]')

    projectTeaserItems.each((index, item) => {
      const teaserRevealItems = $(item).find('[data-animate=project-teaser-reveal-item]')

      const teaserTl = gsap.timeline({ paused: true })
      teaserTl.from(teaserRevealItems, { yPercent: 100, stagger: 0.05, duration: 1, ease: 'expo.out' })

      $(item).on('mouseenter', () => {
        teaserTl.timeScale(1).play()
      })
      $(item).on('mouseleave', () => {
        teaserTl.timeScale(2).reverse()
      })
    })
  })
}

export function killProjectTeaser() {
  if (ctx) {
    ctx.revert()
  }
}
