import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Activity, Code2, GitCommit } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

const GITHUB_USER = "pranavshende";

interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const radarData = [
  { skill: "Frontend", value: 85 },
  { skill: "Backend", value: 88 },
  { skill: "AI/ML", value: 75 },
  { skill: "DevOps", value: 60 },
  { skill: "Research", value: 80 },
  { skill: "DSA", value: 72 },
];

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  Dart: "#00B4AB",
  default: "#10b981",
};

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
};

const GitHubSection = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [latestRepo, setLatestRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`).then(r => r.json()),
    ])
      .then(([userData, repoData]) => {
        if (userData.login) setUser(userData);
        if (Array.isArray(repoData)) {
          const sorted = repoData.sort((a: Repo, b: Repo) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
          setRepos(sorted.slice(0, 6));
          setLatestRepo(sorted[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="github" className="section-padding relative bg-zinc-950/40">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Developer <span className="text-primary">Dashboard</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          {latestRepo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <GitCommit className="w-4 h-4" />
              Last pushed to <strong>{latestRepo.name}</strong> — {timeAgo(latestRepo.updated_at)}
            </motion.div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Skill Radar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-lg font-bold text-foreground mb-6 font-display flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Skill Proficiency Radar
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: "#a1a1aa", fontSize: 12 }}
                />
                <Radar
                  name="Pranav"
                  dataKey="value"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.25}
                  dot={{ fill: "#10b981", r: 4 }}
                />
                <Tooltip
                  contentStyle={{ background: "#09090b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                  formatter={(v: number) => [`${v}%`, "Proficiency"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Stats card */}
            {user && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold text-foreground mb-4 font-display flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" /> GitHub Profile
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Repos", value: user.public_repos },
                    { label: "Followers", value: user.followers },
                    { label: "Following", value: user.following },
                  ].map(s => (
                    <div key={s.label} className="text-center p-3 rounded-xl bg-black/30">
                      <div className="text-2xl font-bold text-foreground font-display">{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 animate-pulse">
                <div className="h-4 bg-white/10 rounded mb-3 w-1/2" />
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/10 rounded-xl" />)}
                </div>
              </div>
            )}

            {/* Top Repos */}
            <div className="space-y-3">
              {repos.slice(0, 3).map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {repo.name}
                      </span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      {repo.language && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: langColors[repo.language] ?? langColors.default }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">{timeAgo(repo.updated_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground ml-4 shrink-0">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{repo.forks_count}</span>
                  </div>
                </motion.a>
              ))}
              {loading && [1, 2, 3].map(i => (
                <div key={i} className="h-16 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
