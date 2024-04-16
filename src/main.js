import beforeAfterSlider from './features/detailPage/beforeAfterSlider'
import animateMenu from './features/general/animateMenu'
import button from './features/general/button'
import './styles/style.scss'
import initBarba from './utils/pageTransition'
import lenis from './utils/smoothScroll'
// import * as UnicornStudio from './utils/unicornStudio/unicornStudio.umd'
import initThreeJs from './utils/initThree';
import hoverScene from './utils/Scene'

let json
fetch('https://julianfella.netlify.app/unicornStudio/imageHover.json').then(
  (response) => (json = response)
)

// new hoverScene({
//   container: document.querySelector('.canvas-wrap'),
// })
UnicornStudio.addScene({
  elementId: 'us-hover', // id of the HTML element to render your scene in (the scene will use its dimensions)
  fps: 120, // frames per second (0-120) [optional]
  scale: 1, // rendering scale, use smaller values for performance boost (0.25-1) [optional]
  dpi: 1, // pixel ratio [optional]
  projectId: 'myNdurW6zb8lw4aVaq0f', // the id string for your embed (get this from "embed" export)
  filePath: json, // if youre hosting your own exported json code, point to it here
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
