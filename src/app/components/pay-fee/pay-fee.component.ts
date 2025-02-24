import { Component } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-payment-page',
  templateUrl: './pay-fee.component.html',
  styleUrls: ['./pay-fee.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('expand', [
      state('hidden', style({ opacity: 0, height: '0' })),
      state('visible', style({ opacity: 1, height: '*' })),
      transition('hidden <=> visible', animate('0.3s ease-in-out'))
    ])
  ]
})
export class PayFeeComponent {
  selectedMethod: string | null = null;

  selectMethod(method: string) {
    this.selectedMethod = method;
  }
}
