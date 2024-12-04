import * as THREE from 
            'https://cdn.jsdelivr.net/npm/three@v0.171.0/build/three.module.js';

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

 
// Start the loop
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        
        if (entry.isIntersecting){
            entry.target.classList.add("show");
        } /*else {
            entry.target.classList.remove("show"); 

            
        }*/
    });
});

const hiddenZ = document.querySelectorAll('.hiddenZ')
hiddenZ.forEach((el)=>observer.observe(el)); 

const hiddenY = document.querySelectorAll('.hiddenY')
hiddenY.forEach((el)=>observer.observe(el)); 
   
