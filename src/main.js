import beforeAfterSlider from './features/detailPage/beforeAfterSlider'
import animateMenu from './features/general/animateMenu'
import button from './features/general/button'
import './styles/style.scss'
import customCursor from './utils/customCursor'
import initBarba from './utils/pageTransition'
import lenis from './utils/smoothScroll'

animateMenu()
beforeAfterSlider()
button()
customCursor()
initBarba.initBarba()
lenis.start()
