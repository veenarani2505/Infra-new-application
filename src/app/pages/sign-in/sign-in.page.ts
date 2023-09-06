import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { EventsService } from 'src/app/services/events.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  showPass: boolean = false;
  loginForm: FormGroup;
  isSubmitted = false;
  data: any;
  response: any;
  userData: any;
  userId: any;
  roleId: any;
  fullname: any;
  matrixresults:any;
  email: any;
  mobile: any;
  userRole: any;
  userMatrix: any;
  companyId: any;
  companyName: any;

  constructor(private router: Router,
    private events: EventsService, 
    private formBuilder: FormBuilder, 
    private toast: ToastController, 
    private api: ApiService, 
    private loaderservice: LoadingService) { }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        userEmail: ['', [Validators.required]],
        Password: ['', [Validators.required]],
      })
    }

     // validator error controls
  get errorControl() {
    return this.loginForm.controls;
  }

    // submit data function
    loginButtonPressed() {
      this.isSubmitted = true;
      if (!this.loginForm.valid) {
        this.presentToast("Please provide all the required values")
        console.log(this.loginForm.value);
        return false;
  
      } else {
        this.data = this.loginForm.value;
        console.log(this.data);
        // this.loaderservice.presentLoading();
        this.api.loginUser(this.data).subscribe(res => {
          // this.loaderservice.dismisLoading();
          console.log(res);
          this.response = res;
          if (this.response.status == 200) {
            // this.loaderservice.dismisLoading();
            this.userData = this.response.user;
            this.companyName = this.userData.company_name;
            console.log("comapny namee",this.companyName)
            console.log(this.userData);
            this.userId = this.userData.name.AutoUserId;
            this.roleId = this.userData.name.RoleId;
            this.fullname = this.userData.name.FullName;
            this.email = this.userData.name.UserEmail;
            this.userRole = this.userData.name.RoleName;
            this.mobile = this.userData.name.UserMobileNumber;
            this.companyId = this.userData.name.company_id;
            console.log(this.userId);
            console.log(this.roleId);
            console.log(this.email);
            this.userMatrix= this.userData.matrixresults;
            console.log("token", this.userData.token)
            console.log("user",this.userMatrix)
            const jsonObj = JSON.stringify(this.userMatrix);
            this.events.publishUserData({
              userdata: this.userData
            });
  
            localStorage.setItem('companyName', this.companyName)
            localStorage.setItem('userId', this.userId);
            localStorage.setItem('roleId', this.roleId);
            localStorage.setItem('fullname', this.fullname);
            localStorage.setItem('matrixresults', jsonObj);
            localStorage.setItem('email', this.email);
            localStorage.setItem('mobile', this.mobile);
            localStorage.setItem('userRole', this.userRole);
            localStorage.setItem('companyId', this.companyId);
            console.log("userIddddd",localStorage.getItem('userId'));
            console.log("roleId",localStorage.getItem('roleId'));
            console.log("Comapny id",localStorage.getItem('companyId'));
            console.log("companyName",localStorage.getItem('companyName'));
            // console.log("mmmmmmmmmmmmmllllllllllllllllllooooooooooooooo",localStorage.getItem('matrixresults'));
            this.router.navigate(['previliges']);
            // else {
            //   this.router.navigate(['previliges']);
            // }
          } else if (this.response.status == 400) {
            this.loaderservice.dismisLoading();
            this.presentToast(this.response.message);
          }
          else if (this.response.status == 500) {
            this.loaderservice.dismisLoading();
            this.presentToast(this.response.message);
          } else {
            this.loaderservice.dismisLoading();
            this.presentToast(this.response.message);
          }
        }, err => {
          console.log(err);
          console.log(err.status);
          this.loaderservice.dismisLoading();
          this.presentToast("Server not responded");
        })
      }
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