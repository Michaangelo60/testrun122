const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const toast = $('.toast'); let toastTimer;
const showToast = (message) => { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2500); };

const durations = [
  ['Custom', 'Set your own goal', 'Your timeline'], ['30 Days', '$1,000 suggested', 'Completes Sep 25'], ['60 Days', '$2,000 suggested', 'Completes Oct 25'], ['90 Days', '$3,000 suggested', 'Completes Nov 25'], ['180 Days', '$4,000 suggested', 'Completes Feb 25, 2027'], ['1 Year', '$5,000 suggested', 'Completes Aug 25, 2027']
];
let selectedDuration = durations[5][0], selectedGoal = 'Emergency Fund', selectedFrequency = 'Monthly', currentStep = 1, autoSave = true;
$('#duration-grid').innerHTML = durations.map(([title, goal, date]) => `<button class="duration-card ${title === selectedDuration ? 'selected' : ''}" data-duration="${title}" data-date="${date.replace('Completes ','')}"><b>${title}</b><span>${goal}</span><small>${date}</small></button>`).join('');
$('#goal-chips').innerHTML = ['Emergency Fund','New Laptop','Business','Travel','Education','Investment','Custom Goal'].map(goal => `<button class="chip ${goal === selectedGoal ? 'selected' : ''}">${goal}</button>`).join('');
$('#frequency-grid').innerHTML = ['Daily','Weekly','Biweekly','Monthly','Manual'].map(f => `<button class="${f === selectedFrequency ? 'selected' : ''}">${f}</button>`).join('');

const transactions = [
  {type:'deposit', symbol:'↓', name:'Monthly Savings', amount:'+$250.00', date:'Aug 18, 2026', group:'Deposits'},
  {type:'bonus', symbol:'✦', name:'Savings bonus', amount:'+$12.50', date:'Aug 01, 2026', group:'Deposits'},
  {type:'withdrawal', symbol:'↑', name:'Savings withdrawal', amount:'-$300.00', date:'Jul 22, 2026', group:'Withdrawals'},
  {type:'fee', symbol:'−', name:'Transfer fee', amount:'-$0.00', date:'Jul 22, 2026', group:'Fees'},
  {type:'deposit', symbol:'↓', name:'Monthly Savings', amount:'+$250.00', date:'Jul 18, 2026', group:'Deposits'}
];
const renderTx = (target, list) => target.innerHTML = list.map(t => `<div class="transaction"><span class="tx-icon ${t.type}">${t.symbol}</span><div class="tx-main"><b>${t.name}</b><span>${t.date}</span></div><div class="tx-amount"><b>${t.amount}</b><span>${t.group === 'Deposits' ? 'Deposit' : t.group.slice(0,-1)}</span></div></div>`).join('');
renderTx($('#recent-transactions'), transactions.slice(0,3)); renderTx($('#history-list'), transactions);

const money = (value) => `$${Number(String(value).replace(/[^0-9.]/g,'') || 0).toLocaleString('en-US', {maximumFractionDigits:2})}`;
function refreshCalculation(){ const amount = money($('#deposit-input').value); $('#calculation-text').textContent = `${amount} × 20 deposits`; $('#projected-total').textContent = `Projected total: ${money(Number(String($('#deposit-input').value).replace(/[^0-9.]/g,''))*20)}`; $('#auto-deposit').textContent = amount; $('#summary-deposit').textContent = amount; }
function updateSummary(){ const target = Number(String($('#target-input').value).replace(/[^0-9.]/g,'')) || 0; $('#summary-target').textContent = money(target); $('#summary-remaining').textContent = money(Math.max(target - 750, 0)); $('#summary-frequency').textContent = selectedFrequency; $('#auto-frequency').textContent = selectedFrequency === 'Biweekly' ? 'Every 2 Weeks' : `Every ${selectedFrequency.replace('ly','')}`; $('#summary-duration').textContent = selectedDuration; const card = $(`.duration-card[data-duration="${selectedDuration}"]`); $('#summary-completion').textContent = card?.dataset.date || 'Your timeline'; $('#summary-auto').textContent = autoSave ? 'Enabled' : 'Not enabled'; }
function showView(id){ $$('.view').forEach(v => v.classList.remove('active')); $(`#${id}`).classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
function showStep(n){ currentStep = n; $$('.step').forEach(s => s.classList.toggle('active', Number(s.dataset.step) === n)); $('#step-number').textContent = n; $('#step-progress').style.width = `${n * 20}%`; $('#prev-step').style.visibility = n === 1 ? 'hidden' : 'visible'; $('#next-step').textContent = n === 5 ? 'Create Savings Plan' : 'Continue'; if(n === 5) updateSummary(); }

$$('[data-open-plan]').forEach(b => b.addEventListener('click', () => { showView('builder-view'); showStep(1); }));
$$('[data-back-dashboard]').forEach(b => b.addEventListener('click', () => showView('dashboard-view')));
$$('[data-show-history]').forEach(b => b.addEventListener('click', () => showView('history-view')));
$$('[data-toast]').forEach(b => b.addEventListener('click', () => showToast(b.dataset.toast)));
$$('.duration-card').forEach(card => card.addEventListener('click', () => { selectedDuration = card.dataset.duration; $$('.duration-card').forEach(c => c.classList.toggle('selected',c === card)); }));
$$('.chip').forEach(chip => chip.addEventListener('click', () => { selectedGoal = chip.textContent; $$('.chip').forEach(c => c.classList.toggle('selected',c === chip)); }));
$$('.frequency-grid button').forEach(button => button.addEventListener('click', () => { selectedFrequency = button.textContent; $$('.frequency-grid button').forEach(b => b.classList.toggle('selected', b === button)); refreshCalculation(); }));
$('#deposit-input').addEventListener('input', refreshCalculation); $('#target-input').addEventListener('input', updateSummary);
$('#autosave-toggle').addEventListener('click', function(){ autoSave = !autoSave; this.classList.toggle('on', autoSave); this.setAttribute('aria-pressed',autoSave); $('#autosave-details').style.opacity = autoSave ? '1' : '.42'; });
$('#next-step').addEventListener('click', () => { if(currentStep === 5){ showView('dashboard-view'); showToast('Your savings plan has been created.'); } else showStep(currentStep + 1); });
$('#prev-step').addEventListener('click', () => currentStep > 1 && showStep(currentStep - 1));
$('#history-filters').addEventListener('click', e => { if(e.target.tagName !== 'BUTTON') return; $$('#history-filters button').forEach(b => b.classList.toggle('active', b === e.target)); renderTx($('#history-list'), e.target.textContent === 'All' ? transactions : transactions.filter(t => t.group === e.target.textContent)); });
$$('[data-open-withdraw]').forEach(b => b.addEventListener('click', () => { $('#withdraw-modal').classList.add('show'); $('#withdraw-modal').setAttribute('aria-hidden','false'); }));
function closeWithdraw(){ $('#withdraw-modal').classList.remove('show'); $('#withdraw-modal').setAttribute('aria-hidden','true'); } $('#withdraw-modal').addEventListener('click', e => { if(e.target === $('#withdraw-modal')) closeWithdraw(); }); $('[data-close-withdraw]').addEventListener('click', closeWithdraw);
$$('.destination-options button').forEach(b => b.addEventListener('click', () => $$('.destination-options button').forEach(x => x.classList.toggle('selected',x === b))));
$('#withdraw-input').addEventListener('input', e => { $('#withdraw-amount').textContent = money(e.target.value); $('#you-receive').textContent = money(e.target.value); });
$('#confirm-withdraw').addEventListener('click', () => { closeWithdraw(); showToast('Withdrawal confirmed — $500.00 will move to your USD Wallet.'); });
refreshCalculation();
