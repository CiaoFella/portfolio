import beforeAfterSlider from './features/detailPage/beforeAfterSlider'
import animateMenu from './features/general/animateMenu'
import './styles/style.scss'
import initBarba from './utils/pageTransition'
import lenis from './utils/smoothScroll'
import domLoaded from 'dom-loaded'

await domLoaded.then(() => {
  initBarba.initBarba()
  animateMenu()
  beforeAfterSlider()
  lenis.start()
})
