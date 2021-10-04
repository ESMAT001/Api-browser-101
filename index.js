const puppeteer = require('puppeteer');

const takePhoto = async ({ url = "https://www.google.com/", wait = null } = {}) => {
  console.log(url)
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto(url, { waitUntil: 'load', timeout: 0 });

  if (wait) {
    wait = parseInt(wait);
    console.log(`waiting for ${wait}sec`)
    await page.waitForTimeout(wait * 1000)
  }
  await page.screenshot({ path: 'example1.png' });

  await browser.close();
}
module.exports = takePhoto;