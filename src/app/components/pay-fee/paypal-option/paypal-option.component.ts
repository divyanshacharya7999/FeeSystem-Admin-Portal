import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-paypal-option',
  templateUrl: './paypal-option.component.html',
  styleUrls: ['./paypal-option.component.css'],
  animations: [
    trigger('hoverTap', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.05)' })),
      state('tap', style({ transform: 'scale(0.95)' })),
      transition('normal <=> hover', animate('200ms ease-in')),
      transition('hover <=> tap', animate('100ms ease-in')),
    ]),
    trigger('bounce', [
      transition('* => selected', [
        animate(
          '0.5s ease-in-out',
          keyframes([
            style({ transform: 'translateY(0)', offset: 0 }),
            style({ transform: 'translateY(-10px)', offset: 0.5 }),
            style({ transform: 'translateY(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class PaypalOptionComponent {
  @Input() isSelected: boolean = false;
  @Output() onClick = new EventEmitter<void>();
  hoverState: string = 'normal';

  handleMouseEnter() {
    this.hoverState = 'hover';
  }

  handleMouseLeave() {
    this.hoverState = 'normal';
  }

  handleMouseDown() {
    this.hoverState = 'tap';
  }

  handleMouseUp() {
    this.hoverState = 'hover';
  }

  handleClick() {
    this.onClick.emit();
  }
}
