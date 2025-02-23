import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeeService } from '../../../services/fee.service';

@Component({
  selector: 'app-paymentplan',
  templateUrl: './paymentplan.component.html',
  styleUrls: ['./paymentplan.component.css']
})
export class PaymentplanComponent {
  models: any = []
  delpaymentplan:number | null = this.getpaymentplanid();
  payplan: any = {}
  upplan: any = {}

  constructor(private router:Router, private feeService: FeeService){
    this.getpaymentplan()
    }

  getpaymentplan(){
      this.feeService.getallpaymentplan().subscribe(response =>{
        console.log(response.result);
        this.models = response.result;
    });
  }

  private getpaymentplanid(): number | null {
    const planId = localStorage.getItem('PlanId');
    return planId ? parseInt(planId, 10) : null;
  }

  addpaymentplan(){
    this.feeService.addpaymentplan(this.payplan).subscribe(response =>{
      alert('Payment plan Added Successfully');
      window.location.reload();
      this.router.navigate(['paymentplan']);
    }, error => {
      console.error(error);
      alert('Failed to add Fee');
    });
  }

  deletepaymentplandata(model: any){
     localStorage.setItem('PlanId', model)
     this.delpaymentplan = model
  }

  deletepaymentplan(){
    if(this.delpaymentplan){
    this.feeService.deletepaymentplan(this.delpaymentplan).subscribe(response =>{
      alert('Payment Plan Deleted Successfully');
      localStorage.removeItem('PlanId')
      window.location.reload();
      this.router.navigate(['paymentplan']);
    }, error => {
      console.error(error);
      alert('Failed to Delete Fee');
    });}
    else{
      alert('No Plan found for that Id')
    }
  }

  updatepaymentplan(){
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
