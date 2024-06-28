let $ = window.$

import barba from '@barba/core'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import { isDesktop } from './variables'
import { cursor, magneticCursor } from './customCursor/index'
import transitions from './animatePageTransitions'
import animateTransitions from './animatePageTransitions'
import animateHero from '../features/general/animateHero'
import helperFunctions from './helperFunctions'
import { proxy } from './pageReadyHandler'

import initDetailPage from '../pages/initPages/initDetailPage'
import killDetailPage from '../pages/killPages/killDetailPage'
import initHomePage from '../pages/initPages/initHomePage'
import initAboutPage from '../pages/initPages/initAboutPage'
import killAboutPage from '../pages/killPages/killAboutPage'
import initAwardPage from '../pages/initPages/initAwardPage'
import killAwardPage from '../pages/killPages/killAwardPage'
import initListPage from '../pages/initPages/initListPage'
import killListPage from '../pages/killPages/killListPage'
import { closeMenu } from '../features/general/menu'
import lenis from './smoothScroll'
import initContactPage from '../pages/initPages/initContactPage'
import killContactPage from '../pages/killPages/killContactPage'
import { animateContactForm } from '../features/contactPage/contactForm'
import animatePageTransitions from './animatePageTransitions'
import initLegalPage from '../pages/initPages/initLegalPage'
import killLegalPage from '../pages/killPages/killLegalPage'
import init404Page from '../pages/initPages/init404Page'
import kill404Page from '../pages/killPages/kill404Page'

gsap.registerPlugin(ScrollTrigger)

const matchMedia = gsap.matchMedia()

function resetWebflow(data) {
  let parser = new DOMParser()
  let dom = parser.parseFromString(data.next.html, 'text/html')
  let webflowPageId = $(dom).find('html').attr('data-wf-page')
  $('html').attr('data-wf-page', webflowPageId)
  window.Webflow && window.Webflow.destroy()
  window.Webflow && window.Webflow.ready()
  window.Webflow && window.Webflow.require('ix2').init()
}

const transitionSection = $('[data-animate=transition]')
const transitionLogo = transitionSection.find('[data-animate=transition-logo]')

function setupBarba() {
  let currentPage

  const is404Page = () => currentPage === '404-page'

  barba.hooks.after((data) => {
    currentPage = $('[data-barba-namespace]').data('barbaNamespace')
    resetWebflow(data)
    matchMedia.add(isDesktop, () => {
      const $customCrusor = $('.cb-cursor')
      $customCrusor.remove()
      cursor.init()
      magneticCursor()
    })
    helperFunctions.handleResponsiveElementRemoval()
  })
  barba.hooks.beforeLeave(() => {
    animatePageTransitions.setTransitionLogoPositions(transitionLogo)
    closeMenu(true)
  })
  barba.hooks.afterEnter(() => {
    animatePageTransitions.setTransitionLogoPositions(transitionLogo)
    lenis.scrollTo(0, { duration: 0, immediate: true })
    requestAnimationFrame(() => {
      helperFunctions.refreshScrollTriggers()
    })
  })

  barba.hooks.once(() => {
    let removalResizeTimeout
    function handleRemovalResize() {
      clearTimeout(removalResizeTimeout)
      removalResizeTimeout = setTimeout(function () {
        helperFunctions.handleResponsiveElementRemoval()
      }, 250)
    }
    helperFunctions.handleResponsiveElementRemoval()
    window.addEventListener('resize', handleRemovalResize)

    currentPage = $('[data-barba-namespace]').data('barbaNamespace')
    document.addEventListener('onPageReady', (event) => {
      if (event.detail === true) {
        animateHero().play()
        if (currentPage === 'detail-page') {
          const navBar = $('[data-animate=nav-bar]')
          const detailNav = $('[data-animate=detail-nav-wrap]')
          helperFunctions.slideInNavigations(navBar, detailNav, 1).play()
        }
        if (currentPage === 'contact-page') {
          animateContactForm()
        }
      } else if (event.detail === false) {
      }
    })
  })
  barba.init({
    preventRunning: true,
    views: [
      {
        namespace: 'home-page',
        beforeEnter() {
          helperFunctions.fadeInPage(0.5)
          initHomePage()
        },
        beforeLeave() {
          helperFunctions.fadeOutPage(0.5)
          killDetailPage()
        },
      },
      {
        namespace: 'about-page',
        beforeEnter() {
          helperFunctions.fadeInPage(0.5)
          initAboutPage()
        },
        beforeLeave() {
          helperFunctions.fadeOutPage(0.5)
          killAboutPage()
        },
      },
      {
        namespace: 'list-page',
        beforeEnter() {
          helperFunctions.fadeInPage(0.5)
          initListPage()
        },
        beforeLeave() {
          helperFunctions.fadeOutPage(0.5)
          killListPage()
        },
      },
      {
        namespace: 'award-page',
        beforeEnter() {
          helperFunctions.fadeInPage(0.5)
          initAwardPage()
        },
        beforeLeave() {
          helperFunctions.fadeOutPage(0.5)
          killAwardPage()
        },
      },
      {
        namespace: 'contact-page',
        beforeEnter() {
          helperFunctions.fadeInPage(0.5)
          initContactPage()
        },
        beforeLeave() {
          helperFunctions.fadeOutPage(0.5)
          killContactPage()
        },
      },
      {
        namespace: 'legal-page',
        beforeEnter() {
          helperFunctions.fadeInPage(0.5)
          initLegalPage()
        },
        beforeLeave() {
          helperFunctions.fadeOutPage(0.5)
          killLegalPage()
          lenis.scrollTo(0, { immediate: true })
        },
      },
      {
        namespace: '404-page',
        beforeEnter() {
          init404Page()
        },
        beforeLeave() {
          kill404Page()
        },
      },
      {
        namespace: 'detail-page',
        afterEnter() {
          requestAnimationFrame(() => {
            initDetailPage()
            helperFunctions.refreshScrollTriggers()
          })
        },
        beforeLeave() {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
          killDetailPage()
        },
      },
    ],
    transitions: [
      {
        to: {
          namespace: ['about-page', 'home-page', 'list-page', 'award-page', 'contact-page', 'legal-page'],
        },
        async leave(data) {
          lenis.stop()
          await transitions.transitionIn()
          $(data.current.container).hide()
        },
        async enter() {
          await transitions.transitionOut(false)
        },
        after() {
          lenis.start()
        },
      },
      {
        once: () => {
          if (is404Page()) return
          animateTransitions.loader(3)
          lenis.scrollTo(0, { duration: 0.5 })
          matchMedia.add(isDesktop, () => {
            cursor.init()
            magneticCursor()
          })
        },
      },
      {
        name: 'list-detail-transition',
        to: {
          namespace: ['detail-page'],
        },
        from: {
          namespace: ['list-page', 'home-page'],
        },
        async enter(data) {
          helperFunctions.createHeroSplitTypes($('[data-hero-element=headline]'))
          animateTransitions.makeItemActive(data)
          const detailTransitionTl = gsap.timeline()
          return detailTransitionTl.to(data.current.container, { opacity: 0, duration: 0.5 }).call(
            async () => {
              $(data.next.container).addClass('fixed')
              await animateTransitions.flipAnimation(
                $('.active-flip-item'),
                $('[data-flip-element=hero]'),
                $('[data-flip-element=first-target]')
              )
            },
            [],
            '<'
          )
        },
        after(data) {
          $(data.next.container).removeClass('fixed')
          $('.active-flip-item').removeClass('active-flip-item')
        },
      },
      {
        name: 'detail-detail-transition',
        to: {
          namespace: ['detail-page'],
        },
        from: {
          namespace: ['detail-page'],
        },
        enter() {
          proxy.pageReady = false
        },
        afterEnter() {
          // Leave empty
        },
        after() {
          requestAnimationFrame(() => {
            lenis.scrollTo(0, { duration: 0, immediate: true })
            proxy.pageReady = true
          })
        },
      },
    ],
  })
}

export default setupBarba
