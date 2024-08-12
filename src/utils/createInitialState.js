import { SplitType } from '../vendor.js'

let $ = window.$

export default function createInitialState() {
  const heroHeadlines = $('[data-hero] [data-hero-element=headline]')
  const heroParagraphs = $('[data-hero] [data-hero-element=paragraph]')
  new SplitType(heroHeadlines, { types: 'chars' })
  new SplitType(heroParagraphs, { types: 'lines' })
}
