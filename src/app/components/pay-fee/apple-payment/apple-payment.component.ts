import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-apple-pay-option',
  templateUrl: './apple-payment.component.html',
  styleUrls: ['./apple-payment.component.css'],
  animations: [
    trigger('scaleAnimation', [
      state('selected', style({ transform: 'scale(1)' })),
      state('unselected', style({ transform: 'scale(1)' })),
      transition('unselected => selected', [
        animate('0.5s ease-in-out', style({ transform: 'scale(1.2)' })),
        animate('0.5s ease-in-out', style({ transform: 'scale(1)' }))
      ])
    ]),
    trigger('hoverAnimation', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.05)' })),
      transition('normal <=> hover', [animate('0.2s ease-in-out')]),
      state('tap', style({ transform: 'scale(0.95)' })),
      transition('hover <=> tap', [animate('0.1s ease-in-out')])
    ])
  ]
})
export class ApplePaymentComponent {
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
