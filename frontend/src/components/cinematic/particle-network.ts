import * as THREE from "three";

export class ParticleNetwork {
  public points: THREE.Points;
  private particleCount: number;
  private positions: Float32Array;
  private velocities: Float32Array;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;

  constructor(count: number = 160, color: number = 0xc6a869) {
    this.particleCount = count;
    this.positions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);

    const spreadX = 40;
    const spreadY = 40;
    const spreadZ = 30;

    for (let i = 0; i < count; i++) {
      this.positions[i * 3] = (Math.random() - 0.5) * spreadX;
      this.positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      this.positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;

      this.velocities[i * 3] = (Math.random() - 0.5) * 0.4;
      this.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      this.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));

    this.material = new THREE.PointsMaterial({
      color,
      size: 0.22,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
  }

  public update(delta: number, scrollVelocity: number = 0): void {
    const pos = this.positions;
    const vel = this.velocities;
    const count = this.particleCount;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3] * delta;
      pos[i * 3 + 1] += (vel[i * 3 + 1] - scrollVelocity * 1.8) * delta;
      pos[i * 3 + 2] += vel[i * 3 + 2] * delta;

      // Wrap boundaries
      if (pos[i * 3 + 1] < -20) pos[i * 3 + 1] = 20;
      if (pos[i * 3 + 1] > 20) pos[i * 3 + 1] = -20;
      if (pos[i * 3] < -20) pos[i * 3] = 20;
      if (pos[i * 3] > 20) pos[i * 3] = -20;
    }

    this.geometry.attributes.position.needsUpdate = true;
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
