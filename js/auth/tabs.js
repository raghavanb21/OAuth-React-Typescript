export function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));

  const btn = document.querySelector(`.tab-btn[data-tab="${id}"]`);
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }

  const panel = document.getElementById('panel-' + id);
  if (panel) {
    panel.classList.add('active');
    panel.style.animation = 'none';
    requestAnimationFrame(() => { panel.style.animation = ''; });
  }
}
