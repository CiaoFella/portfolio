import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'

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

function animateCountdown(item, duration, startNumber) {
  gsap.from(item, { textContent: startNumber, duration, ease: 'power2.out', snap: { textContent: 1 } })
}

function slideInNavigations(navigation, detailNavigation, duration) {
  const navigationTl = gsap.timeline({ paused: true, defaults: { duration: duration, ease: 'power2.out' } })

  navigationTl.to(navigation, { yPercent: 0, ease: 'power2.out' }, '<')
  if (detailNavigation) {
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

export default {
  pageReady,
  getMouseEnterDirection,
  animateCountdown,
  slideInNavigations,
  createHeroSplitTypes,
  refreshScrollTriggers,
}
