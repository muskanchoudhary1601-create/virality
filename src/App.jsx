import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';
import ExportReportModal from './components/ExportReportModal';

import CheckerPage from './pages/CheckerPage';
import HookDoctorPage from './pages/HookDoctorPage';
import AbTestingPage from './pages/AbTestingPage';
import RetentionSimulatorPage from './pages/RetentionSimulatorPage';
import CompetitorBenchmarksPage from './pages/CompetitorBenchmarksPage';
import SeoStudioPage from './pages/SeoStudioPage';

import { VIRAL_PRESETS } from './services/presetsData';
import { calculateViralityAnalysis } from './services/viralityEngine';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState('dark');

  // Active Preset & Form Data State (Shared across all pages)
  const [activePresetId, setActivePresetId] = useState(null);

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    hook: '',
    firstSecondsPrompt: '',
    script: '',
    caption: '',
    hashtags: '',
    platform: 'shorts',
    duration: 30,
    niche: 'Business & Tech',
    targetAudience: '',
    plannedHour: 18,
    audioTrendScore: 50
  });

  const [isExportOpen, setIsExportOpen] = useState(false);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleFieldChange = (field, value) => {
    setActivePresetId(null);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    setVideoUrl(preset.videoUrl || '');
    setFormData({
      title: preset.title,
      hook: preset.hook,
      firstSecondsPrompt: preset.firstSecondsPrompt || '',
      script: preset.script || '',
      caption: preset.caption || '',
      hashtags: preset.hashtags || '',
      platform: preset.platform || 'shorts',
      duration: preset.duration || 45,
      niche: preset.niche || 'Business & Tech',
      targetAudience: preset.targetAudience || 'Creators',
      plannedHour: preset.plannedHour || 18,
      audioTrendScore: preset.audioTrendScore || 80
    });
  };

  const handleVideoSelected = (file) => {
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);

    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.src = url;
    tempVideo.onloadedmetadata = () => {
      const dur = Math.round(tempVideo.duration) || 30;
      handleFieldChange('duration', dur);
    };

    if (!formData.title) {
      handleFieldChange('title', file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleClearVideo = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoFile(null);
    setVideoPreviewUrl(null);
  };

  const handleSimulateFetch = (url) => {
    if (url.includes('mrbeast')) {
      handleSelectPreset(VIRAL_PRESETS[0]);
    } else if (url.includes('tiktok') || url.includes('skin')) {
      handleSelectPreset(VIRAL_PRESETS[1]);
    } else if (url.includes('founder') || url.includes('reels')) {
      handleSelectPreset(VIRAL_PRESETS[2]);
    } else {
      handleFieldChange('title', 'Extracted: High-Impact Video Concept');
      handleFieldChange('hook', 'The 1 secret nobody is telling you about this...');
    }
  };

  const analysis = calculateViralityAnalysis(formData);

  return (
    <div className="app-container">
      {/* Dynamic Animated Canvas Background */}
      <AnimatedBackground theme={theme} />

      {/* Navigation Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenExport={() => setIsExportOpen(true)}
      />

      <main className="max-width-container" style={{ position: 'relative', zIndex: 1, flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <CheckerPage
                formData={formData}
                handleFieldChange={handleFieldChange}
                analysis={analysis}
                presets={VIRAL_PRESETS}
                activePresetId={activePresetId}
                handleSelectPreset={handleSelectPreset}
                videoFile={videoFile}
                videoPreviewUrl={videoPreviewUrl}
                handleVideoSelected={handleVideoSelected}
                handleClearVideo={handleClearVideo}
                videoUrl={videoUrl}
                setVideoUrl={setVideoUrl}
                handleSimulateFetch={handleSimulateFetch}
                onOpenExport={() => setIsExportOpen(true)}
              />
            }
          />

          <Route
            path="/hook-lab"
            element={
              <HookDoctorPage
                activeHook={formData.hook}
                onUpdateHook={(newHook) => handleFieldChange('hook', newHook)}
              />
            }
          />

          <Route
            path="/ab-testing"
            element={
              <AbTestingPage
                defaultHook={formData.hook}
              />
            }
          />

          <Route
            path="/retention-simulator"
            element={
              <RetentionSimulatorPage
                duration={formData.duration}
                hookScore={analysis.metrics.hookStrength}
              />
            }
          />

          <Route
            path="/benchmarks"
            element={
              <CompetitorBenchmarksPage
                currentNiche={formData.niche}
                currentScore={analysis.overallScore}
              />
            }
          />

          <Route
            path="/seo-studio"
            element={
              <SeoStudioPage
                tagCategories={analysis.tagCategories}
                seoScore={analysis.metrics.seoOptimization}
                platform={formData.platform}
                title={formData.title}
                niche={formData.niche}
              />
            }
          />
        </Routes>
      </main>

      {/* Export Scorecard Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        analysis={analysis}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
