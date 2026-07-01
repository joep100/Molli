// Sprint — Hero Motion Treatment.
// 8-second looping scene that demonstrates how the Sprint brand moves:
//   • Continuous speed-line backdrop
//   • Kinetic typography building line-by-line
//   • Live counter ticking 0 → 247
//   • Animated route map: a parcel travels Dame St → Castleknock
//   • CTA settles into final hero state, holds, loops.
//
// Built on the Stage/Sprite engine from animations.jsx — play/pause via spacebar,
// scrub via the playback bar.

function SprintMotion({ accent }) {
  const ACC = accent || '#9CFF2E';
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Stage
        width={1280} height={720} duration={8}
        background="#0a0a0a"
        persistKey="sprint-motion-v1"
      >
        {/* Persistent: continuous speed-line backdrop */}
        <SpeedLines accent={ACC} />

        {/* Persistent UI chrome */}
        <Sprite start={0.0} end={8} keepMounted><MotionLogo accent={ACC} /></Sprite>
        <Sprite start={0.3} end={8} keepMounted><MotionLivePill accent={ACC} /></Sprite>

        {/* Headline build */}
        <Sprite start={0.6} end={8}>
          <MotionWord text="Anywhere" x={64} y={200} size={108} entryDur={0.45} />
        </Sprite>
        <Sprite start={1.0} end={8}>
          <MotionWord text="in Dublin" x={64} y={308} size={108} entryDur={0.45} />
        </Sprite>
        <Sprite start={1.7} end={8}>
          <MotionWord text="next day." x={64} y={420} size={172} color={ACC} entryDur={0.55} weight={800} />
        </Sprite>

        {/* Animated route ribbon */}
        <Sprite start={3.0} end={8}><MotionRoute accent={ACC} /></Sprite>

        {/* Tiny tick-frame marker bottom-left (broadcast feel) */}
        <Sprite start={0} end={8} keepMounted><FrameMarker /></Sprite>
      </Stage>
    </div>
  );
}

// ── Background speed lines ──────────────────────────────────────────────────
// 30 horizontal lines scrolling right-to-left at varying speeds.
function SpeedLines({ accent }) {
  const t = useTime();
  // Generate stable line config once
  const lines = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < 36; i++) {
      out.push({
        y: 20 + (i * 19) + ((i * 37) % 13),
        len: 60 + ((i * 53) % 220),
        speed: 180 + ((i * 71) % 320),
        offset: ((i * 113) % 1500),
        opacity: 0.06 + ((i * 17) % 18) / 100,
        thickness: 1 + (i % 3 === 0 ? 1 : 0),
      });
    }
    return out;
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
    }}>
      {lines.map((L, i) => {
        // Position: travels from right edge to off the left edge, looping.
        const totalDist = 1280 + L.len + 200;
        const x = 1280 - ((t * L.speed + L.offset) % totalDist);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: x, top: L.y,
            width: L.len, height: L.thickness,
            background: accent,
            opacity: L.opacity,
          }} />
        );
      })}
      {/* Soft right-side vignette so lines fade as they enter */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent 0%, transparent 70%, rgba(10,10,10,.6) 100%)',
      }} />
    </div>
  );
}

// ── Logo lockup top-left ────────────────────────────────────────────────────
function MotionLogo({ accent }) {
  const { progress } = useSprite();
  const opacity = Math.min(1, progress * 3);
  const tx = (1 - Math.min(1, progress * 3)) * -12;
  return (
    <div style={{
      position: 'absolute', left: 64, top: 60,
      display: 'flex', alignItems: 'center', gap: 12,
      opacity, transform: `translateX(${tx}px)`,
      fontFamily: '"Inter Tight", Inter, sans-serif',
    }}>
      <div style={{
        width: 36, height: 36, background: accent, borderRadius: 7,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: 'skewX(-12deg)',
      }}>
        <span style={{ color: '#0a0a0a', fontWeight: 900, fontSize: 22, transform: 'skewX(12deg)' }}>›</span>
      </div>
      <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>CityPost</span>
    </div>
  );
}

// ── Top-right LIVE pill with ticking counter ────────────────────────────────
function MotionLivePill({ accent }) {
  const { progress } = useSprite();
  const t = useTime();
  const accentRgb = window.hexToRgb(accent);

  // Slide in from right
  const entryT = Easing.easeOutCubic(Math.min(1, progress * 3));
  const tx = (1 - entryT) * 30;
  const opacity = entryT;

  // Counter ticks 0 → 247 between t=0.6 and t=4.0
  const countT = clampHere((t - 0.6) / (4.0 - 0.6));
  const eased = Easing.easeOutCubic(countT);
  const count = Math.round(eased * 247);

  // Pulsing dot
  const pulse = 1 + Math.sin(t * 4) * 0.3;

  return (
    <div style={{
      position: 'absolute', right: 64, top: 60,
      transform: `translateX(${tx}px)`, opacity,
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 16px',
      background: `rgba(${accentRgb},.12)`,
      border: `1px solid rgba(${accentRgb},.4)`,
      borderRadius: 999,
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 13, fontWeight: 600, letterSpacing: '.1em',
      color: accent,
    }}>
      <span style={{
        width: 9, height: 9, borderRadius: '50%', background: accent,
        boxShadow: `0 0 0 ${4 * pulse}px rgba(${accentRgb},.${Math.round((1 - pulse + 1) * 12)})`,
      }} />
      <span style={{ textTransform: 'uppercase' }}>LIVE</span>
      <span style={{ opacity: .5 }}>·</span>
      <span style={{
        display: 'inline-block', minWidth: 44, textAlign: 'right',
        color: '#fff', fontWeight: 800, fontSize: 15,
      }}>{count.toLocaleString()}</span>
      <span style={{ textTransform: 'uppercase' }}>parcels moving in Dublin</span>
    </div>
  );
}

// ── Kinetic headline word ───────────────────────────────────────────────────
function MotionWord({ text, x, y, size = 100, color = '#fff', weight = 800, entryDur = 0.5 }) {
  const { localTime, duration } = useSprite();
  const inT = Math.min(1, localTime / entryDur);
  const eased = Easing.easeOutBack(inT);
  const exitStart = duration - 0.4;
  let opacity = 1, ty = (1 - eased) * 40, scale = 0.92 + 0.08 * eased;

  if (localTime > exitStart) {
    const o = Easing.easeInCubic(Math.min(1, (localTime - exitStart) / 0.4));
    opacity = 1 - o;
  }
  opacity = Math.min(opacity, eased);

  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translateY(${ty}px) scale(${scale})`,
      transformOrigin: 'left top',
      opacity,
      fontFamily: '"Inter Tight", Inter, sans-serif',
      fontSize: size, fontWeight: weight,
      letterSpacing: '-0.04em', lineHeight: 0.88,
      color,
      whiteSpace: 'pre',
    }}>{text}</div>
  );
}

// ── Italic deck ─────────────────────────────────────────────────────────────
function MotionItalic({ text, x, y }) {
  const { localTime } = useSprite();
  const inT = Math.min(1, localTime / 0.5);
  const eased = Easing.easeOutCubic(inT);
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      opacity: eased,
      transform: `translateX(${(1 - eased) * 16}px)`,
      fontFamily: '"Inter Tight", Inter, sans-serif',
      fontSize: 42, fontWeight: 500, fontStyle: 'italic',
      letterSpacing: '-0.02em', color: '#8b8b8b',
    }}>{text}</div>
  );
}

// ── Animated route ribbon at bottom: parcel travels Dame St → Castleknock ──
function MotionRoute({ accent }) {
  const { localTime, progress } = useSprite();

  // Entry fade in
  const fade = Math.min(1, localTime / 0.5);

  // Draw the route line + travel the dot
  // Path goes from D02 (left) → hub (middle, slightly up) → D15 (right, more up)
  const pathPts = [
    { x: 80,   y: 100, label: 'D02 · DAME ST',    t: 0 },
    { x: 450,  y: 60,  label: 'D12 · CRUMLIN HUB', t: 0.45 },
    { x: 1180, y: 80,  label: 'D15 · CASTLEKNOCK', t: 1 },
  ];
  // Travel progress: starts at localTime=0.5, completes by localTime=3.5 (3s travel)
  const travelT = clampHere((localTime - 0.5) / 3.0);
  const easedTravel = Easing.easeInOutCubic(travelT);

  // Interpolate dot position along the keyframes
  let dot = pathPts[0];
  for (let i = 0; i < pathPts.length - 1; i++) {
    const a = pathPts[i], b = pathPts[i + 1];
    if (easedTravel >= a.t && easedTravel <= b.t) {
      const local = (easedTravel - a.t) / (b.t - a.t);
      dot = { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local };
      break;
    }
  }
  if (easedTravel >= 1) dot = pathPts[pathPts.length - 1];

  // SVG path
  const d = `M ${pathPts[0].x} ${pathPts[0].y} Q ${(pathPts[0].x + pathPts[1].x)/2} ${pathPts[1].y - 30}, ${pathPts[1].x} ${pathPts[1].y} T ${pathPts[2].x} ${pathPts[2].y}`;
  // dasharray trick: total ~1200
  const pathLen = 1240;
  const dashOffset = pathLen * (1 - easedTravel);
  const accentRgb = window.hexToRgb(accent);

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: 220,
      opacity: fade,
      background: 'linear-gradient(180deg, transparent, rgba(0,0,0,.4))',
    }}>
      <svg viewBox="0 0 1280 200" width="100%" height="200" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none">
        {/* Ghost background path */}
        <path d={d} stroke="#222" strokeWidth="2" fill="none" strokeDasharray="6 4" />
        {/* Drawn-on accent path */}
        <path d={d}
          stroke={accent} strokeWidth="3" fill="none"
          strokeDasharray={pathLen}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
        {/* Origin node */}
        <circle cx={pathPts[0].x} cy={pathPts[0].y} r="8" fill={accent} />
        <circle cx={pathPts[0].x} cy={pathPts[0].y} r="14" fill="none" stroke={accent} strokeWidth="1.5" opacity=".4" />
        {/* Middle node */}
        <circle cx={pathPts[1].x} cy={pathPts[1].y} r="6" fill={easedTravel >= 0.45 ? accent : '#222'} />
        {/* Destination node */}
        <circle cx={pathPts[2].x} cy={pathPts[2].y} r="8" fill={easedTravel >= 1 ? accent : 'none'} stroke={accent} strokeWidth="2.5" />

        {/* Traveling parcel dot with glow */}
        <circle cx={dot.x} cy={dot.y} r="14" fill={accent} opacity=".25">
          <animate attributeName="r" values="12;20;12" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".35;.05;.35" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx={dot.x} cy={dot.y} r="9" fill={accent} stroke="#0a0a0a" strokeWidth="3" />
      </svg>

      {/* Labels */}
      {pathPts.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: p.x, top: p.y + 30,
          transform: 'translateX(-50%)',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11, letterSpacing: '.14em',
          color: (easedTravel >= p.t) ? accent : '#5a5a5a',
          fontWeight: 600,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>{p.label}</div>
      ))}
    </div>
  );
}

// ── CTA button settles in ───────────────────────────────────────────────────
function MotionCTA({ accent }) {
  const { localTime } = useSprite();
  const t = useTime();
  const inT = Math.min(1, localTime / 0.5);
  const eased = Easing.easeOutBack(inT);
  // Pulse glow after settling
  const accentRgb = window.hexToRgb(accent);
  const pulse = 0.4 + Math.sin(t * 3) * 0.15;
  return (
    <div style={{
      position: 'absolute', right: 64, top: 600,
      transform: `translateY(${(1 - eased) * 20}px)`,
      opacity: eased,
    }}>
      <div style={{
        background: accent, color: '#0a0a0a',
        padding: '18px 28px', borderRadius: 12,
        fontFamily: '"Inter Tight", Inter, sans-serif',
        fontSize: 18, fontWeight: 800, letterSpacing: '-0.01em',
        boxShadow: `0 0 60px rgba(${accentRgb},${pulse})`,
        display: 'inline-flex', alignItems: 'center', gap: 12,
      }}>
        Send a parcel
        <span style={{ display: 'inline-block', transform: `translateX(${Math.sin(t * 2) * 4}px)` }}>→</span>
      </div>
    </div>
  );
}

// ── Tick-frame marker bottom-left (broadcast/cinematic feel) ────────────────
function FrameMarker() {
  const t = useTime();
  return (
    <div style={{
      position: 'absolute', left: 64, bottom: 24,
      display: 'flex', gap: 18, alignItems: 'center',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 10, letterSpacing: '.14em', color: '#4a4a4a',
      textTransform: 'uppercase',
    }}>
      <span>CityPost · 2026.05</span>
      <span style={{ width: 2, height: 2, background: '#4a4a4a', borderRadius: 1 }}></span>
      <span>T+{t.toFixed(2)}s</span>
      <span style={{ width: 2, height: 2, background: '#4a4a4a', borderRadius: 1 }}></span>
      <span>HERO/8s/LOOP</span>
    </div>
  );
}

// Local clamp helper (avoid name collision with animations.jsx internal)
function clampHere(v) { return Math.max(0, Math.min(1, v)); }

window.SprintMotion = SprintMotion;
