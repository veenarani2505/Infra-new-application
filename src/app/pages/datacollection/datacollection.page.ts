import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Base64 } from '@ionic-native/base64/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-datacollection',
  templateUrl: './datacollection.page.html',
  styleUrls: ['./datacollection.page.scss'],
})
export class DatacollectionPage implements OnInit {

  dataCollection: any = "equipment";
  collectionMaterialForm: FormGroup;
  collectionEquipmentForm: FormGroup;
  profileimg: any;
  withLoad_photos: any = [];
  withoutLoad_photos: any = [];
  invoiceImage: any;
  materialImages: any = [];
  mobile: any;
  isSubmitted = false;
  data: any;
  response: any;
  subCategery1: any;
  mainCategery: any;
  mainCategery1: any;
  subCategery: any;
  materialNames: any;
  materialNames1: any;
  metrics: any;
  metrics1: any;
  selectedCategery: any;
  selectedCategery2: any;
  selectedMetrics: any;
  EquipmentResponse: any;
  EquipmentResponse2: any;
  equipmentMetrics: any;
  equipmentMetrics2: any;
  data2: any;
  response2: any;
  projectname: any;
  frontView_withLoad_image: any;
  frontView_withoutLoad_image: any;
  backView_withLoad_image: any;
  backView_withoutLoad_image: any;
  sideView_withload_image: any;
  sideView_withoutLoad_image: any;
  fuelTank_withload_image: any;
  fuelTank_withoutLoad_image: any;
  imagesArray :any = [];
  imagesArray2: any = [];
  ArrayBase64Values: any;

  public customCategeryOptions: any = {
    header: "Select Category",
    cssClass: "alertdropdowncss",
  };
  public customsubCategeryOptions: any = {
    header: "Select Sub Category",
    cssClass: "alertdropdowncss",
  };
  public customequipmentOptions: any = {
    header: "Select Equipment Type",
    cssClass: "alertdropdowncss",
  };
  public customMetricsOptions: any = {
    header: "Select Metrics",
    cssClass: "alertdropdowncss",
  };

   constructor(private router: Router, private navCtrl: NavController, private formBuilder: FormBuilder,
    private camera: Camera, private alrtCtrl: AlertController, private mediaCapture: MediaCapture,
    private api: ApiService, private toast: ToastController, private base64: Base64, private loader: LoadingService, private sanitizer: DomSanitizer) {
    this.projectname = localStorage.getItem('projectname');
    this.mobile = localStorage.getItem('mobile');

    var url = "file:///storage/emulated/0/Pictures/1666157017434.jpg";

    this.base64.encodeFile(url).then((base64File: string) => {
      console.log(base64File);
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {

    this.collectionEquipmentForm = this.formBuilder.group({
      eqipment_type: ['', [Validators.required]],
      eqipment_name: ['', [Validators.required, Validators.maxLength(40)]],
      vehicle_number: ['', [Validators.required, Validators.maxLength(40)]],
      image_with_load_front_view: [''],
      image_with_load_back_view: [''],
      image_with_load_fueltank_view: [''],
      image_with_load_other_side_view: [''],
      image_with_out_load_front_view: [''],
      image_with_out_load_back_view: [''],
      image_with_out_load_fueltank_view: [''],
      image_with_out_load_other_side_view: [''],
      material_category: ['', [Validators.required]],
      materal_subcategory: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      material_metrics: ['', Validators.required],
      equipment_dist_cam: ['', [Validators.required]],
      Weigh_bridge_invoice_image: [''],
      notes: ['', Validators.maxLength(256)],
      UpdateBy: [this.mobile]
    })

    this.collectionMaterialForm = this.formBuilder.group({
      materialcategory: ['', [Validators.required]],
      materalsubcategory: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      metrics: ['', [Validators.required]],
      notes: ['', [Validators.maxLength(40)]],
      UpdatedBy: [this.mobile],
      images: [this.materialImages]
    })
    this.getmainCategery();
    this.getEquipmentType();
    this.getEquipmentMetrics();
  }

  segmentChanged(event) {
    console.log(event.detail.value);
    if (event.detail.value == "receipts") {
      // this.title = "Material Receipt"
      // this.getMaterials();
    } else {
      // this.title = "Material Issue"
      // this.getIssueMaterials();
    }
  }

  imagesWithLoadUploadClick() {
    let options: CaptureImageOptions = {
      limit: 4,
    } 

    this.imagesArray = [];
    this.mediaCapture.captureImage(options)
      .then((data: MediaFile[]) => {
        console.log('Your Multiple Photos Array:', data);
        var res = data
        for (var i = 0; i < res.length; i++) {
          this.base64.encodeFile(res[i].fullPath).then((base64File: string) => {
            console.log(base64File);
            const a=this.sanitizer.bypassSecurityTrustResourceUrl(base64File)
            this.imagesArray.push(a);
            console.log("hjgbhgbhbnb nbnbjnbhbbv", this.imagesArray)
          }, (err) => {
            console.log(err);
          });
        }
      },
        (err: CaptureError) => console.error(err)
      );
  }

  imagesWithOutLoadUploadClick(){
    let options: CaptureImageOptions = {
      limit: 4,
    } 

    this.imagesArray2 = [];
    this.mediaCapture.captureImage(options)
      .then((data: MediaFile[]) => {
        console.log('Your Multiple Photos Array:', data);
        var res = data
        for (var i = 0; i < res.length; i++) {
          this.base64.encodeFile(res[i].fullPath).then((base64File: string) => {
            console.log(base64File);
            const a=this.sanitizer.bypassSecurityTrustResourceUrl(base64File)
            this.imagesArray2.push(a);
            console.log("hjgbhgbhbnb nbnbjnbhbbv", this.imagesArray2)
          }, (err) => {
            console.log(err);
          });
        }
      },
        (err: CaptureError) => console.error(err)
      );
  }

  async createFile(iamgeUrl) {

    console.log("blobbbbbbb", iamgeUrl)
    // console.log("passinggggggggggg url", iamgeUrl)
    let response = await fetch(iamgeUrl);
    let data = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log(base64data)
    }
    // return data
  }

  imagesClose(index: any) {
    console.log("selected indexxxx", index)
    this.withLoad_photos.splice(index, 1);
    console.log(this.withLoad_photos);
  }

  imageswithoutClose(index: any) {
    console.log("selected withload image index", index)
    this.withoutLoad_photos.splice(index, 1);
    console.log(this.withoutLoad_photos);
  }

  materialimagesClose(index: any) {
    console.log("selected material image", index)
    this.materialImages.splice(index, 1);
    console.log(this.materialImages);
  }

    // validators error controls
  get errorControl() {
      return this.collectionMaterialForm.controls;
  }
    // validators error controls
  get errorControl2() {
      return this.collectionEquipmentForm.controls;
  }
    //negative values not allowed for qunatity event
  checkValue(event) {
      if (event.target.value < 1) {
        event.target.value = '';
      }
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
    })
  }

  selectEquipmentType(event) {
    console.log("selected equipment type", event)
  }

  selectCategery(value) {
    console.log("selected Material", value)
    this.selectedCategery = value;
    this.getSubmainCategery(value);
  }

  selectSubCategery(value) {
    console.log("selected Sub Material", value)
    this.selectedMetrics = value;
    this.getMetrics(value)
  }

  //metrics ionChange event
  selectMetrics(event) {
  }

  getEquipmentType() {
    this.api.getEquipmentType().subscribe(res => {
      console.log(res, "equipment Type Deatils Response");
      this.EquipmentResponse = res;
      this.EquipmentResponse2 = this.EquipmentResponse.data;
    })
  }


  getEquipmentMetrics() {
    this.api.getEquipmentMetrics().subscribe(res => {
      console.log("equipment metricsssss", res);
      this.equipmentMetrics = res;
      this.equipmentMetrics2 = this.equipmentMetrics.data
    })
  }



  onSubmitClick() {
    if (!this.collectionMaterialForm.valid) {
      this.presentToast("Please provide all the required values")
      console.log(this.collectionMaterialForm.value);
      return false;
    } else {
      // this.isDisabled = true;
      this.data = this.collectionMaterialForm.value;
      console.log(this.data);
      if (this.data.images == undefined || this.data.images == null || this.data.images == "") {
        this.data.images = this.materialImages;
      }
      console.log("lllllllllllllllllllllllllllllllll", this.materialImages)
      if (this.materialImages.length != 0) {
        this.loader.showoading();
        this.api.materialCollection(this.data).subscribe(res => {
          console.log(res);
          this.loader.cancelLoading();
          this.response = res
          if (this.response.status == 200) {
            this.presentToast(this.response.message);
            this.router.navigate(['previliges']);
          } else {
            this.presentToast(this.response.message);
          }
        }, err => {
          console.log(err);
          console.log(err.status);
          this.loader.cancelLoading();
          this.presentToast("Server not responded");
        })
      } else {
        this.presentToast("Please upload the images")
      }
    }
  }

  onSubmitEquipment() {
    if (!this.collectionEquipmentForm.value) {
      this.presentToast("Please provide all the required values")
      console.log(this.collectionEquipmentForm.value);
      return false;
    } else {
      // this.isDisabled = true;
      this.data2 = this.collectionEquipmentForm.value;
      console.log(this.data2);
      if (this.data2.image_with_load_front_view == undefined || this.data2.image_with_load_front_view.images == null) {
        this.data2.image_with_load_front_view = this.imagesArray[0];
      }
      if (this.data2.image_with_load_back_view == undefined || this.data2.image_with_load_back_view.images == null) {
        this.data2.image_with_load_back_view = this.imagesArray[1];
      }
      if (this.data2.image_with_load_fueltank_view == undefined || this.data2.image_with_load_fueltank_view.images == null) {
        this.data2.image_with_load_fueltank_view = this.imagesArray[2];
      }
      if (this.data2.image_with_load_other_side_view == undefined || this.data2.image_with_load_other_side_view.images == null) {
        this.data2.image_with_load_other_side_view = this.imagesArray[3];
      }
      if (this.data2.image_with_out_load_front_view == undefined || this.data2.image_with_out_load_front_view.images == null) {
        this.data2.image_with_out_load_front_view = this.imagesArray2[0];
      }
      if (this.data2.image_with_out_load_back_view == undefined || this.data2.image_with_out_load_back_view.images == null) {
        this.data2.image_with_out_load_back_view = this.imagesArray2[1];
      }
      if (this.data2.image_with_out_load_fueltank_view == undefined || this.data2.image_with_out_load_fueltank_view.images == null) {
        this.data2.image_with_out_load_fueltank_view = this.imagesArray2[2];
      }
      if (this.data2.image_with_out_load_other_side_view == undefined || this.data2.image_with_out_load_other_side_view.images == null) {
        this.data2.image_with_out_load_other_side_view = this.imagesArray2[3];
      }
      if (this.data2.Weigh_bridge_invoice_image == undefined || this.data2.Weigh_bridge_invoice_image.images == null) {
        this.data2.Weigh_bridge_invoice_image = this.invoiceImage;
      }

      if (this.data2.image_with_load_front_view == undefined || this.data2.image_with_load_back_view == undefined ||
        this.data2.image_with_load_fueltank_view == undefined || this.data2.image_with_load_other_side_view == undefined ||
        this.data2.image_with_out_load_front_view == undefined || this.data2.image_with_out_load_back_view == undefined ||
        this.data2.image_with_out_load_fueltank_view == undefined || this.data2.image_with_out_load_other_side_view == undefined ||
        this.data2.Weigh_bridge_invoice_image == undefined || this.data2.eqipment_type == "" || this.data2.eqipment_name == "" ||
        this.data2.vehicle_number == "" || this.data2.material_category == "" || this.data2.materal_subcategory == "" || this.data2.quantity == "" ||
        this.data2.equipment_dist_cam == "") {
        this.presentToast("Please provide all the required values");

      } else {
        this.loader.showoading();
        this.api.equipmentCollection(this.data2).subscribe(res => {
          console.log(res);
          this.loader.cancelLoading();
          this.response2 = res
          if (this.response2.status == 200) {
            this.presentToast(this.response2.message);
            this.router.navigate(['previliges']);
          } else {
            this.presentToast(this.response2.message);
          }
        }, err => {
          console.log(err);
          console.log(err.status);
          this.loader.cancelLoading();
          this.presentToast("Server not responded");
        })
      }
    }
  }

  async FrontView_wl_Image(sourceType) {
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
              saveToPhotoAlbum: false
            }
            this.camera.getPicture(options).then((imageData) => {
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              this.frontView_withLoad_image = this.profileimg;
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
              // let base64Image = 'data:image/jpeg;base64,' + imageData;
              //  this.profileimg = base64Image;
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              // this.withoutLoad_photos.push(this.profileimg);
              // console.log(this.withoutLoad_photos);
              this.frontView_withLoad_image = this.profileimg;
            });
          }

        }
      ]
    });
    await (await alert).present();
  }
  
  async FrontView_wol_Image(sourceType) {
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
              saveToPhotoAlbum: false
            }
            this.camera.getPicture(options).then((imageData) => {
              this.profileimg = 'data:image/jpeg;base64,' + imageData;

              this.frontView_withoutLoad_image = this.profileimg;
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
              // let base64Image = 'data:image/jpeg;base64,' + imageData;
              //  this.profileimg = base64Image;
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              // this.withoutLoad_photos.push(this.profileimg);
              // console.log(this.withoutLoad_photos);
              this.frontView_withoutLoad_image = this.profileimg;
            });
          }

        }
      ]
    });
    await (await alert).present();
  }

  async backView_wl_image(sourceType) {
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
              saveToPhotoAlbum: false
            }
            this.camera.getPicture(options).then((imageData) => {
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              this.backView_withLoad_image = this.profileimg;
              // this.withLoad_photos.push(this.profileimg);
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
              // let base64Image = 'data:image/jpeg;base64,' + imageData;
              //  this.profileimg = base64Image;
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              // this.withLoad_photos.push(this.profileimg);
              this.backView_withLoad_image = this.profileimg;
            });
          }

        }
      ]
    });
    await (await alert).present();
  }

  async backView_wol_image(sourceType) {
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
              saveToPhotoAlbum: false
            }
            this.camera.getPicture(options).then((imageData) => {
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              this.backView_withoutLoad_image = this.profileimg;
              // this.withLoad_photos.push(this.profileimg);
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
              // let base64Image = 'data:image/jpeg;base64,' + imageData;
              //  this.profileimg = base64Image;
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              // this.withLoad_photos.push(this.profileimg);
              this.backView_withoutLoad_image = this.profileimg;
            });
          }

        }
      ]
    });
    await (await alert).present();
  }

  async side_wl_image(sourceType) {
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
              saveToPhotoAlbum: false
            }
            this.camera.getPicture(options).then((imageData) => {
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              this.sideView_withload_image = this.profileimg;
              // this.withLoad_photos.push(this.profileimg);
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
              // let base64Image = 'data:image/jpeg;base64,' + imageData;
              //  this.profileimg = base64Image;
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              // this.withLoad_photos.push(this.profileimg);
              this.sideView_withload_image = this.profileimg;
            });
          }

        }
      ]
    });
    await (await alert).present();
  }

  async side_wol_image(sourceType) {
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
              saveToPhotoAlbum: false
            }
            this.camera.getPicture(options).then((imageData) => {
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              this.sideView_withoutLoad_image = this.profileimg
              // this.withLoad_photos.push(this.profileimg);
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
              // let base64Image = 'data:image/jpeg;base64,' + imageData;
              //  this.profileimg = base64Image;
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              //  this.withLoad_photos.push(this.profileimg);
              this.sideView_withoutLoad_image = this.profileimg;
            });
          }

        }
      ]
    });
    await (await alert).present();
  }

  async fuelTank_wl_image(sourceType) {
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
              saveToPhotoAlbum: false
            }
            this.camera.getPicture(options).then((imageData) => {
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              // this.withLoad_photos.push(this.profileimg);
              this.fuelTank_withload_image = this.profileimg;
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
              // let base64Image = 'data:image/jpeg;base64,' + imageData;
              //  this.profileimg = base64Image;
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              this.fuelTank_withload_image = this.profileimg;
              // this.withLoad_photos.push(this.profileimg);
            });
          }
        }
      ]
    });
    await (await alert).present();
  }

  async fuelTank_wol_image(sourceType) {
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
              saveToPhotoAlbum: false
            }
            this.camera.getPicture(options).then((imageData) => {
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              // this.withLoad_photos.push(this.profileimg);
              this.fuelTank_withoutLoad_image = this.profileimg;
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
              // let base64Image = 'data:image/jpeg;base64,' + imageData;
              //  this.profileimg = base64Image;
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              this.fuelTank_withoutLoad_image = this.profileimg;

            });
          }
        }
      ]
    });
    await (await alert).present();
  }

  async InvoicetakePhoto() {
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
              saveToPhotoAlbum: false
            }
            this.camera.getPicture(options).then((imageData) => {
              this.invoiceImage = 'data:image/jpeg;base64,' + imageData;

              //  this.withoutLoad_photos2.push(this.profileimg);
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
              mediaType: this.camera.MediaType.PICTURE
            }
            this.camera.getPicture(options).then((imageData) => {
              // let base64Image = 'data:image/jpeg;base64,' + imageData;
              //  this.profileimg = base64Image;
              this.invoiceImage = 'data:image/jpeg;base64,' + imageData;
              // this.withoutLoad_photos2.push(this.profileimg);
            });
          }
        }
      ]
    });
    await (await alert).present();
  }

  async MaterialtakePhoto(sourceType) {
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

              this.materialImages.push(this.profileimg);
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
              // let base64Image = 'data:image/jpeg;base64,' + imageData;
              //  this.profileimg = base64Image;
              this.profileimg = 'data:image/jpeg;base64,' + imageData;
              this.materialImages.push(this.profileimg);
            });
          }
        }
      ]
    });
    await (await alert).present();
  }



  goback() {
    this.navCtrl.pop();
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