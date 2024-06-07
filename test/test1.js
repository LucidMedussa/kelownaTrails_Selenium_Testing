// Generated by Selenium IDE
const { Builder, By, Key } = require('selenium-webdriver')
const chrome = require("selenium-webdriver/chrome");

async function test_case() {
  //Set Chrome option
  let options = new chrome.Options();
  options.addArguments('headless');
  options.addArguments('disable-gpu')
  options.setChromeBinaryPath('/usr/bin/google-chrome');
 // Create a Driver
 let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

    try{
    await driver.get("https://selenium-testing-testing.web.app/")
    // 2 | setWindowSize | 652x672 | 
    await driver.manage().window().setRect({ width: 652, height: 672 })
    // 3 | click | id=lastname | 
    await driver.findElement(By.id("lastname")).click()
    // 4 | type | id=lastname | NWUNELI
    await driver.findElement(By.id("lastname")).sendKeys("NWUNELI")
    // 5 | click | id=firstname | 
    await driver.findElement(By.id("firstname")).click()
    // 6 | type | id=firstname | LUCY
    await driver.findElement(By.id("firstname")).sendKeys("LUCY")
    // 7 | click | id=addMemberBtn | 
    await driver.findElement(By.id("addMemberBtn")).click()
    // 8 | assertAlert | Size must be greater than 0 | 
    assert(await driver.switchTo().alert().getText() == "Size must be greater than 0")
    // 9 | click | id=GroupSize | 
    await driver.findElement(By.id("GroupSize")).click()
    // 10 | type | id=GroupSize | 1
    await driver.findElement(By.id("GroupSize")).sendKeys("1")
    // 11 | click | id=addMemberBtn | 
    await driver.findElement(By.id("addMemberBtn")).click()
    // 12 | select | id=members | label=NWUNELI LUCY
    {
      const dropdown = await driver.findElement(By.id("members"))
      await dropdown.findElement(By.xpath("//option[. = 'NWUNELI LUCY']")).click()
    }
    // 13 | click | css=option | 
    await driver.findElement(By.css("option")).click()
    // 14 | click | id=deleteMemberBtn | 
    await driver.findElement(By.id("deleteMemberBtn")).click()
    // 15 | assertAlert | ERROR! You must work in this function before to send to Staging Environment! | 
    assert(await driver.switchTo().alert().getText() == "ERROR! You must work in this function before to send to Staging Environment!")
    // 16 | click | id=lastname | 
    await driver.findElement(By.id("lastname")).click()
    // 17 | type | id=lastname | Lucy Chiamaka
    await driver.findElement(By.id("lastname")).sendKeys("Lucy Chiamaka")
    // 18 | click | id=firstname | 
    await driver.findElement(By.id("firstname")).click()
    // 19 | type | id=firstname | LUCY
    await driver.findElement(By.id("firstname")).sendKeys("LUCY")
    // 20 | click | id=addMemberBtn | 
    await driver.findElement(By.id("addMemberBtn")).click()
    // 21 | click | id=sortMemberListBtn | 
    await driver.findElement(By.id("sortMemberListBtn")).click()
    let resultText = await driver.findElement(By.id('result')).getText();

        if (resultText !== "CLICK GENERATE") {
            console.log('Test Success');
        } else {
            console.log('Test Failed');
        }
  
  }
  catch (error) {
    console.log('An error accurred:', error);
} finally {
    await driver.quit();
}
}

