import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeeService } from '../../../services/fee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-paymentplan',
  templateUrl: './paymentplan.component.html',
  styleUrls: ['./paymentplan.component.css', '../../../../styles.css']
})
export class PaymentplanComponent {
  models: any = []
  delpaymentplan: number | null = this.getpaymentplanid();
  payplan: any = {}
  upplan: any = {}
  showAddDialog: boolean = false;
  showDeleteDialog: boolean = false;
  AddFormGroup!: FormGroup;
  Intervals: any[] = [
    { id: 1, name: '1 Month' },
    { id: 3, name: '3 Months' },
    { id: 12, name: '12 Months' }
  ];
  

  constructor(private router: Router, private feeService: FeeService, private fb: FormBuilder,private messageService: MessageService) {
    this.getpaymentplan();
    this.AddFormGroup = this.fb.group({
      planName: ['', [Validators.required, Validators.minLength(2)]],
      intervalInMonths: ['', [Validators.required]],
    })
  }

  getpaymentplan() {
    this.feeService.getallpaymentplan().subscribe(response => {
      this.models = response.result;
    });
  }

  private getpaymentplanid(): number | null {
    const planId = localStorage.getItem('PlanId');
    return planId ? parseInt(planId, 10) : null;
  }

  addpaymentplan() {
    this.payplan = this.AddFormGroup.value;
    this.feeService.addpaymentplan(this.payplan).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Payment plan Added Successfully' });

      window.location.reload();
      this.router.navigate(['paymentplan']);
    }, error => {
      console.error(error);
      alert('Failed to add Fee');
    });
  }

  deletepaymentplandata(model: any) {
    localStorage.setItem('PlanId', model)
    this.delpaymentplan = model
  }

  deletepaymentplan() {
    if (this.delpaymentplan) {
      this.feeService.deletepaymentplan(this.delpaymentplan).subscribe(response => {
        alert('Payment Plan Deleted Successfully');
        localStorage.removeItem('PlanId')
        window.location.reload();
        this.router.navigate(['paymentplan']);
      }, error => {
        console.error(error);
        alert('Failed to Delete Fee');
      });
    }
    else {
      alert('No Plan found for that Id')
    }
  }

  updatepaymentplan() {
    this.feeService.updatepaymentplan(this.upplan).subscribe(response => {
      alert('Update added successfully');
      window.location.reload();
      this.router.navigate(['school']);
    }, error => {
      console.error(error);
      alert('Failed to Update Fee Type');
    });
  }

}
