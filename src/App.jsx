import React, { useState, useEffect } from 'react';
import MealTimeSetup from './components/MealTimeSetup';
import MedicationsScreen from './components/MedicationsScreen';
import AddMedicationForm from './components/AddMedicationForm';
import { storageUtils } from './utils/storage';
import { calculateMedicationTimes, getDefaultMealTimes } from './utils/medicationTiming';
import './App.css';

/**
 * Main App Component
 * Orchestrates the medication tracking feature with:
 * - Meal time setup (one-time)
 * - Medications list screen
 * - Add medication form
 */
function App() {
  // State management
  const [mealTimes, setMealTimes] = useState(null);
  const [medications, setMedications] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMealTimes = storageUtils.getMealTimes();
    const savedMedications = storageUtils.getMedications();

    if (savedMealTimes) {
      setMealTimes(savedMealTimes);
    }

    if (savedMedications && savedMedications.length > 0) {
      setMedications(savedMedications);
    }

    setIsLoading(false);
  }, []);

  // Handle meal time setup completion
  const handleMealTimesComplete = (times) => {
    setMealTimes(times);
  };

  // Handle add medication form submission
  const handleAddMedication = (medicationData) => {
    if (!mealTimes) {
      alert('Please set up meal times first');
      return;
    }

    // Calculate scheduled times based on frequency and drowsy flag
    const scheduledTimes = calculateMedicationTimes(
      medicationData.frequency,
      medicationData.isDrowsy,
      mealTimes
    );

    // Create complete medication object
    const completeMedication = {
      ...medicationData,
      scheduledTimes,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage and update state
    const updatedMedications = [
      ...medications,
      completeMedication,
    ];

    setMedications(updatedMedications);
    storageUtils.saveMedications(updatedMedications);
    setShowAddForm(false);
  };

  // Handle medication deletion
  const handleDeleteMedication = (id) => {
    const updatedMedications = medications.filter((med) => med.id !== id);
    setMedications(updatedMedications);
    storageUtils.saveMedications(updatedMedications);
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  // Show meal time setup if not completed
  if (!mealTimes) {
    return <MealTimeSetup onComplete={handleMealTimesComplete} />;
  }

  // Main medications screen
  return (
    <div className="app">
      <MedicationsScreen
        medications={medications}
        onAddClick={() => setShowAddForm(true)}
        onDeleteMedication={handleDeleteMedication}
      />

      {/* Add Medication Form Modal */}
      {showAddForm && (
        <AddMedicationForm
          mealTimes={mealTimes}
          onSave={handleAddMedication}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;
