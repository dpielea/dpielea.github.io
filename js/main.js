//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js';
//import { OrbitControls } from 'three-orbitcontrols'
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/controls/OrbitControls.js';

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

    // Create a box geometry
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23 * Math.PI /180;
    scene.add(earthGroup)

    const sphere = new THREE.Mesh( new THREE.IcosahedronGeometry(1,12 ), new THREE.MeshLambertMaterial( { 
        map : new THREE.TextureLoader().load('images/worldmap.jpg')
        //normalMap : new THREE.TextureLoader().load('images/2k_earth_normal_map.tif')
    } ) ); 
    earthGroup.add( sphere );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
    
    directionalLight.position.set(-0.3,0.3,0.1)
    scene.add(directionalLight);
   
    // Set camera position
    camera.position.z = 2.4;
    camera.position.x = -0.5;
    camera.position.y = 0.2;

    const controls = new OrbitControls(camera, renderer.domElement);
 
        var particle = new THREE.Object3D();
        scene.add(particle);
        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading
          });
        var geometry = new THREE.TetrahedronGeometry(0.2, 0); 
        for (var i = 0; i < 1000; i++) {
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            mesh.position.multiplyScalar(90 + (Math.random() * 700));
            mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
            particle.add(mesh);
        }
        
    //const spaceTexture = new THREE.TextureLoader().load('images/2k_stars_milky_way.jpg')
    //scene.background = spaceTexture

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.0006;
        renderer.render(scene, camera);
        controls.update()
        particle.rotation.x += 0.0002;
        particle.rotation.y -= 0.0002;
    }
    animate();

    

    window.addEventListener('resize', () => {
        // Met à jour les dimensions de la caméra et du renderer
        camera.aspect = parentWidth / parentHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(parentWidth, parentHeight);
    });

    console.log("Scene initialized!");
