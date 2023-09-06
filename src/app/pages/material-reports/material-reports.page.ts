
import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AlltransactionsfilterModalPage } from 'src/app/modals/alltransactionsfilter-modal/alltransactionsfilter-modal.page';
import { FilterModalPage } from 'src/app/modals/filter-modal/filter-modal.page';
import { IssueFiletrModalPage } from 'src/app/modals/issue-filetr-modal/issue-filetr-modal.page';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ILocalNotification, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-material-reports',
  templateUrl: './material-reports.page.html',
  styleUrls: ['./material-reports.page.scss'],
})
export class MaterialReportsPage implements OnInit {

  highlighted: any = false;
  downarrowIcon: any = "chevron-down-outline";
  response: any = [];
  selectedAll: any = [];
  stockRes: any;
  stckRes2: any;
  options = ["cheese", "pepperoni", "basil"];
  basket = [];
  material: string = "stock";
  listener;
  selectAllCheckBox: any;
  checkBoxes: HTMLCollection;
  projectname: any;
  projectId: any;
  isResponse: any;
  values: any;
  modelData: any;
  resp_receipt: any;
  response_receipt: any = [];
  response_all: any;
  response2_all = [];
  modelData_all: any;
  dataa: any;
  resp_issue: any;
  response_issue = [];
  response_stock: any;
  receipt_pdf_res: any;
  issue_pdf_res: any;
  all_pdf_res: any;
  defaultStockRes: any;
  stockPdf: any;
  downloadText: any;
  base64: any;
  roleId: any;
  stockcsv: any;
  base64_csv: any;
  receipt_csv_res: any;
  issue_csv_res: any;
  all_csv_res: any;
  getReceiptsData: any;
  fromDate: any;
  f_date: any;
  to_date: string;
  date1: any;
  date2: any;
  data: any;
  companyName: string;

  customAlertOptions: any = {
    header: 'Select Material Categery',
    subHeader: 'Select All:',
    message: '<ion-checkbox id="selectAllCheckBox"></ion-checkbox>'
  };

  constructor(private navCtrl: NavController, private router: Router, private toast: ToastController,
    private api: ApiService, @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, private loader: LoadingService,
    private modalCtrl: ModalController, private file: File,
    private platform: Platform, private dataService: DataService,
    private localnotifications: LocalNotifications,
    private alertCtrl: AlertController, private fileOpner: FileOpener, private datepipe: DatePipe) {

    this.downloadText = "";
    this.projectname = localStorage.getItem('projectname');
    this.projectId = localStorage.getItem('projectId');
    this.companyName = localStorage.getItem('companyName');
    console.log(this.projectId);
    this.roleId = localStorage.getItem('roleId');
    console.log(this.roleId);
    if (router.getCurrentNavigation().extras.state) {
      this.values = this.router.getCurrentNavigation().extras.state;
      console.log(this.values);
    }

    const date = new Date();
    this.fromDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    console.log("fromDate", this.fromDate);
    this.f_date = this.datepipe.transform(this.fromDate, 'dd-MMM-YYYY')
    console.log("fddddddddd", this.f_date);
    this.to_date = this.datepipe.transform(date, 'dd-MMM-YYYY');
    this.date1 = this.datepipe.transform(this.f_date, "yyyy-MM-dd");
    this.date2 = this.datepipe.transform(this.to_date, "yyyy-MM-dd");
    this.data = {
      "fromDate": this.date1,
      "toDate": this.date2,
      "ProjectName": this.projectname,
      "materialId": [],
      "company_name": this.companyName
    }
    this.dataService.publishreceiptsData({
      userdata: this.data
    });
    console.log("data", this.data)
  }

  saveAndOpenPdf(pdf: string, filename: string) {
    this.downloadText = "downloading..."
    // const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
    const writeDirectory = this.file.externalRootDirectory + "/Download/"
    console.log("directory  path", writeDirectory)
    this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'application/pdf'), { replace: true })
      .then(response => {
        console.log(response, "pdf covert responsee??????")
        this.downloadText = "";
        this.presentToast("Please check downloads folder for report");
       // this.showNotifications("Lokesh.pdf")
      })
      .catch(() => {
        console.error('Error writing pdf file');
      });
  }

  saveAndOpenCSV(pdf: string, filename: string) {
    this.downloadText = "downloading..."
    // const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
    const writeDirectory = this.file.externalRootDirectory + "/Download/"
    console.log("directory  path", writeDirectory)

    this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'application/pdf'), { replace: true })
      .then(response => {
        console.log(response, "response")
        this.downloadText = "";
        this.presentToast("Please check downloads folder for report");
      })
      .catch(() => {
        console.error('Error writing pdf file');
      });

  }

  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  // segments change event
  segmentChanged(event) {
    console.log(event.detail.value);
    if (event.detail.value == "stock") {
      this.getDefaultStock();
    } else if (event.detail.value == "receipt") {
      this.getDeaultReceipts();
      this.dataService.publishreceiptsData({
        userdata: this.data
      });
      //  this.getReceiptsData = undefined
    } else if (event.detail.value == "issues") {
      this.getDeaultIssues();
      this.dataService.publishIssuesData({
        userdata: this.data
      });
    } else {
      this.getAllTransactions();
      this.dataService.publishAllTransactionsData({
        userdata: this.data
      });
    }
  }
  ngOnInit() {
    this.getSubDropdownFilter();
    this.getDeaultReceipts();
    this.getAllTransactions();
    this.getDeaultIssues();
    this.getDefaultStock();
  }

  openSelector(selector) {
    selector.open().then((alert) => {
      this.selectAllCheckBox = this.document.getElementById("selectAllCheckBox");
      this.checkBoxes = this.document.getElementsByClassName("alert-checkbox");
      this.listener = this.renderer.listen(this.selectAllCheckBox, 'click', () => {
        if (this.selectAllCheckBox.checked) {
          for (let checkbox of this.checkBoxes) {
            if (checkbox.getAttribute("aria-checked") === "false") {
              (checkbox as HTMLButtonElement).click();
            };
          };
        } else {
          for (let checkbox of this.checkBoxes) {
            if (checkbox.getAttribute("aria-checked") === "true") {
              (checkbox as HTMLButtonElement).click();
            };
          };
        }
      });
      alert.onWillDismiss().then(() => {
        this.listener();
      });
    })
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

  getSubDropdownFilter() {
    var resp: any;
    this.api.getSubMaterialFilter().subscribe(res => {
      console.log("subMaterial Dropdowns response", res);
      resp = res;
      this.response = resp.data;
    })
  }

  selectCategery(value) {
    console.log(value)
    if (value == "All") {
      this.response.filter((data) => {
        this.selectedAll.push(data.AutoMaterialId);
      });
      console.log(this.selectedAll);
    } else {
      this.selectedAll = value;
    }
  }

  onStockPDF() {
    var data;
    var default_data = {
      "materialId": [],
      "projectId": this.projectId,
      "company_name": this.companyName
    }

    var get_userdata = this.dataService.getObservable2()
    if (get_userdata.length != 0) {
      data = get_userdata
    } else {
      data = default_data
    }
    console.log("=====================================>", data)
    this.api.stockPDFDownload(data).subscribe(res => {
      console.log(res);
      this.stockPdf = res;
      this.base64 = this.stockPdf["PdfBase-64"]
      console.log(this.base64);
      console.log(this.stockPdf.pdf);
      if (this.stockPdf.status === 200) {
        this.saveAndOpenPdf(this.base64, this.stockPdf.pdf);
      }
    })
  }

  onStockCSV() {
    var data;
    var default_data = {
      "materialId": [],
      "projectId": this.projectId,
      "company_name": this.companyName
    }
    var get_userdata = this.dataService.getObservable2()
    if (get_userdata.length != 0) {
      data = get_userdata
    } else {
      data = default_data
    }
    console.log("=====================================>", data)
    this.api.downLoadStockCSV(data).subscribe(res => {
      console.log(res);
      this.stockcsv = res;
      console.log("stockkkCSVVVV", this.stockcsv);
      this.base64_csv = this.stockcsv["base64Data"]
      console.log("base64csv", this.base64_csv);
      console.log(this.stockcsv.csv);
      if (this.stockcsv.status === 200) {
        this.saveAndOpenCSV(this.base64_csv, this.stockcsv.csv);
        // this.showNotifications(this.stockPdf.csv);
      }
    })
  }

  onReceiptsPDF() {
    var data;
    var default_data = {
      "ProjectName": this.projectname,
      "materialId": [],
      "fromDate": this.date1,
      "toDate": this.date2,
      "company_name": this.companyName
    }

    this.getReceiptsData = this.dataService.getReceiptsData();
    console.log("getReceipts data", this.getReceiptsData)
    // console.log("getReceiptData length", this.getReceiptsData.length)
    if (this.getReceiptsData.length != 0) {
      data = this.getReceiptsData
    } else {
      data = default_data
    }
    this.api.receiptsPDFDownload(data).subscribe(res => {
      console.log(res);
      this.receipt_pdf_res = res;
      var base64pdf = this.receipt_pdf_res["PdfBase-64"]
      if (this.receipt_pdf_res.status === 200) {
        this.saveAndOpenPdf(base64pdf, this.receipt_pdf_res.pdf);
       // this.showNotifications(this.receipt_pdf_res.Pdf)
      }
    })
  }

  onReceiptCSV() {
    var date1 = this.datepipe.transform(this.f_date, "yyyy-MM-dd");
    var date2 = this.datepipe.transform(this.to_date, "yyyy-MM-dd");
    var data;
    var default_data = {
      "ProjectName": this.projectname,
      "materialId": [],
      "fromDate": date1,
      "toDate": date2,
      "company_name": this.companyName
    }
    var getReceiptsData = this.dataService.getReceiptsData();
    console.log("huuuuuuu", getReceiptsData)
    if (getReceiptsData.length != 0) {
      data = getReceiptsData
    } else {
      data = default_data
    }
    this.api.downLoadReceiptCSV(data).subscribe(res => {
      console.log(res);
      this.receipt_csv_res = res;
      var base64pdf = this.receipt_csv_res["base64Data"]
      if (this.receipt_csv_res.status === 200) {
        this.saveAndOpenPdf(base64pdf, this.receipt_csv_res.csv);
      }
    })
  }

  onIssuesPDF() {
    var date1 = this.datepipe.transform(this.f_date, "yyyy-MM-dd");
    var date2 = this.datepipe.transform(this.to_date, "yyyy-MM-dd");
    var data;
    var default_data = {
      "ProjectName": this.projectname,
      "materialId": [],
      "fromDate": date1,
      "toDate": date2,
      "company_name": this.companyName
    }
    var issuesData = this.dataService.getIssuesData();
    if (issuesData.length != 0) {
      data = issuesData
    } else {
      data = default_data
    }
    this.api.issuesPDFDownload(data).subscribe(res => {
      console.log(res);
      this.issue_pdf_res = res;
      var base64pdf = this.issue_pdf_res["PdfBase-64"];
      if (this.issue_pdf_res.status === 200) {
        this.saveAndOpenPdf(base64pdf, this.issue_pdf_res.pdf);
      }
    })
  }

  onIssuesCSV() {
    var date1 = this.datepipe.transform(this.f_date, "yyyy-MM-dd");
    var date2 = this.datepipe.transform(this.to_date, "yyyy-MM-dd");
    var data;
    var default_data = {
      "ProjectName": this.projectname,
      "materialId": [],
      "fromDate": date1,
      "toDate": date2,
      "company_name": this.companyName
    }
    var issuesData = this.dataService.getIssuesData();
    if (issuesData.length != 0) {
      data = issuesData
    } else {
      data = default_data
    }
    this.api.downLoadIssueCSV(data).subscribe(res => {
      console.log(res);
      this.issue_csv_res = res;
      var base64csv = this.issue_csv_res["base64Data"];
      if (this.issue_csv_res.status === 200) {
        this.saveAndOpenPdf(base64csv, this.issue_csv_res.csv);
      }
    })
  }

  onAllPDF() {
    var date1 = this.datepipe.transform(this.f_date, "yyyy-MM-dd");
    var date2 = this.datepipe.transform(this.to_date, "yyyy-MM-dd");
    var data;
    var default_data = {
      "ProjectName": this.projectname,
      "materialId": [],
      "fromDate": date1,
      "toDate": date2,
      "company_name": this.companyName
    }
    var allTransactions = this.dataService.getAllTransactionsData();
    if (allTransactions.length != 0) {
      data = allTransactions
    } else {
      data = default_data
    }
    console.log("all transactions CSV body", data)
    this.api.allPDFDownload(data).subscribe(res => {
      console.log(res);
      this.all_pdf_res = res;
      var base64PDF = this.all_pdf_res["PdfBase-64"];
      if (this.all_pdf_res.status === 200) {
        this.saveAndOpenPdf(base64PDF, this.all_pdf_res.pdf);
      }
    })
  }

  onAllCSV() {
    var date1 = this.datepipe.transform(this.f_date, "yyyy-MM-dd");
    var date2 = this.datepipe.transform(this.to_date, "yyyy-MM-dd");
    var data;
    var default_data = {
      "ProjectName": this.projectname,
      "materialId": [],
      "fromDate": date1,
      "toDate": date2,
      "company_name": this.companyName
    }
    var allTransactions = this.dataService.getAllTransactionsData();
    if (allTransactions.length != 0) {
      data = allTransactions
    } else {
      data = default_data
    }
    console.log("all transactions CSV body", data)
    this.api.downLoadAllCSV(data).subscribe(res => {
      console.log(res);
      this.all_csv_res = res;
      var base64CSV = this.all_csv_res["base64Data"];
      if (this.all_csv_res.status === 200) {
        this.saveAndOpenPdf(base64CSV, this.all_csv_res.csv);
      }
    })
  }

  iconChange() {
    if (this.downarrowIcon === "chevron-down-outline") {
      this.downarrowIcon = "chevron-up-outline";
      this.highlighted = true;
      // this.onFilterButton();

    } else if (this.downarrowIcon === "chevron-up-outline") {
      this.downarrowIcon = "chevron-down-outline";
      this.highlighted = false;
      // this.modalController.dismiss();
    }
  }
  goback() {
    console.log(this.roleId, "role idddddd")
    if (this.roleId == 1) {
      this.router.navigate(['previliges']);
    } else {
      this.router.navigate(['previliges']);
    }
  }

  getDeaultReceipts() {
    // this.loader.presentLoading();
    this.api.getDefualtReceipts(this.projectname).subscribe(res => {
      //  this.loader.dismisLoading();
      console.log("default receipt lists response", res);
      this.resp_receipt = res;
      this.isResponse = true;
      this.response_receipt = this.resp_receipt.data;
      console.log(this.response_receipt)
    })
  }

  getDeaultIssues() {
    // this.loader.presentLoading()
    this.api.getDefaultIssues(this.projectname).subscribe(res => {
      //   this.loader.dismisLoading();
      console.log("default issue lists response", res);
      this.resp_issue = res;
      this.isResponse = true
      this.response_issue = this.resp_issue.data;
      this.response_issue = this.response_issue.filter(item => item.Quantity !== 0);
      console.log(this.response_issue);

    })
  }

  getDefaultStock() {
    this.api.getStock(this.projectname).subscribe(res => {
      console.log("Default stock respobseeee", res);
      this.defaultStockRes = res;
      this.response_stock = this.defaultStockRes.data
    })
  }

  getAllTransactions() {
    var responseDAta: any;
    // this.loader.presentLoading();
    this.api.getAllTransactions(this.projectname).subscribe(res => {
      //  this.loader.dismisLoading();
      this.isResponse = true;
      console.log("all transactions response.........>", res);
      responseDAta = res;
      this.response2_all = responseDAta.data;
      this.response2_all = this.response2_all.filter(item => item.Quantity !== 0);
      console.log(this.response2_all);
    })
  }

  showNotifications(pdfName: any) {
    let options: ILocalNotification = {
      id: Math.floor(Math.random()*(999-100+1)+100),
      text: pdfName + " Downloaded",
      title: "Infra Dev",
      sound: 'file://sound.mp3',
      led: 'FF0000',
      trigger: { at: new Date(new Date().getTime() + 3000) },
      foreground: true
    }
    this.localnotifications.schedule(options);
  }

  // toast message controller
  async presentToast(massage: string) {
    const toast = await this.toast.create({
      message: massage,
      duration: 2000
    });
    toast.present();
  }

  async onFilterReceipt() {
    const modal = await this.modalCtrl.create({
      component: FilterModalPage,
      cssClass: 'filter-modal',
      backdropDismiss: true
    });

    await modal.present();
    modal.onDidDismiss().then((modelData) => {
      // if (modelData !== null) {
      this.response_receipt = modelData.data.details
      console.log('Modal Data : ' + modelData.data);
      console.log(this.response_receipt);
      // }
    });
  }

  async onFilterIssue() {
    const modal = await this.modalCtrl.create({
      component: IssueFiletrModalPage,
      cssClass: 'filter-modal',
      backdropDismiss: true
    });

    await modal.present();
    modal.onDidDismiss().then((modelData) => {
      // if (modelData !== null) {
      this.response_issue = modelData.data.details
      console.log('Modal Data : ' + modelData.data);
      console.log(this.response_issue);
    }
      // }
    );
  }

  async onFilterAll() {
    const modal = await this.modalCtrl.create({
      component: AlltransactionsfilterModalPage,
      cssClass: 'filter-modal',
      backdropDismiss: true
    });
    await modal.present();
    modal.onDidDismiss().then((modelData) => {
      // if (modelData !== null) {
      this.response2_all = modelData.data.details
      console.log('Modal Data : ' + modelData.data);
      console.log(this.response2_all);
    }
      // }
    );
  }

  async presentAlert(name: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Notification',
      message: 'Please check' + ' ' + '/Android/data/infradev.io.app/files/' + name,
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
