import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {
  f_date: any;
  to_date: any;
  resp: any;
  response: any;
  materialCategery: any;
  selectedAll: any = [];
  dateResponse: any;
  curDate: any;
  projectname: any;
  options = ["cheese", "pepperoni", "basil"];
  basket = [];

  listener;
  selectAllCheckBox: any;
  checkBoxes: HTMLCollection;
  fromDate: any;
  checked : boolean = true;
  

  customAlertOptions: any = {
    header: 'Select Material',
    message: '<ion-checkbox  id="selectAllCheckBox" ></ion-checkbox>' + '   '+ 'All Material'
  };


  
  customAlertstatusOptions: any = {
    title: "Select Dates and Material",
    cssClass: "alertdropdowncss",
  };
  companyName: string;

  constructor(private modalCtrl: ModalController, private navCtrl: NavController, private toast: ToastController,
     private api: ApiService, private datepipe: DatePipe,  @Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2, private dataService: DataService, private router: Router) { 


    this.curDate = new Date().toISOString();

    this.projectname = localStorage.getItem('projectname');
    this.companyName = localStorage.getItem('companyName');
    // this.curDate = new Date();
    // this.curDate = this.datepipe.transform(this.curDate, 'DD-MMM-YYYY');

    // console.log(this.curDate);
    const date = new Date();
    this.fromDate =  new Date(date.getFullYear(), date.getMonth() - 1, 1);
    console.log("fromDate", this.fromDate);
    this.f_date = this.datepipe.transform(this.fromDate, 'dd-MMM-YYYY')
    console.log("fddddddddd",this.f_date);
    this.to_date =this.datepipe.transform(date, 'dd-MMM-YYYY');

  

  }


  

  ngOnInit() {
    this.getSubDropdownFilter();
    
  }
  selectAll(){
    for (var each in this.response){
      this.selectedAll = [];
  }
  }

  comparematerials(o1: any, o2: any): boolean {
    console.log(o1, o2)
    return o1.AutoMaterialId === o2.AutoMaterialId;//Compare by id
  }



  getSubDropdownFilter(){
    this.api.getSubMaterialFilter().subscribe(res =>{
      console.log("subMaterial Dropdowns response", res);
      this.resp = res;
      this.response = this.resp.data;

      console.log("ressss", this.response)

      const update = this.response.filter(x =>{
        this.selectedAll.push(x.AutoMaterialId)
        console.log("default all ", this.selectedAll)
      })
    })
  }

  selectCategery(event){
    console.log("selected events ",event);
    this.selectedAll = event

    console.log(this.selectedAll)
   // this.materialCategery = event;

    if(event == "Select All"){
      this.response.filter((data)=>{
        this.selectedAll.push(data.AutoMaterialId);
        console.log(this.selectedAll); 
     });
    }else{
      this.selectedAll = event
    }
  }

  openSelector(selector) {
    selector.open().then((alert)=>{
      this.selectAllCheckBox = this.document.getElementById("selectAllCheckBox");
      this.selectAllCheckBox.checked = true;
      
      this.checkBoxes = this.document.getElementsByClassName("alert-checkbox");
      for (let checkbox of this.checkBoxes) {
        if (checkbox.getAttribute("aria-checked")==="false") {
          (checkbox as HTMLButtonElement).click();
        };
      };

      this.listener = this.renderer.listen(this.selectAllCheckBox, 'click', () => {
        console.log("this.selectAllCheckBox.checked", this.selectAllCheckBox.checked)
          if (this.selectAllCheckBox.checked) {
            console.log("came here")
            for (let checkbox of this.checkBoxes) {
              if (checkbox.getAttribute("aria-checked")==="false") {
                (checkbox as HTMLButtonElement).click();
              };
            };
          } else {
            console.log("came here111111111111111");
            for (let checkbox of this.checkBoxes) {
              if (checkbox.getAttribute("aria-checked")==="true") {
                (checkbox as HTMLButtonElement).click();
              };
            };
          }
      });
      alert.onWillDismiss().then(()=>{
        this.listener();
      });
    })
  }


  onSubmit(){

  var date1 =   this.datepipe.transform(this.f_date,"yyyy-MM-dd");
  var date2 =   this.datepipe.transform(this.to_date, "yyyy-MM-dd");

    var data = {
      "fromDate":date1,
      "toDate":date2,
      "ProjectName": this.projectname,
      "materialId": this.selectedAll,
      "company_name": this.companyName
    }

    console.log("receipts filter body",data)

    if(data.fromDate == null || data.toDate == null || data.materialId.length ===0){
 this.presentToast("Please select date and material ")
    }else{

    
    this.api.getDateFilterReceipts(data).subscribe(res =>{
      console.log("datefilter response", res);
      this.dateResponse = res
      if(this.dateResponse.status === 200){
        console.log(this.dateResponse);
        
  this.dataService.publishreceiptsData({
    userdata: data
  });


        this.modalCtrl.dismiss(this.dateResponse);
        // this.navCtrl.navigateForward('/receipt-transactions', { state: res });
      }
     
    })

  }
  }

    dismissModal(){
      this.modalCtrl.dismiss();
    }

     //toast message controller
  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();

  }

}
