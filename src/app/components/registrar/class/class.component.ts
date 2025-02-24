import { Component, OnInit } from '@angular/core';
import { RegistrarService } from '../../../services/registrar.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css', '../../../../styles.css']
})
export class ClassComponent implements OnInit {

  models: any = []
  addclass: any = {}
  delclass: number | null = this.getclassidfordelete();
  showAddDialog: boolean = false;
  showUpdateDialog: boolean = false;
  showDeleteDialog: boolean = false;
  upClass: any = {}
  updateFormGroup!: FormGroup

  constructor(
    private registrarService: RegistrarService,
    private messageService: MessageService,
    private fb: FormBuilder){
    this.getclass()
  }

  ngOnInit(): void {
    this.updateFormGroup = this.fb.group({
      className: ["", [Validators.required]]
    })
  }

  getclass(){
    this.registrarService.getclass().subscribe(response =>{
      this.models = response.result
    })
  }
  private getclassidfordelete(): number | null {
    const classid = localStorage.getItem('ClassId');
    return classid ? parseInt(classid, 10) : null;
  }

  addclasses(){
    this.registrarService.addClass(this.addclass).subscribe(response =>{
      if(response.result.success){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.result.message });
        this.showAddDialog = false;
        this.getclass();
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.result.message });
      }
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message });
    });
  }

  updateClassData(ClassData: any){
    this.updateFormGroup.patchValue({
      className: ClassData.className,
    });
    this.upClass.Id = ClassData.classId;
    this.showUpdateDialog = true;

  }

  updateClass(){
    this.upClass = {
      ...this.upClass,
      ...this.updateFormGroup.value
    };
    this.registrarService.updateClass(this.upClass).subscribe(response =>{
      if(response.result.success){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.result.message });
        this.showUpdateDialog = false;
        this.getclass();
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.result.message });
      }
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message });
    });
  }

  dataforclassid(classid: any){
    localStorage.setItem('ClassId', classid)
    this.delclass = classid
    this.showDeleteDialog = true;
  }

  deleteclass(){
    if(this.delclass){
    this.registrarService.deleteclass(this.delclass).subscribe(response =>{
      if(response.result.success){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.result.message });
        localStorage.removeItem('ClassId')
        this.showDeleteDialog = false;
        this.getclass()
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.result.message });
      }
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message });
    })}
    else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fail to get the Class Id' });
    }
  }

}
