const stockData = {
  apple: { name: 'Apple Inc.', ticker: 'AAPL', price: 195.62, change: '1.30% (2.52)', about: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables and accessories worldwide.', className: 'apple', symbol: '&#9679;' },
  amazon: { name: 'Amazon.com, Inc.', ticker: 'AMZN', price: 176.45, change: '0.80% (1.40)', about: 'Amazon is a technology company focused on e-commerce, cloud computing, digital streaming, and artificial intelligence.', className: 'amazon', symbol: 'a' },
  tesla: { name: 'Tesla, Inc.', ticker: 'TSLA', price: 182.91, change: '2.45% (4.37)', about: 'Tesla designs, develops, manufactures and sells electric vehicles and clean energy generation and storage systems.', className: 'tesla', symbol: 'T' },
  microsoft: { name: 'Microsoft Corp.', ticker: 'MSFT', price: 415.30, change: '1.10% (4.49)', about: 'Microsoft develops and supports software, services, devices, and solutions for people and businesses worldwide.', className: 'microsoft', symbol: '&#9632;' },
  google: { name: 'Alphabet Inc.', ticker: 'GOOGL', price: 169.37, change: '0.62% (1.04)', about: 'Alphabet provides online advertising services, cloud products, and consumer technology products around the world.', className: 'google', symbol: 'G' }
};
let selectedStock = stockData.apple;
const toast = document.getElementById('toast');
const show = (id) => { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); window.scrollTo(0, 0); };
const notify = (message) => { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); };
const openStock = (key) => { selectedStock = stockData[key]; const isGain = !selectedStock.change.startsWith('-'); document.getElementById('detail-title').textContent = `${selectedStock.name} (${selectedStock.ticker})`; document.getElementById('detail-price').textContent = `$${selectedStock.price.toFixed(2)}`; document.getElementById('detail-change').innerHTML = `${isGain ? '&#8593;' : '&#8595;'} ${selectedStock.change.replace('-', '')}`; document.getElementById('detail-change').className = isGain ? 'gain' : 'loss'; document.getElementById('about-name').textContent = selectedStock.name; document.getElementById('about-copy').textContent = selectedStock.about; show('detail-screen'); };
const extraStocks = ['Meta Platforms|META','Netflix|NFLX','NVIDIA|NVDA','Adobe|ADBE','Salesforce|CRM','Intel|INTC','Advanced Micro Devices|AMD','Cisco Systems|CSCO','Oracle|ORCL','IBM|IBM','Qualcomm|QCOM','Broadcom|AVGO','Uber Technologies|UBER','Airbnb|ABNB','PayPal|PYPL','Block|SQ','Visa|V','Mastercard|MA','JPMorgan Chase|JPM','Bank of America|BAC','Wells Fargo|WFC','Goldman Sachs|GS','Morgan Stanley|MS','Coca-Cola|KO','PepsiCo|PEP','McDonalds|MCD','Nike|NKE','Walt Disney|DIS','Walmart|WMT','Costco|COST','Target|TGT','Home Depot|HD','Starbucks|SBUX','Procter Gamble|PG','Johnson Johnson|JNJ','Pfizer|PFE','Merck|MRK','AbbVie|ABBV','UnitedHealth|UNH','Exxon Mobil|XOM','Chevron|CVX','Shell|SHEL','BP|BP','Boeing|BA','Lockheed Martin|LMT','Caterpillar|CAT','General Motors|GM','Ford Motor|F','Toyota Motor|TM','Honda Motor|HMC','Shopify|SHOP','Spotify|SPOT','Snap|SNAP','Pinterest|PINS','Zoom Video|ZM','DocuSign|DOCU','Palantir|PLTR','Snowflake|SNOW','ServiceNow|NOW','CrowdStrike|CRWD','Datadog|DDOG','Robinhood|HOOD','Coinbase|COIN','MicroStrategy|MSTR','Riot Platforms|RIOT','Marathon Digital|MARA','Delta Air Lines|DAL','United Airlines|UAL','American Airlines|AAL','Booking Holdings|BKNG','Marriott|MAR','Hilton|HLT','eBay|EBAY','Etsy|ETSY','MercadoLibre|MELI','Sea Limited|SE','Alibaba|BABA','Tencent|TCEHY','Baidu|BIDU','JD.com|JD','Taiwan Semiconductor|TSM','Samsung Electronics|SSNLF','Sony Group|SONY','Nintendo|NTDOY','LVMH|LVMUY','Ferrari|RACE','Novo Nordisk|NVO','ASML|ASML','SAP|SAP','Siemens|SIEGY','Airbus|EADSY','Unilever|UL','Nestle|NSRGY','HSBC|HSBC','Barclays|BCS','UBS Group|UBS','Deutsche Bank|DB','BlackRock|BLK','Charles Schwab|SCHW','S&P Global|SPGI'];
const stockList = document.getElementById('stock-list');
const portfolioView = document.getElementById('portfolio-view');
const portfolioStyles = document.createElement('style');
portfolioStyles.textContent = '.portfolio-view{display:grid;gap:9px;padding-top:10px}.portfolio-summary{display:grid;gap:5px;padding:14px;border:1px solid rgba(255,122,47,.45);border-radius:10px;background:linear-gradient(135deg,rgba(255,122,47,.16),#292222)}.portfolio-summary span,.portfolio-label{color:#C7C0C0;font-size:9px}.portfolio-summary strong{font-size:22px;letter-spacing:-.5px}.portfolio-summary small{font-size:9px}.portfolio-label{margin:9px 0 0;font-weight:800;letter-spacing:.12em}.holding{min-height:60px;border:1px solid #403737;border-radius:8px;background:#393333;color:#F5F2F2;display:flex;align-items:center;gap:9px;padding:9px;text-align:left;cursor:pointer}.holding>span:nth-child(2){display:grid;gap:4px;flex:1}.holding b{font-size:10px}.holding b small,.holding em{font-size:8px;color:#918989;font-style:normal}.holding>strong{font-size:9px}.holding>i{color:#918989;font-style:normal;font-size:18px}.loss{color:#E86D6D!important}.generic-stock{background:rgba(255,122,47,.14);color:#FF7A2F;font-size:9px}';
document.head.append(portfolioStyles);
extraStocks.forEach((entry, index) => {
  const [name, ticker] = entry.split('|');
  const key = `extra${index}`;
  const price = Number((24.75 + (index + 1) * 3.41).toFixed(2));
  const movement = 0.35 + ((index * 37) % 290) / 100;
  const signedMovement = index % 5 === 0 ? -movement : movement;
  const percent = signedMovement.toFixed(2);
  stockData[key] = { name, ticker, price, change: `${percent}% (${(price * signedMovement / 100).toFixed(2)})`, about: `${name} is available in the NIXXA Invest marketplace. Review company information before placing an order.`, className: 'generic-stock', symbol: ticker.slice(0, 2) };
  const row = document.createElement('button');
  row.className = 'stock-row';
  row.dataset.stock = key;
  row.dataset.change = signedMovement;
  row.innerHTML = `<span class="stock-logo generic-stock">${ticker.slice(0, 2)}</span><span class="stock-info"><strong>${name} <small>(${ticker})</small></strong><em>${name}</em></span><span class="price">$${price.toFixed(2)}<small class="${signedMovement >= 0 ? 'gain' : 'loss'}">${signedMovement >= 0 ? '&#8599;' : '&#8595;'} ${Math.abs(signedMovement).toFixed(2)}%</small></span>`;
  row.addEventListener('click', () => openStock(key));
  stockList.append(row);
});
document.querySelectorAll('[data-toast]').forEach(button => button.addEventListener('click', e => { e.preventDefault(); notify(button.dataset.toast); }));
document.querySelectorAll('.stock-row').forEach(row => { row.dataset.change ||= parseFloat(stockData[row.dataset.stock].change); row.addEventListener('click', () => openStock(row.dataset.stock)); });
document.querySelectorAll('.holding').forEach(row => row.addEventListener('click', () => openStock(row.dataset.stock)));
document.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => show(button.dataset.back)));
document.getElementById('buy-button').addEventListener('click', () => { document.getElementById('buy-name').textContent = `${selectedStock.name} (${selectedStock.ticker})`; document.getElementById('buy-price').textContent = `$${selectedStock.price.toFixed(2)}`; document.getElementById('estimated').textContent = `${(100 / selectedStock.price).toFixed(4)} ${selectedStock.ticker}`; show('buy-screen'); });
const amount = document.getElementById('order-amount');
const updateEstimate = () => { const value = Number(amount.value) || 0; document.getElementById('estimated').textContent = `${(value / selectedStock.price).toFixed(4)} ${selectedStock.ticker}`; document.querySelectorAll('.quick-amounts button').forEach(btn => btn.classList.toggle('active', btn.dataset.amount === String(value))); };
amount.addEventListener('input', updateEstimate);
document.querySelectorAll('.quick-amounts button').forEach(button => button.addEventListener('click', () => { amount.value = button.dataset.amount === 'max' ? '2350.40' : button.dataset.amount; updateEstimate(); }));
let activeTab = 'Popular';
let searchTerm = '';
const applyStockFilters = () => {
  const rows = [...document.querySelectorAll('.stock-row')];
  const visibleRows = rows.filter(row => {
    const movement = Number(row.dataset.change);
    const matchesSearch = row.textContent.toLowerCase().includes(searchTerm);
    const matchesTab = activeTab === 'Popular' || (activeTab === 'Top Gainers' && movement > 0) || (activeTab === 'Top Losers' && movement < 0);
    row.hidden = !(matchesSearch && matchesTab);
    return !row.hidden;
  });
  if (activeTab === 'Top Gainers') visibleRows.sort((a, b) => Number(b.dataset.change) - Number(a.dataset.change));
  if (activeTab === 'Top Losers') visibleRows.sort((a, b) => Number(a.dataset.change) - Number(b.dataset.change));
  visibleRows.forEach(row => stockList.append(row));
};
document.querySelectorAll('.tabs button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.tabs button').forEach(tab => tab.classList.remove('active')); button.classList.add('active'); activeTab = button.textContent; const showingPortfolio = activeTab === 'My Portfolio'; portfolioView.hidden = !showingPortfolio; stockList.hidden = showingPortfolio; if (!showingPortfolio) applyStockFilters(); }));
document.querySelectorAll('.range-tabs button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.range-tabs button').forEach(tab => tab.classList.remove('active')); button.classList.add('active'); }));
document.getElementById('review-button').addEventListener('click', () => notify(`Reviewing ${amount.value || 0} USD of ${selectedStock.ticker}`));
document.getElementById('stock-search').addEventListener('input', e => { searchTerm = e.target.value.toLowerCase().trim(); applyStockFilters(); });
