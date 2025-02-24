import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { StudentComponent } from './components/registrar/student/student.component';
import { StudentfeesComponent } from './components/registrar/student/GetStudentByID/studentfees/studentfees.component';
import { FeeStructureComponent } from './components/fee-structure/fee-structure.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FeetypeComponent } from './components/fee-structure/feetype/feetype.component';
import { PaymentplanComponent } from './components/fee-structure/paymentplan/paymentplan.component';
import { AuthGuard } from './Guard/auth.guard';
import { ClassComponent } from './components/registrar/class/class.component';
import { SchoolComponent } from './components/registrar/school/school.component';
import { PayFeeComponent } from './components/pay-fee/pay-fee.component';
import { ApplePaymentComponent } from './components/pay-fee/apple-payment/apple-payment.component';
import { CreditCardOptionComponent } from './components/pay-fee/credit-card-option/credit-card-option.component';
import { GooglePayOptionComponent } from './components/pay-fee/google-pay-option/google-pay-option.component';
import { PaymentFormComponent } from './components/pay-fee/payment-form/payment-form.component';
import { PaypalOptionComponent } from './components/pay-fee/paypal-option/paypal-option.component';


const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: 'home'},
  { path:'home', component: HomeComponent},
  { path:'login', component: LoginComponent },
  { path:'student', component:StudentComponent,canActivate: [AuthGuard]},
  { path:'studentfees', component:StudentfeesComponent,canActivate: [AuthGuard]},
  { path:'feestructure', component:FeeStructureComponent,canActivate: [AuthGuard]},
  { path:'payment', component:PaymentComponent,canActivate: [AuthGuard]},
  { path:'feetype', component:FeetypeComponent,canActivate: [AuthGuard]},
  { path:'paymentplan', component:PaymentplanComponent,canActivate: [AuthGuard]},
  { path:'class', component:ClassComponent, canActivate: [AuthGuard]},
  { path:'school', component:SchoolComponent, canActivate: [AuthGuard]},
  { path:'payFee', component:PayFeeComponent, canActivate: [AuthGuard]},
  { path:'payFee', component:PayFeeComponent, canActivate: [AuthGuard]},

  { path:'applePayment', component:ApplePaymentComponent, canActivate: [AuthGuard]},

  { path:'creditCardOption', component:CreditCardOptionComponent, canActivate: [AuthGuard]},

  { path:'googlePayOption', component:GooglePayOptionComponent, canActivate: [AuthGuard]},

  { path:'paymentForm', component:PaymentFormComponent, canActivate: [AuthGuard]},

  { path:'paypalOption', component:PaypalOptionComponent, canActivate: [AuthGuard]},

  { path:'', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
