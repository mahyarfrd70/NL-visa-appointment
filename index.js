const puppeteer = require('puppeteer');
var CronJob = require('cron').CronJob;
const sound = require("sound-play");

(async ()=>{
    const browser = await puppeteer.launch({
        headless: false,       
        defaultViewport: null,     
        ignoreDefaultArgs: [
            "--mute-audio",
        ],
        args: [
            "--autoplay-policy=no-user-gesture-required",
        ],
    })
    // OpenDateAllocated
    // plhMain_gvSlot_lnkTimeSlot_0
    const page = await browser.newPage()
    page.on('dialog', async dialog => {
        await dialog.accept();
	});
    new CronJob(
        '0 */3 * * * *',
        async function() {
            try{
                await page.goto("https://www.vfsvisaonline.com/Netherlands-Global-Online-Appointment_Zone2/AppScheduling/AppWelcome.aspx?P=Y83R/PGUiM5WxqKHxt0UdPpZ6gYbP6R8WaUj23z35vc=")
                await page.waitForSelector('#plhMain_lnkSchApp')
                await page.click('#plhMain_lnkSchApp')
                await page.waitForSelector('#plhMain_cboVisaCategory')
                await page.select('#plhMain_cboVisaCategory', "8")
                await page.click('#plhMain_btnSubmit')
                await page.waitForSelector('#plhMain_repAppVisaDetails_cboTitle_0', {timeout:60000})
                await page.select('#plhMain_repAppVisaDetails_cboTitle_0', "MR.")
                await page.type('#plhMain_repAppVisaDetails_tbxFName_0', "MAHYAR")
                await page.type('#plhMain_repAppVisaDetails_tbxLName_0', "FARD")
                await page.type('#plhMain_repAppVisaDetails_tbxContactNumber_0', "9383673568")
                await page.type('#plhMain_repAppVisaDetails_tbxEmailAddress_0', "mahyarfrd@gmail.com")
                await page.select('#plhMain_cboConfirmation', "1")
                await page.click('#plhMain_btnSubmit')
                await page.waitForSelector('#plhMain_cldAppointment', {timeout:60000})
                const title = await page.$eval('.OpenDateAllocated a', element=>element ? element.getAttribute('title'):"")
                console.log(title)
                if(
                    title === 'June 23'|| 
                    title === 'June 26'|| 
                    title === 'June 27'||
                    title === 'June 28'|| 
                    title === 'June 29' ||
                    title === 'June 30'|| 
                    title === 'July 1' || 
                    title === 'July 3' || 
                    title === 'July 4'|| 
                    title === 'July 5' || 
                    title === 'July 6' || 
                    title === 'July 7'
                ){
                    sound.play('./alarm.mp3');
                    await page.click('.OpenDateAllocated a')
                    await page.waitForSelector('#plhMain_gvSlot_lnkTimeSlot_0', {timeout:60000})
                    await page.click('#plhMain_gvSlot_lnkTimeSlot_0')
                }
            }catch{}
        },
        null,
        true,
        'Asia/Tehran'
    );
    // job.start()
})()