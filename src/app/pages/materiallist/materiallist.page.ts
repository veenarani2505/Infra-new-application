import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-materiallist',
  templateUrl: './materiallist.page.html',
  styleUrls: ['./materiallist.page.scss'],
})
export class MateriallistPage implements OnInit {

  projectId: any;
  response: any;

  constructor(private router: Router,private formBuilder: FormBuilder, private toast: ToastController, private api: ApiService, private navCtrl: NavController) {
    this.projectId = localStorage.getItem('projectId');
   }
  ngOnInit() {
    this.getMaterails()
  }

 ionViewWillEnter() {
  console.log("ionViewWillEnter");
  this.getMaterails();
}
  getMaterails(){
    this.api.getMaterailsAdmin(this.projectId).subscribe(res => {
      var projectdata: any = res
       this.response = projectdata.data;
      //  console.log("get materaiolssssssssssssssssssssssssssssssssssssssss",this.response)
    })
   }

   onAddClicked(data) {
    console.log("data", data);
    this.navCtrl.navigateForward('/materialdetails', { state: data });
  }
  
  goback() {
    //  this.navCtrl.back();
    this.router.navigate(['addstocks']);
  }

}