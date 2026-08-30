const openSlide = (target) => {
  const slides = document.querySelectorAll('.finance-slide');
  const dots = document.querySelectorAll('.dot');

  slides.forEach((slide) => {
    slide.classList.toggle('active', slide.dataset.slide === target);
  });

  dots.forEach((dot) => {
    dot.classList.toggle('active', dot.dataset.slideNav === target);
  });
};

document.querySelectorAll('[data-slide-nav]').forEach((button) => {
  button.addEventListener('click', () => openSlide(button.dataset.slideNav));
});

document.querySelectorAll('[data-go]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.go;
    if (target === 'saving') {
      window.location.href = '../saving/index.html';
      return;
    }
    if (target === 'loan') {
      window.location.href = '../loan/index.html';
    }
  });
});

openSlide('saving');
