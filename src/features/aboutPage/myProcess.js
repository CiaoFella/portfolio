let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'
import { bottomClipPath, fullClipPath, isDesktop, isLandscape } from '../../utils/variables'

gsap.registerPlugin(ScrollTrigger)

let ctx

const mm = gsap.matchMedia()

export default function initMyProcess() {
  ctx = gsap.context(() => {
    const myProcessWrap = $('[data-animate=my-process-wrap]')
    const myProcessHeadline = myProcessWrap.find('h2')
    const myProcessSteps = myProcessWrap.find('[data-animate=my-process-step]')

    const headlineSplit = new SplitType(myProcessHeadline, { types: 'chars' })

    const myProcessTl = gsap.timeline()

    myProcessTl.from(headlineSplit.chars, { yPercent: 100, stagger: 0.005, duration: 0.1 }, 0)

    myProcessSteps.each((index, step) => {
      const myProcessDescription = $(step).find('[data-animate=process-step-description]')
      const myProcessHeadline = $(step).find('[data-animate=process-step-headline]')
      const myProcessStepNumber = $(step).find('[data-animate=process-step-number]')
      const descriptionSplit = new SplitType(myProcessDescription, { types: 'lines' })

      mm.add(isLandscape, () => {
        myProcessTl.fromTo(
          [myProcessStepNumber, myProcessHeadline, descriptionSplit.lines],
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.01, duration: 0.15 },
          '<+0.2'
        )
      })

      mm.add(isDesktop, () => {
        myProcessTl.fromTo(
          [myProcessStepNumber, myProcessHeadline, descriptionSplit.lines],
          { yPercent: 100, clipPath: bottomClipPath },
          { yPercent: 0, clipPath: fullClipPath, stagger: 0.01, duration: 0.15 },
          '<+0.2'
        )
      })
    })

    ScrollTrigger.create({
      animation: myProcessTl,
      trigger: myProcessWrap,
      start: 'top center',
      end: 'bottom bottom',
      scrub: true,
    })
  })
}

export function killMyProcess() {
  if (ctx) {
    ctx.revert()
  }
}