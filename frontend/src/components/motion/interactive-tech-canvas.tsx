"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

export function InteractiveTechCanvas({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldReduceMotion) return;

    // Scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire tech composition
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Core: Elegant Wireframe Icosahedron (Software & Cloud Infrastructure)
    const coreGeometry = new THREE.IcosahedronGeometry(4.2, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xc6a869, // Gold
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Inner glowing sphere
    const innerGeometry = new THREE.OctahedronGeometry(2.4, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xe2d2b5,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerMesh);

    // 2. Orbital Rings (Business Ecosystem)
    const ringGeometry = new THREE.TorusGeometry(7.2, 0.04, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xc6a869,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // 3. Constellation Nodes (Connected Enterprise Services)
    const nodeCount = 32;
    const nodesGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 5.5 + Math.random() * 4.5;

      nodePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      nodePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      nodePositions[i + 2] = radius * Math.cos(phi);
    }

    nodesGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    const nodesMaterial = new THREE.PointsMaterial({
      color: 0xe8d7b8,
      size: 0.28,
      transparent: true,
      opacity: 0.85,
    });
    const nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
    group.add(nodesMesh);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / height) * 2 - 1);
      targetRotationY = mouseX * 0.4;
      targetRotationX = mouseY * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Visibility observer to pause rendering when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (isVisible) {
        const elapsedTime = clock.getElapsedTime();

        // Smooth rotation
        coreMesh.rotation.y = elapsedTime * 0.15;
        coreMesh.rotation.x = elapsedTime * 0.08;
        innerMesh.rotation.y = -elapsedTime * 0.22;
        innerMesh.rotation.z = elapsedTime * 0.12;

        ring1.rotation.z = elapsedTime * 0.1;
        ring2.rotation.z = -elapsedTime * 0.12;

        nodesMesh.rotation.y = elapsedTime * 0.05;

        // Mouse Parallax interpolation
        group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
        group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;

        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      nodesGeometry.dispose();
      nodesMaterial.dispose();
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-48 h-48 rounded-full border-2 border-gold/30 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-gold/40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gold/15" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[320px] sm:h-[400px] lg:h-[460px] pointer-events-auto ${className}`}
      aria-hidden="true"
    />
  );
}
