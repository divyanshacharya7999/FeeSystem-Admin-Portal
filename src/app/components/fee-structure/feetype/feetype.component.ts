import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeeService } from '../../../services/fee.service';

@Component({
  selector: 'app-feetype',
  templateUrl: './feetype.component.html',
  styleUrls: ['./feetype.component.css']
})
export class FeetypeComponent {

  adfeetype: any = {};
  delfeetype: number | null = this.getFeeTypeIdFromLocalStorage();
  feetypemodel: any = [];
  upfeetype: any = {};

  constructor(private router: Router, private feeService: FeeService) {
    this.getallfeetype();
  }

  private getFeeTypeIdFromLocalStorage(): number | null {
    const feeTypeId = localStorage.getItem('FeeTypeId');
    return feeTypeId ? parseInt(feeTypeId, 10) : null;
  }

  getallfeetype() {
    this.feeService.getallfeetype().subscribe(response => {
      console.log(response.result);
      this.feetypemodel = response.result;
    }, error => {
      console.error(error);
      alert('Failed to fetch Fee Types');
    });
  }

  addfeetype() {
    this.feeService.addfeetype(this.adfeetype).subscribe(response => {
      alert('Fee Type Added Successfully');
      window.location.reload();
      this.router.navigate(['feetype']);
    }, error => {
      console.error(error);
      alert('Failed to add Fee Type');
    });
  }

  deletefeetypedata(feetypeid: any) {
    localStorage.setItem('FeeTypeId', feetypeid);
    this.delfeetype = feetypeid; 
  }

  deletefeetype() {
    if (this.delfeetype !== null) {
      this.feeService.deletefeetype(this.delfeetype).subscribe(response => {
        alert('Fee Type Deleted Successfully');
        localStorage.removeItem('FeeTypeId');
        window.location.reload();
        this.router.navigate(['feetype']);
      }, error => {
        console.error(error);
        alert('Failed to Delete Fee Type');
      });
    } else {
      alert('No Fee Type ID found for deletion');
    }
  }

  updatefeetype() {
    this.feeService.updatefeetype(this.upfeetype).subscribe(response => {
      alert('Fee Type Updated Successfully');
      window.location.reload();
      this.router.navigate(['school']);
    }, error => {
      console.error(error);
      alert('Failed to Update Fee Type');
    });
  }
}
