// Direction 3: Concierge — premium, quiet, refined
// Off-white bg, muted sage green, Instrument Serif italics, generous whitespace, Manrope body

const conciergeStyles = {
  fonts: {
    sans: '"Manrope", -apple-system, sans-serif',
    serif: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
  },
  c: {
    bg: '#f6f3ec',
    panel: '#ede8dc',
    card: '#fffdf8',
    ink: '#1a1d1a',
    soft: '#76766c',
    sage: '#5b7a52',          // muted from #5CB308
    sageDeep: '#324a2c',
    accent: '#c89a5a',         // brass accent
    hairline: 'rgba(26,29,26,.1)',
  },
};

function ConciergeArt() {
  const f = conciergeStyles.fonts;
  const c = conciergeStyles.c;
  const B = window.CityPostBrand;

  return (
    <div style={{
      width: '100%', height: '100%', background: c.bg, color: c.ink,
      fontFamily: f.sans, fontWeight: 300, overflow: 'hidden',
    }}>
      {/* Top nav */}
      <header style={{
        padding: '24px 56px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: `1px solid ${c.hairline}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: f.serif, fontSize: 28, letterSpacing: '-0.015em' }}>CityPost</span>
          <span style={{ fontFamily: f.serif, fontStyle: 'italic', fontSize: 14, color: c.soft }}>— Dublin, since 2014</span>
        </div>
        <nav style={{ display: 'flex', gap: 32, fontSize: 13, color: c.soft, fontWeight: 400 }}>
          {B.nav.map(n => <span key={n}>{n}</span>)}
        </nav>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 13 }}>
          <span style={{ color: c.soft }}>Sign in</span>
          <span style={{
            padding: '9px 18px', background: c.ink, color: c.bg, borderRadius: 999,
            fontSize: 12, fontWeight: 500, letterSpacing: '.02em',
          }}>Send a parcel</span>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: '80px 56px 64px', textAlign: 'center', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: c.sage,
          fontWeight: 500, marginBottom: 22,
        }}>
          ── Dublin's most considered courier ──
        </div>

        <h1 style={{
          fontFamily: f.serif, fontSize: 96, lineHeight: 1, fontWeight: 400,
          letterSpacing: '-0.025em', margin: '0 auto 28px', maxWidth: 980,
        }}>
          Next-day delivery, <span style={{ fontStyle: 'italic', color: c.sage }}>done quietly.</span>
        </h1>

        <p style={{
          fontFamily: f.sans, fontSize: 19, lineHeight: 1.6, color: c.soft, fontWeight: 300,
          margin: '0 auto 44px', maxWidth: 620,
        }}>{B.blurb}</p>

        {/* booking widget — clean card */}
        <div style={{
          background: c.card, borderRadius: 18, padding: 14, maxWidth: 920, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr 1fr auto', gap: 6,
          boxShadow: '0 1px 0 rgba(26,29,26,.04), 0 24px 60px -30px rgba(26,29,26,.15)',
          border: `1px solid ${c.hairline}`, textAlign: 'left',
        }}>
          {[
            { l: B.bookingFields.from.label, v: B.bookingFields.from.value },
            { l: B.bookingFields.to.label, v: B.bookingFields.to.value },
            { l: B.bookingFields.size.label, v: B.bookingFields.size.value },
            { l: B.bookingFields.when.label, v: B.bookingFields.when.value },
          ].map((field, i) => (
            <div key={i} style={{
              padding: '12px 16px',
              borderRight: i < 3 ? `1px solid ${c.hairline}` : 'none',
            }}>
              <div style={{ fontSize: 11, color: c.soft, fontWeight: 500, letterSpacing: '.04em' }}>{field.l}</div>
              <div style={{ fontFamily: f.sans, fontSize: 15, fontWeight: 500, marginTop: 4 }}>{field.v}</div>
            </div>
          ))}
          <button style={{
            background: c.sageDeep, color: c.bg, border: 'none', borderRadius: 12,
            padding: '0 24px', fontFamily: f.sans, fontSize: 14, fontWeight: 500,
            cursor: 'pointer', letterSpacing: '.02em',
          }}>Get quote →</button>
        </div>

        <div style={{
          marginTop: 24, fontSize: 13, color: c.soft, display: 'flex',
          justifyContent: 'center', gap: 32, alignItems: 'center',
        }}>
          <span><span style={{ color: c.ink, fontWeight: 600 }}>{B.bookingFields.price}</span> estimated</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: c.soft }}></span>
          <span>{B.bookingFields.eta}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: c.soft }}></span>
          <span>No subscription, no surcharges</span>
        </div>

        {/* trust logos */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: `1px solid ${c.hairline}` }}>
          <div style={{ fontFamily: f.serif, fontStyle: 'italic', fontSize: 14, color: c.soft, marginBottom: 20 }}>
            Trusted by Dublin's favourite small businesses
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 900, margin: '0 auto', gap: 24 }}>
            {B.trustLogos.slice(0, 6).map(l => (
              <span key={l} style={{
                fontFamily: f.serif, fontStyle: 'italic', fontSize: 20, color: c.soft,
                opacity: .65,
              }}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS as quiet row */}
      <section style={{
        padding: '32px 56px', borderTop: `1px solid ${c.hairline}`, borderBottom: `1px solid ${c.hairline}`,
        background: c.panel, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
      }}>
        {B.stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: f.serif, fontSize: 44, fontWeight: 400, color: c.sageDeep, letterSpacing: '-0.02em' }}>
              {s.value}
            </div>
            <div style={{ fontFamily: f.serif, fontStyle: 'italic', fontSize: 14, color: c.soft, marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 56px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: c.sage, fontWeight: 500 }}>
            How it works
          </div>
          <h2 style={{
            fontFamily: f.serif, fontSize: 52, lineHeight: 1.05, fontWeight: 400,
            letterSpacing: '-0.02em', margin: '14px 0 48px', maxWidth: 600,
          }}>
            Booking takes <span style={{ fontStyle: 'italic', color: c.sage }}>a minute.</span> Tracking takes <span style={{ fontStyle: 'italic', color: c.sage }}>none.</span>
          </h2>

          {B.steps.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr', gap: 28,
              padding: '24px 0', borderTop: `1px solid ${c.hairline}`,
              alignItems: 'baseline',
            }}>
              <div style={{
                fontFamily: f.serif, fontStyle: 'italic', fontSize: 32, color: c.sage,
                fontWeight: 400,
              }}>{s.n}</div>
              <div>
                <h3 style={{ fontFamily: f.serif, fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em', margin: 0 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 15, color: c.soft, lineHeight: 1.6, margin: '8px 0 0', fontWeight: 300, maxWidth: 480 }}>
                  {s.blurb}
                </p>
              </div>
            </div>
          ))}

          {/* Service tiers as soft cards */}
          <div style={{ marginTop: 56 }}>
            <div style={{ fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: c.sage, fontWeight: 500, marginBottom: 18 }}>
              Services
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {B.tiers.map((t, i) => (
                <div key={i} style={{
                  background: c.card, border: `1px solid ${c.hairline}`, borderRadius: 14,
                  padding: 20,
                  position: 'relative',
                }}>
                  {t.note && (
                    <span style={{
                      position: 'absolute', top: 14, right: 14,
                      fontFamily: f.serif, fontStyle: 'italic', fontSize: 11, color: c.accent,
                    }}>{t.note}</span>
                  )}
                  <div style={{ fontFamily: f.serif, fontSize: 22, letterSpacing: '-0.01em' }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: c.soft, marginTop: 4 }}>{t.blurb}</div>
                  <div style={{ marginTop: 14, fontSize: 18, fontWeight: 600, color: c.sageDeep }}>{t.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Concierge phone — calm, on a soft card */}
        <ConciergePhone />
      </section>

      {/* Quote */}
      <section style={{
        padding: '72px 56px', borderTop: `1px solid ${c.hairline}`,
        background: c.panel, textAlign: 'center',
      }}>
        <div style={{ fontFamily: f.serif, fontSize: 64, color: c.sage, lineHeight: 1, marginBottom: 10 }}>"</div>
        <blockquote style={{
          fontFamily: f.serif, fontStyle: 'italic', fontSize: 32, lineHeight: 1.35,
          fontWeight: 400, margin: 0, maxWidth: 880, marginLeft: 'auto', marginRight: 'auto',
          color: c.ink,
        }}>
          {B.testimonial.quote}
        </blockquote>
        <div style={{ marginTop: 24, fontSize: 13, color: c.soft }}>
          — <span style={{ fontWeight: 600, color: c.ink }}>{B.testimonial.name}</span>, {B.testimonial.role}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '48px 56px 24px', borderTop: `1px solid ${c.hairline}`,
        display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 36,
      }}>
        <div>
          <div style={{ fontFamily: f.serif, fontSize: 26, letterSpacing: '-0.015em' }}>CityPost</div>
          <div style={{ fontFamily: f.serif, fontStyle: 'italic', fontSize: 14, color: c.soft, marginTop: 6 }}>
            {B.tagline}
          </div>
        </div>
        {B.footer.cols.map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, color: c.sage, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 14 }}>
              {col.title}
            </div>
            {col.links.map(l => (
              <div key={l} style={{ fontSize: 13, color: c.soft, marginBottom: 8, fontWeight: 400 }}>{l}</div>
            ))}
          </div>
        ))}
      </footer>
      <div style={{ padding: '14px 56px', borderTop: `1px solid ${c.hairline}`, fontSize: 11, color: c.soft, letterSpacing: '.04em' }}>
        {B.footer.legal}
      </div>
    </div>
  );
}

function ConciergePhone() {
  const c = conciergeStyles.c;
  const f = conciergeStyles.fonts;
  const T = window.CityPostBrand.track;
  return (
    <div style={{
      background: c.card, borderRadius: 28, padding: 10, height: 'fit-content',
      border: `1px solid ${c.hairline}`,
      boxShadow: '0 32px 80px -40px rgba(26,29,26,.25)',
    }}>
      <div style={{ borderRadius: 22, overflow: 'hidden', background: c.bg }}>
        <div style={{
          padding: '18px 20px', borderBottom: `1px solid ${c.hairline}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <div style={{ fontSize: 10, color: c.soft, letterSpacing: '.14em', textTransform: 'uppercase' }}>
              Your parcel
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{T.parcelId}</div>
          </div>
          <span style={{
            padding: '5px 10px', background: c.sage, color: '#fff', borderRadius: 999,
            fontSize: 10, fontWeight: 600, letterSpacing: '.06em',
          }}>● {T.status}</span>
        </div>

        {/* soft map */}
        <div style={{
          height: 160, position: 'relative',
          background: `linear-gradient(180deg, ${c.panel}, ${c.bg})`,
        }}>
          <svg width="100%" height="100%" viewBox="0 0 360 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="route-c" x1="0" x2="1">
                <stop offset="0" stopColor={c.sage} />
                <stop offset="1" stopColor={c.accent} />
              </linearGradient>
            </defs>
            <path d="M 30 130 Q 120 50, 200 80 T 330 30" stroke="url(#route-c)" strokeWidth="2.5" fill="none" />
            <circle cx="30" cy="130" r="6" fill={c.sageDeep} />
            <circle cx="200" cy="80" r="9" fill="#fff" stroke={c.sage} strokeWidth="3" />
            <circle cx="330" cy="30" r="6" fill="none" stroke={c.accent} strokeWidth="2" />
          </svg>
        </div>

        <div style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontFamily: f.serif, fontStyle: 'italic', fontSize: 13, color: c.soft }}>
                Arriving in
              </div>
              <div style={{ fontFamily: f.serif, fontSize: 44, fontWeight: 400, color: c.sageDeep, letterSpacing: '-0.02em', lineHeight: 1 }}>
                {T.eta}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: c.panel,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: f.serif, fontStyle: 'italic', color: c.sageDeep, fontSize: 16,
              }}>E</div>
              <div style={{ fontSize: 12, marginTop: 4, fontWeight: 500 }}>{T.driver}</div>
              <div style={{ fontSize: 10, color: c.soft }}>Cargo bike</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            {T.stops.map((s, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '46px 12px 1fr', gap: 10,
                padding: '10px 0', alignItems: 'center',
                borderTop: i > 0 ? `1px solid ${c.hairline}` : 'none',
              }}>
                <span style={{ fontFamily: f.serif, fontStyle: 'italic', fontSize: 12, color: c.soft }}>{s.time}</span>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: s.done ? c.sage : 'transparent',
                  border: `1.5px solid ${s.done ? c.sage : c.soft}`,
                }}></span>
                <span style={{ fontSize: 13, color: s.done ? c.ink : c.soft, fontWeight: s.done ? 500 : 400 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.ConciergeArt = ConciergeArt;
