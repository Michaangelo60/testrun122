const toast = document.getElementById('toast');

const notify = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
};

document.querySelector('[data-message]')?.addEventListener('click', () => {
  notify('News settings are ready');
});
