import React, { useState } from 'react';
import { Activity, Clock, Plus, Trash2, CheckCircle2, AlertCircle, Play, Sparkles, Volume2, Video } from 'lucide-react';
import { generateRetentionCurve } from '../services/viralityEngine';

export default function RetentionSimulatorPage({ duration = 45, hookScore = 80 }) {
  const [videoDuration, setVideoDuration] = useState(duration);
  const [activePacingBoost, setActivePacingBoost] = useState(75);
  const [timelineCuts, setTimelineCuts] = useState([
    { id: 1, second: 3, type: 'Visual Text Pop', desc: 'Bold yellow caption with sound effect' },
    { id: 2, second: 14, type: 'B-Roll Jump Cut', desc: 'Angle change to prevent visual fatigue' },
    { id: 3, second: 28, type: 'Sound Effect & Re-Hook', desc: 'Audio riser and cliffhanger question' }
  ]);

  const [newCutType, setNewCutType] = useState('B-Roll Jump Cut');
  const [newCutSec, setNewCutSec] = useState(20);

  // Dynamic retention curve computed based on active pacing & cuts
  const effectivePacing = Math.min(96, activePacingBoost + timelineCuts.length * 4);
  const retentionData = generateRetentionCurve(videoDuration, hookScore, effectivePacing);

  const handleAddCut = () => {
    if (newCutSec > 0 && newCutSec <= videoDuration) {
      setTimelineCuts([
        ...timelineCuts,
        {
          id: Date.now(),
          second: newCutSec,
          type: newCutType,
          desc: 'User-added attention anchor to prevent dropoff'
        }
      ].sort((a, b) => a.second - b.second));
    }
  };

  const handleRemoveCut = (id) => {
    setTimelineCuts(timelineCuts.filter(c => c.id !== id));
  };

  return (
    <div className="fade-in">
      <section className="page-hero-section">
        <h1 className="page-hero-title">
          Audience Retention & Pacing Simulator
        </h1>
        <p className="page-hero-subtitle">
          Audience attention decays logarithmically. Add visual cuts, audio transitions, and re-hooks along the timeline to optimize watch-time past 80%.
        </p>
      </section>

      {/* Retention Curve Card */}
      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} color="var(--brand-primary)" />
              <span>Simulated Second-by-Second Watch Time</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Adding dynamic edits increases retention velocity across the timeline.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '12px', height: '3px', backgroundColor: 'var(--brand-primary)', borderRadius: '2px' }} />
              <span>Your Video ({effectivePacing}/100 Pacing)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '12px', height: '3px', backgroundColor: '#10b981', borderRadius: '2px' }} />
              <span style={{ color: '#10b981' }}>Top 1% Viral Short (78%+ completion)</span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="retention-chart-svg-box">
          <svg viewBox="0 0 700 220" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="simGradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid */}
            {[100, 75, 50, 25, 0].map(lvl => (
              <g key={lvl}>
                <line
                  x1="45"
                  y1={20 + (220 - 50) - (lvl / 100) * (220 - 50)}
                  x2="670"
                  y2={20 + (220 - 50) - (lvl / 100) * (220 - 50)}
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeDasharray={lvl === 0 ? '0' : '4,4'}
                />
                <text
                  x="35"
                  y={20 + (220 - 50) - (lvl / 100) * (220 - 50) + 4}
                  fill="var(--text-muted)"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="var(--font-mono)"
                >
                  {lvl}%
                </text>
              </g>
            ))}

            {/* Render points */}
            {retentionData.points.length > 1 && (
              <>
                <path
                  d={retentionData.benchmark.reduce((acc, pt, i) => {
                    const x = 45 + (pt.second / videoDuration) * (670 - 45);
                    const y = 20 + (220 - 50) - (pt.retention / 100) * (220 - 50);
                    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />

                <path
                  d={retentionData.points.reduce((acc, pt, i) => {
                    const x = 45 + (pt.second / videoDuration) * (670 - 45);
                    const y = 20 + (220 - 50) - (pt.retention / 100) * (220 - 50);
                    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke="var(--brand-primary)"
                  strokeWidth="3.5"
                />
              </>
            )}

            {/* Render Timeline Cut Markers on Graph */}
            {timelineCuts.map((cut) => {
              const x = 45 + (cut.second / videoDuration) * (670 - 45);
              return (
                <g key={cut.id}>
                  <line
                    x1={x}
                    y1="20"
                    x2={x}
                    y2="190"
                    stroke="rgba(99, 102, 241, 0.5)"
                    strokeDasharray="2,2"
                  />
                  <circle
                    cx={x}
                    cy="30"
                    r="4"
                    fill="var(--brand-primary)"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Interactive Pacing Editor */}
      <div className="grid-main" style={{ marginBottom: '3rem' }}>
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>
            Interactive Timeline Cut & Cue Editor
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Place attention anchors along your video to interrupt monotony and reset viewer attention:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'flex-end' }}>
            <div style={{ minWidth: '140px' }}>
              <label className="form-label" style={{ marginBottom: '0.35rem' }}>Edit Type</label>
              <select
                className="select-control"
                value={newCutType}
                onChange={(e) => setNewCutType(e.target.value)}
              >
                <option value="B-Roll Jump Cut">B-Roll Jump Cut</option>
                <option value="Visual Text Pop">Visual Text Pop</option>
                <option value="Sound Effect & Re-Hook">Sound Effect & Re-Hook</option>
                <option value="Zoom In/Out Pulse">Zoom In/Out Pulse</option>
                <option value="Seamless Loop Ending">Seamless Loop Ending</option>
              </select>
            </div>

            <div>
              <label className="form-label" style={{ marginBottom: '0.35rem' }}>Timestamp (sec)</label>
              <input
                type="number"
                className="input-control"
                min="1"
                max={videoDuration}
                value={newCutSec}
                onChange={(e) => setNewCutSec(parseInt(e.target.value, 10) || 1)}
              />
            </div>

            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddCut}
                style={{ width: '100%', height: '42px' }}
              >
                <Plus size={16} />
                <span>Add Cue</span>
              </button>
            </div>
          </div>

          {/* Cuts list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {timelineCuts.map((cut) => (
              <div
                key={cut.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="timestamp-badge">0:{cut.second.toString().padStart(2, '0')}</span>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-highlight)' }}>
                      {cut.type}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {cut.desc}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => handleRemoveCut(cut.id)}
                >
                  <Trash2 size={13} color="var(--brand-rose)" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Video Duration & Pacing Controls */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>
            Duration & Algorithm Multipliers
          </h3>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">
              <span>Total Video Length: <strong>{videoDuration}s</strong></span>
              <span className="badge badge-solid" style={{ fontSize: '0.7rem' }}>
                {videoDuration <= 35 ? '🔥 High Loop Velocity' : 'Standard'}
              </span>
            </label>
            <input
              type="range"
              min="10"
              max="120"
              value={videoDuration}
              onChange={(e) => setVideoDuration(parseInt(e.target.value, 10))}
              style={{ accentColor: 'var(--brand-primary)', width: '100%', height: '36px' }}
            />
          </div>

          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.825rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Pacing Multiplier:</span>
              <strong style={{ color: 'var(--brand-emerald)' }}>+{timelineCuts.length * 4}% Retention</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Estimated Completion:</span>
              <strong style={{ color: 'var(--text-highlight)' }}>{Math.min(88, 52 + timelineCuts.length * 5)}%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Re-Watch / Loop Index:</span>
              <strong style={{ color: 'var(--brand-cyan)' }}>1.34x Loops</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
