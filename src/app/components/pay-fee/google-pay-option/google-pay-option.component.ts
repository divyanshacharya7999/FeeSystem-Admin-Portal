import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-google-pay-option',
  templateUrl: './google-pay-option.component.html',
  styleUrls: ['./google-pay-option.component.css'],
  animations: [
    trigger('rotateYAnimation', [
      state('default', style({ transform: 'rotateY(0deg)' })),
      state('rotated', style({ transform: 'rotateY(360deg)' })),
      transition('default <=> rotated', animate('0.5s ease-in-out'))
    ]),
    trigger('hoverTapAnimation', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.05)' })),
      state('tap', style({ transform: 'scale(0.95)' })),
      transition('* <=> *', animate('0.2s ease-in-out'))
    ])
  ]
})
export class GooglePayOptionComponent {
  @Input() isSelected: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  hoverState: 'normal' | 'hover' | 'tap' = 'normal';

  handleClick() {
    this.onClick.emit();
  }

  setHoverState(state: 'normal' | 'hover' | 'tap') {
    this.hoverState = state;
  }
}
