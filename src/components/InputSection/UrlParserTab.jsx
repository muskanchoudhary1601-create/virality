import React, { useState } from 'react';
import { Link2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { YouTubeIcon, InstagramIcon, TikTokIcon } from '../PlatformIcons';

export default function UrlParserTab({
  videoUrl,
  onUrlChange,
  formData,
  onFieldChange,
  onSimulateFetch
}) {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const getPlatformFromUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube Shorts';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('instagram.com')) return 'Instagram Reels';
    return 'Web Video';
  };

  const detectedPlatform = getPlatformFromUrl(videoUrl);

  const handleFetchMetadata = () => {
    if (!videoUrl) return;
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      setFetchSuccess(true);
      onSimulateFetch(videoUrl);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="form-group">
        <label className="form-label">
          <span>Paste Video Link (YouTube Shorts, Instagram Reels, TikTok)</span>
          {detectedPlatform && (
            <span className="badge badge-solid" style={{ textTransform: 'none' }}>
              Detected: {detectedPlatform}
            </span>
          )}
        </label>
        
        <div className="url-input-container">
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="url"
              className="input-control"
              placeholder="https://www.youtube.com/shorts/... or https://www.tiktok.com/@... or instagram.com/reel/..."
              value={videoUrl}
              onChange={(e) => {
                onUrlChange(e.target.value);
                setFetchSuccess(false);
              }}
              style={{ paddingLeft: '2.5rem' }}
            />
            <Link2
              size={18}
              style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleFetchMetadata}
            disabled={!videoUrl || isFetching}
          >
            {isFetching ? (
              <span>Extracting...</span>
            ) : (
              <>
                <Sparkles size={16} color="var(--brand-primary)" />
                <span>Fetch Metadata</span>
              </>
            )}
          </button>
        </div>
      </div>

      {fetchSuccess && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--brand-emerald)',
          fontSize: '0.875rem'
        }}>
          <CheckCircle2 size={18} />
          <span>Extracted video metadata, platform tags, duration, and audio profile successfully!</span>
        </div>
      )}

      {/* Auto-extracted metadata fields */}
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Extracted Title / Headline</label>
          <input
            type="text"
            className="input-control"
            placeholder="e.g. The 1 Skincare Secret Everyone Gets Wrong"
            value={formData.title}
            onChange={(e) => onFieldChange('title', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Spoken / Visual Hook (First 3s)</label>
          <input
            type="text"
            className="input-control"
            placeholder="e.g. Stop wasting money on this product..."
            value={formData.hook}
            onChange={(e) => onFieldChange('hook', e.target.value)}
          />
        </div>
      </div>

      <div className="form-grid-3">
        <div className="form-group">
          <label className="form-label">Platform</label>
          <select
            className="select-control"
            value={formData.platform}
            onChange={(e) => onFieldChange('platform', e.target.value)}
          >
            <option value="shorts">YouTube Shorts</option>
            <option value="tiktok">TikTok</option>
            <option value="reels">Instagram Reels</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Niche Category</label>
          <select
            className="select-control"
            value={formData.niche}
            onChange={(e) => onFieldChange('niche', e.target.value)}
          >
            <option value="Business & Tech">Business & Tech</option>
            <option value="Entertainment & Gaming">Entertainment & Gaming</option>
            <option value="Beauty & Skincare">Beauty & Skincare</option>
            <option value="Fitness & Health">Fitness & Health</option>
            <option value="Education & Finance">Education & Finance</option>
            <option value="Lifestyle & Vlogs">Lifestyle & Vlogs</option>
            <option value="AI & Coding">AI & Coding</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Video Length: {formData.duration}s</label>
          <input
            type="range"
            min="5"
            max="180"
            value={formData.duration}
            onChange={(e) => onFieldChange('duration', parseInt(e.target.value, 10))}
            style={{ accentColor: 'var(--brand-primary)', height: '38px' }}
          />
        </div>
      </div>
    </div>
  );
}
