import React from 'react';
import { CheckCircle, AlertTriangle, ArrowUpRight, Wrench, Sparkles } from 'lucide-react';

export default function StrengthsWeaknesses({ strengths, weaknesses }) {
  return (
    <div className="grid-2">
      {/* Strengths Card */}
      <div className="glass-card" style={{ padding: '2.25rem', borderLeft: '4px solid var(--brand-emerald)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Key Strengths & Viral Catalysts</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Factors driving above-average algorithm promotion</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {strengths.length > 0 ? (
            strengths.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#10b981' }}>
                    {item.title}
                  </span>
                  <span className="badge badge-mega" style={{ fontSize: '0.7rem' }}>
                    {item.impact}
                  </span>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              No critical advantages detected yet. Implement the recommended fixes below to build momentum.
            </p>
          )}
        </div>
      </div>

      {/* Weaknesses / Red Flags Card */}
      <div className="glass-card" style={{ padding: '2.25rem', borderLeft: '4px solid var(--brand-amber)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Critical Red Flags & Drop-Off Risks</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Friction points likely to throttle distribution</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {weaknesses.length > 0 ? (
            weaknesses.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(245, 158, 11, 0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#fbbf24' }}>
                    {item.title}
                  </span>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  {item.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem', color: 'var(--brand-primary)', fontWeight: '600' }}>
                  <Wrench size={13} />
                  <span>Fix: {item.fix}</span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-emerald)', padding: '1rem' }}>
              <Sparkles size={18} />
              <span>Clean scan! No critical friction points or red flags detected.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
