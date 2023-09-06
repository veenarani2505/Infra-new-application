import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-filtermodl',
  templateUrl: './filtermodl.component.html',
  styleUrls: ['./filtermodl.component.scss'],
})
export class FiltermodlComponent implements OnInit {
  
 
  f_date: any;
  to_date: any;
  modalForm:FormGroup;
  isSubmitted = false;
  resp: any;
  response: any;

  constructor(private modalCtrl: ModalController, private formbuilder: FormBuilder, private api: ApiService) {

    console.log(this.f_date);
    console.log(this.to_date);
   }
   ngOnInit() {
    this.getSubDropdownFilter();
  }



  getSubDropdownFilter(){
    this.api.getSubMaterialFilter().subscribe(res =>{
      console.log("subMaterial Dropdowns response", res);
      this.resp = res;
      this.response = this.resp.data;
    })
  }


  onSubmit(){
    var data = {
      "fromDate":"2022-01-17 21:10:12",
      "toDate":"2022-01-18 18:40:21"
    }

    this.api.getDateFilterReceipts(data).subscribe(res =>{
      console.log("datefilter response",res)
    })


    // this.isSubmitted = true;
    // if (!this.modalForm.valid) {
    //   // this.presentToast("Please provide all the required values")
    //   console.log(this.modalForm.value);
    //   return false;

    // } else{
    //   console.log(this.modalForm.value);
    // }

    
    console.log(this.to_date);
  }

  fromDateEvent(dater){
  console.log(dater)
  }

  toDateEvent(date){
  console.log(date)
  }


  dismissModal(){
    this.modalCtrl.dismiss();
  }

}
