const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const base = 'http://127.0.0.1:4173';
  const sizes = [
    { width: 320, height: 720 }, { width: 375, height: 812 },
    { width: 390, height: 844 }, { width: 430, height: 932 },
    { width: 768, height: 1024 }, { width: 1024, height: 768 },
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

    const metrics = await page.evaluate(() => {
      const links = [...document.querySelectorAll('a')];
      const quickCards = [...document.querySelectorAll('.quick-card')];
      const lastCard = quickCards.at(-1)?.getBoundingClientRect();
      return {
        title: document.title,
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1: document.querySelector('h1')?.textContent?.trim(),
        heroExists: Boolean(document.querySelector('.hero')),
        quickOptions: quickCards.map(el => el.textContent.trim()),
        optionsStartVisible: Boolean(quickCards[0] && quickCards[0].getBoundingClientRect().top < innerHeight),
        allOptionsInFirstViewport: Boolean(lastCard && lastCard.bottom <= innerHeight),
        parkingText: document.body.textContent.includes('Estacionamento gratuito no local'),
        instagramVisible: links.some(a => a.textContent.includes('Instagram')),
        menuHref: links.find(a => a.textContent.includes('cardápio'))?.getAttribute('href'),
        whatsappHref: links.find(a => a.textContent.includes('Fale conosco'))?.getAttribute('href'),
        directionsHref: links.find(a => a.textContent.includes('Como chegar'))?.getAttribute('href'),
        mapsHref: links.find(a => a.textContent.includes('Abrir no Google Maps'))?.getAttribute('href'),
      };
    });

    if ([390, 768, 1440].includes(size.width)) {
      await page.screenshot({ path: path.join(__dirname, `start-${size.width}.png`) });
    }

    if (size.width === 390) {
      await page.locator('a[href="#localizacao"]').click();
      await page.waitForTimeout(650);
      metrics.smartScroll = await page.evaluate(() => ({
        hash: location.hash,
        activeId: document.activeElement?.id,
        targetTop: Math.round(document.querySelector('#localizacao').getBoundingClientRect().top),
      }));
      await page.locator('a[href="#informacoes"]').first().click();
      await page.waitForTimeout(650);
      metrics.infoScroll = await page.evaluate(() => ({ hash: location.hash, activeId: document.activeElement?.id }));
      await page.locator('.gallery-item button').first().click();
      await page.waitForSelector('.lightbox');
      await page.keyboard.press('ArrowRight');
      metrics.lightboxVisible = await page.locator('.lightbox').isVisible();
      await page.keyboard.press('Escape');
      metrics.lightboxClosed = await page.locator('.lightbox').count() === 0;
    }

    if ([390, 768, 1440].includes(size.width)) {
      const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < pageHeight; y += Math.max(400, Math.floor(size.height * 0.7))) {
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
        await page.waitForTimeout(100);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(150);
      await page.screenshot({ path: path.join(__dirname, `page-${size.width}.png`), fullPage: true });
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
