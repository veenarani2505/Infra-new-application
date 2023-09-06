import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-company-setting',
  templateUrl: './company-setting.page.html',
  styleUrls: ['./company-setting.page.scss'],
})
export class CompanySettingPage implements OnInit {

  updateComanyDetailsForm: FormGroup;
  isSubmitted = false;
  data: any;
  userId: any;
  comp_response: any;
  selectedComp_id: any;
  selectedRoleId: any;
  selectedProjectId: any;
  selectedSubProjectId: any;
  matrixResults: any;
  comanyDetails: any;
  projectsData: any;
  subProjects: any;
  subProjectsData: any;
  SubProjectId: any;
  projectName: any;
  subProject: any;
  projectId: any;
  roles_response: any;
  values: any;

  constructor(private api: ApiService, private navCtrl: NavController,
    private toast: ToastController, private router: Router, private formBuilder: FormBuilder) {
    this.userId = localStorage.getItem('userId');
    this.getDefaultCompanyDetails();

  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.updateComanyDetailsForm = this.formBuilder.group({
      company_id: ['', [Validators.required]],
      project_id: ['', [Validators.required]],
      // subProject_id: ['',[Validators.required]],
      roleId: ['', [Validators.required]],
      userId: [this.userId],
    })
   
    this.getAssignedCompanies();
   
  
    setTimeout(() => {
      this.setValues();
    }, 400);

    setTimeout(() => {
      this.setValues2();
    }, 600);
    // setTimeout(() => {
    //   this.setValues3();
    // },800);
  }

  setValues() {
    this.updateComanyDetailsForm.controls['company_id'].setValue(this.values.id);
    this.selectedProjectId = this.values.AutoProjectId;

  }
  setValues2(){
    this.updateComanyDetailsForm.controls['project_id'].setValue(this.values.AutoProjectId);
     this.updateComanyDetailsForm.controls['roleId'].setValue(this.values.RoleId);
    // this.updateComanyDetailsForm.controls['subProject_id'].setValue(this.values.AutoSubProjectId);
  }


  ionViewWillEnter() {
    console.log("ionViewWillEnter")
    this.userId = localStorage.getItem('userId');
  }

  getDefaultCompanyDetails(){
    this.api.getDefaultComapanyDetails(this.userId).subscribe(res =>{
    console.log("default company details ",res);
    var v: any = res;
    this.values = v.data[0];
    console.log("valuessssssssssssssssssssssssssssssssssssssssssssss",this.values)
    })
  }

  getAssignedCompanies() {
    this.api.getAssignedCompanies(this.userId).subscribe(res => {
      console.log("get assigned companies response", res);
      var response: any;
      response = res;
      this.comp_response = response.data
      console.log("companies response", this.comp_response)
    })
  }

  // get api call for projects
  getProjects(compId: any) {
    this.api.getMultipleProjects(this.userId, compId).subscribe(res => {
      console.log("projects assigned response", res)
      var projects: any = res
      this.projectsData = projects.data;
      console.log("get projects data", this.projectsData);
    });
  }

  // get api call for sub projects
  getSubProjects(value) {
    console.log(value);
    this.subProjects = [];
    this.api.getSubProjects(value).subscribe(res => {
      console.log("sub projects assigned response", res)
      this.subProjects = res;
      this.subProjectsData = this.subProjects.data;
      console.log("subprojectsData", this.subProjectsData);
    });
  }

  getAssignedUserRoles(comp_id) {
  
    this.api.getAssignedUserRole(this.userId, comp_id).subscribe(res => {
      console.log("get assigned user role response", res);
      var response: any;
      response = res;
      this.roles_response = response.data
      console.log("roles response", this.roles_response)
    })
  }

  UpdateCompany(event) {
    this.selectedComp_id = event
    console.log("selected Comapny Id", event);
   this.updateComanyDetailsForm.patchValue({company_id: event, project_id: '',roleId: '',}); 
    this.getProjects(event);
    this.getAssignedUserRoles(event);
  }

  // projects ionChange event
  selectProjects(event) {
    this.selectedProjectId = event;
    console.log("selcted projetc id",event);
    this.getSubProjects(event);
  }

  // userRole Ionchange event
  selectRole(value) {
    console.log("selected user role id", this.selectedRoleId)
    this.selectedRoleId = value;
  }

  submit() {
    this.isSubmitted = true;
    if (!this.updateComanyDetailsForm.valid) {
      this.presentToast("Please provide all the required values")
      console.log(this.updateComanyDetailsForm.value);
      return false;
    }else{
      this.data = this.updateComanyDetailsForm.value;
      this.api.UpdateCompanyId(this.data).subscribe(res => {
        console.log(res);
        
        var d: any = res;
        if (d.status == 200) {
          this.router.navigate(['previliges']);
        }
        this.matrixResults = d.matrixresults;
        this.comanyDetails = d.results[0];
        var companyName = this.comanyDetails.company_name;
        var companyId = this.comanyDetails.company_id;
        var projectname = this.comanyDetails.ProjectName;
        var projectId = this.comanyDetails.ProjectId;
        var subprojectname = this.comanyDetails.SubProjectName;
        var subprojectId = this.comanyDetails.SubProjectId;
        var roleId = this.comanyDetails.RoleId;
        var roleName = this.comanyDetails.RoleName;
        const jsonObj = JSON.stringify(this.matrixResults);
        localStorage.setItem('matrixresults', jsonObj);
        localStorage.setItem('companyName', companyName);
        localStorage.setItem('companyId', companyId);
        localStorage.setItem('projectname', projectname);
        localStorage.setItem('projectId', projectId);
        localStorage.setItem('subproject', subprojectname);
        localStorage.setItem('subProjectId', subprojectId);
        localStorage.setItem('roleId', roleId);
        localStorage.setItem('userRole', roleName);
        if (d.status == 200) {
          this.router.navigate(['previliges']);
        }
      })
    }

  }

  //back navigation to previous page
  goback() {
    this.navCtrl.back();

  }

  // toast message function
  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();
  }

}
