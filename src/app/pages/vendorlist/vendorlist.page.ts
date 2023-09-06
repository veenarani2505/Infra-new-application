import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vendorlist',
  templateUrl: './vendorlist.page.html',
  styleUrls: ['./vendorlist.page.scss'],
})
export class VendorlistPage implements OnInit {
  projectId: any;
  response: any;
  
  constructor(private router: Router,private formBuilder: FormBuilder, private toast: ToastController, private api: ApiService, private navCtrl: NavController) {
    this.projectId = localStorage.getItem('projectId');
  }

  ngOnInit() {
    this.getVendors()
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getVendors();
  }

  getVendors(){
    this.api.getVendorsAdmin(this.projectId).subscribe(res => {
      var projectdata: any = res
       this.response = projectdata.data;
       console.log("get materaiolssssssssssssssssssssssssssssssssssssssss",this.response)
    })
  }

  onAddClicked(data) {
    console.log("data", data);
    this.navCtrl.navigateForward('/vendordetails', { state: data });
  }

  goback() {
    //  this.navCtrl.back();
    this.router.navigate(['addstocks']);
  }

}