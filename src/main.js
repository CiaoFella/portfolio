import initMenu, { closeMenu } from './features/general/menu.js'
import animatePageTransitions from './utils/animatePageTransitions.js'
import createInitialState from './utils/createInitialState.js'
import { magneticCursor, cursor } from './utils/customCursor/customCursor.js'
import helperFunctions from './utils/helperFunctions.js'
import setupBarba from './utils/setupBarba.js'
import lenis from './utils/smoothScroll.js'
import { isDesktop, isTablet } from './utils/variables.js'
import { gsap } from './vendor.js'

function resetWebflow(data) {
  window.Webflow && window.Webflow.destroy()
  window.Webflow && window.Webflow.ready()
  window.Webflow && window.Webflow.require('ix2').init()
  window.Webflow && window.Webflow.require('lottie').init()
}

initMenu()

const barba = setupBarba()
const matchMedia = gsap.matchMedia()
gsap.config({ force3D: true })

createInitialState()

let currentAnimationModule = null
const transitionSection = $('[data-animate=transition]')
const transitionLogo = transitionSection.find('[data-animate=transition-logo]')

function cleanupCurrentModule() {
  if (currentAnimationModule) {
    matchMedia.add(isDesktop, () => {
      if (typeof currentAnimationModule.cleanup === 'function') {
        currentAnimationModule.cleanup() // Desktop cleanup
      }
    })

    matchMedia.add(isTablet, () => {
      if (typeof currentAnimationModule.mobileCleanup === 'function') {
        currentAnimationModule.mobileCleanup() // Mobile cleanup
      }
    })
  }

  // Clean up any lingering ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

  // Reset the current animation module reference
  currentAnimationModule = null
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

      if (typeof currentAnimationModule.init === 'function' && typeof currentAnimationModule.mobileInit === 'function') {
        matchMedia.add(isDesktop, () => {
          currentAnimationModule.init() // Desktop init
        })

        matchMedia.add(isTablet, () => {
          currentAnimationModule.mobileInit() // Mobile init
        })
      } else {
        console.warn(`Module for page ${pageName} does not have an init or mobileInit function.`)
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
  requestAnimationFrame(() => {
    lenis.scrollTo(0, { duration: 0.25 })
  })
  matchMedia.add(isDesktop, () => {
    cursor.init()
    magneticCursor()
  })
})

barba.hooks.beforeEnter((data) => {
  cleanupCurrentModule()
})

barba.hooks.afterEnter(({}) => {
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

barba.hooks.after(({ data }) => {
  resetWebflow(data)
})
