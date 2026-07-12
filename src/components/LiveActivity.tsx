import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, Trophy, Award, BookOpen, Star, GitFork, ExternalLink, GitCommit, Clock, AlertCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useMode } from '../contexts/ModeContext';

const GH_USER = 'PranavShende';

// Language → colour mapping
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5',
  Java: '#b07219', 'C++': '#f34b7d', C: '#555555', HTML: '#e34c26',
  CSS: '#563d7c', Shell: '#89e051', Go: '#00ADD8', Rust: '#dea584',
  Kotlin: '#A97BFF', Swift: '#F05138', Dart: '#00B4AB', default: '#8b949e',
};

interface Repo { name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; forks_count: number; pushed_at: string; topics: string[]; }
interface Profile { public_repos: number; followers: number; following: number; public_gists: number; }
interface GHEvent { id: string; type: string; repo: { name: string }; payload: { commits?: { message: string }[]; ref?: string; action?: string }; created_at: string; }

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function eventLabel(ev: GHEvent): { icon: React.ReactNode; label: string } {
  const repo = ev.repo.name.split('/')[1];
  switch (ev.type) {
    case 'PushEvent': {
      const msgs = ev.payload.commits ?? [];
      const msg = msgs[0]?.message?.split('\n')[0] ?? 'pushed commits';
      return { icon: <GitCommit className="w-3.5 h-3.5 text-emerald-400" />, label: `${repo}: ${msg}` };
    }
    case 'CreateEvent':
      return { icon: <Github className="w-3.5 h-3.5 text-blue-400" />, label: `Created ${ev.payload.ref ?? 'branch'} in ${repo}` };
    case 'WatchEvent':
      return { icon: <Star className="w-3.5 h-3.5 text-yellow-400" />, label: `Starred ${repo}` };
    case 'ForkEvent':
      return { icon: <GitFork className="w-3.5 h-3.5 text-purple-400" />, label: `Forked ${repo}` };
    case 'IssuesEvent':
      return { icon: <AlertCircle className="w-3.5 h-3.5 text-orange-400" />, label: `${ev.payload.action} issue in ${repo}` };
    default:
      return { icon: <Github className="w-3.5 h-3.5 text-zinc-400" />, label: `Activity in ${repo}` };
  }
}

// GitHub-official dark theme (matches github.com dark)
const darkTheme  = { light: ['#161b22','#0e4429','#006d32','#26a641','#39d353'], dark: ['#161b22','#0e4429','#006d32','#26a641','#39d353'] };
// GitHub-official light theme (matches github.com light) — high contrast
const lightTheme = { light: ['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39'], dark: ['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39'] };

const PINNED_REPOS = [
  {
    name: 'DSAQUESTIONS',
    description: 'Curated collection of Data Structures and Algorithms problems with solutions in multiple languages.',
    html_url: 'https://github.com/PranavShende/DSAQUESTIONS',
    language: 'C++',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['DSA', 'C++'],
  },
  {
    name: 'Topic_Wise_Java',
    description: 'Topic-wise Java programming questions and solutions organized by concept for structured learning.',
    html_url: 'https://github.com/PranavShende/Topic_Wise_Java',
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['Java', 'DSA'],
  },
  {
    name: 'Topic_Wise_Python',
    description: 'Topic-wise Python programming questions and solutions organized by concept for structured learning.',
    html_url: 'https://github.com/PranavShende/Topic_Wise_Python',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['Python', 'DSA'],
  },
];

export const LiveActivity = () => {
  const [repos, setRepos]       = useState<Repo[]>([]);
  const [profile, setProfile]   = useState<Profile | null>(null);
  const [events, setEvents]     = useState<GHEvent[]>([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setTab]     = useState<'calendar' | 'pinned' | 'repos' | 'events'>('calendar');
  const { mode } = useMode();
  const isLight = mode === 'recruiter';

  useEffect(() => {
    const headers = { Accept: 'application/vnd.github+json' };
    Promise.all([
      fetch(`https://api.github.com/users/${GH_USER}`, { headers }).then(r => r.json()),
      fetch(`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=6&type=owner`, { headers }).then(r => r.json()),
      fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=15`, { headers }).then(r => r.json()),
    ]).then(([prof, rps, evs]) => {
      setProfile(prof);
      setRepos(Array.isArray(rps) ? rps : []);
      setEvents(Array.isArray(evs) ? evs.filter((e: GHEvent) => ['PushEvent','CreateEvent','WatchEvent','ForkEvent'].includes(e.type)) : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 mb-24">
      <div className="rounded-2xl bg-zinc-950 border border-white/[0.06] px-5 py-6 sm:px-7 sm:py-7">

        {/* ── Achievements ── */}
        <SectionHeader title="Achievements" />
        <div className="space-y-3 mb-16">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Best Research Paper Award</p>
              <p className="text-xs text-zinc-400 mt-0.5">International Conference on Tech &amp; Trends, Suryodaya College</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Technex 2025 — National Hackathon 3rd Prize</p>
              <p className="text-xs text-zinc-400 mt-0.5">Inter-college national-level hackathon</p>
            </div>
          </div>
        </div>

        {/* ── Certifications ── */}
        <SectionHeader title="Certifications" />
        <div className="space-y-3 mb-16">
          {[
            { color: 'blue', label: 'Data Structures and Algorithms (DSA) in C++', sub: 'Codetantra — With Lab Practicals' },
            { color: 'orange', label: 'Java Programming', sub: 'Codetantra — With Lab Practicals' },
          ].map((c, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
              <div className={`w-10 h-10 rounded-lg bg-${c.color}-500/10 border border-${c.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                <BookOpen className={`w-5 h-5 text-${c.color}-400`} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{c.label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Education ── */}
        <SectionHeader title="Education" />
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors mb-16">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-white">St. Vincent Pallotti College of Engineering &amp; Technology</p>
              <p className="text-xs text-zinc-400 mt-1">B.Tech in Information Technology · CGPA: <span className="text-emerald-400 font-medium">8.3/10</span></p>
              <p className="text-xs text-zinc-500 mt-0.5">Nagpur, India</p>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono tracking-wider flex-shrink-0">2023 – 2027</span>
          </div>
        </div>

        {/* ── GitHub Live Dashboard ── */}
        <SectionHeader title="Live GitHub Activity" />

        {/* Profile stats row */}
        {profile && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Repos', value: profile.public_repos },
              { label: 'Followers', value: profile.followers },
              { label: 'Following', value: profile.following },
              { label: 'Gists', value: profile.public_gists },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center py-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-lg font-bold text-white">{s.value}</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800 mb-5 flex-wrap">
          {(['calendar','repos','events'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                activeTab === tab
                  ? isLight ? 'bg-zinc-200 text-zinc-900 shadow-sm' : 'bg-zinc-700 text-white shadow-sm'
                  : isLight ? 'text-zinc-500 hover:text-zinc-800' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab === 'calendar' ? '📅 Calendar' : tab === 'repos' ? '📦 Repos' : '⚡ Events'}
            </button>
          ))}
        </div>

        {/* ── Calendar tab ── */}
        {activeTab === 'calendar' && (
          <div className="space-y-4">
            {/* Contribution Calendar */}
            <div className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-medium text-white">Contribution Calendar</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Last 12 months — live from GitHub</p>
                </div>
                <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">{GH_USER}</span>
                </a>
              </div>
              <div
                className="w-full overflow-x-auto pb-1 rounded-lg p-3"
                style={{
                  background: isLight ? '#ffffff' : '#0d1117',
                  border: `1px solid ${isLight ? '#d0d7de' : '#30363d'}`,
                }}
              >
                <GitHubCalendar
                  username={GH_USER}
                  theme={isLight ? lightTheme : darkTheme}
                  colorScheme={isLight ? 'light' : 'dark'}
                  fontSize={11}
                  blockSize={11}
                  blockMargin={3}
                  style={{ color: isLight ? '#24292f' : '#c9d1d9' }}
                  labels={{ totalCount: '{{count}} contributions in the last year' }}
                />
              </div>
            </div>

            {/* Pinned Repos — displayed below calendar side by side */}
            <div>
              <p className="text-xs text-zinc-500 mb-3 flex items-center gap-1.5"><span>📌</span> Pinned repositories</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PINNED_REPOS.map(repo => (
                  <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer"
                    className="group flex flex-col p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors truncate pr-2">{repo.name}</span>
                      <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
                    </div>
                    {repo.description && (
                      <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 mb-3">{repo.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-auto">
                      {repo.language && (
                        <span className="flex items-center gap-1 text-[10px] text-zinc-400">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: LANG_COLORS[repo.language] ?? LANG_COLORS.default }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                        <Star className="w-2.5 h-2.5" />{repo.stargazers_count}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Repos tab ── */}
        {activeTab === 'repos' && (
          <div className="space-y-3">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse" />
              ))
            ) : repos.length === 0 ? (
              <p className="text-sm text-zinc-500">No public repos found.</p>
            ) : repos.map(repo => (
              <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer"
                className="group flex flex-col p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">{repo.name}</span>
                      {repo.topics?.slice(0, 2).map(t => (
                        <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-400">{t}</span>
                      ))}
                    </div>
                    {repo.description && (
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">{repo.description}</p>
                    )}
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <div className="flex items-center gap-4 mt-3">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: LANG_COLORS[repo.language] ?? LANG_COLORS.default }} />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <Star className="w-3 h-3" />{repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <GitFork className="w-3 h-3" />{repo.forks_count}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-zinc-500 ml-auto">
                    <Clock className="w-3 h-3" />{timeAgo(repo.pushed_at)}
                  </span>
                </div>
              </a>
            ))}
            <a href={`https://github.com/${GH_USER}?tab=repositories`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-zinc-800 text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-all">
              View all repositories <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* ── Events tab ── */}
        {activeTab === 'events' && (
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 divide-y divide-zinc-800/70">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="h-12 px-4 flex items-center">
                  <div className="h-3 bg-zinc-800 rounded animate-pulse w-3/4" />
                </div>
              ))
            ) : events.length === 0 ? (
              <p className="text-sm text-zinc-500 p-4">No recent public events found.</p>
            ) : events.slice(0, 10).map(ev => {
              const { icon, label } = eventLabel(ev);
              return (
                <div key={ev.id} className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-800/50 transition-colors">
                  <div className="mt-0.5 flex-shrink-0">{icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-300 truncate">{label}</p>
                    <p className="text-[10px] text-zinc-600 mt-0.5">{timeAgo(ev.created_at)}</p>
                  </div>
                </div>
              );
            })}
            <div className="px-4 py-3">
              <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                <Github className="w-3.5 h-3.5" /> View full activity on GitHub
              </a>
            </div>
          </div>
        )}

        <p className="mt-8 text-sm text-zinc-500 italic">I code daily, share openly, and ship relentlessly — turning ideas into reality.</p>
      </div>
    </div>
  );
};

export default LiveActivity;
