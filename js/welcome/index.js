import { getSession }    from '../utils/session.js';
import { initDashboard } from './dashboard.js';

// Guard: redirect immediately if no active session
const user = getSession();
if (!user) {
  window.location.href = 'auth.html';
  throw new Error('No session');
}

document.addEventListener('DOMContentLoaded', () => initDashboard(user));
