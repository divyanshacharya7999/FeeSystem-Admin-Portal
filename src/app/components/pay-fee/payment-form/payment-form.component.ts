import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PaymentFormComponent {
  @Input() method!: string;
  paymentForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expiry: ['', Validators.required],
      cvv: ['', Validators.required],
      paypalEmail: ['', [Validators.required, Validators.email]]
    });
  }

  handleSubmit() {
    if (this.paymentForm.valid || this.method === 'apple-pay' || this.method === 'google-pay') {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        alert('Payment processed successfully!');
      }, 2000);
    }
  }
}
