// Dynamic imports for desktop components
const loadDesktopComponents = () =>
  Promise.all([
    import('../../features/general/textContent'),
    import('../../features/aboutPage/myProcess'),
    import('../../features/aboutPage/myPhilosophy'),
    import('../../features/general/cardList'),
    import('../../features/aboutPage/passion'),
    import('../../features/general/images'),
    import('../../features/general/scrollCounter'),
    import('../../features/general/headlineScroll'),
    import('../../features/general/connectScroll'),
    import('../../features/general/footer'),
    import('./initSharedComponents'),
  ])

// Dynamic imports for mobile components
const loadMobileComponents = () =>
  Promise.all([
    import('../../features/aboutPage/myProcess'),
    import('../../features/aboutPage/myPhilosophy'),
    import('../../features/general/cardList'),
    import('../../features/aboutPage/passion'),
    import('../../features/general/images'),
    import('../../features/general/scrollCounter'),
    import('../../features/general/headlineScroll'),
    import('../../features/general/connectScroll'),
    import('../../features/general/footer'),
    import('./initSharedComponents'),
  ])

import gsap from 'gsap'
import { isDesktop, isLandscape } from '../../utils/variables'

const mm = gsap.matchMedia()

export default function initAboutPage() {
  mm.add(isDesktop, async () => {
    const [
      { default: initTextContent },
      { default: initMyProcess },
      { default: initMyPhilosophy },
      { default: initCardList },
      { default: initPassions },
      { default: initImages },
      { default: initScrollCounter },
      { default: initConnectScroll },
      { default: initFooter },
      { default: initSharedComponents },
    ] = await loadDesktopComponents()

    return [
      initTextContent(),
      initMyProcess(),
      initMyPhilosophy(),
      initCardList(),
      initPassions(),
      initImages(),
      initScrollCounter(),
      initHeadlineScroll(),
      initConnectScroll(),
      initFooter(),
      initSharedComponents(),
    ]
  })

  mm.add(isLandscape, async () => {
    const [
      { default: initMyProcess },
      { default: initMyPhilosophy },
      { default: initCardList },
      { default: initPassions },
      { default: initImages },
      { default: initScrollCounter },
      { default: initConnectScroll },
      { default: initFooter },
      { default: initSharedComponents },
    ] = await loadMobileComponents()

    return [
      initMyProcess(),
      initMyPhilosophy(),
      initCardList(),
      initPassions(),
      initImages(),
      initScrollCounter(),
      initConnectScroll(),
      initFooter(),
      initSharedComponents(),
    ]
  })
}
