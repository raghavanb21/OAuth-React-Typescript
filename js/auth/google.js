import { createSession }       from '../utils/session.js';
import { getUsers, saveUser }  from '../utils/storage.js';
import { showToast }           from '../utils/toast.js';

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

export function handleGoogleCredential(response) {
  try {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    const email   = payload.email.toLowerCase();
    const name    = payload.name || email.split('@')[0];
    const users   = getUsers();
    if (!users[email]) {
      saveUser(email, { name, email, method: 'google', joined: Date.now() });
    }
    createSession({ name, email, method: 'google', picture: payload.picture });
    showToast('Signed in with Google!');
    setTimeout(() => { window.location.href = 'welcome.html'; }, 900);
  } catch (e) {
    showToast('Google sign-in failed. Try again.', true);
  }
}

export function triggerGoogleAuth() {
  if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
    showToast('Add your Google Client ID to enable OAuth', true);
    return;
  }
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredential,
  });
  google.accounts.id.prompt();
}
