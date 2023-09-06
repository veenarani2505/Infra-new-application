import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: any;

  loading2: any;

  constructor(private loadingContoller: LoadingController) { }

  async presentLoading() {
    this.loading = await this.loadingContoller.create({
      message: 'Please wait...',
      duration:20000
  });
 
await this.loading.present();

  }

  async dismisLoading(){
  
    await this.loadingContoller.dismiss();
  }



  async showoading() {
    this.loading2 = await this.loadingContoller.create({
      message: 'Please wait...',
  });
 
await this.loading2.present();

  }

  async cancelLoading(){
  
    await this.loadingContoller.dismiss();
  }
}
