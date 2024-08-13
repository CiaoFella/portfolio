import initAboutTeaser, { killAboutTeaser } from '../features/general/aboutTeaser.js'
import initAwardListHover, { killAwardListHover } from '../features/general/awardListHover.js'
import initAwardListScroll, { killAwardListScroll } from '../features/general/awardListScroll.js'
import initCardList, { killCardList } from '../features/general/cardList.js'
import initConnectScroll, { killConnectScroll } from '../features/general/connectScroll.js'
import initFooter, { killFooter } from '../features/general/footer.js'
import initHeadlineScroll, { killHeadlineScroll } from '../features/general/headlineScroll.js'
import initProjectTeaser, { killProjectTeaser } from '../features/general/projectTeaser.js'
import initTextOnScroll, { killTextOnScroll } from '../features/general/textOnScroll.js'
import initAchievement, { killAchievement } from '../features/homePage/achievement.js'
import initPattern, { killPattern } from '../features/homePage/pattern.js'
import initReducedTeaser, { killReducedTeaser } from '../features/listPage/reducedTeaser.js'
import shared from './shared.js'

function init() {
  initTextOnScroll()
  initAwardListHover()
  initCardList()
  initHeadlineScroll()
  initConnectScroll()
  initFooter()
  initAwardListScroll()
  initProjectTeaser()
  initAboutTeaser()
  initAchievement()
  initPattern()
  initReducedTeaser()
  shared.init()
}

function mobileInit() {
  initTextOnScroll()
  initCardList()
  initConnectScroll()
  initFooter()
  initAwardListScroll()
  initAboutTeaser()
  initPattern()
  initReducedTeaser()
  shared.mobileInit()
}

function cleanup() {
  killTextOnScroll()
  killAwardListScroll()
  killCardList()
  killHeadlineScroll()
  killConnectScroll()
  killFooter()
  killAwardListHover()
  killAboutTeaser()
  killAchievement()
  killPattern()
  killReducedTeaser()
  shared.cleanup()
}

function mobileCleanup() {
  killTextOnScroll()
  killCardList()
  killConnectScroll()
  killFooter()
  killAwardListScroll()
  killAboutTeaser()
  killPattern()
  killReducedTeaser()
  shared.mobileCleanup()
}

export default { init, cleanup, mobileInit, mobileCleanup }
