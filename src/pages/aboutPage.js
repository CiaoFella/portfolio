import myPhilosophy from '../features/aboutPage/myPhilosophy'
import myProcess from '../features/aboutPage/myProcess'
import animateCardList from '../features/general/animateCardList'
import animateConnectScroll from '../features/general/animateConnectScroll'
import animateFooter from '../features/general/animateFooter'
import animateHeadlineScroll from '../features/general/animateHeadlineScroll'
import animateImages from '../features/general/animateImages'
import animatePassions from '../features/general/animatePassion'
import animateScrollCounter from '../features/general/animateScrollCounter'
import animateTextContent from '../features/general/animateTextContent'
import sharedComponents from './sharedComponents'

export default function aboutPage() {
  return [
    animateTextContent(),
    myProcess(),
    myPhilosophy(),
    sharedComponents(),
    animateCardList(),
    animatePassions(),
    animateImages(),
    animateScrollCounter(),
    animateHeadlineScroll(),
    animateConnectScroll(),
    animateFooter(),
  ]
}
