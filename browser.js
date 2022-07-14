import puppeteer from 'puppeteer';

let browser = null
export async function getNewPage(url, options) {
    if(browser === null) {
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    }

    const page = await browser.newPage();
    page.setViewport({width: 1920, height: 1080})
    if(url) {
        await page.goto(url, options)
    }
    return page;
}

export async function screenshot(page) {
    const fileBinary = await page.screenshot({fullPage: true})
    console.log("fileSize: " + fileBinary.length + ' bytes');

    return fileBinary;
}