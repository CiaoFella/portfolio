let $ = window.$

import gsap from 'gsap'

import { varBlack } from '../../utils/variables'

export default function animateListHover() {
  const listHoverWrap = $('[data-animate=list-hover-wrap]')

  listHoverWrap.each((index, list) => {
    const listItems = $(list).find('[data-animate=list-hover-item]')
    listItems.each((index, item) => {
      const bgFillPath = $(item).find('[data-animate=list-hover-filler]')
      const itemContent = $(item).find('[data-animate=list-hover-content]')
      const itemTl = gsap.timeline({ paused: true })
      itemTl
        .to(bgFillPath, {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
          duration: 0.75,
          ease: 'expo.out',
        })
        .to(
          itemContent,
          {
            padding: '0px 15px',
            color: varBlack,
            duration: 0.75,
            ease: 'expo.out',
          },
          0
        )

      $(item).on('mouseenter', () => {
        itemTl.timeScale(1).play()
      })
      $(item).on('mouseleave', () => {
        itemTl.timeScale(4).reverse()
      })
    })
  })
}
