import React from 'react';
import { FOOD_CATEGORIES } from '../utils/dietPresets';
import '../styles/DietTrackingScreen.css';

/**
 * Diet Tracking Screen
 * Shows food categories with progress bars, intake buttons, and targets
 */
const DietTrackingScreen = ({ dietTargets = {}, dietIntake = {}, onUpdateIntake }) => {
  const handleAddServing = (categoryKey) => {
    const newCount = (dietIntake[categoryKey] || 0) + 1;
    if (onUpdateIntake) {
      onUpdateIntake(categoryKey, newCount);
    }
  };

  const handleResetDay = () => {
    if (window.confirm('Reset all daily intake for today?')) {
      // Reset all categories to 0
      Object.keys(FOOD_CATEGORIES).forEach(categoryKey => {
        if (onUpdateIntake) {
          onUpdateIntake(categoryKey, 0);
        }
      });
    }
  };

  const getProgressPercentage = (categoryKey, currentCount) => {
    const target = dietTargets[categoryKey];
    if (!target || target.value === null) return 0;
    return Math.min((currentCount / target.value) * 100, 100);
  };

  const getWarningStatus = (categoryKey, currentCount) => {
    const target = dietTargets[categoryKey];
    if (!target || target.value === null) return null;

    if (currentCount >= target.value) return 'success';
    if (currentCount >= target.value * 0.75) return 'warning';
    return null;
  };

  return (
    <div className="diet-tracking-screen">
      <div className="diet-tracking-container">
        {/* Disclaimer Message */}
        <div className="diet-disclaimer-box" role="region" aria-label="Dietary guidelines disclaimer">
          <span className="disclaimer-icon">ℹ️</span>
          <p className="disclaimer-text">
            These are general healthy eating guidelines for adults aged 60 and above, measured weekly. Please adjust the amounts according to your doctor's advice.
          </p>
        </div>

        <div className="diet-header">
          <h1 className="diet-title">Daily Food Tracking</h1>
          <button
            onClick={handleResetDay}
            className="reset-btn"
            aria-label="Reset daily intake"
            title="Reset all intake for today"
          >
            ↻ Reset
          </button>
        </div>

        <div className="diet-categories">
          {Object.entries(FOOD_CATEGORIES).map(([key, category]) => {
            const target = dietTargets[key];
            const currentCount = dietIntake[key] || 0;
            const progressPercent = getProgressPercentage(key, currentCount);
            const warning = getWarningStatus(key, currentCount);
            const isNoLimit = !target || target.value === null;

            return (
              <div
                key={key}
                className={`diet-category-card ${warning ? `warning-${warning}` : ''}`}
              >
                <div className="category-header">
                  <div className="category-title-section">
                    <span className="category-icon">{category.icon}</span>
                    <div>
                      <h3 className="category-name">{category.name}</h3>
                      <p className="category-target">
                        {isNoLimit
                          ? 'No Limit'
                          : `${target.value} ${target.unit}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddServing(key)}
                    className="add-serving-btn"
                    aria-label={`Add serving of ${category.name}`}
                    title={`Log a serving of ${category.name}`}
                  >
                    +
                  </button>
                </div>

                {!isNoLimit && (
                  <div className="progress-section">
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${progressPercent}%` }}
                        role="progressbar"
                        aria-valuenow={currentCount}
                        aria-valuemin="0"
                        aria-valuemax={target.value}
                        aria-label={`${currentCount} of ${target.value} ${target.unit}`}
                      />
                    </div>
                    <p className="progress-text">
                      {currentCount} / {target.value} {target.unit}
                    </p>
                  </div>
                )}

                {isNoLimit && (
                  <div className="no-limit-section">
                    <p className="no-limit-count">Current: {currentCount}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DietTrackingScreen;
