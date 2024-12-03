import * as THREE from 
            'https://cdn.jsdelivr.net/npm/three@v0.171.0/build/three.module.js';


const waitForElementAndInitialize = () => {
    const targetElement = document.getElementById("3D");
    const sexyLady = document.getElementById("sexyContainer");

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
    /* // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const parentWidth = targetElement.clientWidth; // Get parent's width
    const parentHeight = targetElement.clientHeight; // Get parent's height
    const camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({antialias:true});

    // Set renderer size to match parent dimensions
    renderer.setSize(parentWidth, parentHeight);
    renderer.setPixelRatio(devicePixelRatio)
    targetElement.appendChild(renderer.domElement); // Attach renderer to the parent element */


    const computedStyles = window.getComputedStyle(sexyContainer);
    const parentWidth = parseFloat(computedStyles.width) || sexyContainer.clientWidth; // Use computed style width
    const parentHeight = parseFloat(computedStyles.height) || sexyContainer.clientHeight; // Use computed style height

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Alpha to support transparency

    // Set renderer size and attach to the target element
    renderer.setSize(parentWidth, parentHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    targetElement.appendChild(renderer.domElement);

    // Create a box geometry
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23 * Math.PI /180;
    scene.add(earthGroup)

    const sphere = new THREE.Mesh( new THREE.IcosahedronGeometry(1,12 ), new THREE.MeshLambertMaterial( { 
        map : new THREE.TextureLoader().load('images/worldmap.jpg')} ) ); 
    earthGroup.add( sphere );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
    
    directionalLight.position.set(-0.3,0.3,0.1)
    scene.add(directionalLight);
   
    // Set camera position
    camera.position.z = 2.4;
    camera.position.x = -0.5;
    camera.position.y = 0.2;

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

        
   
