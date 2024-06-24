// Dynamic imports for desktop shared components
const loadDesktopComponents = () =>
  Promise.all([
    import('../../utils/createInitialState'),
    import('../../features/general/buttons'),
    import('../../features/general/sectionScale'),
    import('../../features/general/icons'),
    import('../../features/general/logo'),
    import('../../features/general/variableFontWeight'),
    import('../../features/general/navScroll'),
  ])

// Dynamic imports for mobile shared components
const loadMobileComponents = () =>
  Promise.all([
    import('../../utils/createInitialState'),
    import('../../features/general/sectionScale'),
    import('../../features/general/icons'),
    import('../../features/general/navScroll'),
  ])

import gsap from 'gsap'
import { isDesktop, isLandscape } from '../../utils/variables'

const mm = gsap.matchMedia()

export default function initSharedComponents() {
  mm.add(isDesktop, async () => {
    const [
      { default: createInitialState },
      { default: initButtons },
      { default: initSectionScale },
      { default: initIcons },
      { default: initLogo },
      { default: initVariableFontWeight },
      { default: initNavScroll },
    ] = await loadDesktopComponents()

    return [
      initNavScroll(),
      createInitialState(),
      initButtons(),
      initSectionScale(),
      initIcons(),
      initLogo(),
      initVariableFontWeight(),
    ]
  })

  mm.add(isLandscape, async () => {
    const [
      { default: createInitialState },
      { default: initSectionScale },
      { default: initIcons },
      { default: initNavScroll },
    ] = await loadMobileComponents()

    return [initNavScroll(), createInitialState(), initSectionScale(), initIcons()]
  })
}
