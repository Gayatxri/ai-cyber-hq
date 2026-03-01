// assets/three-bg.js
(() => {
    const mount = document.getElementById("three-bg");
    if (!mount || !window.THREE) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        200
    );
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Particles
    const count = 1200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 0] = (Math.random() - 0.5) * 60; // x
        positions[i3 + 1] = (Math.random() - 0.5) * 40; // y
        positions[i3 + 2] = (Math.random() - 0.5) * 60; // z
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
        color: 0xff003c,     // RED
        size: 0.14,
        transparent: true,
        opacity: 0.9,
        depthWrite: false
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Animate
    let t = 0;
    function tick() {
        t += 0.008;

        points.rotation.y = t * 0.12;
        points.rotation.x = t * 0.05;

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
    tick();

    // Resize
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();