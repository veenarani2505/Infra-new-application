import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-alltransactionsfilter-modal',
  templateUrl: './alltransactionsfilter-modal.page.html',
  styleUrls: ['./alltransactionsfilter-modal.page.scss'],
})
export class AlltransactionsfilterModalPage implements OnInit {
  f_date: any;
  to_date: any;
  resp: any;
  response: any;
  materialCategery: any;
  selectedAll: any = [];
  dateResponse: any;
  options = ["cheese", "pepperoni", "basil"];
  basket = [];
  curDate: any;
  projectname: any;

  fromDate: any;
  toDate: any;

  listener;
  selectAllCheckBox: any;
  checkBoxes: HTMLCollection;

  customAlertOptions: any = {
    header: 'Select Material Name',
    message: '<ion-checkbox id="selectAllCheckBox"></ion-checkbox>' +'   '+ 'All Material'
  };

  customAlertstatusOptions: any = {
    title: "Select Dates and Material",
    cssClass: "alertdropdowncss",
  };
  companyName: string;

  constructor(private modalCtrl: ModalController, private navCtrl: NavController,
     private api: ApiService, private datepipe: DatePipe,private dataService: DataService,
     private toast: ToastController,
       @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { 
    console.log(this.f_date);
    console.log(this.to_date);
    this.curDate = new Date().toISOString();
    
    this.projectname = localStorage.getItem('projectname');
    this.companyName = localStorage.getItem('companyName');

 
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


  comparematerials(o1: any, o2: any): boolean {
    console.log(o1, o2)
    return o1.AutoMaterialId === o2.AutoMaterialId;//Compare by id
  }

  getSubDropdownFilter(){
    this.api.getSubMaterialFilter().subscribe(res =>{
      console.log("subMaterial Dropdowns response", res);
      this.resp = res;
      this.response = this.resp.data;

      const update = this.response.filter(x =>{
        this.selectedAll.push(x.AutoMaterialId)

        console.log("default all ", this.selectedAll)
      })
    })
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

  selectCategery(event){
    console.log(event);
   // this.materialCategery = event;

    if(event == "All"){
      this.response.filter((data)=>{
        this.selectedAll.push(data.AutoMaterialId);
        
     });
     console.log(this.selectedAll);
     
    }else{
      this.selectedAll = event
    }
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



    console.log("all transactions filter body",data)
    
    if(data.fromDate == null || data.toDate == null || data.materialId.length ===0){
      this.presentToast("Please select date and material ")
         }else{
    this.api.getDateFilterAll(data).subscribe(res =>{
      console.log("datefilter response", res);
      this.dateResponse = res
      if(this.dateResponse.status === 200){   
  this.dataService.publishAllTransactionsData({
    userdata: data
  });
        this.modalCtrl.dismiss(this.dateResponse);
        
      }
     
    })
  }
  }

    dismissModal(){
      this.modalCtrl.dismiss();
    }


    async presentToast(massage: string) {
      const toast = await this.toast.create({
        message: massage,
        duration: 2000
      });
      toast.present();
  
    }

}
