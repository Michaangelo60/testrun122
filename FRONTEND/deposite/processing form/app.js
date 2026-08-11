const stages = [...document.querySelectorAll('.stage')];
const toast = document.getElementById('toast');
let processingTimer;
function showStage(id) { stages.forEach(stage => stage.classList.toggle('active', stage.id === id)); }
function showToast(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1700); }
function closeFlow() { clearTimeout(processingTimer); showStage('confirm-stage'); }
document.getElementById('cancel').addEventListener('click', closeFlow);
document.getElementById('close').addEventListener('click', closeFlow);
document.getElementById('confirm').addEventListener('click', () => { showStage('processing-stage'); processingTimer = setTimeout(() => showStage('instructions-stage'), 1300); });
document.getElementById('transfer-done').addEventListener('click', () => showStage('initiated-stage'));
document.getElementById('wallet').addEventListener('click', () => window.location.href = '../../index.html');
document.getElementById('done').addEventListener('click', closeFlow);
document.querySelectorAll('.copy').forEach(button => button.addEventListener('click', () => { navigator.clipboard?.writeText(button.dataset.copy); showToast('Copied to clipboard'); }));