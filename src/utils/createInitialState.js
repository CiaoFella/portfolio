import SplitType from 'split-type'

let $ = window.$

export default function createInitialState() {
  const heroHeadlines = $('[data-hero] [data-hero-element=headline]')
  new SplitType(heroHeadlines, { types: 'chars' })
}
