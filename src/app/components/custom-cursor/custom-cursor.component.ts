import { Component, OnInit, OnDestroy, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible()) {
      <div 
        class="custom-cursor-dot pointer-events-none fixed z-[10000]"
        [style.left.px]="mouseX()"
        [style.top.px]="mouseY()">
      </div>
      <div 
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
  private currentX = -100;
  private currentY = -100;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      // Check if touch device - if touch, disable custom cursor to prevent blocking touch interactions
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        this.isVisible.set(false);
        return;
      }
      this.isVisible.set(true);
      this.animateTrailing();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
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
  }

  @HostListener('window:mouseenter')
  onMouseEnter() {
    this.isVisible.set(true);
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

      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  ngOnDestroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
