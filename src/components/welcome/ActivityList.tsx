import type { ActivityEntry } from '../../types';
import s from './ActivityList.module.css';

const ICONS: Record<string, string> = { login: '→', signup: '✦', google: '◈' };

function timeAgo(ts: number): string {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60)    return 'Just now';
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(ts).toLocaleDateString('en', { month: 'short', day: 'numeric' });
}

interface Props {
  log: ActivityEntry[];
}

export function ActivityList({ log }: Props) {
  if (!log.length) {
    return <p className={s.empty}>No activity yet.</p>;
  }
  return (
    <div className={s.list}>
      {log.map((item, i) => (
        <div key={i} className={s.item} style={{ animationDelay: `${i * 0.05}s` }}>
          <div className={s.icon}>{ICONS[item.type] ?? '·'}</div>
          <div className={s.text}>
            <p className={s.title}>{item.type === 'login' ? 'Signed in' : 'Account created'}</p>
            <p className={s.meta}>via {item.method === 'google' ? 'Google OAuth' : 'email & password'}</p>
          </div>
          <span className={s.time}>{timeAgo(item.ts)}</span>
        </div>
      ))}
    </div>
  );
}
