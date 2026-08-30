const params = new URLSearchParams(window.location.search);
const data = { btc: Number(params.get('btc')) || 5.20075, days: Number(params.get('days')) || 360, ltv: Number(params.get('ltv')) || 20, amount: Number(params.get('amount')) || 66280.65, repayment: Number(params.get('repayment')) || 73240.12 };
const usd = value => `USD ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const stages = [...document.querySelectorAll('.stage')];
const toast = document.getElementById('toast');
let timer;
function show(id) { stages.forEach(stage => stage.classList.toggle('active', stage.id === id)); window.scrollTo(0, 0); }
function goBack() { clearTimeout(timer); window.location.href = '../homepage/index.html'; }
function notify(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); }
document.getElementById('loan-total').textContent = usd(data.amount);
document.getElementById('bitcoin').textContent = `${data.btc} BTC`;
document.getElementById('ltv').textContent = `${data.ltv}%`;
document.getElementById('term').textContent = `${data.days} days`;
document.getElementById('repayment').textContent = usd(data.repayment);
document.getElementById('offer-loan').textContent = usd(data.amount);
document.getElementById('offer-term').textContent = `${data.days} days`;
document.getElementById('offer-btc').textContent = `${data.btc} BTC`;
document.getElementById('approved-amount').textContent = usd(data.amount);
document.getElementById('cancel').addEventListener('click', goBack);
document.getElementById('close').addEventListener('click', goBack);
document.getElementById('back').addEventListener('click', goBack);
document.getElementById('submit').addEventListener('click', () => { show('processing-stage'); timer = setTimeout(() => show('agreement-stage'), 1400); });
document.getElementById('accept').addEventListener('click', () => show('approved-stage'));
document.getElementById('decline').addEventListener('click', goBack);
document.getElementById('done').addEventListener('click', goBack);
document.getElementById('view-wallet').addEventListener('click', () => window.location.href = '../../homepage/index.html');