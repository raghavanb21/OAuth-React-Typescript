import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { Toast } from '../ui/Toast';
import s from './AuthPage.module.css';

type Tab = 'login' | 'signup';

export function AuthPage() {
  const [tab, setTab] = useState<Tab>('login');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/welcome', { replace: true });
  }, [user, navigate]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className={s.bg}>
        <div className={s.orb1} />
        <div className={s.orb2} />
        <div className={s.orb3} />

        <div className={s.card}>
          <div className={s.header}>
            <h1 className={s.brand}>Credly<span>.</span></h1>
            <p className={s.tagline}>Your calm space to do great work.</p>
          </div>

          <div className={s.tabs} role="tablist">
            {(['login', 'signup'] as Tab[]).map(t => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                className={[s.tab, tab === t ? s.tabActive : ''].join(' ')}
                onClick={() => setTab(t)}
              >
                {t === 'login' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          <div key={tab} className={s.formWrap}>
            {tab === 'login' ? <LoginForm /> : <SignupForm />}
          </div>
        </div>
      </div>
      <Toast />
    </GoogleOAuthProvider>
  );
}
