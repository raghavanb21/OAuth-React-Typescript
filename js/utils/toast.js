let toastTimer;

export function showToast(msg, err = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.toggle('error-toast', err);
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}
