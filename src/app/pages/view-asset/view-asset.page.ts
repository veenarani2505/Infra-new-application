import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.page.html',
  styleUrls: ['./view-asset.page.scss'],
})
export class ViewAssetPage implements OnInit {

  image: any;
  values: any;
  materialName: any;
  projectname: string;
  isImage: boolean = false;
  materialId: any;
  res_receipt: any;

  constructor(private navCtrl: NavController,
    private alrtCtrl: AlertController, private router: Router,
    private sanitizer: DomSanitizer, private api: ApiService, private toast: ToastController) {

    if (router.getCurrentNavigation().extras.state) {
      this.values = this.router.getCurrentNavigation().extras.state;
      console.log(this.values);
      console.log(this.values.invoice_image);
      this.materialName = this.values.MaterialSubCategory;
      this.image = this.values.invoice_image;
      this.materialId = this.values.AutoMaterialReceiptId;
      if (this.image != "undefined" && this.image != null) {
        this.image = this.api.headerurl + this.values.invoice_image;
        this.isImage = true
        console.log(this.image)
        console.log("if block-----", this.isImage);
      } else if (this.image == "undefined" || this.image == null || this.image == "") {
        this.isImage = false
        console.log("else block .....", this.isImage);
      }
    }
  }

  ngOnInit() {
  }

  goback() {
    this.navCtrl.back();
  }
  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();
  }
}