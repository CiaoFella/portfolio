import initTextContent from '../../features/general/textContent'
import initMyProcess from '../../features/aboutPage/myProcess'
import initMyPhilosophy from '../../features/aboutPage/myPhilosophy'
import initCardList from '../../features/general/cardList'
import initPassions from '../../features/aboutPage/passion'
import initImages from '../../features/general/images'
import initHeadlineScroll from '../../features/general/headlineScroll'
import initConnectScroll from '../../features/general/connectScroll'
import initFooter from '../../features/general/footer'
import initSharedComponents from './initSharedComponents'
import initScrollCounter from '../../features/general/scrollCounter'

export default function initAboutPage() {
  return [
    initTextContent(),
    initMyProcess(),
    initMyPhilosophy(),
    initCardList(),
    initPassions(),
    initImages(),
    initScrollCounter(),
    initHeadlineScroll(),
    initConnectScroll(),
    initFooter(),
    initSharedComponents(),
  ]
}
