let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function animateContact() {
  const contactSection = $('[data-animate=contact-section]')
  const contactItems = contactSection.find('.overflow-hidden').children()
  const contactTl = gsap.timeline()
  contactTl.from(contactItems, {
    y: '15rem',
    stagger: 0.1,
    duration: 2,
    ease: 'expo.out',
  })
  ScrollTrigger.create({
    animation: contactTl,
    trigger: contactSection,
    start: 'top 75%',
    end: 'bottom top',
    toggleActions: 'restart none none reset',
  })
  return [contactTl]
}
