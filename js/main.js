//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js';
//import { OrbitControls } from 'three-orbitcontrols'
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/controls/OrbitControls.js';
import { getFresnelMat } from './getFresnelMat.js';

    var targetElement = document.getElementById("3D");
    var sexyLady = document.getElementById("sexyContainer");
        
    var computedStyles = window.getComputedStyle(sexyContainer);
    var parentWidth = parseFloat(computedStyles.width) || sexyContainer.clientWidth; // Use computed style width
    var parentHeight = parseFloat(computedStyles.height) || sexyContainer.clientHeight; // Use computed style height

    
    // Create scene, camera, and renderer
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true }); // Alpha to support transparency

    // Set renderer size and attach to the target element
    renderer.setSize(parentWidth, parentHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    targetElement.appendChild(renderer.domElement);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    // Create a box geometry
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23 * Math.PI /180;
    scene.add(earthGroup)

    const loader = new THREE.TextureLoader();
    const Spheregeometry = new THREE.IcosahedronGeometry(1,12);

    const sphere = new THREE.MeshPhongMaterial({
        bumpMap : loader.load('images/8081_earthbump4k.jpg'),
        bumpScale : 3,
        map : loader.load('images/8081_earthmap4k.jpg')
    });
    const bmapMesh = new THREE.Mesh(Spheregeometry,sphere);
    earthGroup.add( bmapMesh );

    const LightsMap = new THREE.MeshBasicMaterial({
        map : loader.load("images/8081_earthlights4k.jpg"),
        blending : THREE.AdditiveBlending,
        opacity : 0.5
    });
    const lightMesh = new THREE.Mesh(Spheregeometry, LightsMap);
    earthGroup.add( lightMesh );

    const cloudMat = new THREE.MeshStandardMaterial({
        map : loader.load("images/8081_earthhiresclouds4K.jpg"),
        transparent : true,
        opacity : 0.5, 
        blending : THREE.AdditiveBlending,
    });
    const cloudMesh = new THREE.Mesh(Spheregeometry, cloudMat);
    cloudMesh.scale.setScalar(1.005)
    earthGroup.add(cloudMesh)

    const fresnelMat = getFresnelMat();
    const glowMesh = new THREE.Mesh(Spheregeometry,fresnelMat)
    glowMesh.scale.setScalar(1.008)
    earthGroup.add(glowMesh)

    const directionalLight = new THREE.DirectionalLight( 0xffffff,2.3 );
    directionalLight.position.set(-6,0.5,1.5)
    scene.add(directionalLight);

    /* const lightHelper = new THREE.PointLightHelper(directionalLight)
    scene.add(lightHelper)
    const gridHelper = new THREE.GridHelper(200,50)
    scene.add(gridHelper) */
    // Set camera position
    camera.position.z = 2.4;
    camera.position.x = -0.5;
    camera.position.y = 0.2;

    const controls = new OrbitControls(camera, renderer.domElement);
 
        var particle = new THREE.Object3D();
        scene.add(particle);
        var Starmaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading
          });
        var Stargeometry = new THREE.TetrahedronGeometry(0.2, 0); 
        for (var i = 0; i < 2000; i++) {
            var mesh = new THREE.Mesh(Stargeometry, Starmaterial);
            mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            mesh.position.multiplyScalar(90 + (Math.random() * 700));
            mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
            particle.add(mesh);
        }
        
    const spaceTexture = new THREE.TextureLoader().load('images/2k_stars_milky_way.jpg')
    scene.background = spaceTexture

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        bmapMesh.rotation.y += 0.0006;
        lightMesh.rotation.y += 0.0006;
        cloudMesh.rotation.y += 0.0009;
        glowMesh.rotation.y += 0.0006;
        renderer.render(scene, camera);
        controls.update()
        particle.rotation.x += 0.0002;
        particle.rotation.y -= 0.0002;
    }
    animate();

    

    /* window.addEventListener('resize', () => {
        // Met à jour les dimensions de la caméra et du renderer
        camera.aspect = parentWidth / parentHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(parentWidth, parentHeight);
    }); */

    console.log("Scene initialized!");
