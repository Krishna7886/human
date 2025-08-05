import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// --- THE FIX: Wait for the entire page to be loaded before running any 3D code ---
document.addEventListener('DOMContentLoaded', () => {

    const canvasContainer = document.getElementById('canvas-container');

    // --- Debugging: Check the container size ---
    if (!canvasContainer) {
        console.error("CRITICAL: The #canvas-container element was not found!");
        return;
    }
    console.log(`Canvas container found. Initial size: ${canvasContainer.clientWidth}px x ${canvasContainer.clientHeight}px`);

    // Check if the container has a valid size
    if (canvasContainer.clientWidth === 0) {
        console.error("CRITICAL: Canvas container width is 0. Check your CSS. The 3D model will not be visible.");
        return;
    }


    // --- Scene, Camera, and Renderer Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    canvasContainer.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // --- 3D Model and Texture Loading ---
    let model;
    const textureLoader = new THREE.TextureLoader();
    const objLoader = new OBJLoader();

    textureLoader.load(
        'krishna.png', // Make sure this filename is correct
        (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            const material = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.1, roughness: 0.8 });

            objLoader.load(
                'krishna.obj', // Make sure this filename is correct
                (object) => {
                    object.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            child.material = material;
                        }
                    });
                    model = object;

                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);

                    // --- ADJUSTED VALUES for the new narrow layout ---
                    model.scale.set(15, 15, 15); // May need to be slightly larger now
                    model.position.y = -2.5; // Adjusted vertical position

                    scene.add(model);
                    setupScrollAnimation();
                },
                undefined,
                (error) => console.error('CRITICAL ERROR loading the OBJ file:', error)
            );
        },
        undefined,
        (error) => console.error('CRITICAL ERROR loading the texture:', error)
    );

    // --- ADJUSTED Camera Position for the new layout ---
    camera.position.z = 25;

    // --- Scroll-Based Animation ---
    function setupScrollAnimation() {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(model.rotation, {
            y: Math.PI * .2,
            scrollTrigger: {
                trigger: "#content",
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
                ease: 'none'
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
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });

}); // End of the DOMContentLoaded event listener
