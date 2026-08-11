const USD_RATE = 1600;
const amountInput = document.getElementById('naira-amount');
const quickButtons = [...document.querySelectorAll('.quick-amounts button')];
const error = document.getElementById('input-error');
const modal = document.getElementById('modal');
const content = document.getElementById('modal-content');
const toast = document.getElementById('toast');
let method = 'Bank Transfer';

const readAmount = () => Number(amountInput.value.replace(/[^0-9.]/g, '')) || 0;
const naira = value => `\u20a6${Number(value).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const usd = value => `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function updateDeposit() {
  const ngn = readAmount();
  const converted = ngn / USD_RATE;
  document.getElementById('usd-equivalent').textContent = usd(converted);
  document.getElementById('summary-ngn').textContent = naira(ngn);
  document.getElementById('summary-usd').textContent = usd(converted);
  error.classList.toggle('show', ngn > 0 && ngn < 1000);
  quickButtons.forEach(button => button.classList.toggle('active', Number(button.dataset.amount) === ngn));
}

amountInput.addEventListener('focus', () => { amountInput.value = readAmount() || ''; });
amountInput.addEventListener('input', updateDeposit);
amountInput.addEventListener('blur', () => { amountInput.value = readAmount().toLocaleString('en-NG'); updateDeposit(); });
quickButtons.forEach(button => button.addEventListener('click', () => { amountInput.value = Number(button.dataset.amount).toLocaleString('en-NG'); updateDeposit(); }));
document.querySelectorAll('.method').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.method').forEach(item => item.classList.remove('active')); button.classList.add('active'); method = button.dataset.method; }));

const rows = () => `<div class="modal-rows"><div><span>Naira amount</span><b>${naira(readAmount())}</b></div><div><span>Exchange rate</span><b>\u20a61,600 / USD</b></div><div><span>Payment method</span><b>${method}</b></div><div class="orange"><span>You will receive</span><b>${usd(readAmount() / USD_RATE)}</b></div></div>`;
function openModal(html) { content.innerHTML = html; modal.classList.remove('hidden'); }
function closeModal() { modal.classList.add('hidden'); }
document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.getElementById('continue').addEventListener('click', () => {
  if (readAmount() < 1000) { error.classList.add('show'); amountInput.focus(); return; }
  openModal(`<h3>Confirm Deposit</h3><p class="modal-lead">You are converting</p><p class="modal-total">${naira(readAmount())}</p>${rows()}<div class="modal-actions"><button id="cancel">Cancel</button><button class="primary" id="confirm">Confirm</button></div>`);
  document.getElementById('cancel').addEventListener('click', closeModal);
  document.getElementById('confirm').addEventListener('click', processDeposit);
});
function processDeposit() { openModal(`<div class="loader"></div><h3>Processing your deposit</h3><p class="modal-lead">Converting Naira to USD. Please wait...</p>`); setTimeout(showInstructions, 1000); }
function showInstructions() {
  if (method === 'Debit Card') { showSuccess(); return; }
  openModal(`<h3>Bank Transfer</h3><p class="modal-lead">Transfer ${naira(readAmount())} to the account below.</p><div class="bank-details"><div><span>Bank name</span><b>Nexos Payments</b></div><div><span>Account number</span><b>0123456789</b></div><div><span>Account name</span><b>NEXOS USD WALLET</b></div><div><span>Reference</span><b>NX-USD-82941</b></div></div><div class="modal-actions"><button class="primary" id="transfer-complete">I&#8217;ve Made the Transfer</button></div>`);
  document.getElementById('transfer-complete').addEventListener('click', showSuccess);
}
function showSuccess() { openModal(`<div class="success">&#10003;</div><h3>USD Deposit Initiated</h3><p class="modal-lead">Your USD will be credited once payment is confirmed.</p>${rows()}<div class="modal-actions"><button class="primary" id="done">View Wallet</button></div>`); document.getElementById('done').addEventListener('click', closeModal); }
document.querySelector('.help').addEventListener('click', () => { toast.textContent = 'Need help? Contact Nexos support.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); });
updateDeposit();