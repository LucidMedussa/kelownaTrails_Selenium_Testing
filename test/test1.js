const { By, Key, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function test_case() {

    // Set Chrome options
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('disable-gpu');
    options.setChromeBinaryPath('/usr/bin/google-chrome');

    // Create a Driver
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

    try {
        // Send driver to website
        await driver.get("file:///path/to/your/index.html");

        // Add a member
        await driver.findElement(By.id('lastname')).sendKeys('Doe');
        await driver.findElement(By.id('firstname')).sendKeys('John');
        await driver.findElement(By.id('addMemberBtn')).click();
        
        // Verify the member was added
        let members = await driver.findElement(By.id('members')).getText();
        if (members.includes('Doe, John')) {
            console.log('Add Member Test: Success');
        } else {
            console.log('Add Member Test: Failed');
        }

        // Delete the member
        await driver.findElement(By.id('members')).sendKeys(Key.ARROW_DOWN); // Select the first member
        await driver.findElement(By.id('deleteMemberBtn')).click();
        
        // Verify the member was deleted
        members = await driver.findElement(By.id('members')).getText();
        if (!members.includes('Doe, John')) {
            console.log('Delete Member Test: Success');
        } else {
            console.log('Delete Member Test: Failed');
        }

        // Add multiple members to test sorting
        await driver.findElement(By.id('lastname')).sendKeys('Doe');
        await driver.findElement(By.id('firstname')).sendKeys('John');
        await driver.findElement(By.id('addMemberBtn')).click();
        await driver.findElement(By.id('lastname')).sendKeys('Smith');
        await driver.findElement(By.id('firstname')).sendKeys('Jane');
        await driver.findElement(By.id('addMemberBtn')).click();

        // Sort the member list
        await driver.findElement(By.id('sortMemberListBtn')).click();

        // Verify the list is sorted
        members = await driver.findElement(By.id('members')).getText();
        let membersArray = members.split('\n');
        let sortedMembers = [...membersArray].sort();

        if (JSON.stringify(membersArray) === JSON.stringify(sortedMembers)) {
            console.log('Sort Member List Test: Success');
        } else {
            console.log('Sort Member List Test: Failed');
        }

    } catch (error) {
        console.log('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}

test_case();
