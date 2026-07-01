// Sprint — Booking engine (multi-step interactive flow)
//
// Steps:
//   1. Route (pickup & drop-off addresses)
//   2. Parcel + delivery date + window + add-ons (live total)
//   3. Sender + recipient details
//   4. Review & pay
//   ✓  Confirmed
//
// Pricing model:
//   Base €9.95.
//   + €5 same-day surcharge if delivery date = today.
//   + €2 AM surcharge if window = AM on a future date.
//   + Optional extras: €5 insurance, €1 signature required.

function SprintBooking({ accent }) {
  const theme = window.makeSprintTheme(accent);
  const f = theme.fonts; const c = theme.c;
  const accentRgb = window.hexToRgb(c.accent);

  const BASE_BY_SIZE = {
    env:    9.95,
    small: 11.95,
    medium: 12.95,
  };
  const AM_FEE = 2.00;

  const ADDONS = [
    { id: 'insure', label: '€500 insurance',     blurb: 'Cover for the parcel and contents',     price: 5.00 },
    { id: 'photo',  label: 'Signature required',  blurb: 'On top of photo on delivery',           price: 1.00 },
  ];

  const SIZES = [
    { id: 'env',    label: 'Letter',     dims: 'Up to A4 · <1 kg',        icon: 'env',   price: 9.95 },
    { id: 'small',  label: 'Package',    dims: '30 × 20 × 15 cm · <5 kg', icon: 'box-s', price: 11.95 },
    { id: 'medium', label: 'Box',        dims: '60 × 40 × 40 cm · <8 kg', icon: 'box-m', price: 12.95 },
  ];

  // Mock current time for the demo (10:30am). Real app would use new Date().
  const NOW_HOUR = 10.5;
  const COLLECTION_CUTOFF = 14; // Book before 2pm to collect today.
  const todayCollectable = NOW_HOUR < COLLECTION_CUTOFF;

  // Working-day list (relative to today). dayIdx is the offset from today.
  // Saturdays/Sundays are skipped — next item after Friday is Monday.
  const DAYS = [
    { id: 'today',    label: 'Today',     sub: 'Wed 27 May', dayIdx: 0 },
    { id: 'tomorrow', label: 'Tomorrow',  sub: 'Thu 28 May', dayIdx: 1 },
    { id: 'fri',      label: 'Friday',    sub: 'Fri 29 May', dayIdx: 2 },
    { id: 'mon',      label: 'Monday',    sub: 'Mon 1 Jun',  dayIdx: 5 },
    { id: 'tue',      label: 'Tuesday',   sub: 'Tue 2 Jun',  dayIdx: 6 },
    { id: 'pick',     label: 'Pick',      sub: 'a date →',  dayIdx: 99 },
  ];

  // Delivery is always the next working day after collection.
  const nextWorkingId = (collectionId) => {
    if (collectionId === 'pick') return 'pick';
    const idx = DAYS.findIndex(d => d.id === collectionId);
    for (let i = idx + 1; i < DAYS.length; i++) {
      if (DAYS[i].id !== 'pick' && DAYS[i].id !== 'today') return DAYS[i].id;
    }
    return 'pick';
  };

  const WINDOWS = [
    { id: 'am', label: 'AM', sub: '9am – 1pm',  amFlag: true },
    { id: 'pm', label: 'PM', sub: '1pm – 5pm',  amFlag: false },
  ];

  const initial = {
    step: 1,
    from: 'D02 — Dame Street',
    fromAddr: '17 Dame Street, Dublin 2',
    to: 'D15 — Castleknock',
    toAddr: '42 Castleknock Park, Dublin 15',
    size: 'small',
    description: 'Vintage record sleeve',
    extras: ['insure'],
    collectionDate: todayCollectable ? 'today' : 'tomorrow',
    deliveryDate: todayCollectable ? 'tomorrow' : 'fri',
    deliveryWindow: 'pm',
    sender:    { name: 'Aoife Brennan',    phone: '+353 87 555 0123', email: 'aoife@brennanco.ie' },
    recipient: { name: 'Niall Ó Conaill',  phone: '+353 87 555 0456', email: 'niall@gmail.com', notes: 'Leave with neighbour at #44 if not in' },
  };
  const [s, setS] = React.useState(initial);
  const set = (patch) => setS(prev => ({ ...prev, ...patch }));
  const toggleExtra = (id) => {
    setS(prev => {
      const has = prev.extras.includes(id);
      return { ...prev, extras: has ? prev.extras.filter(x => x !== id) : [...prev.extras, id] };
    });
  };
  // Setting collection auto-computes the delivery date as next working day.
  const setCollection = (id) => set({ collectionDate: id, deliveryDate: nextWorkingId(id) });

  // Pricing: base depends on size; AM surcharge if window=AM.
  const base = BASE_BY_SIZE[s.size] ?? 9.95;
  const amFee = (s.deliveryWindow === 'am') ? AM_FEE : 0;
  const extrasTotal = ADDONS.filter(a => s.extras.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const total = base + amFee + extrasTotal;

  // Friendly display labels
  const collectionObj = DAYS.find(d => d.id === s.collectionDate);
  const deliveryObj = DAYS.find(d => d.id === s.deliveryDate);
  const windowObj = WINDOWS.find(w => w.id === s.deliveryWindow);
  const collectionDisplay = collectionObj ? `${collectionObj.label} · ${collectionObj.sub}` : 'Tomorrow';
  const deliveryDisplay = deliveryObj ? `${deliveryObj.label} · ${windowObj?.label} (${windowObj?.sub})` : 'Tomorrow';
  const deliveryEta = `${deliveryObj?.label || 'Tomorrow'}, by ${s.deliveryWindow === 'am' ? '1pm' : '5pm'}`;

  const STEPS = ['Route', 'Parcel & delivery', 'Contacts', 'Review'];

  const goto = (n) => set({ step: n });
  const next = () => set({ step: Math.min(s.step + 1, 5) });
  const back = () => set({ step: Math.max(s.step - 1, 1) });

  return (
    <div style={{
      width: '100%', minHeight: '100vh', background: c.bg, color: c.ink,
      fontFamily: f.sans, position: 'relative',
    }}>
      {/* Header */}
      <header style={{
        padding: '18px 40px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: `1px solid ${c.panelLine}`,
      }}>
        <window.SprintLogo accent={c.accent} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: f.mono, fontSize: 11, color: c.soft, letterSpacing: '.1em' }}>
          <span style={{ color: c.accent }}>● SECURE</span>
          <span>·</span>
          <span>NEED HELP? 01 555 0100</span>
        </div>
      </header>

      <ProgressBar step={s.step} steps={STEPS} theme={theme} onJump={goto} />

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 380px', gap: 0,
        minHeight: 'calc(100vh - 200px)',
      }}>
        {/* Form column */}
        <main style={{ padding: '40px 56px 120px', borderRight: `1px solid ${c.panelLine}` }}>
          {s.step === 1 && <StepRoute s={s} set={set} theme={theme} />}
          {s.step === 2 && (
            <StepParcel
              s={s} set={set} setCollection={setCollection} toggleExtra={toggleExtra}
              SIZES={SIZES} ADDONS={ADDONS}
              DAYS={DAYS} WINDOWS={WINDOWS}
              todayCollectable={todayCollectable}
              AM_FEE={AM_FEE}
              deliveryEta={deliveryEta}
              theme={theme}
            />
          )}
          {s.step === 3 && <StepContacts s={s} set={set} theme={theme} />}
          {s.step === 4 && <StepReview s={s} ADDONS={ADDONS} SIZES={SIZES} base={base} amFee={amFee} total={total} theme={theme} goto={goto} collectionDisplay={collectionDisplay} deliveryDisplay={deliveryDisplay} deliveryEta={deliveryEta} />}
          {s.step === 5 && <StepConfirmed s={s} total={total} theme={theme} collectionDisplay={collectionDisplay} deliveryDisplay={deliveryDisplay} deliveryEta={deliveryEta} />}
        </main>

        {/* Summary column */}
        <aside style={{ padding: '40px 32px', position: 'sticky', top: 0, height: 'fit-content', alignSelf: 'flex-start' }}>
          <SummaryCard
            s={s} base={base} amFee={amFee}
            extrasTotal={extrasTotal} total={total}
            ADDONS={ADDONS} SIZES={SIZES} theme={theme}
            collectionDisplay={collectionDisplay}
            deliveryDisplay={deliveryDisplay} deliveryEta={deliveryEta}
          />
        </aside>
      </div>

      {/* Floating action bar */}
      {s.step < 5 && (
        <div style={{
          position: 'sticky', bottom: 0, left: 0, right: 0,
          background: `linear-gradient(180deg, transparent, ${c.bg} 30%)`,
          padding: '20px 40px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: `1px solid ${c.panelLine}`,
          zIndex: 5,
        }}>
          <button onClick={back} disabled={s.step === 1} style={{
            background: 'transparent', color: s.step === 1 ? c.muted : c.ink,
            border: `1px solid ${c.panelLine}`, borderRadius: 8,
            padding: '14px 22px', fontFamily: f.sans, fontSize: 14, fontWeight: 600,
            cursor: s.step === 1 ? 'not-allowed' : 'pointer',
          }}>← Back</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: c.soft, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700 }}>Total</div>
              <div style={{ fontFamily: f.sans, fontSize: 28, fontWeight: 800, color: c.accent, letterSpacing: '-0.02em', lineHeight: 1 }}>
                €{total.toFixed(2)}
              </div>
            </div>
            <button onClick={next} style={{
              background: c.accent, color: c.bg, border: 'none', borderRadius: 10,
              padding: '16px 30px', fontFamily: f.sans, fontSize: 15, fontWeight: 800,
              letterSpacing: '-0.01em', cursor: 'pointer',
            }}>
              {s.step === 4 ? `Pay €${total.toFixed(2)} →` : 'Continue →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Progress bar ───────────────────────────────────────────────────────────
function ProgressBar({ step, steps, theme, onJump }) {
  const c = theme.c; const f = theme.fonts;
  return (
    <div style={{ padding: '20px 40px 24px', borderBottom: `1px solid ${c.panelLine}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {steps.map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          const reachable = step >= n;
          return (
            <React.Fragment key={n}>
              <button onClick={() => reachable && onJump(n)} disabled={!reachable} style={{
                all: 'unset', display: 'flex', alignItems: 'center', gap: 10,
                cursor: reachable ? 'pointer' : 'not-allowed',
              }}>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: done ? c.accent : (active ? 'transparent' : c.panel),
                  border: `1.5px solid ${active || done ? c.accent : c.panelLine}`,
                  color: done ? c.bg : (active ? c.accent : c.muted),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: f.mono, fontSize: 13, fontWeight: 700,
                }}>{done ? '✓' : n}</span>
                <span style={{
                  fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em',
                  color: active ? c.ink : (done ? c.soft : c.muted),
                }}>{label}</span>
              </button>
              {n < steps.length && (
                <div style={{
                  flex: 1, height: 1, margin: '0 14px',
                  background: c.panelLine, position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: c.accent,
                    width: step > n ? '100%' : '0%',
                    transition: 'width .3s ease',
                  }}></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 1: Route ──────────────────────────────────────────────────────────
function StepRoute({ s, set, theme }) {
  const c = theme.c; const f = theme.fonts;
  return (
    <div>
      <StepHeader theme={theme} kicker="Step 1 of 4" title={<>Where's it going? <span style={{ color: c.accent }}>Anywhere in Dublin.</span></>} blurb="Pickup and drop-off. We support all 24 Dublin postal codes." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <BookingField theme={theme} label="Pickup address" sub={s.from} value={s.fromAddr} dot={c.accent}
          onChange={(v) => set({ fromAddr: v })} placeholder="Number, street, postal code" />
        <BookingField theme={theme} label="Drop-off address" sub={s.to} value={s.toAddr} dot="ring"
          onChange={(v) => set({ toAddr: v })} placeholder="Number, street, postal code" />
      </div>

      <div style={{
        marginTop: 28, background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 16,
        padding: 20, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>Route preview</div>
            <div style={{ fontFamily: f.mono, fontSize: 13, marginTop: 4, color: c.soft }}>D02 → D15 · ~12.4 km · ~24 min</div>
          </div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.1em' }}>via M50</div>
        </div>
        <svg viewBox="0 0 600 200" width="100%" height="160">
          <defs>
            <linearGradient id="rg" x1="0" x2="1">
              <stop offset="0" stopColor={c.accent} />
              <stop offset="1" stopColor={c.accent} stopOpacity=".6" />
            </linearGradient>
          </defs>
          <path d="M 40 160 Q 200 60, 320 80 T 560 50" stroke="url(#rg)" strokeWidth="3" fill="none" strokeDasharray="6 4" />
          <circle cx="40" cy="160" r="8" fill={c.accent} />
          <circle cx="560" cy="50" r="8" fill="none" stroke={c.accent} strokeWidth="2.5" />
          <circle cx="320" cy="80" r="5" fill={c.accent} opacity=".5" />
          <text x="40" y="190" fontFamily={f.mono} fontSize="11" fill={c.accent} fontWeight="600">D02</text>
          <text x="560" y="40" fontFamily={f.mono} fontSize="11" fill={c.accent} fontWeight="600" textAnchor="end">D15</text>
        </svg>
      </div>
    </div>
  );
}

// ── Step 2: Parcel & Delivery ──────────────────────────────────────────────
function StepParcel({ s, set, setCollection, toggleExtra, SIZES, ADDONS, DAYS, WINDOWS, todayCollectable, AM_FEE, deliveryEta, theme }) {
  const c = theme.c; const f = theme.fonts;
  const accentRgb = window.hexToRgb(c.accent);
  const deliveryDay = DAYS.find(d => d.id === s.deliveryDate);

  return (
    <div>
      <StepHeader theme={theme} kicker="Step 2 of 4" title={<>What's in the box? <span style={{ color: c.soft, fontStyle: 'italic', fontWeight: 500 }}>And when's it collected?</span></>} blurb="Pick a size, choose when we collect. Delivery is the next working day." />

      {/* Size */}
      <div style={{ marginBottom: 28 }}>
        <FieldLabel theme={theme}>Parcel size</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${SIZES.length}, 1fr)`, gap: 10 }}>
          {SIZES.map(sz => {
            const sel = s.size === sz.id;
            return (
              <button key={sz.id} onClick={() => set({ size: sz.id })} style={{
                all: 'unset', cursor: 'pointer',
                padding: '18px 16px', borderRadius: 12,
                background: sel ? `rgba(${accentRgb},.1)` : c.panel,
                border: `1.5px solid ${sel ? c.accent : c.panelLine}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <SizeIcon kind={sz.icon} accent={c.accent} muted={c.muted} sel={sel} />
                  <div style={{ fontFamily: f.mono, fontSize: 13, fontWeight: 700, color: sel ? c.accent : c.soft }}>
                    €{sz.price.toFixed(2)}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, marginTop: 10 }}>{sz.label}</div>
                <div style={{ fontSize: 11, color: c.soft, marginTop: 2, fontFamily: f.mono }}>{sz.dims}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: 32 }}>
        <FieldLabel theme={theme}>What's in it? <span style={{ color: c.soft, fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>(for the courier — not shared)</span></FieldLabel>
        <input value={s.description} onChange={(e) => set({ description: e.target.value })}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: 10,
            background: c.panel, border: `1px solid ${c.panelLine}`,
            color: c.ink, fontFamily: f.sans, fontSize: 15, fontWeight: 500,
            outline: 'none', boxSizing: 'border-box',
          }} placeholder="e.g. vintage records, gift, documents" />
      </div>

      {/* Collection date */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <FieldLabel theme={theme}>Collection date</FieldLabel>
          <span style={{ fontSize: 11, color: todayCollectable ? c.accent : c.muted, fontFamily: f.mono, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600 }}>
            {todayCollectable ? 'BOOK BEFORE 2 PM TO COLLECT TODAY' : 'PAST 2 PM · COLLECT NEXT WORKING DAY'}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${DAYS.length}, 1fr)`, gap: 8 }}>
          {DAYS.map(d => {
            const sel = s.collectionDate === d.id;
            const disabled = d.id === 'today' && !todayCollectable;
            return (
              <button key={d.id} onClick={() => !disabled && setCollection(d.id)} disabled={disabled} style={{
                all: 'unset',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? .35 : 1,
                padding: '14px 10px', borderRadius: 10, textAlign: 'center',
                background: sel ? c.accent : c.panel,
                color: sel ? c.bg : c.ink,
                border: `1.5px solid ${sel ? c.accent : c.panelLine}`,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>{d.label}</div>
                <div style={{ fontSize: 11, marginTop: 2, opacity: sel ? .8 : .6, fontFamily: d.id === 'pick' ? 'inherit' : f.mono }}>{d.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Delivery window — delivery is always the next working day after collection */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <FieldLabel theme={theme}>Delivery window</FieldLabel>
          <span style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600 }}>
            Next working day · <span style={{ color: c.accent }}>{deliveryDay?.label} {deliveryDay?.sub}</span>
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {WINDOWS.map(w => {
            const sel = s.deliveryWindow === w.id;
            const priceTag = w.amFlag ? `+€${AM_FEE.toFixed(2)}` : 'Included';
            return (
              <button key={w.id} onClick={() => set({ deliveryWindow: w.id })} style={{
                all: 'unset',
                cursor: 'pointer',
                padding: '22px 24px', borderRadius: 12,
                background: sel ? `rgba(${accentRgb},.1)` : c.panel,
                border: `1.5px solid ${sel ? c.accent : c.panelLine}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontFamily: f.sans, fontSize: 32, fontWeight: 800, color: sel ? c.accent : c.ink, letterSpacing: '-0.025em', lineHeight: 1 }}>
                    {w.label}
                  </div>
                  <div style={{ fontSize: 13, color: c.soft, marginTop: 6, fontFamily: f.mono }}>{w.sub}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: f.mono, fontSize: 13, fontWeight: 700, color: sel ? c.accent : c.soft }}>
                    {priceTag}
                  </div>
                  <span style={{
                    display: 'inline-flex', marginTop: 8,
                    width: 24, height: 24, borderRadius: '50%',
                    border: `2px solid ${sel ? c.accent : c.muted}`,
                    background: sel ? c.accent : 'transparent',
                    alignItems: 'center', justifyContent: 'center',
                  }}>{sel && <span style={{ color: c.bg, fontSize: 13, fontWeight: 900 }}>✓</span>}</span>
                </div>
              </button>
            );
          })}
        </div>
        {/* Delivery promise */}
        <div style={{
          marginTop: 12, padding: '12px 16px',
          background: c.panel, border: `1px dashed ${c.panelLine}`, borderRadius: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: c.soft, fontFamily: f.mono, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            Promise
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: c.accent }}>
            Delivered {deliveryEta.toLowerCase()}
          </span>
        </div>
      </div>

      {/* Add-ons (insurance + signature) */}
      <div>
        <FieldLabel theme={theme}>Add-ons</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {ADDONS.map(a => {
            const sel = s.extras.includes(a.id);
            return (
              <button key={a.id} onClick={() => toggleExtra(a.id)} style={{
                all: 'unset', cursor: 'pointer',
                padding: '16px 18px', borderRadius: 12,
                background: sel ? `rgba(${accentRgb},.1)` : c.panel,
                border: `1.5px solid ${sel ? c.accent : c.panelLine}`,
                display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 14, alignItems: 'center',
              }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 5,
                  border: `2px solid ${sel ? c.accent : c.muted}`,
                  background: sel ? c.accent : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{sel && <span style={{ color: c.bg, fontSize: 12, fontWeight: 900 }}>✓</span>}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{a.label}</div>
                  <div style={{ fontSize: 12, color: c.soft, marginTop: 2 }}>{a.blurb}</div>
                </div>
                <div style={{ fontFamily: f.mono, fontSize: 14, fontWeight: 700, color: sel ? c.accent : c.soft }}>+€{a.price.toFixed(2)}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Step 3: Contacts ───────────────────────────────────────────────────────
function StepContacts({ s, set, theme }) {
  const c = theme.c;
  return (
    <div>
      <StepHeader theme={theme} kicker="Step 3 of 4" title={<>Who's at each end? <span style={{ color: c.soft, fontStyle: 'italic', fontWeight: 500 }}>So we know who to call.</span></>} blurb="We text the sender on collection and the recipient before drop-off." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <ContactPanel
          title="Sender"
          dot={c.accent}
          subtitle={s.from}
          contact={s.sender}
          theme={theme}
          onChange={(field, v) => set({ sender: { ...s.sender, [field]: v } })}
        />
        <ContactPanel
          title="Recipient"
          dot="ring"
          subtitle={s.to}
          contact={s.recipient}
          theme={theme}
          showNotes
          onChange={(field, v) => set({ recipient: { ...s.recipient, [field]: v } })}
        />
      </div>
    </div>
  );
}

function ContactPanel({ title, dot, subtitle, contact, onChange, showNotes, theme }) {
  const c = theme.c; const f = theme.fonts;
  return (
    <div style={{
      background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 14, padding: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span style={{
          width: 10, height: 10, borderRadius: '50%',
          background: dot === 'ring' ? 'transparent' : dot,
          border: dot === 'ring' ? `2px solid ${c.accent}` : 'none',
        }}></span>
        <span style={{ fontSize: 11, color: c.accent, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' }}>
          {title}
        </span>
      </div>
      <div style={{ fontSize: 14, color: c.soft, marginBottom: 18, fontFamily: f.mono }}>{subtitle}</div>

      <FormInput theme={theme} label="Full name" value={contact.name} onChange={(v) => onChange('name', v)} />
      <FormInput theme={theme} label="Phone" value={contact.phone} onChange={(v) => onChange('phone', v)} />
      <FormInput theme={theme} label="Email" value={contact.email} onChange={(v) => onChange('email', v)} />
      {showNotes && (
        <FormInput theme={theme} label="Drop-off notes (optional)" value={contact.notes || ''} onChange={(v) => onChange('notes', v)} multi />
      )}
    </div>
  );
}

// ── Step 4: Review ─────────────────────────────────────────────────────────
function StepReview({ s, ADDONS, SIZES, base, amFee, total, theme, goto, collectionDisplay, deliveryDisplay, deliveryEta }) {
  const c = theme.c; const f = theme.fonts;
  const sizeObj = SIZES.find(x => x.id === s.size);
  const usedExtras = ADDONS.filter(a => s.extras.includes(a.id));

  const sections = [
    { title: 'Route', step: 1, body: (
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>FROM</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{s.from}</div>
          <div style={{ fontSize: 13, color: c.soft, marginTop: 2 }}>{s.fromAddr}</div>
        </div>
        <div style={{ color: c.accent, fontSize: 22, paddingTop: 16 }}>→</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>TO</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{s.to}</div>
          <div style={{ fontSize: 13, color: c.soft, marginTop: 2 }}>{s.toAddr}</div>
        </div>
      </div>
    )},
    { title: 'Parcel & delivery', step: 2, body: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>SIZE</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{sizeObj.label}</div>
          <div style={{ fontSize: 12, color: c.soft, marginTop: 2 }}>"{s.description}"</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>EXTRAS</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, lineHeight: 1.45 }}>
            {usedExtras.length > 0 ? usedExtras.map(e => e.label).join(', ') : <span style={{ color: c.soft }}>None</span>}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>COLLECTION</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{collectionDisplay}</div>
          <div style={{ fontSize: 12, color: c.soft, marginTop: 2 }}>We'll text 30 min before pickup</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>DELIVERY</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{deliveryDisplay}</div>
          <div style={{ fontSize: 12, color: c.soft, marginTop: 2 }}>{deliveryEta}</div>
        </div>
      </div>
    )},
    { title: 'Contacts', step: 3, body: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>SENDER</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{s.sender.name}</div>
          <div style={{ fontSize: 12, color: c.soft, marginTop: 2 }}>{s.sender.phone} · {s.sender.email}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>RECIPIENT</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{s.recipient.name}</div>
          <div style={{ fontSize: 12, color: c.soft, marginTop: 2 }}>{s.recipient.phone} · {s.recipient.email}</div>
          {s.recipient.notes && (
            <div style={{ fontSize: 12, color: c.soft, marginTop: 6, fontStyle: 'italic' }}>"{s.recipient.notes}"</div>
          )}
        </div>
      </div>
    )},
  ];

  return (
    <div>
      <StepHeader theme={theme} kicker="Step 4 of 4" title={<>Looks right? <span style={{ color: c.accent }}>Then send it.</span></>} blurb="Have a quick look. You can still edit anything." />

      {sections.map((sec, i) => (
        <div key={i} style={{
          background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 14,
          padding: 24, marginBottom: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: c.accent, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' }}>
              {sec.title}
            </div>
            <button onClick={() => goto(sec.step)} style={{
              all: 'unset', cursor: 'pointer',
              fontSize: 12, color: c.soft, fontWeight: 600,
              padding: '5px 10px', borderRadius: 6, border: `1px solid ${c.panelLine}`,
            }}>Edit</button>
          </div>
          {sec.body}
        </div>
      ))}

      {/* Payment */}
      <div style={{
        background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 14,
        padding: 24,
      }}>
        <div style={{ fontSize: 11, color: c.accent, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 14 }}>
          Payment
        </div>
        <div style={{
          background: c.bg, border: `1px solid ${c.accent}`, borderRadius: 10, padding: '14px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 36, height: 24, background: c.ink, borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: f.mono, fontSize: 10, color: c.accent, letterSpacing: '.06em', fontWeight: 700,
            }}>VISA</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>•••• •••• •••• 4242</div>
              <div style={{ fontSize: 11, color: c.soft }}>Expires 09/28</div>
            </div>
          </div>
          <span style={{ color: c.accent, fontSize: 12, fontWeight: 700 }}>● DEFAULT</span>
        </div>
        <div style={{ fontSize: 12, color: c.soft, marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: c.accent }}>🔒</span>
          Card not charged until we collect the parcel.
        </div>
      </div>
    </div>
  );
}

// ── Step 5: Confirmed ──────────────────────────────────────────────────────
function StepConfirmed({ s, total, theme, collectionDisplay, deliveryDisplay, deliveryEta }) {
  const c = theme.c; const f = theme.fonts;
  return (
    <div style={{ paddingTop: 40 }}>
      <div style={{
        width: 88, height: 88, borderRadius: '50%', background: c.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: c.bg, fontSize: 48, fontWeight: 900, marginBottom: 24,
      }}>✓</div>
      <div style={{ fontSize: 11, color: c.accent, fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 12 }}>
        Booking confirmed
      </div>
      <h1 style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: .98, margin: '0 0 18px', maxWidth: 700 }}>
        We've got it from here.
      </h1>
      <p style={{ fontSize: 17, color: c.soft, maxWidth: 540, lineHeight: 1.55, margin: '0 0 36px' }}>
        We'll collect on {collectionDisplay.split(' · ')[0].toLowerCase()} and deliver {deliveryEta.toLowerCase()}.
      </p>

      <div style={{
        background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 14,
        padding: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, maxWidth: 720,
      }}>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>Tracking number</div>
          <div style={{ fontFamily: f.mono, fontSize: 22, fontWeight: 700, color: c.accent, marginTop: 6 }}>CP-94821-D</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>Charged</div>
          <div style={{ fontFamily: f.mono, fontSize: 22, fontWeight: 700, marginTop: 6 }}>€{total.toFixed(2)}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>Collection</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{collectionDisplay}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>Delivery</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{deliveryDisplay}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>Promise</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{deliveryEta}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: c.soft, fontFamily: f.mono, letterSpacing: '.14em', textTransform: 'uppercase' }}>Status</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6, color: c.accent }}>Booked · confirmed</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        <button style={{
          background: c.accent, color: c.bg, border: 'none', borderRadius: 10,
          padding: '14px 24px', fontFamily: f.sans, fontSize: 14, fontWeight: 800, cursor: 'pointer',
        }}>Track parcel →</button>
        <button style={{
          background: 'transparent', color: c.ink, border: `1px solid ${c.panelLine}`,
          borderRadius: 10, padding: '14px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>Book another</button>
        <button style={{
          background: 'transparent', color: c.soft, border: 'none', padding: '14px 16px',
          fontSize: 14, fontWeight: 500, cursor: 'pointer',
        }}>Send receipt by email</button>
      </div>
    </div>
  );
}

// ── Sidebar summary ────────────────────────────────────────────────────────
function SummaryCard({ s, base, amFee, extrasTotal, total, ADDONS, SIZES, theme, collectionDisplay, deliveryDisplay, deliveryEta }) {
  const c = theme.c; const f = theme.fonts;
  const sizeObj = SIZES.find(x => x.id === s.size);
  return (
    <div style={{
      background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 16,
      padding: 24, position: 'sticky', top: 24,
    }}>
      <div style={{
        fontSize: 11, color: c.accent, fontWeight: 800, letterSpacing: '.16em',
        textTransform: 'uppercase', marginBottom: 14,
      }}>Your parcel</div>

      {/* Route mini */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.accent }}></span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{s.from}</span>
        </div>
        <div style={{
          width: 1, height: 18, background: c.panelLine, margin: '4px 0 4px 3.5px',
        }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', border: `2px solid ${c.accent}`, boxSizing: 'border-box' }}></span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{s.to}</span>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${c.panelLine}`, paddingTop: 16, marginBottom: 14 }}>
        <SumLine label="Parcel" value={sizeObj.label} theme={theme} />
        <SumLine label="Collection" value={collectionDisplay} theme={theme} />
        <SumLine label="Delivery" value={deliveryDisplay} theme={theme} />
        <SumLine label="Promise" value={deliveryEta} theme={theme} />
      </div>

      {/* Price ledger */}
      <div style={{ borderTop: `1px solid ${c.panelLine}`, paddingTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13, color: c.soft }}>
          <span>Base · {(SIZES.find(x => x.id === s.size) || {}).label}</span>
          <span style={{ fontFamily: f.mono, color: c.ink }}>€{base.toFixed(2)}</span>
        </div>
        {amFee > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13, color: c.soft }}>
            <span>+ AM delivery</span>
            <span style={{ fontFamily: f.mono, color: c.accent }}>€{amFee.toFixed(2)}</span>
          </div>
        )}
        {ADDONS.filter(a => s.extras.includes(a.id)).map(a => (
          <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13, color: c.soft }}>
            <span>+ {a.label}</span>
            <span style={{ fontFamily: f.mono, color: c.accent }}>€{a.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 14, paddingTop: 14, borderTop: `1px solid ${c.panelLine}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <span style={{ fontSize: 13, color: c.soft, fontWeight: 600 }}>Total</span>
        <span style={{ fontFamily: f.sans, fontSize: 32, fontWeight: 800, color: c.accent, letterSpacing: '-0.025em' }}>
          €{total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function SumLine({ label, value, theme }) {
  const c = theme.c;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
      <span style={{ color: c.soft }}>{label}</span>
      <span style={{ color: c.ink, fontWeight: 600, maxWidth: 220, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

// ── Tiny shared parts ──────────────────────────────────────────────────────
function StepHeader({ theme, kicker, title, blurb }) {
  const c = theme.c;
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 11, color: c.accent, fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase' }}>
        {kicker}
      </div>
      <h1 style={{
        fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em',
        margin: '12px 0 12px', lineHeight: .98,
      }}>{title}</h1>
      <p style={{ fontSize: 16, color: c.soft, margin: 0, lineHeight: 1.5, maxWidth: 560 }}>{blurb}</p>
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, color: '#8b8b8b', fontWeight: 800, letterSpacing: '.14em',
      textTransform: 'uppercase', marginBottom: 12,
    }}>{children}</div>
  );
}

function FormInput({ theme, label, value, onChange, multi }) {
  const c = theme.c; const f = theme.fonts;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: c.soft, fontWeight: 600, letterSpacing: '.06em', marginBottom: 6, textTransform: 'uppercase' }}>
        {label}
      </div>
      {multi ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2}
          style={{
            width: '100%', padding: '12px 14px', borderRadius: 8,
            background: c.bg, border: `1px solid ${c.panelLine}`,
            color: c.ink, fontFamily: f.sans, fontSize: 14, fontWeight: 500,
            outline: 'none', resize: 'vertical', boxSizing: 'border-box',
          }} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%', padding: '12px 14px', borderRadius: 8,
            background: c.bg, border: `1px solid ${c.panelLine}`,
            color: c.ink, fontFamily: f.sans, fontSize: 14, fontWeight: 500,
            outline: 'none', boxSizing: 'border-box',
          }} />
      )}
    </div>
  );
}

function BookingField({ theme, label, sub, value, dot, onChange, placeholder }) {
  const c = theme.c; const f = theme.fonts;
  return (
    <div style={{
      background: c.panel, border: `1px solid ${c.panelLine}`, borderRadius: 14, padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{
          width: 10, height: 10, borderRadius: '50%',
          background: dot === 'ring' ? 'transparent' : dot,
          border: dot === 'ring' ? `2px solid ${c.accent}` : 'none',
        }}></span>
        <span style={{ fontSize: 11, color: c.accent, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' }}>{label}</span>
      </div>
      <div style={{ fontSize: 13, color: c.soft, marginBottom: 8, fontFamily: f.mono }}>{sub}</div>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 0', border: 'none', borderBottom: `1.5px solid ${c.panelLine}`,
          background: 'transparent', color: c.ink, fontFamily: f.sans, fontSize: 15, fontWeight: 600,
          outline: 'none', boxSizing: 'border-box',
        }} />
    </div>
  );
}

function SizeIcon({ kind, accent, muted, sel }) {
  const col = sel ? accent : muted;
  switch (kind) {
    case 'env':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="3" y="8" width="26" height="18" rx="2" stroke={col} strokeWidth="1.5" />
          <path d="M 3 10 L 16 19 L 29 10" stroke={col} strokeWidth="1.5" />
        </svg>
      );
    case 'box-s':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="9" y="12" width="14" height="12" rx="1.5" stroke={col} strokeWidth="1.5" />
          <path d="M 9 16 L 23 16" stroke={col} strokeWidth="1.5" />
        </svg>
      );
    case 'box-m':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="6" y="9" width="20" height="16" rx="1.5" stroke={col} strokeWidth="1.5" />
          <path d="M 6 14 L 26 14" stroke={col} strokeWidth="1.5" />
        </svg>
      );
  }
}

window.SprintBooking = SprintBooking;
