import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private userSubject = new Subject<any>();
  savedData: any;

  constructor() { }

  publishUserData(data: any) {
    this.userSubject.next(data);

}

getObservable(): Subject<any> {
  return this.userSubject;
}
}
