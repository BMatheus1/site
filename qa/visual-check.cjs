const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const base = 'http://127.0.0.1:4173';
  const sizes = [
    { width: 320, height: 720 },
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ];
  const results = [];
  for (const size of sizes) {
    const context = await browser.newContext({ viewport: size, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(base, { waitUntil: 'networkidle' });
    const metrics = await page.evaluate(() => ({
      title: document.title,
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      headings: [...document.querySelectorAll('h1,h2')].map(el => el.textContent.trim()),
      instagramVisible: [...document.querySelectorAll('a')].some(a => a.textContent.includes('Instagram')),
      menuHref: [...document.querySelectorAll('a')].find(a => a.textContent.includes('cardápio'))?.getAttribute('href'),
      whatsappHref: [...document.querySelectorAll('a')].find(a => a.textContent.includes('Entre em contato'))?.getAttribute('href'),
      mapsHref: [...document.querySelectorAll('a')].find(a => a.textContent.includes('Como chegar'))?.getAttribute('href'),
    }));
    if ([390, 768, 1440].includes(size.width)) {
      await page.screenshot({ path: path.join(__dirname, `hero-${size.width}.png`) });
      const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < pageHeight; y += Math.max(400, Math.floor(size.height * 0.7))) {
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
        await page.waitForTimeout(120);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(180);
      await page.screenshot({ path: path.join(__dirname, `page-${size.width}.png`), fullPage: true });
    }
    if (size.width === 390) {
      await page.locator('.gallery-item button').first().click();
      await page.waitForSelector('.lightbox');
      await page.keyboard.press('ArrowRight');
      const dialogVisible = await page.locator('.lightbox').isVisible();
      await page.keyboard.press('Escape');
      const dialogClosed = await page.locator('.lightbox').count() === 0;
      metrics.lightbox = { dialogVisible, dialogClosed };
    }
    results.push({ size, status: response?.status(), errors, ...metrics, noHorizontalOverflow: metrics.scrollWidth <= metrics.width });
    await context.close();
  }
  const menuResponse = await fetch(`${base}/cardapio.pdf`, { method: 'HEAD' });
  results.push({ menuPdfStatus: menuResponse.status, menuPdfLength: menuResponse.headers.get('content-length') });
  fs.writeFileSync(path.join(__dirname, 'results.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });



