import { killButtons } from '../../features/general/buttons'
import { killIcons } from '../../features/general/icons'
import { killLogo } from '../../features/general/logo'
import { killNavScroll } from '../../features/general/navScroll'
import { killSectionScale } from '../../features/general/sectionScale'
import { killVariableFontWeight } from '../../features/general/variableFontWeight'

export default function killSharedComponents() {
  return [killNavScroll(), killButtons(), killSectionScale(), killIcons(), killLogo(), killVariableFontWeight()]
}
