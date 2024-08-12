let $ = window.$

import { gsap, ScrollTrigger } from '../../vendor.js'

gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initSectionScale() {
  ctx = gsap.context(() => {
    const sectionsIn = $('[data-animate=section-in]')
    const sectionsOutline = $('[data-animate=outline-section]')
    const sectionInTl = gsap.timeline()
    const sectionOutlineTl = gsap.timeline()
    sectionsIn.each((index, section) => {
      const singleSectionTl = gsap.timeline()
      singleSectionTl.from(section, { scale: 0.9, duration: 0.25 })
      ScrollTrigger.create({
        animation: singleSectionTl,
        trigger: section,
        start: 'top 90%',
        end: 'top center',
        scrub: 0.5,
      })
      sectionInTl.add(singleSectionTl)
    })
    sectionsOutline.each((index, section) => {
      const singleOutlineSectionTl = gsap.timeline()
      const outlineWrap = $(section).find('.outline-wrap')
      singleOutlineSectionTl.from(outlineWrap, {
        opacity: 0,
        scale: 1.2,
        ease: 'expo.out',
      })
      ScrollTrigger.create({
        animation: singleOutlineSectionTl,
        trigger: section,
        start: 'top center',
        end: 'bottom 25%',
        scrub: 0.5,
      })
      sectionOutlineTl.add(singleOutlineSectionTl)
    })
    return [sectionInTl, sectionOutlineTl]
  })
}

export function killSectionScale() {
  if (ctx) {
    ctx.revert()
  }
}
