import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, NgZone, inject } from '@angular/core';
import * as THREE from 'three';

interface FloatingCard {
  mesh: THREE.Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
  floatSpeed: number;
  floatOffset: number;
  rotX: number;
  rotY: number;
}

interface OrbitingBadge {
  mesh: THREE.Mesh;
  orbitRadius: number;
  orbitSpeed: number;
  angle: number;
  yOffset: number;
}

interface ReactionBubble {
  sprite: THREE.Sprite;
  speedY: number;
  driftSpeed: number;
  driftOffset: number;
  baseX: number;
  baseZ: number;
}

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

  // Groups & Objects
  private ecosystemGroup!: THREE.Group;
  private cards: FloatingCard[] = [];
  private orbitingBadges: OrbitingBadge[] = [];
  private reactionBubbles: ReactionBubble[] = [];
  private orbitalRing1!: THREE.LineLoop;
  private orbitalRing2!: THREE.LineLoop;
  private growthRibbonMesh!: THREE.Mesh;
  private particlesMesh!: THREE.Points;

  // Mouse physics
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.animate();
    });
  }

  private initThree() {
    const width = this.containerRef.nativeElement.clientWidth || window.innerWidth;
    const height = this.containerRef.nativeElement.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.updateCameraDistance(width, height);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master Group
    this.ecosystemGroup = new THREE.Group();
    this.scene.add(this.ecosystemGroup);

    // 4. Create 3D Floating Social & Growth Cards (Positioned safely on outer wings)
    this.createSocialCards();

    // 5. Create Central Orbiting Platform Badges (Camera-Facing)
    this.createCentralSocialOrbit();

    // 6. Create Ascending 3D Growth Ribbon (ROAS Curve)
    this.createGrowthRibbon();

    // 7. Create Live Reaction Particle Stream (Instagram/Reels Style)
    this.createLiveReactions();

    // 8. Create Subtle Ambient Energy Dust
    this.createAmbientDust();

    // 9. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 8);
    this.scene.add(dirLight);

    const pointRose = new THREE.PointLight(0xFF2E63, 1.6, 18);
    pointRose.position.set(-5, 4, 4);
    this.scene.add(pointRose);

    const pointCyan = new THREE.PointLight(0x0284C7, 1.6, 18);
    pointCyan.position.set(5, -3, 4);
    this.scene.add(pointCyan);
  }

  private updateCameraDistance(width: number, height: number) {
    const aspect = width / height;
    if (aspect < 0.9) {
      // Mobile portrait
      this.camera.position.z = 11.2;
    } else if (aspect < 1.35) {
      // Tablet / small laptop
      this.camera.position.z = 9.8;
    } else {
      // Wide desktop
      this.camera.position.z = 8.0;
    }
  }

  /**
   * Creates 4 High-Resolution 3D Floating Social & Growth Cards
   * Positioned on the outer flanks (x: +/- 5.6) to guarantee ZERO collision with the central headline.
   */
  private createSocialCards() {
    const cardDefs = [
      {
        badgeText: '● LIVE META AD',
        badgeBg: '#FF2E63',
        title: 'Meta & Instagram Ads',
        metricText: '3.8x Stable ROAS',
        subText: 'Audience Testing & CAPI Tracking',
        footerIcons: '❤️ 2.4k  💬 180  ↗ Verified CAPI',
        themeColor: '#FF2E63',
        width: 2.8,
        height: 1.4,
        baseX: -5.6,
        baseY: 1.35,
        baseZ: -0.2,
        rotY: 0.28,
        rotX: -0.04
      },
      {
        badgeText: '⚡ 24/7 AUTOMATION',
        badgeBg: '#10B981',
        title: 'WhatsApp Lead Engine',
        metricText: 'Instant Reply in <30s',
        subText: 'Zero Missed Leads • CRM Synced',
        footerIcons: '✅ Auto-Delivery  💬 100% Verified +91',
        themeColor: '#10B981',
        width: 2.8,
        height: 1.4,
        baseX: 5.6,
        baseY: 1.25,
        baseZ: -0.3,
        rotY: -0.28,
        rotX: -0.04
      },
      {
        badgeText: '📈 SCALING ENGINE',
        badgeBg: '#7C3AED',
        title: 'Revenue & Ad Scaling',
        metricText: '2.8x - 4.2x Client ROAS',
        subText: 'Grounded Performance Marketing',
        footerIcons: '🎯 Server-Side Tracking  ⚡ Zero Waste',
        themeColor: '#7C3AED',
        width: 2.7,
        height: 1.35,
        baseX: -5.3,
        baseY: -1.75,
        baseZ: 0.1,
        rotY: 0.24,
        rotX: 0.06
      },
      {
        badgeText: '🚀 LIGHTNING FAST',
        badgeBg: '#0284C7',
        title: 'High-Converting Web App',
        metricText: '1.2s Mobile Load Time',
        subText: 'Optimized for Indian 4G Networks',
        footerIcons: '🇮🇳 1-Click UPI  📱 Zero Drop-offs',
        themeColor: '#0284C7',
        width: 2.7,
        height: 1.35,
        baseX: 5.3,
        baseY: -1.65,
        baseZ: 0.05,
        rotY: -0.24,
        rotX: 0.06
      }
    ];

    cardDefs.forEach((def, index) => {
      const texture = this.generateCardTexture(
        def.badgeText,
        def.badgeBg,
        def.title,
        def.metricText,
        def.subText,
        def.footerIcons,
        def.themeColor
      );

      const geo = new THREE.PlaneGeometry(def.width, def.height);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(def.baseX, def.baseY, def.baseZ);
      mesh.rotation.set(def.rotX, def.rotY, 0);

      this.ecosystemGroup.add(mesh);

      this.cards.push({
        mesh,
        baseX: def.baseX,
        baseY: def.baseY,
        baseZ: def.baseZ,
        floatSpeed: 1.1 + index * 0.2,
        floatOffset: index * 1.4,
        rotX: def.rotX,
        rotY: def.rotY
      });
    });
  }

  /**
   * Helper to draw high-res canvas texture for cards
   */
  private generateCardTexture(
    badgeText: string,
    badgeBg: string,
    title: string,
    metricText: string,
    subText: string,
    footerIcons: string,
    themeColor: string
  ): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 320;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 640, 320);

    const x = 16;
    const y = 16;
    const w = 608;
    const h = 288;
    const r = 32;

    // Card Body Glass Fill
    ctx.save();
    this.drawRoundRect(ctx, x, y, w, h, r);
    ctx.clip();

    // Subtle gradient glass background
    const bgGrad = ctx.createLinearGradient(x, y, x + w, y + h);
    bgGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    bgGrad.addColorStop(1, 'rgba(244, 247, 251, 0.90)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(x, y, w, h);

    // Soft colored ambient glow
    const glowGrad = ctx.createRadialGradient(x + 60, y + 50, 5, x + 60, y + 50, 180);
    glowGrad.addColorStop(0, themeColor + '26');
    glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(x, y, w, h);
    ctx.restore();

    // Sleek border stroke
    ctx.save();
    this.drawRoundRect(ctx, x, y, w, h, r);
    const borderGrad = ctx.createLinearGradient(x, y, x + w, y + h);
    borderGrad.addColorStop(0, themeColor + 'cc');
    borderGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
    borderGrad.addColorStop(1, themeColor + '44');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    // 1. Badge Pill
    ctx.save();
    ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
    const textMetrics = ctx.measureText(badgeText);
    const pillW = Math.max(160, textMetrics.width + 36);

    this.drawRoundRect(ctx, x + 30, y + 26, pillW, 36, 18);
    ctx.fillStyle = badgeBg;
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, x + 30 + pillW / 2, y + 44);
    ctx.restore();

    // 2. Title
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(title, x + 30, y + 106);

    // 3. Highlight Metric
    ctx.fillStyle = themeColor;
    ctx.font = '900 32px system-ui, -apple-system, sans-serif';
    ctx.fillText(metricText, x + 30, y + 158);

    // 4. Subtext / Description
    ctx.fillStyle = '#475569';
    ctx.font = '500 18px system-ui, -apple-system, sans-serif';
    ctx.fillText(subText, x + 30, y + 200);

    // 5. Divider
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 30, y + 224);
    ctx.lineTo(x + w - 30, y + 224);
    ctx.stroke();

    // 6. Footer Meta Information / Reactions
    ctx.fillStyle = '#64748B';
    ctx.font = '600 16px system-ui, -apple-system, sans-serif';
    ctx.fillText(footerIcons, x + 30, y + 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }

  /**
   * Creates Central Orbiting Social Media Emblems (Instagram, Meta, WhatsApp, Google)
   * Designed to orbit smoothly behind the text (z: -1.8) and always face the camera.
   */
  private createCentralSocialOrbit() {
    // 1. Dual Holographic Orbital Rings (Soft Ambient Depth Behind Text)
    const ringRadius1 = 2.8;
    const ringSegments = 64;
    const ringPositions1 = new Float32Array((ringSegments + 1) * 3);
    for (let i = 0; i <= ringSegments; i++) {
      const theta = (i / ringSegments) * Math.PI * 2;
      ringPositions1[i * 3] = Math.cos(theta) * ringRadius1;
      ringPositions1[i * 3 + 1] = Math.sin(theta) * ringRadius1 * 0.28;
      ringPositions1[i * 3 + 2] = Math.sin(theta) * ringRadius1 * 0.85;
    }
    const ringGeo1 = new THREE.BufferGeometry();
    ringGeo1.setAttribute('position', new THREE.BufferAttribute(ringPositions1, 3));
    const ringMat1 = new THREE.LineBasicMaterial({
      color: 0xFF2E63,
      transparent: true,
      opacity: 0.20
    });
    this.orbitalRing1 = new THREE.LineLoop(ringGeo1, ringMat1);
    this.orbitalRing1.position.z = -1.8;
    this.ecosystemGroup.add(this.orbitalRing1);

    // Inner secondary ring (cyan)
    const ringRadius2 = 2.1;
    const ringPositions2 = new Float32Array((ringSegments + 1) * 3);
    for (let i = 0; i <= ringSegments; i++) {
      const theta = (i / ringSegments) * Math.PI * 2;
      ringPositions2[i * 3] = Math.cos(theta) * ringRadius2;
      ringPositions2[i * 3 + 1] = -Math.sin(theta) * ringRadius2 * 0.24;
      ringPositions2[i * 3 + 2] = Math.sin(theta) * ringRadius2 * 0.75;
    }
    const ringGeo2 = new THREE.BufferGeometry();
    ringGeo2.setAttribute('position', new THREE.BufferAttribute(ringPositions2, 3));
    const ringMat2 = new THREE.LineBasicMaterial({
      color: 0x0284C7,
      transparent: true,
      opacity: 0.18
    });
    this.orbitalRing2 = new THREE.LineLoop(ringGeo2, ringMat2);
    this.orbitalRing2.position.z = -1.8;
    this.ecosystemGroup.add(this.orbitalRing2);

    // 2. Four Orbiting Social Platform 3D Badges (Soft Ambient Opacity: 0.75)
    const badgeConfigs = [
      { type: 'instagram' as const, label: '📸', sub: 'Instagram Reels', bg1: '#FCB045', bg2: '#FD1D1D', bg3: '#833AB4' },
      { type: 'meta' as const, label: '∞', sub: 'Meta Ads', bg1: '#0081FB', bg2: '#0064E0', bg3: '#004DB3' },
      { type: 'whatsapp' as const, label: '💬', sub: 'WhatsApp Bot', bg1: '#25D366', bg2: '#128C7E', bg3: '#075E54' },
      { type: 'growth' as const, label: '🚀', sub: 'High ROAS', bg1: '#FF2E63', bg2: '#7C3AED', bg3: '#0284C7' }
    ];

    const orbitRadius = 2.8;

    badgeConfigs.forEach((cfg, idx) => {
      const texture = this.generateSocialIconTexture(cfg.label, cfg.sub, cfg.bg1, cfg.bg2, cfg.bg3);
      const geo = new THREE.PlaneGeometry(0.85, 0.85);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.75,
        depthWrite: false
      });

      const mesh = new THREE.Mesh(geo, mat);
      this.ecosystemGroup.add(mesh);

      const angle = (idx / badgeConfigs.length) * Math.PI * 2;
      this.orbitingBadges.push({
        mesh,
        orbitRadius,
        orbitSpeed: 0.30,
        angle,
        yOffset: (idx % 2 === 0 ? 0.2 : -0.2)
      });
    });
  }

  /**
   * Procedural texture for orbiting round social badge
   */
  private generateSocialIconTexture(icon: string, sub: string, bg1: string, bg2: string, bg3: string): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 256, 256);

    const cx = 128;
    const cy = 128;
    const rad = 110;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    const grad = ctx.createLinearGradient(18, 238, 238, 18);
    grad.addColorStop(0, bg1);
    grad.addColorStop(0.5, bg2);
    grad.addColorStop(1, bg3);
    ctx.fillStyle = grad;
    ctx.fill();

    // Gloss ring border
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.stroke();
    ctx.restore();

    // Emoji or symbol
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = icon === '∞' ? 'bold 110px system-ui, sans-serif' : '88px system-ui, sans-serif';
    ctx.fillText(icon, cx, cy - 10);

    // Sub label pill inside badge
    ctx.save();
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    const textW = ctx.measureText(sub).width + 24;
    this.drawRoundRect(ctx, cx - textW / 2, cy + 54, textW, 30, 15);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(sub, cx, cy + 69);
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  /**
   * Creates an ascending 3D Growth Curve Ribbon (ROAS & Scaling Spline)
   */
  private createGrowthRibbon() {
    const points: THREE.Vector3[] = [
      new THREE.Vector3(-3.5, -2.0, -2.0),
      new THREE.Vector3(-2.0, -1.1, -1.6),
      new THREE.Vector3(0.0, -0.4, -1.4),
      new THREE.Vector3(2.0, 0.8, -1.6),
      new THREE.Vector3(3.5, 2.0, -2.0)
    ];

    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.035, 12, false);

    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0xFF2E63,
      transparent: true,
      opacity: 0.25
    });

    this.growthRibbonMesh = new THREE.Mesh(tubeGeo, tubeMat);
    this.ecosystemGroup.add(this.growthRibbonMesh);
  }

  /**
   * Creates floating Instagram/Reels style live reaction bubbles (❤️, 🔥, 🚀, 💬, ⚡, ⭐, 📈)
   */
  private createLiveReactions() {
    const reactionItems = [
      { emoji: '❤️', bg: '#FF2E63' },
      { emoji: '🚀', bg: '#7C3AED' },
      { emoji: '🔥', bg: '#F97316' },
      { emoji: '💬', bg: '#10B981' },
      { emoji: '⚡', bg: '#EAB308' },
      { emoji: '📈', bg: '#0284C7' },
      { emoji: '⭐', bg: '#EC4899' },
      { emoji: '👍', bg: '#3B82F6' }
    ];

    const bubbleCount = 26;

    for (let i = 0; i < bubbleCount; i++) {
      const item = reactionItems[i % reactionItems.length];
      const texture = this.generateReactionTexture(item.emoji, item.bg);

      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.70
      });

      const sprite = new THREE.Sprite(spriteMat);
      const scale = 0.36 + Math.random() * 0.18;
      sprite.scale.set(scale, scale, 1);

      // Random position spanning wide area
      const baseX = (Math.random() - 0.5) * 13;
      const baseY = -5.5 + Math.random() * 11;
      const baseZ = -2.5 + Math.random() * 4.5;

      sprite.position.set(baseX, baseY, baseZ);
      this.ecosystemGroup.add(sprite);

      this.reactionBubbles.push({
        sprite,
        speedY: 0.007 + Math.random() * 0.010,
        driftSpeed: 0.8 + Math.random() * 1.2,
        driftOffset: Math.random() * Math.PI * 2,
        baseX,
        baseZ
      });
    }
  }

  /**
   * Generate crisp circular reaction texture
   */
  private generateReactionTexture(emoji: string, bgColor: string): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 128, 128);

    const cx = 64;
    const cy = 64;
    const r = 52;

    // Glowing circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = bgColor;
    ctx.shadowColor = bgColor;
    ctx.shadowBlur = 14;
    ctx.fill();

    // White border
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.stroke();
    ctx.restore();

    // Emoji icon
    ctx.font = '54px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, cx, cy + 2);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  /**
   * Ambient stardust points
   */
  private createAmbientDust() {
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorRose = new THREE.Color(0xFF2E63);
    const colorViolet = new THREE.Color(0x7C3AED);
    const colorCyan = new THREE.Color(0x0284C7);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 16;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const rand = Math.random();
      const mixedColor = rand < 0.45 ? colorRose : (rand < 0.8 ? colorViolet : colorCyan);
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.040,
      vertexColors: true,
      transparent: true,
      opacity: 0.40
    });
    this.particlesMesh = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particlesMesh);
  }

  /**
   * Cross-browser rounded rectangle helper
   */
  private drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
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
    this.updateCameraDistance(width, height);
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

      // 1. Floating Cards Physics (Flanking Left & Right Wings)
      this.cards.forEach((card) => {
        const floatY = Math.sin(elapsedTime * card.floatSpeed + card.floatOffset) * 0.12;
        card.mesh.position.y = card.baseY + floatY + this.mouseY * 0.15;
        card.mesh.position.x = card.baseX + this.mouseX * 0.20;

        // Subtle 3D cockpit tilt
        card.mesh.rotation.x = card.rotX + Math.sin(elapsedTime * 0.8 + card.floatOffset) * 0.03 + this.mouseY * 0.06;
        card.mesh.rotation.y = card.rotY + Math.cos(elapsedTime * 0.8 + card.floatOffset) * 0.03 + this.mouseX * 0.08;
      });

      // 2. Orbiting Social Badges (Billboarding to always face camera)
      this.orbitingBadges.forEach((badge) => {
        const currentAngle = badge.angle + elapsedTime * badge.orbitSpeed;
        const x = Math.cos(currentAngle) * badge.orbitRadius;
        const z = -1.8 + Math.sin(currentAngle) * badge.orbitRadius * 0.85;
        const y = badge.yOffset + Math.sin(currentAngle) * 0.25 + Math.sin(elapsedTime * 1.5) * 0.05;

        badge.mesh.position.set(x, y, z);
        // Face camera so icons & text are always right-side up!
        badge.mesh.quaternion.copy(this.camera.quaternion);
      });

      // 3. Orbital Rings Rotation
      if (this.orbitalRing1) {
        this.orbitalRing1.rotation.y = elapsedTime * 0.16 + this.mouseX * 0.2;
        this.orbitalRing1.rotation.x = Math.sin(elapsedTime * 0.4) * 0.10 + this.mouseY * 0.12;
      }
      if (this.orbitalRing2) {
        this.orbitalRing2.rotation.y = -elapsedTime * 0.14 + this.mouseX * 0.18;
        this.orbitalRing2.rotation.z = Math.cos(elapsedTime * 0.35) * 0.08;
      }

      // 4. Growth Ribbon Undulation
      if (this.growthRibbonMesh) {
        this.growthRibbonMesh.rotation.y = Math.sin(elapsedTime * 0.3) * 0.06 + this.mouseX * 0.12;
        this.growthRibbonMesh.rotation.x = Math.cos(elapsedTime * 0.25) * 0.05 + this.mouseY * 0.08;
      }

      // 5. Live Reaction Bubbles Floating Upwards
      this.reactionBubbles.forEach((bubble) => {
        bubble.sprite.position.y += bubble.speedY;

        // Gentle horizontal sine wave drift
        const drift = Math.sin(elapsedTime * bubble.driftSpeed + bubble.driftOffset) * 0.08;
        bubble.sprite.position.x = bubble.baseX + drift + this.mouseX * 0.10;

        // Reset to bottom when rising past top
        if (bubble.sprite.position.y > 5.5) {
          bubble.sprite.position.y = -5.5;
          bubble.baseX = (Math.random() - 0.5) * 13;
          bubble.sprite.position.z = -2.5 + Math.random() * 4.5;
        }
      });

      // 6. Ambient Particle Dust
      if (this.particlesMesh) {
        this.particlesMesh.rotation.y = elapsedTime * 0.02 + this.mouseX * 0.10;
        this.particlesMesh.rotation.x = elapsedTime * 0.01 + this.mouseY * 0.10;
      }

      // 7. Parallax camera tilt
      if (this.camera) {
        this.camera.position.x = this.mouseX * 0.4;
        this.camera.position.y = this.mouseY * 0.4;
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
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Points ||
          object instanceof THREE.LineLoop ||
          object instanceof THREE.Sprite
        ) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => {
                if ('map' in mat && mat.map) mat.map.dispose();
                mat.dispose();
              });
            } else {
              const mat = object.material as any;
              if (mat.map) mat.map.dispose();
              mat.dispose();
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
