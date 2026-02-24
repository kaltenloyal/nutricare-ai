import React from 'react';
import '../styles/ScanScreen.css';

/**
 * Food Scanner Screen
 * Placeholder for future AI food scanning feature
 */
const ScanScreen = () => {
  return (
    <div className="scan-screen">
      <div className="scan-container">
        <div className="scan-content">
          <div className="scan-icon">📷</div>
          <h1 className="scan-title">Food Scanner</h1>
          <p className="scan-subtitle">Coming Soon</p>
          <p className="scan-description">
            Snap a photo of your meal and we'll help you track your nutrition automatically
          </p>
          <div className="scan-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Automatic food detection</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Portion size estimation</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text">One-tap logging</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanScreen;
