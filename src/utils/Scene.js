import * as THREE from 'three'
import Figure from './Figure'

const perspective = 800

export default class hoverScene {
  constructor(options) {
    this.container = options.container

    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
    })

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.container.appendChild(this.renderer.domElement)

    this.initCamera()

    this.figure = new Figure(
      this.scene,
      () => {
        this.update()
      },
      document.querySelector('[data-img=threejs-hover-main]')
    )
  }

  get viewport() {
    let width = window.innerWidth
    let height = window.innerHeight
    let aspectRatio = width / height

    return {
      width,
      height,
      aspectRatio,
    }
  }

  onWindowResize() {
    this.camera.aspect = this.viewport.aspectRatio
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.viewport.width, this.viewport.height)
  }

  initCamera() {
    window.addEventListener('resize', this.onWindowResize.bind(this))
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI

    this.camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    this.camera.position.set(0, 0, perspective)
  }

  update() {
    if (this.renderer === undefined) return
    requestAnimationFrame(this.update.bind(this))

    this.figure.update()

    this.renderer.render(this.scene, this.camera)
  }
}
