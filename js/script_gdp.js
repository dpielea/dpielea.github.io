import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/controls/OrbitControls.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerHeight, innerWidth);

/* const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial(
    { color: 0xFFFFFF }
);
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
scene.add(torus)
 */

const geometry = computeGeometry()
const material = new THREE.PointsMaterial({ 
    size: 0.015,
    vertexColors:true
 })
const mesh = new THREE.Points(geometry, material)
scene.add(mesh)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

/* const pointLight = new THREE.PointLight(0xFF000)
pointLight.position.set(5, 5, 5)
const directionalLight = new THREE.DirectionalLight(0xf90fff, 2);
scene.add(pointLight, directionalLight);

   const lightHelper = new THREE.PointLightHelper(pointLight)
  scene.add(lightHelper)
  const gridHelper = new THREE.GridHelper(200,50)
  scene.add(gridHelper) */

camera.position.set(0,2,0)
camera.lookAt(0,0,0)

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock()
let t=0




function computeGeometry(){
    const space=4, nb=100, fre=1, amp=0.1, pi2=Math.PI*2
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(nb*nb*3)
    const colors = new Float32Array(nb*nb*3)

    let k=0
    for(let i=0; i<nb; i++){
        for(let j=0; j<nb; j++){
            const x = i*(space/nb)-space/2
            const z = j*(space/nb)-space/2
            const y = amp*(Math.cos(x*pi2*fre)+Math.sin(z*pi2*fre))
            positions[3*k+0]=x
            positions[3*k+1]=y
            positions[3*k+2]=z
            const intensity =(y/amp)/2+0.3
            colors[3*k+0]= j/nb*intensity
            colors[3*k+1]= 0
            colors[3*k+2]= i/nb*intensity
            k++
    }
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions,3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors,3));
return geometry;
console.log("compte");
}

loop()

function loop() {
    t += clock.getDelta()
    animeGeometry(geometry, t)
    /* mesh.rotation.y = 0.1*t */

    /* torus.rotation.x += 0.002;
    torus.rotation.y += 0.001; */

    controls.update();
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
}
console.log("Scene initialized!");

function animeGeometry(geometry, progress){
    const space=4, nb=100, amp=0.1, pi2=Math.PI*2
    const fre = 0.8 + Math.cos(progress)/2
    const phase = progress
    let k=0
    for(let i=0; i<nb; i++){
        for(let j=0; j<nb; j++){
            const x = i*(space/nb)-space/2
            const z = j*(space/nb)-space/2
            const y = amp*(Math.cos(x*pi2*fre)+Math.sin(z*pi2*fre+progress))
            geometry.attributes.position.setY(k,y)
            const intensity =(y/amp)/2+0.3
            geometry.attributes.color.setX(k, j/nb*intensity)
            geometry.attributes.color.setZ(k, i/nb*intensity)
            k++
    }
}
geometry.attributes.position.needsUpdate =true
geometry.attributes.color.needsUpdate =true
}
