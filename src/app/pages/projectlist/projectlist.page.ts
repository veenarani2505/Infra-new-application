import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.page.html',
  styleUrls: ['./projectlist.page.scss'],
})
export class ProjectlistPage implements OnInit {
  projectsData: any;
  companyId: any;

  constructor(private router: Router,private formBuilder: FormBuilder, private toast: ToastController, private api: ApiService, private navCtrl: NavController) { }

  ngOnInit() {
    this.companyId = localStorage.getItem('companyId');
    this.getProjects();
  }
  
  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getProjects();
  }

   // get api call for projects
  getProjects() {
    this.api.getProjects(this.companyId).subscribe(res => {
      console.log("projects response", res)
      var projects: any = res
      this.projectsData = projects.data;
      console.log("get projects data", this.projectsData);
    });
  }

  onAddClicked(data) {
    console.log("data", data);
    this.navCtrl.navigateForward('/projectsview', { state: data });
  }

  goback() {
    //  this.navCtrl.back();
    this.router.navigate(['addstocks']);
  }

}