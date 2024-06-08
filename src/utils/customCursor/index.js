let $ = window.$

import Cursor from './cursor'
import Magnetic from './magnetic'


// Init cursor
export const cursor = new Cursor({
  container: 'body', // container to attach
  speed: 0.7, // default speed
  ease: 'expo.out', // default ease (gsap)
  visibleTimeout: 300, // disappear timeout
})


export const magneticCursor = () => {
  const allMagnetic = $('[data-magnetic]')
  allMagnetic.each(function (index, magnetic) {
    const dataAttr = $(magnetic).data('magnetic')
    switch (dataAttr) {
      case 'tiny':
        new Magnetic(this, {
          y: 0.09, // horizontal delta
          x: 0.09, // vertical delta
          s: 0.35, // speed
          rs: 1, // release speed
        })
        break
      case 'light':
        new Magnetic(this, {
          y: 0.3, // horizontal delta
          x: 0.3, // vertical delta
          s: 0.2, // speed
          rs: 1, // release speed
        })
        break
      case 'strong':
        new Magnetic(this, {
          y: 0.5, // horizontal delta
          x: 0.5, // vertical delta
          s: 0.2, // speed
          rs: 1, // release speed
        })
        break
    }
  })
}

