import { NgClass, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgStyle, NgClass, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @ViewChild('modal') modal!: ElementRef;

  @Input() showTitle: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() title: string = 'Modal Title';
  @Input() isTitleCentered = false;
  @Input() minWidth: string = 'fit-content';
  @Input() hasTitleBg: boolean = false;
  @Input() padContent: boolean = true;
  @Output() closed = new EventEmitter<void>();
  @Output() resetModalState = new EventEmitter<void>();
  modalTitleId: string = 'modal-title';
  modalDescriptionId: string = 'modal-description';
  private renderer = inject(Renderer2);

  openModal() {
    this.modal.nativeElement.showModal();
    this.renderer.addClass(document.body, 'no_scroll');
    this.setFocusToFirstElement();
  }

  closeModal() {
    this.renderer.addClass(this.modal.nativeElement, 'closing');
    setTimeout(() => {
      this.modal.nativeElement.close();
      this.renderer.removeClass(this.modal.nativeElement, 'closing');
      this.renderer.removeClass(document.body, 'no_scroll');
      this.closed.emit();
      this.resetModalState.emit();
    }, 300);
  }

  onOutsideClick(event: MouseEvent) {
    if (event.target === this.modal.nativeElement) {
      this.closeModal();
    }
  }

  onCloseKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  private setFocusToFirstElement() {
    const focusableElements = this.modal.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }
}
