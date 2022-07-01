import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/department.service';
import { SubdepartmentService } from 'src/app/services/subdepartment.service';
import { ManageSubDepartmentComponent } from './manage-sub-department/manage-sub-department.component';

@Component({
  selector: 'app-sub-department',
  templateUrl: './sub-department.component.html',
  styleUrls: ['./sub-department.component.scss']
})
export class SubDepartmentComponent implements OnInit {
  subDepartmentList : any[]  = [] ;
  allDepartmentList : any[] = [];
  currentDepartmentid :number = 0;
  constructor(private dialogService:DialogService,
    private subDepartmentService:SubdepartmentService,
    private departmentService:DepartmentService,
    private authservice:AuthService) { }

  ngOnInit(): void {
    var userData = this.authservice.loginUserDesignationData();
    console.log("userData",userData);
    if(!!userData){
      this.currentDepartmentid = userData.department_id
    }
    
    this.getSubDepartmentList();
    this.getAllDepartmentList();
  }
  getSubDepartmentList(){
    this.subDepartmentService.getDivision().then((jresponse :any)=>{
      if(jresponse.success){
        this.subDepartmentList= jresponse.data?.division?.data;
      }
      //
      this.subDepartmentList  = Object.values(this.subDepartmentList).filter((element: any) => {
        if(this.currentDepartmentid === element.department_id.toString()) 
         return element 

      });
    
    })
    
  }
  getAllDepartmentList(){
    this.departmentService.getAllDepartments().then((jresponse:any)=>{
      this.allDepartmentList  = jresponse.data;
    })
  }
  refreshData(){
    this.getSubDepartmentList();
  }
  manageSubDepartmentForm(dataId:any = 0  ,  objData:any = {}){
    const ref = this.dialogService.open(ManageSubDepartmentComponent, {
      header: (dataId > 0) ? 'Update Sub Department' : 'Add Sub Department',
      width: '95%',
      data: {
        id: dataId,
        formData: objData ? objData : null
      }
    });

    ref.onClose.subscribe((resData: any) => {
      if (!!resData) {
        if (dataId > 0) {
          let dataIndex = this.subDepartmentList.findIndex((element: any) => element.id === dataId);
          this.subDepartmentList[dataIndex] = resData.data;
        } else {
         // this.getcampaignList();
         // this.resetTableData();
        }
      }
      this.refreshData();
    });
  }
}
