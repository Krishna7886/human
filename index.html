import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// --- Basic Scene Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// --- Lighting ---
// Add good lighting to make sure the texture isn't washed out
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Slightly less intense ambient
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // A strong key light
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// --- 3D Model and Texture Loading ---
let model;
const textureLoader = new THREE.TextureLoader();
const objLoader = new OBJLoader();

// Load the PNG texture
console.log("Starting to load texture...");
textureLoader.load(
    // IMPORTANT: Make sure this filename is EXACTLY correct (case-sensitive!)
    'krishna.png',

    // 1. SUCCESS: This function runs if the texture is found and loaded
    (texture) => {
        console.log("Texture loaded SUCCESSFULLY!", texture);
        
        // This is crucial for some texture formats
        texture.colorSpace = THREE.SRGBColorSpace;
        
        // Create a material that uses the loaded texture
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.01, // Reduce metalness to show more color
            roughness: 0.8  // Reduce shininess
        });

        console.log("Material created with texture. Now loading OBJ model...");

        // Now load the OBJ file
        objLoader.load(
            // IMPORTANT: Make sure this filename is EXACTLY correct!
            'krishna.obj',
            (object) => {
                console.log('OBJ model loaded SUCCESSFULLY!');
                
                // Apply our new textured material to every part of the model
                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                    }
                });

                model = object;

                // --- Scale and Position the Model ---
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);

                model.scale.set(5, 5, 5);
                model.position.y = -2;

                scene.add(model);
                console.log("Model added to the scene. Setting up scroll animation.");
                setupScrollAnimation();
            },
            undefined,
            (error) => console.error('CRITICAL ERROR loading the OBJ file:', error)
        );
    },

    // 2. PROGRESS: This function runs as the texture is loading (optional)
    undefined,

    // 3. ERROR: This function runs if the texture CANNOT be found
    (error) => {
        console.error('CRITICAL ERROR: Could not load the texture!', error);
        alert('Failed to load the texture. Please open the browser console (F12) to see the error. Check that the filename is correct and you are using a local server.');
    }
);

// --- Camera Position ---
camera.position.z = 15;

// --- Scroll-Based Animation ---
function setupScrollAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(model.rotation, {
        y: Math.PI * .1,
        scrollTrigger: {
            trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5, ease: 'none'
        }
    });

    gsap.to(camera.position, {
        z: 10,
        scrollTrigger: {
            trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5, ease: 'none'
        }
    });
}

// --- Animation Loop & Resize Handler ---
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
