let $ = window.$

import gsap from 'gsap'
import Draggable from 'gsap/dist/Draggable'

gsap.registerPlugin(Draggable)

export default function beforeAfterSlider() {
  const beforeAfterWrap = $('.before-after_wrap')
  const afterImgWrap = beforeAfterWrap.find('.img-wrap.is-after')
  const dragger = beforeAfterWrap.find('.dragger')
  Draggable.create(dragger, {
    type: 'x',
    bounds: beforeAfterWrap,
    onDrag: function () {
      let x = beforeAfterWrap.width() / 2 - gsap.getProperty(this.target, 'x')
      gsap.set(afterImgWrap, { clipPath: `inset(0px ${x}px 0px 0px)` })
    },
  })
}
