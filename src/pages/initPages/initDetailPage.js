import initDetailDescription from '../../features/detailPage/detailDescription'
import initCardList from '../../features/general/cardList'
import initSharedComponents from './initSharedComponents'
import initImageScroll from '../../features/detailPage/imageScroll'
import initTextContent from '../../features/general/textContent'
import initNextProject from '../../features/detailPage/nextProject'
import initScrollCounter from '../../features/general/scrollCounter'

export default function initDetailPage() {
  return [
    initScrollCounter(),
    initDetailDescription(),
    initCardList(),
    initImageScroll(),
    initTextContent(),
    initNextProject(),
    initSharedComponents(),
  ]
}
