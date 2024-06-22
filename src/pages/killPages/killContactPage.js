import { killContactForm } from '../../features/contactPage/contactForm'
import killSharedComponents from './killSharedComponents'

export default function killContactPage() {
  return [killContactForm(), killSharedComponents()]
}
