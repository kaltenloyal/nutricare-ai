import React, { useState } from 'react';
import '../styles/ProfileSetup.css';

/**
 * Profile Setup Screen
 * Appears on first app launch to collect patient information
 */
const ProfileSetup = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [medicalNotes, setMedicalNotes] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Patient name is required';
    }

    if (!age || age < 18 || age > 120) {
      newErrors.age = 'Please enter a valid age (18-120)';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const profileData = {
      name: name.trim(),
      age: parseInt(age, 10),
      medicalNotes: medicalNotes.trim(),
      createdAt: new Date().toISOString(),
    };

    onComplete(profileData);
  };

  return (
    <div className="profile-setup">
      <div className="profile-setup-container">
        <div className="profile-header">
          <h1 className="profile-title">Welcome to NutriCare AI</h1>
          <p className="profile-subtitle">
            Let's set up patient information
          </p>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          {/* Patient Name Field */}
          <div className="form-group">
            <label htmlFor="patient-name" className="form-label">
              Patient Name <span className="required">*</span>
            </label>
            <input
              id="patient-name"
              type="text"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter patient's full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors({ ...errors, name: '' });
                }
              }}
              aria-label="Patient name"
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="error-message">
                {errors.name}
              </span>
            )}
          </div>

          {/* Age Field */}
          <div className="form-group">
            <label htmlFor="patient-age" className="form-label">
              Age <span className="required">*</span>
            </label>
            <input
              id="patient-age"
              type="number"
              className={`form-input ${errors.age ? 'error' : ''}`}
              placeholder="Enter age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                if (errors.age) {
                  setErrors({ ...errors, age: '' });
                }
              }}
              min="18"
              max="120"
              aria-label="Patient age"
              aria-describedby={errors.age ? 'age-error' : undefined}
            />
            {errors.age && (
              <span id="age-error" className="error-message">
                {errors.age}
              </span>
            )}
          </div>

          {/* Medical Notes Field */}
          <div className="form-group">
            <label htmlFor="medical-notes" className="form-label">
              Medical Notes <span className="optional">(Optional)</span>
            </label>
            <textarea
              id="medical-notes"
              className="form-textarea"
              placeholder="e.g. recovering from knee surgery, diabetic"
              value={medicalNotes}
              onChange={(e) => setMedicalNotes(e.target.value)}
              aria-label="Medical notes"
              rows="4"
            />
            <p className="form-hint">
              Information you'd like to remember for this patient
            </p>
          </div>

          {/* Save Button */}
          <button type="submit" className="save-btn">
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
