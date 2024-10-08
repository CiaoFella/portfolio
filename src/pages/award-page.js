import initAwardListHover, { killAwardListHover } from '../features/general/awardListHover.js'
import initAwardListScroll, { killAwardListScroll } from '../features/general/awardListScroll.js'
import initConnectScroll, { killConnectScroll } from '../features/general/connectScroll.js'
import initFooter, { killFooter } from '../features/general/footer.js'
import initHeadlineScroll, { killHeadlineScroll } from '../features/general/headlineScroll.js'
import initMatter, { killMatter } from '../utils/matter.js'
import shared from './shared.js'

function init() {
  initAwardListHover()
  initAwardListScroll()
  initFooter()
  initConnectScroll()
  initHeadlineScroll()
  initMatter()
  shared.init()
}

function mobileInit() {
  initAwardListHover()
  initAwardListScroll()
  initFooter()
  initConnectScroll()
  initHeadlineScroll()
  initMatter()
  shared.mobileInit()
}

function cleanup() {
  killMatter()
  killAwardListHover()
  killAwardListScroll()
  killHeadlineScroll()
  killConnectScroll()
  killFooter()
  shared.cleanup()
}

function mobileCleanup() {
  killMatter()
  killAwardListHover()
  killAwardListScroll()
  killHeadlineScroll()
  killConnectScroll()
  killFooter()
  shared.mobileCleanup()
}

export default { init, cleanup, mobileInit, mobileCleanup }
