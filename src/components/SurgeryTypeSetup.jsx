import React, { useState } from 'react';
import { SURGERY_TYPES, DIET_PRESETS } from '../utils/dietPresets';
import { storageUtils } from '../utils/storage';
import '../styles/SurgeryTypeSetup.css';

/**
 * Surgery Type Setup Screen
 * Allows caregiver to select surgery type for diet presets
 */
const SurgeryTypeSetup = ({ onComplete }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelectType = (typeKey) => {
    setSelectedType(typeKey);
  };

  const handleContinue = () => {
    if (!selectedType) {
      alert('Please select a surgery type');
      return;
    }

    const preset = DIET_PRESETS[selectedType];
    const surgeryData = {
      type: selectedType,
      label: preset.label,
      selectedAt: new Date().toISOString(),
    };

    storageUtils.saveSurgeryType(surgeryData);
    storageUtils.saveDietTargets(preset.defaults);

    onComplete(surgeryData);
  };

  return (
    <div className="surgery-type-setup">
      <div className="surgery-type-container">
        <h1 className="setup-title">Select Patient Type</h1>
        <p className="setup-subtitle">
          This helps us customize nutrition recommendations
        </p>

        <div className="surgery-types-grid">
          {Object.entries(DIET_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              className={`surgery-type-btn ${selectedType === key ? 'selected' : ''}`}
              onClick={() => handleSelectType(key)}
              aria-pressed={selectedType === key}
              aria-label={preset.label}
            >
              <div
                className="surgery-type-icon"
                style={{ background: preset.color }}
              >
                {/* Icon based on type */}
                {key === 'cardiac' && '❤️'}
                {key === 'orthopedic' && '🦴'}
                {key === 'general' && '⚕️'}
                {key === 'chronic' && '⏱️'}
              </div>
              <div className="surgery-type-name">{preset.label}</div>
            </button>
          ))}
        </div>

        <button onClick={handleContinue} className="continue-btn">
          Continue
        </button>
      </div>
    </div>
  );
};

export default SurgeryTypeSetup;
