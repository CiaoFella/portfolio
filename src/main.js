import initMenu from './features/general/menu'
import './styles/style.scss'
import setupBarba from './utils/setupBarba'
import gsap from 'gsap'

gsap.config({ force3D: true })
setupBarba()
initMenu()

