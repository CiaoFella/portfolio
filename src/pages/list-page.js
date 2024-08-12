import initReducedTeaser, { killReducedTeaser } from '../features/listPage/reducedTeaser.js'
import shared from './shared.js'

function init() {
  initReducedTeaser()
  shared.init()
}

function cleanup() {
  killReducedTeaser()
  shared.cleanup()
}

export default { init, cleanup }
