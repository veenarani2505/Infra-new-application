
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-material-transactions',
  templateUrl: './material-transactions.page.html',
  styleUrls: ['./material-transactions.page.scss'],
})
export class MaterialTransactionsPage implements OnInit {

  receipts: any[] = [];
  issues: any[] = [];
  title: any = "Material Receipts"
  material: any;
  projectname: any;
  response: any;
  response1: any;
  issueMaterial: any;
  issueMaterial1: any;
  commingfrom: any = "receipts";
  projectId: any;
  noData: Boolean;
  roleId: any;
  isResponse: boolean = false;
  fromDate: any;
  isData: boolean = false;

  constructor(private navCtrl: NavController, private loader: LoadingService,
    private api: ApiService, private activatedRoute: ActivatedRoute,
     private router: Router) {
    
    console.log("constructure ------>>>>>>>")
    this.projectname = localStorage.getItem('projectname');
    console.log(this.projectname);
    this.roleId = localStorage.getItem('roleId');
    console.log(this.roleId);
    this.activatedRoute.queryParams.subscribe((res) => {
      console.log(res);
      this.material = res.value;
      console.log(this.material);
      if (this.material == undefined) {
        this.material = "receipts";
      }
    });
  }

  ngOnInit() {
    console.log("ng on it")
   // debugger;
   this.getMaterials();
   this.getIssueMaterials();
  }

  ionViewWillEnter() {
      this.getMaterials();
      this.getIssueMaterials();
  }
  
  ionViewWillLeave() {
      console.log('ion will leave');
  }
  
  ionViewDidLeave() {
    console.log('ion did leave');
  }
  ngOnDestroy() {
    console.log('seesion destroyed');
  }

  // segments change event
  segmentChanged(event) {
    console.log(event.detail.value);
    if (event.detail.value == "receipts") {
      this.title = "Material Receipt"
      this.getMaterials();
    } else {
      this.title = "Material Issue"
      this.getIssueMaterials();
    }
  }

  // get api call for receipts list
  getMaterials() {
    this.projectId = localStorage.getItem('projectId');
    //  this.loader.presentLoading();
   this.isData = true;
    this.api.getMaterial(this.projectname).subscribe(res => {
     //  this.loader.dismisLoading();
     this.isData = false;
      this.response = res;
      this.isResponse = true;
      this.response1 = this.response.data
      console.log(this.response1);
    })
  }

    // get api call for issue list
  getIssueMaterials() {
      //  this.loader.presentLoading();
      this.api.getIssueMaterial(this.projectname).subscribe(res => {
        //  this.loader.dismisLoading();
        this.issueMaterial = res;
        this.issueMaterial1 = this.issueMaterial.data
        this.issueMaterial1 = this.issueMaterial1.filter(item => item.Quantity !== 0);
        console.log(this.issueMaterial1);
      })
  }
  
    // back navigation to previous page
goback() {
  console.log(this.roleId, "role idddddd")
  if (this.roleId == 1) {
    this.router.navigate(['previliges']);
  } else {
    this.router.navigate(['previliges']);
  }
}

  // receipts page view icon function
onViewClick1(data) {
  console.log("on view button clicked")
  console.log(data);
  this.navCtrl.navigateForward('/receipt-details', { state: data });
}

  // issues page view icon function
onViewClick2(data2) {
  console.log("on view button clicked")
  console.log(data2);
  this.navCtrl.navigateForward('/issue-details', { state: data2 });
}
homeButtonClikced() {
  this.router.navigate(['previliges']);
}
onreceiptsPage() {
  this.router.navigate(['material-receipt']);
}
onIssueMaterial(){
  this.router.navigate(['material-issues']);
}
onMDIssueMaterial(){
  this.router.navigate(['mixed-material-issue']);
}

}