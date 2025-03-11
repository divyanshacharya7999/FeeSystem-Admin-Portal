import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AppTenantAvailabilityState } from '../../services/tenant.service';
import { MessageService } from 'primeng/api';
import { RegistrarService } from 'src/app/services/registrar.service';
import { SchoolResult } from 'src/app/models/school-result.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../styles.css']
})
  
export class LoginComponent {
  model  = {
    userNameOrEmailAddress: '' ,
    password: '' ,
    tenantId: '' ,
    rememberClient:true
  }
  Schools: any[] = [];
constructor(
  private authService: AuthService,
  private router: Router,
  private messageService: MessageService,
  private registrarService: RegistrarService){
    this.getAllSchool()
  }

istenantAvailable() {
  console.log(this.model  )
  if (!this.model.tenantId) {
    this.login();
    return;
  }

  this.authService.istenantAvailable(this.model.tenantId).subscribe(
    (response) => {
      console.log(response)
      switch (response.result.state) {
        case AppTenantAvailabilityState.Available:
          this.authService.saveTenant(response.result.tenantId)
          this.login();
          return;

        case AppTenantAvailabilityState.InActive:
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Tenant is not active' });
          break;

        case AppTenantAvailabilityState.NotFound:
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Tenant not found' });
          break;
      }
    },
    (error) => {
      console.error(error);
      alert('School not available');
    }
  );
}

getAllSchool() {
  this.registrarService.getAllSchool().subscribe(
    (response: SchoolResult) => {
      if (response.success && Array.isArray(response.result)) {
        this.Schools = response.result.map(school => ({
          id: school.id, 
          name: school.name
        }));
      } else {
        this.Schools = [];
      }
    },
    (error) => {
      console.error('Error fetching schools:', error);
      this.Schools = [];
    }
  );
}

login(){
  this.authService.login(this.model).subscribe((response) => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successfully' });
    localStorage.setItem('token', response.result.accessToken);
    const decodedToken: any = jwtDecode(response.result.accessToken);
    const role=decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    localStorage.setItem('role',role)
    if (role === 'Admin') {
      this.router.navigate(['student']);
    } else {
      this.router.navigate(['login']);
    }
  }, (error) => {
    this.messageService.add({ severity: 'error', summary:  error.error.error.message, detail: error.error.error.details });
  });
}


}




