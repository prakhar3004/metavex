import { Component, OnInit, OnDestroy, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [],
  template: `
    @if (isVisible()) {
      <div aria-hidden="true"
        class="custom-cursor-dot pointer-events-none fixed z-[10000]"
        [style.left.px]="mouseX()"
        [style.top.px]="mouseY()">
      </div>
      <div aria-hidden="true"
        class="custom-cursor-follower pointer-events-none fixed z-[9999]"
        [class.hovering]="isHovering()"
        [style.left.px]="trailingX()"
        [style.top.px]="trailingY()">
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      pointer-events: none;
    }
  `]
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  public mouseX = signal<number>(-100);
  public mouseY = signal<number>(-100);
  public trailingX = signal<number>(-100);
  public trailingY = signal<number>(-100);
  public isHovering = signal<boolean>(false);
  public isVisible = signal<boolean>(false);

  private rafId: number | null = null;
  private enabled = false;
  private currentX = -100;
  private currentY = -100;

  ngOnInit() {
    if (typeof window === 'undefined') return;
    this.enabled = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.enabled) return;
    this.isVisible.set(true);
    if (this.rafId === null) this.animateTrailing();
    this.mouseX.set(e.clientX);
    this.mouseY.set(e.clientY);

    // Detect if hovering interactive element
    const target = e.target as HTMLElement | null;
    if (target) {
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .interactive-element');
      this.isHovering.set(!!isInteractive);
    }
  }

  @HostListener('window:mouseleave')
  onMouseLeave() {
    this.isVisible.set(false);
    this.stopAnimation();
  }

  @HostListener('window:mouseenter')
  onMouseEnter() {
    if (this.enabled) this.isVisible.set(true);
  }

  private animateTrailing() {
    const loop = () => {
      // Lerp trailing follower
      const targetX = this.mouseX();
      const targetY = this.mouseY();

      this.currentX += (targetX - this.currentX) * 0.18;
      this.currentY += (targetY - this.currentY) * 0.18;

      this.trailingX.set(this.currentX);
      this.trailingY.set(this.currentY);

      if (Math.abs(targetX - this.currentX) > 0.1 || Math.abs(targetY - this.currentY) > 0.1) {
        this.rafId = requestAnimationFrame(loop);
      } else {
        this.rafId = null;
      }
    };
    this.rafId = requestAnimationFrame(loop);
  }

  private stopAnimation() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  @HostListener('document:visibilitychange')
  public onVisibilityChange() {
    if (document.hidden) this.onMouseLeave();
  }

  ngOnDestroy() {
    this.stopAnimation();
  }
}
