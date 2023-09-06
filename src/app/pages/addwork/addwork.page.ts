import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-addwork',
  templateUrl: './addwork.page.html',
  styleUrls: ['./addwork.page.scss'],
})
export class AddworkPage implements OnInit {

  projectId: any;
  projectname: any;
  userId: any;
  mobile: any;
  subProjects: any;
  subProjectsData: any;
  workCompleted: any;
  subworkCompleted: any;
  subworkCompleted2: any;
  workCompleted2: any;
  selectedsubworkCompletedId: any;
  selectedSubProjectId: any;
  selectedWorkCompletedId: any;
  response: any;
  subProjectName: any;
  // frommindate: any = new Date().toISOString();
  frommindate: any;
  frommaxdate: any;
  to_date: any;
  sub_project_id: any;
  work_component_id: any;
  sub_work_component_id: any;
  start_date: any;
  end_date: any;

  public customSubProjectsOptions: any = {
    header: "Select Sub Project",
    cssClass: "alertdropdowncssWorkType",
  };

  public customWorkCompletedOptions: any = {
    header: "Select Work Component",
    cssClass: "alertdropdowncssWorkType",
  };

  public customSubWorkCompletedOptions: any = {
    header: "Sub Work Component",
    cssClass: "alertdropdowncssWorkType",
  };

  constructor(private fb: FormBuilder, private navCtrl: NavController, private toast: ToastController,
    private router: Router, private api: ApiService, private formBuilder: FormBuilder,) {
    this.projectname = localStorage.getItem('projectname');
    this.projectId = localStorage.getItem("projectId");
    this.userId = localStorage.getItem('userId');
    this.mobile = localStorage.getItem('mobile');
  }

  ngOnInit() {
    this.getSubProjects();
  }

    // get api call for sub projects
  getSubProjects() {
    this.api.getSubProjects(this.projectId).subscribe(res => {
      this.subProjects = res;
      this.subProjectsData = this.subProjects.data;
      console.log("subprojectsData", this.subProjectsData);
    });
  }
  
    //get work component dropdown api call 
  getWorkCompleted(p_id: any, sp_id: any) {
      // this.selectedSubProjectId = undefined;
    this.api.getMixedWorkComponentType(p_id, sp_id).subscribe(res => {
        console.log("Work Completed Responseee", res)
        this.workCompleted = res;
        this.workCompleted2 = this.workCompleted.data
        console.log(this.workCompleted2)
    })
  }
  
    // get sub work component dropdown api call
  getSubWorkCompleted() {
    this.api.getMixedSubWorkComponentType(this.subProjectName).subscribe(res => {
        console.log("Work Subbb Completed Responseee", res)
        this.subworkCompleted = res;
        this.subworkCompleted2 = this.subworkCompleted.data
        console.log("h2222222222222222", this.subworkCompleted2)
    })
  }

  selectSubProjects(event) {
    this.workCompleted2 = [];
    this.selectedWorkCompletedId = undefined;
    this.selectedsubworkCompletedId = undefined;
    console.log("project id ------", this.projectId)
    console.log("select Sub project id ", event);
    this.selectedSubProjectId = event;
    console.log("work type dataa for selected", this.workCompleted2)
    this.getWorkCompleted(this.projectId, this.selectedSubProjectId)
    const update = this.subProjectsData.filter(x => {
      if (event == x.AutoSubProjectId) {
        this.subProjectName = x.SubProjectName
        console.log("filetr subproject name", this.subProjectName)
        localStorage.setItem("subprojectname_wp", this.subProjectName)
        
      }
    })
  }

    // from date event call
  getFromDate(fromdate) {
      console.log("from date", fromdate)
      this.to_date = "";
  }
  
    // to date event call
  gettoDate(todate) {
    console.log("todate", todate);
  }
  
    // select work component drop down event
  selectworkComplted(event) {
    console.log("selected work completeddd type", event);
    this.selectedWorkCompletedId = event;
    this.getSubWorkCompleted();
  }

  selectsubWorkCompleted(event) {
    console.log("selected sub work completedd type", event);
    this.selectedsubworkCompletedId = event;
  }

  // submit button click function
  onSubmitWorkForm(sub_project_id, work_component_id, frommindate, to_date) {
    var data = {
      "user_id": this.userId,
      "updated_by": this.mobile,
      "sub_project_id": sub_project_id,
      "project_id": this.projectId,
      "work_component_id": work_component_id,
      "start_date": moment(frommindate).format("YYYY-MM-DD"),
      "end_date": moment(to_date).format("YYYY-MM-DD"),
    }

    console.log("dataaaaaaaaa bodyyyyyy", data)

    this.api.addWorkProgress(data).subscribe(res => {
      console.log("response", res)
      this.response = res
      if (this.response.status === 200) {
        // this.Loading.dismisLoading();
        this.presentToast(this.response.message)
        this.router.navigate(['project-progress-list']);
      } else {
        // this.Loading.dismisLoading();
        this.presentToast(this.response.message)
      }

    }, err => {
      console.log(err);
      console.log(err.status);
      // this.Loading.dismisLoading();
      this.presentToast("Server not responded");
    })
  }

  goback() {
    //  this.navCtrl.back();
    this.router.navigate(['project-progress-list']);
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