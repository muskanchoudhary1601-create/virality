import React, { useState } from 'react';
import { Tag, Copy, Check, Search, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import HashtagAndSeoOptimizer from '../components/AnalysisDashboard/HashtagAndSeoOptimizer';

export default function SeoStudioPage({
  tagCategories = {
    viral: ['#fyp', '#viral', '#trending', '#foryoupage', '#explore'],
    niche: ['#tech', '#startups', '#saas', '#creators', '#growthhacks'],
    specific: ['#2026trends', '#mustwatch', '#contentstrategy', '#dailygrowth']
  },
  seoScore = 88,
  platform = 'shorts',
  title = 'How We Built an 8-Figure SaaS in 3 Years',
  niche = 'Business & Tech'
}) {
  return (
    <div className="fade-in">
      <section className="page-hero-section">
        <h1 className="page-hero-title">
          Social SEO & Hashtag Optimization Suite
        </h1>
        <p className="page-hero-subtitle">
          Optimize your caption keywords, search indexing ranking, and 3-tier hashtag stack across YouTube Shorts, Instagram Reels, and TikTok algorithms.
        </p>
      </section>

      <div style={{ marginBottom: '3rem' }}>
        <HashtagAndSeoOptimizer
          tagCategories={tagCategories}
          seoScore={seoScore}
          platform={platform}
          title={title}
          niche={niche}
        />
      </div>
    </div>
  );
}
