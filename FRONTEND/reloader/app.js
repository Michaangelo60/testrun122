document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = localStorage.getItem('nixxa-auth') === 'true';

  
  setTimeout(function () {
    if (isLoggedIn) {
      window.location.href = resolveTarget('index.html');
      return;
    }
    window.location.href = resolveTarget('auth/login.html');
  }, 6000);
});
