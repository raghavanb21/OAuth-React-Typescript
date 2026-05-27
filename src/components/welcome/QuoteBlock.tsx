import s from './QuoteBlock.module.css';

const QUOTES = [
  { q: 'The secret of getting ahead is getting started.',                  a: 'MARK TWAIN'        },
  { q: 'Simplicity is the ultimate sophistication.',                       a: 'LEONARDO DA VINCI'  },
  { q: 'Do one thing every day that scares you.',                          a: 'ELEANOR ROOSEVELT'  },
  { q: 'Make each day your masterpiece.',                                  a: 'JOHN WOODEN'        },
  { q: 'Everything you can imagine is real.',                              a: 'PABLO PICASSO'      },
  { q: 'Clarity about what matters provides clarity about what does not.', a: 'CAL NEWPORT'        },
];

export function QuoteBlock() {
  const q = QUOTES[new Date().getDate() % QUOTES.length];
  return (
    <div className={s.block}>
      <blockquote className={s.quote}>"{q.q}"</blockquote>
      <cite className={s.cite}>— {q.a}</cite>
    </div>
  );
}
