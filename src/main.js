import initMenu, { closeMenu } from './features/general/menu.js'
import animatePageTransitions from './utils/animatePageTransitions.js'
import createInitialState from './utils/createInitialState.js'
import setupBarba from './utils/setupBarba.js'
import lenis from './utils/smoothScroll.js'
import { gsap } from './vendor.js'

initMenu()

const barba = setupBarba()
const matchMedia = gsap.matchMedia()

createInitialState()

let currentAnimationModule = null
const transitionSection = $('[data-animate=transition]')
const transitionLogo = transitionSection.find('[data-animate=transition-logo]')

function cleanupCurrentModule() {
  if (currentAnimationModule && currentAnimationModule.cleanup) {
    currentAnimationModule.cleanup()
  }
}

function getBaseUrl() {
  const script = document.querySelector('script[src*="main.js"]')
  const scriptSrc = script?.src || ''
  const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1)
  return baseUrl
}

function loadPageModule(pageName) {
  const baseUrl = getBaseUrl()
  import(/* webpackIgnore: true */ `${baseUrl}pages/${pageName}.js`)
    .then((module) => {
      currentAnimationModule = module.default || {}
      if (typeof currentAnimationModule.init === 'function') {
        currentAnimationModule.init()
      } else {
        console.warn(`Module for page ${pageName} does not have an init function.`)
      }
    })
    .catch((err) => {
      console.error(`Failed to load module for page: ${pageName}`, err)
      currentAnimationModule = {} // Set to an empty object to avoid further errors
    })
}

// Load the initial page module
const initialPageName = document.querySelector('[data-barba="container"]').dataset.barbaNamespace
loadPageModule(initialPageName)

barba.hooks.once(() => {
  // if (is404Page()) return
  animatePageTransitions.loader(3)
  requestAnimationFrame(() => {
    lenis.scrollTo(0, { duration: 0.25 })
  })
  matchMedia.add(isDesktop, () => {
    // cursor.init()
    // magneticCursor()
  })
})

barba.hooks.beforeEnter(({ next }) => {
  cleanupCurrentModule()
  animatePageTransitions.setTransitionLogoPositions(transitionLogo)
  lenis.scrollTo(0, { duration: 0, immediate: true })
  requestAnimationFrame(() => {
    helperFunctions.refreshScrollTriggers()
  })
})

barba.hooks.beforeLeave(() => {
  animatePageTransitions.setTransitionLogoPositions(transitionLogo)
  closeMenu(true)
})

barba.hooks.afterLeave(({ next }) => {
  const pageName = next.namespace
  loadPageModule(pageName)
})
