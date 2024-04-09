let $ = window.$

import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  lerp: 0.075,
  wheelMultiplier: 0.7,
  gestureOrientation: 'vertical',
  normalizeWheel: false,
  smoothTouch: false,
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

$('[data-lenis-start]').on('click', function () {
  lenis.start()
})
$('[data-lenis-stop]').on('click', function () {
  lenis.stop()
})
$('[data-lenis-toggle]').on('click', function () {
  $(this).toggleClass('stop-scroll')
  if ($(this).hasClass('stop-scroll')) {
    lenis.stop()
  } else {
    lenis.start()
  }
})

export default lenis
