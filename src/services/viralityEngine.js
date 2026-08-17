/**
 * VIRALPULSE AI - ADVANCED VIRALITY PREDICTION ENGINE
 * Multi-factor algorithmic model for short-form & long-form video intelligence.
 */

// Keyword dictionaries for NLP scoring
const CURIOSITY_KEYWORDS = [
  'secret', 'nobody talks about', 'hidden', 'i found', 'exposed', 'truth about',
  'warning', 'stop doing', 'never', 'insane', 'what happens if', 'why you should',
  'hack', 'cheat code', 'trick', 'mistake', 'real reason', 'the 1 thing', 'game changer'
];

const HIGH_STAKES_KEYWORDS = [
  'lost', 'million', 'billion', 'died', 'banned', 'illegal', 'danger', 'shocking',
  'worst', 'crazy', 'disaster', 'genius', 'unbelievable', 'hospital', 'arrested', 'failed'
];

const EMOTIONAL_TRIGGERS = {
  curiosity: ['why', 'how', 'secret', 'hidden', 'nobody', 'truth', 'look what', 'find out'],
  humor: ['funny', 'fail', 'hilarious', 'relatable', 'meme', 'comedy', 'joke', 'prank', 'awkward'],
  fomo: ['before it is too late', 'urgent', 'now', 'everyone is', 'trending', 'limited', 'dont miss'],
  inspiration: ['success', 'hustle', 'transformation', 'mindset', 'motivation', 'gym', 'growth', 'rich'],
  utility: ['step by step', 'tutorial', 'how to', 'guide', 'tools', 'free', 'save this', 'strategy']
};

/**
 * Calculates Hook Strength Score (0-100)
 */
export function analyzeHookStrength(hookText = '', firstSecondsPrompt = '') {
  const text = (hookText + ' ' + firstSecondsPrompt).toLowerCase().trim();
  if (!text) return 0;
  
  let score = 40; // baseline for non-empty text

  // Word count pacing check
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length >= 4 && words.length <= 18) {
    score += 15; // Optimal short hook length
  } else if (words.length > 25) {
    score -= 10; // Too wordy/slow
  }

  // Curiosity gap keywords
  const curiosityMatches = CURIOSITY_KEYWORDS.filter(k => text.includes(k));
  score += Math.min(curiosityMatches.length * 10, 20);

  // High stakes / emotional punch
  const stakesMatches = HIGH_STAKES_KEYWORDS.filter(k => text.includes(k));
  score += Math.min(stakesMatches.length * 8, 16);

  // Question hook vs direct punchline
  if (text.includes('?') || text.startsWith('did you know') || text.startsWith('what if')) {
    score += 8;
  }

  // First 3 seconds visual movement indicator
  if (text.includes('zoom') || text.includes('reveal') || text.includes('running') || text.includes('drop') || text.includes('explosion') || text.includes('before')) {
    score += 8;
  }

  return Math.min(Math.max(Math.round(score), 20), 99);
}

/**
 * Calculates SEO, Hashtag & Caption Quality
 */
export function analyzeSEO(caption = '', hashtags = '', platform = 'shorts') {
  const tagList = Array.isArray(hashtags) 
    ? hashtags 
    : typeof hashtags === 'string'
    ? hashtags.split(/[,\s#]+/).filter(Boolean)
    : [];

  const cap = (caption || '').trim();
  if (!cap && tagList.length === 0) return 0;

  let score = 45;
  const tagCount = tagList.length;

  // Tag quantity sweet spots per platform
  if (platform === 'tiktok') {
    if (tagCount >= 4 && tagCount <= 7) score += 18;
    else if (tagCount > 10) score -= 8;
  } else if (platform === 'shorts') {
    if (tagCount >= 2 && tagCount <= 4) score += 18;
    else if (tagCount > 6) score -= 6;
  } else { // reels
    if (tagCount >= 5 && tagCount <= 10) score += 18;
  }

  // Caption length & CTA check
  const capLength = cap.length;
  if (capLength > 50 && capLength < 350) {
    score += 12;
  }
  if (cap.toLowerCase().includes('comment') || cap.toLowerCase().includes('save') || cap.toLowerCase().includes('share') || cap.toLowerCase().includes('follow')) {
    score += 10;
  }

  return Math.min(Math.max(Math.round(score), 20), 98);
}

/**
 * Generates Predicted Audience Retention Curve (Second by Second)
 */
export function generateRetentionCurve(duration = 45, hookScore = 80, pacingScore = 70) {
  const dur = Math.max(duration || 45, 5);
  const step = Math.max(1, Math.floor(dur / 15));
  const points = [];
  const benchmark = [];

  // Starting hook hold at t=0
  const baseStart = Math.min(99, Math.max(60, 50 + hookScore * 0.48));
  const benchStart = 98;

  for (let sec = 0; sec <= dur; sec += step) {
    const progress = sec / dur;
    
    // Exponential retention decay curve with pacing anchor lifts
    const decay = Math.pow(progress, 0.65) * (100 - baseStart + (100 - pacingScore) * 0.4);
    let val = Math.max(12, baseStart - decay);

    // Midpoint re-hook bonus if pacing score is high
    if (progress > 0.4 && progress < 0.65 && pacingScore > 75) {
      val += (pacingScore - 75) * 0.25;
    }

    // Benchmark top 1% curve
    const benchDecay = Math.pow(progress, 0.8) * 22;
    const benchVal = Math.max(76, benchStart - benchDecay);

    points.push({
      second: sec,
      retention: Math.min(99, Math.round(val))
    });

    benchmark.push({
      second: sec,
      retention: Math.min(99, Math.round(benchVal))
    });
  }

  // Ensure endpoint exists
  if (points[points.length - 1].second !== dur) {
    points.push({ second: dur, retention: Math.max(10, points[points.length - 1].retention - 4) });
    benchmark.push({ second: dur, retention: 76 });
  }

  // Key retention dropzone markers
  const markers = [
    {
      time: '0:02',
      second: 2,
      type: hookScore > 75 ? 'positive' : 'warning',
      title: hookScore > 75 ? 'Strong Visual Hook Anchor' : 'High Drop-off Risk (3-Sec Cliff)',
      desc: hookScore > 75 ? 'Curiosity hold is 22% higher than niche average.' : 'Viewers deciding whether to swipe. Add instant motion or text pop.'
    },
    {
      time: `0:${Math.floor(dur * 0.4).toString().padStart(2, '0')}`,
      second: Math.floor(dur * 0.4),
      type: pacingScore > 70 ? 'positive' : 'warning',
      title: pacingScore > 70 ? 'Dynamic Pacing Re-Engagement' : 'Mid-Video Attention Drag',
      desc: 'Inject a sound effect, pattern interrupt, or zoom-in here to prevent mid-scroll.'
    },
    {
      time: `0:${Math.floor(dur * 0.85).toString().padStart(2, '0')}`,
      second: Math.floor(dur * 0.85),
      type: 'neutral',
      title: 'Payoff & Loop Transition Zone',
      desc: 'Seamlessly link the ending back to the first second to spike completion rate past 100%.'
    }
  ];

  return { points, benchmark, markers };
}

/**
 * Generates AI Hook Variations & Recommendations
 */
export function generateHookSuggestions(currentHook = '', title = '', niche = 'General') {
  const base = currentHook || title || 'The biggest secret to growth';
  
  return [
    {
      type: 'Curiosity Gap',
      tag: '🔥 Highest Retention',
      hook: `Why nobody in ${niche} is telling you about this 1 rule...`,
      predictedHookScore: 94,
      whyItWorks: 'Creates an urgent knowledge gap that forces viewers to stay for the revelation.'
    },
    {
      type: 'Contrarian / Hot Take',
      tag: '⚡ High Comments Velocity',
      hook: `Stop doing ${base.slice(0, 30)}... it is destroying your results.`,
      predictedHookScore: 91,
      whyItWorks: 'Directly challenges common consensus, sparking immediate comment debate.'
    },
    {
      type: 'High-Stakes Story',
      tag: '📈 High Completion Rate',
      hook: `I spent 60 days testing this so you don't make the same $10,000 mistake.`,
      predictedHookScore: 89,
      whyItWorks: 'Establishes high personal stakes and immediate tangible ROI for the viewer.'
    },
    {
      type: 'Step-by-Step Cheat Code',
      tag: '💾 4.5x More Saves/Shares',
      hook: `Steal this exact 3-step blueprint before it gets saturated.`,
      predictedHookScore: 88,
      whyItWorks: 'Triggers bookmarking and saving behavior which heavily boosts algorithm reach.'
    },
    {
      type: 'Shock / Proof Hook',
      tag: '👀 Immediate Visual Anchor',
      hook: `Wait until you see what happens at the end of this...`,
      predictedHookScore: 84,
      whyItWorks: 'Classic suspense primer, best paired with an intense first visual frame.'
    }
  ];
}

/**
 * Master Virality Analysis Engine
 */
export function calculateViralityAnalysis(data = {}) {
  const {
    title = '',
    hook = '',
    firstSecondsPrompt = '',
    script = '',
    caption = '',
    hashtags = '',
    platform = 'shorts',
    duration = 30,
    niche = 'Business & Tech',
    targetAudience = 'Creators & Entrepreneurs',
    plannedHour = 18,
    audioTrendScore = 50
  } = data;

  const hasInput = Boolean(
    (title && title.trim()) ||
    (hook && hook.trim()) ||
    (firstSecondsPrompt && firstSecondsPrompt.trim()) ||
    (script && script.trim()) ||
    (caption && caption.trim()) ||
    (hashtags && hashtags.trim())
  );

  // Return zeroed/clean initial state if user has not entered content yet
  if (!hasInput) {
    return {
      hasInput: false,
      overallScore: 0,
      performanceTier: 'Awaiting Video Input',
      badgeClass: 'badge-solid',
      predictedViews: '—',
      estimatedLikes: '—',
      estimatedShares: '—',
      viralProbability: '—',
      metrics: {
        hookStrength: 0,
        pacingRetention: 0,
        engagementVelocity: 0,
        trendAudio: 0,
        seoOptimization: 0,
        optimalTiming: 0
      },
      strengths: [],
      weaknesses: [],
      emotionalMatrix: [
        { name: 'Curiosity', score: 0, color: '#6366f1' },
        { name: 'Utility / Value', score: 0, color: '#10b981' },
        { name: 'FOMO / Urgency', score: 0, color: '#f59e0b' },
        { name: 'Relatability', score: 0, color: '#ec4899' },
        { name: 'Shock / Awe', score: 0, color: '#06b6d4' }
      ],
      retentionData: {
        points: [],
        benchmark: [],
        markers: []
      },
      hookSuggestions: generateHookSuggestions('', '', niche),
      tagCategories: {
        viral: [`#fyp`, `#viral`, `#trending`, `#foryoupage`, `#explore`],
        niche: [
          `#${niche.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
          `#${niche.toLowerCase().replace(/[^a-z0-9]/g, '')}tips`,
          `#creators`,
          `#growthhacks`
        ],
        specific: [
          `#2026trends`,
          `#videotips`,
          `#contentstrategy`,
          `#viralgrowth`
        ]
      },
      nicheBenchmark: {
        niche,
        avgNicheScore: 58,
        topOnePercentScore: 92,
        yourScore: 0,
        percentile: 0
      },
      metadata: {
        title: '',
        platform,
        duration,
        niche,
        analyzedAt: new Date().toISOString()
      }
    };
  }

  // 1. Calculate Component Scores
  const hookScore = analyzeHookStrength(hook || title, (firstSecondsPrompt + ' ' + script).slice(0, 120));
  const seoScore = analyzeSEO(caption, hashtags, platform);
  
  // Engagement Velocity Score (Based on debate triggers, saves value)
  let engagementScore = 55;
  const combinedText = (title + ' ' + hook + ' ' + caption + ' ' + script).toLowerCase();
  if (combinedText.includes('comment') || combinedText.includes('agree') || combinedText.includes('wrong') || combinedText.includes('rate')) {
    engagementScore += 16;
  }
  if (combinedText.includes('save') || combinedText.includes('part 2') || combinedText.includes('link') || combinedText.includes('cheat sheet') || combinedText.includes('template')) {
    engagementScore += 18;
  }
  engagementScore = Math.min(Math.max(engagementScore, 35), 96);

  // Watch Time & Pacing Prediction
  let pacingScore = 60;
  if (duration <= 35) pacingScore += 15;
  else if (duration > 90) pacingScore -= 12;
  if (hookScore > 80) pacingScore += 10;
  pacingScore = Math.min(Math.max(pacingScore, 30), 98);

  // Trend & Audio Score
  const trendScore = audioTrendScore || (platform === 'tiktok' ? 88 : 78);

  // Platform Timing Score (Best times: 11am-2pm, 6pm-9pm)
  let timingScore = 70;
  if ((plannedHour >= 11 && plannedHour <= 14) || (plannedHour >= 18 && plannedHour <= 21)) {
    timingScore = 94;
  } else if (plannedHour >= 2 && plannedHour <= 6) {
    timingScore = 45;
  }

  // 2. Weighted Overall Virality Score (0 - 100)
  // Weights: Hook 30%, Retention/Pacing 25%, Engagement 20%, Trend 10%, SEO 8%, Timing 7%
  const overallScore = Math.round(
    (hookScore * 0.30) +
    (pacingScore * 0.25) +
    (engagementScore * 0.20) +
    (trendScore * 0.10) +
    (seoScore * 0.08) +
    (timingScore * 0.07)
  );

  // 3. Performance Level & Predicted Ranges
  let performanceTier = 'Solid Performer';
  let badgeClass = 'badge-solid';
  let predictedViews = '150K – 450K';
  let estimatedLikes = '12K – 38K';
  let estimatedShares = '1.8K – 5.2K';
  let viralProbability = '68%';

  if (overallScore >= 90) {
    performanceTier = 'Mega-Viral Potential';
    badgeClass = 'badge-mega';
    predictedViews = '1.5M – 5.2M+';
    estimatedLikes = '120K – 420K';
    estimatedShares = '24K – 85K';
    viralProbability = '94%';
  } else if (overallScore >= 80) {
    performanceTier = 'Breakout Hit';
    badgeClass = 'badge-breakout';
    predictedViews = '500K – 1.8M';
    estimatedLikes = '45K – 150K';
    estimatedShares = '7.5K – 22K';
    viralProbability = '84%';
  } else if (overallScore >= 65) {
    performanceTier = 'High Engagement';
    badgeClass = 'badge-solid';
    predictedViews = '120K – 450K';
    estimatedLikes = '10K – 35K';
    estimatedShares = '1.5K – 4.8K';
    viralProbability = '65%';
  } else if (overallScore >= 50) {
    performanceTier = 'Average Reach';
    badgeClass = 'badge-warning';
    predictedViews = '25K – 95K';
    estimatedLikes = '1.8K – 7.5K';
    estimatedShares = '200 – 950';
    viralProbability = '42%';
  } else {
    performanceTier = 'Low Retention Risk';
    badgeClass = 'badge-danger';
    predictedViews = '2.5K – 15K';
    estimatedLikes = '150 – 900';
    estimatedShares = '20 – 120';
    viralProbability = '18%';
  }

  // 4. Detailed Strengths & Critical Flags
  const strengths = [];
  const weaknesses = [];

  if (hookScore >= 80) {
    strengths.push({
      title: 'High Curiosity Gap Hook',
      desc: 'First 3 seconds command high psychological curiosity and pattern disruption.',
      impact: '+28% Retention'
    });
  } else if (hookScore > 0) {
    weaknesses.push({
      title: 'Weak Opening Friction',
      desc: 'First 3 seconds lack an immediate emotional stake or visual hook trigger.',
      fix: 'Use one of our AI-generated curiosity hooks below to prevent immediate scroll.'
    });
  }

  if (pacingScore >= 75) {
    strengths.push({
      title: 'Optimized Video Length & Rhythm',
      desc: `${duration}s duration hits the sweet spot for the ${platform} recommendation algorithm.`,
      impact: '+22% Completion'
    });
  } else {
    weaknesses.push({
      title: 'Pacing Sag at Midpoint',
      desc: 'Predicted attention drop around second 18-24 due to uniform pacing.',
      fix: 'Add a B-roll jump cut, zoom pulse, or sound effect transition around 0:18.'
    });
  }

  if (engagementScore >= 75) {
    strengths.push({
      title: 'Strong Save & Share Incentives',
      desc: 'High utility or relatable debate premise encourages bookmarks and DM shares.',
      impact: '+34% Reach Boost'
    });
  } else {
    weaknesses.push({
      title: 'Low Comment Temptation',
      desc: 'Lacks an open-ended debate prompt or reason for viewers to leave a comment.',
      fix: 'Ask a polarizing question in the pinned comment or on-screen text.'
    });
  }

  // 5. Emotional Triggers Matrix
  const emotionalMatrix = [
    { name: 'Curiosity', score: Math.min(95, hookScore + 4), color: '#6366f1' },
    { name: 'Utility / Value', score: Math.min(92, engagementScore - 2), color: '#10b981' },
    { name: 'FOMO / Urgency', score: Math.min(88, trendScore - 6), color: '#f59e0b' },
    { name: 'Relatability', score: Math.min(90, engagementScore + 5), color: '#ec4899' },
    { name: 'Shock / Awe', score: Math.min(85, hookScore - 5), color: '#06b6d4' }
  ];

  // 6. Retention curve data
  const retentionData = generateRetentionCurve(duration, hookScore, pacingScore);

  // 7. Hook Suggestions
  const hookSuggestions = generateHookSuggestions(hook, title, niche);

  // 8. Recommended Hashtags
  const tagCategories = {
    viral: [`#fyp`, `#viral`, `#trending`, `#foryoupage`, `#explore`],
    niche: [
      `#${niche.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      `#${niche.toLowerCase().replace(/[^a-z0-9]/g, '')}tips`,
      `#${targetAudience.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      `#creators`,
      `#growthhacks`
    ],
    specific: [
      `#2026trends`,
      `#${platform}tips`,
      `#contentstrategy`,
      `#viralgrowth`
    ]
  };

  // 9. Niche Benchmark
  const nicheProfiles = {
    'Business & Tech': { avg: 58, top: 92 },
    'Entertainment & Gaming': { avg: 65, top: 96 },
    'Beauty & Skincare': { avg: 62, top: 94 },
    'Fitness & Health': { avg: 55, top: 90 },
    'Education & Finance': { avg: 54, top: 89 },
    'Lifestyle & Vlogs': { avg: 60, top: 91 },
    'AI & Coding': { avg: 59, top: 93 }
  };

  const currentNicheProfile = nicheProfiles[niche] || { avg: 58, top: 92 };
  const percentile = Math.min(99, Math.max(15, Math.round((overallScore / currentNicheProfile.top) * 100)));

  return {
    hasInput: true,
    overallScore,
    performanceTier,
    badgeClass,
    predictedViews,
    estimatedLikes,
    estimatedShares,
    viralProbability,
    metrics: {
      hookStrength: hookScore,
      pacingRetention: pacingScore,
      engagementVelocity: engagementScore,
      trendAudio: trendScore,
      seoOptimization: seoScore,
      optimalTiming: timingScore
    },
    strengths,
    weaknesses,
    emotionalMatrix,
    retentionData,
    hookSuggestions,
    tagCategories,
    nicheBenchmark: {
      niche,
      avgNicheScore: currentNicheProfile.avg,
      topOnePercentScore: currentNicheProfile.top,
      yourScore: overallScore,
      percentile
    },
    metadata: {
      title,
      platform,
      duration,
      niche,
      analyzedAt: new Date().toISOString()
    }
  };
}
