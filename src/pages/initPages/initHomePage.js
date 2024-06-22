import initTextOnScroll from '../../features/general/textOnScroll'
import initList from '../../features/general/list'
import initAwardListHover from '../../features/general/awardListHover'
import initProjectTeaser from '../../features/general/projectTeaser'
import initVideos from '../../features/general/initVideos'
import initCardList from '../../features/general/cardList'
import initHeadlineScroll from '../../features/general/headlineScroll'
import initConnectScroll from '../../features/general/connectScroll'
import initFooter from '../../features/general/footer'
import initAwardListScroll from '../../features/general/awardListScroll'
import initAboutTeaser from '../../features/general/aboutTeaser'
import initSharedComponents from './initSharedComponents'
import initAchievement from '../../features/homePage/achievement'

export default function initHomePage() {
  return [
    initAchievement(),
    initAwardListHover(),
    initAwardListScroll(),
    initProjectTeaser(),
    initVideos(),
    initCardList(),
    initHeadlineScroll(),
    initConnectScroll(),
    initFooter(),
    initAboutTeaser(),
    initTextOnScroll(),
    initList(),
    initSharedComponents(),

    // let json
    // fetch('https://julianfella.netlify.app/unicornStudio/imageHover.json', {
    //   cache: 'no-cache',
    // }).then((response) => (json = response))

    // UnicornStudio.addScene({
    //   elementId: 'us-canvas-wrap', // id of the HTML element to render your scene in (the scene will use its dimensions)
    //   fps: 90, // frames per second (0-120) [optional]
    //   scale: 1, // rendering scale, use smaller values for performance boost (0.25-1) [optional]
    //   dpi: 1, // pixel ratio [optional]
    //   projectId: 'myNdurW6zb8lw4aVaq0f', // the id string for your embed (get this from "embed" export)
    //   filePath: json, // if youre hosting your own exported json code, point to it here
    // })
    //   .then((scene) => {
    //     // Scene is ready
    //     // To remove a scene, you can use:
    //     // scene.destroy()
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   }),
  ]
}
