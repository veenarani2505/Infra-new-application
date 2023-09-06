import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.page.html',
  styleUrls: ['./addvendor.page.scss'],
})
export class AddvendorPage implements OnInit {

  projectname: any;
  collectAddVendorForm: FormGroup;
  isSubmitted = false;
  data: any;
  companyData: any;
  response: any;
  companyId: any;
  projectId: any;

  constructor(private router: Router,private formBuilder: FormBuilder, private toast: ToastController, private api: ApiService) {
    // this.companyId = localStorage.getItem('companyId');
    this.projectId = localStorage.getItem('projectId');
   }

  ngOnInit() {
    this.collectAddVendorForm = this.formBuilder.group({
      VendorId: ['', [Validators.required]],
      VendorName: ['', [Validators.required]],      
      VendorDescription: ['', [Validators.required]],
      VendorLocation: ['', [Validators.required]],
      VendorType: ['', [Validators.required]],
      project_id: [this.projectId],
    })

  }

  onAddVendors(){
    this.isSubmitted = true;
    if (!this.collectAddVendorForm.valid) {
      this.presentToast("Please provide all the required values")
      console.log(this.collectAddVendorForm.value);
      return false;

    }else{
      this.data = this.collectAddVendorForm.value;
      console.log("body --------------------->", this.data)
      this.api.addVendors(this.data).subscribe(res => {
       console.log("logesssssssssssssssssssssssssssss", res)
       this.response = res
       if (this.response.status == 200) {  
        this.presentToast(this.response.message);
        this.router.navigate(['vendorlist']);

      }
      })
    }
  }

  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();  
  }

  // validators error controls
  get errorControl() {
    return this.collectAddVendorForm.controls;
  }

  goback() {
    //  this.navCtrl.back();
    this.router.navigate(['vendorlist']);
  }

}