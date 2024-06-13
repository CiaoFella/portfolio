import createInitialState from '../../utils/createInitialState'
import initButtons from '../../features/general/buttons'
import initSectionScale from '../../features/general/sectionScale'
import initIcons from '../../features/general/icons'
import initLogo from '../../features/general/logo'
import initVariableFontWeight from '../../features/general/variableFontWeight'
import initNavScroll from '../../features/general/navScroll'

export default function initSharedComponents() {
  return [
    initNavScroll(),
    createInitialState(),
    initButtons(),
    initSectionScale(),
    initIcons(),
    initLogo(),
    initVariableFontWeight(),
  ]
}
