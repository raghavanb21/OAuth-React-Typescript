import type { UserRecord, ActivityEntry } from '../types';

const KEYS = {
  users:    'credly_users',
  remember: 'credly_remember',
  sessions: (email: string) => `credly_sessions_${email}`,
  log:      (email: string) => `credly_log_${email}`,
} as const;

export function getUsers(): Record<string, UserRecord> {
  return JSON.parse(localStorage.getItem(KEYS.users) ?? '{}');
}

export function saveUsers(users: Record<string, UserRecord>): void {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

export function saveUser(email: string, record: UserRecord): void {
  const users = getUsers();
  users[email] = record;
  saveUsers(users);
}

export function getRemembered(): { email: string } | null {
  return JSON.parse(localStorage.getItem(KEYS.remember) ?? 'null');
}

export function saveRemembered(data: { email: string }): void {
  localStorage.setItem(KEYS.remember, JSON.stringify(data));
}

export function incrementSessionCount(email: string): number {
  const next = parseInt(localStorage.getItem(KEYS.sessions(email)) ?? '0') + 1;
  localStorage.setItem(KEYS.sessions(email), String(next));
  return next;
}

export function getActivityLog(email: string): ActivityEntry[] {
  return JSON.parse(localStorage.getItem(KEYS.log(email)) ?? '[]');
}

export function appendActivityLog(email: string, entry: ActivityEntry): ActivityEntry[] {
  const log = getActivityLog(email);
  log.unshift(entry);
  if (log.length > 12) log.length = 12;
  localStorage.setItem(KEYS.log(email), JSON.stringify(log));
  return log;
}
