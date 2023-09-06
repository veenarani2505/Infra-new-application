import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-addprojects',
  templateUrl: './addprojects.page.html',
  styleUrls: ['./addprojects.page.scss'],
})
export class AddprojectsPage implements OnInit {

  projectname: any;
  collectAddProjectsForm: FormGroup;
  isSubmitted = false;
  data: any;
  companyData: any;
  response: any;
  companyId: any;
  frommindate: any;
  frommaxdate: any;
  to_date: string;
  
  constructor(private router: Router,private formBuilder: FormBuilder, private toast: ToastController, private api: ApiService) {
    this.companyId = localStorage.getItem('companyId');
   }

  ngOnInit() {

    this.collectAddProjectsForm = this.formBuilder.group({
      ProjectId: ['', [Validators.required]],
      ProjectName: ['', [Validators.required]],      
      ProjectDescription: ['', [Validators.required]],
      ProjectType: ['', [Validators.required]],
      ProjectAddress: ['', [Validators.required]],
      ProjectCity: ['', [Validators.required]],
      ProjectState: ['', [Validators.required]],
      ProjectCountry: ['', [Validators.required]],
      ProjectZipCode: ['', [Validators.required]],
      ProjectEstimatedValue: ['', [Validators.required]],
      ProjectStartDate: ['', [Validators.required]],
      ProjectEndDate: ['', [Validators.required]],
      company_id: [this.companyId],
    })
    
    this.getCompanies();
  }

    // validators error controls
  get errorControl() {
    return this.collectAddProjectsForm.controls;
  }

  onAddProjects(){
    this.isSubmitted = true;
    if (!this.collectAddProjectsForm.valid) {
      this.presentToast("Please provide all the required values")
      console.log(this.collectAddProjectsForm.value);
      return false;

    }else{
      this.data = this.collectAddProjectsForm.value;
      console.log("body --------------------->", this.data)
      this.api.addProjects(this.data).subscribe(res => {
       console.log("logesssssssssssssssssssssssssssss", res)
       this.response = res

       if (this.response.status == 200) {          
        this.presentToast(this.response.message);
        this.router.navigate(['projectlist']);
      }
      })
    }
  }

  getCompanies() {
    this.api.getCompanies().subscribe(res => {
      console.log("responseeeeeeeee", res);
      var cmny: any = res;
      this.companyData = cmny.user;
      console.log("company data", this.companyData);
    })
  }

  selectCompanies(){
  }

   // from date event call
  getFromDate(fromdate) {
    console.log("from date", fromdate)
    this.to_date = "";
  }

  // to date event call
  gettoDate(todate) {
    console.log("todate", todate);
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
    this.router.navigate(['addstocks']);
  }

}