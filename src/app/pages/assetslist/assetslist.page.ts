import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-assetslist',
  templateUrl: './assetslist.page.html',
  styleUrls: ['./assetslist.page.scss'],
})
export class AssetslistPage implements OnInit {
  projectname: any;
  projectId: any;
  response: any;

  constructor(private router: Router, private api: ApiService, private navCtrl: NavController) { 
    this.projectname = localStorage.getItem('projectname');
    this.projectId = localStorage.getItem('projectId');
  }

  ngOnInit() {
    this.gtAssetsList();
  }

  ionViewWillEnter() {
    this.gtAssetsList();
  }

  onViewDetails(data){
    this.navCtrl.navigateForward('/view-asset', { state: data });
  }
  
  goback(){
    // this.navCtrl.back();
    this.router.navigate(['previliges']); 
   }
   gtAssetsList(){
    this.api.getAssetsList(this.projectId).subscribe(res =>{
    console.log("res", res)
    var resp: any = res;
    this.response = resp.data
    })
  }
  
  addAsset(){
    this.router.navigate(['assets']);
  }

}
