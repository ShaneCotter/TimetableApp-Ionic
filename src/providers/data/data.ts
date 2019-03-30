import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

  getModules() {
    return this.http.get('https://ca2-timetableapi.azurewebsites.net/api/Timetable/all').map(response => response.json());
  }

  getTimeslotsByDay(day: number) {
    var dayString: string = "";

    switch (day) {
      case 1:
        dayString = "Monday";
        break;
      case 2:
        dayString = "Tuesday";
        break;
      case 3:
        dayString = "Wednesday";
        break;
      case 4:
        dayString = "Thursday";
        break;
      case 5:
        dayString = "Friday";
        break;
      default:
        //This case will ensure Monday is shown on the weekend
        dayString = "Monday";
    }
    console.log('call made');
    return this.http.get('https://ca2-timetableapi.azurewebsites.net/api/Timetable/getTimeslotsByDay/' + dayString)
      .map(response => response.json());
  }

  getTimeslotsByRoomNumber(roomNumber: number) {
    return this.http.get('https://ca2-timetableapi.azurewebsites.net/api/Timetable/timeSlotByRoomNumber/' + roomNumber)
      .map(response => response.json());
  }

}

