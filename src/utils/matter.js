import gsap from 'gsap'
import Matter, { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } from 'matter-js'
import { isDesktop, isLandscape, isMobile, isTablet } from './variables'

const mm = gsap.matchMedia()

export default function initMatter() {
  const matterWrap = document.querySelector('[data-element=matter-wrap]')

  const engine = Engine.create()
  const world = engine.world

  engine.world.gravity.y = 1 // Default gravity is 2 (downward)

  const render = Render.create({
    element: matterWrap,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: 'transparent',
    },
  })

  // Function to update boundaries
  function updateBoundaries() {
    const boundaryThickness = 2 // Adjust thickness as needed

    // Remove existing boundaries
    Composite.remove(
      world,
      world.bodies.filter((body) => body.isBoundary)
    )

    // Calculate boundary dimensions relative to window size
    const leftBoundary = Bodies.rectangle(
      boundaryThickness / 2,
      window.innerHeight / 2,
      boundaryThickness,
      window.innerHeight + boundaryThickness * 2,
      { isStatic: true, render: { visible: false } }
    )

    const rightBoundary = Bodies.rectangle(
      window.innerWidth - boundaryThickness / 2,
      window.innerHeight / 2,
      boundaryThickness,
      window.innerHeight + boundaryThickness * 2,
      { isStatic: true, render: { visible: false } }
    )

    const topBoundary = Bodies.rectangle(
      window.innerWidth / 2,
      boundaryThickness / 2,
      window.innerWidth + boundaryThickness * 2,
      boundaryThickness,
      { isStatic: true, render: { visible: false } }
    )

    const bottomBoundary = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight - boundaryThickness / 2,
      window.innerWidth + boundaryThickness * 2,
      boundaryThickness,
      { isStatic: true, render: { visible: false } }
    )

    // Add boundaries to the world
    leftBoundary.isBoundary = true
    rightBoundary.isBoundary = true
    topBoundary.isBoundary = true
    bottomBoundary.isBoundary = true

    Composite.add(world, [leftBoundary, rightBoundary, topBoundary, bottomBoundary])
  }

  // Initial setup of boundaries
  updateBoundaries()

  // List of icon textures
  const textures = [
    'https://uploads-ssl.webflow.com/65df4ab0e1e0700997c6556f/666b05454a2063183ff3c596_star-icon-spacing.svg',
    'https://uploads-ssl.webflow.com/65df4ab0e1e0700997c6556f/666b0545d084bc2bde11cc16_price-icon-spacing.svg',
    'https://uploads-ssl.webflow.com/65df4ab0e1e0700997c6556f/666b0545f1b06bff8b48916f_flower-icon-spacing.svg',
    'https://uploads-ssl.webflow.com/65df4ab0e1e0700997c6556f/666b054582b58d891c9d53df_wheel-icon-spacing.svg',
  ]

  function addParticlesWithStagger() {
    console.log('Adding particles')

    // Remove existing particles
    const particles = world.bodies.filter((body) => !body.isStatic && !body.isBoundary)
    Composite.remove(world, particles)

    // Calculate the spacing between particles to fill the entire width and height
    const particleSpacingX = 0
    const particleSpacingY = 0

    // Calculate maxParticles based on viewport dimensions
    let maxParticles = 0

    mm.add(isDesktop, () => {
      maxParticles = 200
    })
    mm.add(isTablet, () => {
      maxParticles = 150
    })
    mm.add(isLandscape, () => {
      maxParticles = 100
    })

    const numParticlesX = Math.floor(Math.sqrt(maxParticles * (window.innerWidth / window.innerHeight)))
    const numParticlesY = Math.floor(maxParticles / numParticlesX)

    // Calculate interval duration to add all particles in 2 seconds
    const intervalDuration = 5000 / maxParticles // Interval duration in milliseconds

    // Function to create custom particle (icon)
    function createParticle(x, y) {
      const randomTexture = textures[Math.floor(Math.random() * textures.length)]
      const particle = Bodies.circle(x, y, 20, {
        restitution: 0.2,
        render: {
          sprite: {
            texture: randomTexture,
            xScale: 0.8,
            yScale: 0.8,
          },
        },
      })
      return particle
    }

    // Add particles with setInterval
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    let particlesAdded = 0

    const intervalId = setInterval(() => {
      if (particlesAdded >= maxParticles) {
        clearInterval(intervalId)
        return
      }

      const i = particlesAdded % numParticlesX
      const j = Math.floor(particlesAdded / numParticlesX)

      const x = centerX + (i - (numParticlesX - 1) / 2) * particleSpacingX
      const y = centerY + (j - (numParticlesY - 1) / 2) * particleSpacingY

      const particle = createParticle(x, y)
      Composite.add(world, particle)

      particlesAdded++
    }, 1)
  }

  // Add particles with staggered delay initially
  addParticlesWithStagger()

  // Debounced function to handle window resize
  let resizeTimeout
  function handleWindowResize() {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      render.options.width = window.innerWidth
      render.options.height = window.innerHeight
      render.canvas.width = window.innerWidth
      render.canvas.height = window.innerHeight

      // Update boundaries and particles on resize
      updateBoundaries()
      addParticlesWithStagger()
    }, 200) // Adjust debounce delay as needed (200ms here)
  }

  // Add event listener for window resize using debounced function
  window.addEventListener('resize', handleWindowResize)

  // Add mouse control
  const mouse = Mouse.create(render.canvas)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0,
      render: {
        visible: false,
      },
    },
  })
  Composite.add(world, mouseConstraint)

  // Create an invisible body to represent the mouse cursor, positioned outside the visible area initially
  const mouseValue = 75
  const mouseBody = Bodies.circle(mouseValue, mouseValue, mouseValue, {
    isStatic: true, // Make it static so it doesn't fall or move due to gravity
    render: {
      visible: false, // Make it invisible
    },
  })
  Composite.add(world, mouseBody)

  // Add event listener for collision detection
  Events.on(engine, 'collisionStart', function (event) {
    const pairs = event.pairs
    pairs.forEach((pair) => {
      let collidedBody
      if (pair.bodyA === mouseBody) {
        collidedBody = pair.bodyB
      } else if (pair.bodyB === mouseBody) {
        collidedBody = pair.bodyA
      }

      if (collidedBody) {
        const velocityMagnitude = 15 // Adjust velocity magnitude as needed
        Body.setVelocity(collidedBody, {
          x: collidedBody.velocity.x + velocityMagnitude,
          y: collidedBody.velocity.y - velocityMagnitude,
        })
      }
    })
  })

  // Add event listener for 'beforeUpdate' to check boundaries
  Events.on(engine, 'beforeUpdate', function () {
    const allBodies = Composite.allBodies(world)
    const boundaryThickness = 1 // Same thickness as boundaries

    allBodies.forEach((body) => {
      if (!body.isStatic && !body.isBoundary && body !== mouseBody) {
        // Left boundary check
        if (body.position.x - body.bounds.min.x < boundaryThickness) {
          Body.setPosition(body, { x: boundaryThickness + (body.bounds.max.x - body.bounds.min.x) / 2, y: body.position.y })
          Body.setVelocity(body, { x: 0, y: body.velocity.y })
        }

        // Right boundary check
        if (body.bounds.max.x > window.innerWidth - boundaryThickness) {
          Body.setPosition(body, {
            x: window.innerWidth - boundaryThickness - (body.bounds.max.x - body.bounds.min.x) / 2,
            y: body.position.y,
          })
          Body.setVelocity(body, { x: 0, y: body.velocity.y })
        }

        // Top boundary check
        if (body.position.y - body.bounds.min.y < boundaryThickness) {
          Body.setPosition(body, { x: body.position.x, y: boundaryThickness + (body.bounds.max.y - body.bounds.min.y) / 2 })
          Body.setVelocity(body, { x: body.velocity.x, y: 0 })
        }

        // Bottom boundary check
        if (body.bounds.max.y > window.innerHeight - boundaryThickness) {
          Body.setPosition(body, {
            x: body.position.x,
            y: window.innerHeight - boundaryThickness - (body.bounds.max.y - body.bounds.min.y) / 2,
          })
          Body.setVelocity(body, { x: body.velocity.x, y: 0 })
        }
      }
    })
  })

  // Add event listener for 'mousemove' on the mouse constraint
  Events.on(mouseConstraint, 'mousemove', function (event) {
    // Get the mouse position
    const mousePosition = event.mouse.position

    // Move the mouse body to the mouse position
    Body.setPosition(mouseBody, mousePosition)
  })

  // Run the engine
  Runner.run(engine)

  // Run the renderer
  Render.run(render)
}
