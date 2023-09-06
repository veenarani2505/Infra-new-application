import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-projectsview',
  templateUrl: './projectsview.page.html',
  styleUrls: ['./projectsview.page.scss'],
})
export class ProjectsviewPage implements OnInit {

  values: { [k: string]: any; };

  constructor(private router: Router,private formBuilder: FormBuilder, private toast: ToastController, private api: ApiService) {
    
    if (router.getCurrentNavigation().extras.state) {
      this.values = this.router.getCurrentNavigation().extras.state;
      console.log("passing data", this.values);
    }
  }

  ngOnInit() {
  }

   //toast message controller
  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();  
  }

  goback() {
    //  this.navCtrl.back();
    this.router.navigate(['projectlist']);
  }
}