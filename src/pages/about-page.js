import initMyPhilosophy, { killMyPhilosophy } from '../features/aboutPage/myPhilosophy.js'
import initMyProcess, { killMyProcess } from '../features/aboutPage/myProcess.js'
import initPassions, { killPassions } from '../features/aboutPage/passion.js'
import initCardList, { killCardList } from '../features/general/cardList.js'
import initConnectScroll, { killConnectScroll } from '../features/general/connectScroll.js'
import initFooter, { killFooter } from '../features/general/footer.js'
import initHeadlineScroll, { killHeadlineScroll } from '../features/general/headlineScroll.js'
import initImages, { killImages } from '../features/general/images.js'
import initScrollCounter, { killScrollCounter } from '../features/general/scrollCounter.js'
import initTextContent, { killTextContent } from '../features/general/textContent.js'
import shared from './shared.js'

function init() {
  initTextContent()
  initMyProcess()
  initMyPhilosophy()
  initCardList()
  initPassions()
  initImages()
  initScrollCounter()
  initHeadlineScroll()
  initConnectScroll()
  initFooter()
  shared.init()
}

function cleanup() {
  killTextContent()
  killMyProcess()
  killMyPhilosophy()
  killCardList()
  killPassions()
  killImages()
  killScrollCounter()
  killHeadlineScroll()
  killConnectScroll()
  killFooter()
  shared.cleanup()
}

export { init, cleanup }
