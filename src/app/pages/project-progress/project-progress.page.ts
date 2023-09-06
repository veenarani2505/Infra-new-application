import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-project-progress',
  templateUrl: './project-progress.page.html',
  styleUrls: ['./project-progress.page.scss'],
})
export class ProjectProgressPage implements OnInit {
  myForm: FormGroup;
  isSubmitted = false;
  profileimg: any;
  uploadMultipleImages: any = [];
  projectname: any;
  mobile: any;
  EquipmentResponse: any = [];
  steelResponse: any = [];
  fuelResponse: any = [];
  mixedworktypeArray: any = [];
  response: any;
  fuelMetrics: any;
  DailyDateReport: any = new Date();
  steelMetrics: any;
  MDMetrics: any;
  selectedSteelMetrics: any;
  selectedMDMetrics: any;
  values: any;
  work_progressId: any;
  selectedStartDate: any;
  isDisable: boolean = false;
  ArrayBase64Values: any = [];
  isControls: boolean = false;
  isControls2: boolean = false;
  isControls3: boolean = false;
  isBase64: boolean = true;
  equipmentDate: string;
  steelDate: string;
  mixedDesignDate: string;
  uploadMultipleImages2: any = [];
  component: any;
  subComponet: any;
  selectedDate: any;
  subprojectname_wp: any;
  subworkCompleted: any;
  isDisbled: boolean = false;
  EquipmentNumber: any;

  data = {
    equipment: [],
    steel: [],
    MD: [],
  }

  public customequipmentOptions: any = {
    header: "Select Equipment Type",
    cssClass: "alertdropdowncssWorkType",

  };
  public customequipmentNumberOptions: any = {
    header: "Select Equipment Number",
    cssClass: "alertdropdowncssWorkType",

  };

  public customWorkTypeOptions: any = {
    header: "Select Work Type",
    cssClass: "alertdropdowncssWorkType",

  };

  public customMetricsOptions: any = {
    header: "Select Metrics",
    cssClass: "alertdropdowncssWorkType",
  };

  public customSteelTypeOptions: any = {
    header: "Select Steel Type",
    cssClass: "alertdropdowncssWorkType",
  };

  public customSubWorkComponentOptions: any = {
    header: "Sub Work Component",
    cssClass: "alertdropdowncssWorkType",

  };
  metrics: any;

  constructor(private navCtrl: NavController, private fb: FormBuilder,
    private camera: Camera, private alrtCtrl: AlertController,
    private api: ApiService, private router: Router, private datepipe: DatePipe,
    private toast: ToastController, private loading: LoadingService) {
    this.projectname = localStorage.getItem('projectname');
    this.subprojectname_wp = localStorage.getItem("subProjectname_wp")

    console.log("SubProjectname work project", this.subprojectname_wp)
    this.mobile = localStorage.getItem('mobile');
    this.equipmentDate = new Date().toISOString();
    this.steelDate = new Date().toISOString();
    this.mixedDesignDate = new Date().toISOString();
    this.component = localStorage.getItem("workcomponent");
    this.subComponet = localStorage.getItem("subworkComponent");
    this.selectedDate = localStorage.getItem("selectedDate");
    console.log("component", this.component);
    console.log("subcomponet", this.subComponet);
    console.log("selected DAte", this.selectedDate);

    if (router.getCurrentNavigation().extras.state) {
      this.values = this.router.getCurrentNavigation().extras.state;
      this.work_progressId = this.values.data.wp_id;
      this.selectedStartDate = this.values.data.day_date;
      this.uploadMultipleImages2 = this.values.arrayImage;

    }
    this.data = this.values;

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      day_date: [this.selectedStartDate],
      sub_work_component_id: ['', [Validators.required]],
      work_done_quantity: ['', [Validators.required]],
      notes: [''],
      status_metrics: ['Cum'],
      updated_by: [this.mobile],
      wp_id: [this.work_progressId],
      mulImages: [this.uploadMultipleImages],
      equipment: this.fb.array([]),
      steel: this.fb.array([]),
      MD: this.fb.array([]),
    })
    this.getMetrics();
    this.getEquipmentType();
    this.getEquipmentNumber();
    this.getSteelData();
    this.getFuelType();
    this.getMixedWorkTypes();
    this.getSteelMetrics();
    this.getMDMetrics();
    this.getSubWorkCompleted();
    if (this.values.status === 200) {
      this.isDisbled = true;
      setTimeout(() => {
        this.setEquipments();
        this.setMixedDesign();
        this.setSteels();
        this.setValues();
      }, 500);
    }
  }

  setValues() {
    this.myForm.controls['work_done_quantity'].setValue(this.values.resultsstatus[0].work_done_quantity);
    this.myForm.controls['notes'].setValue(this.values.resultsstatus[0].notes);
    this.myForm.controls['sub_work_component_id'].setValue(this.values.resultsstatus[0].sub_work_component_id);
  }

  // validators error controls
  get errorControl() {
    return this.myForm.controls;
  }

  addNewEqupment() {
    this.isControls = true;
    let control = <FormArray>this.myForm.controls.equipment;
    control.push(this.fb.group({
      equipment_type_id: ['', [Validators.required]],
      fuel_type: ['', [Validators.required]],
      fuel_consumed: ['', [Validators.required]],
      equipment_no: ['', [Validators.required]],
      metrics: ['', [Validators.required]],
      initial_reading: ['', [Validators.required]],
      end_reading: ['', [Validators.required]],
      equipment_issued_date: ['',],
      fuel_issued_by: ['', [Validators.maxLength(40)]]
    }))
  }

  addNewSteel() {
    this.isControls2 = true;
    let control = <FormArray>this.myForm.controls.steel;
    control.push(this.fb.group({
      material_id: ['', [Validators.required]],
      steel_quantity: ['', [Validators.required]],
      steel_metrics: ['', [Validators.required]],
      steel_issued_date: [''],
      steel_issued_by: ['', [Validators.maxLength(40)]],
    }))
  }

  addNewMixedDesign() {
    this.isControls3 = true;
    let control = <FormArray>this.myForm.controls.MD;
    control.push(this.fb.group({
      md_type_id: ['', [Validators.required]],
      md_quantity: ['', [Validators.required]],
      md_metrics: ['', [Validators.required]],
      md_issued_date: [''],
      md_issued_by: ['', [Validators.maxLength(40)]],
    }))
  }

  setEquipments() {
    let control = <FormArray>this.myForm.controls.equipment;
    this.data.equipment.forEach(x => {
      control.push(this.fb.group({
        equipment_type_id: x.equipment_type_id,
        fuel_type: x.fuel_type,
        fuel_consumed: x.fuel_consumed,
        equipment_no: x.equipment_no,
        metrics: x.metrics,
        initial_reading: x.initial_reading,
        end_reading: x.end_reading,
        equipment_issued_date: x.issued_date,
        fuel_issued_by: x.fuel_issued_by
      }))
    })

  }
  setSteels() {
    let control = <FormArray>this.myForm.controls.steel;
    this.data.steel.forEach(x => {
      control.push(this.fb.group({
        material_id: x.material_id,
        steel_quantity: x.quantity,
        steel_metrics: x.metrics,
        steel_issued_date: x.issued_date,
        steel_issued_by: x.issued_by
      }))
    })
  }

  setMixedDesign() {
    let control = <FormArray>this.myForm.controls.MD;
    this.data.MD.forEach(x => {
      control.push(this.fb.group({
        md_type_id: x.md_type_id,
        md_quantity: x.quantity,
        md_metrics: x.metrics,
        md_issued_date: x.issued_date,
        md_issued_by: x.issued_by,
      }))
    })
  }
  // get api call for metrics
  getMetrics() {
    this.api.getMetrics().subscribe(res => {
      var metric: any = res;
      this.metrics = metric.data
    })
  }
  getEquipmentType() {
    this.api.getEquipmentType().subscribe(res => {
      console.log("equipment Type Deatils Response", res);
      var equipmentResp : any = res;
      this.EquipmentResponse = equipmentResp.data;
    })
  }

  getEquipmentNumber() {
    this.api.getEquipmentNumber().subscribe(res => {
      var EquipmentNumb: any = res;
      this.EquipmentNumber = EquipmentNumb.VechileNumber;
    })
  }

  getSteelData() {
    this.api.getSteelType().subscribe(res => {
      var steelResp : any = res;
      this.steelResponse = steelResp.data;
    })
  }

  getFuelType() {
    this.api.getFuelType().subscribe(res => {
      var fuleResp: any = res;
      this.fuelResponse = fuleResp.data
      
    })
  }

  getMixedWorkTypes() {
    this.api.getMixedDesignTypes().subscribe(res => {
      var mixedDesignResp : any = res;
      this.mixedworktypeArray = mixedDesignResp.data
    })
  }

  getPolMetrics(id: any) {
    this.api.getPolMetrics(id).subscribe(res => {
      var fuelMetrics: any = res;
      this.fuelMetrics = fuelMetrics.data
  
    })
  }

  getSteelMetrics() {
    this.api.getSteelMetricsData().subscribe(res => {
      var steelMetrics: any = res;
      this.steelMetrics = steelMetrics.data;
     
    })
  }

  getMDMetrics() {
    this.api.getMdMetricsData().subscribe(res => {
      console.log("MD metrics data", res)
      var mdMetrics: any = res;
      this.MDMetrics = mdMetrics.data;
     
    })
  }


  // get sub work component dropdown api call
  getSubWorkCompleted() {
    this.api.getMixedSubWorkComponentType(this.subprojectname_wp).subscribe(res => {
      console.log("Work Subbb Completed Responseee", res)
      var subworkComp: any = res;
      this.subworkCompleted = subworkComp.data;
    
    })
  }

  selectSubWorkType(event) {
    console.log("selected sub work component", event)

  }

  selectEquipmentNumber(event) {
    console.log("selected Value", event)
  }
  selectEquipmentType(event: any) {
    console.log("selected equipment type", event)
  }

  //metrics ionChange event
  selectEquipMetrics(event) { }

  selectFuelType(event) { this.getPolMetrics(event) }

  selectSteelType(event) { this.selectedSteelMetrics = "Ton" }

  selectSteelMetrics(event) { }

  selectmixedmaterialType(event) { this.selectedMDMetrics = "Ton" }

  selectMDMetrics(event) { }

  //negative values not allowed for qunatity event
  checkValue(event) {
    if (event.target.value < 0) {
      event.target.value = '';
    }
  }

  //negative values not allowed for qunatity event
  checkValue1(event) {
    if (event.target.value < 0) {
      event.target.value = '';
    }
  }

  checkIntialRead(event) { }

  checkFinalRead(event) { }

  checkValue2(event) {
    if (event.target.value < 0) {
      event.target.value = '';
    }
  }

  checkValue3(event) {
    if (event.target.value < 0) {
      event.target.value = '';
    }
  }

  async uploadImages(sourceType) {
    let alert = this.alrtCtrl.create({
      message: '<b style="color: rgb(0 0 0) !important;">Choose Upload Option</b>',
      buttons: [
        {
          text: 'Choose file',
          handler: () => {
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              correctOrientation: true,
              saveToPhotoAlbum: false
            }
            this.camera.getPicture(options).then((imageData) => {
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              this.uploadMultipleImages.push(this.profileimg);
            });
          }
        },
        {
          text: 'Camera',
          handler: () => {
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              correctOrientation: true,
              mediaType: this.camera.MediaType.PICTURE,
              sourceType
            }
            this.camera.getPicture(options).then((imageData) => {
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              this.uploadMultipleImages.push(this.profileimg);
            });
          }

        }
      ]
    });
    await (await alert).present();
  }

  goback() {
    if (this.myForm.value.equipment.length == [] && this.myForm.value.steel.length == [] && this.myForm.value.MD.length == [] && this.myForm.value.work_done_quantity == "") {
      this.navCtrl.back();
    } else {
      this.presentAlertConfirm5();
    }
    console.log(this.myForm.value.equipment)
    console.log(this.myForm.value.steel)
    console.log(this.myForm.value.MD)
    console.log(this.myForm.value.work_done_quantity)

  }

  deleteEquipment(index) {
    this.presentAlertConfirmEquipment(index)

  }
  deleteSteel(index) {
    this.presentAlertConfirmSteel(index)
  }

  deleteMixedDesign(index) {
    this.presentAlertConfirmMixedDesign(index)

  }


  materialimagesClose(index: any) {
    this.presentAlertDeleteConfirm(index)
  }

  materialimagesClose2(index: any) {
    this.presentAlertDeleteConfirm2(index)
  }

  get equipment(): FormArray {
    return this.myForm.get('equipment') as FormArray;
  }

  get steel(): FormArray {
    return this.myForm.get('steel') as FormArray;
  }

  get MD(): FormArray {
    return this.myForm.get('MD') as FormArray;
  }

  saveEquipment(i) {
    this.presentAlertConfirm2();
  }
  saveSteel(index) {
    this.presentAlertConfirm3();
  }
  saveMixed(index) {
    this.presentAlertConfirm4();
  }

  async createFile(iamgeUrl) {
    console.log("passinggggggggggg url", iamgeUrl)
    let response = await fetch(iamgeUrl);
    let data = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      const base64data = reader.result;
      this.myForm.value.mulImages.push(base64data);
    }
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (!this.myForm.valid) {
      this.presentToast("Please provide all the required values")
      console.log(this.myForm.value);
      return false;
    } else {

      this.isDisable = true;
      console.log(this.myForm.value);
      // this.setImageUrls();
      var base64value: any;
      var ArrayBase64: any = [];
      if (this.values.status == 200) {
        if (this.values.arrayImage.length !== 0 || this.values.arrayImage.length != []) {
          await Promise.all(this.uploadMultipleImages2.map(async x => {
            var imageUrl = x;
            let response = await fetch(imageUrl);
            let bolbObject = await response.blob();

            console.log("uiiiiiiiiiiiiiiiiiiiiiiiiiii", bolbObject)
            var reader = new FileReader();
            reader.readAsDataURL(bolbObject);
            reader.onload = () => {
              base64value = reader.result;
              //  this.myForm.value.mulImages.push(base64value);
              this.ArrayBase64Values.push(base64value);
            }
          }))
        }
      }
      setTimeout(() => {
        if (this.ArrayBase64Values.length !== 0 || this.ArrayBase64Values.length != []) {
          this.ArrayBase64Values.forEach(element => {
            this.myForm.value.mulImages.push(element);
            this.isBase64 = false;
          });
        }

        this.data = this.myForm.value
        this.loading.presentLoading();
        this.api.workProgressStatus(this.data).subscribe(res => {
          this.loading.dismisLoading();
          this.isBase64 = true;
          console.log("work progress status", res);
          this.isDisable = false;
          this.response = res;
          if (this.response.status === 200) {
            this.loading.dismisLoading();
            this.presentToast(this.response.message)
            this.router.navigate(['dates-view']);
          } else if (this.response.status === 400) {
            this.loading.dismisLoading();
            this.presentToast(this.response.message)


          } else {
            this.loading.dismisLoading();
            this.presentToast(this.response.message)
          }
        }, err => {
          this.loading.dismisLoading();
          console.log(err);
          console.log(err.status);
          this.presentToast("Server not responded");
        })
      }, 1000);
    }

  }



  async presentAlertConfirmMixedDesign(index) {
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
            let control = <FormArray>this.myForm.controls.MD;
            control.removeAt(index);
            this.isControls3 = false;
          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlertConfirm() {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      //  header: 'Confirm!',
      message: 'Do you want to Save?',
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
            this.presentToast("Saved Successfully")
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm2() {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      //  header: 'Confirm!',
      message: 'Saved the changes successfully',
      buttons: [
        , {
          text: 'Okay',
          handler: () => {
            // this.presentToast("Please submit the changes")
            this.isControls = false;
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertConfirm3() {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      //  header: 'Confirm!',
      message: 'Saved the changes successfully!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            // this.presentToast("Please submit the changes")
            this.isControls2 = false;
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertConfirm4() {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      //  header: 'Confirm!',
      message: 'Saved the changes successfully!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            // this.presentToast("Please submit the changes")
            this.isControls3 = false;
          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlertConfirm5() {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      //  header: 'Confirm!',
      message: 'Do you want to Save Changes?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: cancelled');
            this.navCtrl.back();
          }
        }, {
          text: 'Okay',
          handler: () => {
            // this.presentToast("Please submit the changes")
            this.onSubmit();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirmSteel(index) {
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
            let control = <FormArray>this.myForm.controls.steel;
            control.removeAt(index);
            this.isControls2 = false;
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertConfirmEquipment(index) {
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
            let control = <FormArray>this.myForm.controls.equipment;
            control.removeAt(index);
            this.isControls = false;
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertDeleteConfirm(index) {
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
            console.log("selected material image", index)
            this.uploadMultipleImages.splice(index, 1);
            console.log(this.uploadMultipleImages);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertDeleteConfirm2(index) {
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
            console.log("selected material image", index)
            this.uploadMultipleImages2.splice(index, 1);
            console.log(this.uploadMultipleImages2);
          }
        }
      ]
    });

    await alert.present();
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


