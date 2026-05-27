import { sha256 }                    from '../utils/crypto.js';
import { createSession }             from '../utils/session.js';
import { getUsers, saveRemembered }  from '../utils/storage.js';
import { setErr, clearErrs }         from './form.js';
import { showToast }                 from '../utils/toast.js';

export async function handleLogin() {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pw    = document.getElementById('login-pw').value;
  clearErrs('login-email', 'login-pw');

  let ok = true;
  if (!email) { setErr('login-email', 'Email is required'); ok = false; }
  if (!pw)    { setErr('login-pw',    'Password is required'); ok = false; }
  if (!ok) return;

  const btn = document.getElementById('btn-login');
  btn.classList.add('loading');
  btn.disabled = true;

  const users = getUsers();
  const hash  = await sha256(pw);

  setTimeout(() => {
    if (!users[email] || users[email].hash !== hash) {
      btn.classList.remove('loading');
      btn.disabled = false;
      setErr('login-pw', 'Incorrect email or password');
      return;
    }
    const u = users[email];
    if (document.getElementById('remember-me').checked) {
      saveRemembered({ name: u.name, email, method: u.method });
    }
    createSession({ name: u.name, email, method: u.method });
    showToast('Welcome back, ' + u.name.split(' ')[0] + '!');
    setTimeout(() => { window.location.href = 'welcome.html'; }, 900);
  }, 700);
}
