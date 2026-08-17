import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Moon,
  Sun,
  Share2,
  Activity,
  Split,
  Award,
  Search,
  Flame,
  Menu,
  X,
  Layers
} from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onOpenExport }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navItems = [
    { to: '/', label: 'Virality Checker', icon: Layers, end: true },
    { to: '/hook-lab', label: 'Hook Lab', icon: Flame, end: false },
    { to: '/ab-testing', label: 'A/B Arena', icon: Split, end: false },
    { to: '/retention-simulator', label: 'Retention Lab', icon: Activity, end: false },
    { to: '/benchmarks', label: 'Niche Benchmarks', icon: Award, end: false },
    { to: '/seo-studio', label: 'SEO Studio', icon: Search, end: false }
  ];

  return (
    <>
      <header className="navbar">
        <div className="max-width-container navbar-content">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo">
            <div className="brand-icon-box">
              <Zap size={18} fill="currentColor" />
            </div>
            <span>Viral<span style={{ color: 'var(--brand-primary-light)' }}>Pulse</span> AI</span>
          </Link>

          {/* Desktop Navigation Bar */}
          <nav aria-label="Desktop Navigation">
            <ul className="nav-links-list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                    end={item.end}
                  >
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
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

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      <div
        className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-Out Drawer Panel */}
      <aside
        className={`mobile-drawer-panel ${isMobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation Menu"
      >
        <div className="mobile-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
              <Zap size={16} fill="currentColor" />
            </div>
            <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-highlight)' }}>
              Viral<span style={{ color: 'var(--brand-primary-light)' }}>Pulse</span>
            </span>
          </div>

          <button
            type="button"
            className="btn btn-icon"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{ width: '36px', height: '36px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <ul className="mobile-drawer-nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
                  end={item.end}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={18} color="var(--brand-primary)" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Mobile Drawer Quick Actions Footer */}
        <div className="mobile-drawer-footer">
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenExport();
            }}
          >
            <Share2 size={16} />
            <span>Export Scorecard</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
      </aside>
    </>
  );
}

