const planButtons = document.querySelectorAll('.plan-option');
const methodButtons = document.querySelectorAll('.method-pill');
const tabButtons = document.querySelectorAll('.tab-btn');
const backLinks = document.querySelectorAll('[data-go]');
const form = document.getElementById('savingsForm');
const targetInput = document.getElementById('targetAmount');
const depositInput = document.getElementById('depositAmount');
const frequencySelect = document.getElementById('frequencySelect');
const startDateInput = document.getElementById('startDate');
const fundingSourceInput = document.getElementById('fundingSource');
const formError = document.getElementById('formError');

const projectedDateEl = document.getElementById('projectedDate');
const projectedTotalEl = document.getElementById('projectedTotal');
const estimatedCompletionEl = document.getElementById('estimatedCompletion');

const reviewGoalEl = document.getElementById('reviewGoal');
const reviewPlanEl = document.getElementById('reviewPlan');
const reviewDepositEl = document.getElementById('reviewDeposit');
const reviewFrequencyEl = document.getElementById('reviewFrequency');
const reviewFundingEl = document.getElementById('reviewFunding');
const reviewDateEl = document.getElementById('reviewDate');
const reviewTotalEl = document.getElementById('reviewTotal');

const saveDraftBtn = document.getElementById('saveDraftBtn');
const confirmPlanBtn = document.getElementById('confirmPlanBtn');
const pausePlanBtn = document.getElementById('pausePlanBtn');
const editPlanBtn = document.getElementById('editPlanBtn');

const state = {
  selectedPlan: 'Custom',
  selectedMethod: 'Daily',
};

function setTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  startDateInput.value = `${yyyy}-${mm}-${dd}`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value || 0);
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function getFrequencyDays(frequency) {
  const map = {
    Daily: 1,
    Weekly: 7,
    Biweekly: 14,
    Monthly: 30,
    Manual: 30,
  };
  return map[frequency] || 30;
}

function isValidUSD(value) {
  if (value === '' || Number.isNaN(Number(value))) return false;
  return Number(value) > 0;
}

function isValidDate(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString + 'T00:00:00');
  return !Number.isNaN(date.getTime());
}

function calculateProjection() {
  const target = Number(targetInput.value);
  const deposit = Number(depositInput.value);
  const frequency = frequencySelect.value;
  const startDate = startDateInput.value ? new Date(startDateInput.value + 'T00:00:00') : null;

  if (!isValidUSD(target) || !isValidUSD(deposit) || !startDate || !isValidDate(startDateInput.value)) {
    return null;
  }

  if (deposit > target) {
    return {
      projectedDate: new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
      total: deposit,
      completionText: 'Goal reached with a single contribution',
      methodUsed: state.selectedMethod,
      remaining: target,
    };
  }

  let remaining = target;
  let totalContributions = 0;
  let currentDate = new Date(startDate);
  const daysPerCycle = getFrequencyDays(frequency);

  while (remaining > 0) {
    remaining -= deposit;
    totalContributions += deposit;
    currentDate = new Date(currentDate.getTime() + daysPerCycle * 24 * 60 * 60 * 1000);

    if (remaining <= 0) {
      break;
    }
  }

  let completionText = `${Math.ceil(target / deposit)} ${frequency.toLowerCase()} deposits`;
  if (frequency === 'Manual') {
    completionText = 'Manual deposits as scheduled';
  }

  return {
    projectedDate: currentDate,
    total: totalContributions,
    completionText,
    remaining: Math.max(0, remaining),
  };
}

function updateProjection() {
  const result = calculateProjection();
  if (!result) {
    projectedDateEl.textContent = '--';
    projectedTotalEl.textContent = '--';
    estimatedCompletionEl.textContent = '--';
    return;
  }

  projectedDateEl.textContent = formatLongDate(result.projectedDate);
  projectedTotalEl.textContent = formatCurrency(result.total);
  estimatedCompletionEl.textContent = result.completionText;

  reviewGoalEl.textContent = formatCurrency(Number(targetInput.value || 0));
  reviewPlanEl.textContent = state.selectedPlan;
  reviewDepositEl.textContent = formatCurrency(Number(depositInput.value || 0));
  reviewFrequencyEl.textContent = frequencySelect.value;
  reviewFundingEl.textContent = fundingSourceInput.value;
  reviewDateEl.textContent = formatLongDate(new Date(startDateInput.value + 'T00:00:00'));
  reviewTotalEl.textContent = formatCurrency(result.total);
}

function validateForm() {
  const target = Number(targetInput.value);
  const deposit = Number(depositInput.value);
  const startDate = startDateInput.value;

  if (!target || target <= 0 || !Number.isFinite(target)) {
    formError.textContent = 'Enter a valid target amount greater than $0.';
    return false;
  }

  if (!deposit || deposit <= 0 || !Number.isFinite(deposit)) {
    formError.textContent = 'Enter a valid deposit amount greater than $0.';
    return false;
  }

  if (deposit > target) {
    formError.textContent = 'Deposit amount cannot exceed the target amount.';
    return false;
  }

  if (!startDate || !isValidDate(startDate)) {
    formError.textContent = 'Choose a valid start date.';
    return false;
  }

  formError.textContent = '';
  return true;
}

function setActiveScreen(screenId) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.toggle('active', screen.id === screenId);
  });

  tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.screen === screenId);
  });
}

function selectPlan(planName) {
  state.selectedPlan = planName;
  planButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.plan === planName);
  });

  const presets = {
    Custom: { target: 2500, deposit: 250, frequency: 'Monthly' },
    '30 Days': { target: 1000, deposit: 35, frequency: 'Daily' },
    '60 Days': { target: 2200, deposit: 75, frequency: 'Weekly' },
    '180 Days': { target: 5000, deposit: 300, frequency: 'Biweekly' },
    '1 Year': { target: 12000, deposit: 1000, frequency: 'Monthly' },
  };

  if (!presets[planName]) return;

  targetInput.value = presets[planName].target;
  depositInput.value = presets[planName].deposit;
  frequencySelect.value = presets[planName].frequency;
  updateProjection();
}

function chooseMethod(methodName) {
  state.selectedMethod = methodName;
  methodButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.method === methodName);
  });
}

planButtons.forEach((button) => {
  button.addEventListener('click', () => selectPlan(button.dataset.plan));
});

methodButtons.forEach((button) => {
  button.addEventListener('click', () => chooseMethod(button.dataset.method));
});

[ targetInput, depositInput, frequencySelect, startDateInput, fundingSourceInput ].forEach((element) => {
  element.addEventListener('input', updateProjection);
  element.addEventListener('change', updateProjection);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateForm()) return;
  updateProjection();
  setActiveScreen('reviewScreen');
});

saveDraftBtn.addEventListener('click', () => {
  if (!validateForm()) return;
  formError.textContent = 'Draft saved. You can continue later.';
  formError.style.color = '#55c98a';
});

confirmPlanBtn.addEventListener('click', () => {
  if (!validateForm()) return;
  setActiveScreen('activeScreen');
});

pausePlanBtn.addEventListener('click', () => {
  pausePlanBtn.textContent = pausePlanBtn.textContent === 'Pause plan' ? 'Resume plan' : 'Pause plan';
  pausePlanBtn.classList.toggle('paused');
});

editPlanBtn.addEventListener('click', () => {
  setActiveScreen('planScreen');
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const screenId = button.dataset.screen;
    setActiveScreen(screenId);
  });
});

backLinks.forEach((button) => {
  button.addEventListener('click', () => {
    const screenId = button.dataset.go;
    setActiveScreen(screenId);
  });
});

document.querySelector('.icon-btn')?.addEventListener('click', () => {
  window.location.href = '../index.html';
});

setTodayDate();
selectPlan('Custom');
updateProjection();
