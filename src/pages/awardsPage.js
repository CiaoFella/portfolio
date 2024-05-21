import animateAwardList from '../features/general/animateAwardList'
import animateAwardListHover from '../features/general/animateAwardListHover'
import animateFontWeight from '../features/general/animateFontWeight'
import sharedComponents from './sharedComponents'

export default function awardsPage() {
  return [animateAwardListHover(), animateAwardList(), sharedComponents(), animateFontWeight()]
}
