import { sha256 }              from '../utils/crypto.js';
import { createSession }       from '../utils/session.js';
import { getUsers, saveUsers } from '../utils/storage.js';
import { setErr, clearErrs }   from './form.js';
import { showToast }           from '../utils/toast.js';

export async function handleSignup() {
  const name  = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim().toLowerCase();
  const pw    = document.getElementById('su-pw').value;
  const pw2   = document.getElementById('su-pw2').value;
  clearErrs('su-name', 'su-email', 'su-pw', 'su-pw2');

  let ok = true;
  if (!name)  { setErr('su-name',  'Name is required'); ok = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setErr('su-email', 'Enter a valid email'); ok = false;
  }
  if (pw.length < 8) { setErr('su-pw',  'At least 8 characters'); ok = false; }
  if (pw !== pw2)    { setErr('su-pw2', 'Passwords do not match'); ok = false; }
  if (!ok) return;

  const users = getUsers();
  if (users[email]) {
    setErr('su-email', 'An account with this email already exists');
    return;
  }

  const btn = document.getElementById('btn-signup');
  btn.classList.add('loading');
  btn.disabled = true;

  const hash = await sha256(pw);
  users[email] = { name, email, hash, method: 'email', joined: Date.now() };
  saveUsers(users);

  setTimeout(() => {
    createSession({ name, email, method: 'email' });
    showToast('Account created! Redirecting…');
    setTimeout(() => { window.location.href = 'welcome.html'; }, 900);
  }, 600);
}
