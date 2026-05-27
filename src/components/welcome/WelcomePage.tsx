import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUsers, incrementSessionCount, appendActivityLog } from '../../utils/storage';
import { StatCard } from './StatCard';
import { ActivityList } from './ActivityList';
import { QuoteBlock } from './QuoteBlock';
import { Toast } from '../ui/Toast';
import type { ActivityEntry } from '../../types';
import s from './WelcomePage.module.css';

function greeting(): string {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

export function WelcomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sessionCount, setSessionCount] = useState(0);
  const [daysSince, setDaysSince]       = useState(1);
  const [memberSince, setMemberSince]   = useState('');
  const [memberYear, setMemberYear]     = useState('');
  const [log, setLog]                   = useState<ActivityEntry[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!user || initialized.current) return;
    initialized.current = true;

    const users    = getUsers();
    const record   = users[user.email] ?? {};
    const joined   = record.joined ?? Date.now();
    const days     = Math.max(1, Math.round((Date.now() - joined) / 86_400_000));
    const d        = new Date(joined);
    setDaysSince(days);
    setMemberSince(d.toLocaleString('en', { month: 'short', day: 'numeric' }));
    setMemberYear(String(d.getFullYear()));

    setSessionCount(incrementSessionCount(user.email));
    setLog(appendActivityLog(user.email, { type: 'login', method: user.method, ts: Date.now() }));
  }, [user]);

  function handleSignOut() {
    logout();
    navigate('/', { replace: true });
  }

  const initials = user?.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() ?? '';

  return (
    <>
      <div className={s.bg}>
        <div className={s.orb1} />
        <div className={s.orb2} />

        <nav className={s.nav}>
          <span className={s.brand}>Credly<span>.</span></span>
          <div className={s.navRight}>
            <div className={s.avatar}>
              {user?.picture
                ? <img src={user.picture} alt={user.name} />
                : initials
              }
            </div>
            <button className={s.signOutBtn} onClick={handleSignOut}>Sign out</button>
          </div>
        </nav>

        <header className={s.hero}>
          <p className={s.eyebrow}>{greeting()}</p>
          <h1 className={s.heroTitle}>
            Welcome back,<br />
            <span className={s.heroName}>{user?.name.split(' ')[0]}</span>.
          </h1>
          <span className={s.badge}>
            <span className={s.dot} />
            {user?.method === 'google' ? 'Signed in with Google' : 'Signed in with email'}
          </span>
        </header>

        <section className={s.section}>
          <p className={s.sectionLabel}>Your overview</p>
          <div className={s.statsGrid}>
            <StatCard label="Days active"   value={daysSince}     sub="Since you joined" />
            <StatCard label="Sessions"      value={sessionCount}  sub="Total logins" />
            <StatCard label="Account type"  value="Free"          sub="No limits"  small />
            <StatCard label="Member since"  value={memberSince}   sub={memberYear} small />
          </div>
        </section>

        <QuoteBlock />

        <section className={s.section}>
          <p className={s.sectionLabel}>Recent activity</p>
          <ActivityList log={log} />
        </section>
      </div>
      <Toast />
    </>
  );
}
