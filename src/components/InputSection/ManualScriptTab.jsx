import React from 'react';
import { Clock, Target, Tag, Sparkles } from 'lucide-react';
import { YouTubeIcon, InstagramIcon, TikTokIcon } from '../PlatformIcons';

export default function ManualScriptTab({ formData, onFieldChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Platform Selector Buttons */}
      <div className="form-group">
        <label className="form-label">Target Social Platform</label>
        <div className="platform-selector-group">
          <button
            type="button"
            className={`platform-option-btn ${formData.platform === 'shorts' ? 'selected' : ''}`}
            onClick={() => onFieldChange('platform', 'shorts')}
          >
            <YouTubeIcon size={18} color="#f43f5e" />
            <span>YouTube Shorts</span>
          </button>
          <button
            type="button"
            className={`platform-option-btn ${formData.platform === 'tiktok' ? 'selected' : ''}`}
            onClick={() => onFieldChange('platform', 'tiktok')}
          >
            <TikTokIcon size={18} color="#06b6d4" />
            <span>TikTok</span>
          </button>
          <button
            type="button"
            className={`platform-option-btn ${formData.platform === 'reels' ? 'selected' : ''}`}
            onClick={() => onFieldChange('platform', 'reels')}
          >
            <InstagramIcon size={18} color="#ec4899" />
            <span>Instagram Reels</span>
          </button>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            Video Title / Core Topic
            <span className="form-label-hint">What is the video called?</span>
          </label>
          <input
            type="text"
            className="input-control"
            placeholder="e.g. 3 Secrets To 100k Followers in 30 Days"
            value={formData.title}
            onChange={(e) => onFieldChange('title', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span>Spoken Hook (First 3-5 Seconds)</span>
            <span className="form-label-hint">Crucial for retention</span>
          </label>
          <input
            type="text"
            className="input-control"
            placeholder="e.g. If you make this 1 mistake, your views will drop to zero..."
            value={formData.hook}
            onChange={(e) => onFieldChange('hook', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Visual Hook Description (What does the viewer see in 0–3s?)
          <span className="form-label-hint">Text overlays, gestures, cuts, props</span>
        </label>
        <input
          type="text"
          className="input-control"
          placeholder="e.g. Extreme close-up with big red bold text overlay popping in with sound effect"
          value={formData.firstSecondsPrompt || ''}
          onChange={(e) => onFieldChange('firstSecondsPrompt', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Full Script / Voiceover Transcript
          <span className="form-label-hint">Paste full spoken content for pacing analysis</span>
        </label>
        <textarea
          className="textarea-control"
          rows={3}
          placeholder="Paste your video transcript or talking points here..."
          value={formData.script || ''}
          onChange={(e) => onFieldChange('script', e.target.value)}
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Post Caption & Call-to-Action (CTA)</label>
          <input
            type="text"
            className="input-control"
            placeholder="e.g. Drop a comment below if you want the full template! 👇"
            value={formData.caption || ''}
            onChange={(e) => onFieldChange('caption', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hashtags (Comma or space separated)</label>
          <input
            type="text"
            className="input-control"
            placeholder="#shorts #contentcreator #growth #viral"
            value={formData.hashtags || ''}
            onChange={(e) => onFieldChange('hashtags', e.target.value)}
          />
        </div>
      </div>

      <div className="form-grid-3">
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
          <label className="form-label">Target Audience</label>
          <input
            type="text"
            className="input-control"
            placeholder="e.g. Solopreneurs & Creators"
            value={formData.targetAudience || ''}
            onChange={(e) => onFieldChange('targetAudience', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Duration: <strong style={{ color: 'var(--brand-primary)' }}>{formData.duration}s</strong>
          </label>
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
