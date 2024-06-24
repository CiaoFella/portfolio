// Dynamic imports for desktop shared components
const loadDesktopHomeComponents = () =>
  Promise.all([
    import('../../features/general/textOnScroll'),
    import('../../features/general/awardListHover'),
    import('../../features/general/cardList'),
    import('../../features/general/headlineScroll'),
    import('../../features/general/connectScroll'),
    import('../../features/general/footer'),
    import('../../features/general/awardListScroll'),
    import('../../features/general/aboutTeaser'),
    import('../../features/homePage/achievement'),
    import('../../features/listPage/reducedTeaser'),
    import('./initSharedComponents'),
  ])

// Dynamic imports for mobile shared components
const loadMobileSharedComponents = () =>
  Promise.all([
    import('../../features/general/textOnScroll'),
    import('../../features/general/cardList'),
    import('../../features/general/connectScroll'),
    import('../../features/general/footer'),
    import('../../features/general/awardListScroll'),
    import('../../features/general/aboutTeaser'),
    import('../../features/listPage/reducedTeaser'),
    import('./initSharedComponents'),
  ])

import gsap from 'gsap'
import { isDesktop, isLandscape } from '../../utils/variables'

const mm = gsap.matchMedia()

export default function initHomePage() {
  mm.add(isDesktop, async () => {
    const [
      { default: initTextOnScroll },
      { default: initAwardListHover },
      { default: initCardList },
      { default: initHeadlineScroll },
      { default: initConnectScroll },
      { default: initFooter },
      { default: initAwardListScroll },
      { default: initAboutTeaser },
      { default: initAchievement },
      { default: initReducedTeaser },
      { default: initSharedComponents },
    ] = await loadDesktopSharedComponents()

    return [
      initTextOnScroll(),
      initAwardListHover(),
      initCardList(),
      initHeadlineScroll(),
      initConnectScroll(),
      initFooter(),
      initAwardListScroll(),
      initAboutTeaser(),
      initAchievement(),
      initReducedTeaser(),
      initSharedComponents(),
    ]
  })

  mm.add(isLandscape, async () => {
    const [
      { default: initTextOnScroll },
      { default: initCardList },
      { default: initConnectScroll },
      { default: initFooter },
      { default: initAwardListScroll },
      { default: initAboutTeaser },
      { default: initReducedTeaser },
      { default: initSharedComponents },
    ] = await loadMobileSharedComponents()

    return [
      initTextOnScroll(),
      initCardList(),
      initConnectScroll(),
      initFooter(),
      initAwardListScroll(),
      initAboutTeaser(),
      initReducedTeaser(),
      initSharedComponents(),
    ]
  })
}
