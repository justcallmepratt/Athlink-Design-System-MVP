/* Recruiter UI kit — shared component primitives */
const { useState } = React;

/* ---- Lucide ---- */
const Icon = ({ d, size = 16, stroke = 'currentColor', sw = 2, fill = 'none', extra }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {typeof d === 'string' ? <path d={d} /> : d}
    {extra}
  </svg>
);

const I = {
  home:    <Icon d="M3 12l9-9 9 9M5 10v10h14V10" />,
  search:  <Icon d={<><circle cx="11" cy="11" r="7" /><path d="M20 20l-3-3" /></>} />,
  heart:   <Icon d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" />,
  msg:     <Icon d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />,
  bar:     <Icon d={<><path d="M14 12V8H6v8h6" /><path d="M22 12v6h-6v-6h6z" /></>} />,
  file:    <Icon d={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 14h6M9 18h6" /></>} />,
  user:    <Icon d={<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>} />,
  globe:   <Icon d={<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>} />,
  dollar:  <Icon d={<><path d="M12 1v22M16 6a4 4 0 0 0-4-2c-2.5 0-4 1.5-4 3.5S9.5 11 12 11s4 1.5 4 3.5S14.5 18 12 18a4 4 0 0 1-4-2" /></>} />,
  trophy:  <Icon d={<><path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0z" /><path d="M7 4H4v3a3 3 0 0 0 3 3M17 4h3v3a3 3 0 0 1-3 3" /></>} />,
  shake:   <Icon d={<><path d="M11 17l-3 3-3-3-3 3M16 12l3 3 3-3M14 9l3-3-2-2-3 3-2-2-7 7 4 4 7-7 2 2z" /></>} />,
  sign:    <Icon d="M3 18h18M5 14l4-4 4 4 6-6" />,
  back:    <Icon d="M19 12H5M12 19l-7-7 7-7" />,
  check:   <Icon d={<><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></>} stroke="#2196F3" sw={2.5} />,
  checkSm: <Icon d="M5 12l4 4 10-10" sw={2.5} size={12} />,
  play:    <Icon d="M8 5v14l11-7z" fill="currentColor" stroke="none" />,
  filter:  <Icon d="M3 5h18M6 12h12M10 19h4" />,
  bell:    <Icon d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />,
  brain:   <Icon d="M9 18V5L21 3v13" extra={<><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>} />,
  spark:   <Icon d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />,
  heartFill: <Icon d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" fill="currentColor" />,
  x:       <Icon d="M18 6L6 18M6 6l12 12" sw={2.5} />,
  trendUp: <Icon d="M3 17l6-6 4 4 8-8M14 7h7v7" sw={2} />,
};

/* ---- Sidebar ---- */
function Sidebar({ active, onChange, savedCount = 3, compareCount = 2 }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: I.home },
    { id: 'discover',  label: 'Discover',  icon: I.search },
    { id: 'saved',     label: 'Saved',     icon: I.heart, count: savedCount },
    { id: 'messages',  label: 'Messages',  icon: I.msg, dot: true },
    { id: 'compare',   label: 'Compare',   icon: I.bar, count: `${compareCount}/3` },
    { id: 'reports',   label: 'AI Reports', icon: I.file },
  ];
  const items2 = [
    { id: 'sponsors', label: 'Sponsors', icon: I.shake },
    { id: 'federations', label: 'Federations', icon: I.globe },
    { id: 'nil', label: 'NIL Deals', icon: I.dollar },
    { id: 'camps', label: 'Summer Camps', icon: I.trophy },
    { id: 'contracts', label: 'Contracts', icon: I.sign },
  ];
  const Row = ({ it }) => {
    const a = active === it.id;
    return (
      <button onClick={() => onChange(it.id)}
        className="rk-row" data-active={a}>
        <span className="rk-row-icon">{it.icon}</span>
        <span>{it.label}</span>
        {it.count !== undefined && <span className="rk-pill" data-active={a}>{it.count}</span>}
        {it.dot && <span className="rk-dot" />}
      </button>
    );
  };
  return (
    <aside className="rk-sidebar">
      <div className="rk-brand">
        <img src="../../assets/athlink-logo.png" alt="" />
        <span>AthLink</span>
      </div>
      <nav>
        {items.map(it => <Row key={it.id} it={it} />)}
        <div className="rk-divider" />
        {items2.map(it => <Row key={it.id} it={it} />)}
        <div className="rk-divider" />
        <Row it={{ id: 'profile', label: 'Profile', icon: I.user }} />
      </nav>
    </aside>
  );
}

/* ---- TopBar (mobile) ---- */
function TopBar({ title }) {
  return (
    <div className="rk-topbar">
      <button className="rk-iconbtn"><span style={{display:'inline-flex'}}>{I.back}</span></button>
      <h2>{title}</h2>
      <button className="rk-iconbtn"><span style={{display:'inline-flex'}}>{I.bell}</span></button>
    </div>
  );
}

/* ---- StatTile ---- */
function StatTile({ label, value, delta }) {
  return (
    <div className="rk-card rk-stat">
      <div className="rk-stat-label">{label}</div>
      <div className="rk-stat-num">{value}</div>
      {delta && <div className="rk-stat-delta">{delta}</div>}
    </div>
  );
}

/* ---- Badge ---- */
function Badge({ kind = 'outline', children, icon }) {
  return <span className={`rk-badge rk-badge-${kind}`}>{icon && <span className="rk-badge-ico">{icon}</span>}{children}</span>;
}

/* ---- Athlete card ---- */
function AthleteCard({ a, onOpen, saved, onSave }) {
  return (
    <div className="rk-card rk-athlete" onClick={onOpen}>
      <div className="rk-athlete-photo" style={{ background: a.bg }}>
        <Badge kind="match">{a.match}% Match</Badge>
        <Badge kind="gpa">GPA {a.gpa}</Badge>
        <Badge kind="country">{a.country}</Badge>
        <button className="rk-save" onClick={e => { e.stopPropagation(); onSave?.(); }}
          data-saved={saved}>
          {saved ? I.heartFill : I.heart}
        </button>
        <div className="rk-play">{I.play}</div>
      </div>
      <div className="rk-athlete-body">
        <div className="rk-athlete-head">
          <div className="rk-avatar" style={{ background: a.av }}>{a.initials}</div>
          <div>
            <div className="rk-athlete-name">{a.name}<span className="rk-verify-ico">{I.check}</span></div>
            <div className="rk-athlete-meta">{a.sport} · {a.position}</div>
          </div>
        </div>
        <div className="rk-athlete-meta">{a.height} · {a.weight} · Class of {a.year}</div>
        <div className="rk-athlete-stats">{a.stats}</div>
        <div className="rk-verify">
          <span className="rk-v">{I.checkSm} AI Verified</span>
          <span className="rk-v">{I.checkSm} AR Verified</span>
          <span className="rk-v">{I.checkSm} NCAA</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Distribution bar ---- */
function DistRow({ label, pct }) {
  return (
    <div className="rk-dist-row">
      <span>{label}</span>
      <div className="rk-dist-rail">
        <div className="rk-dist-bar" style={{ width: `${pct}%` }} />
      </div>
      <span className="rk-dist-pct">{pct}%</span>
    </div>
  );
}

/* ---- Discover swipe card ---- */
function SwipeCard({ a, onPass, onMatch }) {
  return (
    <div className="rk-swipe-wrap">
      <div className="rk-swipe-card" style={{ background: a.bg }}>
        <div className="rk-swipe-overlay" />
        <div className="rk-swipe-top">
          <Badge kind="match">{a.match}% Match</Badge>
          <Badge kind="ai" icon={I.spark}>AI Score {a.aiScore}</Badge>
        </div>
        <div className="rk-swipe-bottom">
          <div className="rk-swipe-name">{a.name}</div>
          <div className="rk-swipe-meta">{a.sport} · {a.position} · {a.country}</div>
          <div className="rk-swipe-stats">{a.stats}</div>
          <div className="rk-swipe-tags">
            <Badge kind="dark">GPA {a.gpa}</Badge>
            <Badge kind="dark">{a.height}</Badge>
            <Badge kind="dark">Class of {a.year}</Badge>
          </div>
        </div>
        <button className="rk-iconbtn rk-swipe-info">{I.brain}</button>
      </div>
      <div className="rk-swipe-actions">
        <button className="rk-action rk-action-pass" onClick={onPass}>{I.x}</button>
        <button className="rk-action rk-action-info">{I.brain}</button>
        <button className="rk-action rk-action-match" onClick={onMatch}>{I.heartFill}</button>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, TopBar, StatTile, Badge, AthleteCard, DistRow, SwipeCard, I });
