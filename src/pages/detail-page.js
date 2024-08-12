import initCardList, { killCardList } from '../features/general/cardList.js'
import initFullScreenImage, { killFullScreenImage } from '../features/detailPage/fullScreenImage.js'
import initImageScroll, { killImageScroll } from '../features/detailPage/imageScroll.js'
import initTextContent, { killTextContent } from '../features/general/textContent.js'
import initNextProjectextProject, { killNextProject } from '../features/detailPage/nextProject.js'
import initDetailDescription, { killDetailDescription } from '../features/detailPage/detailDescription.js'
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
