import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, NgZone, inject } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-hero-canvas',
  standalone: true,
  template: `
    <div #canvasContainer class="w-full h-full relative overflow-hidden pointer-events-auto">
      <canvas #webglCanvas class="w-full h-full block"></canvas>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class HeroCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('webglCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ngZone = inject(NgZone);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animFrameId: number | null = null;

  // 3D Objects
  private coreMesh!: THREE.Mesh;
  private wireframeMesh!: THREE.Mesh;
  private nodePoints!: THREE.Points;
  private innerGlowMesh!: THREE.Mesh;
  private particlesMesh!: THREE.Points;
  private ringMesh!: THREE.LineLoop;

  // Mouse physics
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    // Run outside Angular change detection loop for butter-smooth 60fps
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.animate();
    });
  }

  private initThree() {
    const width = this.containerRef.nativeElement.clientWidth || window.innerWidth;
    const height = this.containerRef.nativeElement.clientHeight || window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 7.5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. Core Polyhedron (Icosahedron) - Prismatic Crystal Glass
    const geometry = new THREE.IcosahedronGeometry(2.1, 2);

    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      emissive: 0xFF2E63,
      emissiveIntensity: 0.12,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.85,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    this.coreMesh = new THREE.Mesh(geometry, coreMat);
    this.scene.add(this.coreMesh);

    // 2. Wireframe Lattice Layer - Prismatic Electric Violet
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x7C3AED,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this.wireframeMesh = new THREE.Mesh(geometry, wireMat);
    this.wireframeMesh.scale.setScalar(1.02);
    this.scene.add(this.wireframeMesh);

    // 3. Connected Nodes / Vertex Points - Vivid Rose
    const nodeMat = new THREE.PointsMaterial({
      color: 0xFF2E63,
      size: 0.09,
      transparent: true,
      opacity: 0.95
    });
    this.nodePoints = new THREE.Points(geometry, nodeMat);
    this.nodePoints.scale.setScalar(1.03);
    this.scene.add(this.nodePoints);

    // 4. Inner Radiant Core - Cyan & Lavender
    const innerGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0284C7,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    this.innerGlowMesh = new THREE.Mesh(innerGeo, innerMat);
    this.scene.add(this.innerGlowMesh);

    // 5. Orbital Quantum Ring - Rose
    const ringGeo = new THREE.BufferGeometry();
    const ringSegments = 64;
    const ringRadius = 3.2;
    const ringPositions = new Float32Array((ringSegments + 1) * 3);
    for (let i = 0; i <= ringSegments; i++) {
      const theta = (i / ringSegments) * Math.PI * 2;
      ringPositions[i * 3] = Math.cos(theta) * ringRadius;
      ringPositions[i * 3 + 1] = Math.sin(theta) * ringRadius * 0.35;
      ringPositions[i * 3 + 2] = Math.sin(theta) * ringRadius;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xFF2E63,
      transparent: true,
      opacity: 0.45
    });
    this.ringMesh = new THREE.LineLoop(ringGeo, ringMat);
    this.ringMesh.rotation.x = Math.PI / 4;
    this.scene.add(this.ringMesh);

    // 6. Ambient Particle Dust Cloud - Light Mode Palette
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorRose = new THREE.Color(0xFF2E63);
    const colorViolet = new THREE.Color(0x7C3AED);
    const colorCyan = new THREE.Color(0x0284C7);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 16;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const rand = Math.random();
      const mixedColor = rand < 0.4 ? colorRose : (rand < 0.75 ? colorViolet : colorCyan);
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65
    });
    this.particlesMesh = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(5, 10, 7);
    this.scene.add(dirLight1);

    const pointLight1 = new THREE.PointLight(0xFF2E63, 2.5, 20);
    pointLight1.position.set(5, 5, 5);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7C3AED, 2.5, 20);
    pointLight2.position.set(-5, -5, -2);
    this.scene.add(pointLight2);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.targetX = (e.clientX / width - 0.5) * 2;
    this.targetY = -(e.clientY / height - 0.5) * 2;
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.containerRef || !this.renderer || !this.camera) return;
    const width = this.containerRef.nativeElement.clientWidth || window.innerWidth;
    const height = this.containerRef.nativeElement.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private animate() {
    let clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Mouse Reactivity
      this.mouseX += (this.targetX - this.mouseX) * 0.05;
      this.mouseY += (this.targetY - this.mouseY) * 0.05;

      // Autonomous rotation + Mouse velocity influence
      if (this.coreMesh) {
        this.coreMesh.rotation.y = elapsedTime * 0.2 + this.mouseX * 0.6;
        this.coreMesh.rotation.x = elapsedTime * 0.15 + this.mouseY * 0.6;

        const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
        this.coreMesh.scale.set(scale, scale, scale);
      }

      if (this.wireframeMesh) {
        this.wireframeMesh.rotation.y = elapsedTime * 0.2 + this.mouseX * 0.6;
        this.wireframeMesh.rotation.x = elapsedTime * 0.15 + this.mouseY * 0.6;
        const scale = (1 + Math.sin(elapsedTime * 1.5) * 0.04) * 1.02;
        this.wireframeMesh.scale.set(scale, scale, scale);
      }

      if (this.nodePoints) {
        this.nodePoints.rotation.y = elapsedTime * 0.2 + this.mouseX * 0.6;
        this.nodePoints.rotation.x = elapsedTime * 0.15 + this.mouseY * 0.6;
        const scale = (1 + Math.sin(elapsedTime * 1.5) * 0.04) * 1.03;
        this.nodePoints.scale.set(scale, scale, scale);
      }

      if (this.innerGlowMesh) {
        this.innerGlowMesh.rotation.y = -elapsedTime * 0.3;
        this.innerGlowMesh.rotation.z = elapsedTime * 0.2;
      }

      if (this.ringMesh) {
        this.ringMesh.rotation.z = elapsedTime * 0.35 + this.mouseX * 0.4;
        this.ringMesh.rotation.y = elapsedTime * 0.25;
      }

      if (this.particlesMesh) {
        this.particlesMesh.rotation.y = elapsedTime * 0.04 + this.mouseX * 0.2;
        this.particlesMesh.rotation.x = elapsedTime * 0.02 + this.mouseY * 0.2;
      }

      // Parallax camera tilt
      if (this.camera) {
        this.camera.position.x = this.mouseX * 0.8;
        this.camera.position.y = this.mouseY * 0.8;
        this.camera.lookAt(0, 0, 0);
      }

      this.renderer.render(this.scene, this.camera);
      this.animFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
  }

  ngOnDestroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }

    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineLoop) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
