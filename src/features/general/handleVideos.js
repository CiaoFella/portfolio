let $ = window.$

import { cursor } from '../../utils/customCursor/index'

export default function handleVideos() {
  const allVideos = $('.w-background-video')

  allVideos.each((index, item) => {
    const video = item.querySelector('video')
    if (video.paused) {
      video.play()
    }

    item.addEventListener('click', function () {
      if (video.paused) {
        cursor.setText('Pause')
        video.play()
      } else {
        cursor.setText('Play')
        video.pause()
      }
    })

    item.addEventListener('mouseenter', function () {
      if (video.paused) {
        cursor.setText('Play')
      } else {
        cursor.setText('Pause')
      }
    })
  })
}
