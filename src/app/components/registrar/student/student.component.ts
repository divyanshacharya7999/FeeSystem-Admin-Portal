import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrarService } from '../../../services/registrar.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css', '../../../../styles.css']
})

export class StudentComponent {
  model: any = [];
  searchId: string = '';
  selectedStudentId: number | null = null;
  delstudent: string | null = this.getstudentId()
  classes: any[] = [];
  showAddDialog: boolean = false;
  showUpdateDialog: boolean = false;
  showDeleteDialog: boolean = false;

  newStudent: any = {
    dateOfBirth: "2024-08-20T13:01:22.992Z"
  }
  upStudent: any = {
    dateOfBirth: "2024-08-20T13:01:22.992Z"
  }
  isHostLogin: any = false;
  
  constructor(private router: Router,
    private registrarService: RegistrarService,
    public authService: AuthService,
    private messageService: MessageService) {
    this.getStudent();
    this.isHostLogin = this.authService.isHost();
    localStorage.removeItem('studentId');
    this.getallclasses()
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
      this.model = data.result;
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
      alert('No Student ID found for deletion');
    }
  }

  addStudent() {
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
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message });
      }
    );
  }

  searchStudent() {
    if (this.searchId.trim()) {
      const idToSearch = this.searchId.trim();
      const foundStudent = this.model.find((student: { studentId: string }) => student.studentId === idToSearch);
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
