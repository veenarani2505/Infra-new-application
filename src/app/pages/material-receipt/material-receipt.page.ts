import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingService } from 'src/app/services/loading.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-material-receipt',
  templateUrl: './material-receipt.page.html',
  styleUrls: ['./material-receipt.page.scss'],
})
export class MaterialReceiptPage implements OnInit {

  projectname: any;
  collectMaterialForm: FormGroup;
  isSubmitted = false;
  data: any;
  materialNames: any;
  materialNames1: any;
  mainCategery: any;
  mainCategery1: any;
  subCategery: any;
  subCategery1: any;
  metrics: any;
  metrics1: any;
  vendors: any;
  vendors1: any;
  image: string;
  projectId: any;
  userId: any;
  subProjectId: any;
  subProjectId2: any;
  selectedMaterics: string;
  response: any;
  selectedCategery: any;
  email: any;
  mobile: any;
  commingFrom: any;
  purchaseOrdersListResp: any;
  selectedMetrics: any;
  dateReceived: any;
  voucherDate: any;
  companyId: any;

  public customCategeryOptions: any = {
    header: "Select Category",
    cssClass: "alertdropdowncss",

  };
  public customsubCategeryOptions: any = {
    header: "Select Sub Category",
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

  public customVendorOptions: any = {
    header: "Vendor Name",
    cssClass: "alertdropdowncss",
  };

  constructor(private navCtrl: NavController, private loading: LoadingService, private router: Router,
    private api: ApiService, private camera: Camera, private toast: ToastController,
    private formBuilder: FormBuilder, private datepipe: DatePipe) {
    this.dateReceived = new Date().toISOString();
    this.voucherDate = new Date().toISOString();
    this.projectname = localStorage.getItem('projectname');
    console.log(this.projectname);
    this.projectId = localStorage.getItem('projectId');
    console.log(this.projectId);    this.userId = localStorage.getItem('userId');
    this.subProjectId = localStorage.getItem('subProjectId');
    this.subProjectId2 = parseInt(this.subProjectId);
    console.log(this.subProjectId2);
    this.email = localStorage.getItem('email');
    this.mobile = localStorage.getItem('mobile');
    this.companyId = localStorage.getItem('companyId');

  }
  ngOnInit() {
    this.submitFormData();
    console.log("ngoninit ------------")
    this.getmainCategery();
    this.getVendors();
    this.getPurchaseOrdersDropdownlist();
  }

submitFormData() {
    this.collectMaterialForm = this.formBuilder.group({
    userId: [this.userId],
    materialCategery: ['', [Validators.required]],
    materialId: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    metrics: ['', [Validators.required]],
    PurchaseOrderId: ['',],
    vendorId: ['', [Validators.required]],
    dateReceived: ['', [Validators.required]],
    location: ['', [Validators.required, Validators.maxLength(40)]],
    voucherDate: ['', [Validators.required]],
    invoiceNo: ['', [Validators.required, Validators.maxLength(40)]],
    vehicleNo: ['', [Validators.required,  Validators.maxLength(40)]],
    InvoiceImg: [this.image],
    notes: ['', [Validators.maxLength(256)]],
    updatedBy: [this.mobile],
    receivedBy: [this.mobile],
    projectId: [this.projectId],
    subProjectId: [this.subProjectId],
    company_id: [this.companyId]
  })
}

ionViewWillEnter() {
  console.log("ionViewWillEnter");
}
ionViewDidEnter() {
  console.log("view did enter");
}

// validators error controls
get errorControl() {
  return this.collectMaterialForm.controls;
}

//get api call for categery
getmainCategery() {
  this.api.getCategeryDropDowns().subscribe(res => {
    this.subCategery1 = [];

    console.log("maincategery => ", res);
    this.mainCategery = res;
    this.mainCategery1 = this.mainCategery.data;
    console.log("maincategery => ", this.mainCategery1);
  })
}

  //get api call for subcategory
getSubmainCategery(categery: any) {
  this.api.getSubCategeryDropDowns(categery).subscribe(res => {
    this.metrics1 = [];
    this.subCategery = res;
    this.subCategery1 = this.subCategery.data;
    console.log("subcategery", this.subCategery1);
  })
}

  // get api call for metrics
getMetrics(id: any) {
  this.api.getPolMetrics(id).subscribe(res => {
    console.log("metrics =>", res);
    this.metrics = res;
    this.metrics1 = this.metrics.data
    console.log("this.metricssssss", this.metrics1)
    this.selectedMetrics = this.metrics1[0].Metrics;
  })
}

 // get api call for vendors
getVendors() {
  this.api.getVendors().subscribe(res => {
    console.log("vendors =>", res);
    this.vendors = res;
    this.vendors1 = this.vendors.data
  })
}

getPurchaseOrdersDropdownlist() {
  this.api.getPurchaseOrdersDropdownList().subscribe(res => {
    console.log("purchse order list", res)
    var resp: any;
    resp = res
    this.purchaseOrdersListResp = resp.data
    console.log("purchadse orders reponseee", this.purchaseOrdersListResp)
  })
}

  // categery ionChange event
selectCategery(value) {
  console.log(value);
  this.selectedCategery = value;
  this.getSubmainCategery(value);
}

  // subcategry ionChange event
selectSubCategery(value) {
  this.selectedMetrics = value;
  console.log(value);
  this.getMetrics(value);
}

// vendors ionChange event
selectVendors(event) { }

//metrics ionChange event
selectMetrics(event) { }

 //submit data function
onMaterialReceipts() {
  this.isSubmitted = true;
  if (!this.collectMaterialForm.valid) {
    this.presentToast("Please provide all the required values")
    console.log(this.collectMaterialForm.value);
    return false;
  } else {
    this.data = this.collectMaterialForm.value;
    delete this.data.materialCategery;
    console.log(this.data);
    if (this.data.InvoiceImg == null) {
      this.data.InvoiceImg = this.image;
    }
    this.loading.presentLoading();
    this.api.collectMaterial(this.data).subscribe(res => {
      this.loading.dismisLoading();
      console.log(res);
      this.response = res;    
      if (this.response.status == 200) {        
        this.presentToast(this.response.message);
        this.router.navigate(['material-transactions']);
      } else {
        this.loading.dismisLoading();
        this.presentToast(this.response.message);
      }
    }, err => {
      console.log(err);
      this.loading.dismisLoading();
      this.presentToast("Server not responded");
    })
  }
}

// back navigation to previous page
goback() {
  this.commingFrom = "receipts"
  this.router.navigate(['material-transactions'], {
    queryParams: {
      value: this.commingFrom
    },
  });
}

  // camera capture function
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
  //negative values not allowed for qunatity event
checkValue(event) {
  if (event.target.value < 1) {
    event.target.value = '';
  }
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