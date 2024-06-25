let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initFooter() {
  ctx = gsap.context(() => {
    const footerSection = $('[data-animate=footer-section]')
    const footerElement = footerSection[footerSection.length - 1]
    const footerGroups = footerSection.find('[data-animate=footer-group]')
    const endOfPage = $('[data-animate=end-of-page]')
    const endOfPageElement = endOfPage[endOfPage.length - 1]

    const footerTl = gsap.timeline({ defaults: { duration: 1, ease: 'expo.out' } })
    const pageScaleTl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' }, immediateRender: false })

    gsap.set(endOfPageElement, { yPercent: 0 })

    if (endOfPage.length > 0) {
      pageScaleTl.to(endOfPageElement, { yPercent: 7.5 })
    }

    ScrollTrigger.create({
      animation: pageScaleTl,
      trigger: footerElement,
      start: 'top bottom',
      end: 'top top',
      scrub: 0.5,
    })

    ScrollTrigger.create({
      animation: footerTl,
      trigger: footerElement,
      start: 'top 25%',
      end: 'bottom bottom',
      toggleActions: 'play none none none',
    })

    footerGroups.each((index, group) => {
      const groupHeadline = $(group).find('[data-animate=footer-headline]')
      const groupItems = $(group).find('[data-animate=footer-item]')

      const headlineSplit = new SplitType(groupHeadline, { types: 'chars' })

      footerTl
        .from(
          headlineSplit.chars,
          {
            yPercent: 100,
            rotateZ: 2.5,
            stagger: 0.01,
          },
          '<+0.1'
        )
        .from(groupItems, { yPercent: 100, stagger: 0.075 }, '<')
    })
  })
}

export function killFooter() {
  if (ctx) {
    ctx.revert()
    endOfPage = null
    footerTl = null
  }
}
