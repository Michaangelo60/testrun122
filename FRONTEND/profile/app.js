const views = document.querySelectorAll('.view');
const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function showView(id) {
  views.forEach((view) => view.classList.toggle('active', view.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-open]').forEach((button) => {
  button.addEventListener('click', () => showView(button.dataset.open));
});

document.querySelectorAll('[data-back]').forEach((button) => {
  button.addEventListener('click', () => showView('profile-view'));
});

document.querySelectorAll('[data-message]').forEach((button) => {
  button.addEventListener('click', () => showToast(button.dataset.message));
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast('Copied to clipboard');
    } catch {
      showToast(`Copy: ${button.dataset.copy}`);
    }
  });
});

document.getElementById('set-pin').addEventListener('click', () => showToast('Transaction PIN setup started'));
document.getElementById('sign-out').addEventListener('click', () => {
  localStorage.removeItem('nixxa-auth');
  showToast('You have been signed out');
  window.setTimeout(() => { window.location.href = '../auth/login.html'; }, 700);
});
document.getElementById('delete-account').addEventListener('click', () => showToast('Contact support to delete your account'));

['screenshots', 'panic-balance'].forEach((id) => {
  const control = document.getElementById(id);
  control.checked = localStorage.getItem(`nexos-${id}`) === 'true';
  control.addEventListener('change', () => {
    localStorage.setItem(`nexos-${id}`, control.checked);
    showToast(`${id === 'screenshots' ? 'Screenshots' : 'Panic balance'} ${control.checked ? 'enabled' : 'disabled'}`);
  });
});
