import * as THREE from 'three'
import vertexShader from './shader/vertexShader.glsl'
import fragmentShader from './shader/fragmentShader.glsl'
import lenis from './smoothScroll'

export default class ListCanvas {
  constructor() {
    this.container = document.querySelector('.list-canvas-wrap')
    this.images = Array.from(
      document.querySelectorAll('[data-animate=project-teaser-img]')
    )

    this.meshItems = [] // used to store all meshes we will be creating
    this.setupCamera()
    this.createMeshItmes()
    this.render()
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

  setupCamera() {
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.scene = new THREE.Scene()
    // perspective camera
    let perspective = 1000
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI

    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.viewport.aspectRatio,
      1,
      1000
    )
    this.camera.position.set(0, 0, perspective)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(this.viewport.width, this.viewport.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.container.appendChild(this.renderer.domElement)
  }

  createMeshItmes() {
    this.images.forEach((image) => {
      let meshItem = new MeshItem(image, this.scene, this.viewport.aspectRatio)
      this.meshItems.push(meshItem)
    })
  }

  onWindowResize() {
    this.camera.aspect = this.viewport.aspectRatio
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.viewport.width, this.viewport.height)
  }

  render() {
    // smoothScroll()
    for (let i = 0; i < this.meshItems.length; i++) {
      this.meshItems[i].render()
    }
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}

class MeshItem {
  constructor(element, scene, viewportAspect) {
    this.element = element
    this.scene = scene
    this.viewportAspect = viewportAspect
    this.offset = new THREE.Vector2(0, 0)
    this.sizes = new THREE.Vector2(0, 0)
    this.createMesh()
  }

  getDimensions() {
    const { width, height, top, left } = this.element.getBoundingClientRect()
    this.sizes.set(width, height)
    this.offset.set(
      left - window.innerWidth / 2 + width / 2,
      -top + window.innerHeight / 2 - height / 2
    )
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 30, 30)
    this.imageTexture = new THREE.TextureLoader().load(this.element.src)
    this.imageAspect = this.element.width / this.element.height

    this.uniforms = {
      uTexture: { value: this.imageTexture },
      uOffset: { value: new THREE.Vector2(0.0, 0.0) },
      uAlpha: { value: 1.0 },
    }
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      // wireframe: true,
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.getDimensions()
    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 0)

    this.scene.add(this.mesh)
  }

  render() {
    // repeatidly called
    this.getDimensions()
    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
    this.uniforms.uOffset.value.set(
      0.0,
      -(lenis.targetScroll - lenis.animatedScroll) *
        0.0002 *
        Math.abs(lenis.velocity / 25)
    )
  }
}
