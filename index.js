const puppeteer = require('puppeteer');
const { PuppeteerBlocker } = require('@ghostery/adblocker-puppeteer');

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
  AFTER_ACCOUNT: 5000,
  AFTER_LOGIN: 5000,
  TOBE_SAFE: 3000
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

    // Ativa o bloqueador de anúncios na aba atual
    const blocker = await PuppeteerBlocker.fromPrebuiltFull(fetch);
    await blocker.enableBlockingInPage(page);

    await page.setViewport({ width: 1920, height: 1080 });

    // Define a URL pegando da secret
    const ADDR_URL = process.env.ACCESS_URL;

    console.log('Acessando o endereço...');
    await page.goto(ADDR_URL, { 
      waitUntil: 'networkidle2', 
      timeout: DELAYS.PAGE_LOAD_TIMEOUT 
    });
    
    console.log(`Aguardando carregamento inicial por ${DELAYS.AFTER_PAGE_LOAD / 1000} segundos...`);
    await new Promise(r => setTimeout(r, DELAYS.AFTER_PAGE_LOAD));

    console.log('Clicando em Play (Introdução)...');
    await page.mouse.click(POSITIONS.PLAY_INTRO.x, POSITIONS.PLAY_INTRO.y);

    console.log(`Aguardando transição por ${DELAYS.AFTER_PLAY / 1000} segundos...`);
    await new Promise(r => setTimeout(r, DELAYS.AFTER_PLAY));

    console.log('Clicando em Profile...');
    await page.mouse.click(POSITIONS.PROFILE.x, POSITIONS.PROFILE.y);

    console.log(`Aguardando menu de perfil por ${DELAYS.AFTER_PROFILE / 1000} segundos...`);
    await new Promise(r => setTimeout(r, DELAYS.AFTER_PROFILE));

    console.log('Clicando em Account...');
    await page.mouse.click(POSITIONS.ACCOUNT.x, POSITIONS.ACCOUNT.y);

    console.log(`Aguardando carregamento da conta por ${DELAYS.AFTER_ACCOUNT / 1000} segundos...`);
    await new Promise(r => setTimeout(r, DELAYS.AFTER_ACCOUNT));

    // Clicar no campo de Login e digitar o usuário
    console.log('Clicando no campo de Login...');
    await page.mouse.click(POSITIONS.LOGIN_FIELD.x, POSITIONS.LOGIN_FIELD.y);
    await page.keyboard.type(process.env.ACCESS_USERNAME);

    // Delay de segurança
    console.log(`Aguardando ${DELAYS.TOBE_SAFE / 1000} segundos para evitar treta...`);
    await new Promise(r => setTimeout(r, DELAYS.TOBE_SAFE));
    
    // Clicar no campo de Password e digitar a senha
    console.log('Clicando no campo de Password...');
    await page.mouse.click(POSITIONS.PASSWORD_FIELD.x, POSITIONS.PASSWORD_FIELD.y);
    await page.keyboard.type(process.env.ACCESS_PASSWORD);

    // Delay de segurança
    console.log(`Aguardando ${DELAYS.TOBE_SAFE / 1000} segundos para evitar treta...`);
    await new Promise(r => setTimeout(r, DELAYS.TOBE_SAFE));

    // Clicar no botão Login
    console.log('Clicando no botão Login...');
    await page.mouse.click(POSITIONS.LOGIN_BTN.x, POSITIONS.LOGIN_BTN.y);

    // Delay para carregar a página
    console.log(`Aguardando carregamento da página por ${DELAYS.AFTER_LOGIN / 1000} segundos...`);
    await new Promise(r => setTimeout(r, DELAYS.AFTER_LOGIN))
    
    // Clicar em Shop
    console.log('Clicando em Shop...');
    await page.mouse.click(POSITIONS.SHOP.x, POSITIONS.SHOP.y);

    // Delay de segurança
    console.log(`Aguardando ${DELAYS.TOBE_SAFE / 1000} segundos para evitar treta...`);
    await new Promise(r => setTimeout(r, DELAYS.TOBE_SAFE));

    // Clicar em Resources
    console.log('Clicando em Resources...');
    await page.mouse.click(POSITIONS.RESOURCES.x, POSITIONS.RESOURCES.y);

    // Delay de segurança
    console.log(`Aguardando ${DELAYS.TOBE_SAFE / 1000} segundos para evitar treta...`)
    await new Promise(r => setTimeout(r, DELAYS.TOBE_SAFE));

    // Clicar em Claim gems
    console.log('Clicando em Claim gems...');
    await page.mouse.click(POSITIONS.CLAIM_GEMS.x, POSITIONS.CLAIM_GEMS.y);

    // Delay de segurança
    console.log(`Aguardando ${DELAYS.TOBE_SAFE / 1000} segundos para evitar treta...`)
    await new Promise(r => setTimeout(r, DELAYS.TOBE_SAFE));

    // Clicar em Claim Gold
    console.log('Clicando em Claim Gold...');
    await page.mouse.click(POSITIONS.CLAIM_GOLD.x, POSITIONS.CLAIM_GOLD.y);

    // Delay de segurança
    console.log(`Aguardando ${DELAYS.TOBE_SAFE / 1000} segundos para evitar treta...`)
    await new Promise(r => setTimeout(r, DELAYS.TOBE_SAFE));

    // Capturar screenshot final de validação - Descomente para testes/troubleshooting
    // console.log('Salvando screenshot final...');
    // await page.screenshot({ path: 'resultado.png' });

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
