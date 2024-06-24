let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { bottomClipPath, centerHalfClipPath, fullClipPath } from '../../utils/variables'
import SplitType from 'split-type'

let ctx

export default function initReducedTeaser() {
  ctx = gsap.context(() => {
    const section = $('[data-animate=reduced-teaser-list]')
    const allTeaser = section.find('[data-animate=reduced-teaser]')

    allTeaser.each((index, teaser) => {
      const img = $(teaser).find('[data-animate=reduced-teaser-img]')
      const videoWrap = $(teaser).find('[data-animate=reduced-teaser-video-wrap]')
      const video = $(teaser).find('[data-animate=reduced-teaser-video]')
      const headline = $(teaser).find('[data-animate=reduced-teaser-headline]')

      const headlineSplit = new SplitType(headline, { types: 'chars' })

      const teaserTl = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'power4.inOut' } })
      const scrollTl = gsap.timeline()

      teaserTl
        .to(img, { scale: 1.2, filter: 'blur(5px)' })
        .fromTo(videoWrap, { clipPath: bottomClipPath }, { clipPath: fullClipPath, duration: 1.5, ease: 'expo.inOut' }, '<')
        .from(headlineSplit.chars, { yPercent: 100, duration: 0.5, stagger: 0.0075 }, '<')

      $(teaser).on('mouseenter', async () => {
        await teaserTl.timeScale(1).play()
        video[0].play()
      })
      $(teaser).on('mouseleave', async () => {
        await teaserTl.timeScale(1.5).reverse()
        video[0].pause()
      })

      scrollTl.fromTo(img, { yPercent: -5 }, { yPercent: 5 })

      gsap.set(teaser, { clipPath: centerHalfClipPath })

      ScrollTrigger.create({
        animation: scrollTl,
        trigger: teaser,
        onEnter: () => {
          gsap.to(teaser, { clipPath: fullClipPath, duration: 1, ease: 'expo.out' })
        },
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      })
    })
  })
}

export function killReducedTeaser() {
  if (ctx) {
    ctx.revert()
  }
}
