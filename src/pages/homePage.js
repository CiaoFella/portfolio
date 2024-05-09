import sharedComponents from './sharedComponents'
import animateFontWeight from '../features/general/animateFontWeight'
import animateList from '../features/general/animateList'
import animateProjectTeaser from '../features/general/animateProjectTeaser'
import animateTextElements from '../features/general/animateTextElements'
import animateHeroVideo from '../features/homePage/animateHeroVideo'
import * as UnicornStudio from '../utils/unicornStudio/unicornStudio.umd'
import handleVideos from '../features/general/handleVideos'
import animateCardList from '../features/general/animateCardList'
import animateHeadlineScroll from '../features/general/animateHeadlineScroll'
import animateConnectScroll from '../features/general/animateConnectScroll'
import animateFooter from '../features/general/animateFooter'
import animateAwardList from '../features/general/animateAwardList'
import animateAwardListHover from '../features/general/animateAwardListHover'

export default function homePage() {
  let json
  fetch('https://julianfella.netlify.app/unicornStudio/imageHover.json', {
    cache: 'no-cache',
  }).then((response) => (json = response))

  return [
    animateHeroVideo(),
    animateTextElements.animateTextOnScroll(),
    animateList(),
    animateFontWeight(),
    animateAwardListHover(),
    animateProjectTeaser(),
    sharedComponents(),
    handleVideos(),
    animateCardList(),
    animateHeadlineScroll(),
    animateConnectScroll(),
    animateFooter(),
    animateAwardList(),

    UnicornStudio.addScene({
      elementId: 'us-canvas-wrap', // id of the HTML element to render your scene in (the scene will use its dimensions)
      fps: 90, // frames per second (0-120) [optional]
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
      }),
  ]
}
