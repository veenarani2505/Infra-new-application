import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.page.html',
  styleUrls: ['./view-issue.page.scss'],
})
export class ViewIssuePage implements OnInit {
  values: any;
  image: any;
  materialName: any;
  projectname: string;
  isImage: boolean = false;
  res_issue: any;
  materialId: any;

  constructor(private navCtrl: NavController, private router: Router, private route: ActivatedRoute,
    private sanitizer: DomSanitizer, private modalCtrl: ModalController,
    private toast: ToastController, private alrtCtrl: AlertController, private api: ApiService) {
    this.projectname = localStorage.getItem('projectname');
    console.log(this.projectname);
    if (router.getCurrentNavigation().extras.state) {
      this.values = this.router.getCurrentNavigation().extras.state;
      console.log(this.values);
      console.log(this.values.InvoiceImg);
      this.materialName = this.values.MaterialSubCategory;
      this.image = this.values.InvoiceImg;
      this.materialId = this.values.AutoMaterialIssueId;
      if (this.image != "undefined" && this.image != null) {
        this.image = this.api.headerurl + this.values.InvoiceImg;
        this.isImage = true
        console.log("if block-----", this.isImage);
      } else if (this.image == "undefined" || this.image == null || this.image == "") {
        this.isImage = false
        console.log("elae block .....", this.isImage);
      }
    }
  }

  ngOnInit() {
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
              "issueReceiptId": this.materialId
            }
            console.log(dat)
            this.api.postIssueMaterialApproval(dat).subscribe(res => {
              console.log("material approval responseeee", res);
              this.res_issue = res;
              if (this.res_issue.status === 200) {
                this.presentToast("Material Approved successfully");
                // this.getIssueMaterials();
                this.router.navigate(['approvalss']);
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
              "issueReceiptId": this.materialId
            }
            console.log(dat)
            this.api.postIssueMaterialApproval(dat).subscribe(res => {
              console.log("material Issue Decline responseeee", res);
              this.res_issue = res;
              if (this.res_issue.status === 200) {
                this.presentToast("Material Decline successfully");
                // this.getIssueMaterials();
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

  //BACK NAVIGATION TO PREVIOUS PAGE
  goback() {
    this.navCtrl.back();
  }

  //open image model 
  async openModal(imageUrl) {
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent,
      componentProps: { image: imageUrl, name: this.materialName }
    });
    await modal.present();
  }

  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();
  }
}
