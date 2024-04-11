let $ = window.$

import Cursor from './cursor'
import Magnetic from './magnetic'

function customCursor() {
  // Init cursor
  const cursor = new Cursor({
    container: 'body', // container to attach
    speed: 0.7, // default speed
    ease: 'expo.out', // default ease (gsap)
    visibleTimeout: 300, // disappear timeout
  })

  // Init magnetic
  $('[data-magnetic]').each(function () {
    new Magnetic(this, {
      y: 0.5, // horizontal delta
      x: 0.5, // vertical delta
      s: 0.2, // speed
      rs: 0.25, // release speed
    })
  })

  return cursor
}

export default customCursor
