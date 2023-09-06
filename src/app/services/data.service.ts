import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  

  // private userData = new Subject<any>();
  private userData:[] =[];
  private receiptsData: [] = [];
  private issuesData: [] = [];
  private allTransactionsData: [] = [];

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  publishUserData2(data: any) {
    console.log("publish dataa",data)
    this.userData=data.userdata;
    console.log("behaviour subject data", this.userData);
}

getObservable2() {
  return this.userData;
 
}

publishreceiptsData(data: any){
  console.log("publish receipts dataa",data)
  this.receiptsData = data.userdata
}

getReceiptsData() {
  return this.receiptsData;
}

publishIssuesData(data: any){
  console.log("publish Issues Data", data)

  this.issuesData = data.userdata;
}

getIssuesData(){
  return this.issuesData;
}

publishAllTransactionsData(data: any){
console.log("publish All Trabnsactionds Data", data);
this.allTransactionsData = data.userdata;
}


getAllTransactionsData(){
return this.allTransactionsData;
}

}
