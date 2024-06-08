import initReducedTeaser from '../../features/listPage/reducedTeaser'
import initSharedComponents from './initSharedComponents'

export default function initListPage() {
  return [initReducedTeaser(), initSharedComponents()]
}
