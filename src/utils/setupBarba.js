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
import initListPage from '../pages/initPages/listPage'
import killListPage from '../pages/killPages/killListPage'
import { closeMenu } from '../features/general/menu'

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

function resetGSAP() {
  let existingScrollTriggers = ScrollTrigger.getAll()
  for (let index = 0; index < existingScrollTriggers.length; index++) {
    const singleTrigger = existingScrollTriggers[index]
    singleTrigger.kill()
  }
  ScrollTrigger.refresh()
  window.dispatchEvent(new Event('resize'))
}

function setupBarba() {
  let currentPage

  barba.hooks.after((data) => {
    currentPage = $('[data-barba-namespace]').data('barbaNamespace')
    resetWebflow(data)
    matchMedia.add(isDesktop, () => {
      const $customCrusor = $('.cb-cursor')
      $customCrusor.remove()
      cursor.init()
      magneticCursor()
    })
  })
  barba.hooks.beforeLeave(() => {
    closeMenu()
  })
  barba.hooks.afterEnter(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  })

  barba.hooks.once(() => {
    document.addEventListener('onPageReady', (event) => {
      if (event.detail === true) {
        animateHero().play()
        if (currentPage === 'detail-page') {
          const navBar = $('[data-animate=nav-bar]')
          const detailNav = $('[data-animate=detail-nav-wrap]')
          helperFunctions.slideInNavigations(navBar, detailNav, 1).play()
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
          initHomePage()
        },
        beforeLeave() {
          killDetailPage()
        },
      },
      {
        namespace: 'about-page',
        beforeEnter() {
          initAboutPage()
        },
        beforeLeave() {
          killAboutPage()
        },
      },
      {
        namespace: 'list-page',
        beforeEnter() {
          initListPage()
        },
        beforeLeave() {
          killListPage()
        },
      },
      {
        namespace: 'award-page',
        beforeEnter() {
          initAwardPage()
        },
        beforeLeave() {
          killAwardPage()
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
          namespace: ['about-page', 'home-page', 'list-page', 'award-page'],
        },
        async leave(data) {
          await transitions.transitionIn()
          $(data.current).hide()
          // resetGSAP()
        },
        enter() {
          transitions.transitionOut(false)
        },
      },
      {
        once: () => {
          animateTransitions.loader(2)
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
          namespace: ['list-page'],
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
        after() {
          requestAnimationFrame(() => {
            proxy.pageReady = true
            window.scrollTo({ top: 0, behavior: 'auto' })
          })
        },
      },
    ],
  })
}

export default setupBarba
