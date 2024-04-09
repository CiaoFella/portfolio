let $ = window.$

export default function closeMenu() {
  const navbarWrap = $('.navbar_wrap')
  const menuTrigger = navbarWrap.find('.js-menu-trigger')
  if (menuTrigger.hasClass('is-active')) {
    menuTrigger.click()
  }
}
