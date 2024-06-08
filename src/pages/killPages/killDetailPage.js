import { killDetailDescription } from '../../features/detailPage/detailDescription'
import { killScrollCounter } from '../../features/general/scrollCounter'
import { killImageScroll } from '../../features/detailPage/imageScroll'
import { killTextContent } from '../../features/general/textContent'
import { killNextProject } from '../../features/detailPage/nextProject'
import killSharedComponents from './killSharedComponents'

export default function killDetailPage() {
  return [
    killScrollCounter(),
    killDetailDescription(),
    killImageScroll(),
    killTextContent(),
    killNextProject(),
    killSharedComponents(),
  ]
}
