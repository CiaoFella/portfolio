let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Flip from 'gsap/dist/Flip'
gsap.registerPlugin(ScrollTrigger, Flip)

let ctx

export default function initHeroVideoScroll() {
  ctx = gsap.context(() => {
    const scrollContainer = $('[data-animate=main-video-wrapper]')
    const targetElement = $('[data-animate=hero-video-target-wrap]')
    const videoWrapOuter = $('[data-hero-element=video-outer]')
    const videoClip = $('[data-animate=hero-video-clip]')
    const scrollStages = $('[data-scroll-video=stage]')

    scrollStages.each((index, stage) => {
      const nextSection = scrollStages[index + 1]

      if (nextSection) {
        ScrollTrigger.create({
          trigger: stage,
          start: 'bottom center',
          end: 'bottom top',
          onEnter: () => {
            const state = Flip.getState(stage)
            nextSection.classList.add('active')
            Flip.from(state, {
              duration: 1,
              ease: 'power1.inOut',
              absolute: true,
            })
          },
          onLeaveBack: () => {
            const state = Flip.getState(stage)
            nextSection.classList.remove('active')
            Flip.from(state, {
              duration: 1,
              ease: 'power1.inOut',
              absolute: true,
            })
          },
        })
      }
    })

    console.log(scrollContainer)

    const videoScrollTl = gsap.timeline({
      defaults: { duration: 1 },
    })

    ScrollTrigger.create({
      animation: videoScrollTl,
      trigger: scrollContainer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    })

    // function centerClipPath() {
    //   const wrapperHeight = targetElement.height()
    //   const wrapperwidth = targetElement.width()

    //   const videoClipLeftRect = videoClipPathLeft[0].getBoundingClientRect()
    //   const videoClipRightRect = videoClipPathRight[0].getBoundingClientRect()

    //   const positionLeftPath = {
    //     y: (wrapperHeight - videoClipLeftRect.height) / 2,
    //     x: (wrapperwidth - videoClipLeftRect.width) / 2 - 0.35 * videoClipLeftRect.width,
    //   }

    //   const positionRightPath = {
    //     y: (wrapperHeight - videoClipRightRect.height) / 2,
    //     x: (wrapperwidth - videoClipRightRect.width) / 2 + 0.35 * videoClipRightRect.width,
    //   }

    //   gsap.set(videoClipPathLeft, {
    //     x: positionLeftPath.x,
    //     y: positionLeftPath.y,
    //   })
    //   gsap.set(videoClipPathRight, {
    //     x: positionRightPath.x,
    //     y: positionRightPath.y,
    //   })
    // }

    // centerClipPath()
  })
}

export function killHeroVideoScroll() {
  if (ctx) {
    ctx.revert()
  }
}
