document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = localStorage.getItem('nixxa-auth') === 'true';

  setTimeout(function () {
    if (isLoggedIn) {
      window.location.href = '../index.html';
      return;
    }
    window.location.href = '../auth/login.html';
  }, 6000);
});
