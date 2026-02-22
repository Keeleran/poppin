const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = '/Users/Anonymous/.gemini/antigravity/brain/9e42955a-8a12-442d-af4f-9bb9c70431cf';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1200, height: 800 } });
    const page = await context.newPage();

    await page.goto('http://127.0.0.1:5501/index.html');
    await page.evaluate(() => {
        localStorage.setItem('poppin_user_token', '7b3a1dc0e8f2c5d6a9b4e1f0c3d5a7b9');
        localStorage.setItem('poppin_active_borough', 'manhattan');
    });

    const ts = Date.now();

    await page.goto('http://127.0.0.1:5501/profile.html');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'profile_badges_' + ts + '.png'), fullPage: true });

    await page.goto('http://127.0.0.1:5501/borough-select.html');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'heatmap_boroughs_' + ts + '.png'), fullPage: true });

    await page.goto('http://127.0.0.1:5501/dashboard.html');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'viral_bar_dashboard_' + ts + '.png'), fullPage: true });

    await browser.close();
    console.log('Screenshots saved to ' + ARTIFACT_DIR);
})();
