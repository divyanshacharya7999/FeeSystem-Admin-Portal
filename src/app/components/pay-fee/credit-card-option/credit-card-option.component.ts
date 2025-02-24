import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-credit-card-option',
  templateUrl: './credit-card-option.component.html',
  styleUrls: ['./credit-card-option.component.css'],
  animations: [
    trigger('rotateAnimation', [
      state('default', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('default <=> rotated', animate('0.5s ease-in-out'))
    ]),
    trigger('hoverAnimation', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.05)' })),
      state('tap', style({ transform: 'scale(0.95)' })),
      transition('normal <=> hover', [animate('0.2s ease-in-out')]),
      transition('hover <=> tap', [animate('0.1s ease-in-out')])
    ])
  ]
})
export class CreditCardOptionComponent {
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
