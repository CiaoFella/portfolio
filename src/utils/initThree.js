import * as THREE from 'three'
import vertexShader from './hoverShader/vertexShader.glsl'
import fragmentShader from './hoverShader/fragmentShader.glsl'
import lenis from './smoothScroll'

export default class initThreeJs {
  constructor(options) {
    this.canvasWrap = options.wrapper
    this.imageContainer = options.container
    this.images = options.images

    this.ANIMATION_CONFIG = {
      transitionSpeed: 0.03,
      baseIntensity: 0.005,
      hoverIntensity: 0.009,
    }

    this.easeFactor = 0.02
    this.mousePosition = { x: 0.5, y: 0.5 }
    this.targetMousePosition = { x: 0.5, y: 0.5 }
    this.mouseStopTimeout
    this.aberrationIntensity = 0.0
    this.lastPosition = { x: 0.5, y: 0.5 }
    this.prevPosition = { x: 0.5, y: 0.5 }

    this.meshItems = [] // used to store all meshes we will be creating
    this.setupCamera()
    this.createMeshItmes()
    this.render()

    this.imageContainer.forEach((container) => {
      container.addEventListener(
        'mousemove',
        this.handleMouseMove.bind(this),
        false
      )
      container.addEventListener(
        'mouseover',
        this.handleMouseEnter.bind(this),
        false
      )
      container.addEventListener(
        'mouseout',
        this.handleMouseLeave.bind(this),
        false
      )
    })
  }

  handleMouseMove(event) {
    this.easeFactor = 0.02
    this.rect = event.target.getBoundingClientRect()
    this.prevPosition = { ...this.targetMousePosition }

    this.targetMousePosition.x =
      (event.clientX - this.rect.left) / this.rect.width
    this.targetMousePosition.y =
      (event.clientY - this.rect.top) / this.rect.height

    this.aberrationIntensity = 1
  }

  handleMouseEnter(event) {
    this.easeFactor = 0.02
    this.rect = event.target.getBoundingClientRect()

    this.mousePosition.x = this.targetMousePosition.x =
      (event.clientX - this.rect.left) / this.rect.width
    this.mousePosition.y = this.targetMousePosition.y =
      (event.clientY - this.rect.top) / this.rect.height
  }

  handleMouseLeave() {
    this.easeFactor = 0.05
    this.targetMousePosition = { ...this.prevPosition }
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
    this.canvasWrap.appendChild(this.renderer.domElement)
  }

  createMeshItmes() {
    this.images.forEach((image) => {
      this.parentContainer = image.parentNode
      this.hoverImage = this.parentContainer.querySelector(
        '[data-img=threejs-hover-reveal]'
      )
      let meshItem = new MeshItem(
        image,
        this.hoverImage,
        this.scene,
        this.viewport.aspectRatio,
        this.easeFactor,
        this.mousePosition,
        this.targetMousePosition,
        this.mouseStopTimeout,
        this.aberrationIntensity,
        this.lastPosition,
        this.prevPosition
      )
      this.meshItems.push(meshItem)
    })
  }

  onWindowResize() {
    this.camera.aspect = this.viewport.aspectRatio
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.viewport.width, this.viewport.height)
  }

  render() {
    for (let i = 0; i < this.meshItems.length; i++) {
      this.meshItems[i].render()
    }
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}

class MeshItem {
  constructor(
    element,
    hoverElement,
    scene,
    viewportAspect,
    easeFactor,
    mousePosition,
    targetMousePosition,
    mouseStopTimeout,
    aberrationIntensity,
    lastPosition,
    prevPosition
  ) {
    this.element = element
    this.hoverElement = hoverElement
    this.scene = scene
    this.easeFactor = easeFactor
    this.mousePosition = mousePosition
    this.targetMousePosition = targetMousePosition
    this.mouseStopTimeout = mouseStopTimeout
    this.aberrationIntensity = aberrationIntensity
    this.lastPosition = lastPosition
    this.prevPosition = prevPosition
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
    this.hoverTexture = this.imageAspect =
      this.element.width / this.element.height

    this.uniforms = {
      u_mouse: { type: 'v2', value: new THREE.Vector2() },
      u_prevMouse: { type: 'v2', value: new THREE.Vector2() },
      u_aberrationIntensity: { type: 'f', value: 0.0 },
      u_texture: { type: 't', value: this.imageTexture },
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

    console.log(this.targetMousePosition.x)

    this.animateScene(this.mesh)
  }

  animateScene(mesh) {
    this.mousePosition.x +=
      (this.targetMousePosition.x - this.mousePosition.x) * this.easeFactor
    this.mousePosition.y +=
      (this.targetMousePosition.y - this.mousePosition.y) * this.easeFactor

    mesh.material.uniforms.u_mouse.value.set(
      this.mousePosition.x,
      1.0 - this.mousePosition.y
    )

    mesh.material.uniforms.u_prevMouse.value.set(
      this.prevPosition.x,
      1.0 - this.prevPosition.y
    )

    this.aberrationIntensity = Math.max(0.0, this.aberrationIntensity - 0.05)

    mesh.material.uniforms.u_aberrationIntensity.value =
      this.aberrationIntensity
  }

  updateStateValues(targetState, current, transitionSpeed) {
    return current + (targetState - current) * transitionSpeed
  }

  render() {
    // repeatidly called
    this.getDimensions()
    this.animateScene(this.mesh)
    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
  }
}
