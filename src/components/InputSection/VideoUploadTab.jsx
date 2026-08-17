import React, { useRef } from 'react';
import { UploadCloud, Video, FileText, CheckCircle2, Play, AlertCircle, X } from 'lucide-react';

export default function VideoUploadTab({
  videoFile,
  videoPreviewUrl,
  onVideoSelected,
  onClearVideo,
  formData,
  onFieldChange
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoSelected(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoSelected(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!videoPreviewUrl ? (
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/mp4,video/webm,video/quicktime,video/mov"
            style={{ display: 'none' }}
          />
          <div className="dropzone-icon-circle">
            <UploadCloud size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>
              Upload Your Video File
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Drag & drop MP4, WebM, or MOV (up to 500MB) for visual frame & pacing scan
            </p>
          </div>
          <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem' }}>
            <Video size={16} />
            <span>Browse Files</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 320px) 1fr', gap: '1.5rem' }}>
          {/* Video Preview Player */}
          <div style={{ position: 'relative' }}>
            <div className="video-preview-wrapper">
              <video
                src={videoPreviewUrl}
                controls
                className="video-preview-player"
              />
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={onClearVideo}
              style={{ width: '100%', marginTop: '0.75rem', color: 'var(--brand-rose)' }}
            >
              <X size={15} />
              <span>Replace Video</span>
            </button>
          </div>

          {/* Quick Details Associated with Upload */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-emerald)', fontSize: '0.9rem', fontWeight: '600' }}>
              <CheckCircle2 size={18} />
              <span>Video Loaded: {videoFile?.name || 'Uploaded Video'} ({(videoFile?.size / (1024 * 1024)).toFixed(1)} MB)</span>
            </div>

            <div className="form-group">
              <label className="form-label">
                Video Hook / First 3-5 Seconds Line
                <span className="form-label-hint">What is spoken or shown first</span>
              </label>
              <input
                type="text"
                className="input-control"
                placeholder="e.g. Stop doing this 1 thing if you want to grow..."
                value={formData.hook}
                onChange={(e) => onFieldChange('hook', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Video Title / Topic
              </label>
              <input
                type="text"
                className="input-control"
                placeholder="e.g. 3 Secrets Nobody Told You About Scaling"
                value={formData.title}
                onChange={(e) => onFieldChange('title', e.target.value)}
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Niche / Category</label>
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
                <label className="form-label">Duration: {formData.duration}s</label>
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
        </div>
      )}
    </div>
  );
}
