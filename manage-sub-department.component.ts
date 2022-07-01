import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/department.service';
import { SubdepartmentService } from 'src/app/services/subdepartment.service';
//import { SubdepartmentService } from 'src/app/services/subDepartment.service';

@Component({
  selector: 'app-manage-sub-department',
  templateUrl: './manage-sub-department.component.html',
  styleUrls: ['./manage-sub-department.component.scss']
})
export class ManageSubDepartmentComponent implements OnInit {
  subDepartmentForm: any
  isLoadForm: boolean = false;
  alldepartmentAndSubdepartmnetList: any[] = []
  allDepartmentList: any[] = []
  currentDepartmentid :number = 0
  constructor(  private subDepartmentService: SubdepartmentService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private departmentService:DepartmentService,
    private authservice:AuthService) { }

  ngOnInit(): void {
    var userData = this.authservice.loginUserDesignationData();
    console.log("userData",userData);
    if(!!userData){
      this.currentDepartmentid = userData.department_id
    }
    this.getAllDivisons();
    this.createSubDepartmentForm();
   
  }

 
  getAllDivisons() {
    
    this.subDepartmentService.getDivision().then((jreponse: any) => {
      if (jreponse.success) {
        this.alldepartmentAndSubdepartmnetList = jreponse.data.division.data;
        this.alldepartmentAndSubdepartmnetList  = Object.values(this.alldepartmentAndSubdepartmnetList).filter((element: any) => {
          if(this.currentDepartmentid === element.department_id.toString()) 
           return element 
  
        });
      }
    })
  }
  createSubDepartmentForm(data: any = {}) {
    this.subDepartmentForm = new FormGroup({
      id: new FormControl(data?.id),
      division_name: new FormControl(data?.division_name, Validators.required),
      parent: new FormControl(!!data?.parent ?data?.parent :0 )
    })
    this.isLoadForm = true
  }

  submitForm() {
    console.log("formValue", this.subDepartmentForm.getRawValue());
    let postDataTemp = Object.assign({}, this.subDepartmentForm.getRawValue());
    let postData = JSON.parse(JSON.stringify(postDataTemp));
    let submitApi: any = '';
    if (!!postData.id) {
      submitApi = this.subDepartmentService.put(postData, postData.id);
    } else {
      submitApi = this.subDepartmentService.post(postData);
    }
    submitApi.then((jresult: any) => {
      if (jresult.success) {
        this.messageService.add({ severity: 'success', summary: '', detail: jresult.message });
        this.ref.close({
          id: jresult.data?.division?.data?.id,
          data: jresult.data?.division?.data
        });
      }
    })
  }
}

