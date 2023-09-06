import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { getPriority } from 'os';

@Component({
  selector: 'app-addsubprojects',
  templateUrl: './addsubprojects.page.html',
  styleUrls: ['./addsubprojects.page.scss'],
})
export class AddsubprojectsPage implements OnInit {
  projectname: any;
  collectAddSubProjectsForm: FormGroup;
  isSubmitted = false;
  data: any;
  companyData: any;
  companyId: any;
  projectsData: any;
  selectedProjectId: any;
  response: any;
  frommindate: any;
  frommaxdate: any;
  to_date: string;

  public customProjectsOptions: any = {
    header: "Select project name",
    cssClass: "alertdropdowncssWorkType",
  };

  constructor(private router: Router,private formBuilder: FormBuilder, private toast: ToastController, private api: ApiService) {
    this.companyId = localStorage.getItem('companyId');
   }

  ngOnInit() {

    this.collectAddSubProjectsForm = this.formBuilder.group({
      AutoProjectId: ['', [Validators.required]],
      // AutoProjectId: [this.companyId],
      SubProjectId: ['', [Validators.required]],
      SubProjectName: ['', [Validators.required]],      
      SubProjectDescription: ['', [Validators.required]],
      SubProjectType: ['', [Validators.required]],
      SubProjectAddress: ['', [Validators.required]],
      SubProjectCity: ['', [Validators.required]],
      SubProjectState: ['', [Validators.required]],
      SubProjectCountry: ['', [Validators.required]],
      SubProjectZipCode: ['', [Validators.required]],
      SubProjectEstimatedValue: ['', [Validators.required]],
      SubProjectStartDate: ['', [Validators.required]],
      SubProjectEndDate: ['', [Validators.required]],
    
    })

    this.getProjects()
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

  // validators error controls
  get errorControl() {
    return this.collectAddSubProjectsForm.controls;
  }

  onAddSubProjects(){
    this.isSubmitted = true;
    if (!this.collectAddSubProjectsForm.valid) {
      this.presentToast("Please provide all the required values")
      console.log(this.collectAddSubProjectsForm.value);
      return false;

    }else{
      this.data = this.collectAddSubProjectsForm.value;
      console.log("body --------addsubprojects------------->", this.data)
      this.api.addSubProjects(this.data).subscribe(res => {
       console.log("addsubprojects", res)
      this.response = res;
      if(this.response.status === 200){
        this.presentToast(this.response.message);
        this.router.navigate(['sub-projectlist']);
        
      }
      })
    }
  }

    // projects ionChange event
  selectProjects(event: any) {
    console.log("selected project iddd", event);
     // this.getSubProjects(event[0]);
    this.selectedProjectId = event;
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

  goback() {
    //  this.navCtrl.back();
    this.router.navigate(['addstocks']);
  }

   //toast message controller
   async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();  
  }

}