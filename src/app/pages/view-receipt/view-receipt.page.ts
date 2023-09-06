import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.page.html',
  styleUrls: ['./view-receipt.page.scss'],
})
export class ViewReceiptPage implements OnInit {
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
      console.log(this.values.InvoiceImg);
      this.materialName = this.values.MaterialSubCategory;
      this.image = this.values.InvoiceImg;
      this.materialId = this.values.AutoMaterialReceiptId;
      if (this.image != "undefined" && this.image != null) {
        this.image = this.api.headerurl + this.values.InvoiceImg;
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

  onAcceptPressed() {
    this.presentAlertConfirm("Do you want to Approve?");
  }

  onDeclinePressed() {
    this.presentAlertDecline("Do you want to Decline?");
  }

  async presentAlertConfirm(message: string) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      //  header: 'Confirm!',
      message: message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: cancelled');
          }
        }, {
          text: 'Yes',
          handler: () => {

            var dat = {

              "status": "Approved",
              "materialReceiptId": this.materialId
            }
            console.log(dat)
            this.api.postReceiptMaterialApproval(dat).subscribe(res => {
              console.log("material approval responseeee", res);
              this.res_receipt = res;
              if (this.res_receipt.status === 200) {
                this.presentToast("Material Approved successfully");
                // this.getReceiptMaterials();
                this.router.navigate(['approvals']);
              } else {
                this.presentToast("Please contact to admin");
              }
            })
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertDecline(message: string) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      //  header: 'Confirm!',
      message: message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: cancelled');
          }
        }, {
          text: 'Yes',
          handler: () => {

            var dat = {

              "status": "Declined",
              "materialReceiptId": this.materialId
            }
            console.log(dat)
            console.log(dat)
            this.api.postReceiptMaterialApproval(dat).subscribe(res => {
              console.log("material approval responseeee", res);
              this.res_receipt = res;
              if (this.res_receipt.status === 200) {
                this.presentToast("Material Declined successfully");
                //  this.getReceiptMaterials();
                this.router.navigate(['approve-material']);

              } else {
                this.presentToast("Please contact to admin");
              }
            })
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();
  }
}
