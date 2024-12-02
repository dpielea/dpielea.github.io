import * as THREE from 
            'https://cdn.jsdelivr.net/npm/three@v0.171.0/build/three.module.js';
          
        const scene = new THREE.Scene()
        const camera = new THREE.
        PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer()

        
        console.log(scene)
        console.log(camera)
        console.log(renderer)

        renderer.setSize(window.innerWidth, innerHeight)
        document.body.appendChild(renderer.domElement)
        
        const boxGeometry = new THREE.BoxGeometry(1,1,1)

        const material = new THREE.MeshBasicMaterial({color:0x00FF00})

        console.log(scene)
        console.log(camera)
        console.log(renderer)
        console.log(material)

        const mesh = new THREE.Mesh(boxGeometry, material)

        scene.add(mesh)
        camera.position.z = 5


        function animate() {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
            mesh.rotation.x +=0.01
            mesh.rotation.z +=0.01
        }
        animate()

        
   
