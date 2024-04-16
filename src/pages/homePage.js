import sharedComponents from './sharedComponents'
import animateFontWeight from '../features/general/animateFontWeight'
import animateHero from '../features/general/animateHero'
import animateHeroModel from '../features/homePage/animateHeroModel'
import animateList from '../features/general/animateList'
import animateListHover from '../features/general/animateListHover'
import animateMarquee from '../features/general/animateMarquee'
import animateProjectTeaser from '../features/general/animateProjectTeaser'

export default function homePage() {
  return [
    animateHero(),
    animateHeroModel(),
    animateMarquee(),
    animateList(),
    animateFontWeight(),
    animateListHover(),
    animateProjectTeaser(),
    sharedComponents(),
  ]
}
