import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sparkles, Zap, Moon, Sun, ShieldCheck, Share2, Activity, Split, Award, Tag, CheckCircle2 } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onOpenExport }) {
  return (
    <header className="navbar">
      <div className="max-width-container navbar-content">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="brand-icon-box">
            <Zap size={18} fill="currentColor" />
          </div>
          <span>Viral<span style={{ color: 'var(--brand-primary-light)' }}>Pulse</span> AI</span>
        </Link>

        {/* Multi-Page Navigation Bar */}
        <nav>
          <ul className="nav-links-list">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`} end>
                <span>Virality Checker</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/hook-lab" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                <span>Hook Lab</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/ab-testing" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                <span>A/B Arena</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/retention-simulator" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                <span>Retention Lab</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/benchmarks" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                <span>Niche Benchmarks</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/seo-studio" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                <span>SEO Studio</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onOpenExport}
            title="Export Virality Scorecard"
          >
            <Share2 size={14} />
            <span>Scorecard</span>
          </button>

          <button
            type="button"
            className="btn btn-icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
