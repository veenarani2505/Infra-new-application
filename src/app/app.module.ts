import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from "@angular/common";
import { DataService } from './services/data.service';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
// import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
//import { Keyboard } from '@ionic-native/keyboard';
// import { DatePickerModule } from 'ionic-calendar-date-picker';




@NgModule({
  declarations: 
  [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  
    FormsModule,
     IonicModule.forRoot(), AppRoutingModule],
  providers: [Camera,DatePipe,MediaCapture, ImagePicker,Base64, DataService,FileTransfer,FileOpener,
     File,LocalNotifications,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
