let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initList() {
  ctx = gsap.context(() => {
    const listSections = $('.section--list')
    const listItemsTl = gsap.timeline()
    const listOutlineTl = gsap.timeline()
    listSections.each((index, section) => {
      const listChildren = $(section).find('.list_list-item-inner')
      const headline = $(section).find('h2')
      const listTl = gsap.timeline()
      ScrollTrigger.create({
        animation: listTl,
        trigger: section,
        start: 'top bottom',
        end: 'bottom 25%',
        scrub: 0.5,
        // toggleActions: 'play none none none',
      })
      listTl.from([headline, listChildren], {
        yPercent: 100,
        stagger: 0.1,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.5,
      })
      listItemsTl.add(listTl)
    })
    return [listItemsTl, listOutlineTl]
  })
}

export function killList() {
  if (ctx) {
    ctx.revert()
  }
}
