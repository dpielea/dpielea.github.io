import * as THREE from 
            'https://cdn.jsdelivr.net/npm/three@v0.171.0/build/three.module.js';
          

const waitForElementAndInitialize = () => {
    const targetElement = document.getElementById("3D");

    if (targetElement) {
        // Element is found, initialize the scene
        initializeScene(targetElement);
    } else {
        // Retry after a short delay
        console.log("Waiting for target element...");
        setTimeout(waitForElementAndInitialize, 100); // Check again in 100ms
    }
};

const initializeScene = (targetElement) => {
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const parentWidth = targetElement.clientWidth; // Get parent's width
    const parentHeight = targetElement.clientHeight; // Get parent's height
    const camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({antialias:true});

    // Set renderer size to match parent dimensions
    renderer.setSize(parentWidth, parentHeight);
    renderer.setPixelRatio(devicePixelRatio)
    targetElement.appendChild(renderer.domElement); // Attach renderer to the parent element

    // Create a box geometry
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23 * Math.PI /180;
    scene.add(earthGroup)

    const sphere = new THREE.Mesh( new THREE.IcosahedronGeometry(1,12 ), new THREE.MeshBasicMaterial( { 
        map : new THREE.TextureLoader().load('images/2k_earth_daymap.jpg')} ) ); 
    earthGroup.add( sphere );

    /*
    
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );
    
    var ambientLight = new THREE.AmbientLight(0xbbbbbb,0.3)
    scene.add(ambientLight)
    scene.fog = new THREE.Fog(0x53ef3,400,2000)

    const atmo = new THREE.Mesh( new THREE.SphereGeometry( 5, 50, 50 ), new THREE.MeshBasicMaterial({
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        color:0xFFFFFF,
    }) ); 
    atmo.scale.set(1.1,1.1,1.1)
    scene.add( atmo );*/
    
    

    // Set camera position
    camera.position.z = 2;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.0006;
        renderer.render(scene, camera);
    }
    animate();

    console.log("Scene initialized!");
};

// Start the loop
waitForElementAndInitialize();

        
   
