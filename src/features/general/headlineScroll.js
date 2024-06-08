let $ = window.$

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

let ctx

export default function initHeadlineScroll() {
  ctx = gsap.context(() => {
    const allScrollSections = $('[data-animate~=headline-scroll-section]')

    allScrollSections.each((index, section) => {
      let delay = 0
      const scrollItems = $(section).find('[data-animate=headline-scroll-item]')

      const scrollTl = gsap.timeline({ defaults: { duration: 0.75, ease: 'power2.out', stagger: 0.1 } })

      ScrollTrigger.create({
        animation: scrollTl,
        trigger: section,
        start: 'top bottom',
        end: 'top 60%',
        toggleActions: 'none play none reset',
      })

      scrollItems.each((index, headline) => {
        const dataRevealType = $(headline).data('scrollReveal')
        const dataMoveType = $(headline).data('move')
        const dataDelay = $(headline).data('delay')

        if (dataDelay) {
          delay = dataDelay
        }

        const split = createHeadlineSplit(headline, 'words')

        if (dataRevealType) {
          if (dataRevealType.includes('letter-bottom')) {
            scrollTl.from(
              createHeadlineSplit(headline, 'words,chars').chars,
              { yPercent: 100, duration: 0.5, delay, rotateZ: 2.5, stagger: 0.02 },
              '<'
            )
          }
          if (dataRevealType.includes('words-top')) {
            scrollTl.from(split.words, { yPercent: -100, delay, duration: 0.5 }, 0)
          }
          if (dataRevealType.includes('words-bottom')) {
            scrollTl.from(split.words, { yPercent: 100, delay, duration: 0.5 }, 0)
          }
          if (dataRevealType.includes('line-top')) {
            scrollTl.from(headline, { yPercent: -100, delay }, 0)
          }
          if (dataRevealType.includes('line-bottom')) {
            scrollTl.from(headline, { yPercent: 100, delay }, 0)
          }
          if (dataRevealType.includes('opacity')) {
            scrollTl.from(headline, { opacity: 0, delay, duration: 0.5, ease: 'power2.out' }, 0)
          }
        }

        if (dataMoveType) {
          if (dataMoveType === 'line-right') {
            scrollTl.from(headline, { x: '-10rem', delay, stagger: -0.1 }, '>')
          }
          if (dataMoveType === 'line-left') {
            scrollTl.from(headline, { x: '10rem', delay, stagger: 0.1 }, '>')
          }
          if (dataMoveType === 'words-right') {
            scrollTl.from(split.words, { x: '-10rem', duration: 1, delay, stagger: -0.05 }, '>-0.2')
          }
          if (dataMoveType === 'words-left') {
            scrollTl.from(split.words, { x: '10rem', duration: 1, delay, stagger: 0.05 }, '>-0.2')
          }
        }

        function createHeadlineSplit(headline, types) {
          const split = new SplitType(headline, { types: types })
          return split
        }
      })
    })
  })
}

export function killHeadlineScroll() {
  if (ctx) {
    ctx.revert()
  }
}
