let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import { centerVerticalClipPath, fullClipPath, centerHorizontalClipPath, bottomClipPath } from '../../utils/variables'
import helperFunctions from '../../utils/helperFunctions'
import SplitType from 'split-type'

let ctx

export default function initCardList() {
  ctx = gsap.context(() => {
    const cardList = $('[data-animate=card-list-wrap]')
    const lottie = Webflow.require('lottie').lottie
    const animations = lottie.getRegisteredAnimations()

    cardList.each((index, list) => {
      const cardListItem = $(list).find('[data-animate=card-list-item]')

      cardListItem.each((index, item) => {
        const bgFillPath = $(item).find('[data-animate=card-fill-path]')
        const headline = $(item).find('[data-animate=card-item-headline')
        const arrow = $(item).find('.arrow-icon-right')
        const arrowData = arrow.data('direction')
        const animation = $(item).find('[data-animate=card-animation]')
        let lottieAnim
        animations.forEach((anim) => {
          if (anim.wrapper === animation[0]) {
            lottieAnim = anim
          }
        })

        const itemTl = gsap.timeline({
          paused: true,
          defaults: { duration: 0.5, ease: 'power3.inOut' },
        })

        if (headline.length > 0) {
          itemTl.to(headline, {
            x: '0.5rem',
          })
        }
        if (animation.length > 0) {
          itemTl.from(animation, { opacity: 0, duration: 0.25, ease: 'none' }, '<')
        }
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

        $(item).on('mouseenter', (event) => {
          if (lottieAnim) {
            let playCount = 0
            function playHandler() {
              playCount++
              if (playCount < 2) {
                lottieAnim.goToAndPlay(0, true)
              } else {
                lottieAnim.removeEventListener('complete', playHandler)
              }
            }
            lottieAnim.addEventListener('complete', playHandler)
            lottieAnim.goToAndPlay(0, true)
          }
          itemTl.timeScale(1).play()
          const mouseDirection = helperFunctions.getMouseEnterDirection(event, item)
          const pathDirection = helperFunctions.handleCardHoverIn(mouseDirection, true)
          helperFunctions.animateCardHover(bgFillPath, pathDirection.start, pathDirection.end)
        })
        $(item).on('mouseleave', (event) => {
          itemTl.timeScale(1.5).reverse()
          const mouseDirection = helperFunctions.getMouseEnterDirection(event, item)
          const pathDirection = helperFunctions.handleCardHoverOut(mouseDirection, true)
          helperFunctions.animateCardHover(bgFillPath, pathDirection.start, pathDirection.end)
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
          sectionHeadlineSplit = new SplitType(sectionHeadline, { types: 'chars,words' })
        }

        const scrollTl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } })

        scrollTl
          .fromTo(dividerVertical, { clipPath: centerVerticalClipPath }, { clipPath: fullClipPath })
          .fromTo(dividerHorizontal, { clipPath: centerHorizontalClipPath }, { clipPath: fullClipPath }, '<')
          .fromTo(
            textSplit.lines,
            { clipPath: bottomClipPath, yPercent: 100 },
            { clipPath: fullClipPath, yPercent: 0, stagger: 0.05 },
            '<+0.25'
          )
          .from(headlines, { yPercent: 100, stagger: 0.1 }, '<')
        if (testiomnialNames.length > 0) {
          scrollTl.from(testiomnialNames, { yPercent: 100, stagger: 0.25 }, '<+0.25')
        }

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
  })
}

export function killCardList() {
  if(ctx) {
    ctx.revert()
  }
}
