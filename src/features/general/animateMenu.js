let $ = window.$

import gsap from 'gsap'
import SplitType from 'split-type'

export default function animateMenu() {
  const flyoutWrap = $('.navigation-flyout')
  const navbarWrap = $('.navbar_wrap')
  const menuTrigger = navbarWrap.find('.js-menu-trigger')
  const flyoutIcon = flyoutWrap.find('.icon-decoration')
  const flyoutBlur = $('.navigation-blur')
  const menuItems = flyoutWrap
    .find('.navigation-flyout_menu-list-item')
    .children()
  const contactItems = flyoutWrap.find('.contact-list_item-inner')
  const menuItemsSplit = new SplitType(menuItems, { types: 'chars' })

  const flyoutTl = gsap.timeline({ paused: true })
  flyoutTl
    .set(flyoutWrap, { display: 'flex' })
    .set(flyoutBlur, { display: 'block' })
    .from(flyoutBlur, { opacity: 0, duration: 0.5 })
    .from(flyoutWrap, { height: '0svh', duration: 1, ease: 'expo.inOut' }, 0)

    .from(
      [flyoutIcon, menuItemsSplit.chars],
      {
        y: '150%',
        duration: 1,
        stagger: 0.03,
        ease: 'expo.out',
      },
      '>-50%'
    )
    .from(
      contactItems,
      {
        y: '150%',
        duration: 1.5,
        stagger: 0.1,
        ease: 'expo.out',
      },
      '<+0.25'
    )

  menuTrigger.on('click', function () {
    menuTrigger.toggleClass('is-active')
    if (menuTrigger.hasClass('is-active')) {
      flyoutTl.timeScale(1).play()
    } else {
      flyoutTl.timeScale(2).reverse()
    }
  })
}
