import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { EventsService } from './services/events.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  roleId: any;
  fullname: any;
  email: any;
  mobile: any;
  userdata: any;
  userRole: any;
  userId: any;
  roles_response: any;
  compareWith : any ;
  userRole2: any;

  
 public customUserRolesOptions: any = {
  header: "Select User Role",
  cssClass: "alertdropdowncssWorkType",
};
  
  public pages: any[] = [
    { title: 'Company Settings', url: '/company-setting', icon: 'cog' },
    { title: 'Project Settings', url: '/settings', icon: 'settings' },
    { title: 'Role Settings', url: '/changerole', icon: 'person' },
    { title: 'Change Password', url: '/changepassword', icon: 'key' },
    // { title: 'Add Projects', url: '/addprojects', icon: 'key' },
    { title: 'Logout', url: '', icon: 'log-out', route: true },
  ];

  constructor(private alrtCtrl: AlertController, private router: Router,
    private platform: Platform,private api: ApiService, private location: Location, private events: EventsService, private toast: ToastController) {
    this.fullname = localStorage.getItem('fullname');
    this.email = localStorage.getItem('email');
    this.mobile = localStorage.getItem('mobile');
    this.userRole = localStorage.getItem('userRole');
    this.roleId = localStorage.getItem('roleId');
    this.userId = localStorage.getItem('userId');
    this.initializeApp();

  }

  ngOnInit() {
   // this.getAssignedUserRoles();
    this.userId = localStorage.getItem('userId');
    this.userRole = localStorage.getItem('userRole');
    this.compareWith = this.compareWithFn;
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter")
    this.roleId = localStorage.getItem('roleId');
    this.userRole = localStorage.getItem('userRole');
    this.userId = localStorage.getItem('userId');


  }

  compareprojects(o1: any, o2: any): boolean {
    console.log(o1, o2)
    return o1.role_id === o2.role_id;//Compare by id
  }

  compareWithFn(o1, o2) {
    return o1 === o2;
  };

  // getAssignedUserRoles(){
  //   this.api.getAssignedUserRole(this.userId).subscribe(res =>{
  //     console.log("ressssssssssssssssssssssssssssssssssss", res);
  //     var response: any;
  //     response = res;
  //     this.roles_response = response.data
  //     console.log("roles response",this.roles_response)
  //   })
  // }

  // UpdateRole(event){
  //   console.log("selected Role Id", event)
  //   var data = {
  //     "roleId": event,
  //     "userId":this.userId
  //   }
  //   this.api.UpdateRoleId(data).subscribe(res =>{
  //     console.log(res);
  //   })


  //   const update = this.roles_response.filter(x => {
  //     if (event == x.role_id) {
  //       this.userRole2 = x.RoleName
  //       console.log("updated user role name", this.userRole2)
  //     }
  //   })
  //   localStorage.setItem('roleId', event);
  //   localStorage.setItem('userRole', this.userRole2);
  // }

  initializeApp() {
    this.events.getObservable().subscribe((data) => {
      console.log('Data received', data);
      this.userdata = data.userdata;
      this.fullname = this.userdata.name.FullName;
      this.email = this.userdata.name.UserEmail;
      this.mobile = this.userdata.name.UserMobileNumber;
      this.userRole = this.userdata.name.RoleName;
      this.roleId = this.userdata.name.RoleId;
    });


  
    if (this.roleId != null || this.roleId != undefined) {
      console.log(this.roleId)
      this.router.navigateByUrl('previliges');
    }else {
      console.log(this.roleId);
      this.router.navigateByUrl('sign-in');
    }

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this.location.isCurrentPathEqualTo('/previliges')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else if(this.location.isCurrentPathEqualTo('/previliges')){
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      }else if(this.location.isCurrentPathEqualTo('/sign-in')){
        console.log('Show Exit Alert!');
       // this.showExitConfirm();
       navigator['app'].exitApp();
        processNextHandler();
      }
      else if (this.location.isCurrentPathEqualTo('/material-transactions')){
        this.router.navigate(['previliges']);
      }else if (this.location.isCurrentPathEqualTo('/material-receipt')){
       // this.router.navigate(['material-transactions']);

       var commingFrom = "receipts"
       this.router.navigate(['material-transactions'], {
         queryParams: {
           value: commingFrom
         },
       });
      }else if (this.location.isCurrentPathEqualTo('/mixed-material-issue')){
        //this.router.navigate(['material-transactions']);

        var commingFrom = "issues"
        this.router.navigate(['material-transactions'], {
          queryParams: {
            value: commingFrom
          },
        });
      }else if (this.location.isCurrentPathEqualTo('/material-issues')){
       // this.router.navigate(['material-transactions']);

       
       var commingFrom = "issues"
       this.router.navigate(['material-transactions'], {
         queryParams: {
           value: commingFrom
         },
       });
      }else if (this.location.isCurrentPathEqualTo('/receipt-details')){
      //  this.router.navigate(['material-transactions']);
      var commingFrom = "receipts"
      this.router.navigate(['material-transactions'], {
        queryParams: {
          value: commingFrom
        },
      });
      }else if (this.location.isCurrentPathEqualTo('/issue-details')){
       // this.router.navigate(['material-transactions']);
       var commingFrom = "issues"
       this.router.navigate(['material-transactions'], {
         queryParams: {
           value: commingFrom
         },
       });
      }
      else if (this.location.isCurrentPathEqualTo('/view-receipt')){
        this.router.navigate(['approvals']);
      }
      else if (this.location.isCurrentPathEqualTo('/view-issue')){
        this.router.navigate(['approvals']);
      }
      else if (this.location.isCurrentPathEqualTo('/material-reports')){
        this.router.navigate(['previliges']);
      }
      else if (this.location.isCurrentPathEqualTo('/datacollection')){
        this.router.navigate(['previliges']);
      }
      else if (this.location.isCurrentPathEqualTo('/approvals')){
        this.router.navigate(['previliges']);
      }
      else if (this.location.isCurrentPathEqualTo('/settings')){
        this.router.navigate(['previliges']);
      }
      else if (this.location.isCurrentPathEqualTo('/sign-up')){
        navigator['app'].exitApp();
        processNextHandler();
      }
      else if (this.location.isCurrentPathEqualTo('/changepassword')){
        this.router.navigate(['previliges']);
      }
      else if (this.location.isCurrentPathEqualTo('/dates-view')){
        this.router.navigate(['project-progress-list']);
      }
      else if (this.location.isCurrentPathEqualTo('/addwork')){
        this.router.navigate(['project-progress-list']);
      }
      else if (this.location.isCurrentPathEqualTo('/view-project-details')){
        this.router.navigate(['dates-view']);
      }
      else if (this.location.isCurrentPathEqualTo('/project-progress')){
      //  this.router.navigate(['dates-view']);

      this.presentAlertConfirm5();
      }
      else if (this.location.isCurrentPathEqualTo('/view-purchase-orders')){
        this.router.navigate(['purchase-orders-list']);
      }
      else if (this.location.isCurrentPathEqualTo('/purchase-orders-list')){
        this.router.navigate(['previliges']);
      }
      else if (this.location.isCurrentPathEqualTo('/view-asset')){
        this.router.navigate(['assetslist']);
      }
      else if (this.location.isCurrentPathEqualTo('/assetslist')){
        this.router.navigate(['previliges']);
      }

      else {
        // Navigate to back page
        console.log('Navigate to back page');
        this.router.navigate(['previliges']);
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alrtCtrl.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
          // navigator['app'].showExitConfirm();
          // this.showExitConfirm();
        }
      }).catch(e => {
        console.log(e);
      })
    });

  }

  
  logoutButton() {
    this.presentAlertConfirm();
  }


  async presentAlertConfirm() {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      //  header: 'Confirm!',
      message: 'Do you want to logout?',
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
            localStorage.setItem('isLogin', "false");
            console.log('Confirm Okay');
            localStorage.clear();
            localStorage.removeItem('roleId');
            localStorage.removeItem('projectname');
            localStorage.removeItem('subproject');
            localStorage.removeItem('userId');
            localStorage.removeItem('projectId');
            localStorage.removeItem('subProjectId');
            localStorage.removeItem('fullname');
            localStorage.removeItem('email');
            localStorage.removeItem('mobile');
            console.log(localStorage.getItem('roleId'));
            console.log(localStorage.getItem('projectId'));
            console.log(localStorage.getItem('subProjectId'));
            this.router.navigateByUrl('sign-in');

          }
        }
      ]
    });

    await alert.present();
  }

  showExitConfirm() {
    this.alrtCtrl.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
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
            this.router.navigate(['dates-view']);
          }
        }, {
          text: 'Okay',
          handler: () => {
           this.presentToast("Please submit the changes")
           
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
