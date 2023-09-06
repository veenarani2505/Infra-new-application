import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, ModalController, NavController, ToastController } from '@ionic/angular';
import { FiltermodlComponent } from 'src/app/components/filtermodl/filtermodl.component';
import { ApiService } from 'src/app/services/api.service';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-previliges',
  templateUrl: './previliges.page.html',
  styleUrls: ['./previliges.page.scss'],
})
export class PreviligesPage implements OnInit {

  @ViewChild("slider") slider: IonSlides;
  selectedResponse: any;
  userId: any;
  selectedproject: any;
  selectedSubProject: any;
  selectedProjectId: any;
  selectedSubProjectId: any;
  data: any;
  userRole: any;
  projectname: any;
  roleId: any;
  userMatrix: any;
  companyName: any;
  companyId: any;
  imgRes: any;
  options: any;

  slideOptions = {
    initialSlide: 0,
    autoplay: true,
    loop: true,
    speed: 100,
  };

  constructor(private navCtrl: NavController, private router: Router, private alrtCtrl: AlertController,
    private modalController: ModalController, private toast: ToastController,private mediaCapture: MediaCapture,
    private api: ApiService, private imagePicker: ImagePicker) {
    console.log("---------------- constructure");
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
    this.userRole = localStorage.getItem('userRole');
    this.projectname = localStorage.getItem('projectname');
    console.log("project name", this.projectname);
    console.log("companyName",localStorage.getItem('companyName'));
    this.companyName = localStorage.getItem('companyName');
    this.roleId = localStorage.getItem('roleId');
    this.companyId = localStorage.getItem('companyId');
    console.log("role iddd", this.roleId);
  }

  ngOnInit() {
    // this.projectname = localStorage.getItem('projectname');
    this.userId = localStorage.getItem('userId');
    this.roleId = localStorage.getItem('roleId');
    this.getDefaultProjects();
    console.log("project name", this.projectname)
    this.userMatrix = JSON.parse(localStorage.getItem('matrixresults'));
    console.log("usermatrixxxxxx", this.userMatrix)
    this.companyName = localStorage.getItem('companyName');
  }

  slideChanged(slides: IonSlides): void {
    slides.startAutoplay();
  }

  slidesDidLoad(slides) {
    slides.startAutoplay();
  }

  ionViewWillEnter() {
    this.userMatrix = JSON.parse(localStorage.getItem('matrixresults'));
    // this.projectname = localStorage.getItem('projectname');
    console.log("project name", this.projectname)
    console.log("---------------- constructure");
    this.roleId = localStorage.getItem('roleId');
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
    this.userRole = localStorage.getItem('userRole');
    this.projectname = localStorage.getItem('projectname');
    console.log("ionViewWillEnter")
    this.selectedproject = "";
    this.selectedSubProject = "";
    this.userId = localStorage.getItem('userId');
    this.companyName = localStorage.getItem('companyName');
    this.companyId = localStorage.getItem('companyId');
     this.getDefaultProjects();
  } 

  isAuthorizedPage(pageName) {
    console.log("pagenameeeeeeeeeeeeeeeeeeeeeeeeeeee",pageName)
    let pageNamesList = this.userMatrix.map(x => x.screen_name);
    if (pageNamesList.indexOf(pageName) > -1) {
      console.log("nameeeeeeeeeeeeee",pageName)
      return true;
    }
    else {
      this.alrtCtrl.create({
       header: 'Alert',
        // subHeader: 'You are not authorized to visit that page!',
        message: "Privileges insufficent"+ '<br>'+  "Please contact Admin",
        buttons: ['OK']
      }).then(res => {
        res.present();
      });
    }
  }

  ionViewWillLeave() {
    this.slider.stopAutoplay();
  }

  ionViewDidEnter() {
    this.slider.startAutoplay();
  }

  onMaterialReports() {
    if (!this.isAuthorizedPage("Material Reports") ) {
      return;
    }
    this.router.navigate(['material-reports']); 
  }

  onMaterialTransactions() {
    if (!this.isAuthorizedPage("Material Issue") || !this.isAuthorizedPage("Material Receipt")) {
    
      return;
    }
    this.router.navigate(['material-transactions']);
  }

  onMaterialApproval() {
    if (!this.isAuthorizedPage("Material Approval") || !this.isAuthorizedPage("User Approval")) {
      return;
    }
    this.router.navigate(['approvals']);
  }

  onDataCollection() {
    if (!this.isAuthorizedPage("Material Image")) {
      return;
    }
    this.router.navigate(['datacollection']);
  }
  onPurchaseOrders(){
    if (!this.isAuthorizedPage("Purchase Orders")) {
      return;
    }
    this.router.navigate(['purchase-orders-list']);
  }
  onWorkProgress() {
    if (!this.isAuthorizedPage("Workdone")) {
      return;
    }
    this.router.navigate(['project-progress-list']);
  }
  onAssetsClicked(){
    if (!this.isAuthorizedPage("Assets")) {
      return;
    }
    this.router.navigate(['assetslist']);
  }

  onAddprojectsClicked(){
    this.router.navigate(['addprojects']);
  }

  onAddsubprojectsClicked(){
    this.router.navigate(['addsubprojects']);
  }

  onAddClicked(){
    if (!this.isAuthorizedPage("Add List")) {
      return;
    }
    this.router.navigate(['addstocks']);
  }

   // get default projects api call
   getDefaultProjects() {
    console.log(this.userId);
    var data = {
      "userId": this.userId
    }
    this.api.getdeaultProjects(data).subscribe(res => {
      console.log(res);
      this.selectedResponse = res;
      this.data = this.selectedResponse.user;
      console.log(this.data);
      this.selectedproject = this.data.details.ProjectName;
      this.selectedSubProject = this.data.details.SubProjectName;
      this.selectedProjectId = this.data.details.AutoProjectId;
      this.selectedSubProjectId = this.data.details.AutoSubProjectId;
      console.log(this.selectedproject);
      console.log(this.selectedSubProject);
      localStorage.setItem('projectname', this.selectedproject);
      localStorage.setItem('subproject', this.selectedSubProject);
      localStorage.setItem('projectId', this.selectedProjectId);
      localStorage.setItem('subProjectId', this.selectedSubProjectId);
      this.projectname = localStorage.getItem('projectname');
    })
  }

   // back navigation to previous page
   goback() {
    this.navCtrl.pop();
  }

  // toast message controller
  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm(message: string) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      //  header: 'Confirm!',
      message: message,
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
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async onFilterButton() {
    const modal = await this.modalController.create({
      component: FiltermodlComponent,
      cssClass: 'filter-modal',
      backdropDismiss: false
    });
    await modal.present();
  }
}