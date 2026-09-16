import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  isDark?: boolean;
}

export const ThreeGlassBlob: React.FC<Props> = ({ isDark = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.2 : 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Create Organic Blob Geometry
    // We use a high-segment sphere and deform its vertices dynamically in the animation loop
    const baseRadius = 1.15;
    const geometry = new THREE.SphereGeometry(baseRadius, 96, 96);
    
    // Store original positions for deformation
    const posAttribute = geometry.attributes.position;
    const originalPositions = new Float32Array(posAttribute.array);

    // Iridescent glass material
    const material = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x9333ea : 0xaa77ff,
      emissive: isDark ? 0x2e0854 : 0x4c1d95,
      emissiveIntensity: isDark ? 0.25 : 0.08,
      metalness: 0.1,
      roughness: 0.08,
      transmission: isDark ? 0.88 : 0.94,
      thickness: 1.2,
      ior: 1.52,
      iridescence: 0.85,
      iridescenceIOR: 1.38,
      iridescenceThicknessRange: [100, 400],
      sheen: 1,
      sheenColor: new THREE.Color(isDark ? 0xd8b4fe : 0xe9d5ff),
      sheenRoughness: 0.2,
      transparent: true,
      opacity: isDark ? 0.92 : 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const blob = new THREE.Mesh(geometry, material);
    scene.add(blob);

    // Floating minor iridescent spheres
    const floatingSpheres: { mesh: THREE.Mesh; offset: number; speed: number; orbitRadius: number; yBase: number; rotSpeed: number }[] = [];
    const sphereGeom = new THREE.SphereGeometry(0.16, 32, 32);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0xa855f7 : 0xc084fc,
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.85,
      thickness: 0.8,
      ior: 1.45,
      iridescence: 0.9,
      iridescenceIOR: 1.35,
      transparent: true,
      opacity: 0.85,
    });

    const sphereConfigs = [
      { r: 1.8, y: 1.3, speed: 0.6, offset: 0.2, scale: 0.9 },
      { r: 2.1, y: -1.2, speed: 0.45, offset: 2.4, scale: 1.2 },
      { r: 1.6, y: -0.4, speed: 0.7, offset: 4.1, scale: 0.65 },
      { r: 2.3, y: 0.8, speed: 0.35, offset: 5.2, scale: 0.75 },
    ];

    sphereConfigs.forEach((cfg) => {
      const mesh = new THREE.Mesh(sphereGeom, sphereMat);
      mesh.scale.setScalar(cfg.scale);
      scene.add(mesh);
      floatingSpheres.push({
        mesh,
        offset: cfg.offset,
        speed: cfg.speed,
        orbitRadius: cfg.r,
        yBase: cfg.y,
        rotSpeed: 0.5 + Math.random() * 0.5,
      });
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xe9d5ff, isDark ? 2.5 : 2.0);
    mainLight.position.set(5, 6, 4);
    scene.add(mainLight);

    const purpleLight = new THREE.PointLight(0xa855f7, isDark ? 3.5 : 2.5, 20);
    purpleLight.position.set(-4, -3, 3);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x818cf8, isDark ? 2.0 : 1.5, 15);
    cyanLight.position.set(3, -4, 2);
    scene.add(cyanLight);

    // Mouse & Touch Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 2;
      targetMouseY = -y * 2;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!container || !e.touches[0]) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width - 0.5;
      const y = (touch.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 1.5;
      targetMouseY = -y * 1.5;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animation Loop with fluid deformation
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Rotate whole blob gently + reactive to mouse
      blob.rotation.y = time * 0.25 + currentMouseX * 0.8;
      blob.rotation.x = time * 0.15 + currentMouseY * 0.6;
      blob.rotation.z = Math.sin(time * 0.2) * 0.1;

      // Deform blob vertices dynamically using sinusoidal noise
      const positions = posAttribute.array as Float32Array;
      const count = posAttribute.count;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // 3D waves
        const wave1 = Math.sin(ox * 2.2 + time * 1.4) * Math.cos(oy * 2.0 + time * 1.2);
        const wave2 = Math.sin(oz * 2.5 + time * 0.9) * 0.15;
        const wave3 = Math.cos((ox + oy + oz) * 1.8 + time * 1.1) * 0.12;

        const displacement = 1.0 + (wave1 * 0.18 + wave2 + wave3) * 0.7;

        positions[i3] = ox * displacement;
        positions[i3 + 1] = oy * displacement;
        positions[i3 + 2] = oz * displacement;
      }

      posAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      // Animate floating spheres
      floatingSpheres.forEach((s) => {
        const angle = time * s.speed + s.offset;
        s.mesh.position.x = Math.cos(angle) * s.orbitRadius + currentMouseX * 0.3;
        s.mesh.position.z = Math.sin(angle) * s.orbitRadius;
        s.mesh.position.y = s.yBase + Math.sin(time * s.rotSpeed + s.offset) * 0.25 + currentMouseY * 0.3;
        s.mesh.rotation.y += 0.02;
        s.mesh.rotation.x += 0.01;
      });

      // Point light orbit
      purpleLight.position.x = Math.sin(time * 0.8) * 4;
      purpleLight.position.y = Math.cos(time * 0.6) * 3;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling with ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      resizeObserver.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      sphereGeom.dispose();
      sphereMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDark]);

  return (
    <div className="relative w-full h-full min-h-[250px] xs:min-h-[290px] sm:min-h-[360px] md:min-h-[460px] lg:min-h-[560px] flex items-center justify-center select-none pointer-events-auto touch-pan-y">
      {/* Background glow radial halo */}
      <div
        className={`absolute inset-0 rounded-full filter blur-3xl opacity-40 transition-colors duration-700 pointer-events-none ${
          isDark ? 'bg-gradient-to-tr from-purple-900/40 via-violet-600/30 to-indigo-900/20' : 'bg-gradient-to-tr from-purple-400/30 via-indigo-300/20 to-purple-200/40'
        }`}
      />
      <div ref={containerRef} className="w-full h-full relative z-10 flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y" />
    </div>
  );
};
