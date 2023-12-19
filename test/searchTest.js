const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

async function searchTest() {
  let driver;
  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://hidden-bayou-39635-6fafc891ec3d.herokuapp.com/');

    // Find the search input and enter the query
    const searchInput = await driver.findElement(By.name('title'));
    await searchInput.sendKeys('404', Key.RETURN);

    // Wait for the visibility of an element with the class 'title'
    const titleElement = await driver.wait(until.elementLocated(By.className('title')), 5000);

    // Get the text content of the title element
    const titleText = await titleElement.getText();

    // Check if the text content contains 'Lab'
    if (titleText.includes('Lab')) {
      console.log('Search successful!');
    } else {
      console.error('Error: Title does not contain "Lab". Actual title:', titleText);
    }
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

searchTest();
