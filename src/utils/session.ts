import type { User } from '../types';

export function createSession(user: User): string {
  const token = crypto.randomUUID();
  sessionStorage.setItem('credly_token', token);
  sessionStorage.setItem('credly_user', JSON.stringify(user));
  return token;
}

export function getSession(): User | null {
  const raw = sessionStorage.getItem('credly_user');
  return raw ? (JSON.parse(raw) as User) : null;
}

export function clearSession(): void {
  sessionStorage.removeItem('credly_token');
  sessionStorage.removeItem('credly_user');
}
