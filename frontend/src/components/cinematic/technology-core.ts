import * as THREE from "three";

export interface TechnologyCoreOptions {
  wireframeColor?: number;
  innerColor?: number;
  ringColor?: number;
  nodeColor?: number;
  lineColor?: number;
}

export class TechnologyCore {
  public group: THREE.Group;
  private coreMesh: THREE.Mesh;
  private innerMesh: THREE.Mesh;
  private outerCage: THREE.Mesh;
  private ring1: THREE.Mesh;
  private ring2: THREE.Mesh;
  private ring3: THREE.Mesh;
  private nodesPoints: THREE.Points;
  private networkLines: THREE.LineSegments;
  private dataPackets: THREE.Points;
  private packetPositions: Float32Array;
  private packetProgress: Float32Array;
  private packetPaths: { start: THREE.Vector3; end: THREE.Vector3 }[];
  private nodePositions: THREE.Vector3[];

  // Transformation targets for smooth lerping
  private targetRotationX: number = 0;
  private targetRotationY: number = 0;
  private targetScale: number = 1;
  private targetPositionX: number = 0;
  private targetPositionY: number = 0;
  private targetPositionZ: number = 0;
  private targetInnerGlow: number = 0.65;
  private targetLineOpacity: number = 0.35;
  private targetRingExpansion: number = 1;

  constructor(options: TechnologyCoreOptions = {}) {
    this.group = new THREE.Group();

    const goldColor = options.wireframeColor || 0xc6a869;
    const innerColor = options.innerColor || 0xe5c583;
    const ringColor = options.ringColor || 0xc6a869;
    const nodeColor = options.nodeColor || 0xf8e8c8;
    const lineColor = options.lineColor || 0x8a7243;

    // 1. Central Core: Outer Geometric Icosahedron Cage
    const coreGeometry = new THREE.IcosahedronGeometry(4.2, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: goldColor,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    this.coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    this.group.add(this.coreMesh);

    // Outer Dodecahedron Cage for layered enterprise depth
    const outerCageGeo = new THREE.DodecahedronGeometry(5.2, 0);
    const outerCageMat = new THREE.MeshBasicMaterial({
      color: ringColor,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    this.outerCage = new THREE.Mesh(outerCageGeo, outerCageMat);
    this.group.add(this.outerCage);

    // 2. Inner Floating Crystalline Octahedron Core
    const innerGeometry = new THREE.OctahedronGeometry(2.3, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: innerColor,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    this.innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    this.group.add(this.innerMesh);

    // 3. Dual Concentric Orbital Rings (Enterprise Ecosystem)
    const ring1Geo = new THREE.TorusGeometry(7.4, 0.045, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: ringColor,
      transparent: true,
      opacity: 0.5,
    });
    this.ring1 = new THREE.Mesh(ring1Geo, ringMat);
    this.ring1.rotation.x = Math.PI / 3;
    this.ring1.rotation.y = Math.PI / 6;
    this.group.add(this.ring1);

    const ring2Geo = new THREE.TorusGeometry(7.4, 0.045, 16, 120);
    this.ring2 = new THREE.Mesh(ring2Geo, ringMat.clone());
    this.ring2.rotation.x = -Math.PI / 4;
    this.ring2.rotation.y = Math.PI / 4;
    this.group.add(this.ring2);

    const ring3Geo = new THREE.TorusGeometry(9.2, 0.03, 16, 140);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: innerColor,
      transparent: true,
      opacity: 0.25,
    });
    this.ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    this.ring3.rotation.x = Math.PI / 2;
    this.group.add(this.ring3);

    // 4. Constellation Nodes (Connected Technology Services)
    const nodeCount = 48;
    this.nodePositions = [];
    const positions = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 5.6 + (i % 5) * 0.9;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const vec = new THREE.Vector3(x, y, z);
      this.nodePositions.push(vec);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const nodesGeometry = new THREE.BufferGeometry();
    nodesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const nodesMaterial = new THREE.PointsMaterial({
      color: nodeColor,
      size: 0.35,
      transparent: true,
      opacity: 0.9,
    });
    this.nodesPoints = new THREE.Points(nodesGeometry, nodesMaterial);
    this.group.add(this.nodesPoints);

    // 5. Interconnected Network Lines
    const linePairs: number[] = [];
    this.packetPaths = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = this.nodePositions[i].distanceTo(this.nodePositions[j]);
        if (dist < 4.2) {
          linePairs.push(
            this.nodePositions[i].x, this.nodePositions[i].y, this.nodePositions[i].z,
            this.nodePositions[j].x, this.nodePositions[j].y, this.nodePositions[j].z
          );
          if (this.packetPaths.length < 24) {
            this.packetPaths.push({
              start: this.nodePositions[i],
              end: this.nodePositions[j],
            });
          }
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePairs, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.35,
    });
    this.networkLines = new THREE.LineSegments(linesGeometry, linesMaterial);
    this.group.add(this.networkLines);

    // 6. Streaming Data Packets
    const packetCount = this.packetPaths.length;
    this.packetPositions = new Float32Array(packetCount * 3);
    this.packetProgress = new Float32Array(packetCount);

    for (let i = 0; i < packetCount; i++) {
      this.packetProgress[i] = Math.random();
      const p = this.packetProgress[i];
      const start = this.packetPaths[i].start;
      const end = this.packetPaths[i].end;

      this.packetPositions[i * 3] = THREE.MathUtils.lerp(start.x, end.x, p);
      this.packetPositions[i * 3 + 1] = THREE.MathUtils.lerp(start.y, end.y, p);
      this.packetPositions[i * 3 + 2] = THREE.MathUtils.lerp(start.z, end.z, p);
    }

    const packetGeometry = new THREE.BufferGeometry();
    packetGeometry.setAttribute("position", new THREE.BufferAttribute(this.packetPositions, 3));

    const packetMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.42,
      transparent: true,
      opacity: 0.95,
    });
    this.dataPackets = new THREE.Points(packetGeometry, packetMaterial);
    this.group.add(this.dataPackets);
  }

  /**
   * Continuous scroll phase coordinator (0.0 = top of hero, 1.0 = bottom of page)
   */
  public updateScroll(scrollProgress: number): void {
    // Phase 0: Hero (0.0 -> 0.18)
    if (scrollProgress < 0.18) {
      const p = scrollProgress / 0.18;
      this.targetScale = 1.0 + p * 0.15;
      this.targetPositionX = THREE.MathUtils.lerp(3.2, 0.0, p);
      this.targetPositionY = THREE.MathUtils.lerp(0.0, -1.2, p);
      this.targetPositionZ = THREE.MathUtils.lerp(0.0, 2.5, p);
      this.targetRingExpansion = 1.0 + p * 0.25;
      this.targetLineOpacity = 0.35 + p * 0.25;
      this.targetInnerGlow = 0.75;
    }
    // Phase 1: About / The Integrated Model (0.18 -> 0.40)
    else if (scrollProgress < 0.40) {
      const p = (scrollProgress - 0.18) / 0.22;
      this.targetScale = 1.15 + p * 0.1;
      this.targetPositionX = THREE.MathUtils.lerp(0.0, -3.8, p);
      this.targetPositionY = THREE.MathUtils.lerp(-1.2, 0.8, p);
      this.targetPositionZ = THREE.MathUtils.lerp(2.5, 1.0, p);
      this.targetRingExpansion = 1.25 + p * 0.35;
      this.targetLineOpacity = 0.6;
      this.targetInnerGlow = 0.85;
    }
    // Phase 2: Services Ecosystem (0.40 -> 0.65)
    else if (scrollProgress < 0.65) {
      const p = (scrollProgress - 0.40) / 0.25;
      this.targetScale = 1.25 - p * 0.15;
      this.targetPositionX = THREE.MathUtils.lerp(-3.8, 4.2, p);
      this.targetPositionY = THREE.MathUtils.lerp(0.8, -0.5, p);
      this.targetPositionZ = THREE.MathUtils.lerp(1.0, 0.0, p);
      this.targetRingExpansion = 1.6 - p * 0.3;
      this.targetLineOpacity = 0.7;
      this.targetInnerGlow = 0.9;
    }
    // Phase 3: Case Studies & Flagship NyayaSetu (0.65 -> 0.85)
    else if (scrollProgress < 0.85) {
      const p = (scrollProgress - 0.65) / 0.20;
      this.targetScale = 1.1 + p * 0.2;
      this.targetPositionX = THREE.MathUtils.lerp(4.2, 0.0, p);
      this.targetPositionY = THREE.MathUtils.lerp(-0.5, 0.0, p);
      this.targetPositionZ = THREE.MathUtils.lerp(0.0, 3.2, p);
      this.targetRingExpansion = 1.3 + p * 0.4;
      this.targetLineOpacity = 0.75;
      this.targetInnerGlow = 1.0;
    }
    // Phase 4: Final Contact Convergence (0.85 -> 1.0)
    else {
      const p = (scrollProgress - 0.85) / 0.15;
      this.targetScale = 1.3 - p * 0.45;
      this.targetPositionX = 0.0;
      this.targetPositionY = THREE.MathUtils.lerp(0.0, -1.8, p);
      this.targetPositionZ = THREE.MathUtils.lerp(3.2, -1.5, p);
      this.targetRingExpansion = THREE.MathUtils.lerp(1.7, 0.85, p);
      this.targetLineOpacity = THREE.MathUtils.lerp(0.75, 0.3, p);
      this.targetInnerGlow = THREE.MathUtils.lerp(1.0, 0.4, p);
    }
  }

  /**
   * Mouse parallax influence
   */
  public setMouseParallax(mouseX: number, mouseY: number): void {
    this.targetRotationY = mouseX * 0.45;
    this.targetRotationX = -mouseY * 0.35;
  }

  /**
   * Main render tick
   */
  public update(delta: number): void {
    // 1. Base continuous majestic rotation
    this.coreMesh.rotation.y += 0.22 * delta;
    this.coreMesh.rotation.x += 0.14 * delta;

    this.outerCage.rotation.y -= 0.16 * delta;
    this.outerCage.rotation.z += 0.10 * delta;

    this.innerMesh.rotation.y += 0.45 * delta;
    this.innerMesh.rotation.z -= 0.35 * delta;

    this.ring1.rotation.z += 0.35 * delta;
    this.ring2.rotation.z -= 0.40 * delta;
    this.ring3.rotation.z += 0.18 * delta;

    this.nodesPoints.rotation.y += 0.08 * delta;
    this.networkLines.rotation.y += 0.08 * delta;
    this.dataPackets.rotation.y += 0.08 * delta;

    // 2. Smooth lerp transformations
    const lerpFactor = Math.min(delta * 4.5, 1.0);

    this.group.rotation.x = THREE.MathUtils.lerp(this.group.rotation.x, this.targetRotationX, lerpFactor);
    this.group.rotation.y = THREE.MathUtils.lerp(this.group.rotation.y, this.targetRotationY, lerpFactor);

    this.group.position.x = THREE.MathUtils.lerp(this.group.position.x, this.targetPositionX, lerpFactor);
    this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, this.targetPositionY, lerpFactor);
    this.group.position.z = THREE.MathUtils.lerp(this.group.position.z, this.targetPositionZ, lerpFactor);

    const currentScale = this.group.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, this.targetScale, lerpFactor);
    this.group.scale.set(nextScale, nextScale, nextScale);

    // Dynamic ring expansion
    this.ring1.scale.setScalar(this.targetRingExpansion);
    this.ring2.scale.setScalar(this.targetRingExpansion);
    this.ring3.scale.setScalar(this.targetRingExpansion * 1.1);

    // Dynamic line & inner material opacity
    (this.networkLines.material as THREE.LineBasicMaterial).opacity = this.targetLineOpacity;
    (this.innerMesh.material as THREE.MeshBasicMaterial).opacity = this.targetInnerGlow;

    // 3. Streaming Data Packets along paths
    const packetCount = this.packetPaths.length;
    for (let i = 0; i < packetCount; i++) {
      this.packetProgress[i] += delta * 0.65;
      if (this.packetProgress[i] > 1.0) {
        this.packetProgress[i] = 0.0;
      }

      const p = this.packetProgress[i];
      const start = this.packetPaths[i].start;
      const end = this.packetPaths[i].end;

      this.packetPositions[i * 3] = THREE.MathUtils.lerp(start.x, end.x, p);
      this.packetPositions[i * 3 + 1] = THREE.MathUtils.lerp(start.y, end.y, p);
      this.packetPositions[i * 3 + 2] = THREE.MathUtils.lerp(start.z, end.z, p);
    }

    this.dataPackets.geometry.attributes.position.needsUpdate = true;
  }

  public dispose(): void {
    this.coreMesh.geometry.dispose();
    (this.coreMesh.material as THREE.Material).dispose();

    this.outerCage.geometry.dispose();
    (this.outerCage.material as THREE.Material).dispose();

    this.innerMesh.geometry.dispose();
    (this.innerMesh.material as THREE.Material).dispose();

    this.ring1.geometry.dispose();
    (this.ring1.material as THREE.Material).dispose();

    this.ring2.geometry.dispose();
    (this.ring2.material as THREE.Material).dispose();

    this.ring3.geometry.dispose();
    (this.ring3.material as THREE.Material).dispose();

    this.nodesPoints.geometry.dispose();
    (this.nodesPoints.material as THREE.Material).dispose();

    this.networkLines.geometry.dispose();
    (this.networkLines.material as THREE.Material).dispose();

    this.dataPackets.geometry.dispose();
    (this.dataPackets.material as THREE.Material).dispose();
  }
}
