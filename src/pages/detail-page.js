import initCardList, { killCardList } from '../features/general/cardList'
import initFullScreenImage, { killFullScreenImage } from '../features/detailPage/fullScreenImage'
import initImageScroll, { killImageScroll } from '../features/detailPage/imageScroll'
import initTextContent, { killTextContent } from '../features/general/textContent'
import initNextProjectextProject, { killNextProject } from '../features/detailPage/nextProject'
import initDetailDescription, { killDetailDescription } from '../features/detailPage/detailDescription'
import shared from './shared.js'

function init() {
  initDetailDescription()
  initCardList()
  initFullScreenImage()
  initImageScroll()
  initTextContent()
  initNextProjectextProject()
  shared.init()
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

export default { init, cleanup }
