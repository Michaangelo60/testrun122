const toast = document.getElementById('toast');

// Replace the legacy More destination with the dedicated Transfer experience.
const transferNav = [...document.querySelectorAll('.bottom-nav a')].find((link) => link.textContent.trim() === 'More');
if (transferNav) {
  transferNav.href = '../transfer/index.html';
  transferNav.lastChild.nodeValue = 'Transfer';
}

if (localStorage.getItem('nixxa-auth') !== 'true') {
  // If a user somehow reaches the homepage unauthenticated, send them
  // directly to the login page (skip the root loader).
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

currencyButton.addEventListener('click', () => {
  const isUsd = currencyButton.textContent.startsWith('USD');
  currencyButton.innerHTML = isUsd ? 'BTC&#8964;' : 'USD&#8964;';
  balance.textContent = isUsd ? '0.07574300 BTC' : '$4,826.40';
});

const walletMore = document.getElementById('wallet-more');
const walletMenu = document.getElementById('wallet-menu-overlay');
const walletAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
const btcBalance = document.querySelector('.growth');

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
  balance.textContent = hidden ? '••••••••' : (currencyButton.textContent.startsWith('USD') ? '$4,826.40' : '0.07574300 BTC');
  btcBalance.textContent = hidden ? 'BTC Balance: ••••••••' : 'BTC Balance: 0.07574300 BTC';
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
