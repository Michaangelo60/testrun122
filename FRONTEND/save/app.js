const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.getElementById('invest-toggle').addEventListener('click', () => {
  window.location.href = '../invest/index.html';
});

document.querySelectorAll('[data-toast]').forEach((button) => {
  button.addEventListener('click', () => showToast(button.dataset.toast));
});

document.querySelector('.help').addEventListener('click', () => {
  showToast('Need help? Contact Nexos support.');
});
