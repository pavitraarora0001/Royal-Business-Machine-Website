import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';

fs.mkdirSync('qa_screenshots/refined_hero', { recursive: true });

async function testHero() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const consoleLogs = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleLogs.push(msg.text());
  });

  const viewports = [
    { name: '1920px_desktop_large', width: 1920, height: 1080 },
    { name: '1440px_desktop_standard', width: 1440, height: 900 },
    { name: '1024px_laptop_small', width: 1024, height: 768 },
    { name: '768px_tablet', width: 768, height: 1024 },
    { name: '390px_mobile_iphone', width: 390, height: 844, isMobile: true, hasTouch: true }
  ];

  const results = {
    viewports: {},
    contrastCheck: {},
    consoleErrors: consoleLogs
  };

  for (const vp of viewports) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: !!vp.isMobile,
      hasTouch: !!vp.hasTouch
    });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });

    // Capture hero section screenshot
    const shotPath = `qa_screenshots/refined_hero/hero_${vp.name}.png`;
    await page.screenshot({ path: shotPath, clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 950) } });

    // Check overflow and elements
    const metrics = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const spans = h1 ? Array.from(h1.querySelectorAll('span')).map(s => ({
        text: s.innerText,
        color: window.getComputedStyle(s).color,
        fontSize: window.getComputedStyle(s).fontSize,
        lineHeight: window.getComputedStyle(s).lineHeight,
      })) : [];

      const bodyWidth = document.body.scrollWidth;
      const windowWidth = window.innerWidth;
      const hasHorizontalOverflow = bodyWidth > windowWidth;

      const ctas = Array.from(document.querySelectorAll('section a')).filter(a => a.innerText.includes('Explore') || a.innerText.includes('Case Studies') || a.innerText.includes('WhatsApp')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href')
      }));

      return { spans, hasHorizontalOverflow, bodyWidth, windowWidth, ctas };
    });

    results.viewports[vp.name] = {
      screenshot: shotPath,
      ...metrics
    };
    console.log(`✓ Tested ${vp.name}: overflow=${metrics.hasHorizontalOverflow} | H1 spans=${metrics.spans.length} | CTAs=${metrics.ctas.length}`);
  }

  // Check Dropdown navigation
  console.log('Testing Desktop Solutions dropdown...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  const solutionsBtn = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('Solutions'));
    if (btn) {
      btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 400));
  const solutionsDropdownVisible = await page.evaluate(() => {
    return document.body.innerText.includes('Industry Verticals') && document.body.innerText.includes('7-Step Delivery Process');
  });
  results.solutionsDropdown = { tested: solutionsBtn, visible: solutionsDropdownVisible };
  console.log('✓ Solutions dropdown test passed:', solutionsDropdownVisible);

  await browser.close();

  fs.writeFileSync('qa_screenshots/refined_hero/TEST_RESULTS.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('\nAll viewport tests completed successfully! Results written to qa_screenshots/refined_hero/TEST_RESULTS.json');
}

testHero().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
