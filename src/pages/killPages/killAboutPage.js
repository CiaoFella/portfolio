import { killTextContent } from '../../features/general/textContent'
import { killMyProcess } from '../../features/aboutPage/myProcess'
import { killMyPhilosophy } from '../../features/aboutPage/myPhilosophy'
import { killCardList } from '../../features/general/cardList'
import { killPassions } from '../../features/aboutPage/passion'
import { killImages } from '../../features/general/images'
import { killScrollCounter } from '../../features/general/scrollCounter'
import { killHeadlineScroll } from '../../features/general/headlineScroll'
import { killConnectScroll } from '../../features/general/connectScroll'
import { killFooter } from '../../features/general/footer'
import killSharedComponents from './killSharedComponents'

export default function killAboutPage() {
  return [
    killTextContent(),
    killMyProcess(),
    killMyPhilosophy(),
    killCardList(),
    killPassions(),
    killImages(),
    killScrollCounter(),
    killHeadlineScroll(),
    killConnectScroll(),
    killFooter(),
    killSharedComponents(),
  ]
}
