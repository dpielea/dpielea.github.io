import * as THREE from 
            'https://cdn.jsdelivr.net/npm/three@v0.171.0/build/three.module.js';
          
         /*  
            setTimeout(() => {
                const targetElement = document.querySelector("#3D");
            
                if (!targetElement) {
                    console.error("Target element not found after delay.");
                    return;
                }
            
                // Create scene, camera, and renderer
                const scene = new THREE.Scene();
                const parentWidth = targetElement.clientWidth; // Get parent's width
                const parentHeight = targetElement.clientHeight; // Get parent's height
                const camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer();
            
                // Set renderer size to match parent dimensions
                renderer.setSize(parentWidth, parentHeight);
                targetElement.appendChild(renderer.domElement); // Attach renderer to the parent element
            
                // Create a box geometry
                const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                const mesh = new THREE.Mesh(boxGeometry, material);
                scene.add(mesh);
            
                // Set camera position
                camera.position.z = 5;
            
                // Animation loop
                function animate() {
                    requestAnimationFrame(animate);
                    mesh.rotation.x += 0.01;
                    mesh.rotation.y += 0.01;
                    renderer.render(scene, camera);
                }
                animate();
            }, 2000);
       */ 

const waitForElementAndInitialize = () => {
    const targetElement = document.querySelector("body > section:nth-child(6) > div > div.col-lg-6.d-flex.justify-content-center");

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
    const renderer = new THREE.WebGLRenderer();

    // Set renderer size to match parent dimensions
    renderer.setSize(parentWidth, parentHeight);
    targetElement.appendChild(renderer.domElement); // Attach renderer to the parent element

    // Create a box geometry
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(boxGeometry, material);
    scene.add(mesh);

    // Set camera position
    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    console.log("Scene initialized!");
};

// Start the loop
waitForElementAndInitialize();

        
   
