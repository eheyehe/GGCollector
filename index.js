const puppeteer = require('puppeteer');

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
    await page.goto('https://evowars.io/', { waitUntil: 'networkidle2', timeout: 30000 });

    console.log('2. Aguardando 10s...');
    await page.sleep ? await page.sleep(10000) : await new Promise(r => setTimeout(r, 10000));

    console.log('3. Clicando em Play...');
    await page.mouse.click(960, 650);

    console.log('4. Aguardando 20s...');
    await new Promise(r => setTimeout(r, 20000));

    console.log('5. Clicando em Profile...');
    await page.mouse.click(70, 70);

    console.log('6. Aguardando 5s...');
    await new Promise(r => setTimeout(r, 5000));

    console.log('7. Clicando em Account...');
    await page.mouse.click(960, 400);

    console.log('8. Aguardando carregamento da conta...');
    await new Promise(r => setTimeout(r, 5000));

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
