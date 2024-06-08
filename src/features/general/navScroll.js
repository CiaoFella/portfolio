let $ = window.$

import gsap from 'gsap' // eslint-disable-line
import { fullClipPath, rightSideClipPath } from '../../utils/variables'
import lenis from '../../utils/smoothScroll'

let ctx
let isPlaying = false
let navBar
let detailNav
let navBarScrollTl

export default function initNavScroll(data) {
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
      onStart: () => console.log(detailNav),
    })
    navBarScrollTl
      .to(logo, { scale: 0.8 }, '<')
      .to(navBarWrapInner, { padding: '0 2.5rem' }, '<')
      .to(menuTriggerTextWrap, { width: 0 }, '<')
      .fromTo(navBarCta, { clipPath: fullClipPath }, { clipPath: rightSideClipPath }, '<')
    if (detailNav) {
      navBarScrollTl.to(detailLinkText, { xPercent: 100 }, '<').to(detailNav, { padding: '0 2.5rem' }, '<')
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
  }
}
