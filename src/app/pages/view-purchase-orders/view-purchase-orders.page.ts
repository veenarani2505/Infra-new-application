import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-purchase-orders',
  templateUrl: './view-purchase-orders.page.html',
  styleUrls: ['./view-purchase-orders.page.scss'],
})
export class ViewPurchaseOrdersPage implements OnInit {

  image: any;
  values: any;
  materialName: any;
  projectname: string;
  isImage: boolean = false;
  materialId: any;
  res_receipt: any;
  poId: any;
  itemsResponse: any;
  isDispaly: any = true;

  constructor(private navCtrl: NavController,
    private alrtCtrl: AlertController, private router: Router,
    private sanitizer: DomSanitizer, private api: ApiService, private toast: ToastController) {

    if (router.getCurrentNavigation().extras.state) {
      this.values = this.router.getCurrentNavigation().extras.state;
      console.log(this.values);
      console.log(this.values.po_image);
      this.materialName = this.values.MaterialSubCategory;
      this.image = this.values.po_image;
      this.materialId = this.values.AutoMaterialReceiptId;
      this.poId = this.values.purchase_order_id;
      console.log("poId", this.poId)
      if (this.image != "undefined" && this.image != "" && this.image != "null") {
        this.image = this.api.headerurl + this.values.po_image;
        this.isImage = true
        console.log(this.image)
        console.log("if block-----", this.isImage);
      }
      else if (this.image == "undefined" || this.image == null || this.image == "") {
        this.isImage = false
        console.log("else block .....", this.isImage);
      }
    }
  }

  ngOnInit() {
    this.getPoItems();
  }

  getPoItems(){
    this.api.getPoItems(this.poId).subscribe(res =>{
      console.log(res);
      var val: any = res;
      this.itemsResponse = val.data;
      console.log("this.itesmtresponse", this.itemsResponse)
      console.log(this.itemsResponse.length)
      if(this.itemsResponse.length === 0){
        this.isDispaly = false
      }
    })
  }

  goback() {
    this.navCtrl.back();
  }

  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();
  }

}
