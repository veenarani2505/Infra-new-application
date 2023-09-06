import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-addmaterial',
  templateUrl: './addmaterial.page.html',
  styleUrls: ['./addmaterial.page.scss'],
})
export class AddmaterialPage implements OnInit {

  projectname: any;
  collectAddMaterialForm: FormGroup;
  isSubmitted = false;
  data: any;
  companyData: any;
  response: any;
  companyId: any;
  projectId: any;

  constructor(private router: Router,private formBuilder: FormBuilder, private toast: ToastController, private api: ApiService) { 
    this.companyId = localStorage.getItem('companyId');
    this.projectId = localStorage.getItem('projectId');
  }

  ngOnInit() {

    this.collectAddMaterialForm = this.formBuilder.group({
      MaterialId: ['', [Validators.required]],
      MaterialName: ['', [Validators.required]],      
      MaterialDescription: ['', [Validators.required]],
      MaterialCategory: ['', [Validators.required]],
      MaterialSubCategory: ['', [Validators.required]],
      Metrics: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      MateialNotes: ['', [Validators.required]],
      SubProjectCountry: ['', [Validators.required]],
      project_id: [this.projectId],
    })
  }

// validators error controls
   get errorControl() {
    return this.collectAddMaterialForm.controls;
  }

  goback() {
    //  this.navCtrl.back();
    this.router.navigate(['materiallist']);
  }

  onAddMaterials(){
    this.isSubmitted = true;
    if (!this.collectAddMaterialForm.valid) {
      this.presentToast("Please provide all the required values")
      console.log(this.collectAddMaterialForm.value);
      return false;

    }else{
      this.data = this.collectAddMaterialForm.value;
      console.log("body --------------------->", this.data)
      this.api.addMaterails(this.data).subscribe(res => {
       console.log("logesssssssssssssssssssssssssssss", res)
       this.response = res
       if (this.response.status == 200) {  
        this.presentToast(this.response.message);
        this.router.navigate(['materiallist']);

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

}