/* Recruiter kit — view modules */
const { useState: rState } = React;

function DashboardView({ athletes, onOpen, saved, toggleSave }) {
  return (
    <div className="rk-page">
      <h1 className="rk-page-title">Dashboard</h1>
      <div className="rk-grid-4">
        <StatTile label="Athletes Viewed" value="234" delta="+12% from last month" />
        <StatTile label="Matched"          value="67"  delta="+23% from last month" />
        <StatTile label="Messages Sent"    value="156" delta="+8% from last month" />
        <StatTile label="Response Rate"    value="78%" delta="+5% from last month" />
      </div>

      <div className="rk-grid-2">
        <div className="rk-card rk-section">
          <h3>Top Countries</h3>
          <DistRow label="Brazil" pct={45} />
          <DistRow label="Japan"  pct={30} />
          <DistRow label="Mexico" pct={15} />
          <DistRow label="Canada" pct={10} />
        </div>
        <div className="rk-card rk-section">
          <h3>Sport Distribution</h3>
          <DistRow label="Soccer"     pct={35} />
          <DistRow label="Basketball" pct={25} />
          <DistRow label="Volleyball" pct={20} />
          <DistRow label="Other"      pct={20} />
        </div>
      </div>

      <div className="rk-section-head">
        <h3>Recent Athletes</h3>
        <div className="rk-tag-row">
          <Badge kind="outline">All Sports</Badge>
          <Badge kind="outline">High Match Rate</Badge>
        </div>
      </div>
      <div className="rk-grid-3">
        {athletes.slice(0, 6).map(a => (
          <AthleteCard key={a.id} a={a} onOpen={() => onOpen(a)}
            saved={saved.includes(a.id)} onSave={() => toggleSave(a.id)} />
        ))}
      </div>
    </div>
  );
}

function DiscoverView({ athletes, idx, setIdx }) {
  const a = athletes[idx % athletes.length];
  return (
    <div className="rk-page rk-page-center">
      <h1 className="rk-page-title">Discover</h1>
      <div className="rk-discover-sub">Swipe through athletes that match your program</div>
      <SwipeCard a={a}
        onPass={() => setIdx(i => i + 1)}
        onMatch={() => setIdx(i => i + 1)} />
      <div className="rk-discover-progress">
        Athlete {idx + 1} of {athletes.length}
      </div>
    </div>
  );
}

function SavedView({ athletes, saved, onOpen, toggleSave }) {
  const list = athletes.filter(a => saved.includes(a.id));
  return (
    <div className="rk-page">
      <h1 className="rk-page-title">Saved Athletes</h1>
      <div className="rk-page-sub">{list.length} athletes you're tracking</div>
      <div className="rk-grid-3">
        {list.map(a => (
          <AthleteCard key={a.id} a={a} onOpen={() => onOpen(a)}
            saved onSave={() => toggleSave(a.id)} />
        ))}
        {list.length === 0 && <div className="rk-empty">You haven't saved any athletes yet. Start swiping in Discover.</div>}
      </div>
    </div>
  );
}

function MessagesView() {
  const threads = [
    { name: 'Lucas Senna', initials: 'LS', av: '#10B981', last: 'Obrigado! Looking forward to discussing opportunities…', time: '10m ago', unread: true },
    { name: 'Yuki Tanaka', initials: 'YT', av: '#F97316', last: 'ありがとう Thank you for your interest in my profile!', time: '2h ago' },
    { name: 'Ana Senna',   initials: 'AS', av: '#EC4899', last: 'I would love to schedule a Zoom call this week.', time: 'Yesterday' },
  ];
  return (
    <div className="rk-page">
      <h1 className="rk-page-title">Messages</h1>
      <div className="rk-card" style={{ padding: 0 }}>
        {threads.map((t, i) => (
          <div key={i} className="rk-thread" data-unread={!!t.unread}>
            <div className="rk-avatar" style={{ background: t.av }}>{t.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="rk-thread-row1">
                <span className="rk-thread-name">{t.name}</span>
                <span className="rk-thread-time">{t.time}</span>
              </div>
              <div className="rk-thread-last">{t.last}</div>
            </div>
            {t.unread && <span className="rk-unread-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileSheet({ a, onClose, onSave, saved }) {
  if (!a) return null;
  return (
    <div className="rk-sheet-backdrop" onClick={onClose}>
      <div className="rk-sheet" onClick={e => e.stopPropagation()}>
        <div className="rk-sheet-photo" style={{ background: a.bg }}>
          <button className="rk-iconbtn rk-sheet-close" onClick={onClose}>{I.x}</button>
          <Badge kind="match">{a.match}% Match</Badge>
          <Badge kind="ai" icon={I.spark}>AI Score {a.aiScore}</Badge>
        </div>
        <div className="rk-sheet-body">
          <div className="rk-sheet-head">
            <div>
              <div className="rk-sheet-name">{a.name}<span className="rk-verify-ico" style={{display:'inline-flex',marginLeft:6}}>{I.check}</span></div>
              <div className="rk-athlete-meta">{a.sport} · {a.position} · {a.country}</div>
            </div>
            <button className="rk-btn rk-btn-secondary" onClick={onSave}>
              {saved ? I.heartFill : I.heart}{saved ? 'Saved' : 'Save'}
            </button>
          </div>
          <div className="rk-grid-3" style={{ marginTop: 16 }}>
            <StatTile label="Height" value={a.height} />
            <StatTile label="Weight" value={a.weight} />
            <StatTile label="GPA"    value={a.gpa} />
          </div>
          <div className="rk-card rk-section" style={{ marginTop: 16 }}>
            <h3>Season stats</h3>
            <div className="rk-mono-list">{a.stats}</div>
          </div>
          <div className="rk-card rk-section" style={{ marginTop: 16 }}>
            <h3>AI insight</h3>
            <p>{a.insight}</p>
          </div>
          <div className="rk-cta-row">
            <button className="rk-btn rk-btn-primary">Schedule Zoom</button>
            <button className="rk-btn rk-btn-secondary">Send message</button>
            <button className="rk-btn rk-btn-gradient">View AI report</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardView, DiscoverView, SavedView, MessagesView, ProfileSheet });
