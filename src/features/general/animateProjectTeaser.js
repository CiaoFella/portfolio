let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function animateProjectTeaser() {
  const projectTeaserWrap = $('[data-animate=project-teaser-wrap]')
  const projectTeaserItems = projectTeaserWrap.find(
    '[data-animate=project-teaser]'
  )

  const projectTeaserMasterTl = gsap.timeline()
  ScrollTrigger.create({
    animation: projectTeaserMasterTl,
    trigger: projectTeaserWrap,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  })

  projectTeaserItems.each((index, item) => {
    const projectTeaserTl = gsap.timeline()
    const projectTeaserImg = $(item).find('[data-animate=project-teaser-img]')
    projectTeaserTl.fromTo(
      projectTeaserImg,
      { yPercent: 10 },
      { yPercent: -10 }
    )
    let proxy = { skew: 0 }
    const skewSetter = gsap.quickSetter(item, 'skewY', 'deg')
    const clamp = gsap.utils.clamp(-1, 1)
    ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -200)
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'expo.out',
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          })
        }
      },
    })
    projectTeaserMasterTl.add(projectTeaserTl)
  })

  return [projectTeaserMasterTl]
}
