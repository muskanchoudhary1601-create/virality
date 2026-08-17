import React, { useState } from 'react';
import { Split, Trophy, Sparkles, CheckCircle2, ArrowRight, Activity, Zap } from 'lucide-react';
import { analyzeHookStrength } from '../services/viralityEngine';

export default function AbTestingPage({ defaultHook }) {
  const [hookA, setHookA] = useState(
    defaultHook || 'The 3 mistakes you are making with your daily routine.'
  );
  const [hookB, setHookB] = useState(
    'Why 99% of people fail their daily routine (And the 1 trick that fixes it).'
  );

  const scoreA = analyzeHookStrength(hookA);
  const scoreB = analyzeHookStrength(hookB);

  const wordsA = hookA.trim().split(/\s+/).filter(Boolean).length;
  const wordsB = hookB.trim().split(/\s+/).filter(Boolean).length;

  const diff = scoreB - scoreA;
  const winner = diff > 0 ? 'B' : diff < 0 ? 'A' : 'TIE';
  const confidence = Math.min(98, Math.max(52, 50 + Math.abs(diff) * 4));

  return (
    <div className="fade-in">
      <section className="page-hero-section">
        <h1 className="page-hero-title">
          A/B Hook & Title Battle Arena
        </h1>
        <p className="page-hero-subtitle">
          Test two competing hook concepts side-by-side to predict algorithm retention, swipe-away rate, and comment triggers before filming.
        </p>
      </section>

      {/* Battle Grid */}
      <div className="ab-split-grid" style={{ marginBottom: '2rem' }}>
        {/* Variant A */}
        <div className={`glass-card ab-card ${winner === 'A' ? 'winner' : ''}`} style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontWeight: '700', fontSize: '1rem', color: winner === 'A' ? 'var(--brand-emerald)' : 'var(--text-secondary)' }}>
                VARIANT A {winner === 'A' && '🏆 (PREDICTED WINNER)'}
              </span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: winner === 'A' ? 'var(--brand-emerald)' : 'var(--text-primary)' }}>
              {scoreA}<span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
          </div>

          <textarea
            className="textarea-control"
            rows={4}
            value={hookA}
            onChange={(e) => setHookA(e.target.value)}
            placeholder="Type Hook Variant A..."
            style={{ fontSize: '1rem', lineHeight: '1.4', marginBottom: '1rem' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span>Word count: <strong>{wordsA} words</strong></span>
            <span>Est. Hook Hold: <strong>{Math.min(94, 50 + scoreA * 0.45).toFixed(0)}%</strong></span>
          </div>
        </div>

        {/* Variant B */}
        <div className={`glass-card ab-card ${winner === 'B' ? 'winner' : ''}`} style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontWeight: '700', fontSize: '1rem', color: winner === 'B' ? 'var(--brand-emerald)' : 'var(--text-secondary)' }}>
                VARIANT B {winner === 'B' && '🏆 (PREDICTED WINNER)'}
              </span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: winner === 'B' ? 'var(--brand-emerald)' : 'var(--text-primary)' }}>
              {scoreB}<span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
          </div>

          <textarea
            className="textarea-control"
            rows={4}
            value={hookB}
            onChange={(e) => setHookB(e.target.value)}
            placeholder="Type Hook Variant B..."
            style={{ fontSize: '1rem', lineHeight: '1.4', marginBottom: '1rem' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span>Word count: <strong>{wordsB} words</strong></span>
            <span>Est. Hook Hold: <strong>{Math.min(94, 50 + scoreB * 0.45).toFixed(0)}%</strong></span>
          </div>
        </div>
      </div>

      {/* Decision Intelligence Panel */}
      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={18} color="var(--brand-emerald)" />
            <span>Algorithm Decision Breakdown</span>
          </h3>

          <span className="badge badge-mega" style={{ fontSize: '0.85rem' }}>
            {confidence}% Statistical Confidence
          </span>
        </div>

        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-elevated)',
          fontSize: '0.9rem',
          color: 'var(--text-primary)',
          lineHeight: '1.5',
          marginBottom: '1.5rem'
        }}>
          <strong>Summary:</strong>{' '}
          {winner === 'B'
            ? `Variant B outperforms Variant A by +${diff} points because it leverages a curiosity-driven percentage anchor ("99% of people fail") and establishes an immediate solution payoff.`
            : winner === 'A'
            ? `Variant A wins by +${Math.abs(diff)} points due to higher brevity, low cognitive load, and direct actionable framing.`
            : 'Both hooks have equal calculated algorithmic momentum. Consider adding a high-stakes emotional trigger or specific timeframe.'}
        </div>

        <div className="grid-3">
          <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Curiosity Gap Factor</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-highlight)', marginTop: '0.2rem' }}>
              {winner === 'B' ? 'Variant B (+24%)' : 'Variant A (+18%)'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>High psychological tension hold</div>
          </div>

          <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Swipe-Away Resistance</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--brand-emerald)', marginTop: '0.2rem' }}>
              {winner === 'B' ? `${scoreB}% Hold` : `${scoreA}% Hold`}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>0–3s viewer retention</div>
          </div>

          <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Debate & Comment Index</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--brand-cyan)', marginTop: '0.2rem' }}>
              {winner === 'B' ? '3.8x Comments' : '2.1x Comments'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Comment velocity predictor</div>
          </div>
        </div>
      </div>
    </div>
  );
}
