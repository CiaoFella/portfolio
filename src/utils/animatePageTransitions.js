import { gsap, Flip } from '../vendor.js'
import animateTextSlide from '../features/general/animateTextSlide.js'
import helperFunctions from './helperFunctions.js'
import { proxy } from './pageReadyHandler.js'
import { isDesktop, isMobile, isTablet } from './variables.js'

const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

let innerWrapStartGap = '70%'
let logoPathStartPercentage = 35
let logoScale = 30
let logoRotation = 30

const mm = gsap.matchMedia()

mm.add(isMobile, () => {
  logoPathStartPercentage = 20
})

const transitionSection = $('[data-animate=transition]')
const transitionLogo = $('[data-animate=transition-logo]')
const navBar = $('[data-animate=nav-bar]')
const loadingIndicator = $('[data-animate=preload-indicator]')

function loader(duration) {
  const transitionInnerWrap = $('[data-animate=transition-inner-wrap]')
  const textSlideWraps = $$('[data-animate=text-slide-wrap]')
  const transitionLogoLeft = $('[data-animate=transition-logo-path][data-direction=left]')
  const transitionLogoRight = $('[data-animate=transition-logo-path][data-direction=right]')

  let counter = { value: 0 }
  let loaderDuration = duration
  let delay = 0.25

  if (sessionStorage.getItem('visited') !== null) {
    loaderDuration = duration / 2
    delay = 0
  }
  sessionStorage.setItem('visited', 'true')

  function updateLoaderText() {
    let progress = Math.round(counter.value)
    loadingIndicator.textContent = progress + '%'
  }

  const loaderTl = gsap.timeline({
    defaults: { duration: loaderDuration, ease: 'expo.out' },
  })

  loaderTl.set(transitionSection, { display: 'block', immediateRender: true }, 0)

  setTransitionLogoPositions()

  loaderTl
    .from(
      transitionInnerWrap,
      {
        columnGap: innerWrapStartGap,
        duration: loaderDuration,
        ease: 'expo.inOut',
      },
      '<'
    )
    .from(
      transitionLogoLeft,
      {
        xPercent: -logoPathStartPercentage * 2,
        ease: 'expo.inOut',
      },
      '<'
    )
    .from(transitionLogoRight, { xPercent: logoPathStartPercentage * 2, ease: 'expo.inOut' }, '<')
    .call(() => animateTextSlide(textSlideWraps, 1.5), [], '>-25%')
    .call(() => transitionOut(true), [], '>+1')

  if (loadingIndicator) {
    loaderTl.from(loadingIndicator, { yPercent: 100, duration: 1, ease: 'expo.inOut' }, 0).to(
      counter,
      {
        value: 100,
        duration: loaderDuration,
        onUpdate: updateLoaderText,
        ease: 'expo.inOut',
      },
      0
    )
  }

  return loaderTl
}

function transitionIn() {
  const transitionInnerWrap = $('[data-animate=transition-inner-wrap]')
  const detailNav = $('[data-animate=detail-nav-wrap]')

  const transitionInTl = gsap.timeline({
    defaults: { duration: 1, ease: 'expo.out' },
    onStart: () => {
      proxy.pageReady = false
    },
  })

  if (loadingIndicator) {
    gsap.set(loadingIndicator, { yPercent: 100 }, 0)
  }

  if (transitionInnerWrap) {
    gsap.set(transitionInnerWrap, { opacity: 0 }, 0)
  }

  transitionInTl.set(transitionSection, { display: 'block' })

  transitionInTl.call(() => helperFunctions.slideInNavigations(navBar, detailNav, 1).reverse(), [], 0)
  transitionInTl
    .call(setTransitionLogoPositions, [], 0)
    .fromTo(
      transitionLogo,
      {
        scale: logoScale,
        rotateZ: -logoRotation * 2,
      },
      {
        scale: 1,
        rotateZ: 0,
        duration: 1,
        ease: 'expo.inOut',
      },
      '>'
    )
    .to($('[data-animate=transition-logo-path][data-direction=left]'), {
      xPercent: -logoPathStartPercentage,
      duration: 0.5,
    })
    .to(
      $('[data-animate=transition-logo-path][data-direction=right]'),
      { xPercent: logoPathStartPercentage, duration: 0.5 },
      '<'
    )
    .to(transitionInnerWrap, { columnGap: innerWrapStartGap, duration: 0.5 }, '<+0.1')

  return transitionInTl
}

async function transitionOut(isLoader) {
  const transitionInnerWrap = $('[data-animate=transition-inner-wrap]')
  const detailNav = $('[data-animate=detail-nav-wrap]')

  const transitionOutTl = gsap.timeline({
    defaults: { duration: 1, ease: 'expo.out' },
    onComplete: () => {
      requestAnimationFrame(() => {
        proxy.pageReady = true
      })
    },
  })

  gsap.set(transitionSection, { display: 'block' })
  gsap.set(navBar, { yPercent: -100 })

  if (isLoader !== true) {
    gsap.set($('[data-animate=transition-logo-path][data-direction=left]'), { xPercent: -logoPathStartPercentage })
    gsap.set($('[data-animate=transition-logo-path][data-direction=right]'), { xPercent: logoPathStartPercentage })

    transitionOutTl
      .to($('[data-animate=transition-logo-path][data-direction=left]'), {
        xPercent: 0,
        duration: 0.5,
        ease: 'expo.inOut',
      })
      .to(
        $('[data-animate=transition-logo-path][data-direction=right]'),
        { xPercent: 0, duration: 0.5, ease: 'expo.inOut' },
        '<'
      )
      .from(transitionInnerWrap, { columnGap: innerWrapStartGap, duration: 0.5, immediateRender: true }, '<+0.1')
  }
  if (isLoader === true) {
    transitionOutTl.to($('[data-animate=preload-indicator]'), { yPercent: 100, duration: 1, ease: 'expo.inOut' }, '<')
  }
  transitionOutTl
    .to(
      transitionLogo,
      {
        scale: logoScale,
        rotate: logoRotation,
        duration: 0.5,
        ease: 'expo.inOut',
      },
      '<+50%'
    )
    .to(transitionInnerWrap, { opacity: 0, duration: 0.5 }, '<')
    .call(() => helperFunctions.slideInNavigations(navBar, detailNav, 1).play(), [], '>')
    .set(transitionSection, { display: 'none' })

  return transitionOutTl
}

function makeItemActive(data) {
  const nextFlipName = $('[data-barba-namespace=detail-page]').querySelector(
    '[data-flip-element=text-identifier]'
  ).textContent
  const allOutgoingflipItems = data.current.container.querySelectorAll('[data-flip-element=teaser]')

  allOutgoingflipItems.forEach((flipItem) => {
    const name = flipItem.querySelector('[data-flip-element=text-identifier]').textContent
    // Remove all white space from both strings
    const name1 = nextFlipName.replace(/\s/g, '')
    const name2 = name.replace(/\s/g, '')
    if (name1.toUpperCase() === name2.toUpperCase()) {
      flipItem.classList.add('active-flip-item')
    }
  })
}

async function flipAnimation(start, end, firstTarget) {
  const startImgSrc = start.querySelector('[data-flip-id=flip-img]').getAttribute('src')
  const endImgSrc = end.querySelector('[data-flip-id=flip-img]').getAttribute('src')
  if (startImgSrc && endImgSrc) {
    const endElement = end.querySelector('[data-flip-id=flip-img]')
    const startElement = start.querySelector('[data-flip-id=flip-img]')
    const firstState = Flip.getState(startElement)

    endElement.classList.add('is-hidden')
    firstTarget.appendChild(startElement)

    await Flip.from(firstState, {
      duration: 1.5,
      ease: 'expo.inOut',
      toggleClass: 'is-flipping',
      onStart: () => {
        proxy.pageReady = false
      },
      onComplete: () => {
        const newIncomingElement = firstTarget.querySelector('[data-flip-id=flip-img]')
        const endState = Flip.getState(newIncomingElement)

        endElement.insertAdjacentElement('afterend', newIncomingElement)
        endElement.remove()

        Flip.from(endState, {
          duration: 1.25,
          ease: 'expo.inOut',
          toggleClass: 'is-flipping',
          onComplete: () => {
            // cleanup
            const firstTargetWrap = $('[data-flip-element=first-target-wrap]')
            firstTargetWrap.remove()
            requestAnimationFrame(() => {
              proxy.pageReady = true
            })
          },
        })
      },
    })
  }
}

function setTransitionLogoPositions() {
  let transitionLogoLeft
  let transitionLogoRight

  mm.add(isTablet, () => {
    transitionLogoLeft = $('[data-animate=transition-logo-path][data-direction=left][data-size=small]')
    transitionLogoRight = $('[data-animate=transition-logo-path][data-direction=right][data-size=small]')
  })

  mm.add(isDesktop, () => {
    transitionLogoLeft = $('[data-animate=transition-logo-path][data-direction=left][data-size=large]')
    transitionLogoRight = $('[data-animate=transition-logo-path][data-direction=right][data-size=large]')
  })

  // Use getBBox for SVG elements
  const logoLeftBBox = transitionLogoLeft.getBBox()
  const logoRightBBox = transitionLogoRight.getBBox()

  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  const positionLeftPath = {
    y: (viewportHeight - logoLeftBBox.height) / 2,
    x: (viewportWidth - logoLeftBBox.width) / 2 - 0.35 * logoLeftBBox.width,
  }

  const positionRightPath = {
    y: (viewportHeight - logoRightBBox.height) / 2,
    x: (viewportWidth - logoRightBBox.width) / 2 + 0.35 * logoRightBBox.width,
  }

  gsap.set(transitionLogoLeft, { x: positionLeftPath.x, y: positionLeftPath.y })
  gsap.set(transitionLogoRight, { x: positionRightPath.x, y: positionRightPath.y })

  transitionLogoLeft.style.transform = `translate(${positionLeftPath.x}px, ${positionLeftPath.y}px)`
  transitionLogoRight.style.transform = `translate(${positionRightPath.x}px, ${positionRightPath.y}px)`
}

const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const debouncedSetTransitionLogoPositions = debounce(setTransitionLogoPositions, 100)

window.addEventListener('resize', debouncedSetTransitionLogoPositions)

export default { loader, transitionOut, transitionIn, makeItemActive, flipAnimation, setTransitionLogoPositions }
