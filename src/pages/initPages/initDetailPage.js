const loadDesktopSharedComponents = () =>
  Promise.all([
    import('../../features/detailPage/detailDescription'),
    import('../../features/general/cardList'),
    import('../../features/detailPage/imageScroll'),
    import('../../features/general/textContent'),
    import('../../features/detailPage/nextProject'),
    import('./initSharedComponents'),
  ])

const loadMobileSharedComponents = () =>
  Promise.all([
    import('../../features/detailPage/detailDescription'),
    import('../../features/general/cardList'),
    import('../../features/detailPage/imageScroll'),
    import('../../features/general/textContent'),
    import('../../features/detailPage/nextProject'),
    import('./initSharedComponents'),
  ])

import gsap from 'gsap'
import { isDesktop, isLandscape } from '../../utils/variables'

const mm = gsap.matchMedia()

export default function initDetailPage() {
  mm.add(isDesktop, async () => {
    const [
      { default: detailDescription },
      { default: cardList },
      { default: imageScroll },
      { default: textContent },
      { default: nextProject },
      { default: initSharedComponents },
    ] = await loadDesktopSharedComponents()

    return [detailDescription(), cardList(), imageScroll(), textContent(), nextProject(), initSharedComponents()]
  })

  mm.add(isLandscape, async () => {
    const [
      { default: detailDescription },
      { default: cardList },
      { default: imageScroll },
      { default: textContent },
      { default: nextProject },
      { default: initSharedComponents },
    ] = await loadMobileSharedComponents()

    return [detailDescription(), cardList(), imageScroll(), textContent(), nextProject(), initSharedComponents()]
  })
}
