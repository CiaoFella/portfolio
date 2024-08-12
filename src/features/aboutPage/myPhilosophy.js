import { gsap, ScrollTrigger } from '../../vendor.js'
import { isDesktop, isMobile, isTablet } from '../../utils/variables.js'

gsap.registerPlugin(ScrollTrigger)

let ctx
const mm = gsap.matchMedia()

export default function initMyPhilosophy() {
  ctx = gsap.context(() => {
    const myPhilosophyWrap = $('[data-animate=my-philosophy-wrap]')
    const path = myPhilosophyWrap.find('[data-animate=philosophy-line-path]')
    const mobilePath = myPhilosophyWrap.find('[data-animate=philosophy-line-path-mobile]')

    let currentPath = path

    mm.add(isMobile, () => {
      currentPath = mobilePath
    })

    const length = currentPath[0].getTotalLength()
    currentPath.css('stroke-dasharray', length)
    currentPath.css('stroke-dashoffset', length)

    const myPhilosophyTl = gsap.timeline()

    myPhilosophyTl.to(currentPath, { strokeDashoffset: 0, duration: 1 })

    mm.add(isDesktop, () => {
      ScrollTrigger.create({
        animation: myPhilosophyTl,
        trigger: myPhilosophyWrap,
        start: '2.5% top',
        end: 'bottom center',
        scrub: true,
      })
    })

    mm.add(isTablet, () => {
      ScrollTrigger.create({
        animation: myPhilosophyTl,
        trigger: myPhilosophyWrap,
        start: '15% center',
        end: 'bottom 25%',
        scrub: true,
      })
    })
  })
}

export function killMyPhilosophy() {
  if (ctx) {
    ctx.revert()
  }
}
