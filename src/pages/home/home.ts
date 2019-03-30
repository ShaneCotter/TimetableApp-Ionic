import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceProvider } from "../../providers/language-service/language-service";
import { LanguageModel } from "../../models/language.model";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  languageSelected : any = 'en';
  languages : Array<LanguageModel>;

  modulesByDay: any;
  modulesByRoom: any;
  allModules: any;
  roomNumbers: any = [];
  currentDay: any = new Date().getDay(); //returns int for current day of the week
  viewByDay: boolean;

  constructor(private translate: TranslateService, public languageService: LanguageServiceProvider, public navCtrl: NavController, public provider: DataProvider) {
    this.languages = this.languageService.getLanguages();
    this.setLanguage();
  }

  ngOnInit() {
    this.getAllModules();
    this.getModulesByDay(this.currentDay);
    this.getModulesByRoomNumber(150);
    this.viewByDay = true;
  }

  async getAllModules() {
    await this.provider.getModules()
      .subscribe(res => {
        this.allModules = res;
      }, (err) => {
        alert("failed loading json data");
      })
    console.log(this.allModules);
  }

  getRoomNumbers() {
    for (let module of this.allModules) {
      for (let time of module.timeslots) {
        if (!this.roomNumbers.includes(time.roomNumber)) {
          this.roomNumbers.push(time.roomNumber);
        }
      }
    }
    this.roomNumbers.sort();
  }


  getModulesByDay(day: number) {
    this.provider.getTimeslotsByDay(day)
      .subscribe(res => {
        this.modulesByDay = res;
      }, (err) => {
        alert("failed loading json data");
      })
  }

  getPreviousDay() {
    if ((this.currentDay - 1) < 1) {
      this.currentDay = 5;
      this.getModulesByDay(this.currentDay);
    }
    else {
      this.currentDay -= 1;
      this.getModulesByDay(this.currentDay);
    }

  }

  getNextDay() {
    if ((this.currentDay + 1) > 5) {
      this.currentDay = 1;
      this.getModulesByDay(this.currentDay);
    }
    else {
      this.currentDay += 1;
      this.getModulesByDay(this.currentDay);
    }
  }

  getModulesByRoomNumber(roomNumber: number) {
    this.provider.getTimeslotsByRoomNumber(roomNumber)
      .subscribe(res => {
        this.modulesByRoom = res;
      }, (err) => {
        alert("failed loading json data");
      })
  }

  changeView() {
    if (this.viewByDay == true) {
      this.viewByDay = false;
      this.getRoomNumbers();
      console.log(this.roomNumbers);
    }
    else {
      this.viewByDay = true;
      console.log(this.modulesByDay);
    }
    console.log(this.allModules);
  }

  changeRoomNumber($event) {
    this.getModulesByRoomNumber($event);
  }

  setLanguage(){
    let defaultLanguage = this.translate.getDefaultLang();
    if(this.languageSelected){
      this.translate.setDefaultLang(this.languageSelected);
      this.translate.use(this.languageSelected);
    }else{
      this.languageSelected = defaultLanguage;
      this.translate.use(defaultLanguage);
    }

  }
}

