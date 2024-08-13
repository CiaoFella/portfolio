import initCardList, { killCardList } from '../features/general/cardList.js'
import initFullScreenImage, { killFullScreenImage } from '../features/detailPage/fullScreenImage.js'
import initImageScroll, { killImageScroll } from '../features/detailPage/imageScroll.js'
import initTextContent, { killTextContent } from '../features/general/textContent.js'
import initNextProject, { killNextProject } from '../features/detailPage/nextProject.js'
import initDetailDescription, { killDetailDescription } from '../features/detailPage/detailDescription.js'
import shared from './shared.js'

function init() {
  initDetailDescription()
  initCardList()
  initFullScreenImage()
  initImageScroll()
  initTextContent()
  initNextProject()
  shared.init()
}

function mobileInit() {
  initDetailDescription()
  initCardList()
  initFullScreenImage()
  initImageScroll()
  initTextContent()
  initNextProject()
  shared.mobileInit()
}

function cleanup() {
  killDetailDescription()
  killCardList()
  killFullScreenImage()
  killImageScroll()
  killTextContent()
  killNextProject()
  shared.cleanup()
}

function mobileCleanup() {
  killDetailDescription()
  killCardList()
  killFullScreenImage()
  killImageScroll()
  killTextContent()
  killNextProject()
  shared.mobileCleanup()
}

export default { init, cleanup, mobileInit, mobileCleanup }
