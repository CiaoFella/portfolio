import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'
import {
  isLandscape,
  isMobile,
  isTablet,
  svgEndFromBottom,
  svgEndFromLeft,
  svgEndFromRight,
  svgEndFromTop,
  svgEndToBottom,
  svgEndToLeft,
  svgEndToRight,
  svgEndToTop,
  svgStartFromBottom,
  svgStartFromLeft,
  svgStartFromRight,
  svgStartFromTop,
  svgStartToBottom,
  svgStartToLeft,
  svgStartToRight,
  svgStartToTop,
} from './variables'

let pageReady = false

function getMouseEnterDirection(mouseEvent, item) {
  const rect = item.getBoundingClientRect()

  const mouseX = mouseEvent.clientX
  const mouseY = mouseEvent.clientY

  const topEdgeDist = Math.abs(rect.top - mouseY)
  const bottomEdgeDist = Math.abs(rect.bottom - mouseY)
  const leftEdgeDist = Math.abs(rect.left - mouseX)
  const rightEdgeDist = Math.abs(rect.right - mouseX)

  var min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist)

  switch (min) {
    case leftEdgeDist:
      return 'left'
    case rightEdgeDist:
      return 'right'
    case topEdgeDist:
      return 'top'
    case bottomEdgeDist:
      return 'bottom'
  }
}

function handleCardHoverIn(mouseDirection, allDirections) {
  let start
  let end
  if (allDirections === true) {
    if (mouseDirection === 'top') {
      start = svgStartFromTop
      end = svgEndFromTop
    } else if (mouseDirection === 'bottom') {
      start = svgStartFromBottom
      end = svgEndFromBottom
    } else if (mouseDirection === 'left') {
      start = svgStartFromLeft
      end = svgEndFromLeft
    } else if (mouseDirection === 'right') {
      start = svgStartFromRight
      end = svgEndFromRight
    }
  }
  if (allDirections === false || !allDirections) {
    if (mouseDirection === 'top') {
      start = svgStartFromTop
      end = svgEndFromTop
    } else if (mouseDirection === 'bottom') {
      start = svgStartFromBottom
      end = svgEndFromBottom
    } else {
      start = svgStartFromTop
      end = svgEndFromTop
    }
  }

  return { start, end }
}

function handleCardHoverOut(mouseDirection, allDirections) {
  let start
  let end
  if (allDirections === true) {
    if (mouseDirection === 'top') {
      start = svgStartToTop
      end = svgEndToTop
    } else if (mouseDirection === 'bottom') {
      start = svgStartToBottom
      end = svgEndToBottom
    } else if (mouseDirection === 'left') {
      start = svgStartToLeft
      end = svgEndToLeft
    } else if (mouseDirection === 'right') {
      start = svgStartToRight
      end = svgEndToRight
    }
  } else if (allDirections === false || !allDirections) {
    if (mouseDirection === 'top') {
      start = svgStartToTop
      end = svgEndToTop
    } else if (mouseDirection === 'bottom') {
      start = svgStartToBottom
      end = svgEndToBottom
    } else {
      start = svgStartToTop
      end = svgEndToTop
    }
  }

  return { start, end }
}

function animateCardHover(element, start, end) {
  if (start && end) {
    return gsap.fromTo(
      element,
      { attr: { d: start } },
      {
        attr: { d: end },
        duration: 0.5,
        ease: 'power3.out',
      }
    )
  }
}

function animateCountdown(item, duration, startNumber) {
  gsap.from(item, { textContent: startNumber, duration, ease: 'power2.out', snap: { textContent: 1 } })
}

function slideInNavigations(navigation, detailNavigation, duration) {
  const navigationTl = gsap.timeline({ paused: true, defaults: { duration: duration, ease: 'power2.out' } })

  navigationTl.to(navigation, { yPercent: 0, ease: 'power2.out' }, '<')
  if (detailNavigation.length > 0) {
    navigationTl.to(detailNavigation, { y: 0 }, '<-0.1')
  }

  return navigationTl
}

function createHeroSplitTypes(elements) {
  new SplitType(elements, { types: 'chars' })
}

function refreshScrollTriggers() {
  const allScrollTrigger = ScrollTrigger.getAll()
  allScrollTrigger.forEach((trigger) => {
    trigger.refresh()
  })
  window.dispatchEvent(new Event('resize'))
}

function fadeOutPage(delay) {
  gsap.to($('[data-animate=inner-page-wrapper]'), { opacity: 0, duration: 0.5, delay })
}

function fadeInPage(delay) {
  gsap.fromTo($('[data-animate=inner-page-wrapper]'), { opacity: 0 }, { opacity: 1, duration: 0.5, delay })
}

function isGoogleAnalyticsCookieSet() {
  // List of possible Google Analytics cookie names
  const gaCookies = ['_ga', '_gid', '_gat']

  // Iterate through the document cookies
  const cookies = document.cookie.split('; ')
  for (let i = 0; i < cookies.length; i++) {
    const cookieName = cookies[i].split('=')[0]
    if (gaCookies.includes(cookieName)) {
      return true
    }
  }
  return false
}

function handleResponsiveElementRemoval() {
  if (window.matchMedia(isMobile).matches) {
    const elements = document.querySelectorAll('.remove-mobile')
    elements.forEach(function (element) {
      element.remove()
    })
  }
  if (window.matchMedia(isLandscape).matches) {
    const elements = document.querySelectorAll('.remove-landscape')
    elements.forEach(function (element) {
      element.remove()
    })
  }
  if (window.matchMedia(isTablet).matches) {
    const elements = document.querySelectorAll('.remove-tablet')
    elements.forEach(function (element) {
      element.remove()
    })
  }
  if (window.matchMedia(isTablet).matches) {
    const elements = document.querySelectorAll('.remove-desktop')
    elements.forEach(function (element) {
      element.remove()
    })
  }
}

export default {
  pageReady,
  getMouseEnterDirection,
  handleCardHoverIn,
  handleCardHoverOut,
  animateCardHover,
  animateCountdown,
  slideInNavigations,
  createHeroSplitTypes,
  refreshScrollTriggers,
  fadeOutPage,
  fadeInPage,
  isGoogleAnalyticsCookieSet,
  handleResponsiveElementRemoval,
}
