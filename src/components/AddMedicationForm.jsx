import React, { useState } from 'react';
import '../styles/AddMedicationForm.css';

/**
 * Add Medication Form Component
 * Includes: name input, frequency dropdown, drowsy toggle, food selector, capsule count
 */
const AddMedicationForm = ({ mealTimes, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('1');
  const [isDrowsy, setIsDrowsy] = useState(false);
  const [foodRequirement, setFoodRequirement] = useState('');
  const [capsuleCount, setCapsuleCount] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Medication name is required';
    }

    if (!foodRequirement) {
      newErrors.foodRequirement = 'Please select a food requirement';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const medicationData = {
      name: name.trim(),
      frequency: parseInt(frequency),
      isDrowsy,
      foodRequirement,
      capsuleCount: capsuleCount ? parseInt(capsuleCount) : null,
    };

    onSave(medicationData);
  };

  return (
    <div className="add-medication-form-overlay">
      <div className="add-medication-form-container">
        <h2 className="form-title">Add New Medication</h2>

        <form onSubmit={handleSubmit} className="form">
          {/* Medication Name Input */}
          <div className="form-group">
            <label htmlFor="med-name" className="form-label">
              Medication Name
            </label>
            <input
              id="med-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors({ ...errors, name: '' });
                }
              }}
              placeholder="e.g., Aspirin, Metformin"
              className={`form-input ${errors.name ? 'error' : ''}`}
              aria-label="Medication name"
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="error-message">
                {errors.name}
              </span>
            )}
          </div>

          {/* Frequency Dropdown */}
          <div className="form-group">
            <label htmlFor="frequency" className="form-label">
              How many times per day?
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="form-select"
              aria-label="Medication frequency"
            >
              <option value="1">Once a day</option>
              <option value="2">Twice a day</option>
              <option value="3">Three times a day</option>
              <option value="4">Four times a day</option>
            </select>
          </div>

          {/* Drowsy Toggle */}
          <div className="form-group">
            <label className="form-label">Does it make you drowsy?</label>
            <div className="toggle-container">
              <button
                type="button"
                className={`toggle-btn ${!isDrowsy ? 'active' : ''}`}
                onClick={() => setIsDrowsy(false)}
                aria-pressed={!isDrowsy}
                aria-label="No drowsiness"
              >
                No
              </button>
              <button
                type="button"
                className={`toggle-btn ${isDrowsy ? 'active' : ''}`}
                onClick={() => setIsDrowsy(true)}
                aria-pressed={isDrowsy}
                aria-label="Yes, causes drowsiness"
              >
                Yes
              </button>
            </div>
            {isDrowsy && (
              <p className="drowsy-note">
                ⚠️ This medication will be scheduled for later in the day
              </p>
            )}
          </div>

          {/* Food Requirement Selector */}
          <div className="form-group">
            <label className="form-label food-requirement-label">
              How should you take it?
            </label>
            {errors.foodRequirement && (
              <span id="food-error" className="error-message">
                {errors.foodRequirement}
              </span>
            )}
            <div className="food-options-grid">
              <button
                type="button"
                className={`food-option-btn ${
                  foodRequirement === 'with-food' ? 'selected' : ''
                } ${errors.foodRequirement ? 'error' : ''}`}
                onClick={() => {
                  setFoodRequirement('with-food');
                  if (errors.foodRequirement) {
                    setErrors({ ...errors, foodRequirement: '' });
                  }
                }}
                aria-pressed={foodRequirement === 'with-food'}
                aria-label="Take with food"
              >
                <div className="food-option-icon">🍽️</div>
                <div className="food-option-text">Take with Food</div>
              </button>

              <button
                type="button"
                className={`food-option-btn ${
                  foodRequirement === 'empty-stomach' ? 'selected' : ''
                } ${errors.foodRequirement ? 'error' : ''}`}
                onClick={() => {
                  setFoodRequirement('empty-stomach');
                  if (errors.foodRequirement) {
                    setErrors({ ...errors, foodRequirement: '' });
                  }
                }}
                aria-pressed={foodRequirement === 'empty-stomach'}
                aria-label="Take on empty stomach"
              >
                <div className="food-option-icon">⏰</div>
                <div className="food-option-text">Empty Stomach</div>
              </button>

              <button
                type="button"
                className={`food-option-btn ${
                  foodRequirement === 'no-restriction' ? 'selected' : ''
                } ${errors.foodRequirement ? 'error' : ''}`}
                onClick={() => {
                  setFoodRequirement('no-restriction');
                  if (errors.foodRequirement) {
                    setErrors({ ...errors, foodRequirement: '' });
                  }
                }}
                aria-pressed={foodRequirement === 'no-restriction'}
                aria-label="Doesn't matter"
              >
                <div className="food-option-icon">✓</div>
                <div className="food-option-text">Doesn't Matter</div>
              </button>
            </div>
          </div>

          {/* Capsule Count Input */}
          <div className="form-group">
            <label htmlFor="capsule-count" className="form-label">
              How many capsules? (Optional)
            </label>
            <input
              id="capsule-count"
              type="number"
              value={capsuleCount}
              onChange={(e) => setCapsuleCount(e.target.value)}
              placeholder="e.g., 30"
              className="form-input"
              aria-label="Capsule count"
              min="1"
            />
            <p className="form-hint">
              Leave blank if not tracking capsules
            </p>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-cancel"
              aria-label="Cancel adding medication"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-save"
              aria-label="Save medication"
            >
              Save Medication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicationForm;
