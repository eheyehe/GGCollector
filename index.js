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
  AFTER_ACCOUNT: 5000,
  TOBESAFE: 3000
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

    // 9. Clicar no campo de Login e digitar o usuário
    console.log('9. Clicando no campo de Login...');
    await page.mouse.click(POSITIONS.LOGIN_FIELD.x, POSITIONS.LOGIN_FIELD.y);
    await page.keyboard.type(process.env.EVOWARS_USER || 'SEU_USUARIO');

    // 10. Delay de 3 segundos por segurança
    console.log('10. Aguardando 3 segundos...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 11. Clicar no campo de Password e digitar a senha
    console.log('11. Clicando no campo de Password...');
    await page.mouse.click(POSITIONS.PASSWORD_FIELD.x, POSITIONS.PASSWORD_FIELD.y);
    await page.keyboard.type(process.env.EVOWARS_PASSWORD || 'SUA_SENHA');

    // 12. Delay de 3 segundos por segurança
    console.log('12. Aguardando 3 segundos...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 13. Clicar no botão Login
    console.log('13. Clicando no botão Login...');
    await page.mouse.click(POSITIONS.LOGIN_BTN.x, POSITIONS.LOGIN_BTN.y);

    // 14. Delay de 5 segundos para carregar a página
    console.log('14. Aguardando 5 segundos...');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // 15. Clicar em Shop
    console.log('15. Clicando em Shop...');
    await page.mouse.click(POSITIONS.SHOP.x, POSITIONS.SHOP.y);

    // 16. Delay de 3 segundos por segurança
    console.log('16. Aguardando 3 segundos...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 17. Clicar em Resources
    console.log('17. Clicando em Resources...');
    await page.mouse.click(POSITIONS.RESOURCES.x, POSITIONS.RESOURCES.y);

    // 18. Delay de 3 segundos por segurança
    console.log('18. Aguardando 3 segundos...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 19. Clicar em Claim gems
    console.log('19. Clicando em Claim gems...');
    await page.mouse.click(POSITIONS.CLAIM_GEMS.x, POSITIONS.CLAIM_GEMS.y);

    // 20. Delay de 3 segundos por segurança
    console.log('20. Aguardando 3 segundos...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 21. Clicar em Claim Gold
    console.log('21. Clicando em Claim Gold...');
    await page.mouse.click(POSITIONS.CLAIM_GOLD.x, POSITIONS.CLAIM_GOLD.y);

    // 22. Delay de 3 segundos por segurança
    console.log('22. Aguardando 3 segundos...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

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
