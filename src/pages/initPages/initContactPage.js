import initContactForm from '../../features/contactPage/contactForm'
import initSharedComponents from './initSharedComponents'

export default function initContactPage() {
  return [initContactForm(), initSharedComponents()]
}
