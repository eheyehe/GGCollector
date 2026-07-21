const puppeteer = require('puppeteer');

// ==========================================
// CONSTANTES: COORDENADAS (1920x1080)
// ==========================================
const COORDS = {
    PLAY: { x: 960, y: 888 },
    PROFILE: { x: 75, y: 220 },
    ACCOUNT: { x: 1284, y: 117 },
    LOGIN_FIELD: { x: 1083, y: 354 },
    PASSWORD_FIELD: { x: 1083, y: 430 },
    LOGIN_BUTTON: { x: 1083, y: 503 },
    SHOP: { x: 100, y: 300 },       // Ajuste a coordenada X, Y se necessário
    RESOURCES: { x: 500, y: 200 },  // Ajuste a coordenada X, Y se necessário
    CLAIM_GEMS: { x: 800, y: 600 }, // Ajuste a coordenada X, Y se necessário
    CLAIM_GOLD: { x: 1100, y: 600 } // Ajuste a coordenada X, Y se necessário
};

// ==========================================
// CONSTANTES: DELAYS (em milissegundos)
// ==========================================
const DELAYS = {
    PAGE_LOAD: 10000,
    AFTER_PLAY: 20000,
    AFTER_PROFILE: 5000,
    AFTER_ACCOUNT: 3000,
    AFTER_LOGIN_FIELD: 3000,
    AFTER_PASSWORD_FIELD: 3000,
    AFTER_LOGIN_BTN: 5000,
    AFTER_SHOP: 3000,
    AFTER_RESOURCES: 3000,
    AFTER_CLAIM_GEMS: 3000,
    AFTER_CLAIM_GOLD: 3000
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        protocolTimeout: 0,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1920,1080',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--mute-audio',
            '--disable-background-networking',
            '--no-first-run',
            '--disable-crash-reporter',
            '--disable-breakpad',
            '--no-report-upload',
            '--disk-cache-size=1',
            '--media-cache-size=1',
            '--disable-gpu-shader-disk-cache',
            '--disable-application-cache',
            '--disable-gpu',
            '--use-gl=swiftshader',
            '--disable-dev-shm-usage'
        ]
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        // Interceptação leve para bloquear mídia pesada e rastreadores
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            const resourceType = req.resourceType();
            const url = req.url();
            if (
                resourceType === 'media' ||
                url.includes('google-analytics') ||
                url.includes('analytics') ||
                url.includes('scorecardresearch')
            ) {
                req.abort();
            } else {
                req.continue();
            }
        });

        // 1. Acessar evowars.io
        console.log("1. Acessando Evowars.io...");
        await page.goto('https://evowars.io/', { waitUntil: 'networkidle2', timeout: 60000 });

        // 2. Delay: 10 segundos para carregar a página
        console.log("2. Aguardando 10s...");
        await sleep(DELAYS.PAGE_LOAD);

        // 3. Clique: Play
        console.log("3. Clicando em Play...");
        await page.mouse.click(COORDS.PLAY.x, COORDS.PLAY.y);

        // 4. Delay: 20 segundos para carregar a página
        console.log("4. Aguardando 20s...");
        await sleep(DELAYS.AFTER_PLAY);

        // 5. Clique: Profile
        console.log("5. Clicando em Profile...");
        await page.mouse.click(COORDS.PROFILE.x, COORDS.PROFILE.y);

        // 6. Delay: 5 segundos por segurança
        console.log("6. Aguardando 5s...");
        await sleep(DELAYS.AFTER_PROFILE);

        // 7. Clique: Account
        console.log("7. Clicando em Account...");
        await page.mouse.click(COORDS.ACCOUNT.x, COORDS.ACCOUNT.y);

        // 8. Delay: 3 segundos por segurança
        console.log("8. Aguardando 3s...");
        await sleep(DELAYS.AFTER_ACCOUNT);

        const usuario = process.env.EVOWARS_USER || '';
        const senha = process.env.EVOWARS_PASSWORD || '';

        // 9. Clique: Campo Login
        console.log("9. Clicando no Campo Login...");
        await page.mouse.click(COORDS.LOGIN_FIELD.x, COORDS.LOGIN_FIELD.y);
        await page.keyboard.type(usuario, { delay: 50 });

        // 10. Delay: 3 segundos por segurança
        console.log("10. Aguardando 3s...");
        await sleep(DELAYS.AFTER_LOGIN_FIELD);

        // 11. Clique: Campo Password
        console.log("11. Clicando no Campo Password...");
        await page.mouse.click(COORDS.PASSWORD_FIELD.x, COORDS.PASSWORD_FIELD.y);
        await page.keyboard.type(senha, { delay: 50 });

        // 12. Delay: 3 segundos por segurança
        console.log("12. Aguardando 3s...");
        await sleep(DELAYS.AFTER_PASSWORD_FIELD);

        // 13. Clique: Botão Login
        console.log("13. Clicando no Botão Login...");
        await page.mouse.click(COORDS.LOGIN_BUTTON.x, COORDS.LOGIN_BUTTON.y);

        // 14. Delay: 5 segundos para carregar a página
        console.log("14. Aguardando 5s...");
        await sleep(DELAYS.AFTER_LOGIN_BTN);

        // 15. Clique: Shop
        console.log("15. Clicando em Shop...");
        await page.mouse.click(COORDS.SHOP.x, COORDS.SHOP.y);

        // 16. Delay: 3 segundos por segurança
        console.log("16. Aguardando 3s...");
        await sleep(DELAYS.AFTER_SHOP);

        // 17. Clique: Resources
        console.log("17. Clicando em Resources...");
        await page.mouse.click(COORDS.RESOURCES.x, COORDS.RESOURCES.y);

        // 18. Delay: 3 segundos por segurança
        console.log("18. Aguardando 3s...");
        await sleep(DELAYS.AFTER_RESOURCES);

        // 19. Clique: Claim gems
        console.log("19. Clicando em Claim Gems...");
        await page.mouse.click(COORDS.CLAIM_GEMS.x, COORDS.CLAIM_GEMS.y);

        // 20. Delay: 3 segundos por segurança
        console.log("20. Aguardando 3s...");
        await sleep(DELAYS.AFTER_CLAIM_GEMS);

        // 21. Clique: Claim Gold
        console.log("21. Clicando em Claim Gold...");
        await page.mouse.click(COORDS.CLAIM_GOLD.x, COORDS.CLAIM_GOLD.y);

        // 22. Delay: 3 segundos por segurança
        console.log("22. Aguardando 3s...");
        await sleep(DELAYS.AFTER_CLAIM_GOLD);

        console.log("Execução finalizada com sucesso!");

    } catch (error) {
        console.error("Erro na execução:", error);
    } finally {
        await browser.close();
    }
})();
