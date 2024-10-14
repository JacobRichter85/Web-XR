let scene, camera, renderer, cube;

function init() {
    // Szene und Kamera initialisieren
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    
    // Würfel erstellen
    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
    
    // Animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Würfelrotation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Szenen-Update basierend auf der Auswahl in der Zeitleiste
function updateScene(timePeriod) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    
    switch (timePeriod) {
        case 'earlier':
            document.getElementById('earlier').classList.add('active');
            cube.material.color.set(0x00ff00);  // Frühere Farbe (Grün)
            break;
        case 'today':
            document.getElementById('today').classList.add('active');
            cube.material.color.set(0xff0000);  // Heutige Farbe (Rot)
            break;
        case 'future':
            document.getElementById('future').classList.add('active');
            cube.material.color.set(0x0000ff);  // Zukünftige Farbe (Blau)
            break;
    }
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Szene initialisieren
init();
