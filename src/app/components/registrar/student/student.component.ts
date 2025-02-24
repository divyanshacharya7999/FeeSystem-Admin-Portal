import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrarService } from '../../../services/registrar.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css', '../../../../styles.css']
})

export class StudentComponent implements OnInit {
  models: any = [];
  searchId: string = '';
  selectedStudentId: number | null = null;
  delstudent: string | null = this.getstudentId()
  classes: any[] = [];
  showAddDialog: boolean = false;
  showUpdateDialog: boolean = false;
  showDeleteDialog: boolean = false;
  AddFormGroup!: FormGroup;
  updateFormGroup!: FormGroup;
  isUpdateMode: Boolean = false;
  

  newStudent: any = {
    dateOfBirth: "2024-08-20T13:01:22.992Z"
  }
  upStudent: any = {
    dateOfBirth: "2024-08-20T13:01:22.992Z"
  }
  isHostLogin: any = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrarService: RegistrarService,
    public authService: AuthService,
    private messageService: MessageService) {
    this.getStudent();
    this.isHostLogin = this.authService.isHost();
    localStorage.removeItem('studentId');
    this.getallclasses();
  }

  ngOnInit(): void {
    this.AddFormGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', [Validators.required]],
      classId: ['', [Validators.required]]
    });

    this.updateFormGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', [Validators.required]],
    });
  }

  private getstudentId(): string | null {
    const feeTypeId = localStorage.getItem('studentId');
    return feeTypeId;
  }

  studentfee(studentId: any) {
    localStorage.setItem('studentId', studentId)
    this.router.navigate(['studentfees'])
  }

  getallclasses() {
    this.registrarService.getclass().subscribe((result) => {
      this.classes = result.result;
    })
  }

  getStudent() {
    this.registrarService.getStudent().subscribe(data => {
      this.models = data.result;
    });
  }

  getschool() {
    this.router.navigate(['school'])
  }

  deletestudentdata(delstudent: string) {
    localStorage.setItem('studentId', delstudent)
    this.delstudent = delstudent
    this.showDeleteDialog = true;
  }

  updateStudentData(studentData: any) {
    this.updateFormGroup.patchValue({
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      contactNumber: studentData.contactNumber,
      address: studentData.address,
    });
    this.upStudent.studentId = studentData.studentId;
    this.showUpdateDialog = true;
  }
  

  deleteStudent() {
    if (this.delstudent !== null) {
      this.registrarService.deleteStudent(this.delstudent).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.result.message });
        this.showDeleteDialog = false;
        localStorage.removeItem('studentId');
        this.getStudent();
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message });
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Student ID found for deletion' });
    }
  }

  addStudent() {
    this.newStudent = this.AddFormGroup.value;   
    this.registrarService.addStudent(this.newStudent).subscribe((response) => {
        if (response.result.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.result.message });
          this.showAddDialog = false;
          this.getStudent();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.result.message });
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message });
      }
    );
  }


  getclass() {
    this.router.navigate(['class'])
  }

  updateStudent() {
    this.upStudent = {
      ...this.upStudent,
      ...this.updateFormGroup.value
    };
    this.registrarService.updateStudent(this.upStudent).subscribe(
      (response) => {
        if (response.result.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.result.message });
          this.showUpdateDialog = false;
          this.getStudent();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.result.message });
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message });
      }
    );
  }
  

  searchStudent() {
    if (this.searchId.trim()) {
      const idToSearch = this.searchId.trim();
      const foundStudent = this.models.find((student: { studentId: string }) => student.studentId === idToSearch);
      if (foundStudent) {
        this.selectedStudentId = foundStudent.studentId;
      } else {
        this.selectedStudentId = null;
      }
    } else {
      this.selectedStudentId = null;
    }
  }
}
