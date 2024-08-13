import shared from './shared.js'

function init() {
  shared.init()
}

function mobileInit() {
  shared.mobileInit()
}

function cleanup() {
  shared.cleanup()
}

function mobileCleanup() {
  shared.mobileCleanup()
}

export default { init, cleanup, mobileInit, mobileCleanup }
