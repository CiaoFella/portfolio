let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'
gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initHeroVideoScroll() {
  ctx = gsap.context(() => {
    const scrollContainer = $('[data-animate=main-video-wrapper]')
    const targetElement = $('[data-animate=hero-video-target-wrap]')
    const targetWrap = $('[data-animate=hero-video-wrap]')
    const videoClip = $('[data-animate=hero-video-clip]')
    const videoClipPathLeft = videoClip.find('[data-animate=hero-video-clip-path][data-direction=left]')
    const videoClipPathRight = videoClip.find('[data-animate=hero-video-clip-path][data-direction=right]')
    const connectTextLeft = scrollContainer.find('[data-animate=connect-scroll-headline][data-direction=left]')
    const connectTextRight = scrollContainer.find('[data-animate=connect-scroll-headline][data-direction=right]')

    function centerClipPath() {
      const wrapperHeight = targetElement.height()
      const wrapperwidth = targetElement.width()

      const videoClipLeftRect = videoClipPathLeft[0].getBoundingClientRect()
      const videoClipRightRect = videoClipPathRight[0].getBoundingClientRect()

      const positionLeftPath = {
        y: (wrapperHeight - videoClipLeftRect.height) / 2,
        x: (wrapperwidth - videoClipLeftRect.width) / 2 - 0.35 * videoClipLeftRect.width,
      }

      const positionRightPath = {
        y: (wrapperHeight - videoClipRightRect.height) / 2,
        x: (wrapperwidth - videoClipRightRect.width) / 2 + 0.35 * videoClipRightRect.width,
      }

      gsap.set(videoClipPathLeft, {
        x: positionLeftPath.x,
        y: positionLeftPath.y,
      })
      gsap.set(videoClipPathRight, {
        x: positionRightPath.x,
        y: positionRightPath.y,
      })
    }

    centerClipPath()

    gsap.set([videoClipPathLeft, videoClipPathRight], { scale: 12 })

    const videoScrollTl = gsap.timeline({
      defaults: { duration: 1 },
    })
    videoScrollTl
      .to(targetWrap, { scale: 0.8, duration: 1.5 })
      .to(targetWrap, { xPercent: -20, duration: 1 }, '>+0.5')
      .to(targetElement, {
        scale: 1,
        duration: 0.25,
        ease: 'power3.inOut',
      })
      .to(
        [videoClipPathLeft, videoClipPathRight],
        {
          scale: 1,
          duration: 1,
        },
        '<-0.5'
      )
      .to(videoClipPathLeft, {
        xPercent: -75,
        duration: 1,
        ease: 'power2.out',
      })
      .to(
        videoClipPathRight,
        {
          xPercent: 75,
          duration: 1,
          ease: 'power2.out',
        },
        '<'
      )
      .to(videoClipPathLeft, {
        xPercent: 0,
        duration: 0.5,
        ease: 'power2.in',
      })
      .to(
        videoClipPathRight,
        {
          xPercent: 0,
          duration: 0.5,
          ease: 'power2.in',
        },
        '<'
      )
      .from([connectTextLeft, connectTextRight], { yPercent: 100, duration: 0.5 }, '<-0.25')
      .fromTo(connectTextLeft, { x: '-20vw' }, { x: 0, duration: 0.5, ease: 'power2.in' }, '<+0.25')
      .fromTo(connectTextRight, { x: '20vw' }, { x: 0, duration: 0.5, ease: 'power2.in' }, '<')
      .to([videoClipPathLeft, videoClipPathRight], {
        scale: 12,
        ease: 'power2.out',
      })
      .to([connectTextLeft, connectTextRight], { yPercent: 100, duration: 0.25 }, '<+0.05')
      .fromTo(
        targetElement,
        { scale: 1, opacity: 1 },
        { opacity: 0, scale: 0.8, duration: 0.5, immediateRender: false, ease: 'power2.inOut' },
        '>-0.1'
      )

    ScrollTrigger.create({
      animation: videoScrollTl,
      trigger: scrollContainer,
      start: 'top top',
      end: '75% bottom',
      pin: targetWrap,
      pinSpacing: false,
      scrub: true,
    })
  })
}

export function killHeroVideoScroll() {
  if (ctx) {
    ctx.revert()
  }
}