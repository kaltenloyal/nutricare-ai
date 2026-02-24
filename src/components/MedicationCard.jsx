import React, { useState } from 'react';
import { formatTimeWithPeriod } from '../utils/medicationTiming';
import '../styles/MedicationCard.css';

/**
 * Medication Card Component
 * Displays: name, scheduled times, food requirement, drowsy warning badge, capsule count
 */
const MedicationCard = ({
  medication,
  onDelete,
  onTaken,
  onRefill,
  showRefillModal,
}) => {
  const [showRefillInput, setShowRefillInput] = useState(false);
  const [refillAmount, setRefillAmount] = useState('');

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

  const getCapsuleStatus = () => {
    if (!medication.capsuleCount) return null;
    if (medication.capsuleCount === 0) return 'empty';
    if (medication.capsuleCount <= 3) return 'critical';
    if (medication.capsuleCount <= 5) return 'warning';
    return null;
  };

  const handleRefillSubmit = () => {
    if (!refillAmount || parseInt(refillAmount) <= 0) {
      alert('Please enter a valid number');
      return;
    }
    onRefill(medication.id, parseInt(refillAmount));
    setRefillAmount('');
    setShowRefillInput(false);
  };

  const capsuleStatus = getCapsuleStatus();

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
          {capsuleStatus === 'critical' && (
            <span
              className="capsule-badge critical"
              aria-label="Refill needed soon"
            >
              🔴 Refill
            </span>
          )}
          {capsuleStatus === 'warning' && (
            <span
              className="capsule-badge warning"
              aria-label="Low supply"
            >
              🟡 Low
            </span>
          )}
          {capsuleStatus === 'empty' && (
            <span
              className="capsule-badge empty"
              aria-label="No capsules remaining"
            >
              ⚫ Empty
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

        {/* Frequency Info */}
        <div className="medication-info-row">
          <span className="info-label">Frequency:</span>
          <span className="frequency-badge">
            {medication.frequency}x per day
          </span>
        </div>

        {/* Capsule Count */}
        {medication.capsuleCount !== undefined &&
          medication.capsuleCount !== null && (
            <div className="medication-info-row">
              <span className="info-label">Capsules Remaining:</span>
              <div className="capsule-info">
                <span className={`capsule-count ${capsuleStatus || ''}`}>
                  {medication.capsuleCount} capsules
                </span>
                {capsuleStatus === 'critical' && (
                  <div className="refill-notification">
                    <p className="refill-message">⚠️ Needs refilling!</p>
                    {!showRefillInput && (
                      <button
                        onClick={() => setShowRefillInput(true)}
                        className="refill-btn"
                        aria-label={`Refill ${medication.name}`}
                      >
                        Refill Now
                      </button>
                    )}
                  </div>
                )}
                {showRefillInput && (
                  <div className="refill-input-section">
                    <input
                      type="number"
                      value={refillAmount}
                      onChange={(e) => setRefillAmount(e.target.value)}
                      placeholder="Enter new count"
                      className="refill-input"
                      min="1"
                    />
                    <div className="refill-buttons">
                      <button
                        onClick={handleRefillSubmit}
                        className="refill-confirm-btn"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => {
                          setShowRefillInput(false);
                          setRefillAmount('');
                        }}
                        className="refill-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Taken Button */}
        {onTaken && (
          <button
            onClick={() => onTaken(medication.id)}
            className="taken-btn"
            aria-label={`Mark ${medication.name} as taken`}
          >
            ✓ Taken
          </button>
        )}
      </div>
    </div>
  );
};

export default MedicationCard;

