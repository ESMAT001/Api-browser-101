const puppeteer = require('puppeteer');
const got = require('got');

async function getRandomGeolocation() {
  const {
    nearest = {
      latt: Math.random() * (90 - -90) + -90,
      longt: Math.random() * (180 - -180) + -180
    } } = await got("https://api.3geonames.org/?randomland=yes&json=1").json();

  return { latitude: parseFloat(nearest.latt), longitude: parseFloat(nearest.longt) };
}

function sleep(sleepDuration) {
  const now = new Date();
  let prevSec = now.getSeconds();
  let secCounter = 0;
  while (new Date().getTime() < now.getTime() + sleepDuration) {

    if (prevSec < new Date().getSeconds()) {
      secCounter++
      console.log(`${secCounter}sec`)
      prevSec = new Date().getSeconds();
    }

  }
}

const getLoadMethod = load => {
  load = parseInt(load);
  switch (load) {
    case 1:
      return "load";
    case 2:
      return "networkidle0";
    case 3:
      return "networkidle2";
    default:
      return "load";
  }
}


const takePhoto = async ({ url = "https://www.google.com/", wait = null, load = 1 } = {}) => {
  console.log(url)
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  const location = await getRandomGeolocation();
  await page.setGeolocation(location);
  await page.goto(url, { waitUntil: getLoadMethod(load), timeout: 0 });

  if (wait) {
    wait = parseInt(wait);
    console.log(`waiting for ${wait}sec`)
    sleep(wait * 1000);
    console.log('after wait')
  }

  await page.screenshot({ path: 'example1.png' });
  await browser.close();
}
module.exports = takePhoto;