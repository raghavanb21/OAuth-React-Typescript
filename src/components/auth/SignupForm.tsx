import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { sha256 } from '../../utils/crypto';
import { getUsers, saveUsers } from '../../utils/storage';
import { PasswordStrength } from '../ui/PasswordStrength';
import { GoogleButton } from './GoogleButton';
import s from '../../styles/form.module.css';

export function SignupForm() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [pw,    setPw]    = useState('');
  const [pw2,   setPw2]   = useState('');
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name)  errs.name  = 'Name is required';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email';
    if (pw.length < 8) errs.pw  = 'At least 8 characters';
    if (pw !== pw2)    errs.pw2 = 'Passwords do not match';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const users = getUsers();
    if (users[email]) { setErrors({ email: 'An account with this email already exists' }); return; }

    setLoading(true);
    const hash = await sha256(pw);
    saveUsers({ ...users, [email]: { name, email, hash, method: 'email', joined: Date.now() } });

    setTimeout(() => {
      login({ name, email, method: 'email' });
      showToast('Account created!');
      navigate('/welcome');
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={s.group}>
        <label className={s.label}>Full name</label>
        <input
          className={[s.input, errors.name ? s.inputError : ''].join(' ')}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ada Lovelace"
          autoComplete="name"
        />
        {errors.name && <p className={s.fieldError}>{errors.name}</p>}
      </div>

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
          autoComplete="new-password"
        />
        <PasswordStrength value={pw} />
        {errors.pw && <p className={s.fieldError}>{errors.pw}</p>}
      </div>

      <div className={s.group}>
        <label className={s.label}>Confirm password</label>
        <input
          className={[s.input, errors.pw2 ? s.inputError : ''].join(' ')}
          type="password"
          value={pw2}
          onChange={e => setPw2(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />
        {errors.pw2 && <p className={s.fieldError}>{errors.pw2}</p>}
      </div>

      <button type="submit" className={s.btn} disabled={loading} style={{ marginTop: 4 }}>
        {loading ? <span className={s.spinner} /> : 'Create account'}
      </button>

      <div className={s.divider}>or</div>
      <GoogleButton label="Sign up with Google" />
    </form>
  );
}
