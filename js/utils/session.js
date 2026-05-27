export function createSession(user) {
  const token = crypto.randomUUID();
  sessionStorage.setItem('credly_token', token);
  sessionStorage.setItem('credly_user', JSON.stringify(user));
  return token;
}

export function getSession() {
  const raw = sessionStorage.getItem('credly_user');
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  sessionStorage.removeItem('credly_token');
  sessionStorage.removeItem('credly_user');
}
