const filterButtons = document.querySelectorAll('[data-filter]');
const transactions = document.querySelectorAll('.transaction');
const empty = document.getElementById('empty');
const detailSheet = document.getElementById('detail-sheet');
const toast = document.getElementById('toast');
function notify(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); }
filterButtons.forEach(button => button.addEventListener('click', () => { const filter = button.dataset.filter; filterButtons.forEach(item => item.classList.toggle('active', item === button)); let visible = 0; transactions.forEach(transaction => { const show = filter === 'all' || transaction.dataset.type === filter; transaction.classList.toggle('hidden', !show); if (show) visible++; }); empty.classList.toggle('hidden', visible !== 0); }));
transactions.forEach(transaction => transaction.addEventListener('click', () => { const title = transaction.querySelector('.transaction-copy b').textContent; const amount = transaction.querySelector('strong').textContent; document.getElementById('detail-title').textContent = title; document.getElementById('detail-description').textContent = transaction.dataset.detail; const detailAmount = document.getElementById('detail-amount'); detailAmount.textContent = amount; detailAmount.className = `sheet-amount ${transaction.dataset.type === 'in' ? 'in' : 'out'}`; detailSheet.classList.remove('hidden'); }));
document.getElementById('sheet-close').addEventListener('click', () => detailSheet.classList.add('hidden'));
detailSheet.addEventListener('click', event => { if (event.target === detailSheet) detailSheet.classList.add('hidden'); });
document.getElementById('share').addEventListener('click', () => notify('Receipt is ready to share'));
document.getElementById('filter').addEventListener('click', () => notify('Advanced filters coming soon'));
const filterSheet = document.getElementById('filter-sheet');
let advancedType = 'all';
let selectedRange = 'all';
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const customDates = document.getElementById('custom-dates');
const allTransactionData = [
  ['Bought Dollar', 'Today, 09:15 AM', '-$500.00'],
  ['Received from James', 'Today, 07:30 AM', '+â‚¦25,000.00'],
  ['Deposit', 'Yesterday, 07:45 PM', '+â‚¦200,000.00'],
  ['Payment to Amazon', 'Yesterday, 06:40 PM', '-$25.60'],
  ['Send to Daniel', '10 July, 06:10 PM', '-$50,000.00']
];
function openFilterSheet() { filterSheet.classList.remove('hidden'); }
function closeFilterSheet() { filterSheet.classList.add('hidden'); }
function downloadStatement() {
  const rows = [['Description', 'Date', 'Amount'], ...allTransactionData];
  const csv = rows.map(row => row.map(value => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  link.download = 'nixxa-transaction-statement.csv';
  link.click();
  URL.revokeObjectURL(link.href);
  notify('Your statement download has started');
}
document.getElementById('filter').addEventListener('click', openFilterSheet);
document.getElementById('filter-close').addEventListener('click', closeFilterSheet);
filterSheet.addEventListener('click', event => { if (event.target === filterSheet) closeFilterSheet(); });
document.getElementById('download').addEventListener('click', downloadStatement);
document.getElementById('download-statement').addEventListener('click', downloadStatement);
document.querySelectorAll('[data-advanced-type]').forEach(button => button.addEventListener('click', () => { advancedType = button.dataset.advancedType; document.querySelectorAll('[data-advanced-type]').forEach(item => item.classList.toggle('active', item === button)); }));
document.querySelectorAll('[data-range]').forEach(button => button.addEventListener('click', () => { selectedRange = button.dataset.range; document.querySelectorAll('[data-range]').forEach(item => item.classList.toggle('active', item === button)); customDates.classList.toggle('show', selectedRange === 'custom'); }));
document.getElementById('apply-filter').addEventListener('click', () => { transactions.forEach(transaction => { const typeMatch = advancedType === 'all' || transaction.dataset.type === advancedType; const transactionDate = transaction.dataset.date; const isToday = transactionDate === '2026-08-10'; const inMonth = transactionDate.startsWith('2026-08'); const customMatch = selectedRange !== 'custom' || ((!startDateInput.value || transactionDate >= startDateInput.value) && (!endDateInput.value || transactionDate <= endDateInput.value)); const rangeMatch = selectedRange === 'all' || (selectedRange === 'today' && isToday) || (selectedRange === 'month' && inMonth) || customMatch; transaction.classList.toggle('hidden', !(typeMatch && rangeMatch)); }); const visible = [...transactions].filter(item => !item.classList.contains('hidden')).length; empty.classList.toggle('hidden', visible !== 0); closeFilterSheet(); notify('Transaction filters applied'); });
document.getElementById('clear-filter').addEventListener('click', () => { advancedType = 'all'; selectedRange = 'all'; startDateInput.value = ''; endDateInput.value = ''; customDates.classList.remove('show'); document.querySelector('[data-advanced-type="all"]').click(); document.querySelector('[data-range="all"]').click(); transactions.forEach(transaction => transaction.classList.remove('hidden')); empty.classList.add('hidden'); closeFilterSheet(); });