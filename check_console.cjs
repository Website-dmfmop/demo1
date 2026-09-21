const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        const page = await browser.newPage();
        
        await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise(r => setTimeout(r, 3000));
        
        const visibility = await page.evaluate(() => {
            return {
                htmlVisibility: getComputedStyle(document.documentElement).visibility,
                htmlDisplay: getComputedStyle(document.documentElement).display,
                bodyVisibility: getComputedStyle(document.body).visibility,
                bodyDisplay: getComputedStyle(document.body).display,
                headStyles: Array.from(document.querySelectorAll('style')).map(s => s.textContent.substring(0, 50))
            };
        });
        console.log('STYLES:', visibility);
        
        await browser.close();
    } catch (err) {
        console.error('PUPPETEER ERROR:', err);
        process.exit(1);
    }
})();
