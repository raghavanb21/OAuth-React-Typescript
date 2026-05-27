export function setErr(id, msg) {
  const input = document.getElementById(id);
  const err   = document.getElementById(id + '-err');
  if (input) input.classList.toggle('error', !!msg);
  if (err)   { err.textContent = msg; err.classList.toggle('show', !!msg); }
}

export function clearErrs(...ids) {
  ids.forEach(id => setErr(id, ''));
}

export function checkStrength(val) {
  const wrap = document.getElementById('pw-strength');
  if (!val) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  let score = 0;
  if (val.length >= 8)           score++;
  if (/[A-Z]/.test(val))         score++;
  if (/[0-9]/.test(val))         score++;
  if (/[^A-Za-z0-9]/.test(val))  score++;
  const bars   = ['bar1', 'bar2', 'bar3', 'bar4'];
  const cls    = score <= 1 ? 'weak' : score === 2 ? 'fair' : 'good';
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  bars.forEach((b, i) => {
    const el = document.getElementById(b);
    el.className = 'pw-bar';
    if (i < score) el.classList.add(cls);
  });
  document.getElementById('pw-label').textContent = labels[score] || '';
}
