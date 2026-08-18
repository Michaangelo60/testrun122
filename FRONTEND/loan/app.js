const BTC_PRICE = 63722.20;
const APR = 0.105;
let days = 360;
let ltv = 20;
const btcInput = document.getElementById('btc-input');
const loanAmount = document.getElementById('loan-amount');
const interest = document.getElementById('interest');
const repayment = document.getElementById('repayment');
const toast = document.getElementById('toast');
const usd = value => `USD ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
function updateLoan() {
  const bitcoin = Number(btcInput.value.replace(/[^0-9.]/g, '')) || 0;
  const principal = bitcoin * BTC_PRICE * (ltv / 100);
  const variableInterest = principal * APR * (days / 360);
  loanAmount.textContent = principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  interest.textContent = usd(variableInterest);
  repayment.textContent = usd(principal + variableInterest);
  document.getElementById('period-label').textContent = `Period: ${days} days`;
}
btcInput.addEventListener('input', updateLoan);
document.querySelectorAll('[data-days]').forEach(button => button.addEventListener('click', () => { days = Number(button.dataset.days); document.querySelectorAll('[data-days]').forEach(item => item.classList.toggle('active', item === button)); updateLoan(); }));
document.querySelectorAll('[data-ltv]').forEach(button => button.addEventListener('click', () => { ltv = Number(button.dataset.ltv); document.querySelectorAll('[data-ltv]').forEach(item => item.classList.toggle('active', item === button)); updateLoan(); }));
document.getElementById('help').addEventListener('click', () => { toast.textContent = 'Speak to your NIXXA Relationship Manager for help.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); });
document.getElementById('apply').addEventListener('click', () => { toast.textContent = 'Loan application flow ready to connect.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2000); });
updateLoan();