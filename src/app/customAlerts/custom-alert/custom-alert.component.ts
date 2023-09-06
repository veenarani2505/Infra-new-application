import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent implements OnInit {
  values: any = [];
  fruits = ["Banana", "Orange", "Apple", "Mango"];
  val1: any;
  val2: any;
  val3: any;
  val4: any;
  val5: any;

  constructor(private mdlCtrl: ModalController, private navParams: NavParams) { }

  ngOnInit() {

  this.values   = this.navParams.data.msg;
    
  console.log("modal dataaa", this.values);

for(var i=0;i<this.values.length;i++){
  if(i==0){
    this.val1 = this.values[i]

    console.log(this.val1)
  }

  if(i==1){
    this.val2 = this.values[i]

    console.log(this.val1)
  }

  if(i==2){
    this.val3 = this.values[i]

    console.log(this.val2)
  }

  if(i==3){
    this.val4 = this.values[i]

    console.log(this.val3)
  }

  if(i==4){
    this.val4 = this.values[i]

    console.log(this.val4)
  }
}



  }


  DismisModal(){
    this.mdlCtrl.dismiss();
  }
}
