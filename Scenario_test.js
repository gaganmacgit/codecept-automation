// <reference path="./steps.d.ts " />
let config = require('config');
let db = require('./utils/db_util');
let utils = require('./utils/util');
let constants = require('./utils/constants');

Feature('Non Clinical FPG Workflow');

Scenario('Test Non Clinical FPG workflow for ADMIN', async (I) => {
  I.amOnPage(config.homeurl);

  //Extract the configured details   for practice and category
  let fpg_data;
  await utils.extract_fpg_details('8042', 'ADMIN').then(data => fpg_data = data);

  I.fillField(constants.USERNAME_SELECTOR, fpg_data['USERNAME']);
  I.fillField(constants.PASSWORD_SELECTOR, fpg_data['PASSWORD']);
  I.click(constants.LOGIN_BUTTON_SELECTOR);
  I.wait(3);

  I.waitForElement(constants.PRACTICE_SELECTOR);
  I.seeElement(constants.PRACTICE_SELECTOR);
  I.fillField(constants.PRACTICE_SELECTOR, fpg_data['PRACTICEID']);
  I.click(constants.LOGIN_BUTTON_SELECTOR);
  I.wait(15);

  I.waitForElement(constants.DEPARTMENT_SELECTOR);
  I.seeElement(constants.DEPARTMENT_SELECTOR);
  I.selectOption(constants.DEPARTMENT_SELECTOR, fpg_data['DEPARTMENTID']);
  I.click(constants.LOGIN_BUTTON_SELECTOR);
  I.wait(15);

  within({
    frame: "#GlobalNav"
  }, async () => {
    I.wait(5);
    I.waitForElement(constants.GEAR_ICON_SELECTOR);
    // I.wait(5);
    I.click(constants.GEAR_ICON_SELECTOR);
    I.wait(10);
  });
  I.click(`//*[text()='${constants.MY_FAX_PAGE_GROUP_QUEUE_TEXT}']`);
  // var dbConfig = config.get('dbConfig');
  // I.say(dbConfig.host);
  // Explicit query to get some FPG
  // let sqlQuery = 'select id from faxpagegroup where documentid=\'195786624\'';
  // let result = await db.executeQuery(sqlQuery, [], cb_func);
  // console.log('The result of query is ', result);
  // TODO: DB call to fetch most recent FPG based on practice
  I.wait(10);

  within({
    frame: ["#GlobalWrapper", "#frameContent", "#frScheduleNav"]
  }, () => {
    I.seeElement(constants.DOCUMENT_ICON_SELECTOR);
    I.fillField(constants.DOCUMENT_ICON_SELECTOR, '14119740f8042');
    I.click(constants.GO_BUTTON_SELECTOR);
  });
  I.wait(10);

  within({
    frame: ["#GlobalWrapper", "#frameContent", "#frMain"]
  }, async () => {

    I.wait(10);
    //ENTERQUEUE
    I.see('Unknown in ENTERQUEUE');
    I.wait(3);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    //OCR
    I.wait(5);
    I.see('Unknown in OCR');
    I.wait(3);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    //AUTOSPLIT
    I.see('Unknown in AUTOSPLIT');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Unknown in SPLIT');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(10);

    I.see('Unknown in AUTOCATEGORIZE');
    I.wait(10);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Unknown in CATEGORIZE');
    I.selectOption(constants.CATEGORY_SELECTOR, 'ADMIN');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in AUTODATACAPTURE');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in DATACAPTURE');
    I.fillField('PATIENTDOB', fpg_data['PATIENTDOB']);
    I.fillField('PATIENTNAME', fpg_data['PATIENTNAME']);
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in AUTODATASELECT');
    I.wait(10);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in DATASELECT');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in AUTODATAQA');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in DATAQA');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in AUTOCLINICALDATAENTRY');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in CLINICALQA');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in AUTOATHENAQA');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in ATHENAQA');
    I.wait(5);
    I.click('Assign self');
    I.wait(5);
    I.click('//*[@id="submit"]');
    I.wait(3);

    I.click('//*[@id="faxpagegrouplabel"]/a[1]');
    I.wait(5);

    I.see('Admin in EXITQUEUE');

  });

});