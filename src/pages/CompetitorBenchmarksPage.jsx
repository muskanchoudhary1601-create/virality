import React, { useState } from 'react';
import { Award, BarChart3, TrendingUp, Users, Calendar, ShieldCheck, Zap } from 'lucide-react';
import BestPostingTimesCard from '../components/AnalysisDashboard/BestPostingTimesCard';

const NICHE_PROFILES = [
  {
    niche: 'Business & Tech',
    avgScore: 58,
    topScore: 92,
    avgRetention: '46%',
    topRetention: '76%',
    topFormat: '3-Step Problem Solving & Founder Stories',
    optimalLength: '35–55s',
    commentDriver: 'Actionable Tech Stack or Blueprint Request'
  },
  {
    niche: 'Skincare & Beauty',
    avgScore: 62,
    topScore: 94,
    avgRetention: '52%',
    topRetention: '82%',
    topFormat: 'Extreme Texture Macro Close-ups & Before/Afters',
    optimalLength: '20–30s',
    commentDriver: 'Product Shade / Price Inquiries'
  },
  {
    niche: 'Fitness & Health',
    avgScore: 55,
    topScore: 90,
    avgRetention: '44%',
    topRetention: '74%',
    topFormat: 'Form Correction & Heavy PR Transformation',
    optimalLength: '25–40s',
    commentDriver: 'Tagging Gym Partners / Form Debates'
  },
  {
    niche: 'Education & Finance',
    avgScore: 54,
    topScore: 89,
    avgRetention: '42%',
    topRetention: '72%',
    topFormat: 'Tax Loopholes & Side-Hustle Math Breakdowns',
    optimalLength: '45–60s',
    commentDriver: 'Saving for Later & Skepticism Debates'
  },
  {
    niche: 'Entertainment & Gaming',
    avgScore: 65,
    topScore: 96,
    avgRetention: '58%',
    topRetention: '88%',
    topFormat: 'High-Stakes Challenges & Unexpected Climax',
    optimalLength: '30–45s',
    commentDriver: 'Timestamp Reactions & Memes'
  }
];

export default function CompetitorBenchmarksPage({ currentNiche = 'Business & Tech', currentScore = 84 }) {
  const [selectedNiche, setSelectedNiche] = useState(currentNiche);

  const profile = NICHE_PROFILES.find(p => p.niche === selectedNiche) || NICHE_PROFILES[0];

  return (
    <div className="fade-in">
      <section className="page-hero-section">
        <h1 className="page-hero-title">
          Niche Intelligence & Competitor Benchmarks
        </h1>
        <p className="page-hero-subtitle">
          Calibrated data across 250,000+ top-performing vertical videos. See how your content compares against the top 1% creators in your specific category.
        </p>
      </section>

      {/* Niche Selector */}
      <div className="presets-container" style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginRight: '0.5rem' }}>
          Select Niche:
        </span>
        {NICHE_PROFILES.map((p) => (
          <button
            key={p.niche}
            className={`preset-chip ${selectedNiche === p.niche ? 'active' : ''}`}
            onClick={() => setSelectedNiche(p.niche)}
          >
            <span>{p.niche}</span>
          </button>
        ))}
      </div>

      {/* Benchmark Score Breakdown */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Niche Average Creator</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>
            {profile.avgScore}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Baseline Retention: {profile.avgRetention}</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderColor: 'var(--brand-primary)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: '700', textTransform: 'uppercase' }}>YOUR CURRENT VIDEO</div>
          <div style={{ fontSize: '2.75rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-highlight)', margin: '0.5rem 0' }}>
            {currentScore}
          </div>
          <span className="badge badge-mega" style={{ fontSize: '0.75rem' }}>
            +{currentScore - profile.avgScore} pts above average
          </span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: '700', textTransform: 'uppercase' }}>Top 1% Elite Viral Tier</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--brand-emerald)', margin: '0.5rem 0' }}>
            {profile.topScore}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--brand-emerald)' }}>Elite Retention: {profile.topRetention}</div>
        </div>
      </div>

      {/* Deep Niche Breakdown & Posting Times */}
      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Award size={18} color="var(--brand-primary)" />
            <span>Top 1% Viral Blueprint for {selectedNiche}</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-elevated)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dominant Viral Format</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-highlight)', marginTop: '0.2rem' }}>
                {profile.topFormat}
              </div>
            </div>

            <div style={{ background: 'var(--bg-elevated)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Optimal Algorithmic Length</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--brand-emerald)', marginTop: '0.2rem' }}>
                {profile.optimalLength} (Highest loop rate)
              </div>
            </div>

            <div style={{ background: 'var(--bg-elevated)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Primary Comment / Engagement Velocity Driver</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--brand-cyan)', marginTop: '0.2rem' }}>
                {profile.commentDriver}
              </div>
            </div>
          </div>
        </div>

        {/* Posting Heatmap */}
        <BestPostingTimesCard platform="shorts" plannedHour={18} />
      </div>
    </div>
  );
}
