import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.css']
})
export class FeeStructureComponent {
  models: any = []
  addfee: any = {}
  upfee: any = {}
  delfee:number | null = this.getFeeIdFromLocalStorage()
  feetypes: any[] = [];
  
  constructor(private router:Router, private feeService: FeeService){
  this.getfee();
  localStorage.removeItem('studentId');
  }

  private getFeeIdFromLocalStorage(): number | null {
    const feeTypeId = localStorage.getItem('FeeId');
    return feeTypeId ? parseInt(feeTypeId, 10) : null;
  }

  feetype(){
    this.router.navigate(['feetype'])
  }

  GetFeeTypes(){
    this.feeService.getAllFee().subscribe((result) =>{
        this.feetypes = result.result;
    })
  }

  paymentplan(){
    this.router.navigate(['paymentplan'])
  }

  getfee(){
    this.feeService.getAllFee().subscribe(data => {
      console.log(data);
      this.models = data.result.items;
    });
  }

  addFee(){
    this.feeService.addfee(this.addfee).subscribe(response =>{
      alert('Fee Added Successfully');
      window.location.reload();
      this.router.navigate(['feestructure']);
      
    }, error => {
      console.error(error);
      alert('Failed to add Fee');
    });
  }
 

  updatefee(){
    this.feeService.updatefee(this.upfee).subscribe(response =>{
      alert('Fee Updated Successfully');
      window.location.reload();
      this.router.navigate(['feestructure']);
    }, error => {
      console.error(error);
      alert('Failed to update Fee');
    });
  }

  deletefeedata(delfee: any){
     localStorage.setItem('FeeId', delfee)
     this.delfee = delfee
  }

  deletefee(){
    if(this.delfee){
    this.feeService.deletefee(this.delfee).subscribe(response =>{
      alert('Fee Deleted Successfully');
      localStorage.removeItem('FeeId')
      window.location.reload();
      this.router.navigate(['feestructure']);
    }, error => {
      console.error(error);
      alert('Failed to Delete Fee');
    });
  }else{
    alert('No fee found for that id')
  }
  }

  

}
