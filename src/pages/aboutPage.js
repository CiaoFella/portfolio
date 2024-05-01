import myPhilosophy from '../features/aboutPage/myPhilosophy'
import myProcess from '../features/aboutPage/myProcess'
import animateHero from '../features/general/animateHero'
import sharedComponents from './sharedComponents'

export default function aboutPage() {
  return [myProcess(), myPhilosophy(), sharedComponents()]
}
