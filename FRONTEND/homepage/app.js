const toast = document.getElementById('toast');

if (localStorage.getItem('nixxa-auth') !== 'true') {
  window.location.replace('auth/signup.html');
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
