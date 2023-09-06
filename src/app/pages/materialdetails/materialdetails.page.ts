import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-materialdetails',
  templateUrl: './materialdetails.page.html',
  styleUrls: ['./materialdetails.page.scss'],
})
export class MaterialdetailsPage implements OnInit {
  values: { [k: string]: any; };

  constructor(private router: Router,private formBuilder: FormBuilder, private toast: ToastController, private api: ApiService) {
    
    if (router.getCurrentNavigation().extras.state) {
      this.values = this.router.getCurrentNavigation().extras.state;
      console.log("passing data", this.values);
      // this.st_date = this.values.start_date;
      // this.edate = this.values.end_date;
      // this.wp_id = this.values.wp_id;
    }

   }

  ngOnInit() {
  }

  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();  
  }

  goback() {
    //  this.navCtrl.back();
    this.router.navigate(['materiallist']);
  }
}