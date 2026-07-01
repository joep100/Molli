// Sprint — Pricing page (single base price + interactive add-ons)

function SprintPricing({ accent, onNavigate }) {
  const go = (route) => () => { if (onNavigate) onNavigate(route); };
  const t = window.makeSprintTheme(accent);
  const f = t.fonts; const c = t.c;
  const B = window.CityPostBrand;
  const accentRgb = window.hexToRgb(c.accent);

  // Item sizes (Zone 1 base prices) — mirrors the booking engine
  const SIZES = [
    { id: 'letter',  label: 'Letter',  blurb: 'Max 500g · A4 size',        price: 7.99 },
    { id: 'package', label: 'Package', blurb: 'Max 2kg · 45×35×20cm',      price: 8.99 },
    { id: 'box',     label: 'Box',     blurb: 'Max 10kg · 60×40×40cm',     price: 9.99 },
  ];
  const ZONE2_FEE = 2.00;
  const AM_FEE = 4.99;

  // Optional add-ons — mirrors the booking engine
  const addOns = [
    { id: 'signature', label: 'Signature required',   blurb: 'Recipient signs on delivery',   price: 1.99 },
    { id: 'photo',     label: 'Photo proof',          blurb: 'Delivery photo sent to you',    price: 0.99 },
    { id: 'insure',    label: 'Additional insurance', blurb: 'Cover up to €500',              price: 4.99 },
  ];

  const [size, setSize] = React.useState('letter');
  const [zone2, setZone2] = React.useState(false);
  const [am, setAm] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const base = (SIZES.find(x => x.id === size) || SIZES[1]).price;
  const extrasArr = addOns.filter(a => selected.includes(a.id));
  const extras = extrasArr.reduce((sum, a) => sum + a.price, 0)
    + (zone2 ? ZONE2_FEE : 0)
    + (am ? AM_FEE : 0);
  const total = base + extras;

  const included = [
    'Same-day collection from your door',
    'Next-working-day delivery, anywhere in Dublin',
    'Tracked end-to-end',
    'SMS to the recipient on the way',
    'Photo on delivery',
  ];

  const faqs = [
    { q: 'Do I need to drop it at a post office?',  a: 'No — that\'s the whole point. We collect from your door. Book before 2pm and a courier is with you this afternoon. No queues, no ID, no paperwork.' },
    { q: 'How is "next-day" defined?',     a: 'Book before 2pm — we collect today and deliver the next working day, anywhere in Dublin\'s 24 postal codes. Need it before 1pm? Add it for €5.' },
    { q: 'What if I send 10+ a week?',     a: 'Open a Business account — same per-parcel pricing, plus invoicing, API, CSV bulk-booking, and a named contact. No subscription.' },
    { q: 'What can\'t I send?',            a: 'Hazardous goods, restricted items, anything heavier than 8kg, or anything that won\'t fit in a 60×40×40cm box.' },
    { q: 'How does the signed-for option work?', a: 'Add Signature required for €1.99 — we capture the recipient\'s signature on delivery alongside the photo. No trip to the post office required.' },
    { q: 'Can I integrate with my shop?',  a: 'Yes — our API + native Shopify, WooCommerce, and Squarespace plugins are free on Business accounts.' },
  ];

  return (
    <div style={{
      width: '100%', minHeight: '100vh', background: c.bg, color: c.ink,
      fontFamily: f.sans, overflow: 'hidden', position: 'relative',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px', borderBottom: `1px solid ${c.panelLine}`,
      }}>
        <window.SprintLogo accent={c.accent} />
        <nav style={{ display: 'flex', gap: 26, fontSize: 14, fontWeight: 500, color: c.soft }}>
          {B.nav.map((n, i) => <span key={n} style={{ color: i === 2 ? c.ink : c.soft }}>{n}</span>)}
        </nav>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: c.soft }}>Sign in</span>
          <span onClick={go('booking')} style={{
            background: c.accent, color: c.bg, padding: '9px 16px', borderRadius: 6,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Send a parcel →</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: '72px 40px 32px', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>
          Pricing
        </div>
        <div style={{ fontSize: 15, color: c.soft, fontWeight: 600, marginTop: 18, letterSpacing: '.04em' }}>
          Parcels across Dublin from
        </div>
        <h1 style={{
          fontFamily: f.sans, fontSize: 168, lineHeight: .85, letterSpacing: '-0.05em',
          fontWeight: 800, margin: '4px auto 18px', maxWidth: 1100, color: c.accent,
        }}>
          €{Math.min(...SIZES.map(sz => sz.price)).toFixed(2)}
        </h1>
        <p style={{ fontSize: 18, color: c.soft, maxWidth: 580, margin: '0 auto 0', lineHeight: 1.55 }}>
          That's a letter, collected from your door today and delivered the next working day. Bigger parcel or extra services? Build your price below.
        </p>
      </section>

      {/* CALCULATOR */}
      <section style={{ padding: '40px 40px 64px' }}>
        <div style={{
          background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 22,
          display: 'grid', gridTemplateColumns: '1fr 1.2fr', overflow: 'hidden',
          boxShadow: `0 40px 100px -50px rgba(${accentRgb},.3)`,
        }}>
          {/* LEFT: Base price + total */}
          <div style={{ padding: 40, borderRight: `1px solid ${c.panelLine}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', right: -120, top: -120, width: 400, height: 400,
              background: `radial-gradient(circle, rgba(${accentRgb},.1), transparent 70%)`,
              pointerEvents: 'none',
            }}></div>

            <div style={{ position: 'relative' }}>
              <div style={{
                fontSize: 11, color: c.soft, fontWeight: 700, letterSpacing: '.18em',
                textTransform: 'uppercase',
              }}>From · per parcel</div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
                <span style={{
                  fontFamily: f.sans, fontSize: 24, fontWeight: 600, color: c.soft,
                  textDecoration: extras > 0 ? 'line-through' : 'none',
                  opacity: extras > 0 ? 0.5 : 0,
                  transition: 'opacity .3s',
                }}>€{base.toFixed(2)}</span>
              </div>

              <div style={{
                fontFamily: f.sans, fontSize: 156, fontWeight: 800,
                letterSpacing: '-0.05em', lineHeight: .9, color: c.accent,
                margin: '-12px 0 0',
              }}>
                €{total.toFixed(2)}
              </div>
              <div style={{ fontSize: 14, color: c.soft, marginTop: 4 }}>
                per parcel, all in
              </div>

              <div style={{
                marginTop: 24, padding: '14px 16px',
                background: c.bg, borderRadius: 10, border: `1px solid ${c.panelLine}`,
                fontSize: 13, color: c.soft,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Base · {(SIZES.find(x => x.id === size) || {}).label}</span>
                  <span style={{ fontFamily: f.mono, color: c.ink }}>€{base.toFixed(2)}</span>
                </div>
                {zone2 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span>+ Greater Dublin (D9–D24)</span>
                    <span style={{ fontFamily: f.mono, color: c.accent }}>€{ZONE2_FEE.toFixed(2)}</span>
                  </div>
                )}
                {am && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span>+ Before 1pm delivery</span>
                    <span style={{ fontFamily: f.mono, color: c.accent }}>€{AM_FEE.toFixed(2)}</span>
                  </div>
                )}
                {extrasArr.map(a => (
                  <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span>+ {a.label}</span>
                    <span style={{ fontFamily: f.mono, color: c.accent }}>€{a.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 28 }}>
                <div style={{
                  fontSize: 11, color: c.soft, fontWeight: 700, letterSpacing: '.18em',
                  textTransform: 'uppercase', marginBottom: 12,
                }}>What's always included</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {included.map((line, i) => (
                    <li key={i} style={{
                      padding: '8px 0', borderTop: i > 0 ? `1px solid ${c.panelLine}` : 'none',
                      fontSize: 14, display: 'grid', gridTemplateColumns: '20px 1fr', gap: 10, alignItems: 'baseline',
                    }}>
                      <span style={{ color: c.accent, fontWeight: 700 }}>✓</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Build your parcel */}
          <div style={{ padding: 40 }}>
            <div style={{ marginBottom: 22 }}>
              <div style={{
                fontSize: 11, color: c.accent, fontWeight: 700, letterSpacing: '.18em',
                textTransform: 'uppercase',
              }}>Build your parcel</div>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', margin: '8px 0 0' }}>
                Size, speed, extras.
              </h2>
            </div>

            {/* Size */}
            <div style={{ fontSize: 11, color: c.soft, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}>Item size</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 18 }}>
              {SIZES.map(sz => {
                const on = size === sz.id;
                return (
                  <button key={sz.id} onClick={() => setSize(sz.id)} style={{
                    all: 'unset', cursor: 'pointer', textAlign: 'center',
                    padding: '14px 8px', borderRadius: 12,
                    background: on ? `rgba(${accentRgb},.1)` : c.bg,
                    border: `1.5px solid ${on ? c.accent : c.panelLine}`,
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: c.ink }}>{sz.label}</div>
                    <div style={{ fontSize: 10, color: c.soft, marginTop: 2, fontFamily: f.mono }}>{sz.blurb}</div>
                    <div style={{ fontFamily: f.mono, fontSize: 14, fontWeight: 700, color: on ? c.accent : c.soft, marginTop: 6 }}>€{sz.price.toFixed(2)}</div>
                  </button>
                );
              })}
            </div>

            {/* Delivery zone */}
            <div style={{ fontSize: 11, color: c.soft, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}>Delivery zone</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
              {[
                { z: false, label: 'City Centre', sub: 'D1–D8', tag: 'Included' },
                { z: true,  label: 'Greater Dublin', sub: 'D9–D24', tag: `+€${ZONE2_FEE.toFixed(2)}` },
              ].map((opt, i) => {
                const on = zone2 === opt.z;
                return (
                  <button key={i} onClick={() => setZone2(opt.z)} style={{
                    all: 'unset', cursor: 'pointer',
                    padding: '14px 16px', borderRadius: 12,
                    background: on ? `rgba(${accentRgb},.1)` : c.bg,
                    border: `1.5px solid ${on ? c.accent : c.panelLine}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: c.ink }}>{opt.label}</div>
                      <div style={{ fontSize: 11, color: c.soft, marginTop: 2 }}>{opt.sub}</div>
                    </div>
                    <span style={{ fontFamily: f.mono, fontSize: 13, fontWeight: 700, color: on ? c.accent : c.soft }}>{opt.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Delivery speed */}
            <div style={{ fontSize: 11, color: c.soft, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}>Delivery window</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
              {[
                { a: false, label: 'Anytime', sub: 'Next working day', tag: 'Included' },
                { a: true,  label: 'Before 1pm', sub: 'Next working day', tag: `+€${AM_FEE.toFixed(2)}` },
              ].map((opt, i) => {
                const on = am === opt.a;
                return (
                  <button key={i} onClick={() => setAm(opt.a)} style={{
                    all: 'unset', cursor: 'pointer',
                    padding: '14px 16px', borderRadius: 12,
                    background: on ? `rgba(${accentRgb},.1)` : c.bg,
                    border: `1.5px solid ${on ? c.accent : c.panelLine}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: c.ink }}>{opt.label}</div>
                      <div style={{ fontSize: 11, color: c.soft, marginTop: 2 }}>{opt.sub}</div>
                    </div>
                    <span style={{ fontFamily: f.mono, fontSize: 13, fontWeight: 700, color: on ? c.accent : c.soft }}>{opt.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Add-ons */}
            <div style={{ fontSize: 11, color: c.soft, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}>Optional add-ons</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {addOns.map((a) => {
                const isOn = selected.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggle(a.id)}
                    style={{
                      all: 'unset', display: 'block', cursor: 'pointer',
                      padding: '14px 18px', borderRadius: 12,
                      background: isOn ? `rgba(${accentRgb},.1)` : c.bg,
                      border: `1.5px solid ${isOn ? c.accent : c.panelLine}`,
                      transition: 'all .15s ease',
                    }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 14, alignItems: 'center' }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: 5,
                        border: `2px solid ${isOn ? c.accent : c.muted}`,
                        background: isOn ? c.accent : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isOn && <span style={{ color: c.bg, fontSize: 12, fontWeight: 900 }}>✓</span>}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', color: c.ink }}>
                          {a.label}
                        </div>
                        <div style={{ fontSize: 12, color: c.soft, marginTop: 2 }}>{a.blurb}</div>
                      </div>
                      <div style={{
                        fontFamily: f.mono, fontSize: 14, fontWeight: 700,
                        color: isOn ? c.accent : c.soft,
                      }}>+€{a.price.toFixed(2)}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button onClick={go('booking')} style={{
              marginTop: 24, width: '100%',
              background: c.accent, color: c.bg, border: 'none', borderRadius: 10,
              padding: '16px', fontFamily: f.sans, fontSize: 16, fontWeight: 600,
              letterSpacing: '-0.01em', cursor: 'pointer',
            }}>
              Book for €{total.toFixed(2)} →
            </button>
            <div style={{ textAlign: 'center', fontSize: 12, color: c.soft, marginTop: 10 }}>
              Collected today · no card charged until pickup
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS CALLOUT */}
      <section style={{ padding: '0 40px 40px' }}>
        <div style={{
          background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 18,
          padding: 40, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -100, top: -100, width: 400, height: 400,
            background: `radial-gradient(circle, rgba(${accentRgb},.12), transparent 70%)`,
          }}></div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>
              For business
            </div>
            <h2 style={{
              fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em',
              margin: '12px 0 18px', lineHeight: .98,
            }}>
              10+ parcels a week?<br />
              <span style={{ color: c.accent }}>Same price. Better tools.</span>
            </h2>
            <p style={{ fontSize: 16, color: c.soft, lineHeight: 1.55, margin: '0 0 24px', maxWidth: 480 }}>
              Open a Business account — same per-parcel pricing from €7.99. You get one dashboard for all your parcels, bulk-book by CSV or API, monthly invoicing, €5k insurance included, and a named contact who picks up the phone.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{
                background: c.accent, color: c.bg, border: 'none', borderRadius: 8,
                padding: '14px 22px', fontFamily: f.sans, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>Book a 15-min call →</button>
              <button style={{
                background: 'transparent', color: c.ink, border: `1px solid ${c.panelLine}`,
                borderRadius: 8, padding: '14px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>See API docs</button>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              background: c.bg, border: `1px solid ${c.panelLine}`, borderRadius: 12,
              padding: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px dashed ${c.panelLine}`, paddingBottom: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: f.mono, fontSize: 10, color: c.soft, letterSpacing: '.14em' }}>INVOICE</div>
                  <div style={{ fontFamily: f.mono, fontSize: 14, fontWeight: 700 }}>INV-2026-0421</div>
                </div>
                <div style={{ fontSize: 11, color: c.accent, fontFamily: f.mono }}>● PAID</div>
              </div>
              {[
                { l: '46 parcels · base',         v: '€457.70' },
                { l: '+ AM delivery × 12',          v: '€24.00' },
                { l: '+ Same-day × 4',            v: '€20.00' },
                { l: '+ Signature × 8',           v: '€8.00' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13, color: c.soft, borderBottom: `1px solid ${c.panelLine}` }}>
                  <span>{r.l}</span>
                  <span style={{ fontFamily: f.mono, color: c.ink }}>{r.v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0', fontSize: 16, fontWeight: 700 }}>
                <span>Total · April</span>
                <span style={{ color: c.accent, fontFamily: f.mono, fontSize: 22 }}>€509.70</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 40px 56px', borderTop: `1px solid ${c.panelLine}` }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 28px' }}>
          Questions <span style={{ color: c.accent }}>before you book.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {faqs.map((q, i) => (
            <div key={i} style={{
              background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 12,
              padding: 22,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 10, paddingRight: 12 }}>
                  {q.q}
                </div>
                <span style={{ color: c.accent, fontSize: 18, fontWeight: 800 }}>+</span>
              </div>
              <p style={{ fontSize: 14, color: c.soft, margin: 0, lineHeight: 1.55 }}>{q.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        margin: '0 40px 40px', padding: '40px 40px',
        background: c.accent, color: c.bg, borderRadius: 18,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', opacity: .7 }}>
            Still picking?
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 8, lineHeight: 1 }}>
            Try one parcel. From €7.99.
          </div>
        </div>
        <button onClick={go('booking')} style={{
          background: c.bg, color: c.accent, border: 'none', borderRadius: 10,
          padding: '18px 32px', fontFamily: f.sans, fontSize: 17, fontWeight: 600, cursor: 'pointer',
        }}>Send a parcel →</button>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${c.panelLine}`, padding: '32px 40px 24px',
        display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 32,
      }}>
        <div>
          <window.SprintLogo accent={c.accent} />
          <div style={{ fontSize: 13, color: c.soft, marginTop: 14, maxWidth: 240, lineHeight: 1.5 }}>
            {B.tagline}
          </div>
        </div>
        {B.footer.cols.map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 12 }}>
              {col.title}
            </div>
            {col.links.map(l => (
              <div key={l} style={{ fontSize: 13, color: c.soft, marginBottom: 8 }}>{l}</div>
            ))}
          </div>
        ))}
      </footer>
      <div style={{
        padding: '16px 40px', borderTop: `1px solid ${c.panelLine}`,
        fontSize: 11, color: c.soft, fontFamily: f.mono,
      }}>{B.footer.legal}</div>
    </div>
  );
}

window.SprintPricing = SprintPricing;
