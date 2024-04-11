import { Application } from '@splinetool/runtime'

const sectionHero = document.querySelector('.section--hero')

const heroModel = sectionHero.querySelector('[data-animate=hero-model] canvas')

const app = new Application(heroModel)
app.load('https://prod.spline.design/sogcTIRLlh-VFitF/scene.splinecode')

export default app
