import React, { useState } from 'react';
import { Sparkles, FileCode2, UploadCloud, Link2, TrendingUp, Layers, Activity, Zap, Split, Award } from 'lucide-react';
import VideoUploadTab from '../components/InputSection/VideoUploadTab';
import UrlParserTab from '../components/InputSection/UrlParserTab';
import ManualScriptTab from '../components/InputSection/ManualScriptTab';
import ScoreOverviewCard from '../components/AnalysisDashboard/ScoreOverviewCard';
import RadarMetricsCard from '../components/AnalysisDashboard/RadarMetricsCard';
import RetentionCurveChart from '../components/AnalysisDashboard/RetentionCurveChart';
import StrengthsWeaknesses from '../components/AnalysisDashboard/StrengthsWeaknesses';
import HookDoctorStudio from '../components/AnalysisDashboard/HookDoctorStudio';
import HashtagAndSeoOptimizer from '../components/AnalysisDashboard/HashtagAndSeoOptimizer';
import EmotionalTriggersCard from '../components/AnalysisDashboard/EmotionalTriggersCard';
import BestPostingTimesCard from '../components/AnalysisDashboard/BestPostingTimesCard';
import CompetitorBenchmark from '../components/AnalysisDashboard/CompetitorBenchmark';
import AbTestingSimulator from '../components/AnalysisDashboard/AbTestingSimulator';

export default function CheckerPage({
  formData,
  handleFieldChange,
  analysis,
  presets,
  activePresetId,
  handleSelectPreset,
  videoFile,
  videoPreviewUrl,
  handleVideoSelected,
  handleClearVideo,
  videoUrl,
  setVideoUrl,
  handleSimulateFetch,
  onOpenExport
}) {
  const [activeInputTab, setActiveInputTab] = useState('manual');
  const [activeDashboardTab, setActiveDashboardTab] = useState('all');

  return (
    <div className="fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Hero Header */}
      <section className="page-hero-section">
        <h1 className="page-hero-title">
          Video Virality & Retention Intelligence
        </h1>
        <p className="page-hero-subtitle">
          Predict short-form algorithm performance, second-by-second dropoff curves, and hook conversion before you publish.
        </p>

        {/* Quick Presets */}
        <div className="presets-container">
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', marginRight: '0.5rem' }}>
            Try Presets:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.id}
              className={`preset-chip ${activePresetId === preset.id ? 'active' : ''}`}
              onClick={() => handleSelectPreset(preset)}
            >
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Input Ingestion Studio */}
      <div className="input-studio-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Video Input & Metadata</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Choose an ingestion method to evaluate algorithmic potential.
            </p>
          </div>
        </div>

        {/* Input Method Tabs */}
        <div className="input-tabs-nav">
          <button
            className={`tab-btn ${activeInputTab === 'manual' ? 'active' : ''}`}
            onClick={() => setActiveInputTab('manual')}
          >
            <FileCode2 size={16} />
            <span>Script & Metadata</span>
          </button>

          <button
            className={`tab-btn ${activeInputTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveInputTab('upload')}
          >
            <UploadCloud size={16} />
            <span>Upload Video File</span>
            {videoFile && <span className="badge badge-mega" style={{ fontSize: '0.65rem' }}>Loaded</span>}
          </button>

          <button
            className={`tab-btn ${activeInputTab === 'url' ? 'active' : ''}`}
            onClick={() => setActiveInputTab('url')}
          >
            <Link2 size={16} />
            <span>Social Link URL</span>
          </button>
        </div>

        {activeInputTab === 'manual' && (
          <ManualScriptTab
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        )}

        {activeInputTab === 'upload' && (
          <VideoUploadTab
            videoFile={videoFile}
            videoPreviewUrl={videoPreviewUrl}
            onVideoSelected={handleVideoSelected}
            onClearVideo={handleClearVideo}
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        )}

        {activeInputTab === 'url' && (
          <UrlParserTab
            videoUrl={videoUrl}
            onUrlChange={setVideoUrl}
            formData={formData}
            onFieldChange={handleFieldChange}
            onSimulateFetch={handleSimulateFetch}
          />
        )}
      </div>

      {/* Analysis Output Dashboard */}
      <div style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="scroll-horizontal" style={{ display: 'flex', gap: '0.5rem', paddingBottom: '0.25rem' }}>
            <button
              className={`preset-chip ${activeDashboardTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveDashboardTab('all')}
            >
              <Layers size={14} />
              <span>Full Diagnostic</span>
            </button>
            <button
              className={`preset-chip ${activeDashboardTab === 'retention' ? 'active' : ''}`}
              onClick={() => setActiveDashboardTab('retention')}
            >
              <Activity size={14} />
              <span>Retention & Pacing</span>
            </button>
            <button
              className={`preset-chip ${activeDashboardTab === 'hook' ? 'active' : ''}`}
              onClick={() => setActiveDashboardTab('hook')}
            >
              <Zap size={14} />
              <span>Hook Doctor</span>
            </button>
            <button
              className={`preset-chip ${activeDashboardTab === 'ab' ? 'active' : ''}`}
              onClick={() => setActiveDashboardTab('ab')}
            >
              <Split size={14} />
              <span>A/B Arena</span>
            </button>
            <button
              className={`preset-chip ${activeDashboardTab === 'benchmark' ? 'active' : ''}`}
              onClick={() => setActiveDashboardTab('benchmark')}
            >
              <Award size={14} />
              <span>Niche Benchmark</span>
            </button>
          </div>

          <button className="btn btn-primary btn-sm" onClick={onOpenExport}>
            <Sparkles size={14} />
            <span>Export Scorecard</span>
          </button>
        </div>

        {/* Hero Score Dial */}
        <div className="dashboard-sections-stack">
          <ScoreOverviewCard analysis={analysis} />

          {/* Retention & Metrics */}
          {(activeDashboardTab === 'all' || activeDashboardTab === 'retention') && (
            <div className="grid-main">
              <RetentionCurveChart
                retentionData={analysis.retentionData}
                duration={formData.duration}
              />
              <RadarMetricsCard metrics={analysis.metrics} />
            </div>
          )}

          {/* Strengths & Weaknesses */}
          {(activeDashboardTab === 'all' || activeDashboardTab === 'retention') && (
            <StrengthsWeaknesses
              strengths={analysis.strengths}
              weaknesses={analysis.weaknesses}
            />
          )}

          {/* Hook Doctor Studio */}
          {(activeDashboardTab === 'all' || activeDashboardTab === 'hook') && (
            <HookDoctorStudio
              hookSuggestions={analysis.hookSuggestions}
              currentHook={formData.hook}
              onApplyHook={(text) => handleFieldChange('hook', text)}
              onTestCustomHook={(text) => handleFieldChange('hook', text)}
            />
          )}

          {/* SEO & Hashtags */}
          {(activeDashboardTab === 'all' || activeDashboardTab === 'hook') && (
            <HashtagAndSeoOptimizer
              tagCategories={analysis.tagCategories}
              seoScore={analysis.metrics.seoOptimization}
              platform={formData.platform}
              title={formData.title}
              niche={formData.niche}
            />
          )}

          {/* Emotional Triggers & Posting Times */}
          {(activeDashboardTab === 'all' || activeDashboardTab === 'benchmark') && (
            <div className="grid-2">
              <EmotionalTriggersCard
                emotionalMatrix={analysis.emotionalMatrix}
              />
              <BestPostingTimesCard
                platform={formData.platform}
                plannedHour={formData.plannedHour}
              />
            </div>
          )}

          {/* Niche Benchmark */}
          {(activeDashboardTab === 'all' || activeDashboardTab === 'benchmark') && (
            <CompetitorBenchmark benchmark={analysis.nicheBenchmark} />
          )}

          {/* A/B Simulator */}
          {(activeDashboardTab === 'all' || activeDashboardTab === 'ab') && (
            <AbTestingSimulator
              currentHook={formData.hook}
              title={formData.title}
            />
          )}
        </div>
      </div>
    </div>
  );
}
