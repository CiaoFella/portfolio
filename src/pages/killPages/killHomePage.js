import { killList } from '../../features/general/List'
import { killTextOnScroll } from '../../features/general/textOnScroll'
import { killHeroVideoScroll } from '../../features/homePage/animateHeroVideo'

export default function killDetailPage() {
  return [killHeroVideoScroll(), killTextOnScroll(), killList()]
}
