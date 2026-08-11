let paymentMethod = 'USD wallet';
const cardName = document.getElementById('card-name');
const nameInput = document.getElementById('name-input');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const toast = document.getElementById('toast');
function notify(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); }
nameInput.addEventListener('input', () => { cardName.textContent = (nameInput.value || 'YOUR NAME').toUpperCase(); });
document.querySelectorAll('[data-payment]').forEach(button => button.addEventListener('click', () => { paymentMethod = button.dataset.payment === 'USD' ? 'USD wallet' : 'BTC transfer'; document.querySelectorAll('[data-payment]').forEach(item => item.classList.toggle('active', item === button)); }));
document.getElementById('invite').addEventListener('click', () => notify('Your NIXXA invitation link is ready to share'));
document.getElementById('help').addEventListener('click', () => notify('NIXXA membership support is ready to help'));
document.getElementById('apply').addEventListener('click', () => { modalContent.innerHTML = `<h2>Review membership</h2><p>Start your 30-day NIXXA Gold membership trial.</p><p class="modal-price">USD $1,000 / year</p><div class="modal-rows"><div><span>Cardholder</span><b>${cardName.textContent}</b></div><div><span>Payment method</span><b>${paymentMethod}</b></div><div><span>Trial period</span><b>30 days</b></div></div><button class="confirm" id="confirm-membership">Start membership trial</button>`; modal.classList.remove('hidden'); document.getElementById('confirm-membership').addEventListener('click', () => { modal.classList.add('hidden'); notify('Membership application initiated'); }); });
document.getElementById('modal-close').addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', event => { if (event.target === modal) modal.classList.add('hidden'); });