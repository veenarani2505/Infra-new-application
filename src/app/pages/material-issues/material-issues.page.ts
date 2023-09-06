import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-material-issues',
  templateUrl: './material-issues.page.html',
  styleUrls: ['./material-issues.page.scss'],
})
export class MaterialIssuesPage implements OnInit {

  projectname: any;
  issuedMaterialForm: FormGroup;
  isSubmitted = false;
  data: any;
  selectedMetrics: any;
  materialNames: any;
  materialNames1: any;
  mainCategery: any;
  mainCategery1: any;
  subCategery: any;
  subCategery1: any;
  metrics: any;
  metrics1: any;
  projectId: any;
  userId: any;
  subProjectId: any;
  values: any;
  image: string;
  myDate: string;
  response: any;
  mobile: any;
  selectedCategery: any;
  commingFrom: any;
  companyId: any;

  public customCategeryOptions: any = {
    header: "Select Category",
    cssClass: "alertdropdowncss",
  };
  public customsubCategeryOptions: any = {
    header: "Select SubCategory",
    cssClass: "alertdropdowncss",
  };
  public customMaterialOptions: any = {
    header: "Material Name",
    cssClass: "alertdropdowncss",
  };

  public customMetricsOptions: any = {
    header: "Select Metrics",
    cssClass: "alertdropdowncss",
  };

  constructor(private navCtrl: NavController, private router: Router, private toast: ToastController,
    private api: ApiService, private camera: Camera, private formBuilder: FormBuilder, private loading: LoadingService) {
      console.log("Constructorrrrrrrrrrrrrr");
    this.myDate = new Date().toISOString();
    this.projectname = localStorage.getItem('projectname');
    console.log(this.projectname);
    this.projectId = localStorage.getItem('projectId');
    console.log(this.projectId);
    this.userId = localStorage.getItem('userId');
    this.subProjectId = localStorage.getItem('subProjectId');
    this.mobile = localStorage.getItem('mobile');
    this.companyId = localStorage.getItem('companyId');
  }

  ngOnInit() {
    console.log("ngoniiiiiinnnnnnorrrrrrrrrrrrrr");
  this.submitFormdata();
    this.getmainCategery();
  }

  submitFormdata(){
    this.issuedMaterialForm = this.formBuilder.group({
      userId: [this.userId],
      materialCategory: ['', [Validators.required]],
      materialId: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      metrics: ['', [Validators.required]],
      issuedDate: ['', [Validators.required]],
      issuedLocation: ['', [Validators.required, Validators.maxLength(40)]],
      deliverLocation: ['', [Validators.required, Validators.maxLength(40)]],
      issueVehicleNo: ['', [Validators.required, Validators.maxLength(40)]],
      InvoiceImg: [this.image],
      notes: ['',[Validators.maxLength(256)]],
      receivedBy: ['', [Validators.required, Validators.maxLength(40)]],
      updatedBy: [this.mobile],
      projectId: [this.projectId],
      subProjectId: [this.subProjectId],
      company_id: [this.companyId],

    })
  } 
  
  ionViewWillEnter(){ 
    console.log("ionViewWillEnter");  
  }

  ionViewDidEnter(){
    console.log("view did enter");   
  }
 
  ionViewDidLeave(){
    console.log('ion did leave');
   // this.collectMaterialForm.reset();
  }
  ngOnDestroy(){
    console.log('seesion destroyed'); 
    // this.collectMaterialForm.reset();
   }

  // validator errors function
  get errorControl() {
    return this.issuedMaterialForm.controls;
  }

    //get api call for categery
  getmainCategery() {
    this.api.getCategeryDropDowns().subscribe(res => {
      this.subCategery1 = [];
      console.log("maincategery => ", res);
      this.mainCategery = res;
      this.mainCategery1 = this.mainCategery.data
  
    })
  }
  
    //get api call for subcategery
  getSubmainCategery(categery: any) {
    this.api.getSubCategeryDropDowns(categery).subscribe(res => {
      this.metrics1 = [];
      console.log("subcategery", res);
      this.subCategery = res;
      this.subCategery1 = this.subCategery.data
    })
  }
  
    //get api call for metrics
  getMetrics(id: any) {
    this.api.getPolMetrics(id).subscribe(res => {
      console.log(res);
      this.metrics = res;
      this.metrics1 = this.metrics.data
    this.selectedMetrics = this.metrics1[0].Metrics;
    })
  }

    //categery ionchange event 
  selectCategery(value) {
    console.log(value);
    this.selectedCategery = value;
    this.getSubmainCategery(value);
  }
  
    //subcategery ionchange event
  selectSubCategery(value) {
    console.log(value);
    this.selectedMetrics = value;
    this.getMetrics(value)
  }
  
    // metrics ionchange event
  selectMetrics(value) {
    console.log(value);
  }

   //camera capture function
  async takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.image);
    }, (err) => {
      // Handle error
      console.error(err);
    });
  }

  //submit data function
  onMaterialIssue() {
    this.isSubmitted = true;
    if (!this.issuedMaterialForm.valid) {
      this.presentToast("Please provide all the required values")
      console.log(this.issuedMaterialForm.value);
      return false;

    } else {
      
      this.data = this.issuedMaterialForm.value;
      delete this.data.materialCategery;
      console.log(this.data);
      if (this.data.InvoiceImg == null) {
        this.data.InvoiceImg = this.image;
      }
      this.loading.presentLoading();
      this.api.collectIssueMaterial(this.data).subscribe(res => {
        console.log(res);
        this.response = res
        this.loading.dismisLoading();
        if (this.response.status == 200) {
          this.presentToast(this.response.message);
         // this.issuedMaterialForm.reset()
        //  this.loading.dismisLoading();
          // this.router.navigate(['material-reports']);
          this.loading.dismisLoading();
        //  this.router.navigate(['material-transactions']);
          this.commingFrom = "issues"
          this.router.navigate(['material-transactions'], {queryParams:{
            value: this.commingFrom
          } ,
        });

        // this.loading.dismisLoading();
        } else if (this.response.status == 404) {
          this.presentToast(this.response.message);
         
        } else {
          this.presentToast(this.response.message);
         
        }
      }, err => {
        console.log(err);
        this.presentToast("Server not responded");
        this.loading.dismisLoading();
      }
      )

    }

  }
  
  //negative values not allowed for qunatity event
  checkValue(event) {
    if (event.target.value < 1) {
      event.target.value = '';
    }
  }

   // back navigation to previous page function
   goback() {
    // this.navCtrl.back(); 
    this.commingFrom = "issues"
    this.router.navigate(['material-transactions'], {queryParams:{
      value: this.commingFrom
    },
  });
   }
 
   // toast message controller
   async presentToast(massage: string) {
     const toast = await this.toast.create({
       message: massage,
       duration: 2000
     });
     toast.present(); 
   }

}