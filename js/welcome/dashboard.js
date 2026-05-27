import { clearSession }                                        from '../utils/session.js';
import { getUsers, incrementSessionCount, appendActivityLog }  from '../utils/storage.js';
import { renderActivity }                                      from './activity.js';
import { getDailyQuote }                                       from './quotes.js';

export function initDashboard(user) {
  document.body.classList.add('ready');

  // Time-based greeting
  const h        = new Date().getHours();
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('time-greeting').textContent = greeting;

  // Name
  document.getElementById('user-name').textContent = user.name.split(' ')[0];

  // Avatar
  const av = document.getElementById('nav-avatar');
  if (user.picture) {
    av.innerHTML = `<img src="${user.picture}" alt="${user.name}">`;
  } else {
    const initials = user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    av.textContent = initials;
  }

  // Auth method badge
  const methodMap = { google: '✦ Signed in with Google', email: '✦ Signed in with email' };
  document.getElementById('auth-method-label').textContent = methodMap[user.method] || 'Signed in';

  // Stats
  const users     = getUsers();
  const userData  = users[user.email] || {};
  const joined    = userData.joined || Date.now();
  const daysSince = Math.max(1, Math.round((Date.now() - joined) / 86400000));
  document.getElementById('days-active').textContent = daysSince;

  const sc = incrementSessionCount(user.email);
  document.getElementById('session-count').textContent = sc;

  const d = new Date(joined);
  document.getElementById('member-since').textContent = d.toLocaleString('en', { month: 'short', day: 'numeric' });
  document.getElementById('member-year').textContent  = d.getFullYear();

  // Activity log
  const log = appendActivityLog(user.email, { type: 'login', method: user.method, ts: Date.now() });
  renderActivity(log);

  // Daily quote
  const q = getDailyQuote();
  document.getElementById('daily-quote').textContent  = `"${q.q}"`;
  document.getElementById('quote-author').textContent = `— ${q.a}`;

  // Sign-out
  document.getElementById('btn-signout').addEventListener('click', () => {
    clearSession();
    window.location.href = 'auth.html';
  });
}
