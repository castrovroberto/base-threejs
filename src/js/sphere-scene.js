import * as THREE from 'three'
import * as dat from 'dat.gui'

/*
*********************
*     THREE JS      *
*********************
*/

// --------------------
// -- Texture loader --
// --------------------
const textureLoader = new THREE.TextureLoader()
const sphereNormalTexture = textureLoader.load('/textures/sphere-normal-map.png')

// -------------------
// --     DEBUG     --
// -------------------
//const gui = new dat.GUI()

// --------------------
// --     CANVAS     --
// --------------------
const sphereCanvas = document.querySelector('canvas.sphere-canvas')

// -------------------
// --     SCENE     --
// -------------------
const sphereScene = new THREE.Scene()

// ---------------------
// --     OBJECTS     --
// ---------------------
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// -----------------------
// --     MATERIALS     --
// -----------------------
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = sphereNormalTexture
material.color = new THREE.Color(0x000000)

// ------------------
// --     MESH     --
// ------------------
const sphere = new THREE.Mesh(sphereGeometry,material)
sphereScene.add(sphere)
/*
const planeFolder = gui.addFolder("Plane")
planeFolder.add(plane.rotation, 'x').min(10.5).max(12).step(0.001)
planeFolder.add(plane.rotation, 'z').min(-5).max(5).step(0.001)
*/

// --------------------
// --     LIGHTS     --
// --------------------
// key light
const keyLight = new THREE.PointLight(0xffffff, 0.1)
keyLight.position.set(2,3,3)
keyLight.intensity = 10
sphereScene.add(keyLight)

/*
const keyLightFolder = gui.addFolder("KeyLight")
keyLightFolder.add(keyLight.position, 'y').min(-3).max(3).step(0.01)
keyLightFolder.add(keyLight.position, 'x').min(-6).max(6).step(0.01)
keyLightFolder.add(keyLight.position, 'z').min(-3).max(3).step(0.01)
keyLightFolder.add(keyLight, 'intensity').min(0).max(10).step(0.01)

const keyLightColor = {
    color: 0xffffff
}

keyLightFolder.addColor(keyLightColor, 'color')
    .onChange(() => {
        keyLight.color.set(keyLightColor.color)
    })


const keyLightHelper = new THREE.PointLightHelper(keyLight, 0.1)
sphereScene.add(keyLightHelper)
*/

// back light
const backLight = new THREE.PointLight(0x96ff, 0.1)
backLight.position.set(-0.8,-1,-1)
backLight.intensity = 10
sphereScene.add(backLight)

/*
const backLightFolder = gui.addFolder("BackLight")
backLightFolder.add(backLight.position, 'y').min(-3).max(3).step(0.01)
backLightFolder.add(backLight.position, 'x').min(-6).max(6).step(0.01)
backLightFolder.add(backLight.position, 'z').min(-3).max(3).step(0.01)
backLightFolder.add(backLight, 'intensity').min(0).max(10).step(0.01)

const backLightColor = {
    color: 0x96ff
}

backLightFolder.addColor(backLightColor, 'color')
    .onChange(() => {
        backLight.color.set(backLightColor.color)
    })
*/

//const backLightHelper = new THREE.PointLightHelper(backLight, 0.1)
//scene.add(backLightHelper)

// fill light 
const fillLight = new THREE.PointLight(0xff0000, 0.1)
fillLight.position.set(1.5,1,-1.5)
fillLight.intensity = 5
sphereScene.add(fillLight)

/*
const fillLightFolder = gui.addFolder("FillLight")
fillLightFolder.add(fillLight.position, 'y').min(-3).max(3).step(0.01)
fillLightFolder.add(fillLight.position, 'x').min(-6).max(6).step(0.01)
fillLightFolder.add(fillLight.position, 'z').min(-3).max(3).step(0.01)
fillLightFolder.add(fillLight, 'intensity').min(0).max(10).step(0.01)

const fillLightColor = {
    color: 0xff0000
}

fillLightFolder.addColor(fillLightColor, 'color')
    .onChange(() => {
        fillLight.color.set(fillLightColor.color)
    })
*/

//const fillLightHelper = new THREE.PointLightHelper(fillLight, 0.1)
//scene.add(fillLightHelper)

// -------------------
// --     SIZES     --
// -------------------
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    sphereCamera.aspect = sizes.width / sizes.height
    sphereCamera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// --------------------
// --     CAMERA     --
// --------------------
const sphereCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
sphereCamera.position.x = 0
sphereCamera.position.y = 0
sphereCamera.position.z = 2
sphereScene.add(sphereCamera)

// ----------------------
// --     RENDERER     --
// ----------------------
const renderer = new THREE.WebGLRenderer({
    canvas: sphereCanvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ---------------------
// --     ANIMATE     --
// ---------------------
document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .0011
}

window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(sphereScene, sphereCamera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()