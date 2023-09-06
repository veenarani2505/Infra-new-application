import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-addstocks',
  templateUrl: './addstocks.page.html',
  styleUrls: ['./addstocks.page.scss'],
})
export class AddstocksPage implements OnInit {

  constructor(private router: Router,private formBuilder: FormBuilder, private toast: ToastController, private api: ApiService) { }

  ngOnInit() {
  }

  goback() {
    //  this.navCtrl.back();
    this.router.navigate(['previliges']);
  }

  onAddprojectsClicked(){
    this.router.navigate(['projectlist']);
  }

  onAddsubprojectsClicked(){
    this.router.navigate(['sub-projectlist']);
  }
  onAddMaterialClicked(){
    this.router.navigate(['materiallist']);
  }

  onAddVendorsClicked(){
    this.router.navigate(['vendorlist']);
  }

}
