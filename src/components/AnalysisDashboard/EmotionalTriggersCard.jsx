import React from 'react';
import { HeartHandshake, Eye, Smile, AlertCircle, Bookmark, Compass } from 'lucide-react';

export default function EmotionalTriggersCard({ emotionalMatrix }) {
  return (
    <div className="glass-card" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HeartHandshake size={18} color="var(--brand-pink)" />
            <span>Audience Appeal & Psychological Triggers</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Emotions that dictate whether a viewer comments, shares to friends, or saves
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {emotionalMatrix.map((item, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                {item.name}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: item.color }}>
                {item.score}%
              </span>
            </div>

            <div className="factor-track">
              <div
                className="factor-fill"
                style={{
                  width: `${item.score}%`,
                  backgroundColor: item.color,
                  boxShadow: `0 0 10px ${item.color}66`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '1.25rem',
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-elevated)',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)'
      }}>
        💡 <strong>Psychology Insight:</strong> High <em>Curiosity</em> drives initial watch-time, while <em>Relatability + Utility</em> drives 80% of comments and direct message forwards.
      </div>
    </div>
  );
}
