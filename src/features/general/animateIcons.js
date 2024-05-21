let $ = window.$

import gsap from 'gsap'

export default function animateIcons() {
  const allIcons = $('[data-animate-icon]')
  allIcons.each((index, icon) => {
    const iconName = $(icon).data('animateIcon')
    const iconTl = gsap.timeline({ paused: true, defaults: { duration: 0.75 } })
    switch (iconName) {
      case 'star':
        iconTl.to(icon, { scale: 0.5, ease: 'back.inOut' })
        break
      case 'wheel':
        iconTl.to(icon, { rotateZ: 90, ease: 'back.inOut' })
        break
      case 'price':
        iconTl.to(icon, { rotateZ: 180, ease: 'back.inOut' })
        break
    }

    $(icon).on('mouseenter', function () {
      iconTl.play()
    })
    $(icon).on('mouseleave', function () {
      iconTl.reverse()
    })
  })
}
