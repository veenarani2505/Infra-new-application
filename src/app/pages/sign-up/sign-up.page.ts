import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { PasswordValidator } from 'src/app/validators/passwordValidator';
import { LoadingService } from 'src/app/services/loading.service';
import { consolidateAdaptiveIconResources } from 'cordova-res/dist/platform';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  showPass: boolean = false;
  registerForm: FormGroup;
  isSubmitted = false;
  userMobileNumber: any;
  data: any;
  userRoles: any;
  roles2: any;
  response: any;
  fullName: any;
  roleName: any;
  id: any;

  public customUserOptions: any = {
    header: "Select UserRole",
    cssClass: "alertdropdowncss",

  };

   constructor(private formBuilder: FormBuilder, 
    private toast: ToastController, 
    private router: Router, 
    private api: ApiService, 
    private loading: LoadingService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
     // roleId: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      userMobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      userPassword: ['', [Validators.required, PasswordValidator.cannotContainSpace]],
      updatedBy: [''],
      userRole: ['']
    })
   }
   // validators error control
  get errorControl() {
    return this.registerForm.controls;
  }

  // userRole Ionchange event
  selectRole(value) {
    this.id = value;
    console.log("role ---->: ", value);
    const updatedRole = this.roles2.filter((x)=>{
      console.log(x.AutoRoleId,"role idd")
      if(x.AutoRoleId === value){
       this.roleName = x.RoleName;
       console.log(this.roleName);
      }
    })
  }

   // submit data function
   onRegister() {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      this.presentToast("Please provide all the required values")
      console.log(this.registerForm.value);
      return false;

    } else {
      console.log(this.roleName);
      this.data = this.registerForm.value;
      if (this.data.updatedBy == "") {
        this.data.updatedBy = this.data.userMobileNumber;
      }
      console.log(this.data);
      // this.loading.presentLoading();
      this.api.registerUser(this.data).subscribe(res => {
        console.log(res);
        this.response = res;
        // this.loading.dismisLoading();
        if (this.response.status == 200) {
          // this.loading.dismisLoading();
          this.presentToast(this.response.message);
          this.router.navigate(['sign-in']);
        } else if(this.response.status == 500) {
          // this.loading.dismisLoading();
          this.presentToast(this.response.message);
          
        }else if(this.response.status == 400){
          // this.loading.dismisLoading();
          this.presentToast(this.response.message);
         
        }else{
          // this.loading.dismisLoading();
          this.presentToast(this.response.message);
        }
      }, error => {
        console.log(error);
        this.loading.dismisLoading();
        this.presentToast("Server not responded");
      })
    }
  }

  // letters input event
  letterOnly(event) {
    var charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)
      return true;
    else
      return false;
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