import React from 'react';
import { Flame, Clock, MessageSquare, Music, Search, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

export default function RadarMetricsCard({ metrics }) {
  const factors = [
    {
      id: 'hook',
      name: 'Hook Power (0-3s Impact)',
      score: metrics.hookStrength,
      icon: Flame,
      color: '#f43f5e',
      weight: '25% weight',
      desc: 'Curiosity gap, emotional stakes, and pattern interrupt in first 3 seconds.'
    },
    {
      id: 'retention',
      name: 'Retention & Pacing Model',
      score: metrics.pacingRetention,
      icon: Clock,
      color: '#8b5cf6',
      weight: '20% weight',
      desc: 'Predicted completion rate and re-hook density across duration.'
    },
    {
      id: 'engagement',
      name: 'Engagement Velocity & Shares',
      score: metrics.engagementVelocity,
      icon: MessageSquare,
      color: '#06b6d4',
      weight: '20% weight',
      desc: 'Comment debate temptation, save rate, and status DM share triggers.'
    },
    {
      id: 'trend',
      name: 'Trend Relevance & Audio Synergy',
      score: metrics.trendAudio,
      icon: Music,
      color: '#10b981',
      weight: '15% weight',
      desc: 'Trending sound velocity, meme structure, and format alignment.'
    },
    {
      id: 'seo',
      name: 'SEO & Hashtag Optimization',
      score: metrics.seoOptimization,
      icon: Search,
      color: '#ec4899',
      weight: '10% weight',
      desc: 'Search query volume, tag hierarchy, and keyword discoverability.'
    },
    {
      id: 'timing',
      name: 'Platform Timing & Algorithm Fit',
      score: metrics.optimalTiming,
      icon: Calendar,
      color: '#f59e0b',
      weight: '10% weight',
      desc: 'Active user heatmap for the chosen platform and target demographic.'
    }
  ];

  return (
    <div className="glass-card factor-bar-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Algorithmic Factor Breakdown</span>
        </h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Weighted 6-Factor Model</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
        {factors.map((factor) => {
          const Icon = factor.icon;
          return (
            <div key={factor.id} className="factor-item">
              <div className="factor-header">
                <span className="factor-name">
                  <Icon size={16} color={factor.color} />
                  <span>{factor.name}</span>
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{factor.weight}</span>
                  <span className="factor-score" style={{ color: factor.color }}>
                    {factor.score}/100
                  </span>
                </div>
              </div>

              <div className="factor-track">
                <div
                  className="factor-fill"
                  style={{
                    width: `${factor.score}%`,
                    backgroundColor: factor.color,
                    boxShadow: `0 0 10px ${factor.color}66`
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>{factor.desc}</span>
                <span>
                  {factor.score >= 80 ? (
                    <span style={{ color: 'var(--brand-emerald)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <CheckCircle size={11} /> Optimal
                    </span>
                  ) : factor.score >= 60 ? (
                    <span style={{ color: 'var(--brand-amber)' }}>Good</span>
                  ) : (
                    <span style={{ color: 'var(--brand-rose)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <AlertTriangle size={11} /> Needs Fix
                    </span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
