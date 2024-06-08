let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'
import helperFunctions from '../../utils/helperFunctions'
import {
  clipEndFromBottom,
  clipEndFromLeft,
  clipEndFromRight,
  clipEndFromTop,
  clipEndToBottom,
  clipEndToLeft,
  clipEndToRight,
  clipEndToTop,
  clipStartFromBottom,
  clipStartFromLeft,
  clipStartFromRight,
  clipStartFromTop,
  clipStartToBottom,
  clipStartToLeft,
  clipStartToRight,
  clipStartToTop,
} from '../../utils/variables'

let ctx

export default function initPassions() {
  ctx = gsap.context(() => {
    const section = $('[data-animate=passion-section]')
    const item = section.find('[data-animate=passion-list-item]')
    const headlines = item.find('[data-animate=passion-list-item-headline]')
    const dividerHorizontal = item.find('[data-animate=divider][data-direction=horizontal]')
    const dividerVertical = item.find('[data-animate=divider][data-direction=vertical]')

    const headlineSplit = new SplitType(headlines, { types: 'chars' })

    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } })

    tl.from(dividerHorizontal, { width: 0, stagger: 0.05 })
      .from(dividerVertical, { height: 0, stagger: 0.05 }, '<')
      .from(headlineSplit.chars, { yPercent: 100, stagger: 0.025, rotateZ: 2.5 }, '<')

    ScrollTrigger.create({
      animation: tl,
      trigger: section,
      start: 'top bottom',
      end: 'top center',
      toggleActions: 'none play none reset',
    })

    item.each((index, el) => {
      const bgFillPath = $(el).find('[data-animate=passion-list-item-path]')
      const bgClip = $(el).find('[data-animate=passion-list-item-clip]')
      const image = $(el).find('[data-animate=passion-list-item-img]')

      bgClip.attr('id', `bgClipPassion${index}`)
      image.css('clip-path', `url(#bgClipPassion${index})`)

      const itemTl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.5, ease: 'power3.out' },
      })

      function playHoverIn(start, end) {
        return gsap.fromTo(
          bgFillPath,
          { attr: { d: start } },
          {
            attr: { d: end, duration: 0.5, ease: 'power3.out' },
          }
        )
      }

      function playHoverOut(start, end) {
        return gsap.fromTo(
          bgFillPath,
          { attr: { d: start } },
          {
            attr: { d: end, duration: 0.5, ease: 'power3.out' },
          }
        )
      }

      $(el).on('mouseenter', (event) => {
        const mouseDirection = helperFunctions.getMouseEnterDirection(event, el)
        gsap.to(
          $(el).find('.char'),
          { yPercent: 100, stagger: -0.015, rotateZ: 2.5, duration: 0.5, ease: 'power3.out' },
          '<'
        )
        if (mouseDirection === 'left') {
          const start = clipStartFromLeft
          const end = clipEndFromLeft
          playHoverIn(start, end)
        } else if (mouseDirection === 'right') {
          const start = clipStartFromRight
          const end = clipEndFromRight
          playHoverIn(start, end)
        } else if (mouseDirection === 'top') {
          const start = clipStartFromTop
          const end = clipEndFromTop
          playHoverIn(start, end)
        } else if (mouseDirection === 'bottom') {
          const start = clipStartFromBottom
          const end = clipEndFromBottom
          playHoverIn(start, end)
        }
      })

      $(el).on('mouseleave', (event) => {
        const mouseDirection = helperFunctions.getMouseEnterDirection(event, el)
        gsap.to($(el).find('.char'), { yPercent: 0, stagger: 0.015, rotateZ: 0, duration: 0.5, ease: 'power3.out' }, '<')
        if (mouseDirection === 'left') {
          const start = clipStartToLeft
          const end = clipEndToLeft
          playHoverOut(start, end)
        } else if (mouseDirection === 'right') {
          const start = clipStartToRight
          const end = clipEndToRight
          playHoverOut(start, end)
        } else if (mouseDirection === 'top') {
          const start = clipStartToTop
          const end = clipEndToTop
          playHoverIn(start, end)
        } else if (mouseDirection === 'bottom') {
          const start = clipStartToBottom
          const end = clipEndToBottom
          playHoverIn(start, end)
        }
      })
    })
  })
}

export function killPassions() {
  if (ctx) {
    ctx.revert()
  }
}
