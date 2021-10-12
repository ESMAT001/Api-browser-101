const puppeteer = require('puppeteer');
const got = require('got');

async function miner(url, count = 3) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    for (let index = 0; index < count; index++) {
        // await got(url);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
        console.log(index + 1, "of", count);
    }


    // const location = await getRandomGeolocation();
    // await page.setGeolocation(location);


    // await page.screenshot({ path: 'example1.png' });
    // console.log("done");
    await browser.close();
}



module.exports = miner;
