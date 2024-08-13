import initContactForm, { killContactForm } from '../features/contactPage/contactForm.js'
import shared from './shared.js'

function init() {
  initContactForm()
  shared.init()
}

function mobileInit() {
  initContactForm()
  shared.mobileInit()
}

function cleanup() {
  killContactForm()
  shared.cleanup()
}

function mobileCleanup() {
  killContactForm()
  shared.mobileCleanup()
}

export default { init, cleanup, mobileInit, mobileCleanup }
