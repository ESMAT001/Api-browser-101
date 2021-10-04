const puppeteer = require('puppeteer');

const takePhoto = async ({ url = "https://www.google.com/" } = {}) => {
  console.log(url)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.goto(url, { waitUntil: 'load', timeout: 0 });
  // await page.waitForTimeout(60 * 1000)
  await page.screenshot({ path: 'example1.png' });

  await browser.close();
}
module.exports = takePhoto;