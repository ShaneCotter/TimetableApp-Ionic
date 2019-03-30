import { browser, by, element } from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  getDayString(dayNumber: number): string {
    var dayString: string;
    switch (dayNumber) {
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
    return dayString;
  }

  getPageTitleText() {
    return element(by.tagName('page-home')).element(by.tagName('ion-title')).element(by.css('.toolbar-title')).getText();
  }

  getCurrentDayText() {
    return element(by.tagName('page-home')).element(by.css('.page-title')).getText();
  }

  getModuleText() {
    return element(by.tagName('page-home')).element(by.css('.moduleName')).getText();
  }

  getRoomDropdownText() {
    return element(by.tagName('page-home')).element(by.tagName('ion-label')).getText();
  }

  getRoomNumberText() {
    return element(by.tagName('page-home')).element(by.css('.roomNumber')).getText();
  }

}