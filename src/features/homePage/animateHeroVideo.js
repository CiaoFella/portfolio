let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { bottomClipPath, fullClipPath, topClipPath } from '../../utils/variables'

export default function animateHeroVideo() {
  gsap.registerPlugin(ScrollTrigger)

  const scrollContainer = $('[data-animate=main-video-wrapper]')
  const targetElement = $('[data-animate=hero-video-target-wrap]')
  const targetWrap = $('[data-animate=hero-video-wrap]')
  const videoClip = $('[data-animate=hero-video-clip]')
  const videoClipPathLeft = videoClip.find('[data-animate=hero-video-clip-path][data-direction=left]')
  const videoClipPathRight = videoClip.find('[data-animate=hero-video-clip-path][data-direction=right]')

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

  const videoScrollTl = gsap.timeline({ defaults: { duration: 1 } })
  videoScrollTl.to(targetWrap, { scale: 0.9, duration: 0.5 })
  videoScrollTl.to(targetElement, {
    scale: 1,
    duration: 0.25,
    ease: 'back.inOut',
  })
  videoScrollTl.to(
    [videoClipPathLeft, videoClipPathRight],
    {
      scale: 1,
      duration: 2,
    },
    '<-0.5'
  )
  videoScrollTl.to(targetWrap, { xPercent: -15, duration: 1 })
  videoScrollTl.to(
    videoClipPathLeft,
    {
      xPercent: -75,
      duration: 1,
      ease: 'power2.out',
    },
    '<'
  )
  videoScrollTl.to(
    videoClipPathRight,
    {
      xPercent: 75,
      duration: 1,
      ease: 'power2.out',
    },
    '<'
  )
  videoScrollTl.to(videoClipPathLeft, {
    xPercent: 0,
    duration: 0.5,
    ease: 'power2.in',
  })
  videoScrollTl.to(
    videoClipPathRight,
    {
      xPercent: 0,
      duration: 0.5,
      ease: 'power2.in',
    },
    '<'
  )
  videoScrollTl.to([videoClipPathLeft, videoClipPathRight], {
    scale: 12,
    ease: 'power3.out',
  })

  videoScrollTl.fromTo(
    targetElement,
    { clipPath: fullClipPath },
    {
      clipPath: topClipPath,
      duration: 0.5,
      immediateRender: false,
    },
    '>-0.5'
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
}
