let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import {
  bottomClipPath,
  centerClipPath,
  centerHalfClipPath,
  fullClipPath,
  leftClipPath,
  rightClipPath,
  topClipPath,
} from '../../utils/variables'
gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initImages() {
  ctx = gsap.context(() => {
    const sections = $('[data-reveal-img=section]')

    sections.each((index, section) => {
      const images = $(section).find('[data-reveal-img]')

      const sectionTl = gsap.timeline({ defaults: { duration: 1, ease: 'power1.out', stagger: 0.1 } })

      ScrollTrigger.create({
        animation: sectionTl,
        trigger: section,
        start: 'top bottom',
        end: 'top center',
        toggleActions: 'none play none reset',
      })

      images.each((itemIndex, image) => {
        const revealType = $(image).data('revealImg')

        if (revealType) {
          if (revealType.includes('clip-top')) {
            sectionTl.fromTo(image, { clipPath: topClipPath }, { clipPath: fullClipPath })
          }
          if (revealType.includes('clip-bottom')) {
            sectionTl.fromTo(image, { clipPath: bottomClipPath }, { clipPath: fullClipPath })
          }
          if (revealType.includes('clip-center')) {
            sectionTl.fromTo(image, { clipPath: centerClipPath }, { clipPath: fullClipPath })
          }
          if (revealType.includes('clip-half')) {
            sectionTl.fromTo(image, { clipPath: centerHalfClipPath }, { clipPath: fullClipPath })
          }
          if (revealType.includes('clip-left')) {
            sectionTl.fromTo(image, { clipPath: leftClipPath }, { clipPath: fullClipPath })
          }
          if (revealType.includes('clip-right')) {
            sectionTl.fromTo(image, { clipPath: rightClipPath }, { clipPath: fullClipPath })
          }
        }
      })
    })
  })
}

export function killImages() {
  if (ctx) {
    ctx.revert()
  }
}
