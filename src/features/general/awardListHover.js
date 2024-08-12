let $ = window.$

import { gsap } from '../../vendor.js'
import helperFunctions from '../../utils/helperFunctions.js'
import { isDesktop } from '../../utils/variables.js'

let ctx
const mm = gsap.matchMedia()

export default function initAwardListHover() {
  ctx = gsap.context(() => {
    const hoverWrap = $('[data-animate=award-list-section]')
    const awardListWrap = $('[data-animate=award-list-wrap]')
    const imageWrap = $('[data-animate=award-list-image-wrap]')
    const imageList = $('[data-animate=award-list-image-list]')

    hoverWrap.each((index, list) => {
      mm.add(isDesktop, () => {
        const imageTL = gsap.timeline({ paused: true })

        imageTL.fromTo(
          imageWrap,
          { rotateZ: -15, scale: 0 },
          {
            scale: 1,
            rotateZ: 0,
            duration: 0.25,
            ease: 'power2.inOut',
          }
        )

        $(awardListWrap).on('mouseenter', function () {
          imageTL.play()
        })
        $(awardListWrap).on('mouseleave', function () {
          imageTL.reverse()
        })
      })

      const listItems = $(list).find('[data-animate=award-list-item]')
      listItems.each((index, item) => {
        const bgFillPath = $(item).find('[data-animate=award-list-filler-path]')
        const itemContent = $(item).find('[data-animate=award-list-content]')

        const itemTl = gsap.timeline({ paused: true })

        itemTl.to(itemContent, {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          duration: 0.25,
          ease: 'power1.inOut',
        })

        $(item).on('mouseenter', (event) => {
          const mouseDirection = helperFunctions.getMouseEnterDirection(event, item)
          const pathDirection = helperFunctions.handleCardHoverIn(mouseDirection, false)
          helperFunctions.animateCardHover(bgFillPath, pathDirection.start, pathDirection.end)

          imageAnimation(itemTl, index)

          itemTl.play()
        })

        $(item).on('mouseleave', (event) => {
          const mouseDirection = helperFunctions.getMouseEnterDirection(event, item)
          const pathDirection = helperFunctions.handleCardHoverOut(mouseDirection, false)
          helperFunctions.animateCardHover(bgFillPath, pathDirection.start, pathDirection.end)
          itemTl.reverse()
        })
      })
    })

    function imageAnimation(tl, index) {
      gsap.to(imageList, {
        y: `-${index}00%`,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }
  })
}

export function killAwardListHover() {
  if (ctx) {
    ctx.revert()
  }
}
