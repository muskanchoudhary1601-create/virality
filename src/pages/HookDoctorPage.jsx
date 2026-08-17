import React, { useState } from 'react';
import { Zap, Sparkles, Copy, Check, ArrowRight, ShieldCheck, Flame, BookOpen, Layers } from 'lucide-react';
import { analyzeHookStrength } from '../services/viralityEngine';

const HOOK_LIBRARY_TEMPLATES = [
  {
    niche: 'Business & Tech',
    hooks: [
      'Why 99% of creators fail before reaching 10k followers...',
      'I tested 50 SaaS tools in 30 days so you don’t have to.',
      'Stop using ChatGPT like this — it is wasting your time.',
      'The exact $0 tech stack I used to build an 8-figure company.',
      'This 1 non-obvious mistake is killing your business growth.'
    ]
  },
  {
    niche: 'Skincare & Beauty',
    hooks: [
      'Dermatologists are furious about this $6 drugstore secret.',
      'Stop buying expensive serums until you understand this 1 rule.',
      'The Korean double-cleansing technique that cleared my skin in 7 days.',
      'If you have textured skin, never apply your moisturizer like this.'
    ]
  },
  {
    niche: 'Fitness & Health',
    hooks: [
      'The 1 exercise everyone does wrong that destroys your lower back.',
      'Why you are not losing belly fat even if you eat clean every day.',
      'Doctors told me I would never lift heavy again. Watch this comeback.',
      'Stop doing 30-minute cardio. Try this 4-minute fat burner instead.'
    ]
  },
  {
    niche: 'Finance & Career',
    hooks: [
      'How I negotiated a $40,000 raise using this 3-sentence script.',
      'The secret tax loophole wealthy people use that is 100% legal.',
      'If you have $1,000 in your bank account, watch this before Friday.'
    ]
  }
];

export default function HookDoctorPage({ activeHook, onUpdateHook }) {
  const [testHook, setTestHook] = useState(activeHook || 'Why nobody in your niche is talking about this 1 secret...');
  const [copiedText, setCopiedText] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const hookScore = analyzeHookStrength(testHook);
  const words = testHook.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const handleApplyToMain = (hookText) => {
    setTestHook(hookText);
    if (onUpdateHook) onUpdateHook(hookText);
  };

  return (
    <div className="fade-in">
      <section className="page-hero-section">
        <h1 className="page-hero-title">
          AI Hook Engineering Studio
        </h1>
        <p className="page-hero-subtitle">
          The first 3 seconds determine 70% of video reach. Test, score, and optimize your opening line using viral psychological copywriting frameworks.
        </p>
      </section>

      {/* Main Hook Tester Sandbox */}
      <div className="grid-main">
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} color="var(--brand-primary)" />
              <span>Interactive Hook Sandbox</span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-time NLP Scoring</span>
          </div>

          <textarea
            className="textarea-control"
            rows={4}
            value={testHook}
            onChange={(e) => setTestHook(e.target.value)}
            placeholder="Type or paste your opening video hook line..."
            style={{ fontSize: '1.05rem', lineHeight: '1.4', marginBottom: '1rem' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Words: <strong style={{ color: wordCount >= 6 && wordCount <= 18 ? 'var(--brand-emerald)' : 'var(--brand-amber)' }}>{wordCount}</strong> (Optimal: 8–16)</span>
              <span>Characters: <strong>{testHook.length}</strong></span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleCopy(testHook, 'sandbox')}
              >
                {copiedText === 'sandbox' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copiedText === 'sandbox' ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => handleApplyToMain(testHook)}
              >
                <Sparkles size={14} />
                <span>Save to Main Audit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Hook Score Dial */}
        <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Predicted Hook Power
          </div>

          <div style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            fontFamily: 'var(--font-display)',
            color: hookScore >= 80 ? 'var(--brand-emerald)' : hookScore >= 60 ? 'var(--brand-amber)' : 'var(--brand-rose)',
            lineHeight: '1'
          }}>
            {hookScore}
            <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>/100</span>
          </div>

          <span className={`badge ${hookScore >= 80 ? 'badge-mega' : hookScore >= 60 ? 'badge-warning' : 'badge-danger'}`} style={{ marginTop: '0.5rem' }}>
            {hookScore >= 80 ? '🔥 High Curiosity Anchor' : hookScore >= 60 ? '⚡ Moderate Retention' : '⚠️ High Scroll-Away Risk'}
          </span>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: '280px' }}>
            {hookScore >= 80
              ? 'Opening triggers strong psychological curiosity and rapid comprehension.'
              : 'Add an emotional word, specific stakes, or a contrarian angle to spike retention.'}
          </p>
        </div>
      </div>

      {/* Proven Formula Generators */}
      <div style={{ margin: '2rem 0' }}>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>
          Viral Hook Formulas & Re-Writers
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Click any formula below to immediately test it in your sandbox:
        </p>

        <div className="grid-3">
          {[
            {
              title: '1. Curiosity Gap',
              tag: 'Retention King',
              example: `Why nobody in your niche is telling you about this 1 secret...`,
              why: 'Forces viewers to watch to resolve the mental tension.'
            },
            {
              title: '2. Contrarian Hot Take',
              tag: 'Comment Magnet',
              example: `Stop doing ${testHook.slice(0, 24)}... it is destroying your results.`,
              why: 'Directly challenges common consensus, provoking fast debate.'
            },
            {
              title: '3. High-Stakes Proof',
              tag: 'High Authority',
              example: `I tested this for 60 days so you don't make the same $10,000 mistake.`,
              why: 'Signals high tangible value and real-world credibility.'
            },
            {
              title: '4. Step-by-Step Blueprint',
              tag: 'Save/Bookmark Boost',
              example: `Steal this exact 3-step blueprint before everyone else copies it.`,
              why: 'Triggers bookmarking behavior which algorithms reward with discovery.'
            },
            {
              title: '5. The Negative Warning',
              tag: 'FOMO Trigger',
              example: `If you make this 1 mistake, your results will instantly drop to zero.`,
              why: 'Loss aversion is psychologically 2x more powerful than gain motivation.'
            },
            {
              title: '6. Visual Pattern Interrupt',
              tag: 'First-Second Pop',
              example: `Wait until you see what happened when we tried this...`,
              why: 'Best paired with rapid visual zoom or unexpected prop action.'
            }
          ].map((item, i) => (
            <div
              key={i}
              className="glass-card glass-card-interactive"
              style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => handleApplyToMain(item.example)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-highlight)' }}>
                    {item.title}
                  </span>
                  <span className="badge badge-solid" style={{ fontSize: '0.65rem' }}>{item.tag}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600', margin: '0.5rem 0' }}>
                  "{item.example}"
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>{item.why}</span>
                <button type="button" className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>
                  <span>Test</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Template Library */}
      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} color="var(--brand-primary)" />
              <span>Niche-Tested Viral Hook Library</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Curated hooks with verified 1M+ view conversion rates
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {['All', 'Business & Tech', 'Skincare & Beauty', 'Fitness & Health', 'Finance & Career'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`preset-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                style={{ fontSize: '0.775rem' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {HOOK_LIBRARY_TEMPLATES
            .filter(group => selectedCategory === 'All' || group.niche === selectedCategory)
            .flatMap(group => group.hooks.map(h => ({ hook: h, niche: group.niche })))
            .map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <span className="badge badge-solid" style={{ fontSize: '0.65rem', marginBottom: '0.2rem' }}>
                    {item.niche}
                  </span>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    "{item.hook}"
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleCopy(item.hook, `lib-${idx}`)}
                  >
                    {copiedText === `lib-${idx}` ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleApplyToMain(item.hook)}
                  >
                    <span>Use</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
