const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('Kelowna Wine Trails and Tours App', function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should add a new member', async function () {
    await driver.get('https://selenium-testing-testing.web.app');
    await driver.findElement(By.id('lastname')).sendKeys('Doe');
    await driver.findElement(By.id('firstname')).sendKeys('John');
    await driver.findElement(By.id('addMemberBtn')).click();

    let members = await driver.findElement(By.id('members')).getText();
    assert(members.includes('Doe, John'));
  });

  it('should delete a member', async function () {
    await driver.get('https://selenium-testing-testing.web.app');
    await driver.findElement(By.id('lastname')).sendKeys('Doe');
    await driver.findElement(By.id('firstname')).sendKeys('John');
    await driver.findElement(By.id('addMemberBtn')).click();
    
    // Ensure the member is added first
    let members = await driver.findElement(By.id('members')).getText();
    assert(members.includes('Doe, John'));

    // Delete the member
    await driver.findElement(By.id('members')).sendKeys(Key.ARROW_DOWN); // Select the first member
    await driver.findElement(By.id('deleteMemberBtn')).click();

    members = await driver.findElement(By.id('members')).getText();
    assert(!members.includes('Doe, John'));
  });

  it('should sort the member list', async function () {
    await driver.get('https://selenium-testing-testing.web.app');
    await driver.findElement(By.id('lastname')).sendKeys('Doe');
    await driver.findElement(By.id('firstname')).sendKeys('John');
    await driver.findElement(By.id('addMemberBtn')).click();

    await driver.findElement(By.id('lastname')).sendKeys('Smith');
    await driver.findElement(By.id('firstname')).sendKeys('Jane');
    await driver.findElement(By.id('addMemberBtn')).click();

    await driver.findElement(By.id('sortMemberListBtn')).click();

    let members = await driver.findElement(By.id('members')).getText();
    let membersArray = members.split('\n');
    let sortedMembers = [...membersArray].sort();

    assert.deepStrictEqual(membersArray, sortedMembers);
  });
});
