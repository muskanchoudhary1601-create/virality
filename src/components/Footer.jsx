import React from 'react';
import { Zap, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="max-width-container footer-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
            <Zap size={18} fill="currentColor" />
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-highlight)' }}>
              Viral<span className="gradient-text">Pulse</span> AI
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Predictive Algorithmic Intelligence for Creators & Brands
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
          <span>YouTube Shorts Engine</span>
          <span>•</span>
          <span>TikTok Algorithm Lab</span>
          <span>•</span>
          <span>Instagram Reels Insights</span>
          <span>•</span>
          <span style={{ color: 'var(--brand-emerald)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> 2026 Model Updated
          </span>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © 2026 ViralPulse AI Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
