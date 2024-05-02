import beforeAfterSlider from './features/detailPage/beforeAfterSlider'
import animateMenu from './features/general/animateMenu'
import './styles/style.scss'
import setupBarba from './utils/setupBarba'
import lenis from './utils/smoothScroll'
import domLoaded from 'dom-loaded'


setupBarba.setupBarba()
animateMenu()
beforeAfterSlider()
lenis.start()

