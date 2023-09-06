
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  changePasswordform: FormGroup;
  isSubmitted = false;
  data: any;
  userId: any;
  response: any;

  constructor(private router: Router, private loading: LoadingService, private toast: ToastController, private navCtrl: NavController,
    private api: ApiService, private formBuilder: FormBuilder) {
    this.userId = localStorage.getItem('userId');
    console.log(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.changePasswordform = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      userId: [this.userId],
    },
      {
        validator: this.password.bind(this)
      });
  }

  // confirm password validation function
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('newPassword');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  //validator errors
  get errorControl() {
    return this.changePasswordform.controls;
  }

  //back navigation to previous page
  goback() {
    this.navCtrl.back();
  }

  // submit data function
  submit() {
    this.isSubmitted = true;
    if (!this.changePasswordform.valid) {
      if (this.changePasswordform.value.newPassword !== this.changePasswordform.value.confirmPassword) {
        this.presentToast("Password and confirm password must be match")
      } else {
        this.presentToast("Please provide all the required values")
      }
      return false;
    } else {
      console.log(this.changePasswordform.value)
      this.data = this.changePasswordform.value;
      delete this.data.confirmPassword;
      console.log(this.data);
      this.loading.presentLoading();
      this.api.changePassword(this.data).subscribe(res => {
        console.log(res)
        this.response = res
        this.loading.dismisLoading();
        if (this.response.status == 200) {
          this.presentToast(this.response.message);
          this.router.navigate(['sign-in']);
          this.loading.dismisLoading();
        } else if (this.response.status == 400) {
          this.loading.dismisLoading();
          this.presentToast(this.response.message); 
        }
        else if (this.response.status == 401) {
          this.loading.dismisLoading();
          this.presentToast(this.response.message);
        } else {
          this.loading.dismisLoading();
          this.presentToast(this.response.message); 
        }
      }, err => {
        console.log(err);
        this.loading.dismisLoading();
        this.presentToast("Server not responded");
      })
    }
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
