const quotes = [
  { q: 'The secret of getting ahead is getting started.',                  a: 'MARK TWAIN'        },
  { q: 'Simplicity is the ultimate sophistication.',                       a: 'LEONARDO DA VINCI'  },
  { q: 'Do one thing every day that scares you.',                          a: 'ELEANOR ROOSEVELT'  },
  { q: 'Make each day your masterpiece.',                                  a: 'JOHN WOODEN'        },
  { q: 'Everything you can imagine is real.',                              a: 'PABLO PICASSO'      },
  { q: 'Clarity about what matters provides clarity about what does not.', a: 'CAL NEWPORT'        },
];

export function getDailyQuote() {
  return quotes[new Date().getDate() % quotes.length];
}
