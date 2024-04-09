import * as dat from 'dat.gui'
import imagesLoaded from 'imagesloaded'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'
import lenis from './smoothScroll'

// import FontFaceObserver from 'fontfaceobserver'

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene()
    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xeeeeee, 1)

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    )

    this.camera.fov = 2 * Math.atan(this.height / 2 / 300) * (180 / Math.PI)
    this.camera.position.set(0, 0, 300)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.time = 0

    this.isPlaying = true

    this.images = [
      ...document.querySelectorAll('[data-animate=project-teaser-img]'),
    ]

    this.images.forEach((singleImage) => {
      singleImage.crossOrigin = 'anonymous'
    })

    // const fontOpen = new Promise((resolve) => {
    //   new FontFaceObserver('Open Sans').load().then(() => {
    //     resolve()
    //   })
    // })

    // const fontPlayfair = new Promise((resolve) => {
    //   new FontFaceObserver('Playfair Display').load().then(() => {
    //     resolve()
    //   })
    // })

    const preloadImages = new Promise((resolve) => {
      imagesLoaded(
        document.querySelectorAll('[data-animate=project-teaser-img]'),
        { background: true },
        resolve
      )
    })

    let allDone = [preloadImages]
    this.currentScroll = 0

    Promise.all(allDone).then(() => {
      this.scroll = lenis

      this.addImages()
      // this.setPosition()
      // this.addObjects()
      this.resize()
      this.setupResize()
      this.composerPass()
      this.render()
      win.on('scroll', () => {
        this.currentScroll = window.scrollY
        this.setPosition()
      })
    })

    // this.settings();
  }

  composerPass() {
    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)

    //custom shader pass
    this.myEffect = {
      uniforms: {
        tDiffuse: { value: null },
        velocity: { value: null },
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix 
          * modelViewMatrix 
          * vec4( position, 1.0 );
      }
      `,
      fragmentShader: `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      uniform float velocity;
      void main(){
        vec2 newUV = vUv;
        float area = smoothstep(0.4,0.,vUv.y);
        newUV.x -= (vUv.x - 0.5)*0.1*area*velocity;
        gl_FragColor = texture2D( tDiffuse, newUV);
        // gl_FragColor = vec4( area,0.,0.,1.);
      }
      `,
    }

    this.customPass = new ShaderPass(this.myEffect)
    this.customPass.renderToScreen = true

    this.composer.addPass(this.customPass)
  }

  settings() {
    this.settings = {
      progress: 0,
    }
    this.gui = new dat.GUI()
    this.gui.add(this.settings, 'progress', 0, 1, 0.01)
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
      // vertexShader: vertex,
      // fragmentShader: fragment,
      wireframe: true,
      transparent: true,
    })

    this.geometry = new THREE.PlaneGeometry(200, 400, 10, 10)

    this.plane = new THREE.Mesh(this.geometry, this.material)

    this.scene.add(this.plane)
  }

  addImages() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uImage: { value: 0 },
        hover: { value: new THREE.Vector2(0.5, 0.5) },
        hoverState: { value: 0 },
      },
      side: THREE.DoubleSide,
      fragmentShader: fragment,
      vertexShader: vertex,
      wireframe: true,
    })

    this.materials = []

    this.imageStore = this.images.map((img) => {
      let bounds = img.getBoundingClientRect()

      let geometry = new THREE.PlaneGeometry(
        bounds.width,
        bounds.height,
        10,
        10
      )
      let texture = new THREE.Texture(img)
      texture.needsUpdate = true
      // let material = new THREE.MeshBasicMaterial({
      //     // color: 0xff0000,
      //     map: texture
      // })

      let material = this.material.clone()

      img.addEventListener('mouseenter', () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 1,
          ease: 'power3.out',
        })
      })
      img.addEventListener('mouseout', () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 0,
          ease: 'power3.out',
        })
      })

      this.materials.push(material)

      material.uniforms.uImage.value = texture

      let mesh = new THREE.Mesh(geometry, material)

      this.scene.add(mesh)

      return {
        img: img,
        mesh: mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
      }
    })
  }

  setPosition() {
    this.imageStore.forEach((o) => {
      o.mesh.position.y =
        this.currentScroll - o.top + this.height / 2 - o.height / 2
      o.mesh.position.x = o.left - this.width / 2 + o.width / 2
    })
  }

  stop() {
    this.isPlaying = false
  }

  play() {
    if (!this.isPlaying) {
      this.render()
      this.isPlaying = true
    }
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05 //#endregio
    this.setPosition()

    this.materials.forEach((m) => {
      m.uniforms.time.value = this.time
    })

    // this.renderer.render( this.scene, this.camera );
    this.composer.render()
    window.requestAnimationFrame(this.render.bind(this))
  }
}
