let $ = window.$

import barba from '@barba/core'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import closeMenu from './closeMenu'
import { isDesktop } from './variables'
import aboutPage from '../pages/aboutPage'
import homePage from '../pages/homePage'
import listPage from '../pages/listPage'
import callOnceComponents from '../pages/callOnceComponents'
import { cursor, magneticCursor } from './customCursor/index'
import transitions from './animatePageTransitions'
import animateTransitions from './animatePageTransitions'
import awardsPage from '../pages/awardsPage'

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
    singleTrigger.kill(false)
  }
  ScrollTrigger.refresh()
  window.dispatchEvent(new Event('resize'))
}

function setupBarba() {
  let currentPage

  barba.hooks.after((data) => {
    currentPage = $('[data-barba-namespace]').data('barbaNamespace')
    initPage(currentPage)
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
    killPage(currentPage)
  })

  barba.init({
    preventRunning: true,
    views: [{}],
    transitions: [
      {
        async leave(data) {
          await transitions.transitionIn()
          $(data.current).hide()
          resetGSAP()
        },
        enter() {
          transitions.transitionOut()
          $(window).scrollTop(0)
        },
      },
      {
        once: () => {
          // animateTransitions.loader(5)
          currentPage = $('[data-barba-namespace]').data('barbaNamespace')
          callOnceComponents()
          initPage(currentPage)
          matchMedia.add(isDesktop, () => {
            cursor.init()
            magneticCursor()
          })
        },
      },
    ],
  })
}

function killPage(currentPage) {
  if (currentPage) {
    if (currentPage === 'home-page') {
      homePage().forEach((anim) => {
        anim.forEach((trigger) => {
          trigger.kill()
        })
      })
    } else if (currentPage === 'about-page') {
      aboutPage().forEach((anim) => {
        anim.forEach((trigger) => {
          trigger.kill()
        })
      })
    }
  } else {
    return
  }
}

function initPage(currentPage) {
  if (currentPage) {
    if (currentPage === 'home-page') {
      homePage()
    } else if (currentPage === 'list-page') {
      listPage()
    } else if (currentPage === 'detail-page') {
      return
    } else if (currentPage === 'about-page') {
      aboutPage()
    } else if (currentPage === 'awards-page') {
      awardsPage()
    } else if (currentPage === 'overview-page') {
      return
    }
  } else {
    return
  }
}
export default { setupBarba }
