import initMenu from './features/general/menu'
import './styles/style.scss'
import setupBarba from './utils/setupBarba'

document.addEventListener('DOMContentLoaded', (event) => {
  setupBarba()
  initMenu()
})
