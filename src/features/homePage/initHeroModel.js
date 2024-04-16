import { Application } from '@splinetool/runtime'

export default function initHeroModel() {
  const heroModel = document.querySelector('[data-animate=hero-model]')
  const spline = new Application(heroModel)

  if (heroModel) {
    spline.load('https://prod.spline.design/sogcTIRLlh-VFitF/scene.splinecode')
  }

  return spline
}