import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initMyPhilosophy() {
  ctx = gsap.context(() => {
    const myPhilosophyWrap = $('[data-animate=my-philosophy-wrap]')
    const path = myPhilosophyWrap.find('[data-animate=philosophy-line-path]')

    const length = path[0].getTotalLength()
    path.css('stroke-dasharray', length)
    path.css('stroke-dashoffset', length)

    const myPhilosophyTl = gsap.timeline()

    myPhilosophyTl.to(path, { strokeDashoffset: 0, duration: 1 })

    ScrollTrigger.create({
      animation: myPhilosophyTl,
      trigger: myPhilosophyWrap,
      start: '2.5% top',
      end: 'bottom bottom',
      scrub: true,
    })
  })
}

export function killMyPhilosophy() {
  if (ctx) {
    ctx.revert()
  }
}