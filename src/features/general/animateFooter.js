let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function animateFooter() {
  const footerSection = $('[data-animate=footer-section]')
  const footerGroups = footerSection.find('[data-animate=footer-group]')
  const pageContent = $('[data-animate=page-content]')

  const footerTl = gsap.timeline({ defaults: { duration: 1, ease: 'expo.out' } })
  const pageScaleTl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' } })

  pageScaleTl.to(pageContent, { scaleX: 0.95 })

  ScrollTrigger.create({
    animation: pageScaleTl,
    trigger: footerSection,
    start: 'top center',
    end: 'top top',
    scrub: 0.5,
  })

  ScrollTrigger.create({
    animation: footerTl,
    trigger: footerSection,
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
}
