  AFRAME.registerComponent('bounce', {
            init: function () {
                this.el.addEventListener('collide', (e) => {
                    console.log('Collided with', e.detail.body.el);
                });
            }
        });

        // Wait for everything to be ready
        document.addEventListener('DOMContentLoaded', function () {
            const sceneEl = document.querySelector('a-scene');
            
            // Wait for scene to be fully loaded
            if (sceneEl.hasLoaded) {
                initializePopup();
            } else {
                sceneEl.addEventListener('loaded', function() {
                    // Add a small delay to ensure everything is ready
                    setTimeout(initializePopup, 100);
                });
            }
        });

        function initializePopup() {
            const popup = document.getElementById('popup');
            const closeBtn = document.getElementById('closeBtn');
            const sphere = document.querySelector('.clickable');

            console.log('Initializing popup system...');

            // Add click listener to sphere
            sphere.addEventListener('click', function (event) {
                console.log('Sphere clicked! Showing popup...');
                
                try {
                    // Get screen position using the safer method
                    const pos = getSphereScreenPosition();
                    
                    // Position popup near the click
                    popup.style.left = `${pos.x}px`;
                    popup.style.top = `${pos.y}px`;
                    popup.style.display = 'block';
                    
                    console.log('Popup positioned at:', pos);
                } catch (error) {
                    console.log('Error positioning popup, using fallback:', error);
                    // Fallback: show popup in center
                    popup.style.left = '50%';
                    popup.style.top = '50%';
                    popup.style.transform = 'translate(-50%, -50%)';
                    popup.style.display = 'block';
                }
            });

            // Close button handler
            closeBtn.addEventListener('click', function () {
                popup.style.display = 'none';
                popup.style.transform = ''; // Reset transform
                console.log('Popup closed');
            });

            console.log('Popup system initialized successfully!');
        }

        function getSphereScreenPosition() {
            try {
                const sphere = document.querySelector('.clickable');
                const camera = document.querySelector('a-camera');
                
                // Wait for camera to be ready
                if (!camera.object3D || !camera.object3D.matrixWorld) {
                    throw new Error('Camera not ready');
                }
                
                // Get world position of sphere
                const worldPos = new THREE.Vector3();
                sphere.object3D.getWorldPosition(worldPos);
                
                // Get camera 
                const cameraObj = camera.getObject3D('camera');
                if (!cameraObj) {
                    throw new Error('Camera object not found');
                }
                
                // Project world position to screen
                const vector = worldPos.clone();
                vector.project(cameraObj);
                
                // Convert to screen coordinates
                const x = Math.round((vector.x + 1) * window.innerWidth / 2);
                const y = Math.round((-vector.y + 1) * window.innerHeight / 2);
                
                // Add offset so popup doesn't cover sphere
                return {
                    x: Math.min(x + 60, window.innerWidth - 320), // Ensure popup stays in viewport
                    y: Math.max(y - 100, 20)
                };
                
            } catch (error) {
                console.log('Using mouse position fallback');
                // Fallback: use a reasonable position
                return {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                };
            }
        }

        // Alternative: Show popup on mouse click coordinates
        document.addEventListener('click', function(event) {
            // This won't interfere with the sphere click, just provides fallback positioning
            window.lastClickX = event.clientX;
            window.lastClickY = event.clientY;
        });