let $ = window.$

import gsap from 'gsap'
import SplitType from 'split-type'

export default function animateFontWeight() {
  const fontWeightItems = $('[data-animate=font-weight]')
  const maxDistance = 300 // Adjust the maximum distance for font weight change as needed
  const maxFontWeight = 600 // Maximum font weight
  const minFontWeight = 100 // Minimum font weight

  const masterTl = gsap.timeline()

  fontWeightItems.each((index, item) => {
    $(item).attr('data-cursor', '-lg')
    let splitChars
    if ($(item).find('.char').length === 0) {
      const splitCharType = new SplitType(item, { types: 'chars,words' })
      splitChars = splitCharType.chars
    } else {
      splitChars = $(item).find('.char')
    }
    $(splitChars).each((index, char) => {
      $(char).data('initialWeight', parseInt($(char).css('font-weight'))) // Store initial font weight

      $(char).on('mouseenter', () => {
        const charTl = gsap.timeline()
        charTl.to(char, {
          fontWeight: maxFontWeight,
          duration: 0.5,
        })
      })

      $(char).on('mouseleave', () => {
        const charTl = gsap.timeline()
        charTl.to(char, {
          fontWeight: $(char).data('initialWeight'),
          duration: 0.5,
        })
        masterTl.add(charTl)
      })
    })
  })

  $(document).mousemove(function (event) {
    const mouseX = event.pageX
    const mouseY = event.pageY

    fontWeightItems.find('.char').each((index, item) => {
      const itemPosition = $(item).offset()
      const itemWidth = $(item).outerWidth()
      const itemHeight = $(item).outerHeight()

      const itemCenterX = itemPosition.left + itemWidth / 2
      const itemCenterY = itemPosition.top + itemHeight / 2

      const distance = Math.sqrt(
        Math.pow(mouseX - itemCenterX, 2) + Math.pow(mouseY - itemCenterY, 2)
      )

      let fontWeight = minFontWeight

      if (distance < maxDistance) {
        const weightRange = maxFontWeight - minFontWeight
        const distanceRatio = (maxDistance - distance) / maxDistance
        fontWeight = minFontWeight + weightRange * distanceRatio
      }

      gsap.to(item, { fontWeight: fontWeight, duration: 0.5 })
    })
  })

  return [masterTl]
}
