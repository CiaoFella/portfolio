let $ = window.$

import { gsap } from '../../vendor.js'
import { fullClipPath, rightSideClipPath } from '../../utils/variables.js'
import lenis from '../../utils/smoothScroll.js'

let ctx
let isPlaying = false
let navBar
let detailNav
let navBarScrollTl

export default function initNavScroll() {
  ctx = gsap.context(() => {
    navBar = $('[data-animate=nav-bar]')
    detailNav = $('[data-animate=detail-nav-wrap]')
    const detailLinkText = $('[data-animate=detail-link-text]')
    const navBarWrapInner = navBar.find('[data-animate=navbar-wrap-inner]')
    const navBarCta = navBar.find('[data-animate=navbar-cta]')
    const logo = navBar.find('[data-animate=logo]')
    const menuTriggerTextWrap = navBar.find('[data-animate=menu-trigger-text-wrap]')
    navBarScrollTl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: 'power3.inOut' },
    })
    navBarScrollTl
      .to(logo, { scale: 0.7 }, '<')

      .to(menuTriggerTextWrap, { width: 0 }, '<')
      .fromTo(navBarCta, { clipPath: fullClipPath }, { clipPath: rightSideClipPath }, '<')

    if (detailNav.length > 0) {
      navBarScrollTl
        .to(detailLinkText, { xPercent: 100 }, '<')
        .to(detailNav, { padding: '0 1.5rem' }, '<')
        .to(navBarWrapInner, { padding: '0 1.5rem' }, '<')
    } else {
      navBarScrollTl.to(navBarWrapInner, { padding: '0 1.5rem 0 0' }, '<')
    }

    lenis.on('scroll', ({ velocity }) => {
      if (velocity !== 0 && !isPlaying) {
        navBarScrollTl.play()
        isPlaying = true
      } else if (velocity === 0 && isPlaying) {
        navBarScrollTl.reverse()
        isPlaying = false
      }
    })
  })
}

export function killNavScroll() {
  if (ctx) {
    ctx.revert()
    detailNav = null
  }
}
