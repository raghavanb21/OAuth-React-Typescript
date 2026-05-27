import s from './StatCard.module.css';

interface Props {
  label: string;
  value: string | number;
  sub: string;
  small?: boolean;
}

export function StatCard({ label, value, sub, small }: Props) {
  return (
    <div className={s.card}>
      <p className={s.label}>{label}</p>
      <p className={[s.value, small ? s.small : ''].join(' ')}>{value}</p>
      <p className={s.sub}>{sub}</p>
    </div>
  );
}
