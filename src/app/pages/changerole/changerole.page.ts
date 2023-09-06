import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-changerole',
  templateUrl: './changerole.page.html',
  styleUrls: ['./changerole.page.scss'],
})
export class ChangerolePage implements OnInit {
  roleId: any;
  userRole: any;
  userId: any;
  roles_response: any;
  compareWith : any ;
  userRole2: any;
  selectedRoleId: any;
  matrixResults: any;
  gender: any;
  compId: any;
 
  constructor(private api: ApiService, private navCtrl: NavController, private toast: ToastController, private router: Router) { 
    this.userRole = localStorage.getItem('userRole');
    this.roleId = localStorage.getItem('roleId');
    this.userId = localStorage.getItem('userId');
    this.compId = localStorage.getItem('companyId');
  }

  ngOnInit() {

    this.userId = localStorage.getItem('userId');
    this.roleId = localStorage.getItem('roleId');
    this.userRole = localStorage.getItem('userRole');
    this.compId = localStorage.getItem('companyId');
    this.getAssignedUserRoles(this.compId);

    setTimeout(() => {
    this.compareWith = this.compareWithFn;
  }, 400);
  }
  
  ionViewWillEnter() {
    console.log("ionViewWillEnter")
    this.roleId = localStorage.getItem('roleId');
    this.userRole = localStorage.getItem('userRole');
    this.userId = localStorage.getItem('userId'); 
    this.compId = localStorage.getItem('companyId');

  }

  GenderValue(gender){
    console.log("gender", gender)
  }


  compareWithFn(o1, o2) {
    return o1 === o2;
  };
 // compareWith = this.compareWithFn
  
  getAssignedUserRoles(comp_id: any){
    this.api.getAssignedUserRole(this.userId, comp_id).subscribe(res =>{
      console.log("ressssssssssssssssssssssssssssssssssss", res);
      var response: any;
      response = res;
      this.roles_response = response.data
      console.log("roles response",this.roles_response)
    })
  }

  UpdateRole(event){
    this.selectedRoleId = event
    console.log("selected Role Id", event)
    const update = this.roles_response.filter(x => {
      if (event == x.role_id) {
        this.userRole2 = x.RoleName
        console.log("updated user role name", this.userRole2)
      }
    })
    localStorage.setItem('roleId', this.selectedRoleId);
    localStorage.setItem('userRole', this.userRole2);
  }

  submit(){
    var data = {
      "roleId": this.selectedRoleId,
      "userId":this.userId
    }
    this.api.UpdateRoleId(data).subscribe(res =>{
      console.log(res);
      var d: any = res;
      this.matrixResults = d.matrixresults;
      const jsonObj = JSON.stringify(this.matrixResults);
      localStorage.setItem('matrixresults', jsonObj);
      if (d.status == 200) {
        if (this.roleId == 1) {
          this.router.navigate(['previliges']);
        } 
        else {
          this.router.navigate(['previliges']);
        }
      }
    })
  }

  //back navigation to previous page
  goback() {
    this.navCtrl.back();
  }

    // toast message function
  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
       duration: 2000
    });
    toast.present();
  }
}