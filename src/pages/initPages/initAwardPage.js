import initAwardListHover from '../../features/general/awardListHover'
import initAwardListScroll from '../../features/general/awardListScroll'
import initSharedComponents from './initSharedComponents'
import initFooter from '../../features/general/footer'
import initConnectScroll from '../../features/general/connectScroll'
import initHeadlineScroll from '../../features/general/headlineScroll'

export default function initAwardPage() {
  return [
    initAwardListHover(),
    initAwardListScroll(),
    initHeadlineScroll(),
    initConnectScroll(),
    initFooter(),
    initSharedComponents(),
  ]
}
