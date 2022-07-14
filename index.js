import { getNewPage, screenshot } from './browser.js'

import got from 'got';

async function getRandomGeolocation() {
  const {
    nearest = {
      latt: Math.random() * (90 - -90) + -90,
      longt: Math.random() * (180 - -180) + -180
    } } = await got("https://api.3geonames.org/?randomland=yes&json=1").json();

  return { latitude: parseFloat(nearest.latt), longitude: parseFloat(nearest.longt) };
}

function sleep(sleepDuration) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), sleepDuration * 1000)
  })
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


export default async function getPhoto({ url = "https://www.google.com/", wait = 0, load = 1 } = {}) {
  console.log(url)
  
  const page = await getNewPage(url, {waitUntil: getLoadMethod(load), timeout: 0})

  console.log(`waiting ${wait}sec`);
  await sleep(wait);
  

  const image = await screenshot(page);
  return image
}
