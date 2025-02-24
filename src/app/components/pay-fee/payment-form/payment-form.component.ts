import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class PaymentFormComponent implements OnInit, OnChanges {
  @Input() method!: string;
  CreditpaymentForm: FormGroup = this.fb.group({});
  PayPalPaymentForm: FormGroup = this.fb.group({});
  loading = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['method']) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.CreditpaymentForm = this.fb.group({});
    this.PayPalPaymentForm = this.fb.group({});

    if (this.method === 'Credit-Card') {
      this.CreditpaymentForm = this.fb.group({
        cardNumber: ['', Validators.required],
        expiry: ['', Validators.required],
        cvv: ['', Validators.required],
      });
    }

    if (this.method === 'Paypal') {
      this.PayPalPaymentForm = this.fb.group({
        paypalEmail: ['', [Validators.required, Validators.email]]
      });
    }
  }

  handleSubmit() {
    const isCreditFormValid = this.CreditpaymentForm && this.CreditpaymentForm.valid;
    const isPayPalFormValid = this.PayPalPaymentForm && this.PayPalPaymentForm.valid;
    const isOtherPayment = this.method === 'Apple-Pay' || this.method === 'Google-Pay';

    if (isCreditFormValid || isPayPalFormValid || isOtherPayment) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        alert('Payment processed successfully!');
      }, 2000);
    }
  }
}
