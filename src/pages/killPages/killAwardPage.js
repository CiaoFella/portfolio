import killAwardListHover from '../../features/general/awardListHover'
import killAwardListScroll from '../../features/general/awardListScroll'
import killHeadlineScroll from '../../features/general/headlineScroll'
import killConnectScroll from '../../features/general/connectScroll'
import killFooter from '../../features/general/footer'
import killSharedComponents from './killSharedComponents'
import { killMatter } from '../../utils/matter'

export default function killAwardPage() {
  return [
    killMatter(),
    killAwardListHover(),
    killAwardListScroll(),
    killHeadlineScroll(),
    killConnectScroll(),
    killFooter(),
    killSharedComponents(),
  ]
}
