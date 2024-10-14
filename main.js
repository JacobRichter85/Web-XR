let scene, camera, renderer;
let clickableAreas = [];

function init() {
    // Szene und Kamera initialisieren
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    // Renderer initialisieren
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Gabione-Bild als Textur
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/mnt/data/csm_Vorteile_Schwimminseln_web_615c467326.jpg', function (texture) {
        const geometry = new THREE.PlaneGeometry(5, 3);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
    });

    // Klickbare Bereiche hinzufügen
    addClickableArea("Resilient gegenüber starken Wasserstandsschwankungen", -1.5, 1);
    addClickableArea("Umsetzung freier Nährstoffe in Biomasse", -1.5, 0.5);
    addClickableArea("Lebensraum aquatischer Lebensgemeinschaften", -1.5, 0);
    addClickableArea("Wurzelteppich als große Aufwuchsfläche", -1.5, -0.5);

    addClickableArea("Konstante Evapotranspiration", 1.5, 1);
    addClickableArea("Dynamische Gewässerstrukturelemente", 1.5, 0.5);
    addClickableArea("Integrative Bausteine zwischen Stadt & Gewässer", 1.5, 0);
    addClickableArea("Trittsteinelemente zur Verbesserung", 1.5, -0.5);

    // Animation starten
    animate();
}

// Klickbare Bereiche als unsichtbare Ebenen hinzufügen
function addClickableArea(text, x, y) {
    const geometry = new THREE.PlaneGeometry(0.5, 0.2);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0, transparent: true });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(x, y, 0);
    plane.userData = { text: text };
    scene.add(plane);
    clickableAreas.push(plane);
}

// Szene rendern
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Raycaster für die Interaktivität
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', (event) => {
    // Mauskoordinaten berechnen
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycaster aktualisieren
    raycaster.setFromCamera(mouse, camera);

    // Schnitt mit klickbaren Ebenen prüfen
    const intersects = raycaster.intersectObjects(clickableAreas);
    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        showInfo(intersectedObject.userData.text);
    }
});

// Info-Box anzeigen
function showInfo(text) {
    const infoBox = document.getElementById('info-box');
    const infoText = document.getElementById('info-text');
    infoText.textContent = text;
    infoBox.classList.remove('hidden');
}

// Info-Box schließen
document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('info-box').classList.add('hidden');
});

// Fenstergrößenänderung behandeln
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Initialisierung starten
init();
