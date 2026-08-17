import React, { useState } from 'react';
import { Calendar, Clock, Globe, Bell, CheckCircle } from 'lucide-react';

export default function BestPostingTimesCard({ platform, plannedHour }) {
  const [scheduledAlert, setScheduledAlert] = useState(false);
  const [timezone, setTimezone] = useState('EST');

  // Platform specific time recommendations
  const platformTimes = {
    shorts: {
      peak1: '2:00 PM – 5:00 PM',
      peak2: '7:00 PM – 10:00 PM',
      bestDays: 'Thursday, Friday & Sunday',
      why: 'Highest YouTube viewer activity occurs during commute and evening wind-down.'
    },
    tiktok: {
      peak1: '6:00 AM – 9:00 AM',
      peak2: '7:00 PM – 11:00 PM',
      bestDays: 'Tuesday, Thursday & Saturday',
      why: 'Early morning wake-up scrolls and late-night binge watching generate fast algorithmic waves.'
    },
    reels: {
      peak1: '11:00 AM – 2:00 PM',
      peak2: '6:00 PM – 9:00 PM',
      bestDays: 'Wednesday, Friday & Sunday',
      why: 'Lunch break and evening leisure on Instagram drive highest DM sharing volume.'
    }
  };

  const currentInfo = platformTimes[platform] || platformTimes.shorts;

  const handleSetReminder = () => {
    setScheduledAlert(true);
    setTimeout(() => setScheduledAlert(false), 3000);
  };

  // Mock 7-day heat map slots
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];

  const getHeatColor = (dayIdx, hourIdx) => {
    if ((dayIdx >= 3 && hourIdx === 3) || (dayIdx >= 4 && hourIdx === 4)) return '#10b981'; // Peak
    if (hourIdx === 1 || hourIdx === 3) return '#6366f1'; // Good
    return 'rgba(255, 255, 255, 0.08)'; // Moderate
  };

  return (
    <div className="glass-card" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} color="var(--brand-amber)" />
            <span>Optimal Posting Window & Heatmap</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Calibrated for {platform.toUpperCase()} audience activity
          </p>
        </div>

        <select
          className="select-control"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
        >
          <option value="EST">EST (New York)</option>
          <option value="PST">PST (Los Angeles)</option>
          <option value="GMT">GMT (London)</option>
          <option value="IST">IST (India)</option>
        </select>
      </div>

      {/* Recommended Peak Slots */}
      <div className="form-grid" style={{ marginBottom: '1.25rem' }}>
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>🔥 Primary Peak Slot</div>
          <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--brand-emerald)', marginTop: '0.2rem' }}>
            {currentInfo.peak1}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{currentInfo.bestDays}</div>
        </div>

        <div style={{
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>⚡ Secondary Spike</div>
          <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--brand-primary)', marginTop: '0.2rem' }}>
            {currentInfo.peak2}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Evening Audience Surge</div>
        </div>
      </div>

      {/* Interactive Micro Heatmap Grid */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '600' }}>
          Weekly Algorithm Activity Heatmap ({timezone}):
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.35rem', textAlign: 'center' }}>
          {days.map((day, dIdx) => (
            <div key={day} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{day}</span>
              {hours.map((_, hIdx) => (
                <div
                  key={hIdx}
                  title={`${day} slot ${hours[hIdx]}`}
                  style={{
                    height: '16px',
                    borderRadius: '3px',
                    backgroundColor: getHeatColor(dIdx, hIdx),
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-secondary btn-sm"
        style={{ width: '100%' }}
        onClick={handleSetReminder}
      >
        {scheduledAlert ? <CheckCircle size={15} color="#10b981" /> : <Bell size={15} />}
        <span>{scheduledAlert ? 'Reminder Scheduled to Notification Center!' : 'Notify Me at Peak Viral Hour'}</span>
      </button>
    </div>
  );
}
