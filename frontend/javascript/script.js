document.addEventListener('DOMContentLoaded', () => {
    const footerItems = document.querySelectorAll('.footer-item');
    const dashboardView = document.getElementById('dashboard-view');
    const borrowAction = document.querySelector('.action-borrow');
    const borrowFullview = document.getElementById('borrow-fullview');
    const spendAction = document.querySelector('.action-spend');
    const spendPanel = document.getElementById('spend-panel');
    const spendPanelClose = document.getElementById('spend-panel-close');
    const withdrawTrigger = document.getElementById('withdraw-trigger');
    const withdrawPanel = document.getElementById('withdraw-panel');
    const withdrawPanelClose = document.getElementById('withdraw-panel-close');
    const withdrawModeButtons = document.querySelectorAll('.withdraw-mode-btn');
    const withdrawAddressGroup = document.getElementById('withdraw-address-group');
    const withdrawAddressInput = document.getElementById('withdraw-address');
    const withdrawAmountLabel = document.getElementById('withdraw-amount-label');
    const withdrawAmountInput = document.getElementById('withdraw-amount');
    const withdrawSummary = document.getElementById('withdraw-summary');
    const withdrawNextButton = document.getElementById('withdraw-next-btn');
    const borrowBackButton = document.getElementById('borrow-back-btn');
    const saveAction = document.querySelector('.action-save');
    const saveFullview = document.getElementById('save-fullview');
    const saveBackButton = document.getElementById('save-back-btn');
    const homeSection = document.getElementById('home-section');
    const moreSection = document.getElementById('more-section');
    const membershipSection = document.getElementById('membership-section');
    const settingsPage = document.getElementById('settings-page');
    const settingsPageClose = document.getElementById('settings-page-close');
    const securityPage = document.getElementById('security-page');
    const securityPageClose = document.getElementById('security-page-close');
    const referralPage = document.getElementById('referral-page');
    const referralPageClose = document.getElementById('referral-page-close');
    const savedCardPage = document.getElementById('saved-card-page');
    const savedCardPageClose = document.getElementById('saved-card-page-close');
    const investFullview = document.getElementById('invest-fullview');
    const financeFullview = document.getElementById('finance-fullview');
    const investAction = document.querySelector('.action-invest');
    const investBackButton = document.getElementById('invest-back-btn');
    const menuList = document.getElementById('menuList');
    const topbarHeader = document.getElementById('topbar-header');
    const topbarCompact = document.getElementById('topbar-compact');
    const supportToggle = document.getElementById('support-toggle');
    const supportPage = document.getElementById('support-page');
    const supportPageClose = document.getElementById('support-page-close');
    const transactionsToggle = document.getElementById('transactions-toggle');
    const transactionsPage = document.getElementById('transactions-page');
    const transactionsPageClose = document.getElementById('transactions-page-close');
    const profileTrigger = document.getElementById('profile-trigger');
    const profileModal = document.getElementById('profile-modal-backdrop');
    const profileModalClose = document.getElementById('profile-modal-close');
    const deleteAccountButton = document.getElementById('delete-account-btn');
    const restrictAccountButton = document.getElementById('restrict-account-btn');
    const financeTabs = document.querySelectorAll('.finance-tab');
    const financePanels = {
        'savings-panel': document.getElementById('savings-panel'),
        'loan-panel': document.getElementById('loan-panel')
    };
    const savingsTermCards = document.querySelectorAll('.savings-term-card');
    const btcAmountInput = document.getElementById('btc-amount');
    const usdValueInput = document.getElementById('usd-value');
    const convertTrigger = document.getElementById('convert-trigger');
    const convertPanel = document.getElementById('convert-panel');
    const btcConvertInput = document.getElementById('btc-convert-input');
    const convertSummary = document.getElementById('convert-summary');
    const convertedUsd = document.getElementById('converted-usd');
    const convertLabel = document.getElementById('convert-label');
    const convertModeButtons = document.querySelectorAll('.convert-mode-btn');
    const summaryTerm = document.getElementById('summary-term');
    const summaryEarnings = document.getElementById('summary-earnings');
    const summaryTotal = document.getElementById('summary-total');
    const btcAmountLoanInput = document.getElementById('btc-amount-loan');
    const usdValueLoan = document.getElementById('usd-value-loan');
    const ltvSliderLoan = document.getElementById('ltv-slider-loan');
    const ltvValueLoan = document.getElementById('ltv-value-loan');
    const loanPeriodButtons = document.querySelectorAll('.loan-period-btn');
    const calculateLoanButton = document.getElementById('calculate-loan-btn');
    const summaryCollateral = document.getElementById('summary-collateral');
    const summaryLoan = document.getElementById('summary-loan');
    const summaryInterest = document.getElementById('summary-interest');
    const summaryRepayment = document.getElementById('summary-repayment');
    let selectedDays = 360;
    let selectedApy = 15.0;
    let btcPrice = 59850;
    let selectedLoanDays = 30;
    const loanApr = 0.08;

    const formatCurrency = (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    let withdrawMode = 'btc';

    const updateWithdrawPanel = () => {
        if (!withdrawAddressGroup || !withdrawAmountLabel || !withdrawAmountInput || !withdrawSummary) {
            return;
        }

        const isBtc = withdrawMode === 'btc';
        withdrawAddressGroup.classList.toggle('is-hidden', !isBtc);
        withdrawAmountLabel.textContent = isBtc ? 'Amount (BTC)' : 'Amount (USD)';
        withdrawAmountInput.placeholder = isBtc ? '0.000' : '0.00';
        withdrawAmountInput.step = isBtc ? '0.001' : '1';
        withdrawAmountInput.value = isBtc ? '0.000' : '0';
        withdrawSummary.textContent = isBtc
            ? 'Send BTC to the recipient address above.'
            : 'Select the USD amount to send.';

        withdrawModeButtons.forEach((button) => {
            const isActive = button.dataset.mode === withdrawMode;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    };

    const toggleWithdrawPanel = () => {
        if (!withdrawPanel) {
            return;
        }

        const isOpen = withdrawPanel.classList.contains('active');
        withdrawPanel.classList.toggle('active', !isOpen);
        withdrawPanel.classList.toggle('hidden', isOpen);
        withdrawPanel.setAttribute('aria-hidden', String(isOpen));

        if (!isOpen) {
            updateWithdrawPanel();
        }
    };

    const createStockImage = (ticker, color) => {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="24" fill="${color}"/><circle cx="48" cy="48" r="28" fill="rgba(255,255,255,0.18)"/><text x="48" y="54" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="white" text-anchor="middle">${ticker}</text></svg>`;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    };

    const stockItems = [
        { name: 'Walmart', ticker: 'WMT', sector: 'Retail', price: 59.48, change: 1.32, image: 'img/asset/big stable companies/wmt.png' },
        { name: 'Coca-Cola', ticker: 'KO', sector: 'Consumer', price: 63.21, change: 0.84, image: 'img/asset/big stable companies/CocaCola_KO.png' },
        { name: 'Procter & Gamble', ticker: 'PG', sector: 'Consumer', price: 164.34, change: -0.41, image: 'img/asset/big stable companies/pg.png' },
        { name: 'PepsiCo', ticker: 'PEP', sector: 'Consumer', price: 177.62, change: 1.17, image: 'img/asset/big stable companies/pep.png' },
        { name: 'Unilever', ticker: 'UL', sector: 'Consumer', price: 58.91, change: 0.62, image: 'img/asset/big stable companies/ul.png' },
        { name: 'Apple', ticker: 'AAPL', sector: 'Technology', price: 214.89, change: 1.04, image: createStockImage('AAPL', '#FF7A2F') },
        { name: 'Microsoft', ticker: 'MSFT', sector: 'Technology', price: 428.99, change: 0.77, image: createStockImage('MSFT', '#2F80ED') },
        { name: 'NVIDIA', ticker: 'NVDA', sector: 'Technology', price: 126.28, change: 2.54, image: createStockImage('NVDA', '#7C3AED') },
        { name: 'Amazon', ticker: 'AMZN', sector: 'Consumer', price: 184.05, change: -0.38, image: createStockImage('AMZN', '#1F9D78') },
        { name: 'Meta', ticker: 'META', sector: 'Technology', price: 515.23, change: 1.83, image: createStockImage('META', '#0EA5A4') },
        { name: 'Alphabet', ticker: 'GOOGL', sector: 'Technology', price: 172.18, change: 0.95, image: createStockImage('GOOGL', '#2563EB') },
        { name: 'Tesla', ticker: 'TSLA', sector: 'Automotive', price: 243.63, change: -1.16, image: createStockImage('TSLA', '#DC2626') },
        { name: 'Netflix', ticker: 'NFLX', sector: 'Communication', price: 642.80, change: 1.47, image: createStockImage('NFLX', '#F59E0B') },
        { name: 'Oracle', ticker: 'ORCL', sector: 'Technology', price: 164.11, change: 0.66, image: createStockImage('ORCL', '#A16207') },
        { name: 'Intel', ticker: 'INTC', sector: 'Technology', price: 20.12, change: -0.54, image: createStockImage('INTC', '#4B5563') },
        { name: 'Adobe', ticker: 'ADBE', sector: 'Technology', price: 473.61, change: 1.21, image: createStockImage('ADBE', '#7C3AED') },
        { name: 'Salesforce', ticker: 'CRM', sector: 'Technology', price: 284.33, change: -0.63, image: createStockImage('CRM', '#0F766E') },
        { name: 'Cisco', ticker: 'CSCO', sector: 'Technology', price: 50.71, change: 0.51, image: createStockImage('CSCO', '#3B82F6') },
        { name: 'IBM', ticker: 'IBM', sector: 'Technology', price: 236.08, change: -0.28, image: createStockImage('IBM', '#64748B') },
        { name: 'Visa', ticker: 'V', sector: 'Finance', price: 287.45, change: 0.72, image: createStockImage('V', '#1D4ED8') },
        { name: 'Mastercard', ticker: 'MA', sector: 'Finance', price: 540.22, change: 0.89, image: createStockImage('MA', '#7C2D12') },
        { name: 'JPMorgan', ticker: 'JPM', sector: 'Finance', price: 211.87, change: -0.42, image: createStockImage('JPM', '#1E3A8A') },
        { name: 'Bank of America', ticker: 'BAC', sector: 'Finance', price: 43.18, change: 1.14, image: createStockImage('BAC', '#B45309') },
        { name: 'Goldman Sachs', ticker: 'GS', sector: 'Finance', price: 568.31, change: 0.62, image: createStockImage('GS', '#9333EA') },
        { name: 'AT&T', ticker: 'T', sector: 'Communication', price: 16.97, change: 0.34, image: createStockImage('T', '#4F46E5') },
        { name: 'Verizon', ticker: 'VZ', sector: 'Communication', price: 40.89, change: -0.18, image: createStockImage('VZ', '#0F172A') },
        { name: 'Disney', ticker: 'DIS', sector: 'Communication', price: 111.14, change: 1.06, image: createStockImage('DIS', '#2563EB') },
        { name: 'Comcast', ticker: 'CMCSA', sector: 'Communication', price: 41.63, change: 0.58, image: createStockImage('CMCSA', '#1D4ED8') },
        { name: 'Uber', ticker: 'UBER', sector: 'Transportation', price: 71.76, change: -0.86, image: createStockImage('UBER', '#EA580C') },
        { name: 'Delta Air Lines', ticker: 'DAL', sector: 'Transportation', price: 55.92, change: 0.91, image: createStockImage('DAL', '#0F766E') },
        { name: 'Southwest Airlines', ticker: 'LUV', sector: 'Transportation', price: 32.65, change: -0.72, image: createStockImage('LUV', '#C2410C') },
        { name: 'Boeing', ticker: 'BA', sector: 'Aerospace', price: 221.28, change: -1.24, image: createStockImage('BA', '#475569') },
        { name: 'Caterpillar', ticker: 'CAT', sector: 'Industrials', price: 370.74, change: 1.19, image: createStockImage('CAT', '#B45309') },
        { name: 'Deere', ticker: 'DE', sector: 'Industrials', price: 379.68, change: -0.51, image: createStockImage('DE', '#92400E') },
        { name: 'Lockheed Martin', ticker: 'LMT', sector: 'Aerospace', price: 466.85, change: 0.47, image: createStockImage('LMT', '#1D4ED8') },
        { name: 'Raytheon', ticker: 'RTX', sector: 'Aerospace', price: 115.88, change: 0.93, image: createStockImage('RTX', '#4338CA') },
        { name: 'NextEra Energy', ticker: 'NEE', sector: 'Utilities', price: 71.44, change: 0.44, image: createStockImage('NEE', '#16A34A') },
        { name: 'Constellation Energy', ticker: 'CEG', sector: 'Utilities', price: 144.56, change: 1.32, image: createStockImage('CEG', '#059669') },
        { name: 'Exelon', ticker: 'EXC', sector: 'Utilities', price: 41.39, change: -0.33, image: createStockImage('EXC', '#0EA5A4') },
        { name: 'Chevron', ticker: 'CVX', sector: 'Energy', price: 154.05, change: 0.61, image: createStockImage('CVX', '#CA8A04') },
        { name: 'Exxon Mobil', ticker: 'XOM', sector: 'Energy', price: 111.57, change: 0.73, image: createStockImage('XOM', '#F59E0B') },
        { name: 'Shell', ticker: 'SHEL', sector: 'Energy', price: 62.15, change: -0.28, image: createStockImage('SHEL', '#0F766E') },
        { name: 'McDonald\'s', ticker: 'MCD', sector: 'Consumer', price: 301.19, change: 0.42, image: createStockImage('MCD', '#DC2626') },
        { name: 'Starbucks', ticker: 'SBUX', sector: 'Consumer', price: 96.15, change: -0.68, image: createStockImage('SBUX', '#7C2D12') },
        { name: 'Nike', ticker: 'NKE', sector: 'Consumer', price: 91.83, change: 1.09, image: createStockImage('NKE', '#EA580C') },
        { name: 'Costco', ticker: 'COST', sector: 'Consumer', price: 883.51, change: 0.67, image: createStockImage('COST', '#1C7C54') },
        { name: 'Target', ticker: 'TGT', sector: 'Retail', price: 157.09, change: -0.49, image: createStockImage('TGT', '#9333EA') },
        { name: 'Home Depot', ticker: 'HD', sector: 'Consumer', price: 351.42, change: 0.81, image: createStockImage('HD', '#2563EB') },
        { name: 'Lowe\'s', ticker: 'LOW', sector: 'Consumer', price: 242.33, change: -0.36, image: createStockImage('LOW', '#0F766E') },
        { name: 'Advanced Micro Devices', ticker: 'AMD', sector: 'Technology', price: 169.24, change: 1.74, image: createStockImage('AMD', '#7C3AED') },
        { name: 'Broadcom', ticker: 'AVGO', sector: 'Technology', price: 238.73, change: 0.93, image: createStockImage('AVGO', '#2563EB') },
        { name: 'Qualcomm', ticker: 'QCOM', sector: 'Technology', price: 161.68, change: 0.57, image: createStockImage('QCOM', '#EA580C') },
        { name: 'Texas Instruments', ticker: 'TXN', sector: 'Technology', price: 183.47, change: -0.61, image: createStockImage('TXN', '#0F766E') },
        { name: 'ServiceNow', ticker: 'NOW', sector: 'Technology', price: 713.22, change: 1.16, image: createStockImage('NOW', '#1D4ED8') },
        { name: 'Palantir', ticker: 'PLTR', sector: 'Technology', price: 19.86, change: 2.83, image: createStockImage('PLTR', '#7C3AED') },
        { name: 'Shopify', ticker: 'SHOP', sector: 'Technology', price: 62.31, change: 1.47, image: createStockImage('SHOP', '#DC2626') },
        { name: 'Snap', ticker: 'SNAP', sector: 'Technology', price: 12.56, change: -0.92, image: createStockImage('SNAP', '#F59E0B') },
        { name: 'Spotify', ticker: 'SPOT', sector: 'Communication', price: 303.51, change: 1.19, image: createStockImage('SPOT', '#0F766E') },
        { name: 'Adobe', ticker: 'ADBE', sector: 'Technology', price: 473.61, change: 1.21, image: createStockImage('ADBE', '#7C3AED') },
        { name: 'CrowdStrike', ticker: 'CRWD', sector: 'Technology', price: 279.81, change: 0.88, image: createStockImage('CRWD', '#06B6D4') },
        { name: 'Fortinet', ticker: 'FTNT', sector: 'Technology', price: 64.18, change: -0.42, image: createStockImage('FTNT', '#0F172A') },
        { name: 'Palo Alto Networks', ticker: 'PANW', sector: 'Technology', price: 189.76, change: 0.79, image: createStockImage('PANW', '#4F46E5') },
        { name: 'Intel', ticker: 'INTC', sector: 'Technology', price: 20.12, change: -0.54, image: createStockImage('INTC', '#4B5563') },
        { name: 'Berkshire Hathaway', ticker: 'BRK.B', sector: 'Finance', price: 434.58, change: 0.44, image: createStockImage('BRK', '#FF7A2F') },
        { name: 'BlackRock', ticker: 'BLK', sector: 'Finance', price: 930.12, change: 0.64, image: createStockImage('BLK', '#0F766E') },
        { name: 'Charles Schwab', ticker: 'SCHW', sector: 'Finance', price: 70.62, change: -0.51, image: createStockImage('SCHW', '#0EA5A4') },
        { name: 'Citigroup', ticker: 'C', sector: 'Finance', price: 68.83, change: 0.39, image: createStockImage('C', '#1D4ED8') },
        { name: 'Wells Fargo', ticker: 'WFC', sector: 'Finance', price: 71.81, change: -0.26, image: createStockImage('WFC', '#B45309') },
        { name: 'Morgan Stanley', ticker: 'MS', sector: 'Finance', price: 98.09, change: 0.59, image: createStockImage('MS', '#8B5CF6') },
        { name: 'PNC Financial', ticker: 'PNC', sector: 'Finance', price: 164.05, change: -0.34, image: createStockImage('PNC', '#1E3A8A') },
        { name: 'American Express', ticker: 'AXP', sector: 'Finance', price: 295.21, change: 0.68, image: createStockImage('AXP', '#DC2626') },
        { name: 'Bristol Myers Squibb', ticker: 'BMY', sector: 'Healthcare', price: 58.76, change: -0.47, image: createStockImage('BMY', '#4338CA') },
        { name: 'Pfizer', ticker: 'PFE', sector: 'Healthcare', price: 27.48, change: 0.56, image: createStockImage('PFE', '#0EA5A4') },
        { name: 'Merck', ticker: 'MRK', sector: 'Healthcare', price: 100.42, change: -0.32, image: createStockImage('MRK', '#2563EB') },
        { name: 'Abbott', ticker: 'ABT', sector: 'Healthcare', price: 124.73, change: 0.65, image: createStockImage('ABT', '#7C3AED') },
        { name: 'Johnson & Johnson', ticker: 'JNJ', sector: 'Healthcare', price: 160.62, change: 0.34, image: createStockImage('JNJ', '#0F766E') },
        { name: 'Eli Lilly', ticker: 'LLY', sector: 'Healthcare', price: 775.84, change: 1.42, image: createStockImage('LLY', '#B91C1C') },
        { name: 'Novo Nordisk', ticker: 'NVO', sector: 'Healthcare', price: 82.91, change: 0.83, image: createStockImage('NVO', '#0D9488') },
        { name: 'General Electric', ticker: 'GE', sector: 'Industrials', price: 185.83, change: 0.46, image: createStockImage('GE', '#4F46E5') },
        { name: '3M', ticker: 'MMM', sector: 'Industrials', price: 104.81, change: -0.27, image: createStockImage('MMM', '#7C2D12') },
        { name: 'Union Pacific', ticker: 'UNP', sector: 'Industrials', price: 248.37, change: 0.61, image: createStockImage('UNP', '#1D4ED8') },
        { name: 'CSX', ticker: 'CSX', sector: 'Industrials', price: 31.74, change: 0.47, image: createStockImage('CSX', '#A16207') },
        { name: 'Nordstrom', ticker: 'JWN', sector: 'Retail', price: 21.54, change: -0.53, image: createStockImage('JWN', '#C2410C') },
        { name: 'Kroger', ticker: 'KR', sector: 'Retail', price: 58.88, change: 0.31, image: createStockImage('KR', '#16A34A') },
        { name: 'Winn-Dixie', ticker: 'WIN', sector: 'Retail', price: 4.22, change: -0.74, image: createStockImage('WIN', '#0F766E') },
        { name: 'CVS Health', ticker: 'CVS', sector: 'Healthcare', price: 64.91, change: 0.53, image: createStockImage('CVS', '#2563EB') },
        { name: 'UnitedHealth', ticker: 'UNH', sector: 'Healthcare', price: 522.29, change: 0.68, image: createStockImage('UNH', '#1E3A8A') },
        { name: 'Danaher', ticker: 'DHR', sector: 'Healthcare', price: 213.11, change: 0.72, image: createStockImage('DHR', '#0F172A') },
        { name: 'Boston Scientific', ticker: 'BSX', sector: 'Healthcare', price: 72.18, change: 1.18, image: createStockImage('BSX', '#2563EB') }
    ];

    const stockList = document.getElementById('portfolio-stock-list');

    const renderPortfolioStocks = () => {
        if (!stockList) {
            return;
        }

        stockList.innerHTML = stockItems.map((stock) => `
            <article class="portfolio-stock-card" tabindex="0" role="button" aria-label="${stock.name} stock price ${formatCurrency(stock.price)}">
                <div class="portfolio-stock-head">
                    <img class="portfolio-stock-logo" src="${stock.image}" alt="${stock.name}" />
                    <div>
                        <div class="portfolio-stock-name">${stock.name}</div>
                        <div class="portfolio-stock-meta">${stock.ticker} · ${stock.sector}</div>
                    </div>
                </div>
                <div class="portfolio-stock-body">
                    <div class="portfolio-stock-price">${formatCurrency(stock.price)}</div>
                    <div class="portfolio-stock-change ${stock.change >= 0 ? 'positive' : 'negative'}">${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%</div>
                </div>
            </article>
        `).join('');
    };

    const updatePortfolioStocks = () => {
        stockItems.forEach((stock) => {
            const drift = Number((Math.random() * 1.8 - 0.9).toFixed(2));
            stock.change = drift;
            stock.price = Number((stock.price * (1 + drift / 100)).toFixed(2));
        });
        renderPortfolioStocks();
    };

    renderPortfolioStocks();
    window.setInterval(updatePortfolioStocks, 2600);

    const newsletterItems = [
        {
            title: 'AI Momentum Is Redefining Growth Stocks',
            category: 'Weekly Insight',
            image: 'asset/newsletter/news.png',
            excerpt: 'Markets are rewarding companies that turn AI into measurable revenue and stronger operating efficiency.',
            body: [
                'The latest rotation is favoring firms that can convert automation into earnings, not just hype.',
                'Investors are watching capital discipline, margin resilience, and cloud adoption as the clearest signs of durable outperformance.'
            ]
        },
        {
            title: 'Energy Plays Are Becoming More Strategic',
            category: 'Market Brief',
            image: 'asset/newsletter/tyu.png',
            excerpt: 'Energy names are regaining attention as supply constraints and infrastructure spending support upside.',
            body: [
                'Longer term, the sector looks increasingly tied to industrial demand and grid modernization.',
                'For cautious investors, selective exposure through established operators offers a balanced way to participate.'
            ]
        },
        {
            title: 'Defensive Positions Still Matter in Volatile Weeks',
            category: 'Portfolio Note',
            image: 'asset/newsletter/uio.png',
            excerpt: 'Defensive sectors are helping portfolios stay resilient while growth leaders continue to reset.',
            body: [
                'A diversified mix of yield, healthcare, and core consumer names can provide stability without sacrificing upside.',
                'The key is to keep exposure flexible while protecting liquidity for future opportunities.'
            ]
        }
    ];

    const newsletterGrid = document.getElementById('newsletter-grid');
    const newsletterDetail = document.getElementById('newsletter-detail');
    const newsletterDetailImage = document.getElementById('newsletter-detail-image');
    const newsletterDetailMeta = document.getElementById('newsletter-detail-meta');
    const newsletterDetailTitle = document.getElementById('newsletter-detail-title');
    const newsletterDetailExcerpt = document.getElementById('newsletter-detail-excerpt');
    const newsletterDetailContent = document.getElementById('newsletter-detail-content');
    const newsletterDetailClose = document.getElementById('newsletter-detail-close');

    if (newsletterGrid) {
        newsletterGrid.innerHTML = newsletterItems.map((item, index) => `
            <article class="newsletter-card" tabindex="0" role="button" aria-label="Read ${item.title}" data-index="${index}">
                <img src="${item.image}" alt="${item.title}" />
                <h4>${item.title}</h4>
            </article>
        `).join('');

        newsletterGrid.querySelectorAll('.newsletter-card').forEach((card) => {
            card.addEventListener('click', () => {
                const index = Number(card.dataset.index);
                const item = newsletterItems[index];
                if (!item) {
                    return;
                }

                newsletterDetailImage.src = item.image;
                newsletterDetailImage.alt = item.title;
                newsletterDetailMeta.textContent = `${item.category} · Featured Article`;
                newsletterDetailTitle.textContent = item.title;
                newsletterDetailExcerpt.textContent = item.excerpt;
                newsletterDetailContent.innerHTML = item.body.map((paragraph) => `<p>${paragraph}</p>`).join('');

                newsletterDetail.classList.remove('hidden');
                requestAnimationFrame(() => newsletterDetail.classList.add('active'));
                newsletterDetail.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');
            });

            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    card.click();
                }
            });
        });
    }

    const closeNewsletterDetail = () => {
        if (!newsletterDetail) {
            return;
        }

        newsletterDetail.classList.remove('active');
        newsletterDetail.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
            newsletterDetail.classList.add('hidden');
        }, 220);
        document.body.classList.remove('modal-open');
    };

    if (newsletterDetailClose) {
        newsletterDetailClose.addEventListener('click', closeNewsletterDetail);
    }

    if (newsletterDetail) {
        newsletterDetail.addEventListener('click', (event) => {
            if (event.target === newsletterDetail) {
                closeNewsletterDetail();
            }
        });
    }

    const moreMenuItems = [
        { title: 'Nexos setting', subtitle: '', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16"></path><path d="M6 20V9"></path><path d="M18 20V9"></path><path d="M9 9V6h6v3"></path><path d="M9 12h6"></path></svg>', logo: true },
        { title: 'Statements & Reports', subtitle: 'Get a statement for your Spend account or Pocket', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7z"></path><path d="M14 3v5h5"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg>' },
        { title: 'Saved Cards', subtitle: 'Manage connected cards', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M3 10h18"></path><path d="M7 15h3"></path></svg>' },
        { title: 'Security', subtitle: 'Protect yourself from intruders', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.3 2.5 7.8 7 10 4.5-2.2 7-5.7 7-10V6z"></path><path d="M9.5 12.5 11 14l3.5-4"></path></svg>' },
        { title: 'Referrals', subtitle: 'Get paid when your friends join Nexos', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 12h8"></path><path d="M12 8v8"></path><path d="M4 8a2 2 0 1 0 0 4"></path><path d="M20 16a2 2 0 1 0 0-4"></path><path d="M6 12a6 6 0 0 1 12 0"></path></svg>' },
        { title: 'Account Limits', subtitle: 'How much you can spend and receive', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12c3.5-4 6.5-6 10-6s6.5 2 10 6c-3.5 4-6.5 6-10 6s-6.5-2-10-6Z"></path><circle cx="12" cy="12" r="2.5"></circle></svg>' }
    ];

    const closeSettingsPage = () => {
        if (!settingsPage) {
            return;
        }

        settingsPage.classList.remove('active');
        settingsPage.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
            settingsPage.classList.add('hidden');
        }, 220);
        document.body.classList.remove('modal-open');
    };

    const openSettingsPage = () => {
        if (!settingsPage) {
            return;
        }

        settingsPage.classList.remove('hidden');
        requestAnimationFrame(() => settingsPage.classList.add('active'));
        settingsPage.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeSecurityPage = () => {
        if (!securityPage) {
            return;
        }

        securityPage.classList.remove('active');
        securityPage.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
            securityPage.classList.add('hidden');
        }, 220);
        document.body.classList.remove('modal-open');
    };

    const openSecurityPage = () => {
        if (!securityPage) {
            return;
        }

        securityPage.classList.remove('hidden');
        requestAnimationFrame(() => securityPage.classList.add('active'));
        securityPage.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeReferralPage = () => {
        if (!referralPage) {
            return;
        }

        referralPage.classList.remove('active');
        referralPage.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
            referralPage.classList.add('hidden');
        }, 220);
        document.body.classList.remove('modal-open');
    };

    const openReferralPage = () => {
        if (!referralPage) {
            return;
        }

        referralPage.classList.remove('hidden');
        requestAnimationFrame(() => referralPage.classList.add('active'));
        referralPage.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeSavedCardPage = () => {
        if (!savedCardPage) {
            return;
        }

        savedCardPage.classList.remove('active');
        savedCardPage.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
            savedCardPage.classList.add('hidden');
        }, 220);
        document.body.classList.remove('modal-open');
    };

    const openSavedCardPage = () => {
        if (!savedCardPage) {
            return;
        }

        savedCardPage.classList.remove('hidden');
        requestAnimationFrame(() => savedCardPage.classList.add('active'));
        savedCardPage.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    if (settingsPageClose) {
        settingsPageClose.addEventListener('click', closeSettingsPage);
    }

    if (settingsPage) {
        settingsPage.addEventListener('click', (event) => {
            if (event.target === settingsPage) {
                closeSettingsPage();
            }
        });
    }

    if (securityPageClose) {
        securityPageClose.addEventListener('click', closeSecurityPage);
    }

    if (securityPage) {
        securityPage.addEventListener('click', (event) => {
            if (event.target === securityPage) {
                closeSecurityPage();
            }
        });
    }

    if (referralPageClose) {
        referralPageClose.addEventListener('click', closeReferralPage);
    }

    if (referralPage) {
        referralPage.addEventListener('click', (event) => {
            if (event.target === referralPage) {
                closeReferralPage();
            }
        });
    }

    if (savedCardPageClose) {
        savedCardPageClose.addEventListener('click', closeSavedCardPage);
    }

    if (savedCardPage) {
        savedCardPage.addEventListener('click', (event) => {
            if (event.target === savedCardPage) {
                closeSavedCardPage();
            }
        });
    }

    if (menuList) {
        menuList.innerHTML = moreMenuItems.map((item) => `
            <div class="menu-item" tabindex="0" role="button" aria-label="${item.title}">
                <div class="icon-box ${item.logo ? 'icon-logo' : ''}">${item.icon}</div>
                <div class="text-content">
                    <div class="title">${item.title}</div>
                    ${item.subtitle ? `<div class="subtitle">${item.subtitle}</div>` : ''}
                </div>
                <div class="arrow">›</div>
            </div>
        `).join('');

        menuList.querySelectorAll('.menu-item').forEach((menuItem) => {
            menuItem.addEventListener('click', () => {
                const label = menuItem.querySelector('.title')?.textContent || 'Item';
                if (label.toLowerCase().includes('nexos setting')) {
                    openSettingsPage();
                    return;
                }
                if (label.toLowerCase().includes('security')) {
                    openSecurityPage();
                    return;
                }
                if (label.toLowerCase().includes('referrals')) {
                    openReferralPage();
                    return;
                }
                if (label.toLowerCase().includes('saved cards')) {
                    openSavedCardPage();
                    return;
                }
                window.alert(`Opening: ${label}`);
            });
        });
    }

    const showFinancePanel = (panelId) => {
        financeTabs.forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.target === panelId);
        });

        Object.values(financePanels).forEach((panel) => panel.classList.add('hidden'));
        const targetPanel = financePanels[panelId];
        if (targetPanel) {
            targetPanel.classList.remove('hidden');
        }
    };

    const updateSavingsSummary = () => {
        const btcAmount = parseFloat(btcAmountInput?.value) || 0;
        const usdValue = btcAmount * btcPrice;

        if (usdValueInput) {
            usdValueInput.value = formatCurrency(usdValue);
        }

        const annualInterest = usdValue * (selectedApy / 100);
        const earnings = annualInterest * (selectedDays / 365);
        const total = usdValue + earnings;

        if (summaryTerm) {
            summaryTerm.textContent = `${selectedDays} Days`;
        }
        if (summaryEarnings) {
            summaryEarnings.textContent = formatCurrency(earnings);
        }
        if (summaryTotal) {
            summaryTotal.textContent = formatCurrency(total);
        }
    };

    savingsTermCards.forEach((card) => {
        card.addEventListener('click', () => {
            savingsTermCards.forEach((entry) => entry.classList.remove('active'));
            card.classList.add('active');
            selectedDays = Number(card.dataset.days) || 360;
            selectedApy  = Number(card.dataset.apy) || 15.0;
            updateSavingsSummary();
        });
    });

    if (btcAmountInput) {
        btcAmountInput.addEventListener('input', updateSavingsSummary);
        updateSavingsSummary();
    }

    let conversionMode = 'btc-usd';

    const updateConversion = () => {
        const inputValue = parseFloat(btcConvertInput?.value) || 0;
        const usdValue = inputValue * btcPrice;
        const btcValue = inputValue / btcPrice;

        if (convertedUsd) {
            convertedUsd.textContent = conversionMode === 'btc-usd' ? formatCurrency(usdValue) : formatCurrency(inputValue);
        }

        if (convertSummary) {
            convertSummary.textContent = conversionMode === 'btc-usd'
                ? `USD value: ${formatCurrency(usdValue)}`
                : `BTC value: ${btcValue.toFixed(6)} BTC`;
        }

        if (convertLabel) {
            convertLabel.textContent = conversionMode === 'btc-usd' ? 'Amount of BTC' : 'Amount of USD';
        }

        if (btcConvertInput) {
            btcConvertInput.placeholder = conversionMode === 'btc-usd' ? '0.000' : '0.00';
        }
    };

    convertModeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            conversionMode = button.dataset.mode;
            convertModeButtons.forEach((entry) => entry.classList.toggle('active', entry === button));
            updateConversion();
        });
    });

    withdrawModeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            withdrawMode = button.dataset.mode || 'btc';
            updateWithdrawPanel();
        });
    });

    const toggleSpendPanel = () => {
        if (!spendPanel) {
            return;
        }

        const isOpen = spendPanel.classList.contains('active');
        spendPanel.classList.toggle('active', !isOpen);
        spendPanel.classList.toggle('hidden', isOpen);
        spendPanel.setAttribute('aria-hidden', String(isOpen));
        document.body.classList.toggle('modal-open', !isOpen);
        if (!isOpen) {
            spendPanel.querySelector('.funding-option')?.focus();
        }
    };

    if (spendAction) {
        spendAction.addEventListener('click', toggleSpendPanel);
        spendAction.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleSpendPanel();
            }
        });
    }

    if (spendPanelClose) {
        spendPanelClose.addEventListener('click', toggleSpendPanel);
    }

    if (spendPanel) {
        spendPanel.addEventListener('click', (event) => {
            if (event.target === spendPanel) {
                toggleSpendPanel();
            }
        });
    }

    if (withdrawTrigger) {
        withdrawTrigger.addEventListener('click', toggleWithdrawPanel);
    }

    if (withdrawPanelClose) {
        withdrawPanelClose.addEventListener('click', toggleWithdrawPanel);
    }

    if (withdrawPanel) {
        withdrawPanel.addEventListener('click', (event) => {
            if (event.target === withdrawPanel) {
                toggleWithdrawPanel();
            }
        });
    }

    if (withdrawNextButton) {
        withdrawNextButton.addEventListener('click', () => {
            if (withdrawMode === 'btc') {
                const recipient = withdrawAddressInput?.value?.trim();
                if (!recipient) {
                    if (withdrawSummary) {
                        withdrawSummary.textContent = 'Please enter a recipient BTC address.';
                    }
                    return;
                }

                if (withdrawSummary) {
                    withdrawSummary.textContent = `BTC withdrawal prepared for ${recipient}.`;
                }
                return;
            }

            const amount = Number(withdrawAmountInput?.value || 0);
            if (amount <= 0) {
                if (withdrawSummary) {
                    withdrawSummary.textContent = 'Please choose an USD amount.';
                }
                return;
            }

            if (withdrawSummary) {
                withdrawSummary.textContent = `USD withdrawal prepared for $${amount.toFixed(2)}.`;
            }
        });
    }

    if (convertTrigger && convertPanel) {
        convertTrigger.addEventListener('click', () => {
            convertPanel.classList.toggle('hidden');
            if (!convertPanel.classList.contains('hidden')) {
                btcConvertInput?.focus();
                updateConversion();
            }
        });
    }

    if (btcConvertInput) {
        btcConvertInput.addEventListener('input', updateConversion);
    }

    const calculateLoanView = () => {
        const btcAmount = parseFloat(btcAmountLoanInput?.value) || 0;
        const collateralUsd = btcAmount * btcPrice;
        const ltv = parseFloat(ltvSliderLoan?.value) || 50;
        const loanAmount = collateralUsd * (ltv / 100);
        const years = selectedLoanDays / 365;
        const interest = loanAmount * loanApr * years;
        const repayment = loanAmount + interest;

        if (usdValueLoan) {
            usdValueLoan.textContent = formatCurrency(collateralUsd);
        }
        if (ltvValueLoan) {
            ltvValueLoan.textContent = `${ltv}%`;
        }
        if (summaryCollateral) {
            summaryCollateral.textContent = formatCurrency(collateralUsd);
        }
        if (summaryLoan) {
            summaryLoan.textContent = formatCurrency(loanAmount);
        }
        if (summaryInterest) {
            summaryInterest.textContent = formatCurrency(interest);
        }
        if (summaryRepayment) {
            summaryRepayment.textContent = formatCurrency(repayment);
        }
    };

    const setLoanButtonLoading = (isLoading) => {
        if (!calculateLoanButton) {
            return;
        }

        calculateLoanButton.classList.toggle('is-loading', isLoading);
        calculateLoanButton.disabled = isLoading;
        calculateLoanButton.textContent = isLoading ? 'Calculating…' : 'Calculate loan';
    };

    const updateLoanPrice = async () => {
        const endpoints = [
            'https://api.coinbase.com/v2/prices/BTC-USD/spot',
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    continue;
                }

                const data = await response.json();
                let price = null;

                if (endpoint.includes('coinbase')) {
                    price = Number(data?.data?.amount);
                } else if (endpoint.includes('coingecko')) {
                    price = Number(data?.bitcoin?.usd);
                }

                if (!Number.isNaN(price) && price > 0) {
                    btcPrice = price;
                    calculateLoanView();
                    return;
                }
            } catch (error) {
                // Keep the fallback price.
            }
        }
    };

    const openSupportPage = () => {
        if (!supportPage) {
            return;
        }

        supportPage.classList.remove('hidden');
        requestAnimationFrame(() => supportPage.classList.add('active'));
        supportPage.setAttribute('aria-hidden', 'false');
        supportToggle?.setAttribute('aria-expanded', 'true');
        document.body.classList.add('modal-open');
    };

    const closeSupportPage = () => {
        if (!supportPage) {
            return;
        }

        supportPage.classList.remove('active');
        supportPage.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
            supportPage.classList.add('hidden');
        }, 240);
        supportToggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('modal-open');
    };

    if (supportToggle) {
        supportToggle.addEventListener('click', openSupportPage);
    }

    if (supportPageClose) {
        supportPageClose.addEventListener('click', closeSupportPage);
    }

    if (supportPage) {
        supportPage.addEventListener('click', (event) => {
            if (event.target === supportPage) {
                closeSupportPage();
            }
        });
    }

    supportPage?.querySelectorAll('.support-card').forEach((card) => {
        card.addEventListener('click', () => {
            const action = card.dataset.action;
            const messages = {
                call: 'Calling support line: +1 (800) 555-0199',
                chat: 'Opening support chat now.',
                dispute: 'Dispute status: No active disputes.',
                faq: 'Opening FAQs for common account issues.'
            };
            window.alert(messages[action] || 'Support option selected.');
            closeSupportPage();
        });
    });

    const openTransactionsPage = () => {
        if (!transactionsPage) {
            return;
        }

        transactionsPage.classList.remove('hidden');
        requestAnimationFrame(() => transactionsPage.classList.add('active'));
        transactionsPage.setAttribute('aria-hidden', 'false');
        transactionsToggle?.setAttribute('aria-expanded', 'true');
        document.body.classList.add('modal-open');
    };

    const closeTransactionsPage = () => {
        if (!transactionsPage) {
            return;
        }

        transactionsPage.classList.remove('active');
        transactionsPage.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
            transactionsPage.classList.add('hidden');
        }, 240);
        transactionsToggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('modal-open');
    };

    if (transactionsToggle) {
        transactionsToggle.addEventListener('click', openTransactionsPage);
    }

    if (transactionsPageClose) {
        transactionsPageClose.addEventListener('click', closeTransactionsPage);
    }

    if (transactionsPage) {
        transactionsPage.addEventListener('click', (event) => {
            if (event.target === transactionsPage) {
                closeTransactionsPage();
            }
        });
    }

    const printStatementButton = document.querySelector('.transactions-print');
    if (printStatementButton) {
        printStatementButton.addEventListener('click', () => {
            window.print();
        });
    }

    const openProfileModal = () => {
        if (!profileModal) {
            return;
        }

        profileModal.classList.remove('hidden');
        profileModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeProfileModal = () => {
        if (!profileModal) {
            return;
        }

        profileModal.classList.add('hidden');
        profileModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    if (profileTrigger) {
        profileTrigger.addEventListener('click', openProfileModal);
    }

    if (profileModal) {
        profileModal.addEventListener('click', (event) => {
            if (event.target === profileModal) {
                closeProfileModal();
            }
        });
    }

    if (profileModalClose) {
        profileModalClose.addEventListener('click', closeProfileModal);
    }

    if (deleteAccountButton) {
        deleteAccountButton.addEventListener('click', () => {
            const confirmed = window.confirm('Delete this account? This action cannot be undone.');
            if (confirmed) {
                window.alert('Account deletion requested.');
            }
        });
    }

    if (restrictAccountButton) {
        restrictAccountButton.addEventListener('click', () => {
            const confirmed = window.confirm('Restrict this account?');
            if (confirmed) {
                window.alert('Account restriction applied.');
            }
        });
    }

    if (btcAmountLoanInput) {
        btcAmountLoanInput.addEventListener('input', calculateLoanView);
    }
    if (ltvSliderLoan) {
        ltvSliderLoan.addEventListener('input', calculateLoanView);
    }

    loanPeriodButtons.forEach((button) => {
        button.addEventListener('click', () => {
            loanPeriodButtons.forEach((entry) => entry.classList.remove('active'));
            button.classList.add('active');
            selectedLoanDays = Number(button.dataset.days) || 30;
            calculateLoanView();
        });
    });

    if (calculateLoanButton) {
        calculateLoanButton.addEventListener('click', () => {
            setLoanButtonLoading(true);
            window.setTimeout(() => {
                calculateLoanView();
                setLoanButtonLoading(false);
            }, 700);
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (!profileModal?.classList.contains('hidden')) {
                closeProfileModal();
                return;
            }

            if (!newsletterDetail?.classList.contains('hidden')) {
                closeNewsletterDetail();
                return;
            }
        }

        if (event.key === 'Enter' && document.getElementById('loan-panel')?.contains(document.activeElement)) {
            event.preventDefault();
            if (calculateLoanButton) {
                calculateLoanButton.click();
            } else {
                calculateLoanView();
            }
        }
    });

    calculateLoanView();
    updateLoanPrice();

    const showSection = (sectionId) => {
        [homeSection, moreSection, membershipSection, investFullview, financeFullview, borrowFullview, saveFullview].forEach((section) => {
            if (section) {
                section.classList.toggle('hidden', section.id !== sectionId);
            }
        });

        if (topbarHeader) {
            topbarHeader.hidden = sectionId !== 'home-section';
            topbarHeader.style.display = sectionId !== 'home-section' ? 'none' : 'flex';
        }
        if (topbarCompact) {
            topbarCompact.hidden = true;
            topbarCompact.style.display = 'none';
        }
        if (dashboardView) {
            dashboardView.hidden = sectionId !== 'home-section';
        }
        if (financeFullview) {
            financeFullview.classList.toggle('is-open', sectionId === 'finance-fullview');
        }
    };

    if (borrowAction && borrowFullview) {
        borrowAction.addEventListener('click', () => showSection('borrow-fullview'));
        borrowAction.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showSection('borrow-fullview');
            }
        });
    }

    if (borrowBackButton) {
        borrowBackButton.addEventListener('click', () => showSection('home-section'));
    }

    if (saveAction && saveFullview) {
        saveAction.addEventListener('click', () => showSection('save-fullview'));
        saveAction.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showSection('save-fullview');
            }
        });
    }

    if (saveBackButton) {
        saveBackButton.addEventListener('click', () => showSection('home-section'));
    }

    if (investAction) {
        const openInvestView = () => showSection('invest-fullview');
        investAction.addEventListener('click', openInvestView);
        investAction.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openInvestView();
            }
        });
    }

    if (investBackButton) {
        investBackButton.addEventListener('click', () => showSection('home-section'));
    }

    footerItems.forEach((item) => {
        item.addEventListener('click', () => {
            footerItems.forEach((entry) => entry.classList.remove('active'));
            item.classList.add('active');

            const selectedView = item.dataset.target || 'home';
            const shouldShowHome = selectedView === 'home';
            const shouldShowFinance = selectedView === 'finance';
            const shouldShowMore = selectedView === 'more';
            const shouldShowMembership = selectedView === 'membership';

            if (shouldShowHome) {
                showSection('home-section');
            } else if (shouldShowFinance) {
                showSection('finance-fullview');
                showFinancePanel('loan-panel');
            } else if (shouldShowMore) {
                showSection('more-section');
            } else if (shouldShowMembership) {
                showSection('membership-section');
            }
        });
    });

    financeTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            showFinancePanel(tab.dataset.target);
        });
    });

    showFinancePanel('loan-panel');

    const cards = document.querySelectorAll('.news-card');
    if (cards.length) {
        let index = 0;
        setInterval(() => {
            cards.forEach((card) => card.classList.remove('active'));
            cards[index].classList.add('active');
            index = (index + 1) % cards.length;
        }, 2200);
    }

    document.querySelectorAll('.portfolio-tag').forEach((tag) => {
        const iconMarkup = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 19V9"></path>
                <path d="M12 19V5"></path>
                <path d="M19 19v-7"></path>
                <path d="M3 19h18"></path>
            </svg>
        `;
        const text = tag.textContent.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim();
        tag.innerHTML = `${iconMarkup}<span class="tag-label">${text}</span>`;
    });

    document.querySelectorAll('.portfolio-filter').forEach((filter) => {
        filter.addEventListener('click', () => {
            document.querySelectorAll('.portfolio-filter').forEach((entry) => entry.classList.remove('active'));
            filter.classList.add('active');
        });
    });

    const btcPriceEl = document.getElementById('btc-price');
    if (btcPriceEl) {
        const updateBtcPrice = async () => {
            const endpoints = [
                'https://api.coinbase.com/v2/prices/BTC-USD/spot',
                'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
            ];

            for (const endpoint of endpoints) {
                try {
                    const response = await fetch(endpoint);
                    if (!response.ok) {
                        continue;
                    }

                    const data = await response.json();
                    let price = null;

                    if (endpoint.includes('coinbase')) {
                        price = Number(data?.data?.amount);
                    } else if (endpoint.includes('coingecko')) {
                        price = Number(data?.bitcoin?.usd);
                    }

                    if (!Number.isNaN(price) && price > 0) {
                        btcPriceEl.textContent = `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
                        return;
                    }
                } catch (error) {
                    // Try the next endpoint.
                }
            }

            btcPriceEl.textContent = 'Offline';
        };

        updateBtcPrice();
        setInterval(updateBtcPrice, 60000);
    }
});
