import React from 'react';
import '../styles/BottomNav.css';

/**
 * Bottom Navigation Tab Component
 * Allows switching between Medications, Scan, and Diet Tracking screens
 */
const BottomNav = ({ activeTab, onTabChange }) => {
  return (
    <div className="bottom-nav">
      <button
        className={`nav-tab ${activeTab === 'medications' ? 'active' : ''}`}
        onClick={() => onTabChange('medications')}
        aria-label="Medications tab"
        aria-pressed={activeTab === 'medications'}
      >
        <span className="nav-icon">💊</span>
        <span className="nav-label">Medications</span>
      </button>
      <button
        className={`nav-tab ${activeTab === 'scan' ? 'active' : ''}`}
        onClick={() => onTabChange('scan')}
        aria-label="Food Scanner tab"
        aria-pressed={activeTab === 'scan'}
      >
        <span className="nav-icon">📷</span>
        <span className="nav-label">Scan</span>
      </button>
      <button
        className={`nav-tab ${activeTab === 'diet' ? 'active' : ''}`}
        onClick={() => onTabChange('diet')}
        aria-label="Diet Tracking tab"
        aria-pressed={activeTab === 'diet'}
      >
        <span className="nav-icon">🥗</span>
        <span className="nav-label">Diet</span>
      </button>
    </div>
  );
};

export default BottomNav;
