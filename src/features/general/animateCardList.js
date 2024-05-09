let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import {
  svgStartToRight,
  svgEndToRight,
  svgStartFromLeft,
  svgEndFromLeft,
  svgStartFromRight,
  svgEndFromRight,
  svgStartToLeft,
  svgEndToLeft,
  svgStartFromTop,
  svgEndFromTop,
  svgEndFromBottom,
  svgStartFromBottom,
  svgStartToTop,
  svgEndToTop,
  svgStartToBottom,
  svgEndToBottom,
  centerVerticalClipPath,
  fullClipPath,
  centerHorizontalClipPath,
  bottomClipPath,
} from '../../utils/variables'
import getMouseEnterDirection from '../../utils/helperFunctions'
import SplitType from 'split-type'

export default function animateCardList() {
  const cardList = $('[data-animate=card-list-wrap]')

  cardList.each((index, list) => {
    const cardListItem = $(list).find('[data-animate=card-list-item]')

    cardListItem.each((index, item) => {
      const bgFillPath = $(item).find('[data-animate=card-fill-path]')
      const headline = $(item).find('.card-list_item-headline')
      const arrow = $(item).find('.arrow-icon-right')
      const arrowData = arrow.data('direction')

      const itemTl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.5, ease: 'power3.inOut' },
      })

      itemTl.to(headline, {
        xPercent: 5,
      })
      if (arrowData === 'down') {
        itemTl.to(
          arrow,
          {
            rotateZ: 45,
          },
          '<'
        )
      } else if (arrowData === 'up') {
        itemTl.to(
          arrow,
          {
            rotateZ: -45,
          },
          '<'
        )
      }

      function playHoverIn(start, end) {
        return gsap.fromTo(
          bgFillPath,
          { attr: { d: start } },
          {
            attr: { d: end },
            duration: 0.5,
            ease: 'power3.out',
          }
        )
      }

      function playHoverOut(start, end) {
        return gsap.fromTo(
          bgFillPath,
          { attr: { d: start } },
          {
            attr: { d: end },
            duration: 0.5,
            ease: 'power3.out',
          }
        )
      }

      $(item).on('mouseenter', (event) => {
        const mouseDirection = getMouseEnterDirection(event, item)
        if (mouseDirection === 'left') {
          const start = svgStartFromLeft
          const end = svgEndFromLeft
          playHoverIn(start, end)
        } else if (mouseDirection === 'right') {
          const start = svgStartFromRight
          const end = svgEndFromRight
          playHoverIn(start, end)
        } else if (mouseDirection === 'top') {
          const start = svgStartFromTop
          const end = svgEndFromTop
          playHoverIn(start, end)
        } else if (mouseDirection === 'bottom') {
          const start = svgStartFromBottom
          const end = svgEndFromBottom
          playHoverIn(start, end)
        }
        itemTl.play()
      })
      $(item).on('mouseleave', (event) => {
        const mouseDirection = getMouseEnterDirection(event, item)
        if (mouseDirection === 'left') {
          const start = svgStartToLeft
          const end = svgEndToLeft
          playHoverOut(start, end)
        } else if (mouseDirection === 'right') {
          const start = svgStartToRight
          const end = svgEndToRight
          playHoverOut(start, end)
        } else if (mouseDirection === 'top') {
          const start = svgStartToTop
          const end = svgEndToTop
          playHoverIn(start, end)
        } else if (mouseDirection === 'bottom') {
          const start = svgStartToBottom
          const end = svgEndToBottom
          playHoverIn(start, end)
        }
        itemTl.reverse()
      })
    })

    function revealOnScroll() {
      const dividerVertical = $(list).find('[data-animate=divider][data-direction=vertical]')
      const dividerHorizontal = $(list).find('[data-animate=divider][data-direction=horizontal]')

      const sectionHeadline = $(list).find('[data-animate=section-headline]')
      const headlines = $(list).find('[data-animate=card-item-headline]')
      const texts = $(list).find('[data-animate=card-item-text]')
      const testiomnialNames = $(list).find('[data-animate=card-item-testimonial-name]')

      const textSplit = new SplitType(texts, { types: 'lines' })
      let sectionHeadlineSplit
      if (sectionHeadline.length > 0) {
        sectionHeadlineSplit = new SplitType(sectionHeadline, { types: 'chars' })
      }

      const scrollTl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } })

      scrollTl
        .fromTo(dividerVertical, { clipPath: centerVerticalClipPath }, { clipPath: fullClipPath })
        .fromTo(dividerHorizontal, { clipPath: centerHorizontalClipPath }, { clipPath: fullClipPath }, '<')
        .fromTo(textSplit.lines, { clipPath: bottomClipPath, yPercent: 100 }, { clipPath: fullClipPath, yPercent: 0, stagger: 0.05 }, '<+0.25')
        .from(headlines, { yPercent: 100, stagger: 0.1 }, '<')
        .from(testiomnialNames, { yPercent: 100, stagger: 0.25 }, '<+0.25')

      if (sectionHeadline.length > 0) {
        scrollTl.from(sectionHeadlineSplit.chars, { yPercent: 150, ease: 'power4.out', rotateZ: 5, stagger: 0.01 }, 0)
      }

      ScrollTrigger.create({
        animation: scrollTl,
        trigger: list,
        start: 'top bottom',
        end: 'top 50%',
        toggleActions: 'none play none reset',
      })
    }

    revealOnScroll()
  })
}
