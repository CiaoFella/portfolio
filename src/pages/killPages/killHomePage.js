import { killAboutTeaser } from '../../features/general/aboutTeaser'
import { killAwardListHover } from '../../features/general/awardListHover'
import { killAwardListScroll } from '../../features/general/awardListScroll'
import { killCardList } from '../../features/general/cardList'
import { killConnectScroll } from '../../features/general/connectScroll'
import { killFooter } from '../../features/general/footer'
import { killHeadlineScroll } from '../../features/general/headlineScroll'
import { killList } from '../../features/general/list'
import { killProjectTeaser } from '../../features/general/projectTeaser'
import { killTextOnScroll } from '../../features/general/textOnScroll'
import { killAchievement } from '../../features/homePage/achievement'
import killSharedComponents from './killSharedComponents'

export default function killDetailPage() {
  return [
    killAchievement(),
    killAwardListHover(),
    killAwardListScroll(),
    killProjectTeaser(),
    killCardList(),
    killHeadlineScroll(),
    killConnectScroll(),
    killFooter(),
    killAboutTeaser(),
    killTextOnScroll(),
    killList(),
    killSharedComponents(),
  ]
}
