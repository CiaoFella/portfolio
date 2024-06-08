import { killReducedTeaser } from '../../features/listPage/reducedTeaser'
import killSharedComponents from './killSharedComponents'

export default function killListPage() {
  return [killReducedTeaser(), killSharedComponents()]
}
