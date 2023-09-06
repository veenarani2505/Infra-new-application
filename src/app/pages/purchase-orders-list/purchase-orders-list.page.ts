import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.page.html',
  styleUrls: ['./purchase-orders-list.page.scss'],
})
export class PurchaseOrdersListPage implements OnInit {
  projectname: string;
  response: any;

  constructor(private toast: ToastController, private router: Router, private navCtrl: NavController, private api: ApiService) {
    this.projectname = localStorage.getItem('projectname');
   }

  ngOnInit() {
    this.getpurchaseOrders();
  }

  ionViewWillEnter() {
    this.getpurchaseOrders();
  }

  purchaseOrderClick(){
    this.router.navigate(['add-purchase-orders']); 
  }

  getpurchaseOrders(){
    var resp: any;
    this.api.getPurchaseOrdersList(this.projectname).subscribe(res =>{
      console.log("purchase order list reponse", res)
      resp = res
      this.response = resp.data
    })
  }

  onViewClick(data){
    console.log("data", data)
    this.navCtrl.navigateForward('/view-purchase-orders', { state: data });
  }
  
  goback() {
   // this.navCtrl.back();
   this.router.navigate(['previliges']); 
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
