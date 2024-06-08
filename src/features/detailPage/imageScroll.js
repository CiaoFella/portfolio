let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { centerHalfClipPath, fullClipPath } from '../../utils/variables'

gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initImageScroll() {
  ctx = gsap.context(() => {
    const section = $('[data-image-scroll=section]')
    const imageWraps = section.find('[data-image-scroll=img-wrap]')
    imageWraps.each((index, imageWrap) => {
      const image = $(imageWrap).find('[data-image-scroll=img]')
      const imageTl = gsap.timeline()

      $(imageWrap).attr('data-magnetic', 'tiny')
      $(image).attr('data-cursor', '-opaque')

      gsap.set(imageWrap, { clipPath: centerHalfClipPath })
      imageTl.to(image, { scale: 1.2, duration: 1 })

      ScrollTrigger.create({
        animation: imageTl,
        trigger: imageWrap,
        onEnter: () => {
          gsap.to(imageWrap, { clipPath: fullClipPath, duration: 1.5, ease: 'expo.out' })
        },
        start: 'top 90%',
        end: 'bottom top',
        scrub: true,
      })
    })
  })
}

export function killImageScroll() {
  if (ctx) {
    ctx.revert()
  }
}
