// Sprint direction — shared theme. Returns a styles object based on accent color.
// All sprint artboards (landing, pricing, app) use this so a single tweak updates everything.

window.makeSprintTheme = function(accent) {
  return {
    fonts: {
      sans: '"Inter Tight", "Inter", -apple-system, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
    c: {
      bg: '#0a0a0a',
      panel: '#141414',
      panel2: '#1c1c1c',
      panelLine: 'rgba(255,255,255,.08)',
      ink: '#ffffff',
      soft: '#8b8b8b',
      muted: '#5a5a5a',
      accent: accent || '#9CFF2E',
      placeholderBg: '#1a1a1a',
    },
  };
};

// Helper: render a stylised phone tracking card. Used on the landing.
window.SprintPhone = function SprintPhone({ accent }) {
  const t = window.makeSprintTheme(accent);
  const c = t.c; const f = t.fonts;
  const T = window.CityPostBrand.track;
  const accentRgb = window.hexToRgb(accent);
  return (
    <div style={{
      background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 28,
      padding: 8, height: 'fit-content',
    }}>
      <div style={{ background: c.bg, borderRadius: 22, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          height: 200, position: 'relative',
          background: `radial-gradient(circle at 40% 60%, rgba(${accentRgb},.16), transparent 55%), ${c.placeholderBg}`,
          backgroundImage: `
            linear-gradient(rgba(${accentRgb},.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${accentRgb},.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} viewBox="0 0 360 200" preserveAspectRatio="none">
            <path d="M 30 160 Q 120 80, 200 100 T 330 50" stroke={c.accent} strokeWidth="3" fill="none" strokeDasharray="6 4" />
            <circle cx="30" cy="160" r="6" fill={c.accent} />
            <circle cx="200" cy="100" r="7" fill={c.ink} stroke={c.accent} strokeWidth="3" />
            <circle cx="330" cy="50" r="6" fill="none" stroke={c.accent} strokeWidth="2" strokeDasharray="2 2" />
          </svg>
          <div style={{
            position: 'absolute', top: 14, left: 14, padding: '6px 10px',
            background: c.accent, color: c.bg, borderRadius: 6, fontSize: 11, fontWeight: 700,
          }}>● {T.status.toUpperCase()}</div>
          <div style={{
            position: 'absolute', top: 14, right: 14, fontFamily: f.mono,
            fontSize: 10, color: c.soft,
          }}>{T.parcelId}</div>
        </div>

        <div style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontSize: 11, color: c.soft, letterSpacing: '.1em', textTransform: 'uppercase' }}>Arriving in</div>
              <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em', color: c.accent, lineHeight: 1 }}>{T.eta}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{T.driver}</div>
              <div style={{ fontSize: 11, color: c.soft }}>{T.vehicle}</div>
            </div>
          </div>

          <div style={{ marginTop: 16, height: 4, background: c.placeholderBg, borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${T.progress * 100}%`, height: '100%', background: c.accent }}></div>
          </div>

          <div style={{ marginTop: 18 }}>
            {T.stops.map((s, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '50px 14px 1fr', gap: 10,
                padding: '10px 0', alignItems: 'center',
                borderBottom: i < T.stops.length - 1 ? `1px solid ${c.panelLine}` : 'none',
              }}>
                <span style={{ fontFamily: f.mono, fontSize: 11, color: c.soft }}>{s.time}</span>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: s.done ? c.accent : 'transparent',
                  border: `2px solid ${s.done ? c.accent : c.soft}`,
                }}></span>
                <span style={{ fontSize: 13, color: s.done ? c.ink : c.soft }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Small utility for rgba()
window.hexToRgb = function(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
};
