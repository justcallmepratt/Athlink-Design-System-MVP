/* Athlete app — mobile UI kit components */
const Ai = {
  ico: ({ d, size = 22, sw = 2, fill = 'none', extra }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {typeof d === 'string' ? <path d={d} /> : d}
      {extra}
    </svg>
  ),
};
const ai = {
  home: <Ai.ico d="M3 12l9-9 9 9M5 10v10h14V10" />,
  video: <Ai.ico d={<><rect x="3" y="6" width="14" height="12" rx="2" /><path d="M17 10l4-2v8l-4-2z" /></>} />,
  brain: <Ai.ico d="M9 18V5L21 3v13" extra={<><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>} />,
  msg: <Ai.ico d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />,
  user: <Ai.ico d={<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>} />,
  bell: <Ai.ico d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" size={20} />,
  play: <Ai.ico d="M8 5v14l11-7z" fill="currentColor" extra={null} />,
  spark: <Ai.ico d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" size={14} />,
  check: <Ai.ico d="M5 12l4 4 10-10" sw={2.5} size={14} />,
  upload: <Ai.ico d="M12 3v12M7 8l5-5 5 5M3 17v4h18v-4" />,
  edit: <Ai.ico d="M3 21v-4l13-13 4 4-13 13zM14 6l4 4" size={16} />,
  flag: <Ai.ico d="M4 21V4l8 3 8-3v11l-8 3-8-3v6" size={14} />,
};

function Phone({ children, header }) {
  return (
    <div className="ak-phone">
      <div className="ak-status">
        <span>9:41</span>
        <span style={{display:'flex',gap:6,alignItems:'center'}}>
          <span style={{display:'inline-block',width:18,height:10,border:'1.5px solid currentColor',borderRadius:2,position:'relative'}}>
            <span style={{position:'absolute',inset:1.5,background:'currentColor',width:'70%',borderRadius:1}} />
          </span>
        </span>
      </div>
      {header}
      <div className="ak-content">{children}</div>
      <BottomNav />
    </div>
  );
}

function Header({ title, gradient }) {
  return (
    <div className={`ak-header ${gradient ? 'ak-header-grad' : ''}`}>
      <h1>{title}</h1>
      <button className="ak-iconbtn">{ai.bell}</button>
    </div>
  );
}

function BottomNav() {
  const [tab, setTab] = React.useState('home');
  const items = [
    { id: 'home', label: 'Home', icon: ai.home },
    { id: 'videos', label: 'Videos', icon: ai.video },
    { id: 'ai', label: 'AI Report', icon: ai.brain },
    { id: 'msg', label: 'Messages', icon: ai.msg },
    { id: 'me', label: 'Profile', icon: ai.user },
  ];
  return (
    <div className="ak-bottom">
      {items.map(i => (
        <button key={i.id} className="ak-tab" data-active={tab === i.id} onClick={() => setTab(i.id)}>
          <span>{i.icon}</span>
          <span className="ak-tab-label">{i.label}</span>
        </button>
      ))}
    </div>
  );
}

function ProfileHero({ a }) {
  return (
    <div className="ak-hero">
      <div className="ak-hero-bg" style={{ background: a.bg }} />
      <div className="ak-hero-grad" />
      <div className="ak-hero-content">
        <div className="ak-avatar-lg">{a.initials}</div>
        <div className="ak-hero-name">{a.name} <span style={{color:'#fff',display:'inline-flex',marginLeft:4}}>{ai.check}</span></div>
        <div className="ak-hero-meta">{a.position} · {a.school}</div>
        <div className="ak-hero-tags">
          <span className="ak-chip">{ai.flag}{a.country}</span>
          <span className="ak-chip">GPA {a.gpa}</span>
          <span className="ak-chip">Class of {a.year}</span>
        </div>
      </div>
    </div>
  );
}

function StatRow({ stats }) {
  return (
    <div className="ak-stat-row">
      {stats.map((s, i) => (
        <div key={i} className="ak-stat-mini">
          <div className="ak-stat-num">{s.value}</div>
          <div className="ak-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function VideoTile({ title, dur, bg }) {
  return (
    <div className="ak-video">
      <div className="ak-video-thumb" style={{ background: bg }}>
        <span className="ak-video-play">{ai.play}</span>
        <span className="ak-video-dur">{dur}</span>
      </div>
      <div className="ak-video-title">{title}</div>
    </div>
  );
}

function AIScoreCard({ score }) {
  return (
    <div className="ak-card ak-ai-card">
      <div className="ak-ai-ring" style={{ background: `conic-gradient(#2196F3 0% ${score}%, #00BCD4 ${score}% ${Math.min(score+5,100)}%, #4CAF50 ${Math.min(score+5,100)}% ${score+1}%, #F3F4F6 ${score+1}% 100%)` }}>
        <div className="ak-ai-num">{score}</div>
      </div>
      <div className="ak-ai-info">
        <div className="ak-ai-title">AI Score</div>
        <div className="ak-ai-sub">Top 5% of 2025 prospects</div>
        <div className="ak-ai-pill"><span style={{display:'inline-flex'}}>{ai.spark}</span>AI Verified · AR Verified · NCAA Cleared</div>
      </div>
    </div>
  );
}

Object.assign(window, { Phone, Header, ProfileHero, StatRow, VideoTile, AIScoreCard, ai });
