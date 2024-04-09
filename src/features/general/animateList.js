let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function animateList() {
  const listSections = $('.section--list')
  const listItemsTl = gsap.timeline()
  const listOutlineTl = gsap.timeline()
  listSections.each((index, section) => {
    const listChildren = $(section).find('.list_list-item-inner')
    const outlineWrap = $(section).find('.outline-wrap')
    const headline = $(section).find('h2')

    const listTl = gsap.timeline()
    listItemsTl.add(listTl)

    ScrollTrigger.create({
      animation: listTl,
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      // toggleActions: 'restart pause resume pause',
      scrub: 0.5,
    })

    listTl.from([headline, listChildren], {
      yPercent: 100,
      stagger: 0.1,
      duration: 1.5,
      ease: 'expo.out',
      delay: 0.5,
    })
  })

  return [listItemsTl, listOutlineTl]
}
