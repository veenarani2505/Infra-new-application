import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dates-view',
  templateUrl: './dates-view.page.html',
  styleUrls: ['./dates-view.page.scss'],
})
export class DatesViewPage implements OnInit {
   
  date: string;
  type: 'string';
  st_date: any;
  edate: any;
  startDate: any;
  endDate: any;
  fromDate: Date;
  toDate: Date;
  datesForCards = [];
  datesArray: any = [];
  evenArray: any = [];
  oddArray: any = [];
  values: any;
  response: any;
  response2: any;
  currentDate: any;
  isPast: boolean = false;
  previousDates: any = [];
  futureDates: any = [];
  curDate: any;
  projectname: any;
  isCurrentdate: boolean = true;
  component: string;
  subComponet: string;
  wp_id: any;
  res: any;
  DailyReportDates: any = [];
  isDisabled: boolean = true;
  CurrentReportDate: any;
  dates2: any = [];
  datesResponse: any = [];
  isAddWorkDisbaled: boolean = false;
  dates3: any;

  constructor(private navCtrl: NavController, private router: Router, private api: ApiService,
    private datePipe: DatePipe) {
    this.projectname = localStorage.getItem('projectname')
    this.component = localStorage.getItem("workcomponent");
    this.subComponet = localStorage.getItem("subworkComponent")

    if (router.getCurrentNavigation().extras.state) {
      this.values = this.router.getCurrentNavigation().extras.state;
      console.log("passing data", this.values);
      this.st_date = this.values.start_date;
      this.edate = this.values.end_date;
      this.wp_id = this.values.wp_id;
    }

    var date = new Date().toISOString();
    var cdate = new Date(date).toDateString();
    this.currentDate = this.datePipe.transform(cdate, "dd-MMM-YYYY")
    console.log("current date", this.currentDate)
    this.startDate = new Date(this.st_date);
    this.endDate = new Date(this.edate);
    this.datesArray = this.getDateArray(this.startDate, this.endDate);
    console.log(this.datesArray);

    for (var i = 0; i < this.datesArray.length; i++) {
      if (this.currentDate == this.datesArray[i]) {
        this.curDate = this.datesArray[i]
        console.log("currrrrrrrrr", this.curDate)
      }
    }
  }

  ngOnInit() {
    console.log("ng on it calleld here")
    this.getDailyReportDates();
  }

   // before entering the page
   ionViewWillEnter() {
    console.log("ion viewWillEnter method called")
    this.getDailyReportDates();
  }

  getDailyReportDates() {
    var data = {
      "wp_id": this.wp_id
    }
    var d = []
    this.api.getDailyReportDates(data).subscribe(res => {
      console.log("Daily Report Dates reposne", res)
      this.res = res;
      this.DailyReportDates = this.res.dates;
      console.log("response dates", this.DailyReportDates)
      this.DailyReportDates.forEach(x => {
        d.push(this.datePipe.transform(x.day_date, "dd-MMM-YYYY"))
        console.log("d", d)
        this.dates2.push(this.datePipe.transform(x.day_date, "dd-MMM-YYYY"));
        console.log("dates2 variable data =====>converted required format datesss", this.dates2)
      });

      console.log("datesss3333333333333", this.dates3)
      this.dates3 = d

      d.forEach(y => {
        console.log("current dates" + this.currentDate, "yyyyy" + y)
        if (y == this.currentDate) {
          this.CurrentReportDate = y
          this.isAddWorkDisbaled = true
          console.log("current Report DAte", this.CurrentReportDate)
          console.log("dates2", d)
          d.shift();
          console.log(d)
          this.dates3 = d;
          console.log("dates33333", this.dates3)
        }
      })
    })
  }

  onAddButtonClick() {
    this.curDate = this.currentDate;
    var date = this.curDate
    console.log("selected DAteeeeee", date)
    let dateFormat;
    if (date.includes("Jan")) {
      dateFormat = date.replace("Jan", "1")
    } else if (date.includes("Feb")) {
      dateFormat = date.replace("Feb", "2")
    } else if (date.includes("Mar")) {
      dateFormat = date.replace("Mar", "3")
    } else if (date.includes("Apr")) {
      dateFormat = date.replace("Apr", "4")
    } else if (date.includes("May")) {
      dateFormat = date.replace("May", "5")
    } else if (date.includes("Jun")) {
      dateFormat = date.replace("Jun", "6")
    } else if (date.includes("Jul")) {
      dateFormat = date.replace("Jul", "7")
    } else if (date.includes("Aug")) {
      dateFormat = date.replace("Aug", "8")
    } else if (date.includes("Sep")) {
      dateFormat = date.replace("Sep", "9")
    } else if (date.includes("Oct")) {
      dateFormat = date.replace("Oct", "10")
    } else if (date.includes("Nov")) {
      dateFormat = date.replace("Nov", "11")
    } else {
      dateFormat = date.replace("Dec", "12")
    }
    var data = {
      "day_date": dateFormat,
      "wp_id": this.values.wp_id
    }
    console.log(data)
    this.api.getWorkProgressStatus(data).subscribe(res => {
      console.log("dates status response ---><----", res);
      this.response = res;
      if (this.response.status === 200) {
        this.navCtrl.navigateForward('/project-progress', { state: this.response });
      } else {
        this.navCtrl.navigateForward('/project-progress', { state: this.response });
      }
    })
  }

  onViewClick(date) {
    console.log("selected DAteee", date)
    let dateFormat;
    if (date.includes("Jan")) {
      dateFormat = date.replace("Jan", "1")
    } else if (date.includes("Feb")) {
      dateFormat = date.replace("Feb", "2")
    } else if (date.includes("Mar")) {
      dateFormat = date.replace("Mar", "3")
    } else if (date.includes("Apr")) {
      dateFormat = date.replace("Apr", "4")
    } else if (date.includes("May")) {
      dateFormat = date.replace("May", "5")
    } else if (date.includes("Jun")) {
      dateFormat = date.replace("Jun", "6")
    } else if (date.includes("Jul")) {
      dateFormat = date.replace("Jul", "7")
    } else if (date.includes("Aug")) {
      dateFormat = date.replace("Aug", "8")
    } else if (date.includes("Sep")) {
      dateFormat = date.replace("Sep", "9")
    } else if (date.includes("Oct")) {
      dateFormat = date.replace("Oct", "10")
    } else if (date.includes("Nov")) {
      dateFormat = date.replace("Nov", "11")
    } else {
      dateFormat = date.replace("Dec", "12")
    }

    console.log("selected view date", date)
    var data = {
      "day_date": dateFormat,
      "wp_id": this.values.wp_id
    }

    console.log(data)
    this.api.getWorkProgressStatus(data).subscribe(res => {
      console.log("dates status response ", res);
      this.response = res;
      if (this.response.status === 200) {
        this.navCtrl.navigateForward('/view-project-details', { state: this.response });
      } else {
        this.navCtrl.navigateForward('/view-project-details', { state: this.response });
      }
    })

  }

  formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + '-' + month + '-' + year;
  }

  getDateArray = function (start, end) {
    var arr = new Array();
    var dt = new Date(start);
    end = new Date(end);
    while (dt <= end) {
      arr.push(this.datePipe.transform(dt, "dd-MMM-YYYY"));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }

  goback() {
    // this.navCtrl.back();
    this.router.navigate(['project-progress-list']);
  }
  onChange($event) {
    console.log($event);
  }

  dateSelected(event: any) {
    console.log("selected date", event)
  }

}