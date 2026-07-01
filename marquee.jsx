// Direction 2: Civic — trustworthy, Dublin-rooted, postal/institutional feel
// Cream bg, deep green ink, red postal stamp accents, Bricolage + Newsreader italic

const civicStyles = {
  fonts: {
    sans: '"Bricolage Grotesque", "Inter Tight", -apple-system, sans-serif',
    serif: '"Newsreader", Georgia, serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
  c: {
    bg: '#f3eedd',
    panel: '#ebe5d0',
    ink: '#10261a',        // very deep green-black
    green: '#5CB308',      // brand green
    greenDeep: '#1f4a1a',
    red: '#c2362b',        // postal red
    soft: '#5e6b5a',
    hairline: 'rgba(16,38,26,.14)',
    rule: '#10261a',
  },
};

function Stamp({ children, color }) {
  const c = civicStyles.c;
  return (
    <span style={{
      display: 'inline-block', padding: '4px 9px',
      border: `1.5px dashed ${color || c.red}`, color: color || c.red,
      fontFamily: civicStyles.fonts.mono, fontSize: 10,
      letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600,
      transform: 'rotate(-1.5deg)',
    }}>{children}</span>
  );
}

function CivicArt() {
  const f = civicStyles.fonts;
  const c = civicStyles.c;
  const B = window.CityPostBrand;

  return (
    <div style={{
      width: '100%', height: '100%', background: c.bg, color: c.ink,
      fontFamily: f.sans, overflow: 'hidden', position: 'relative',
    }}>
      {/* Top utility */}
      <div style={{
        background: c.greenDeep, color: c.bg, padding: '8px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: f.mono, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
      }}>
        <span>Wed 27 May 2026 · Dublin</span>
        <span>Tracking · Pricing · Business · Help · EN / GA</span>
      </div>

      {/* Masthead */}
      <header style={{
        padding: '24px 40px 18px', borderBottom: `3px double ${c.rule}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{
              fontFamily: f.sans, fontSize: 44, fontWeight: 700, letterSpacing: '-0.025em', color: c.greenDeep,
            }}>CityPost</span>
            <span style={{
              fontFamily: f.serif, fontStyle: 'italic', fontSize: 22, color: c.green, fontWeight: 500,
            }}>· Dublin's courier.</span>
          </div>
          <div style={{ fontFamily: f.mono, fontSize: 11, color: c.soft, marginTop: 4, letterSpacing: '.1em' }}>
            EST. 2014 · 23 SIR JOHN ROGERSON'S QUAY · DUBLIN 2 · CRO 612 884
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 500 }}>
          {B.nav.map(n => <span key={n}>{n}</span>)}
        </nav>
      </header>

      {/* HERO */}
      <section style={{
        padding: '40px 40px 36px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48,
        borderBottom: `1px solid ${c.hairline}`,
      }}>
        <div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            <Stamp>Dublin only · D1–D24</Stamp>
            <Stamp color={c.greenDeep}>Tracked end-to-end</Stamp>
            <Stamp color={c.greenDeep}>Carbon-light</Stamp>
          </div>

          <h1 style={{
            fontFamily: f.sans, fontSize: 88, lineHeight: .95, letterSpacing: '-0.035em',
            fontWeight: 700, margin: '0 0 16px', color: c.greenDeep,
          }}>
            Next-day delivery,<br />
            <span style={{ fontFamily: f.serif, fontStyle: 'italic', fontWeight: 500, color: c.green }}>anywhere in the city.</span>
          </h1>
          <p style={{
            fontSize: 18, lineHeight: 1.55, color: c.soft, margin: 0, maxWidth: 540,
          }}>{B.blurb}</p>

          {/* booking widget — postal slip styled */}
          <div style={{
            marginTop: 32, background: '#fffbf0', border: `2px solid ${c.rule}`,
            borderRadius: 4, padding: 18,
            backgroundImage: `repeating-linear-gradient(0deg, transparent 0 39px, ${c.hairline} 39px 40px)`,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              borderBottom: `1.5px dashed ${c.rule}`, paddingBottom: 8, marginBottom: 14,
            }}>
              <div style={{ fontFamily: f.mono, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700, color: c.ink }}>
                Quote slip · No. CP-2026-05-27
              </div>
              <Stamp>Express</Stamp>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { l: 'FROM', v: B.bookingFields.from.value },
                { l: 'TO',   v: B.bookingFields.to.value },
                { l: 'PARCEL', v: B.bookingFields.size.value },
                { l: 'WHEN', v: B.bookingFields.when.value },
              ].map((row, i) => (
                <div key={i}>
                  <div style={{ fontFamily: f.mono, fontSize: 10, letterSpacing: '.14em', color: c.soft, fontWeight: 600 }}>{row.l}</div>
                  <div style={{ fontFamily: f.serif, fontSize: 18, fontStyle: 'italic', color: c.ink, marginTop: 2 }}>{row.v}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 18, paddingTop: 14, borderTop: `1.5px dashed ${c.rule}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontFamily: f.mono, fontSize: 10, letterSpacing: '.14em', color: c.soft, fontWeight: 600 }}>TOTAL</div>
                <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: c.greenDeep }}>
                  {B.bookingFields.price}
                </div>
                <div style={{ fontSize: 12, color: c.soft, marginTop: 2 }}>{B.bookingFields.eta}</div>
              </div>
              <button style={{
                background: c.green, color: '#fff', border: 'none', borderRadius: 4,
                padding: '14px 24px', fontFamily: f.sans, fontSize: 15, fontWeight: 600,
                cursor: 'pointer',
              }}>Book pickup →</button>
            </div>
          </div>
        </div>

        {/* Map of Dublin */}
        <CivicMap />
      </section>

      {/* STATS */}
      <section style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: `3px double ${c.rule}`,
      }}>
        {B.stats.map((s, i) => (
          <div key={i} style={{
            padding: '22px 24px',
            borderRight: i < 3 ? `1px solid ${c.hairline}` : 'none',
            background: i % 2 === 0 ? c.bg : c.panel,
          }}>
            <div style={{ fontFamily: f.serif, fontStyle: 'italic', fontSize: 38, color: c.greenDeep, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: c.soft, marginTop: 6, fontFamily: f.mono, letterSpacing: '.05em' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS + PHONE */}
      <section style={{ padding: '44px 40px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48 }}>
        <div>
          <div style={{ fontFamily: f.mono, fontSize: 11, color: c.red, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600 }}>
            § Three steps
          </div>
          <h2 style={{
            fontFamily: f.sans, fontSize: 48, lineHeight: 1, letterSpacing: '-0.025em',
            fontWeight: 700, margin: '12px 0 28px', color: c.greenDeep,
          }}>
            Booked in <span style={{ fontFamily: f.serif, fontStyle: 'italic', color: c.green }}>under a minute.</span>
          </h2>

          {B.steps.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '52px 1fr',
              gap: 22, padding: '20px 0', borderTop: `1px solid ${c.hairline}`,
              alignItems: 'baseline',
            }}>
              <div style={{
                fontFamily: f.serif, fontStyle: 'italic', fontSize: 38, fontWeight: 500,
                color: c.red, lineHeight: 1,
              }}>{s.n}</div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: 14.5, color: c.soft, margin: '6px 0 0', lineHeight: 1.55 }}>{s.blurb}</p>
              </div>
            </div>
          ))}

          {/* Testimonial as a postcard */}
          <div style={{
            marginTop: 32, background: '#fffbf0', border: `1.5px solid ${c.rule}`, borderRadius: 4,
            padding: 24, position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <Stamp>Verified</Stamp>
            </div>
            <div style={{
              fontFamily: f.serif, fontStyle: 'italic', fontSize: 22, lineHeight: 1.4, fontWeight: 400,
              color: c.ink, paddingRight: 80,
            }}>"{B.testimonial.quote}"</div>
            <div style={{ marginTop: 14, fontSize: 13, color: c.soft }}>
              — <span style={{ fontWeight: 600, color: c.ink }}>{B.testimonial.name}</span>, {B.testimonial.role}
            </div>
          </div>
        </div>

        <CivicPhone />
      </section>

      {/* Coverage */}
      <section style={{ padding: '40px 40px 48px', background: c.panel, borderTop: `1px solid ${c.hairline}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
          <h2 style={{
            fontFamily: f.sans, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: c.greenDeep,
          }}>
            Coverage. <span style={{ fontFamily: f.serif, fontStyle: 'italic', color: c.soft, fontWeight: 400 }}>Every postcode.</span>
          </h2>
          <Stamp color={c.greenDeep}>D1 → D24</Stamp>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0,
          border: `1px solid ${c.rule}`,
        }}>
          {B.coverage.map((p, i) => (
            <div key={i} style={{
              padding: '12px 14px', fontFamily: f.mono, fontSize: 12,
              borderRight: (i + 1) % 5 !== 0 ? `1px solid ${c.hairline}` : 'none',
              borderBottom: i < B.coverage.length - 5 ? `1px solid ${c.hairline}` : 'none',
              background: c.bg, color: c.ink, display: 'flex', justifyContent: 'space-between',
            }}>
              <span>{p}</span>
              <span style={{ color: c.green }}>✓</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: `3px double ${c.rule}`, padding: '32px 40px 18px', background: c.greenDeep, color: c.bg,
        display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 32,
      }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>CityPost</div>
          <div style={{ fontFamily: f.serif, fontStyle: 'italic', fontSize: 14, marginTop: 8, opacity: .8 }}>
            Dublin's courier.
          </div>
        </div>
        {B.footer.cols.map((col, i) => (
          <div key={i}>
            <div style={{ fontFamily: f.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', opacity: .7, marginBottom: 10 }}>
              {col.title}
            </div>
            {col.links.map(l => (
              <div key={l} style={{ fontSize: 13, opacity: .85, marginBottom: 6 }}>{l}</div>
            ))}
          </div>
        ))}
      </footer>
      <div style={{
        background: c.greenDeep, color: c.bg, padding: '14px 40px',
        fontFamily: f.mono, fontSize: 10, letterSpacing: '.08em', opacity: .7,
        borderTop: `1px solid rgba(255,255,255,.12)`,
      }}>{B.footer.legal}</div>
    </div>
  );
}

function CivicMap() {
  const c = civicStyles.c;
  const f = civicStyles.fonts;
  return (
    <div style={{
      position: 'relative', background: '#fffbf0', border: `2px solid ${c.rule}`,
      borderRadius: 4, overflow: 'hidden', minHeight: 420,
    }}>
      <div style={{
        padding: '12px 16px', borderBottom: `1.5px dashed ${c.rule}`,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: f.mono, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600,
      }}>
        <span>Live · Dublin operations</span>
        <span style={{ color: c.red }}>● 47 PARCELS MOVING</span>
      </div>
      <svg viewBox="0 0 400 350" style={{ width: '100%', height: 380, display: 'block' }}>
        {/* river Liffey */}
        <path d="M 0 175 Q 80 165, 180 178 T 400 170" stroke={c.green} strokeWidth="6" fill="none" opacity=".25" />
        <text x="20" y="200" fontFamily={f.mono} fontSize="9" fill={c.soft} letterSpacing="2">RIVER LIFFEY</text>
        {/* postal districts as labels */}
        {[
          { p: 'D7',  x: 130, y: 120 }, { p: 'D1',  x: 200, y: 145 }, { p: 'D3', x: 280, y: 130 },
          { p: 'D8',  x: 140, y: 210 }, { p: 'D2',  x: 220, y: 200 }, { p: 'D4', x: 290, y: 220 },
          { p: 'D12', x: 110, y: 280 }, { p: 'D6',  x: 200, y: 270 }, { p: 'D14', x: 270, y: 290 },
          { p: 'D15', x: 50,  y: 90 },  { p: 'D11', x: 90,  y: 50 },  { p: 'D5', x: 330, y: 80 },
        ].map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={d.y} r="14" fill="none" stroke={c.greenDeep} strokeWidth="1" strokeDasharray="2 2" opacity=".5" />
            <circle cx={d.x} cy={d.y} r="4" fill={c.green} />
            <text x={d.x + 8} y={d.y + 4} fontFamily={f.mono} fontSize="10" fontWeight="600" fill={c.ink}>{d.p}</text>
          </g>
        ))}
        {/* moving parcels (dashed lines) */}
        <path d="M 200 145 Q 240 100, 290 130" stroke={c.red} strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <path d="M 220 200 Q 170 240, 110 280" stroke={c.red} strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <path d="M 140 210 Q 200 250, 270 290" stroke={c.red} strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        {/* compass */}
        <g transform="translate(360, 30)">
          <circle r="18" fill="none" stroke={c.rule} strokeWidth="1" />
          <path d="M 0 -14 L 4 0 L 0 14 L -4 0 Z" fill={c.red} />
          <text y="-22" textAnchor="middle" fontFamily={f.mono} fontSize="9" fill={c.ink}>N</text>
        </g>
      </svg>
      <div style={{
        padding: '10px 16px', borderTop: `1.5px dashed ${c.rule}`,
        fontFamily: f.mono, fontSize: 10, letterSpacing: '.1em', color: c.soft,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>SCALE 1:24,000</span>
        <span>UPDATED 9:33 AM</span>
      </div>
    </div>
  );
}

function CivicPhone() {
  const c = civicStyles.c;
  const f = civicStyles.fonts;
  const T = window.CityPostBrand.track;
  return (
    <div style={{
      background: '#fffbf0', border: `2px solid ${c.rule}`, borderRadius: 24, padding: 8,
      height: 'fit-content', position: 'sticky', top: 20,
    }}>
      <div style={{ borderRadius: 18, overflow: 'hidden', background: c.bg }}>
        <div style={{
          padding: '14px 16px', background: c.greenDeep, color: c.bg,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontFamily: f.mono, fontSize: 10, letterSpacing: '.14em', opacity: .7 }}>PARCEL</div>
            <div style={{ fontFamily: f.mono, fontSize: 13, fontWeight: 600 }}>{T.parcelId}</div>
          </div>
          <Stamp color={c.bg}>{T.status}</Stamp>
        </div>

        {/* map */}
        <div style={{
          height: 160, background: c.panel, position: 'relative',
          backgroundImage: `repeating-linear-gradient(0deg, ${c.hairline} 0 1px, transparent 1px 16px),
                           repeating-linear-gradient(90deg, ${c.hairline} 0 1px, transparent 1px 16px)`,
        }}>
          <svg width="100%" height="100%" viewBox="0 0 360 160" preserveAspectRatio="none">
            <path d="M 30 130 Q 120 60, 200 80 T 330 40" stroke={c.green} strokeWidth="2.5" fill="none" strokeDasharray="5 4" />
            <circle cx="30" cy="130" r="5" fill={c.green} />
            <circle cx="200" cy="80" r="6" fill={c.red} stroke="#fff" strokeWidth="2" />
            <circle cx="330" cy="40" r="5" fill="none" stroke={c.green} strokeWidth="2" />
          </svg>
        </div>

        <div style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontFamily: f.mono, fontSize: 10, color: c.soft, letterSpacing: '.14em' }}>ARRIVING IN</div>
              <div style={{ fontFamily: f.sans, fontSize: 40, fontWeight: 700, color: c.greenDeep, letterSpacing: '-0.025em', lineHeight: 1 }}>{T.eta}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{T.driver}</div>
              <div style={{ fontSize: 11, color: c.soft }}>{T.vehicle}</div>
            </div>
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px dashed ${c.rule}` }}>
            {T.stops.map((s, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '46px 12px 1fr', gap: 10,
                padding: '8px 0', alignItems: 'center',
              }}>
                <span style={{ fontFamily: f.mono, fontSize: 11, color: c.soft }}>{s.time}</span>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: s.done ? c.green : 'transparent',
                  border: `1.5px solid ${s.done ? c.green : c.soft}`,
                }}></span>
                <span style={{ fontFamily: f.serif, fontStyle: s.done ? 'italic' : 'normal', fontSize: 13, color: s.done ? c.ink : c.soft }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.CivicArt = CivicArt;
