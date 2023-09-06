import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.page.html',
  styleUrls: ['./approvals.page.scss'],
})
export class ApprovalsPage implements OnInit {

  material: string = "receipts";
  projectId: any;
  projectname: any;
  response: any;
  response1: any;
  issueMaterial: any;
  issueMaterial1: any;
  materialData: any;
  materialIssueData: any;
  materialId: any;
  mat_id: any;
  res_receipt: any;
  res_issue: any;
  dec_data_receipt: any;
  dec_data_issue: any;
  userResponse: any;
  userRes: any;
  projects: any;
  projectsData: any;
  subProjects: any;
  userDeclineData: any;
  userDeclineRes: any;
  isData: boolean = false;

  constructor(private router: Router, private navCtrl: NavController,
    private alrtCtrl: AlertController, private loader: LoadingService, private toast: ToastController, private api: ApiService) {
    console.log("constructure ------>>>>>>>")
    this.projectname = localStorage.getItem('projectname');
    console.log(this.projectname);
    // this.getMaterials();
    // this.getReceiptMaterials();
  }

  // ionViewWillEnter call before the page starts
  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getReceiptMaterials();
    this.getIssueMaterials();
    this.getUsers();
  }

  ngOnInit() {
    this.getReceiptMaterials();
    this.getIssueMaterials();
    this.getUsers();
  }

// get users api call
  getUsers() {
    this.api.getUsersApproval().subscribe(res => {
      console.log(res);
      this.userResponse = res;
      this.userRes = this.userResponse.user;
      console.log(this.userRes);
    })
  }

  // get receipts api call
  getReceiptMaterials() {
    this.projectId = localStorage.getItem('projectId');
    this.isData = true;
    this.api.getReceptMaterialApprovals(this.projectname).subscribe(res => {
      this.isData = false;
      this.response = res;
      this.response1 = this.response.data
      console.log(this.response1);
    })
  }

  // get issues api call
  getIssueMaterials() {
    this.api.getIssueMaterialApprovals(this.projectname).subscribe(res => {
      this.issueMaterial = res;
      this.issueMaterial1 = this.issueMaterial.data
      console.log(this.issueMaterial1);
      this.issueMaterial1 = this.issueMaterial1.filter(item => item.Quantity !== 0);
      console.log(this.issueMaterial1);
    })
  }

  // segments change event
  segmentChanged(event) {
    console.log(event.detail.value);
  }

  // receipt view details click event
  onViewDetails(data) {
    this.navCtrl.navigateForward('/view-receipt', { state: data });
  }

  // issue view details click event
  onViewDetails2(data) {
    this.navCtrl.navigateForward('/view-issue', { state: data });
  }

  // navigation to back screen click event
  goback() {
    this.router.navigate(['previliges']);
  }

  onAcceptPressed(data) {
    this.presentAlertConfirm("Do you want to Approve?");
    console.log(data);
    this.materialData = data;
  }

  onDeclinePressed(data) {
    this.dec_data_receipt = data
    this.presentAlertDeclineConfirm("Do you want to decline?");
  }

  onAcceptIssuePressed(data) {
    this.materialIssueData = data;
    this.presentAlertConfirmIssue("Do you want to approve?");
  }

  onDeclineIssuePressed(data) {
    this.dec_data_issue = data;
    console.log("issueeee decline", data);
    this.presentAlertDeclineIssue("Do you want to decline?");
  }

  async presentAlertConfirm(message: string) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
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

            this.materialId = this.materialData.AutoMaterialReceiptId;
            console.log("autoreceipt Id", this.materialId);
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
                this.getReceiptMaterials();
              } else {
                this.presentToast("Please contact to admin");
              }
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertConfirmIssue(message: string) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
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
            this.mat_id = this.materialIssueData.AutoMaterialIssueId;
            console.log("autoreceipt Id", this.mat_id);
            var dat = {
              "status": "Approved",
              "issueReceiptId": this.mat_id
            }
            console.log(dat)
            this.api.postIssueMaterialApproval(dat).subscribe(res => {
              console.log("material approval responseeee", res);
              this.res_issue = res;
              if (this.res_issue.status === 200) {
                this.presentToast("Material Approved successfully");
                this.getIssueMaterials();
              } else {
                this.presentToast("Please contact to admin");
              }
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertDeclineConfirm(message: string) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
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
            this.materialId = this.dec_data_receipt.AutoMaterialReceiptId;
            console.log("autoreceipt Id", this.materialId);
            var dat = {
              "status": "Declined",
              "materialReceiptId": this.materialId
            }
            console.log(dat)
            this.api.postReceiptMaterialApproval(dat).subscribe(res => {
              console.log("material approval responseeee", res);
              this.res_receipt = res;
              if (this.res_receipt.status === 200) {
                this.presentToast("Material Declined successfully");
                this.getReceiptMaterials();
              } else {
                this.presentToast("Please contact to admin");
              }
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertDeclineIssue(message: string) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
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
            console.log("dec------", this.dec_data_issue);
            this.mat_id = this.dec_data_issue.AutoMaterialIssueId;
            console.log("autoreceipt Id", this.mat_id);
            var dat = {
              "status": "Declined",
              "issueReceiptId": this.mat_id
            }
            console.log(dat)
            this.api.postIssueMaterialApproval(dat).subscribe(res => {
              console.log("material Issue Decline responseeee", res);
              this.res_issue = res;
              if (this.res_issue.status === 200) {
                this.presentToast("Material Decline successfully");
                this.getIssueMaterials();
              } else {
                this.presentToast("Please contact to admin");
              }
            })
          }
        }
      ]
    });
    await alert.present();
  }

  onAcceptPressedUser(data) {
    console.log(data);
    this.navCtrl.navigateForward('/projects', { state: data });
    // this.router.navigate(['projects']);
  }
  onDeclinePressedUser(data) {
    this.userDeclineData = data;
    this.presentAlertConfirmUser("Do you want to decline?")
  }

  async presentAlertConfirmUser(message: string) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'alertCustomCss',
      header: 'Confirmation',
      message: message,
      buttons: [
        {
          text: 'No',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: cancelled');
          }
        }, {
          text: 'Yes',
          handler: () => {
            var userId = this.userDeclineData.AutoUserId;
            console.log('Confirm Okay');
            var dat = {
              "status": "Declined",
              "userId": userId
            }
            this.api.userDecline(dat).subscribe(res => {
              console.log(res);
              this.userDeclineRes = res;
              if (this.userDeclineRes.status === 200) {
                this.presentToast("User Declined Succesfully");
                this.getUsers();
              }
            })
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

