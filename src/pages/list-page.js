import initReducedTeaser, { killReducedTeaser } from '../features/listPage/reducedTeaser.js'
import shared from './shared.js'

function init() {
  initReducedTeaser()
  shared.init()
}

function mobileInit() {
  initReducedTeaser()
  shared.mobileInit()
}

function cleanup() {
  killReducedTeaser()
  shared.cleanup()
}

function mobileCleanup() {
  killReducedTeaser()
  shared.mobileCleanup()
}

export default { init, cleanup, mobileInit, mobileCleanup }
