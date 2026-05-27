const KEYS = {
  users:    'credly_users',
  remember: 'credly_remember',
  sessions: email => 'credly_sessions_' + email,
  log:      email => 'credly_log_' + email,
};

export function getUsers() {
  return JSON.parse(localStorage.getItem(KEYS.users) || '{}');
}

export function saveUsers(users) {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

export function saveUser(email, record) {
  const users = getUsers();
  users[email] = record;
  saveUsers(users);
}

export function getRemembered() {
  return JSON.parse(localStorage.getItem(KEYS.remember) || 'null');
}

export function saveRemembered(data) {
  localStorage.setItem(KEYS.remember, JSON.stringify(data));
}

export function getSessionCount(email) {
  return parseInt(localStorage.getItem(KEYS.sessions(email)) || '0');
}

export function incrementSessionCount(email) {
  const next = getSessionCount(email) + 1;
  localStorage.setItem(KEYS.sessions(email), next);
  return next;
}

export function getActivityLog(email) {
  return JSON.parse(localStorage.getItem(KEYS.log(email)) || '[]');
}

export function appendActivityLog(email, entry) {
  const log = getActivityLog(email);
  log.unshift(entry);
  if (log.length > 12) log.length = 12;
  localStorage.setItem(KEYS.log(email), JSON.stringify(log));
  return log;
}
