// Dynamic imports for desktop shared components
const loadDesktopComponents = () =>
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
    import('../../features/homePage/pattern'),
    import('../../features/listPage/reducedTeaser'),
    import('./initSharedComponents'),
  ])

// Dynamic imports for mobile shared components
const loadMobileComponents = () =>
  Promise.all([
    import('../../features/general/textOnScroll'),
    import('../../features/general/cardList'),
    import('../../features/general/connectScroll'),
    import('../../features/general/footer'),
    import('../../features/general/awardListScroll'),
    import('../../features/general/aboutTeaser'),
    import('../../features/homePage/pattern'),
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
      { default: initPattern },
      { default: initReducedTeaser },
      { default: initSharedComponents },
    ] = await loadDesktopComponents()

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
      initPattern(),
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
      { default: initPattern },
      { default: initReducedTeaser },
      { default: initSharedComponents },
    ] = await loadMobileComponents()

    return [
      initTextOnScroll(),
      initCardList(),
      initConnectScroll(),
      initFooter(),
      initAwardListScroll(),
      initAboutTeaser(),
      initPattern(),
      initReducedTeaser(),
      initSharedComponents(),
    ]
  })
}
