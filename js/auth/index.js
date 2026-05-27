import { switchTab }                                   from './tabs.js';
import { handleLogin }                                  from './login.js';
import { handleSignup }                                 from './signup.js';
import { triggerGoogleAuth, handleGoogleCredential }    from './google.js';
import { checkStrength }                                from './form.js';
import { getRemembered }                                from '../utils/storage.js';

// Google Identity Services calls this by name on window
window.handleGoogleCredential = handleGoogleCredential;

document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Primary action buttons
  document.getElementById('btn-login').addEventListener('click', handleLogin);
  document.getElementById('btn-signup').addEventListener('click', handleSignup);

  // Google buttons (one per tab)
  document.querySelectorAll('.btn-google').forEach(btn => {
    btn.addEventListener('click', triggerGoogleAuth);
  });

  // Password strength meter
  document.getElementById('su-pw').addEventListener('input', e => checkStrength(e.target.value));

  // Enter key shortcut
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    if (document.getElementById('panel-login').classList.contains('active')) {
      handleLogin();
    } else {
      handleSignup();
    }
  });

  // Auto-fill remembered email
  const rem = getRemembered();
  if (rem) document.getElementById('login-email').value = rem.email;
});
