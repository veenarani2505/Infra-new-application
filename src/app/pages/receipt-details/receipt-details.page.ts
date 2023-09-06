import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.page.html',
  styleUrls: ['./receipt-details.page.scss'],
})
export class ReceiptDetailsPage implements OnInit {

  values: any; z
  image: any;
  materialName: any;
  projectname: string;
  isImage: boolean = false;
  commingFrom: any;

  constructor(private navCtrl: NavController, private router: Router,
    private route: ActivatedRoute, private sanitizer: DomSanitizer, private modalCtrl: ModalController, private api: ApiService) {
   this.projectname = localStorage.getItem('projectname');
   console.log(this.projectname);

   if (router.getCurrentNavigation().extras.state) {
     this.values = this.router.getCurrentNavigation().extras.state;
     console.log(this.values)
     console.log(this.values.InvoiceImg);
     this.materialName = this.values.InvoiceNo
     this.image = this.values.InvoiceImg;

     if (this.image != "undefined" && this.image != null && this.image != "") {
       this.image = this.api.headerurl + this.values.InvoiceImg;
       this.isImage = true
       console.log("if block-----", this.isImage);
     } else if (this.image == "undefined" || this.image == null || this.image == " ") {
       this.isImage = false
       console.log("elae block .....", this.isImage);
     }
   }
 }

  ngOnInit() { }

  // back navigation to previous page
  goback() {
    this.commingFrom = "receipts"
    this.router.navigate(['material-transactions'], {
    queryParams: {
    value: this.commingFrom
    },
    });
  }

    // open image modal controller
  async openModal(imageUrl) {
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent,
      componentProps: { image: imageUrl, name: this.materialName }
    });  
    await modal.present();
  }

}