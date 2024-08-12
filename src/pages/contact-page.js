import initContactForm, { killContactForm } from '../features/contactPage/contactForm.js'
import shared from './shared.js'

function init() {
  initContactForm()
  shared.init()
}

function cleanup() {
  killContactForm()
  shared.cleanup()
}

export default { init, cleanup }
