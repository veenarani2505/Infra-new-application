import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { CustomAlertComponent } from 'src/app/customAlerts/custom-alert/custom-alert.component';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-mixed-material-issue',
  templateUrl: './mixed-material-issue.page.html',
  styleUrls: ['./mixed-material-issue.page.scss'],
})
export class MixedMaterialIssuePage implements OnInit {

  mixedMaterialIssueForm: FormGroup;
  isSubmitted = false;
  data: any;
  quantity4: any;
  mix_design_type: any;
  selectedMixedType: any;
  productValue: any;
  isDisplay: boolean = false;
  mixedDesignResp: any;
  mixedworktypeArray: any = [];
  id_value: any = [];
  dict_key:any;
  id_value_2: any = [];
  dict_key_2:any;
  quantity: number;
  cement_quantity: any;
  aggregates40_quantity: any;
  aggregates20_quantity: any;
  dust_quantity: any;
  sand_quantity: any;
  getMaterialresponse: any;
  getMaterialresponse2: any;
  projects: any;
  projectsData: any;
  subProjects: any;
  subProjectsData: any;
  workCompleted: any;
  workCompleted2: any;
  subworkCompleted: any;
  subworkCompleted2: any;
  issuedLocation: any;
  notes: any;
  selectedprojectId: any;
  selectedSubProjectId: any;
  selectedWorkCompletedId: any;
  selectedsubworkCompletedId: any;
  userId: any;
  mobile: any;
  response: any;
  commingFrom: any;
  cement_id: any;
  aggregates40_id: any;
  aggregates20_id: any;
  dust_id: any;
  sand_id: any;
  image: any;
  cement_metrics: any;
  aggregates40_metrics: any;
  aggregates20_metrics: any;
  dust_metrics: any;
  sand_metrics: any;
  projectname: any;
  deliveryLocation: any;
  vehicleNumber: any;
  receivername: any;
  issuedDate: any;
  subProjectName: any;
  projectId: string;
  myDate: string;

     // Allow decimal numbers and negative values
     private regex: RegExp = new RegExp(/^\d*\.?\d{0,3}$/g);
     // Allow key codes for special events. Reflect :
     // Backspace, tab, end, home
     private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
    companyId: string;
     numberOnly(event): boolean {
      let value = event.target.value;
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
       let current: string = value;
        const position = event.target.selectionStart;
        const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
        if (next && !String(next).match(this.regex)) {
         event.preventDefault();
        }   
    }

    public customSubProjectsOptions: any = {
      header: "Select Sub Project",
      cssClass: "alertdropdowncss",
    };
  
    public customWorkCompletedOptions: any = {
      header: "Select Work Component",
      cssClass: "alertdropdowncssWorkType",
    };
  
    public customSubWorkCompletedOptions: any = {
      header: "Select Sub Work Component",
      cssClass: "alertdropdowncssWorkType",
    };
  
    public customWorkTypeOptions: any = {
      header: "Select Work Type",
      cssClass: "alertdropdowncss",
    };
  
  constructor(private formBuilder: FormBuilder, private loader: LoadingService,
    private navCtrl: NavController, private api: ApiService,
    private router: Router, private toast: ToastController,
    private camera: Camera, private datepipe: DatePipe, private alrtCtrl: AlertController, private mdlCtrl: ModalController) {    
    this.userId = localStorage.getItem('userId');
    this.mobile = localStorage.getItem('mobile');
    this.projectname = localStorage.getItem('projectname');
    this.projectId = localStorage.getItem("projectId");
    this.companyId = localStorage.getItem('companyId');
    // this.subProjectName = localStorage.getItem("subproject");  
  }
  
  ngOnInit() {
    this.getMixedWorkTypes();
    this.getSubProjects();
  }

  selectmixedmaterialType(event) {
    this.isDisplay = false
    console.log("selected mixed dcesign type", event);
    this.selectedMixedType = event;
    this.issuedDate = undefined;
    this.issuedLocation = undefined;
    this.deliveryLocation = undefined;
    this.notes = undefined;
    this.receivername = undefined;
    this.image = undefined;
    this.vehicleNumber = undefined;
    this.quantity = undefined;
  }

  getMixedWorkTypes() {
    this.api.getMixedDesignTypes().subscribe(res => {
      console.log(res);
      this.mixedDesignResp = res
      this.mixedworktypeArray = this.mixedDesignResp.data
    })
  }
   // get api call for sub projects
  getSubProjects() {
    this.api.getSubProjects(this.projectId).subscribe(res => {
    this.subProjects = res;
    this.subProjectsData = this.subProjects.data;
      console.log("subprojectsData", this.subProjectsData);
    });
  }
  
  getWorkCompleted(p_id: any, sp_id: any) {
      // this.selectedSubProjectId = undefined;
    this.api.getMixedWorkComponentType(p_id, sp_id).subscribe(res => {
      console.log("Work Completed Responseee", res)
      this.workCompleted = res;
      this.workCompleted2 = this.workCompleted.data
      console.log(this.workCompleted2)
    })
  }
  
  getSubWorkCompleted() {
    this.api.getMixedSubWorkComponentType(this.subProjectName).subscribe(res => {
      console.log("Work Subbb Completed Responseee", res)
      this.subworkCompleted = res;
      this.subworkCompleted2 = this.subworkCompleted.data
      console.log("h2222222222222222", this.subworkCompleted2)
    })
  }

   // subprojects ionChange event
  selectSubProjects(event) {
   this.workCompleted2 = [];
   this.selectedWorkCompletedId = undefined;
   this.selectedsubworkCompletedId = undefined;
   console.log("project id ------", this.projectId)
   console.log("select Sub project id ", event);
   this.selectedSubProjectId = event;
   console.log("work type dataa for selected", this.workCompleted2)
   this.getWorkCompleted(this.projectId, this.selectedSubProjectId);

   const update = this.subProjectsData.filter(x => {
    if (event == x.AutoSubProjectId) {
      this.subProjectName = x.SubProjectName
      console.log("filetr subproject name", this.subProjectName)
    }
   })
  }

  selectworkComplted(event) {
    console.log("selected work completeddd type", event);
    this.selectedWorkCompletedId = event;
    this.getSubWorkCompleted();
  }

  selectsubWorkCompleted(event) {
    console.log("selected sub work completedd type", event);
    this.selectedsubworkCompletedId = event;
  }

  getMaterialsForMixedDesign() {

    var data = {
      "quantity": this.quantity,
      "data1": this.selectedMixedType
    }

    console.log("data quantityyyy", typeof data.quantity)

    if (data.quantity == undefined && (data.data1 == undefined)) {
      this.presentToast("Please select mixed design type and quantity")
    } else if (data.quantity == undefined) {
      this.presentToast("Please enter quantity")
      this.isDisplay = false;
    }

    else if (isNaN(data.quantity)) {
      this.presentToast("Please enter quantity")
      this.isDisplay = false;
    }

    else if (data.data1 == undefined) {
      this.presentToast("Please select mixed design type")
    }

    else {

      this.isDisplay = true;

      this.issuedDate = new Date().toISOString();
      this.api.postQunatityForMaterials(data).subscribe(res => {
        console.log(res);
        this.getMaterialresponse = res
        this.getMaterialresponse2 = this.getMaterialresponse.quantity
        if(this.getMaterialresponse2.length!=0){
          for(var i=0;i<this.getMaterialresponse2.length;i++){
            this.dict_key={"id":this.getMaterialresponse2[i]["ID"],"quantity":this.getMaterialresponse2[i]["Quantity"]}            
            this.id_value.push(this.dict_key)
          }
          }
        console.log("ID KEY VALUES",this.id_value) 
      },
        err => {
          console.log(err);
          console.log(err.status);
          //  this.loader.dismisLoading();
          this.presentToast("Server not responded");
        }
      )
    }
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
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.image);
    }, (err) => {
      // Handle error
      console.error(err);
    });
  }

  onfunction2(){
  }

  onSubmitMixedMaterial() {
    this.id_value_2=[]
    for(var i=0;i<this.id_value.length;i++){
      this.dict_key_2={[this.id_value[i]["id"]]:this.id_value[i]["quantity"]}
      this.id_value_2.push(this.dict_key_2)
    }
    console.log("ID VALUE 2",this.id_value_2)
    var data = {
      "mix_design_type": this.selectedMixedType,
      "quantity": this.quantity,
      "metrics": "Ton",
      "mixedMaterials": this.id_value_2,
      "project_id": this.projectId,
      "sub_project_id": this.selectedSubProjectId,
      "work_component_id": this.selectedWorkCompletedId,
      "sub_work_component_id": this.selectedsubworkCompletedId,
      "issuedDate": this.issuedDate,
      "userId": this.userId,
      "updatedBy": this.mobile,
      "issue_location": this.issuedLocation,
      "deliver_location": this.deliveryLocation,
      "received_by": this.receivername,
      "notes": this.notes,
      "vehicle_number": this.vehicleNumber,
      "InvoiceImg": this.image,
      "company_id": this.companyId
    }

    if (data.sub_project_id == undefined || data.work_component_id == undefined || data.sub_work_component_id == undefined || data.issuedDate == undefined) {
      this.presentToast("Please enter all the required fields");
    }
    else {
      console.log("sending body", data)
      this.loader.presentLoading();
      this.api.postMixedDesignTypeDetails(data).subscribe(res => {
        this.loader.dismisLoading();
        console.log("Mixed Design Post Method responseeee", res)
        this.response = res
        console.log("response------- stock", res)
        if (this.response.status == 200) {
          // this.loader.dismisLoading();
          this.presentToast(this.response.message);
          this.commingFrom = "issues"
          this.router.navigate(['material-transactions'], {
            queryParams: {
              value: this.commingFrom
            },
          });

        }
        else if (this.response.status === 500) {
          // this.loader.dismisLoading();
          this.presentAlertConfirm(this.response.data);
        }
        else if (this.response.status === 400) {
          //  this.loader.dismisLoading();
          this.presentToast(this.response.message);
        } else {
          //  this.loader.dismisLoading();
          this.presentToast(this.response.message)
        }
      }, err => {
        console.log(err);
        console.log(err.status);
        this.loader.dismisLoading();
        this.presentToast("Server not responded");
      }
      )

    }
  }

    //negative values not allowed for qunatity event
  checkValue(event, event2) {
  
    if (event.target.value < 0) {
        event.target.value = '';
    }
    for(var i=0;i<this.id_value.length;i++){
        // console.log("ID VALUE=======",this.id_value[i][event2])
        if(this.id_value[i]["id"]==event2){
          this.id_value[i]["quantity"]=event.target.value
        }
    }
  }
  
  checkValue2(event){
      if (event.target.value < 0) {
        event.target.value = '';
      }
  }
  
  goback() {
      // this.navCtrl.pop();
    this.commingFrom = "issues"
    this.router.navigate(['material-transactions'], {
      queryParams: {
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
   
  async presentAlertConfirm(data: any) {
    let itemsList = ``;
    data.map((item) => {
      itemsList += `<li>${item}</li>`
    })
    let message = `<ul>${itemsList}</ul>`;
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      header: "Stock not available",
      message: message,
      buttons: ['OK',]
    });  
      await alert.present();
  }
  
  async showPopup(data: any) {
    const modal = await this.mdlCtrl.create({
      component: CustomAlertComponent,
      cssClass: 'alert-modal',
      backdropDismiss: false,
      componentProps: { msg: data }
    });
    await modal.present();
  }

}