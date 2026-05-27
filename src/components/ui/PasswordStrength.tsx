interface Props {
  value: string;
}

function getScore(val: string): number {
  let score = 0;
  if (val.length >= 8)           score++;
  if (/[A-Z]/.test(val))         score++;
  if (/[0-9]/.test(val))         score++;
  if (/[^A-Za-z0-9]/.test(val))  score++;
  return score;
}

const LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const COLORS = ['', '#f87171', '#fb923c', '#a78bfa', '#34d399'];

export function PasswordStrength({ value }: Props) {
  if (!value) return null;
  const score = getScore(value);
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 2,
              borderRadius: 2,
              background: i <= score ? COLORS[score] : 'rgba(255,255,255,0.1)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: 11, color: score > 0 ? COLORS[score] : 'rgba(255,255,255,0.3)' }}>
        {LABELS[score]}
      </span>
    </div>
  );
}
