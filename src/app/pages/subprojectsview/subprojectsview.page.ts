import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-subprojectsview',
  templateUrl: './subprojectsview.page.html',
  styleUrls: ['./subprojectsview.page.scss'],
})
export class SubprojectsviewPage implements OnInit {
  values: any;

  constructor(private router: Router, private navCtrl: NavController) {
    if (router.getCurrentNavigation().extras.state) {
      this.values = this.router.getCurrentNavigation().extras.state;
      console.log("passing data", this.values);
    
    }
   }

  ngOnInit() {
  }

  goback() {
    this.navCtrl.back();
  }

}
