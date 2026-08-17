import React from 'react';
import { Sparkles, TrendingUp, Award, Layers } from 'lucide-react';

export default function HeroBanner({ onSelectPreset, activePresetId, presets }) {
  return (
    <section className="hero-section">
      <div className="max-width-container">
        <div className="hero-pill">
          <Sparkles size={14} className="pulse-animation" />
          <span>Next-Gen Algorithm Diagnostic Engine for 2026</span>
        </div>

        <h1 className="hero-title">
          Know If Your Video Will <span className="gradient-text">Go Viral</span> Before You Hit Post
        </h1>

        <p className="hero-subtitle">
          AI-driven hook diagnostics, second-by-second retention curve prediction, engagement velocity modeling, and actionable viral prescriptions for YouTube Shorts, Reels & TikTok.
        </p>

        {/* Quick Benchmark Presets Bar */}
        <div className="presets-container">
          <span className="presets-label">
            <TrendingUp size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            Try Fast Presets:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.id}
              className={`preset-chip ${activePresetId === preset.id ? 'active' : ''}`}
              onClick={() => onSelectPreset(preset)}
            >
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
