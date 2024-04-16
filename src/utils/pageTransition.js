let $ = window.$

import barba from '@barba/core'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import closeMenu from './closeMenu'
import customCursor from './customCursor'
import { isDesktop } from './variables'
import aboutPage from '../pages/aboutPage'
import homePage from '../pages/homePage'
import listPage from '../pages/listPage'
import callOnceComponents from '../pages/callOnceComponents'

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

gsap.registerPlugin(ScrollTrigger)

function initBarba() {
  let currentPage

  barba.hooks.after((data) => {
    currentPage = $('[data-barba-namespace]').data('barbaNamespace')
    initPage(currentPage)
    $(window).scrollTop(0)
    resetWebflow(data)
    matchMedia.add(isDesktop, () => {
      const $customCrusor = $('.cb-cursor')
      $customCrusor.remove()
      customCursor()
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
      {},
      {
        once: () => {
          customCursor()
          currentPage = $('[data-barba-namespace]').data('barbaNamespace')
          callOnceComponents()
          initPage(currentPage)
          matchMedia.add(isDesktop, () => {
            customCursor()
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
    } else if (currentPage === 'overview-page') {
      return
    }
  } else {
    return
  }
}
export default { initBarba }
