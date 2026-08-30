const filterButtons = document.querySelectorAll('[data-filter]');
const transactions = document.querySelectorAll('.transaction');
const empty = document.getElementById('empty');
const detailSheet = document.getElementById('detail-sheet');
const toast = document.getElementById('toast');
const filterSheet = document.getElementById('filter-sheet');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const customDates = document.getElementById('custom-dates');

let advancedType = 'all';
let selectedRange = 'all';

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

function updateVisibleTransactions() {
  let visible = 0;

  transactions.forEach((transaction) => {
    const typeMatch = advancedType === 'all' || transaction.dataset.type === advancedType;
    const transactionDate = transaction.dataset.date;
    const isToday = transactionDate === '2026-08-10';
    const inMonth = transactionDate.startsWith('2026-08');
    const customMatch = selectedRange !== 'custom' || (
      (!startDateInput.value || transactionDate >= startDateInput.value) &&
      (!endDateInput.value || transactionDate <= endDateInput.value)
    );
    const rangeMatch = selectedRange === 'all' ||
      (selectedRange === 'today' && isToday) ||
      (selectedRange === 'month' && inMonth) ||
      customMatch;

    const show = typeMatch && rangeMatch;
    transaction.classList.toggle('hidden', !show);
    if (show) visible++;
  });

  empty.classList.toggle('hidden', visible !== 0);
}

filterButtons.forEach((button) =>
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    advancedType = filter;
    updateVisibleTransactions();
  })
);

transactions.forEach((transaction) => {
  transaction.addEventListener('click', () => {
    const title = transaction.querySelector('.transaction-copy b').textContent;
    const amount = transaction.querySelector('strong').textContent;

    document.getElementById('detail-title').textContent = title;
    document.getElementById('detail-description').textContent = transaction.dataset.detail;

    const detailAmount = document.getElementById('detail-amount');
    detailAmount.textContent = amount;
    detailAmount.className = `sheet-amount ${transaction.dataset.type === 'in' ? 'in' : 'out'}`;

    detailSheet.classList.remove('hidden');
  });
});

document.getElementById('sheet-close').addEventListener('click', () => detailSheet.classList.add('hidden'));
detailSheet.addEventListener('click', (event) => {
  if (event.target === detailSheet) detailSheet.classList.add('hidden');
});

document.getElementById('share').addEventListener('click', () => notify('Receipt is ready to share'));

document.getElementById('filter').addEventListener('click', () => filterSheet.classList.remove('hidden'));
document.getElementById('filter-close').addEventListener('click', () => filterSheet.classList.add('hidden'));
filterSheet.addEventListener('click', (event) => {
  if (event.target === filterSheet) filterSheet.classList.add('hidden');
});

document.getElementById('download').addEventListener('click', () => notify('Statement download started'));
document.getElementById('download-statement').addEventListener('click', () => notify('Statement download started'));

document.querySelectorAll('[data-advanced-type]').forEach((button) =>
  button.addEventListener('click', () => {
    advancedType = button.dataset.advancedType;
    document.querySelectorAll('[data-advanced-type]').forEach((item) => item.classList.toggle('active', item === button));
    updateVisibleTransactions();
  })
);

document.querySelectorAll('[data-range]').forEach((button) =>
  button.addEventListener('click', () => {
    selectedRange = button.dataset.range;
    document.querySelectorAll('[data-range]').forEach((item) => item.classList.toggle('active', item === button));
    customDates.classList.toggle('show', selectedRange === 'custom');
  })
);

document.getElementById('apply-filter').addEventListener('click', () => {
  updateVisibleTransactions();
  filterSheet.classList.add('hidden');
  notify('Transaction filters applied');
});

document.getElementById('clear-filter').addEventListener('click', () => {
  advancedType = 'all';
  selectedRange = 'all';
  startDateInput.value = '';
  endDateInput.value = '';
  customDates.classList.remove('show');

  document.querySelector('[data-advanced-type="all"]').click();
  document.querySelector('[data-range="all"]').click();
  filterButtons.forEach((button) => button.classList.toggle('active', button.dataset.filter === 'all'));
  transactions.forEach((transaction) => transaction.classList.remove('hidden'));
  empty.classList.add('hidden');
  filterSheet.classList.add('hidden');
});

updateVisibleTransactions();
