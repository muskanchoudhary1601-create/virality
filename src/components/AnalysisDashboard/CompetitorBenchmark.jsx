import React from 'react';
import { Award, BarChart3, TrendingUp, Users, ShieldCheck } from 'lucide-react';

export default function CompetitorBenchmark({ benchmark }) {
  const { niche, avgNicheScore, topOnePercentScore, yourScore, percentile } = benchmark;

  return (
    <div className="glass-card" style={{ padding: '2.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} color="var(--brand-primary)" />
            <span>Niche Benchmark & Competitive Edge</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Calibrated against 250,000+ top-performing videos in {niche}
          </p>
        </div>

        <div className="badge badge-mega" style={{ fontSize: '0.85rem' }}>
          Top {100 - percentile}% Tier
        </div>
      </div>

      {/* 3 Benchmark Cards */}
      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Niche Average Creator</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            {avgNicheScore}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Baseline</div>
        </div>

        <div style={{
          background: 'rgba(99, 102, 241, 0.1)',
          border: '2px solid var(--brand-primary)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          textAlign: 'center',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: '700' }}>YOUR VIDEO SCORE</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-highlight)', marginTop: '0.15rem' }}>
            {yourScore}
          </div>
          <div style={{ fontSize: '0.75rem', color: yourScore >= avgNicheScore ? 'var(--brand-emerald)' : 'var(--brand-rose)', fontWeight: '600' }}>
            {yourScore >= avgNicheScore ? `+${yourScore - avgNicheScore} pts above average` : `${avgNicheScore - yourScore} pts below average`}
          </div>
        </div>

        <div style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: '600' }}>Top 1% Viral Creators</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--brand-emerald)', marginTop: '0.25rem' }}>
            {topOnePercentScore}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Elite Threshold</div>
        </div>
      </div>

      <div style={{
        padding: '0.85rem 1rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-elevated)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.825rem',
        color: 'var(--text-secondary)'
      }}>
        <ShieldCheck size={18} color="var(--brand-emerald)" style={{ flexShrink: 0 }} />
        <span>
          Videos scoring <strong>{yourScore >= 80 ? '80+' : 'above 80'}</strong> in {niche} receive an average of <strong>4.8x more impressions</strong> in the first 6 hours on social algorithms.
        </span>
      </div>
    </div>
  );
}
