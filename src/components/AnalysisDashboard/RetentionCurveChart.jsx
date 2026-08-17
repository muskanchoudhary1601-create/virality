import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle2, Info, TrendingDown, Play } from 'lucide-react';

export default function RetentionCurveChart({ retentionData, duration }) {
  const { points, benchmark, markers } = retentionData;
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const maxSecond = points[points.length - 1]?.second || duration || 45;
  const svgWidth = 700;
  const svgHeight = 220;
  const padding = { top: 20, right: 30, bottom: 30, left: 45 };

  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  // Coordinate scales
  const getX = (second) => padding.left + (second / maxSecond) * graphWidth;
  const getY = (retention) => padding.top + graphHeight - ((retention / 100) * graphHeight);

  // Generate SVG path strings
  const generatePath = (dataList) => {
    if (!dataList || dataList.length === 0) return '';
    return dataList.reduce((acc, pt, index) => {
      const x = getX(pt.second);
      const y = getY(pt.retention);
      return index === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  };

  const yourPath = generatePath(points);
  const benchPath = generatePath(benchmark);

  // Area under curve for gradient fill
  const yourAreaPath = points.length > 0 
    ? `${yourPath} L ${getX(points[points.length - 1].second)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`
    : '';

  return (
    <div className="glass-card retention-container">
      <div className="retention-header">
        <div>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={20} color="var(--brand-primary)" />
            <span>Audience Retention & Second-by-Second Dropoff Curve</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Predicts when viewers swipe away versus where attention spikes.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: '12px', height: '3px', backgroundColor: 'var(--brand-primary)', borderRadius: '2px' }} />
            <span>Your Video</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: '12px', height: '3px', backgroundColor: '#10b981', borderRadius: '2px', strokeDasharray: '3,3' }} />
            <span style={{ color: '#10b981' }}>Top 1% Viral Benchmark</span>
          </div>
        </div>
      </div>

      {/* SVG Retention Graph */}
      <div className="retention-chart-svg-box">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="retentionGradientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[100, 75, 50, 25, 0].map((level) => {
            const y = getY(level);
            return (
              <g key={level}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeDasharray={level === 0 ? '0' : '4,4'}
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  fill="var(--text-muted)"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="var(--font-mono)"
                >
                  {level}%
                </text>
              </g>
            );
          })}

          {/* X Axis Time Labels */}
          {[0, Math.floor(maxSecond / 4), Math.floor(maxSecond / 2), Math.floor((maxSecond * 3) / 4), maxSecond].map((sec) => {
            const x = getX(sec);
            return (
              <text
                key={sec}
                x={x}
                y={svgHeight - 8}
                fill="var(--text-muted)"
                fontSize="10"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
              >
                {sec}s
              </text>
            );
          })}

          {/* Area fill */}
          {yourAreaPath && <path d={yourAreaPath} fill="url(#retentionGradientFill)" />}

          {/* Top 1% Benchmark Line */}
          {benchPath && (
            <path
              d={benchPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="4,4"
              opacity="0.85"
            />
          )}

          {/* Your Video Line */}
          {yourPath && (
            <path
              d={yourPath}
              fill="none"
              stroke="var(--brand-primary)"
              strokeWidth="3.5"
            />
          )}

          {/* Interactive Hover Circles & Line */}
          {points.map((pt, i) => {
            const x = getX(pt.second);
            const y = getY(pt.retention);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill="var(--brand-primary)"
                stroke="#fff"
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'r 0.15s' }}
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}

          {/* Tooltip Overlay */}
          {hoveredPoint && (
            <g>
              <line
                x1={getX(hoveredPoint.second)}
                y1={padding.top}
                x2={getX(hoveredPoint.second)}
                y2={getY(0)}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeDasharray="2,2"
              />
              <rect
                x={Math.min(getX(hoveredPoint.second) - 55, svgWidth - padding.right - 110)}
                y={Math.max(getY(hoveredPoint.retention) - 45, 10)}
                width="110"
                height="36"
                rx="6"
                fill="#1e293b"
                stroke="var(--brand-primary)"
              />
              <text
                x={Math.min(getX(hoveredPoint.second), svgWidth - padding.right - 55)}
                y={Math.max(getY(hoveredPoint.retention) - 24, 30)}
                fill="#fff"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
              >
                t={hoveredPoint.second}s : {hoveredPoint.retention}%
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Timestamp Drop-off & Re-Hook Markers */}
      <div className="retention-markers-timeline">
        <h4 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
          Critical Timeline Drop-Off Points & Directives:
        </h4>

        {markers.map((marker, idx) => (
          <div key={idx} className="dropzone-flag-item">
            <span className="timestamp-badge">{marker.time}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', color: marker.type === 'warning' ? 'var(--brand-amber)' : 'var(--brand-emerald)' }}>
                {marker.type === 'warning' ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />}
                <span>{marker.title}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                {marker.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
