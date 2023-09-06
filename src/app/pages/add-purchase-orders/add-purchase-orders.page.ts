import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-purchase-orders',
  templateUrl: './add-purchase-orders.page.html',
  styleUrls: ['./add-purchase-orders.page.scss'],
})
export class AddPurchaseOrdersPage implements OnInit {
  addPurchaseOrderForm: FormGroup;
  isSubmitted = false;
  data: any;
  projectname: string;
  projectId: string;
  subProjectId: string;
  mobile: string;
  subCategery1: any = [];
  mainCategery1: any;
  subCategery: any;
  materialNames: any;
  materialNames1: any;
  metrics: any;
  metrics1: any;
  vendors: any;
  vendors1: any;
  selectedCategery: any;
  selectedMaterics: string;
  response: any;
  image: any;
  Sub_total: any;
  SGST9: any;
  CGST9: any;
  total: any;
  isControl: boolean = false;
  public customCategeryOptions: any = {
    header: "Select Category",
    cssClass: "alertdropdowncss",
  };

  public customsubCategeryOptions: any = {
    header: "Select Sub Category",
    cssClass: "alertdropdowncss",
  };

  public customVendorOptions: any = {
    header: "Vendor Name",
    cssClass: "alertdropdowncss",
  };
  
  public customMetricsOptions: any = {
    header: "Select Metrics",
    cssClass: "alertdropdowncss",
  };

  constructor(private navCtrl: NavController, private loading: LoadingService, private router: Router, 
    private api: ApiService,private toast: ToastController,private camera: Camera,
    private formBuilder: FormBuilder, private datepipe: DatePipe, private alrtCtrl: AlertController) { 
    this.projectname = localStorage.getItem('projectname');
    this.projectId = localStorage.getItem('projectId');
    this.subProjectId = localStorage.getItem('subProjectId');
    this.mobile = localStorage.getItem('mobile');
  }

  ngOnInit() {
    this.addPurchaseOrderForm = this.formBuilder.group({
      purchase_order_id: ['', [Validators.required]],
      material_catergory_id: ['', [Validators.required]],
      material_subcategory_id: ['', [Validators.required]],
      vendor_id: ['', [Validators.required]],
      PurchaseOrderCost: ['',[Validators.required]],
      purchaseorder_date: ['', [Validators.required]],
      qunatity_ordered: ['', [Validators.required]],
      metrics: ['', [Validators.required]],
      OrderPlacedLocation: ['', [Validators.required]],
      estiamted_order_deliverydate: ['', [Validators.required]],
      reference: ['',],
      branch: ['',],
      billed_status: ['',],
      InvoiceImg: [this.image],
      Sub_total:[''],
      SGST9:[''],
      CGST9:[''],
      total:[''],
      notes: [''],
      updated_by: [this.mobile],
      PO_raised_by: [this.mobile],
      project_id: [this.projectId],
      sub_project_id: [this.subProjectId],
      PO: this.formBuilder.array([]),
    })

    this.getmainCategery();
    this.getMetrics();
    this.getVendors();
  }

  addNewPurchaseOrder() {
    this.isControl = true
    let control = <FormArray>this.addPurchaseOrderForm.controls.PO;
    control.push(this.formBuilder.group({
      item: ['', [Validators.required]],
      description: ['', ],
      HSN_or_SAC: ['', ],
      quantity: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      amount: ['',]
    }))
  }

  setnewPurchaseOrders() {
    let control = <FormArray>this.addPurchaseOrderForm.controls.PO;
    this.data.PO.forEach(x => {
      control.push(this.formBuilder.group({
        item: x.item,
        description: x.description,
        HSN_or_SAC: x.HSN_or_SAC,
        quantity: x.quantity,
        rate: x.rate,
        amount: x.amount
      }))
    })
  }

  deleteItem(po: any, index: any){
    this.presentDeleteAlertConfirm(index)
  }
  checkStatus(){
    if(this.addPurchaseOrderForm.controls.PO.status == "valid"){
  this.isControl = true
        }else{
          this.isControl = false
        }
  }
  checkStatus2(){
    if(this.addPurchaseOrderForm.controls.PO.status == "valid"){
      this.isControl = true
    }else{
      this.isControl = false
    }
  }

  checkStatus3(){
    if(this.addPurchaseOrderForm.controls.PO.status == "valid"){
      this.isControl = true
    }else{
      this.isControl = false
    }
  }
  
  //get api call for categery
  getmainCategery() {
    this.api.getCategeryDropDowns().subscribe(res => {
      this.subCategery1 = [];
      console.log("maincategery => ", res);
      var mainCategery: any = res;
      this.mainCategery1 = mainCategery.data;
      console.log("maincategery => ", this.mainCategery1);
    })
  }

  //get api call for subcategory
  getSubmainCategery(categery: any) {
    this.api.getSubCategeryDropDowns(categery).subscribe(res => {
      this.subCategery = res;
      this.subCategery1 = this.subCategery.data;
      console.log("subcategery", this.subCategery1);
    })
  }

  // get api call for metrics
  getMetrics() {
    this.api.getMetrics().subscribe(res => {
      console.log("metrics =>", res);
      this.metrics = res;
      this.metrics1 = this.metrics.data

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

   // validators error controls
   get errorControl() {
    return this.addPurchaseOrderForm.controls;
  }

    // categery ionChange event
    selectCategery(value) {
      console.log(value);
      this.selectedCategery = value;
      if (value == "POL") {
        this.selectedMaterics = "Litre"
      } else if (value == "Concrete") {
        this.selectedMaterics = "Cum"
      }
      else {
        this.selectedMaterics = "Ton"
      }
      this.getSubmainCategery(value);
    }
  
    // subcategry ionChange event
    selectSubCategery(value) {
      console.log(value);
      // this.getMaterialNames(value);
    }
  
    // materialname ionChange event
    selectMaterialname(value) {
      console.log(value)
    }
  
    // vendors ionChange event
    selectVendors(event) {
    }
  
    //metrics ionChange event
    selectMetrics(event) {
    }

 //negative values not allowed for qunatity event
 checkValue(event) {
  if (event.target.value < 1) {
    event.target.value = '';
  }
}

updateTotal(){
  this.addPurchaseOrderForm.patchValue({
      total: Number(this.addPurchaseOrderForm.value.Sub_total) + Number(this.addPurchaseOrderForm.value.SGST9) + Number(this.addPurchaseOrderForm.value.CGST9)
    });
  }

get PO(): FormArray {
  return this.addPurchaseOrderForm.get('PO') as FormArray;
}

onMaterialReceipts(){
  this.isSubmitted = true;
  if (!this.addPurchaseOrderForm.valid) {
    this.presentToast("Please provide all the required values")
    console.log(this.addPurchaseOrderForm.value);
    return false;
  }else{

    this.loading.presentLoading()
    this.data = this.addPurchaseOrderForm.value;

    if (this.data.InvoiceImg == null) {
      this.data.InvoiceImg = this.image;
    }

    this.api.postPurchaseOrders(this.data).subscribe(res =>{
      this.loading.dismisLoading();
      console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", res)
      this.response = res;
      if(this.response.status == 200){
        // this.loading.dismisLoading();
        this.presentToast(this.response.message)
        this.router.navigate(['purchase-orders-list']);
      }else{
        // this.loading.dismisLoading();
        this.presentToast(this.response.message)
      }
    })
  }
}

async presentDeleteAlertConfirm(index) {
  const alert = await this.alrtCtrl.create({
    cssClass: 'my-custom-class',
    //  header: 'Confirm!',
    message: 'Do you want to Delete?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: cancelled');
        }
      }, {
        text: 'Okay',
        handler: () => {
          let control = <FormArray>this.addPurchaseOrderForm.controls.PO;
          control.removeAt(index);
          this.isControl = false;
          
        }
      }
    ]
  });
  await alert.present();
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

  goback() {
    this.navCtrl.back();
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
