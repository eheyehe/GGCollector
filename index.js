const puppeteer = require('puppeteer');

const POSITIONS = {
  PLAY_INTRO: { x: 960, y: 920 },
  PROFILE: { x: 120, y: 245 },
  ACCOUNT: { x: 1280, y: 60 },
  LOGIN_FIELD: { x: 1090, y: 320 },
  PASSWORD_FIELD: { x: 1090, y: 405 },
  LOGIN_BTN: { x: 1090, y: 490 },
  SHOP: { x: 135, y: 415 },
  RESOURCES: { x: 1120, y: 60 },
  CLAIM_GEMS: { x: 1000, y: 535 },
  CLAIM_GOLD: { x: 1000, y: 840 }
};

const DELAYS = {
  PAGE_LOAD_TIMEOUT: 30000,
  AFTER_PAGE_LOAD: 10000,
  AFTER_PLAY: 20000,
  AFTER_PROFILE: 5000,
  AFTER_ACCOUNT: 5000
};

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--use-gl=swiftshader',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--window-size=1920,1080'
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('1. Acessando Evowars.io...');
    await page.goto('https://evowars.io/', { 
      waitUntil: 'networkidle2', 
      timeout: DELAYS.PAGE_LOAD_TIMEOUT 
    });

    console.log('2. Aguardando carregamento inicial...');
    await new Promise(r => setTimeout(r, DELAYS.AFTER_PAGE_LOAD));

    console.log('3. Clicando em Play (Introdução)...');
    await page.mouse.click(POSITIONS.PLAY_INTRO.x, POSITIONS.PLAY_INTRO.y);

    console.log('4. Aguardando transição...');
    await new Promise(r => setTimeout(r, DELAYS.AFTER_PLAY));

    console.log('5. Clicando em Profile...');
    await page.mouse.click(POSITIONS.PROFILE.x, POSITIONS.PROFILE.y);

    console.log('6. Aguardando menu de perfil...');
    await new Promise(r => setTimeout(r, DELAYS.AFTER_PROFILE));

    console.log('7. Clicando em Account...');
    await page.mouse.click(POSITIONS.ACCOUNT.x, POSITIONS.ACCOUNT.y);

    console.log('8. Aguardando carregamento da conta...');
    await new Promise(r => setTimeout(r, DELAYS.AFTER_ACCOUNT));

    console.log('Execução concluída.');
  } catch (error) {
    console.error('Erro na execução:', error.message);
    if (browser) {
      const pages = await browser.pages();
      if (pages.length > 0) {
        await pages[0].screenshot({ path: 'erro.png' });
        console.log('Screenshot de erro salvo como erro.png.');
      }
    }
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
