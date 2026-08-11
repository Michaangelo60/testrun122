const toast=document.getElementById('toast');
document.querySelectorAll('[data-message]').forEach(button=>button.addEventListener('click',()=>{toast.textContent=button.dataset.message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}));
