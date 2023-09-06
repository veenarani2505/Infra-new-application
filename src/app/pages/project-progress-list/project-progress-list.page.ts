import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-project-progress-list',
  templateUrl: './project-progress-list.page.html',
  styleUrls: ['./project-progress-list.page.scss'],
})
export class ProjectProgressListPage implements OnInit {

  projectname: any;
  response: any;
  response2: any;
  isData: boolean = false;

  constructor(private navCtrl: NavController, private router: Router, private api: ApiService) {
    this.projectname = localStorage.getItem('projectname');
  }

  ngOnInit() {
    this.getWorkDoneList();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getWorkDoneList();
  }

  goback() {
    // this.navCtrl.back();
    this.router.navigate(['previliges']);
  }

  createWork() {
    this.router.navigate(['addwork']);
  }

  getWorkDoneList() {
    this.isData = true;
    this.api.getworkDoneLists(this.projectname).subscribe(res => {
      console.log("Work Done list response", res);
      this.isData = false;
      this.response = res;
      this.response2 = this.response.data;
      console.log("thisiii", this.response2)
    })
  }

  onAddClicked(data) {
    console.log("data", data);
    var component = data.work_component_type;
    var subProjectName_wp = data.SubProjectName;
    console.log("componet", component)
    console.log("subCompoent", subProjectName_wp);
    localStorage.setItem('workcomponent', component);
    localStorage.setItem('subProjectname_wp', subProjectName_wp);
    console.log(localStorage.getItem("workcomponent"));
    console.log(localStorage.getItem("subProjectname_wp"));
    // this.router.navigate(['calender']);
    this.navCtrl.navigateForward('/dates-view', { state: data });
  }

}