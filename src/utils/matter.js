import { Engine, Render, Runner, Bodies, Composite, Composites, Mouse, MouseConstraint, Events, Body } from 'matter-js'

export default function initMatter() {
  const matterWrap = document.querySelector('[data-element=matter-wrap]')

  const engine = Engine.create()
  const world = engine.world

  engine.world.gravity.y = 2 // Default gravity is 1 (downward)

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
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    let index = 0
    for (let i = 0; i < numParticlesX; i++) {
      for (let j = 0; j < numParticlesY; j++) {
        const x = centerX + (i - (numParticlesX - 1) / 2) * particleSpacingX
        const y = centerY + (j - (numParticlesY - 1) / 2) * particleSpacingY
        setTimeout(() => {
          const particle = createParticle(x, y)
          Composite.add(world, particle)
        }, index * delayBetweenParticles)
        index++
      }
    }
  }

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

  // Calculate the spacing between particles to fill the entire width and height
  const numParticlesX = 50 // Adjust as needed
  const numParticlesY = 10 // Adjust as needed
  const particleSpacingX = 15
  const particleSpacingY = 5

  // Calculate total particles and total spawn time
  const totalParticles = numParticlesX * numParticlesY
  const totalSpawnTime = 1000 // Total time in milliseconds (2 seconds)
  const delayBetweenParticles = totalSpawnTime / totalParticles

  // Add particles with staggered delay
  addParticlesWithStagger()

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

  // Make it responsive
  window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth
    render.canvas.height = window.innerHeight
    Render.lookAt(render, Composite.allBodies(world))

    // Update boundaries on resize
    updateBoundaries()
  })

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
        const velocityMagnitude = 25 // Adjust velocity magnitude as needed
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
