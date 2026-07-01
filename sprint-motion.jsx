// Sprint — Mobile app screen trio (Book, Track, History)

function SprintApp({ accent }) {
  const t = window.makeSprintTheme(accent);
  const f = t.fonts; const c = t.c;
  const accentRgb = window.hexToRgb(c.accent);

  return (
    <div style={{
      width: '100%', height: '100%', background: c.bg, color: c.ink,
      fontFamily: f.sans, overflow: 'hidden', position: 'relative',
      padding: '40px 0',
    }}>
      {/* Title row */}
      <div style={{ padding: '0 40px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>
            Mobile app · CityPost for iOS & Android
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.025em', margin: '12px 0 0', lineHeight: 1 }}>
            Three taps to book.<br />
            <span style={{ color: c.accent }}>Watch it move.</span>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{
            background: c.panel, border: `1px solid ${c.panelLine}`, padding: '8px 14px',
            borderRadius: 8, fontSize: 12, color: c.soft,
          }}>App Store · 4.8 ★</div>
          <div style={{
            background: c.panel, border: `1px solid ${c.panelLine}`, padding: '8px 14px',
            borderRadius: 8, fontSize: 12, color: c.soft,
          }}>Google Play · 4.7 ★</div>
        </div>
      </div>

      {/* 3 phones */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 36, padding: '0 40px',
      }}>
        <PhoneFrame label="01 · Book a parcel" theme={t}>
          <BookScreen theme={t} />
        </PhoneFrame>
        <PhoneFrame label="02 · Live tracking" theme={t} elevated>
          <TrackScreen theme={t} />
        </PhoneFrame>
        <PhoneFrame label="03 · Your parcels" theme={t}>
          <HistoryScreen theme={t} />
        </PhoneFrame>
      </div>

      {/* Feature row */}
      <div style={{
        margin: '48px 40px 0', padding: '32px 32px',
        background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 18,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
      }}>
        {[
          { k: 'Face ID', v: 'Book a parcel in seconds — pickup address remembered.' },
          { k: 'Live map', v: 'Watch your courier move. Notification when they\'re 5 min away.' },
          { k: 'Photo proof', v: 'Every drop-off photographed and timestamped.' },
          { k: 'One-tap repeat', v: 'Send the same parcel again from your history.' },
        ].map((feat, i) => (
          <div key={i} style={{
            paddingLeft: i > 0 ? 24 : 0,
            borderLeft: i > 0 ? `1px solid ${c.panelLine}` : 'none',
          }}>
            <div style={{ fontSize: 11, color: c.accent, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 8 }}>
              {feat.k}
            </div>
            <div style={{ fontSize: 14, color: c.soft, lineHeight: 1.5 }}>{feat.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneFrame({ children, label, theme, elevated }) {
  const c = theme.c;
  const accentRgb = window.hexToRgb(c.accent);
  return (
    <div style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: 11, color: c.accent, fontFamily: theme.fonts.mono, marginBottom: 14, letterSpacing: '.12em', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{
        width: 320, height: 660, background: '#000', borderRadius: 44, padding: 10,
        boxShadow: elevated
          ? `0 50px 100px -40px rgba(${accentRgb},.5), 0 0 0 1px ${c.panelLine}`
          : `0 30px 60px -30px rgba(0,0,0,.8), 0 0 0 1px ${c.panelLine}`,
        position: 'relative',
      }}>
        {/* notch */}
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          width: 110, height: 28, background: '#000', borderRadius: 999, zIndex: 2,
        }}></div>
        <div style={{
          width: '100%', height: '100%', borderRadius: 34, overflow: 'hidden',
          background: c.bg, position: 'relative',
        }}>
          {/* status bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '14px 24px 0', fontSize: 13, fontWeight: 600, color: c.ink,
          }}>
            <span>9:41</span>
            <span style={{ fontSize: 11, opacity: .8 }}>● ● ● ●</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function BookScreen({ theme }) {
  const c = theme.c; const f = theme.fonts;
  const B = window.CityPostBrand;
  return (
    <div style={{ padding: '28px 20px 18px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Send a parcel</span>
        <span style={{
          width: 32, height: 32, borderRadius: '50%', background: c.panel,
          border: `1px solid ${c.panelLine}`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 14, fontWeight: 700, color: c.ink,
        }}>JP</span>
      </div>

      {/* From / To */}
      <div style={{
        marginTop: 18, background: c.panel, border: `1px solid ${c.panelLine}`,
        borderRadius: 14, padding: 4,
      }}>
        {[
          { l: 'From', v: B.bookingFields.from.value, dot: c.accent },
          { l: 'To',   v: B.bookingFields.to.value,   dot: c.ink },
        ].map((row, i) => (
          <div key={i} style={{
            padding: '14px 14px', display: 'grid', gridTemplateColumns: '20px 1fr',
            gap: 12, alignItems: 'center',
            borderBottom: i === 0 ? `1px solid ${c.panelLine}` : 'none',
          }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%', background: row.dot,
              border: i === 1 ? `2px solid ${c.soft}` : 'none', boxSizing: 'border-box',
              backgroundClip: 'padding-box',
            }}></span>
            <div>
              <div style={{ fontSize: 10, color: c.soft, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>{row.l}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{row.v}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Parcel size */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, color: c.soft, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          Parcel size
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {['Env', 'S', 'M', 'L'].map((label, i) => (
            <div key={i} style={{
              padding: '10px 0', textAlign: 'center', borderRadius: 10,
              fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em',
              background: i === 1 ? c.accent : c.panel,
              color: i === 1 ? c.bg : c.ink,
              border: `1px solid ${i === 1 ? c.accent : c.panelLine}`,
            }}>{label}</div>
          ))}
        </div>
      </div>

      {/* When */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, color: c.soft, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          Speed
        </div>
        {[
          { k: 'Standard',  blurb: 'Tomorrow by 5pm', price: '€4.95', sel: false },
          { k: 'Before noon', blurb: 'Tomorrow by 12pm', price: '€6.95', sel: true },
          { k: 'Same-day',  blurb: 'Today before 6pm',   price: '€9.95', sel: false },
        ].map((opt, i) => (
          <div key={i} style={{
            padding: '12px 14px', marginTop: i > 0 ? 6 : 0,
            background: opt.sel ? `rgba(${window.hexToRgb(c.accent)},.1)` : c.panel,
            border: `1px solid ${opt.sel ? c.accent : c.panelLine}`,
            borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: opt.sel ? c.accent : c.ink }}>{opt.k}</div>
              <div style={{ fontSize: 11, color: c.soft, marginTop: 2 }}>{opt.blurb}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: f.mono, color: opt.sel ? c.accent : c.ink }}>{opt.price}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ flex: 1 }}></div>
      <button style={{
        background: c.accent, color: c.bg, border: 'none', borderRadius: 14,
        padding: '16px', fontFamily: f.sans, fontSize: 16, fontWeight: 800,
        marginTop: 12, marginBottom: 6,
      }}>Book for €6.95 →</button>
      <div style={{ textAlign: 'center', fontSize: 11, color: c.soft, fontFamily: f.mono }}>
        Picked up between 8–9am tomorrow
      </div>
    </div>
  );
}

function TrackScreen({ theme }) {
  const c = theme.c; const f = theme.fonts;
  const T = window.CityPostBrand.track;
  const accentRgb = window.hexToRgb(c.accent);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Map */}
      <div style={{
        height: 280, position: 'relative', marginTop: 14,
        background: `radial-gradient(circle at 60% 50%, rgba(${accentRgb},.18), transparent 60%), ${c.placeholderBg}`,
        backgroundImage: `
          linear-gradient(rgba(${accentRgb},.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(${accentRgb},.06) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 320 280" preserveAspectRatio="none">
          <path d="M 30 230 Q 100 150, 180 170 T 290 80" stroke={c.accent} strokeWidth="3" fill="none" strokeDasharray="6 4" />
          <circle cx="30" cy="230" r="7" fill={c.accent} />
          <circle cx="180" cy="170" r="10" fill={c.accent} stroke={c.bg} strokeWidth="3" />
          <circle cx="180" cy="170" r="22" fill="none" stroke={c.accent} strokeWidth="2" opacity=".4" />
          <circle cx="180" cy="170" r="34" fill="none" stroke={c.accent} strokeWidth="1.5" opacity=".2" />
          <circle cx="290" cy="80" r="7" fill="none" stroke={c.accent} strokeWidth="2.5" />
        </svg>
        {/* floating info card */}
        <div style={{
          position: 'absolute', top: 16, left: 16, right: 16,
          background: c.bg, border: `1px solid ${c.panelLine}`, borderRadius: 12,
          padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 10, color: c.soft, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>Parcel</div>
            <div style={{ fontSize: 13, fontWeight: 700, fontFamily: f.mono }}>{T.parcelId}</div>
          </div>
          <div style={{
            padding: '4px 10px', background: c.accent, color: c.bg, borderRadius: 999,
            fontSize: 10, fontWeight: 800, letterSpacing: '.08em',
          }}>● LIVE</div>
        </div>
      </div>

      {/* Pull-up sheet */}
      <div style={{
        flex: 1, background: c.bg, marginTop: -16, borderRadius: '20px 20px 0 0',
        borderTop: `1px solid ${c.panelLine}`, padding: '14px 22px 18px',
        position: 'relative',
      }}>
        <div style={{
          width: 40, height: 4, background: c.soft, opacity: .3, borderRadius: 2,
          margin: '0 auto 14px',
        }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 11, color: c.soft, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600 }}>
              Arriving in
            </div>
            <div style={{ fontSize: 56, fontWeight: 800, color: c.accent, letterSpacing: '-0.04em', lineHeight: 1 }}>
              {T.eta}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%', background: c.accent, color: c.bg,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800,
            }}>E</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>{T.driver}</div>
            <div style={{ fontSize: 10, color: c.soft }}>Cargo bike</div>
          </div>
        </div>

        <div style={{ marginTop: 14, height: 4, background: c.panel, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${T.progress * 100}%`, height: '100%', background: c.accent }}></div>
        </div>

        <div style={{ marginTop: 14 }}>
          {T.stops.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '46px 12px 1fr', gap: 10,
              padding: '7px 0', alignItems: 'center',
            }}>
              <span style={{ fontFamily: f.mono, fontSize: 10, color: c.soft }}>{s.time}</span>
              <span style={{
                width: 9, height: 9, borderRadius: '50%',
                background: s.done ? c.accent : 'transparent',
                border: `1.5px solid ${s.done ? c.accent : c.soft}`,
              }}></span>
              <span style={{ fontSize: 12.5, color: s.done ? c.ink : c.soft }}>{s.label}</span>
            </div>
          ))}
        </div>

        <button style={{
          marginTop: 12, width: '100%',
          background: c.panel, color: c.ink, border: `1px solid ${c.panelLine}`,
          borderRadius: 10, padding: 12, fontFamily: f.sans, fontSize: 13, fontWeight: 700,
        }}>Message Eamon</button>
      </div>
    </div>
  );
}

function HistoryScreen({ theme }) {
  const c = theme.c; const f = theme.fonts;
  const parcels = [
    { id: 'CP-94821-D', when: 'Today, 9:33',     to: 'Castleknock',  status: 'Out for delivery', live: true,  price: '€6.45' },
    { id: 'CP-94312-D', when: 'Yesterday',       to: 'Rathmines',    status: 'Delivered 4:18pm', live: false, price: '€4.95' },
    { id: 'CP-93881-D', when: 'Mon 25 May',      to: 'Ballsbridge',  status: 'Delivered 11:22am', live: false, price: '€9.95' },
    { id: 'CP-93540-D', when: 'Sat 23 May',      to: 'Sandyford',    status: 'Delivered 5:51pm', live: false, price: '€4.95' },
    { id: 'CP-93221-D', when: 'Fri 22 May',      to: 'Howth',        status: 'Delivered 2:40pm', live: false, price: '€4.95' },
    { id: 'CP-92998-D', when: 'Thu 21 May',      to: 'Phibsboro',    status: 'Delivered 11:08am', live: false, price: '€4.95' },
  ];
  return (
    <div style={{ padding: '28px 22px 18px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', margin: 0 }}>Your parcels</h3>
        <span style={{ fontSize: 11, color: c.soft, fontFamily: f.mono }}>{parcels.length} this week</span>
      </div>

      {/* tabs */}
      <div style={{ display: 'flex', gap: 6, marginTop: 16, marginBottom: 12 }}>
        {['Active', 'Delivered', 'Drafts'].map((tab, i) => (
          <span key={tab} style={{
            padding: '7px 12px', fontSize: 12, fontWeight: 700, borderRadius: 999,
            background: i === 0 ? c.accent : 'transparent',
            color: i === 0 ? c.bg : c.soft,
            border: i === 0 ? 'none' : `1px solid ${c.panelLine}`,
          }}>{tab}{i === 0 ? ' · 1' : ''}</span>
        ))}
      </div>

      {parcels.map((p, i) => (
        <div key={i} style={{
          padding: '14px 0', borderBottom: i < parcels.length - 1 ? `1px solid ${c.panelLine}` : 'none',
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 8,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {p.live && <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, boxShadow: `0 0 0 3px rgba(${window.hexToRgb(c.accent)},.2)` }}></span>}
              <span style={{ fontSize: 14, fontWeight: 700 }}>To {p.to}</span>
            </div>
            <div style={{ fontSize: 11, color: c.soft, marginTop: 3, fontFamily: f.mono }}>{p.id} · {p.when}</div>
            <div style={{ fontSize: 11, color: p.live ? c.accent : c.soft, marginTop: 3, fontWeight: p.live ? 700 : 400 }}>
              {p.status}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: f.mono, color: c.ink }}>{p.price}</div>
            <div style={{ fontSize: 10, color: c.accent, marginTop: 14, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>
              {p.live ? 'TRACK →' : 'AGAIN →'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

window.SprintApp = SprintApp;
