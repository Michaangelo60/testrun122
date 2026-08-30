const toast = document.getElementById('toast');

const HOLDINGS = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', amount: 0.075743, color: '#F7931A', icon: '₿' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', amount: 1250.42, color: '#26A17B', icon: '₮' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', amount: 4800.00, color: '#2775CA', icon: '$' }
];

const COIN_GECKO_IDS = {
  btc: 'bitcoin',
  usdt: 'tether',
  usdc: 'usd-coin'
};

const state = {
  selectedAsset: 'btc',
  marketData: {},
  balanceMode: 'asset'
};

// Replace the legacy More destination with the dedicated Transfer experience.
const transferNav = [...document.querySelectorAll('.bottom-nav a')].find((link) => link.textContent.trim() === 'More');
if (transferNav) {
  transferNav.href = '../transfer/index.html';
  transferNav.lastChild.nodeValue = 'Transfer';
}

if (localStorage.getItem('nixxa-auth') !== 'true') {
  window.location.replace('../auth/login.html');
}

document.querySelectorAll('[data-message]').forEach((element) => {
  element.addEventListener('click', (event) => {
    const href = element.getAttribute('href');

    if (element.tagName === 'A' && href && href !== '#') {
      return;
    }

    event.preventDefault();
    toast.textContent = element.dataset.message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 1800);
  });
});

const currencyButton = document.getElementById('currency');
const balance = document.getElementById('balance');
const walletMore = document.getElementById('wallet-more');
const walletMenu = document.getElementById('wallet-menu-overlay');
const walletAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
const btcBalance = document.querySelector('.growth');
const holdingsList = document.getElementById('coin-list');

function formatAssetAmount(amount, symbol) {
  if (symbol === 'BTC') return amount.toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 });
  if (symbol === 'USDC') return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatUsd(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function getAssetById(assetId) {
  return HOLDINGS.find((asset) => asset.id === assetId) || HOLDINGS[0];
}

function updateDashboardForAsset(assetId, forceMode = state.balanceMode) {
  const asset = getAssetById(assetId);
  const marketValue = state.marketData[COIN_GECKO_IDS[asset.id]]?.usd ?? 0;
  const usdValue = asset.amount * marketValue;
  const hidden = balance.dataset.hidden === 'true';

  if (forceMode === 'usd') {
    currencyButton.innerHTML = 'USD';
    balance.textContent = hidden ? '••••••••' : formatUsd(usdValue);
    btcBalance.textContent = hidden ? `${asset.symbol} Balance: ••••••••` : `${asset.symbol} Balance: ${formatUsd(usdValue)}`;
    return;
  }

  currencyButton.innerHTML = `${asset.symbol}`;
  balance.textContent = hidden ? '••••••••' : `${formatAssetAmount(asset.amount, asset.symbol)} ${asset.symbol}`;
  btcBalance.textContent = hidden ? `${asset.name} Balance: ••••••••` : `${asset.name} Balance: ${formatAssetAmount(asset.amount, asset.symbol)} ${asset.symbol}`;
}

function renderHoldings() {
  if (!holdingsList) return;

  holdingsList.innerHTML = HOLDINGS.map((asset) => {
    const market = state.marketData[COIN_GECKO_IDS[asset.id]] || { usd: 0, usd_24h_change: 0 };
    const change = Number(market.usd_24h_change || 0);
    const activeClass = state.selectedAsset === asset.id ? 'active' : '';
    const priceDisplay = market.usd ? market.usd.toLocaleString('en-US', { maximumFractionDigits: asset.id === 'btc' ? 2 : 4 }) : '—';

    return `
      <button class="coin-item ${activeClass}" type="button" data-asset="${asset.id}">
        <span class="coin-icon" style="background:${asset.color}22;color:${asset.color};">${asset.icon}</span>
        <span class="coin-meta">
          <b>${asset.symbol}</b>
          <small>${asset.name}</small>
        </span>
        <span class="coin-price">
          <strong>$${priceDisplay}</strong>
          <small class="${change >= 0 ? 'up' : 'down'}">${change >= 0 ? '+' : ''}${change.toFixed(2)}%</small>
        </span>
      </button>
    `;
  }).join('');

  holdingsList.querySelectorAll('.coin-item').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedAsset = button.dataset.asset;
      state.balanceMode = 'asset';
      updateDashboardForAsset(state.selectedAsset, 'asset');
      renderHoldings();
    });
  });
}

async function fetchMarketPrices() {
  const ids = Object.values(COIN_GECKO_IDS).join(',');
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);

  if (!response.ok) {
    throw new Error('Market data unavailable');
  }

  state.marketData = await response.json();
  renderHoldings();
  updateDashboardForAsset(state.selectedAsset, state.balanceMode);
}

currencyButton.addEventListener('click', () => {
  state.balanceMode = state.balanceMode === 'asset' ? 'usd' : 'asset';
  updateDashboardForAsset(state.selectedAsset, state.balanceMode);
});

walletMore.addEventListener('click', () => walletMenu.classList.add('open'));
walletMenu.addEventListener('click', (event) => { if (event.target === walletMenu) walletMenu.classList.remove('open'); });
document.querySelector('[data-copy-wallet]').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(walletAddress); toast.textContent = 'BTC wallet address copied'; }
  catch { toast.textContent = walletAddress; }
  toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 1800);
});
document.getElementById('hide-balance').addEventListener('click', (event) => {
  const hidden = balance.dataset.hidden !== 'true';
  balance.dataset.hidden = hidden;
  updateDashboardForAsset(state.selectedAsset, state.balanceMode);
  event.currentTarget.querySelector('span').textContent = hidden ? 'Show balance' : 'Hide balance';
});
document.getElementById('send-btc').addEventListener('click', () => { window.location.href = '../transfer/index.html'; });
document.getElementById('share-account').addEventListener('click', async () => {
  const details = 'Michael Adeyemi\nNexos account number: 0123456789';
  try {
    if (navigator.share) await navigator.share({ title: 'Nexos account details', text: details });
    else { await navigator.clipboard.writeText(details); showWalletToast('Account details copied'); }
  } catch { /* Sharing cancelled or unavailable. */ }
});

function showWalletToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 1800);
}

updateDashboardForAsset(state.selectedAsset, state.balanceMode);
renderHoldings();
fetchMarketPrices().catch(() => {
  renderHoldings();
  updateDashboardForAsset(state.selectedAsset, state.balanceMode);
});
window.setInterval(() => {
  fetchMarketPrices().catch(() => {});
}, 30000);
