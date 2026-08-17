import React, { useState } from 'react';
import { X, Download, Copy, Check, Share2, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { downloadJsonReport, copyReportSummary } from '../services/exportService';

export default function ExportReportModal({ isOpen, onClose, analysis }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !analysis) return null;

  const {
    overallScore,
    performanceTier,
    badgeClass,
    predictedViews,
    metrics,
    metadata
  } = analysis;

  const handleCopy = async () => {
    await copyReportSummary(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Share2 size={20} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '1.25rem' }}>Export & Share Virality Scorecard</h3>
          </div>
          <button className="btn btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Shareable Scorecard Graphic Card */}
        <div className="scorecard-preview-card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} color="#fff" />
              </div>
              <span style={{ fontWeight: '800', fontSize: '1rem', letterSpacing: '-0.02em' }}>ViralPulse AI Report</span>
            </div>
            <span className={`badge ${badgeClass}`}>{performanceTier}</span>
          </div>

          <div style={{ margin: '1.25rem 0' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Audited Video</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff', marginTop: '0.2rem' }}>
              "{metadata.title || 'Untitled Video'}"
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.05)', padding: '1rem 1.25rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>VIRALITY SCORE</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#fff' }}>
                {overallScore}<span style={{ fontSize: '1.1rem', color: '#94a3b8' }}>/100</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>PROJECTED REACH</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981', fontFamily: 'var(--font-display)' }}>
                {predictedViews}
              </div>
            </div>
          </div>

          {/* Mini Metrics 3x2 Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', fontSize: '0.8rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '8px' }}>
              <div style={{ color: '#94a3b8' }}>Hook Power</div>
              <div style={{ fontWeight: '700', color: '#f43f5e' }}>{metrics.hookStrength}/100</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '8px' }}>
              <div style={{ color: '#94a3b8' }}>Retention</div>
              <div style={{ fontWeight: '700', color: '#8b5cf6' }}>{metrics.pacingRetention}/100</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '8px' }}>
              <div style={{ color: '#94a3b8' }}>Engagement</div>
              <div style={{ fontWeight: '700', color: '#06b6d4' }}>{metrics.engagementVelocity}/100</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Platform: {metadata.platform.toUpperCase()} ({metadata.niche})</span>
            <span>https://viralpulse.ai</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={handleCopy}>
            {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
          </button>
          <button className="btn btn-primary" onClick={() => downloadJsonReport(analysis)}>
            <Download size={16} />
            <span>Download Audit (.JSON)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
