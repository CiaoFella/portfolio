let $ = window.$

import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import animateTextSlide from '../features/general/animateTextSlide'
import helperFunctions from './helperFunctions'
import { proxy } from './pageReadyHandler'

const innerWrapStartGap = '70%'
const logoPathStartPercentage = 50
const logoScale = 25
const logoRotation = 30

const transitionSection = $('[data-animate=transition]')
const transitionLogo = transitionSection.find('[data-animate=transition-logo]')
const navBar = $('[data-animate=nav-bar]')

gsap.registerPlugin(Flip)

function loader(duration) {
  const transitionInnerWrap = transitionSection.find('[data-animate=transition-inner-wrap]')
  const loadingIndicator = transitionSection.find('[data-animate=preload-indicator]')
  const textSlideWraps = transitionSection.find('[data-animate=text-slide-wrap]')
  const transitionLogoLeft = transitionLogo.find('[data-animate=transition-logo-path][data-direction=left]')
  const transitionLogoRight = transitionLogo.find('[data-animate=transition-logo-path][data-direction=right]')

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
    loadingIndicator.text(progress + '%')
  }

  const loaderTl = gsap.timeline({
    defaults: { duration: loaderDuration, ease: 'expo.out' },
  })

  loaderTl.set(transitionSection, { display: 'block', immediateRender: true }, 0)

  setPositions(transitionLogo)

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
    .call(() => animateTextSlide(textSlideWraps, 1), [], `>-25%`)
    .call(() => transitionOut(true), [], loaderDuration)

  if (loadingIndicator.length > 0) {
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

  return [loaderTl]
}

async function transitionOut(isLoader) {
  const transitionSection = $('[data-animate=transition]')
  const transitionLogo = transitionSection.find('[data-animate=transition-logo]')
  const transitionLogoLeft = transitionLogo.find('[data-animate=transition-logo-path][data-direction=left]')
  const transitionLogoRight = transitionLogo.find('[data-animate=transition-logo-path][data-direction=right]')
  const transitionInnerWrap = transitionSection.find('[data-animate=transition-inner-wrap]')
  const detailNav = $('[data-animate=detail-nav-wrap]')

  const transitionOutTl = gsap.timeline({
    defaults: { duration: 1, ease: 'expo.out' },
    onComplete: () => {
      proxy.pageReady = true
    },
  })

  gsap.set(transitionSection, { display: 'block' })
  gsap.set(navBar, { yPercent: -100 })

  if (isLoader !== true) {
    setPositions(transitionLogo)

    gsap.set(transitionLogoLeft, { xPercent: -logoPathStartPercentage })
    gsap.set(transitionLogoRight, { xPercent: logoPathStartPercentage })

    transitionOutTl

      .to(transitionLogoLeft, {
        xPercent: 0,
        duration: 0.5,
        ease: 'expo.inOut',
      })
      .to(transitionLogoRight, { xPercent: 0, duration: 0.5, ease: 'expo.inOut' }, '<')
      .from(transitionInnerWrap, { columnGap: innerWrapStartGap, duration: 0.5, immediateRender: true }, '<+0.1')
  }
  if (isLoader === true) {
    const loadingIndicator = transitionSection.find('[data-animate=preload-indicator]')
    transitionOutTl.to(loadingIndicator, { yPercent: 100, duration: 1, ease: 'expo.inOut' }, '<')
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

function transitionIn() {
  const transitionSection = $('[data-animate=transition]')
  const transitionLogo = transitionSection.find('[data-animate=transition-logo]')
  const transitionLogoLeft = transitionLogo.find('[data-animate=transition-logo-path][data-direction=left]')
  const transitionLogoRight = transitionLogo.find('[data-animate=transition-logo-path][data-direction=right]')
  const transitionInnerWrap = transitionSection.find('[data-animate=transition-inner-wrap]')
  const detailNav = $('[data-animate=detail-nav-wrap]')

  const transitionInTl = gsap.timeline({
    defaults: { duration: 1, ease: 'expo.out' },
    onStart: () => {
      proxy.pageReady = false
    },
  })

  transitionInTl.set(transitionSection, { display: 'block' })

  transitionInTl.call(() => helperFunctions.slideInNavigations(navBar, detailNav, 1).reverse(), [], 0)
  transitionInTl
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
      0
    )
    .to(transitionLogoLeft, {
      xPercent: -logoPathStartPercentage,
      duration: 0.5,
    })
    .to(transitionLogoRight, { xPercent: logoPathStartPercentage, duration: 0.5 }, '<')
    .to(transitionInnerWrap, { columnGap: innerWrapStartGap, duration: 0.5 }, '<+0.1')

  return transitionInTl
}

function makeItemActive(data) {
  const nextFlipName = $('[data-barba-namespace=detail-page]').find('[data-flip-element=text-identifier]').text()
  const allOutgoingflipItems = $(data.current.container).find('[data-flip-element=teaser]')

  allOutgoingflipItems.each((index, flipItem) => {
    const name = $(flipItem).find('[data-flip-element=text-identifier]').text()
    // Remove all white space from both strings
    const name1 = nextFlipName.replace(/\s/g, '')
    const name2 = name.replace(/\s/g, '')
    if (name1.toUpperCase() === name2.toUpperCase()) {
      $(flipItem).addClass('active-flip-item')
    }
  })
}

async function flipAnimation(start, end, firstTarget) {
  const startImgSrc = start.find('[data-flip-id=flip-img]').attr('src')
  const endImgSrc = end.find('[data-flip-id=flip-img]').attr('src')
  if (startImgSrc && endImgSrc) {
    const endElement = end.find('[data-flip-id=flip-img]')
    const startElement = start.find('[data-flip-id=flip-img]')
    const firstState = Flip.getState(startElement)
    const detailNav = $('[data-animate=detail-nav-wrap]')

    endElement.addClass('is-hidden')
    firstTarget.append(startElement)

    await Flip.from(firstState, {
      duration: 1,
      ease: 'power3.inOut',
      toggleClass: 'is-flipping',
      onStart: () => {
        proxy.pageReady = false
      },
      onComplete: () => {
        const newIncomingElement = firstTarget.find('[data-flip-id=flip-img]')
        const endState = Flip.getState(newIncomingElement)

        newIncomingElement.insertAfter(endElement)
        endElement.remove()

        Flip.from(endState, {
          duration: 1.5,
          ease: 'power4.inOut',
          toggleClass: 'is-flipping',
          onComplete: () => {
            // cleanup
            const firstTargetWrap = $('[data-flip-element=first-target-wrap]')
            firstTargetWrap.remove()
            proxy.pageReady = true
          },
        })
      },
    })
  }
}

function setPositions(transitionLogo) {
  const transitionLogoLeft = $(transitionLogo).find('[data-animate=transition-logo-path][data-direction=left]')
  const transitionLogoRight = $(transitionLogo).find('[data-animate=transition-logo-path][data-direction=right]')
  const logoLeftClientRect = transitionLogoLeft[0].getBoundingClientRect()
  const logoRightClientRect = transitionLogoRight[0].getBoundingClientRect()

  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  const positionLeftPath = {
    y: (viewportHeight - logoLeftClientRect.height) / 2,
    x: (viewportWidth - logoLeftClientRect.width) / 2 - 0.35 * logoLeftClientRect.width,
  }
  const positionRightPath = {
    y: (viewportHeight - logoRightClientRect.height) / 2,
    x: (viewportWidth - logoRightClientRect.width) / 2 + 0.35 * logoRightClientRect.width,
  }

  transitionLogoLeft[0].style.transform = `translate(${positionLeftPath.x}px,${positionLeftPath.y}px)`
  transitionLogoRight[0].style.transform = `translate(${positionRightPath.x}px,${positionRightPath.y}px)`
}

window.addEventListener('resize', () => setPositions(transitionLogo))

export default { loader, transitionOut, transitionIn, makeItemActive, flipAnimation, setPositions }
