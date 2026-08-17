import React, { useState } from 'react';
import { Stethoscope, Sparkles, Check, ArrowRight, Copy, RefreshCw, Zap } from 'lucide-react';

export default function HookDoctorStudio({
  hookSuggestions,
  currentHook,
  onApplyHook,
  onTestCustomHook
}) {
  const [customInput, setCustomInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleApply = (hookText, idx) => {
    setSelectedIdx(idx);
    onApplyHook(hookText);
  };

  return (
    <div className="glass-card hook-studio-box">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-breakout" style={{ padding: '0.2rem 0.5rem' }}>
              <Sparkles size={13} />
              AI Studio
            </span>
            <h3 style={{ fontSize: '1.25rem' }}>Hook Doctor & Real-Time Re-Scorer</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            The first 3 seconds dictate 70% of video success. Test or adopt top-performing algorithmic hook formulas:
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-elevated)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Hook:</span>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            "{currentHook || 'Default Hook'}"
          </span>
        </div>
      </div>

      {/* AI Suggestions Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
        {hookSuggestions.map((item, idx) => (
          <div
            key={idx}
            className={`hook-variant-card ${selectedIdx === idx ? 'selected' : ''}`}
            onClick={() => handleApply(item.hook, idx)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-highlight)' }}>
                  {item.type}
                </span>
                <span className="badge badge-solid" style={{ fontSize: '0.7rem' }}>
                  {item.tag}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--brand-emerald)' }}>
                  Predicted Hook: {item.predictedHookScore}/100
                </span>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(item.hook, idx);
                  }}
                  title="Copy to clipboard"
                >
                  {copiedIndex === idx ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(item.hook, idx);
                  }}
                >
                  <Zap size={14} />
                  <span>Apply & Re-Score</span>
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              "{item.hook}"
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              💡 <strong>Why it works:</strong> {item.whyItWorks}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Custom Hook Sandbox */}
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem'
      }}>
        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Zap size={16} color="var(--brand-primary)" />
          <span>Test Your Own Custom Hook in Sandbox</span>
        </h4>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            className="input-control"
            placeholder="Type a new hook line to immediately see how it impacts your score..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && customInput.trim()) {
                onTestCustomHook(customInput);
              }
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            disabled={!customInput.trim()}
            onClick={() => {
              if (customInput.trim()) onTestCustomHook(customInput);
            }}
          >
            <span>Test Hook</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
