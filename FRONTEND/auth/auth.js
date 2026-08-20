const byId = (id) => document.getElementById(id);

document.querySelectorAll('[data-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const input = byId(button.dataset.toggle);
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    button.textContent = isHidden ? 'Hide' : 'Show';
  });
});

const signupForm = byId('signup-form');

if (signupForm) {
  let currentStep = 1;
  const today = new Date();
  const firstName = byId('first-name');
  const lastName = byId('last-name');
  const age = byId('age');
  const birthDay = byId('birth-day');
  const birthMonth = byId('birth-month');
  const country = byId('country');
  const phone = byId('phone');
  const email = byId('email');
  const password = byId('password');
  const confirmPassword = byId('confirm-password');
  const error = byId('error');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  for (let day = 1; day <= 31; day += 1) {
    birthDay.insertAdjacentHTML('beforeend', `<option value="${day}">${day}</option>`);
  }

  months.forEach((month, index) => {
    birthMonth.insertAdjacentHTML('beforeend', `<option value="${index + 1}">${month}</option>`);
  });

  function showStep() {
    document.querySelectorAll('.step').forEach((section) => {
      section.classList.toggle('active', Number(section.dataset.step) === currentStep);
    });
    byId('progress-bar').style.width = `${currentStep * 20}%`;
    byId('previous').style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    byId('next').hidden = currentStep === 5;
    byId('create').hidden = currentStep !== 5;
    error.textContent = '';
    if (currentStep === 5) renderReview();
  }

  function renderReview() {
    const monthText = birthMonth.options[birthMonth.selectedIndex]?.text || '';
    byId('review-name').textContent = `${firstName.value} ${lastName.value}`;
    byId('review-dob').textContent = `${birthDay.value} ${monthText} ${today.getFullYear() - Number(age.value || 0)}`;
    byId('review-country').textContent = country.options[country.selectedIndex].text;
    byId('review-phone').textContent = `${byId('country-code').textContent} ${phone.value}`;
    byId('review-email').textContent = email.value;
  }

  function isValid() {
    if (currentStep === 1) return firstName.value.trim() && lastName.value.trim();
    if (currentStep === 2) return Number(age.value) >= 18 && birthDay.value && birthMonth.value;
    if (currentStep === 3) return country.value && phone.value.trim() && email.checkValidity();
    if (currentStep === 4) return password.value.length >= 8 && password.value === confirmPassword.value;
    return byId('terms').checked;
  }

  byId('next').addEventListener('click', () => {
    if (!isValid()) {
      error.textContent = currentStep === 2 ? 'Enter an age of 18+ and your birth day and month.' : 'Please complete all required fields correctly.';
      return;
    }
    currentStep += 1;
    showStep();
  });

  byId('previous').addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep -= 1;
      showStep();
    }
  });

  age.addEventListener('input', () => {
    const enteredAge = Number(age.value);
    byId('birth-preview').innerHTML = enteredAge
      ? `Your estimated year of birth is <b>${today.getFullYear() - enteredAge}</b>. Select your birth day and month.`
      : 'Your estimated year of birth will appear here.';
  });

  country.addEventListener('change', () => {
    const codes = { NG: '+234', GH: '+233', KE: '+254' };
    byId('country-code').textContent = codes[country.value] || '+000';
  });

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!isValid()) {
      error.textContent = 'Please agree to the Terms and Conditions to continue.';
      return;
    }
    localStorage.setItem('nixxa-auth', 'true');
    window.location.href = '../index.html';
  });

  showStep();
}

const loginForm = byId('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem('nixxa-auth', 'true');
    const toast = byId('toast');
    toast.textContent = 'Login successful. Opening your dashboard...';
    toast.classList.add('show');
    setTimeout(() => { window.location.href = '../index.html'; }, 1000);
  });
}
