import animateContact from '../features/general/animateContact'
import animateSectionScale from '../features/general/animateSectionScale'
import button from '../features/general/button'

export default function sharedComponents() {
  return button(), animateSectionScale(), animateContact()
}
