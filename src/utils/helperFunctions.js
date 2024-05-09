let $ = window.$

import gsap from 'gsap'

function getMouseEnterDirection(mouseEvent, item) {
  const rect = item.getBoundingClientRect()

  const mouseX = mouseEvent.clientX
  const mouseY = mouseEvent.clientY

  const topEdgeDist = Math.abs(rect.top - mouseY)
  const bottomEdgeDist = Math.abs(rect.bottom - mouseY)
  const leftEdgeDist = Math.abs(rect.left - mouseX)
  const rightEdgeDist = Math.abs(rect.right - mouseX)

  var min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist)

  switch (min) {
    case leftEdgeDist:
      return 'left'
    case rightEdgeDist:
      return 'right'
    case topEdgeDist:
      return 'top'
    case bottomEdgeDist:
      return 'bottom'
  }
}

function animateCountdown(item, duration) {
  gsap.from(item, { textContent: 0, duration, ease: 'power3.out', snap: { textContent: 1 } })
}

export default { getMouseEnterDirection, animateCountdown }
