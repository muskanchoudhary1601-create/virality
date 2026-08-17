import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Eye, Heart, Share2, Sparkles, TrendingUp } from 'lucide-react';

export default function ScoreOverviewCard({ analysis }) {
  const {
    overallScore,
    performanceTier,
    badgeClass,
    predictedViews,
    estimatedLikes,
    estimatedShares,
    viralProbability,
    metadata
  } = analysis;

  const [animatedScore, setAnimatedScore] = useState(0);

  // Radius and circumference for circular progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Determine stroke color based on score
  let strokeGradient = 'url(#scoreGradientViral)';
  if (overallScore < 50) strokeGradient = 'url(#scoreGradientFlop)';
  else if (overallScore < 75) strokeGradient = 'url(#scoreGradientSolid)';

  useEffect(() => {
    // Count-up animation
    let current = 0;
    const step = Math.ceil(overallScore / 30) || 1;
    const interval = setInterval(() => {
      current += step;
      if (current >= overallScore) {
        setAnimatedScore(overallScore);
        clearInterval(interval);
        // Fire confetti for great scores!
        if (overallScore >= 85) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        }
      } else {
        setAnimatedScore(current);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [overallScore]);

  return (
    <div className="glass-card score-hero-card">
      {/* Left: Animated Radial Gauge */}
      <div className="score-dial-wrapper">
        <svg className="score-dial-svg" viewBox="0 0 160 160">
          <defs>
            <linearGradient id="scoreGradientViral" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="scoreGradientSolid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="scoreGradientFlop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <circle
            className="score-dial-bg"
            cx="80"
            cy="80"
            r={radius}
          />
          <circle
            className="score-dial-fill"
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeGradient}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        <div className="score-dial-center">
          <div className="score-number">{animatedScore}</div>
          <div className="score-label">Virality Index</div>
        </div>
      </div>

      {/* Right: Performance Tier & Projections */}
      <div className="score-info-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className={`badge ${badgeClass}`} style={{ fontSize: '0.85rem', padding: '0.35rem 0.85rem' }}>
            <Sparkles size={14} />
            {performanceTier}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Target: <strong>{metadata.platform.toUpperCase()}</strong> ({metadata.niche})
          </span>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-highlight)' }}>
          {!analysis.hasInput
            ? 'Enter Video Details to Begin Analysis'
            : overallScore >= 85
            ? 'High Probability of Algorithmic Breakthrough'
            : overallScore >= 65
            ? 'Strong Organic Engagement Potential'
            : 'Optimization Recommended Before Publishing'}
        </h2>

        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          {!analysis.hasInput
            ? 'Type or paste your video title, opening hook, script, or pick a preset above to calculate real-time algorithmic predictions.'
            : overallScore >= 85
            ? 'Hook retention and curiosity gap exceed the 90th percentile for this niche. Strong shareability indicators detected.'
            : overallScore >= 65
            ? 'Solid foundation. Applying the suggested AI hook revisions and midpoint B-roll pacing can boost reach by up to 2.4x.'
            : 'High drop-off risk detected in the first 3 seconds. See the AI Hook Doctor below for instant fixes.'}
        </p>

        {/* Projected Stats Grid */}
        <div className="score-meta-stats">
          <div className="stat-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Eye size={15} color="var(--brand-cyan)" />
              <span className="stat-title">Projected Views</span>
            </div>
            <span className="stat-value gradient-emerald">{predictedViews}</span>
          </div>

          <div className="stat-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Heart size={15} color="var(--brand-pink)" />
              <span className="stat-title">Est. Likes</span>
            </div>
            <span className="stat-value">{estimatedLikes}</span>
          </div>

          <div className="stat-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Share2 size={15} color="var(--brand-primary)" />
              <span className="stat-title">Est. Shares</span>
            </div>
            <span className="stat-value">{estimatedShares}</span>
          </div>

          <div className="stat-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <TrendingUp size={15} color="var(--brand-amber)" />
              <span className="stat-title">Viral Probability</span>
            </div>
            <span className="stat-value" style={{ color: overallScore >= 75 ? 'var(--brand-emerald)' : 'var(--brand-amber)' }}>
              {viralProbability}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
