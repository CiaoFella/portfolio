import initButtons, { killButtons } from '../features/general/buttons.js'
import initCurrentTime, { killCurrentTime } from '../features/general/currentTime.js'
import initIcons, { killIcons } from '../features/general/icons.js'
import initLogo, { killLogo } from '../features/general/logo.js'
import initNavScroll, { killNavScroll } from '../features/general/navScroll.js'
import initSectionScale, { killSectionScale } from '../features/general/sectionScale.js'
import initVariableFontWeight, { killVariableFontWeight } from '../features/general/variableFontWeight.js'
import createInitialState from '../utils/createInitialState.js'

function init() {
  initNavScroll()
  createInitialState()
  initButtons()
  initSectionScale()
  initIcons()
  initLogo()
  initVariableFontWeight()
}

function mobileInit() {
  createInitialState()
  initSectionScale()
  initIcons()
  initNavScroll()
}

function cleanup() {
  killNavScroll()
  killButtons()
  killSectionScale()
  killIcons()
  killLogo()
  killVariableFontWeight()
}

function mobileCleanup() {
  killSectionScale()
  killIcons()
  killNavScroll()
}

export default { init, cleanup, mobileInit, mobileCleanup }
