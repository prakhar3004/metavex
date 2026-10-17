import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Injectable, OnDestroy, Output, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalScrollLock {
  private readonly document = inject(DOCUMENT);
  private count = 0;
  private previousOverflow = '';

  public lock() {
    if (this.count++ === 0) {
      this.previousOverflow = this.document.documentElement.style.overflow;
      this.document.documentElement.style.overflow = 'hidden';
    }
  }

  public unlock() {
    if (this.count > 0 && --this.count === 0) {
      this.document.documentElement.style.overflow = this.previousOverflow;
    }
  }
}

/** Native dialogs keep focus inside the modal and make the page behind it inert. */
@Directive({ selector: 'dialog[appModal]', standalone: true })
export class ModalDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLDialogElement>>(ElementRef);
  private readonly scrollLock = inject(ModalScrollLock);
  private locked = false;

  @Output() dismiss = new EventEmitter<void>();

  ngAfterViewInit() {
    this.element.nativeElement.showModal();
    this.scrollLock.lock();
    this.locked = true;
  }

  @HostListener('cancel', ['$event'])
  public onCancel(event: Event) {
    event.preventDefault();
    this.dismiss.emit();
  }

  @HostListener('click', ['$event'])
  public onBackdropClick(event: MouseEvent) {
    if (event.target === this.element.nativeElement) this.dismiss.emit();
  }

  ngOnDestroy() {
    this.element.nativeElement.close();
    if (this.locked) this.scrollLock.unlock();
  }
}
