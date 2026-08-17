import React, { useState } from 'react';
import { Split, Sparkles, Trophy, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { analyzeHookStrength } from '../../services/viralityEngine';

export default function AbTestingSimulator({ currentHook, title }) {
  const [variantA, setVariantA] = useState(
    currentHook || 'The 3 mistakes you are making with your daily routine.'
  );
  const [variantB, setVariantB] = useState(
    'Why 99% of people fail their daily routine (And the 1 trick that fixes it).'
  );

  const scoreA = analyzeHookStrength(variantA);
  const scoreB = analyzeHookStrength(variantB);

  const diff = scoreB - scoreA;
  const winner = diff > 0 ? 'B' : diff < 0 ? 'A' : 'TIE';
  const winConfidence = Math.min(96, Math.max(55, 50 + Math.abs(diff) * 3.5));

  return (
    <div className="glass-card" style={{ padding: '2.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Split size={20} color="var(--brand-primary)" />
            <span>A/B Hook & Title Head-to-Head Simulator</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Pit two competing hooks against each other to predict which will achieve higher retention and viral velocity.
          </p>
        </div>

        {winner !== 'TIE' && (
          <div className="badge badge-mega" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
            <Trophy size={14} />
            <span>Variant {winner} Wins ({winConfidence}% Confidence)</span>
          </div>
        )}
      </div>

      <div className="ab-split-grid">
        {/* Variant A */}
        <div className={`ab-card ${winner === 'A' ? 'winner' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: '700', fontSize: '0.9rem', color: winner === 'A' ? 'var(--brand-emerald)' : 'var(--text-secondary)' }}>
              VARIANT A {winner === 'A' && '🏆 (WINNER)'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', fontSize: '1.25rem', color: winner === 'A' ? 'var(--brand-emerald)' : 'var(--text-primary)' }}>
              {scoreA}/100
            </span>
          </div>

          <textarea
            className="textarea-control"
            rows={3}
            value={variantA}
            onChange={(e) => setVariantA(e.target.value)}
            placeholder="Enter Hook Option A..."
            style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}
          />

          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            Word count: <strong>{variantA.split(/\s+/).filter(Boolean).length} words</strong>
          </div>
        </div>

        {/* Variant B */}
        <div className={`ab-card ${winner === 'B' ? 'winner' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: '700', fontSize: '0.9rem', color: winner === 'B' ? 'var(--brand-emerald)' : 'var(--text-secondary)' }}>
              VARIANT B {winner === 'B' && '🏆 (WINNER)'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', fontSize: '1.25rem', color: winner === 'B' ? 'var(--brand-emerald)' : 'var(--text-primary)' }}>
              {scoreB}/100
            </span>
          </div>

          <textarea
            className="textarea-control"
            rows={3}
            value={variantB}
            onChange={(e) => setVariantB(e.target.value)}
            placeholder="Enter Hook Option B..."
            style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}
          />

          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            Word count: <strong>{variantB.split(/\s+/).filter(Boolean).length} words</strong>
          </div>
        </div>
      </div>

      {/* Decision Summary */}
      <div style={{
        marginTop: '1.25rem',
        padding: '0.85rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-elevated)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        <CheckCircle2 size={18} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Algorithm Verdict:</strong>{' '}
          {winner === 'B'
            ? `Variant B is predicted to hold attention +${diff} points longer due to higher curiosity polarization and clear stakes.`
            : winner === 'A'
            ? `Variant A is predicted to perform +${Math.abs(diff)} points better due to superior conciseness and punchy phrasing.`
            : 'Both hooks have equal calculated algorithmic friction. Try adding an emotional trigger or curiosity gap word.'}
        </div>
      </div>
    </div>
  );
}
