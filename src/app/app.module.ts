import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentComponent } from './components/registrar/student/student.component';
import { StudentfeesComponent } from './components/registrar/student/GetStudentByID/studentfees/studentfees.component';
import { FeeStructureComponent } from './components/fee-structure/fee-structure.component';
import { tenantInterceptor } from './Interceptor/tenant.interceptor';
import { FeetypeComponent } from './components/fee-structure/feetype/feetype.component';
import { PaymentplanComponent } from './components/fee-structure/paymentplan/paymentplan.component';
import { ClassComponent } from './components/registrar/class/class.component';
import { SchoolComponent } from './components/registrar/school/school.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    StudentComponent,
    StudentfeesComponent,
    FeeStructureComponent,
    FeetypeComponent,
    PaymentplanComponent,
    ClassComponent,
    SchoolComponent,
    PaymentComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule, FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: tenantInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
