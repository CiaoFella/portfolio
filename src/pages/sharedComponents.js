import animateContact from '../features/general/animateContact'
import animateSectionScale from '../features/general/animateSectionScale'
import button from '../features/general/button'
import animateIcons from '../features/general/animateIcons'

export default function sharedComponents() {
  return button(), animateSectionScale(), animateContact(), animateIcons()
}
