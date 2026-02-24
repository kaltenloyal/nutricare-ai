import React from 'react';
import { formatTimeWithPeriod } from '../utils/medicationTiming';
import '../styles/MedicationCard.css';

/**
 * Medication Card Component
 * Displays: name, scheduled times, food requirement, drowsy warning badge
 */
const MedicationCard = ({ medication, onDelete }) => {
  const getFoodRequirementText = (requirement) => {
    switch (requirement) {
      case 'with-food':
        return 'Take with Food';
      case 'empty-stomach':
        return 'Empty Stomach';
      case 'no-restriction':
        return "Doesn't Matter";
      default:
        return requirement;
    }
  };

  const getFoodRequirementIcon = (requirement) => {
    switch (requirement) {
      case 'with-food':
        return '🍽️';
      case 'empty-stomach':
        return '⏰';
      case 'no-restriction':
        return '✓';
      default:
        return '';
    }
  };

  return (
    <div className="medication-card">
      <div className="medication-card-header">
        <div className="medication-card-title-section">
          <h3 className="medication-card-title">{medication.name}</h3>
          {medication.isDrowsy && (
            <span className="drowsy-badge" aria-label="May cause drowsiness">
              ⚠️ Drowsy
            </span>
          )}
        </div>
        <button
          onClick={() => onDelete(medication.id)}
          className="delete-btn"
          aria-label={`Delete ${medication.name}`}
          title="Delete medication"
        >
          ✕
        </button>
      </div>

      <div className="medication-card-content">
        {/* Scheduled Times */}
        <div className="medication-info-row">
          <span className="info-label">Scheduled Times:</span>
          <div className="times-list">
            {medication.scheduledTimes && medication.scheduledTimes.length > 0 ? (
              medication.scheduledTimes.map((time, index) => (
                <span key={index} className="time-badge">
                  {formatTimeWithPeriod(time)}
                </span>
              ))
            ) : (
              <span className="no-data">No times scheduled</span>
            )}
          </div>
        </div>

        {/* Food Requirement */}
        <div className="medication-info-row">
          <span className="info-label">How to take:</span>
          <span className="food-requirement-badge">
            {getFoodRequirementIcon(medication.foodRequirement)}{' '}
            {getFoodRequirementText(medication.foodRequirement)}
          </span>
        </div>

        {/* Frequency Info */}
        <div className="medication-info-row">
          <span className="info-label">Frequency:</span>
          <span className="frequency-badge">
            {medication.frequency}x per day
          </span>
        </div>
      </div>
    </div>
  );
};

export default MedicationCard;
