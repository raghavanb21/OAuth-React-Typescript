import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { sha256 } from '../../utils/crypto';
import { getUsers, getRemembered, saveRemembered } from '../../utils/storage';
import { GoogleButton } from './GoogleButton';
import s from '../../styles/form.module.css';

export function LoginForm() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rem = getRemembered();
    if (rem) setEmail(rem.email);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Email is required';
    if (!pw)    errs.pw    = 'Password is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const users = getUsers();
    const hash  = await sha256(pw);

    setTimeout(() => {
      if (!users[email] || users[email].hash !== hash) {
        setLoading(false);
        setErrors({ pw: 'Incorrect email or password' });
        return;
      }
      const u = users[email];
      if (remember) saveRemembered({ email });
      login({ name: u.name, email, method: 'email' });
      showToast(`Welcome back, ${u.name.split(' ')[0]}!`);
      navigate('/welcome');
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={s.group}>
        <label className={s.label}>Email</label>
        <input
          className={[s.input, errors.email ? s.inputError : ''].join(' ')}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && <p className={s.fieldError}>{errors.email}</p>}
      </div>

      <div className={s.group}>
        <label className={s.label}>Password</label>
        <input
          className={[s.input, errors.pw ? s.inputError : ''].join(' ')}
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        {errors.pw && <p className={s.fieldError}>{errors.pw}</p>}
      </div>

      <label className={s.checkRow}>
        <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
        <span>Remember me</span>
      </label>

      <button type="submit" className={s.btn} disabled={loading}>
        {loading ? <span className={s.spinner} /> : 'Sign in'}
      </button>

      <div className={s.divider}>or</div>
      <GoogleButton label="Continue with Google" />
    </form>
  );
}
