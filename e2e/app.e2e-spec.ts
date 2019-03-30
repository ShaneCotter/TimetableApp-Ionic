import { Page } from './app.po';
import { element, by, browser, ElementFinder } from 'protractor';
import 'jasmine';



describe('App', () => {
  let page: Page;
  let currentDayNum: number;
  let nextDayNum: number;
  let currentDayString: string;
  let nextDayString: string;

  beforeEach(() => {
    page = new Page();
    currentDayNum = new Date().getDay();
    nextDayNum = currentDayNum + 1;

    if (currentDayNum > 5) {
      currentDayNum = 1;
    }
    if (nextDayNum > 5) {
      nextDayNum = 1;
    }

    currentDayString = page.getDayString(currentDayNum);
    nextDayString = page.getDayString(nextDayNum);
  });

  describe('Home Page', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    //Test that the page title = 'College Timetable'
    //This tests that the app loads
    it('should have a title saying College Timetable', () => {
      page.getPageTitleText().then(title => {
        expect(title).toEqual('College Timetable');
      });
    });

    //Tests that the app defaults to the current day
    //The day is displayed from data returned from the API -
    //So this also tests that the API data is populating and is for the current day
    it('should default to the current day when loaded', () => {
      page.getCurrentDayText().then(day => {
        expect(day).toEqual(currentDayString);
      });
    });

    //Tests that there is data for at least one module displayed on the page
    //This data comes from the api so this also ensures that module data is populating from the api call
    it('should have data loaded for at least 1 module', () => {
      expect(page.getModuleText()).length > 0;
    });

    //Tests that the view changes when the filter by room button is clicked
    //It does so by checking that the rooms dropdown is visible after the filter by rooms button is clicked
    it('should change view to view by room when button is clicked', () => {

      element(by.css('.viewButton')).click().then(() => {
        browser.driver.sleep(1000);

        page.getRoomDropdownText().then(title => {
          expect(title).toEqual('Room');
        });
      })
    })

    //Tests changing to the next day in the app and checking that the data 
    // for that day is displayed
    it('should change to the next day and display correct data', () => {

      element(by.css('.arrow-right')).click().then(() => {
        browser.driver.sleep(5000);

        page.getCurrentDayText().then(day => {
          expect(day).toEqual(nextDayString);
        });
      })
    })

    //Tests changing the language in the app and checks that the data displayed 
    //is in the selected lanaguage
    it('should change language and display data in spanish', () => {

      element(by.tagName('ion-select')).click().then(() => {
        browser.driver.sleep(1000);

        element(by.buttonText('Spanish')).click();
        element(by.buttonText('OK')).click();

        page.getPageTitleText().then(room => {
          expect(room).toEqual('Horario Universidad');
        });
      })
    })

    //Tests changing to the filter by room view and filtering for a particular room
    //It then checks that the data displayed is for the selected room
    it('should filter by room and display correct room data', () => {

      element(by.css('.viewButton')).click().then(() => {
        browser.driver.sleep(1000);

        element(by.css('.roomDropdown')).click().then(() => {
          browser.driver.sleep(1000);

          element(by.buttonText('118')).click();
          element(by.buttonText('OK')).click();

          page.getRoomNumberText().then(room => {
            expect(room).toEqual('Room 118');
          });
        })
      })

    })
  })
});