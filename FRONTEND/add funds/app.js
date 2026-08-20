const toast = document.querySelector('.toast');
let toastTimer;
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalTitle = document.querySelector('#modal-title');
const modalMessage = document.querySelector('#modal-message');
const modalIcon = document.querySelector('.modal-icon');
const confirmButton = document.querySelector('.confirm-button');
const cancelButton = document.querySelector('.cancel-button');
const amountInput = document.querySelector('#transfer-amount');
const amountLabel = document.querySelector('.transfer-amount-label');
const amountCurrency = document.querySelector('.amount-currency');
const amountError = document.querySelector('.amount-error');
let selectedAction;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2400);
}

document.querySelectorAll('.fund-card').forEach((card) => {
  card.addEventListener('click', () => {
    if (card.dataset.option === 'Transfer to Collateral') {
      openConfirmation({
        title: 'Transfer to collateral?',
        message: 'Do you want to transfer funds from your savings balance to your collateral balance?',
        amountLabel: 'Amount to move from savings',
        currency: '$',
        confirmText: 'Transfer funds',
        icon: '\u2192',
        successMessage: (amount) => `$${amount} transfer from savings to collateral confirmed.`
      });
    } else if (card.dataset.option === 'Add Collateral') {
      openConfirmation({
        title: 'Deposit BTC as collateral?',
        message: 'Do you want to deposit BTC from your Bitcoin wallet balance to your collateral?',
        amountLabel: 'BTC amount to deposit',
        currency: 'BTC',
        confirmText: 'Deposit BTC',
        icon: '\u2666',
        successMessage: (amount) => `${amount} BTC collateral deposit confirmed.`
      });
    } else {
      showToast(`${card.dataset.option} selected. This flow will be available shortly.`);
    }
  });
});

function openConfirmation(action) {
  selectedAction = action;
  modalTitle.textContent = action.title;
  modalMessage.textContent = action.message;
  modalIcon.textContent = action.icon;
  amountLabel.textContent = action.amountLabel;
  amountCurrency.textContent = action.currency;
  amountInput.value = '';
  amountError.textContent = '';
  confirmButton.textContent = action.confirmText;
  modalBackdrop.hidden = false;
  requestAnimationFrame(() => modalBackdrop.classList.add('visible'));
  amountInput.focus();
}

function closeConfirmation() {
  modalBackdrop.classList.remove('visible');
  setTimeout(() => { modalBackdrop.hidden = true; }, 180);
}

confirmButton.addEventListener('click', () => {
  const amount = Number(amountInput.value);
  if (!amountInput.value || !Number.isFinite(amount) || amount <= 0) {
    amountError.textContent = 'Enter an amount greater than zero.';
    amountInput.focus();
    return;
  }
  showToast(selectedAction.successMessage(amountInput.value));
  closeConfirmation();
});

amountInput.addEventListener('input', () => { amountError.textContent = ''; });

cancelButton.addEventListener('click', closeConfirmation);

modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) closeConfirmation();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalBackdrop.hidden) closeConfirmation();
});

document.querySelector('.help-button').addEventListener('click', () => {
  showToast('Need help? Contact Nexos support.');
});
