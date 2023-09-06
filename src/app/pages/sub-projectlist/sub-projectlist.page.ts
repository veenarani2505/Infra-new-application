import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sub-projectlist',
  templateUrl: './sub-projectlist.page.html',
  styleUrls: ['./sub-projectlist.page.scss'],
})
export class SubProjectlistPage implements OnInit {
  subProjects: any = [];
  subProjectsData: any;
  projectId: any;

  constructor(private navCtrl: NavController, private api: ApiService) {
    this.projectId = localStorage.getItem('projectId');
  }

  ngOnInit() {
    this.getSubProjects();
  }

  onAddClicked(data) {
    console.log("data", data);
    this.navCtrl.navigateForward('/subprojectsview', { state: data });
  }

    // get api call for sub projects
  getSubProjects() {
     // console.log(value);
    this.subProjects = [];
    this.api.getSubProjects(this.projectId).subscribe(res => {
      this.subProjects = res;
      this.subProjectsData = this.subProjects.data;
      console.log("subprojectsData", this.subProjectsData);
    });
  }
  
  goback() {
    this.navCtrl.back();
  }
}