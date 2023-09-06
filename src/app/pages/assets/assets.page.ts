import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.page.html',
  styleUrls: ['./assets.page.scss'],
})
export class AssetsPage implements OnInit {
  projectname: any;
  isSubmitted = false;
  asset_type: any;
  owned_asset: any;
  purchased_date: any;
  purchased_cost: any;
  leased_asset: any;
  collectAssetsForm: FormGroup;
  start_date: any;
  end_date: any;
  projectsData: any;
  subProjects: any;
  subProjectsData: any;
  projectId: any;
  SubProjectId: any;
  projectName: any;
  subProject: any;
  projectName2: any;
  subProjectName2: any;
  disabled = false;
  p_id: any;
  sp_id: any;
  selectedCompanyId: any;
  selectedProjectId: any;
  selectedSubProjectId: any;
  equipment_number: any;
  companyId: string;
  notes: any;
  image: any;
  data: any;
  response: any;
  EquipmentResponse2: any;

  public customAssetTypeOptions: any = {
    header: "Select Asset Type",
    cssClass: "alertdropdowncssWorkType",
  };
  public customProjectsOptions: any = {
    header: "Select project name",
    cssClass: "alertdropdowncssWorkType",
  };
  public customSubProjectsOptions: any = {
    header: "Select sub project name",
    cssClass: "alertdropdowncssWorkType",
  };
  public customequipmentOptions: any = {
    header: "Select Equipment Type",
    cssClass: "alertdropdowncssWorkType",

  };

  constructor(private router: Router, private api: ApiService, 
    private camera: Camera, private formBuilder: FormBuilder, private toast: ToastController, private loading : LoadingService) {
    this.projectname = localStorage.getItem('projectname');
    this.companyId = localStorage.getItem('companyId');
    this.projectId = localStorage.getItem('projectId');
    this.projectId = parseInt(this.projectId);
    this.SubProjectId = localStorage.getItem('subProjectId');
    this.SubProjectId = parseInt(this.SubProjectId);
  }

  ngOnInit() {
    this.collectAssetsForm = this.formBuilder.group({
      asset_type: ['', ],
      asset_type_ID: ['',],
      leased_invoice_number: ['', ],
      leased_tds: ['', ],
      leased_vendor_name: ['', ],
      leased_vehicle_number: ['',],
      leased_current_month: ['',],
      leased_bill_amount: ['', ],
      leased_outstanding_amount: ['',],
      leased_payment_made: ['', ],
      leased_total_bill_amount: ['', ],
      leased_Proposed_payment_by_site: ['',],
      leased_Approved_by_GSH: [''],
      leased_start_date: ['', ],
      leased_end_date: ['',],
      owned_vehicle_number: [this.image],
      owned_invoice_number: ['',],
      owned_vendor_name: ['', ],
      procure_date: ['', ],
      owned_bill_amount: ['', ],
      notes: ['',],
      updated_by: ['Srija', ],
      updated_on: ['23Oct',],
      InvoiceImg: [this.image],
      project_id: [this.projectId],
      subproject_id: [this.SubProjectId],
    })
    this.getEquipmentType();  
  }

  getEquipmentType() {
    this.api.getEquipmentType().subscribe(res => {
      console.log("equipment Type Deatils Response", res);
     var EquipmentResponse : any = res;
      this.EquipmentResponse2 = EquipmentResponse.data;
    })
  }

  // validators error controls
  get errorControl() {
    return this.collectAssetsForm.controls;
  }

  selectEquipmentType(event: any) {
    console.log("selected equipment type", event)
  }

  selectAssetType(event) {
    console.log("event", event);
    this.asset_type = event
  }

  // from date event call
  getFromDate(fromdate) {
    console.log("from date", fromdate)
    this.end_date = "";
  }

  // to date event call
  gettoDate(todate) {
    console.log("todate", todate);
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

  onAddAssets() {
    this.isSubmitted = true;
    if (!this.collectAssetsForm.valid) {
      this.presentToast("Please provide all the required values")
      console.log(this.collectAssetsForm.value);
      return false;
    } else {
      this.data = this.collectAssetsForm.value;
      delete this.data.materialCategery;
      console.log(this.data);
      if (this.data.InvoiceImg == null) {
        this.data.InvoiceImg = this.image;
      }
      this.loading.presentLoading();

    this.api.postAsset(this.data).subscribe(res => {
      console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeeeee", res)
      this.loading.dismisLoading();
      this.response = res;
      if(this.response.status == 200){
        this.loading.dismisLoading();
        this.presentToast(this.response.message)
        this.router.navigate(['assetslist']);
      } else if(this.response.status == 400){
        this.loading.dismisLoading();
        this.presentToast(this.response.message)
      }else{
        this.loading.dismisLoading();
        this.presentToast(this.response.message)
      } 
    })
  }
  }

  goback() {
    // this.navCtrl.back();
    this.router.navigate(['assetslist']);
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