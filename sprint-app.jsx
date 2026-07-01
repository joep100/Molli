// Direction 4: Marquee — bold, confident, friendly. Monzo/Octopus energy.
// Big green block + tomato accent + cream, chunky Archivo, big numbered cards.

const marqueeStyles = {
  fonts: {
    sans: '"Bricolage Grotesque", "Inter", -apple-system, sans-serif',
    display: '"Archivo", "Archivo Black", "Bricolage Grotesque", sans-serif',
  },
  c: {
    bg: '#fff8ec',
    green: '#5CB308',          // their exact brand green, used BIG
    greenDeep: '#2a5b08',
    tomato: '#ff5b3d',
    blue: '#2750eb',
    ink: '#0e1f0a',
    soft: '#5f6c5b',
    card: '#ffffff',
    hairline: 'rgba(14,31,10,.12)',
  },
};

function MarqueeArt() {
  const f = marqueeStyles.fonts;
  const c = marqueeStyles.c;
  const B = window.CityPostBrand;

  return (
    <div style={{
      width: '100%', height: '100%', background: c.bg, color: c.ink,
      fontFamily: f.sans, overflow: 'hidden', position: 'relative',
    }}>
      {/* Top nav */}
      <header style={{
        padding: '18px 32px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 38, height: 38, background: c.ink, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 16, height: 16, background: c.green, borderRadius: 3,
              transform: 'rotate(8deg)',
            }}></div>
          </div>
          <span style={{ fontFamily: f.display, fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>CityPost</span>
        </div>
        <nav style={{ display: 'flex', gap: 28, fontSize: 15, fontWeight: 600 }}>
          {B.nav.map(n => <span key={n}>{n}</span>)}
        </nav>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Sign in</span>
          <span style={{
            background: c.ink, color: c.bg, padding: '11px 18px', borderRadius: 999,
            fontSize: 14, fontWeight: 700,
          }}>Send a parcel</span>
        </div>
      </header>

      {/* HERO — big green block */}
      <section style={{
        margin: '12px 16px', background: c.green, borderRadius: 32,
        padding: '60px 48px 48px', position: 'relative', overflow: 'hidden',
      }}>
        {/* big decorative dot pattern */}
        <div style={{
          position: 'absolute', right: -80, top: -80, width: 460, height: 460,
          background: c.tomato, borderRadius: '50%',
        }}></div>
        <div style={{
          position: 'absolute', right: 60, top: 220, width: 120, height: 120,
          background: c.bg, borderRadius: '50%',
        }}></div>
        <div style={{
          position: 'absolute', right: 220, top: 80, width: 60, height: 60,
          background: c.blue, borderRadius: '50%',
        }}></div>

        <div style={{ position: 'relative', maxWidth: 760 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, background: c.ink, color: c.green,
            padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700,
            letterSpacing: '.04em', marginBottom: 24,
          }}>
            <span style={{ width: 8, height: 8, background: c.green, borderRadius: '50%' }}></span>
            New: Same-day before 11am, €9.95
          </div>

          <h1 style={{
            fontFamily: f.display, fontSize: 132, lineHeight: .85, fontWeight: 800,
            letterSpacing: '-0.045em', margin: '0 0 24px', color: c.ink,
          }}>
            Door to door.<br />
            Across Dublin.<br />
            <span style={{ color: c.bg }}>By tomorrow.</span>
          </h1>

          <p style={{
            fontSize: 20, color: c.ink, fontWeight: 500, maxWidth: 540, margin: '0 0 36px', lineHeight: 1.45,
          }}>{B.blurb}</p>
        </div>

        {/* Big booking card */}
        <div style={{
          position: 'relative', background: c.card, borderRadius: 22, padding: 18,
          marginTop: 16, maxWidth: 920, border: `2px solid ${c.ink}`,
          boxShadow: `8px 8px 0 ${c.ink}`,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr 1fr', gap: 0 }}>
            {[
              { l: B.bookingFields.from.label, v: B.bookingFields.from.value },
              { l: B.bookingFields.to.label, v: B.bookingFields.to.value },
              { l: B.bookingFields.size.label, v: B.bookingFields.size.value },
              { l: B.bookingFields.when.label, v: B.bookingFields.when.value },
            ].map((field, i) => (
              <div key={i} style={{
                padding: '8px 16px',
                borderRight: i < 3 ? `1.5px solid ${c.hairline}` : 'none',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.soft, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                  {field.l}
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4, letterSpacing: '-0.01em' }}>{field.v}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 14, paddingTop: 14, borderTop: `1.5px solid ${c.hairline}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontFamily: f.display, fontSize: 36, fontWeight: 800, color: c.green, letterSpacing: '-0.025em' }}>
                {B.bookingFields.price}
              </span>
              <span style={{ fontSize: 14, color: c.soft, fontWeight: 600 }}>{B.bookingFields.eta}</span>
            </div>
            <button style={{
              background: c.ink, color: c.green, border: 'none', borderRadius: 999,
              padding: '14px 28px', fontFamily: f.sans, fontSize: 15, fontWeight: 700,
              cursor: 'pointer',
            }}>Book it →</button>
          </div>
        </div>
      </section>

      {/* Ticker stats */}
      <section style={{
        background: c.ink, color: c.bg, padding: '20px 32px', margin: '0 16px',
        borderRadius: 16, marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {B.stats.map((s, i) => (
          <div key={i} style={{
            paddingRight: 20,
            borderRight: i < 3 ? `1px solid rgba(255,255,255,.16)` : 'none',
            paddingLeft: i > 0 ? 20 : 0,
          }}>
            <div style={{
              fontFamily: f.display, fontSize: 36, fontWeight: 800, color: c.green,
              letterSpacing: '-0.03em', lineHeight: 1,
            }}>{s.value}</div>
            <div style={{ fontSize: 12, marginTop: 6, opacity: .7, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS — 3 chunky cards */}
      <section style={{ padding: '64px 32px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <div style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
              color: c.tomato, marginBottom: 10,
            }}>How it works</div>
            <h2 style={{
              fontFamily: f.display, fontSize: 64, fontWeight: 800,
              letterSpacing: '-0.035em', margin: 0, lineHeight: .95,
            }}>
              Three steps.<br />
              <span style={{ color: c.green }}>That's it.</span>
            </h2>
          </div>
          <div style={{ fontSize: 15, color: c.soft, maxWidth: 320, fontWeight: 500 }}>
            We built CityPost for the small shop owner sending six parcels at 9am and remembering nothing else.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {B.steps.map((s, i) => {
            const bg = [c.tomato, c.blue, c.green][i];
            const fg = i === 2 ? c.ink : c.bg;
            return (
              <div key={i} style={{
                background: bg, color: fg, borderRadius: 24, padding: 28, position: 'relative',
                minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{
                  fontFamily: f.display, fontSize: 120, fontWeight: 800,
                  letterSpacing: '-0.05em', lineHeight: .8, opacity: i === 2 ? .25 : .3,
                }}>{s.n}</div>
                <div>
                  <h3 style={{
                    fontFamily: f.display, fontSize: 36, fontWeight: 800,
                    letterSpacing: '-0.02em', margin: '0 0 10px', lineHeight: 1,
                  }}>{s.title}.</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.45, margin: 0, fontWeight: 500, opacity: .9 }}>
                    {s.blurb}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRACKING + TIERS row */}
      <section style={{ padding: '24px 32px 56px', display: 'grid', gridTemplateColumns: '360px 1fr', gap: 32 }}>
        <MarqueePhone />

        <div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: c.tomato, marginBottom: 10 }}>
            Choose your speed
          </div>
          <h2 style={{
            fontFamily: f.display, fontSize: 52, fontWeight: 800, letterSpacing: '-0.03em',
            lineHeight: 1, margin: '0 0 28px',
          }}>
            From €4.95.<br />No subscription. No catch.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {B.tiers.map((t, i) => (
              <div key={i} style={{
                background: c.card, border: `2px solid ${c.ink}`, borderRadius: 18,
                padding: 22, position: 'relative',
              }}>
                {t.note && (
                  <div style={{
                    position: 'absolute', top: -10, right: 14,
                    background: c.tomato, color: c.bg, padding: '4px 10px',
                    fontSize: 11, fontWeight: 700, borderRadius: 999, letterSpacing: '.06em',
                  }}>{t.note.toUpperCase()}</div>
                )}
                <div style={{ fontFamily: f.display, fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>{t.name}</div>
                <div style={{ fontSize: 14, color: c.soft, marginTop: 4, fontWeight: 500 }}>{t.blurb}</div>
                <div style={{
                  marginTop: 18, fontFamily: f.display, fontSize: 32, fontWeight: 800,
                  color: c.green, letterSpacing: '-0.025em',
                }}>{t.price}</div>
              </div>
            ))}
          </div>

          {/* Testimonial — confident pull quote */}
          <div style={{
            marginTop: 22, background: c.ink, color: c.bg, borderRadius: 22, padding: 28,
            display: 'grid', gridTemplateColumns: '60px 1fr', gap: 20, alignItems: 'flex-start',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: c.green,
              color: c.ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: f.display, fontSize: 22, fontWeight: 800,
            }}>AB</div>
            <div>
              <div style={{ fontFamily: f.sans, fontSize: 19, lineHeight: 1.35, fontWeight: 500 }}>
                "{B.testimonial.quote}"
              </div>
              <div style={{ marginTop: 12, fontSize: 13, opacity: .7, fontWeight: 500 }}>
                {B.testimonial.name} · {B.testimonial.role}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage block */}
      <section style={{
        margin: '0 16px 16px', background: c.ink, color: c.bg, borderRadius: 28, padding: '40px 32px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <h2 style={{
            fontFamily: f.display, fontSize: 40, fontWeight: 800, letterSpacing: '-0.025em', margin: 0,
          }}>
            We deliver to <span style={{ color: c.green }}>every Dublin postcode.</span>
          </h2>
          <span style={{ fontSize: 13, opacity: .6 }}>D1 → D24 · plus the M50 ring</span>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 6,
        }}>
          {B.coverage.map((p, i) => {
            const code = p.split(' · ')[0];
            return (
              <div key={i} style={{
                background: `rgba(92,179,8,${0.18 + (i % 5) * 0.08})`,
                color: c.bg, padding: '14px 8px', borderRadius: 10, textAlign: 'center',
                fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em',
              }}>{code}</div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 32px 20px',
        display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 32,
      }}>
        <div>
          <div style={{ fontFamily: f.display, fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em' }}>CityPost</div>
          <div style={{ fontSize: 14, color: c.soft, marginTop: 8, maxWidth: 240, lineHeight: 1.4, fontWeight: 500 }}>
            {B.tagline}
          </div>
        </div>
        {B.footer.cols.map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: c.tomato, marginBottom: 12 }}>
              {col.title}
            </div>
            {col.links.map(l => (
              <div key={l} style={{ fontSize: 14, color: c.ink, marginBottom: 8, fontWeight: 500 }}>{l}</div>
            ))}
          </div>
        ))}
      </footer>
      <div style={{ padding: '14px 32px', fontSize: 12, color: c.soft, borderTop: `1px solid ${c.hairline}`, fontWeight: 500 }}>
        {B.footer.legal}
      </div>
    </div>
  );
}

function MarqueePhone() {
  const c = marqueeStyles.c;
  const f = marqueeStyles.fonts;
  const T = window.CityPostBrand.track;
  return (
    <div style={{
      background: c.ink, borderRadius: 32, padding: 10, height: 'fit-content',
      boxShadow: `8px 8px 0 ${c.green}`,
    }}>
      <div style={{ borderRadius: 24, overflow: 'hidden', background: c.bg }}>
        {/* big green status block */}
        <div style={{
          background: c.green, color: c.ink, padding: '20px 22px',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            ● {T.status}
          </div>
          <div style={{
            fontFamily: f.display, fontSize: 64, fontWeight: 800,
            letterSpacing: '-0.035em', lineHeight: 1, marginTop: 6,
          }}>{T.eta}</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>
            {T.driver} · {T.vehicle}
          </div>
        </div>

        {/* map */}
        <div style={{
          height: 150, background: c.bg, position: 'relative',
          backgroundImage: `radial-gradient(circle, rgba(14,31,10,.08) 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px',
        }}>
          <svg width="100%" height="100%" viewBox="0 0 360 150" preserveAspectRatio="none">
            <path d="M 30 120 Q 120 50, 200 70 T 330 30" stroke={c.tomato} strokeWidth="4" fill="none" />
            <circle cx="30" cy="120" r="8" fill={c.ink} />
            <circle cx="200" cy="70" r="10" fill={c.green} stroke={c.ink} strokeWidth="3" />
            <circle cx="330" cy="30" r="8" fill={c.tomato} />
          </svg>
        </div>

        <div style={{ padding: '18px 22px' }}>
          {T.stops.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '46px 16px 1fr', gap: 10,
              padding: '10px 0', alignItems: 'center',
              borderTop: i > 0 ? `1.5px solid ${c.hairline}` : 'none',
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: c.soft }}>{s.time}</span>
              <span style={{
                width: 14, height: 14, borderRadius: 4,
                background: s.done ? c.green : 'transparent',
                border: `2px solid ${s.done ? c.green : c.soft}`,
              }}></span>
              <span style={{ fontSize: 14, fontWeight: 600, color: s.done ? c.ink : c.soft }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.MarqueeArt = MarqueeArt;
