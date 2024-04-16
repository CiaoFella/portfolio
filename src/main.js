import beforeAfterSlider from './features/detailPage/beforeAfterSlider'
import animateMenu from './features/general/animateMenu'
import button from './features/general/button'
import './styles/style.scss'
import initThreeJs from './utils/initThree'
import initBarba from './utils/pageTransition'
import lenis from './utils/smoothScroll'
import * as UnicornStudio from './utils/unicornStudio/unicornStudio.umd'

// new initThreeJs({
//   wrapper: document.querySelector('.canvas-wrap'),
//   container: [...document.querySelectorAll('[data-img=threejs-hover-wrap]')],
//   images: [...document.querySelectorAll('[data-img=threejs-hover-main]')],
// })
UnicornStudio.addScene({
  elementId: 'us-hover', // id of the HTML element to render your scene in (the scene will use its dimensions)
  fps: 60, // frames per second (0-120) [optional]
  scale: 1, // rendering scale, use smaller values for performance boost (0.25-1) [optional]
  dpi: 1, // pixel ratio [optional]
  projectId: 'myNdurW6zb8lw4aVaq0f', // the id string for your embed (get this from "embed" export)
  filePath: 'src/utils/unicornStudio/unicornStudio.json', // if youre hosting your own exported json code, point to it here
  interactivity: {
    // [optional]
    mouse: {
      disableMobile: true, // disable touch movement on mobile
      momentum: 1.1, // mouse movement momentum
    },
    scroll: {
      disableMobile: true, // disable scroll effects on mobile
      momentum: 1.1, // scroll momentum
    },
  },
})
  .then((scene) => {
    // Scene is ready
    // To remove a scene, you can use:
    // scene.destroy()
  })
  .catch((err) => {
    console.error(err)
  })
initBarba.initBarba()
animateMenu()
beforeAfterSlider()
button()
lenis.start()
