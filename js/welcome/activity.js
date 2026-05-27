export const icons = { login: '→', signup: '✦', google: '◈' };

export function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60)    return 'Just now';
  if (diff < 3600)  return Math.floor(diff / 60)  + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return new Date(ts).toLocaleDateString('en', { month: 'short', day: 'numeric' });
}

export function renderActivity(log) {
  const el = document.getElementById('activity-list');
  if (!log.length) {
    el.innerHTML = '<p style="color:var(--ink4);font-size:14px;padding:16px 0">No activity yet.</p>';
    return;
  }
  el.innerHTML = log.map((item, i) => `
    <div class="activity-item" style="animation-delay:${i * 0.05}s">
      <div class="activity-icon">${icons[item.type] || '·'}</div>
      <div class="activity-text">
        <p class="activity-title">${item.type === 'login' ? 'Signed in' : 'Account created'}</p>
        <p class="activity-meta">via ${item.method === 'google' ? 'Google OAuth' : 'email & password'}</p>
      </div>
      <span class="activity-time">${timeAgo(item.ts)}</span>
    </div>
  `).join('');
}
