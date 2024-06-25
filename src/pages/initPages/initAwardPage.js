const loadDesktopComponents = () =>
  Promise.all([
    import('../../features/general/awardListHover'),
    import('../../features/general/awardListScroll'),
    import('../../features/general/footer'),
    import('../../features/general/connectScroll'),
    import('../../features/general/headlineScroll'),
    import('../../utils/matter'),
    import('./initSharedComponents'),
  ])

const loadMobileComponents = () =>
  Promise.all([
    import('../../features/general/awardListHover'),
    import('../../features/general/awardListScroll'),
    import('../../features/general/footer'),
    import('../../features/general/connectScroll'),
    import('../../features/general/headlineScroll'),
    import('../../utils/matter'),
    import('./initSharedComponents'),
  ])

import gsap from 'gsap'
import { isDesktop, isLandscape } from '../../utils/variables'

const mm = gsap.matchMedia()

export default function initAwardPage() {
  mm.add(isDesktop, async () => {
    const [
      { default: awardListHover },
      { default: awardListScroll },
      { default: footer },
      { default: connectScroll },
      { default: headlineScroll },
      { default: initMatter },
      { default: initSharedComponents },
    ] = await loadDesktopComponents()

    return [
      awardListHover(),
      awardListScroll(),
      footer(),
      connectScroll(),
      headlineScroll(),
      initMatter(),
      initSharedComponents(),
    ]
  })

  mm.add(isLandscape, async () => {
    const [
      { default: awardListHover },
      { default: awardListScroll },
      { default: footer },
      { default: connectScroll },
      { default: headlineScroll },
      { default: initMatter },
      { default: initSharedComponents },
    ] = await loadMobileComponents()

    return [
      awardListHover(),
      awardListScroll(),
      footer(),
      connectScroll(),
      headlineScroll(),
      initMatter(),
      initSharedComponents(),
    ]
  })
}
