
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  projectsData: any;
  subProjects: any;
  subProjectsData: any;
  SubProjectId: any;
  projectName: any;
  subProject: any;
  projectName2: any;
  subProjectName2: any;
  disabled = false;
  p_id: any;
  sp_id: any;
  values: any;
  autoUserId: any;
  app_res: any;
  userRole: any;
  projects: any;
  projectId: any;  
  userId: any;
  dropResponse: any;
  selectedproject: any;
  selectedSubProject: any;
  selectedResponse: any;
  selectedProjectId: any;
  selectedSubProjectId: any;
  data: any;
  roleId: any;
  companyId: any;

  constructor(private navCtrl: NavController, private api: ApiService, private router: Router, private toast: ToastController, private loading: LoadingService) {
    this.getDefaultProjects();
    this.userId = localStorage.getItem('userId');
    this.companyId = localStorage.getItem('companyId');
    console.log("userId", this.userId);
    console.log("comapnyId", this.companyId);
    console.log("---------------- constrrr");
    this.roleId = localStorage.getItem('roleId');
  }

  // after constructor calling this method will trigger
  ngOnInit() {
    console.log("ng on it")
    this.userId = localStorage.getItem('userId');
    this.roleId = localStorage.getItem('roleId');
    this.getDefaultProjects();
    // this.getProjects();
  }

  // before entering the page
  ionViewWillEnter() {
    this.userId = localStorage.getItem('userId');
    this.roleId = localStorage.getItem('roleId');
    console.log("view will enter")
    this.getDefaultProjects();
  }

  //once paghe is loaded then it will call
  ionViewDidEnter() {
    this.userId = localStorage.getItem('userId');
    console.log("view did enetr")
    this.getDefaultProjects();
  }

  compareprojects(o1: any, o2: any): boolean {
    console.log(o1, o2)
    return o1.AutoProjectId === o2.AutoProjectId;//Compare by id
  }

  comparesubprojects(o1: any, o2: any): boolean {
    console.log(o1, o2)
    return o1.AutoSubProjectId === o2.AutoSubProjectId;//Compare by id
  }

  // get api call for projects
  getProjects() {
    this.api.getProjects(this.companyId).subscribe(res => {
      this.projects = res;
      this.projectsData = this.projects.data;
      console.log("main dropdown data", this.projectsData);
    });
  }

  // get api call for sub projects
  getSubProjects(value) {
    console.log(value);
    this.subProjects = [];
    this.api.getSubProjects(value.AutoProjectId).subscribe(res => {
      this.subProjects = res;
      this.subProjectsData = this.subProjects.data;
      console.log("subprojectsData", this.subProjectsData);
    });
  }

  // projects ionChange event
  selectProjects(event) {
    console.log(event, "sellellellellel");
    this.subProjectsData = [];
    console.log("hhh", this.projectsData)
    if (this.projectsData && this.projectsData.length) {
      const update = this.projectsData.filter((x) => {
        if (x.AutoProjectId == event.AutoProjectId) {
          this.projectName = x.ProjectName;
          this.projectId = x;
          this.disabled = true;
          console.log(this.projectId);
          this.getSubProjects(this.projectId);
        }
      })
    }
  }

  // subprojects ionChange event
  selectSubProjects(event) {
    console.log("hkjhjdhfdgdf");
    console.log(event);
    const update = this.subProjectsData.filter((x) => {
      if (x.AutoSubProjectId == event.AutoSubProjectId) {
        this.subProject = x.SubProjectName;
        this.subProjectName2 = x.SubProjectName;
        this.SubProjectId = x;
        this.disabled = false;
        console.log(this.SubProjectId);

      }
    })
  }

  // get api call for getting default projects
  getDefaultProjects() {
    console.log(this.userId);
    var data = {
      "userId": this.userId
    }

    this.api.getdeaultProjects(data).subscribe(res => {
      console.log(res);
      this.selectedResponse = res;
      this.data = this.selectedResponse.user;
      console.log(this.data);
      this.selectedproject = this.data.details;
      this.selectedSubProject = this.data.details;
      this.selectedProjectId = this.data.details.AutoProjectId;
      this.selectedSubProjectId = this.data.details.AutoSubProjectId;
      this.projectId = this.selectedproject;
      this.SubProjectId = this.selectedSubProject;
      console.log(this.projectId);
      console.log(this.SubProjectId);
      this.getProjects()
      this.getSubProjects(this.selectedproject);

    })
  }

  // submit projects data function
  submit() {
    var postdata = {
      "projectId": this.projectId.AutoProjectId,
      "SubProjectId": this.SubProjectId.AutoSubProjectId,
      "userId": this.userId
    }
    console.log(postdata);
    // this.loading.presentLoading();
    this.api.postProjects(postdata).subscribe(res => {
      // this.loading.dismisLoading();
      console.log(res);
      this.dropResponse = res;

      if (this.dropResponse.status == 200) {
        if (this.roleId == 1) {
          // this.loading.dismisLoading();
          this.router.navigate(['previliges']);
        } else {
          // this.loading.dismisLoading();
          this.router.navigate(['previliges']);
        }
      }
      else {
        this.presentToast("please select project and subproject");
      }
    }, err => {
      console.log(err);
      // this.loading.dismisLoading();
      this.presentToast("Server Not responded");
    })
  }

  // back navigation to previous page
  goback() {
    this.navCtrl.back();
  }

  // toast message controller
  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();
  }
}