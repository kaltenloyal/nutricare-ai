import React from 'react';
import MedicationCard from './MedicationCard';
import '../styles/MedicationsScreen.css';

/**
 * Main Medications Screen Component
 * Displays list of saved medications with Add button
 */
const MedicationsScreen = ({
  medications = [],
  onAddClick,
  onDeleteMedication,
}) => {
  const handleDelete = (id) => {
    if (onDeleteMedication) {
      onDeleteMedication(id);
    }
  };

  return (
    <div className="medications-screen">
      <div className="medications-screen-container">
        {/* Header Section */}
        <div className="medications-header">
          <h1 className="medications-title">My Medications</h1>
          <button
            onClick={onAddClick}
            className="add-medication-btn"
            aria-label="Add new medication"
          >
            <span className="btn-icon">+</span>
            <span className="btn-text">Add Medication</span>
          </button>
        </div>

        {/* Medications List */}
        <div className="medications-list-container">
          {medications && medications.length > 0 ? (
            <div className="medications-list">
              {medications.map((medication) => (
                <MedicationCard
                  key={medication.id}
                  medication={medication}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">💊</div>
              <h2 className="empty-state-title">No Medications Yet</h2>
              <p className="empty-state-message">
                Start by adding your first medication to get organized
              </p>
              <button
                onClick={onAddClick}
                className="empty-state-btn"
                aria-label="Add your first medication"
              >
                Add Your First Medication
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationsScreen;
