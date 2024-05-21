let $ = window.$

import gsap from 'gsap'

import {
  svgStartFromTop,
  svgEndFromTop,
  svgStartFromBottom,
  svgEndFromBottom,
  svgStartToTop,
  svgEndToTop,
  svgStartToBottom,
  svgEndToBottom,
} from '../../utils/variables'

export default function animateAwardListHover() {
  const hoverWrap = $('[data-animate=award-list-section]')
  const imageWrap = $('[data-animate=award-list-image-wrap]')
  const imageList = $('[data-animate=award-list-image-list]')

  hoverWrap.each((index, list) => {
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

    const listItems = $(list).find('[data-animate=award-list-item]')
    $(list).on('mouseenter', function () {
      imageTL.play()
    })
    $(list).on('mouseleave', function () {
      imageTL.reverse()
    })

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
        const rect = item.getBoundingClientRect()
        const mouseY = event.clientY
        const midpoint = rect.top + rect.height / 2
        if (mouseY < midpoint) {
          const start = svgStartFromTop
          const end = svgEndFromTop
          playHoverIn(start, end)
        } else {
          const start = svgStartFromBottom
          const end = svgEndFromBottom
          playHoverIn(start, end)
        }
        imageAnimation(itemTl, index)
        itemTl.play()
      })

      $(item).on('mouseleave', (event) => {
        const rect = item.getBoundingClientRect()
        const midpoint = rect.top + rect.height / 2
        const mouseY = event.clientY
        if (mouseY < midpoint) {
          const start = svgStartToTop
          const end = svgEndToTop
          playHoverOut(start, end)
        } else {
          const start = svgStartToBottom
          const end = svgEndToBottom
          playHoverOut(start, end)
        }
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
}
