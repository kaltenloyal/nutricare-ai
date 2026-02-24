import React, { useState, useEffect } from 'react';
import Logo from './components/Logo';
import ProfileSetup from './components/ProfileSetup';
import MealTimeSetup from './components/MealTimeSetup';
import MedicationsScreen from './components/MedicationsScreen';
import DietTrackingScreen from './components/DietTrackingScreen';
import ScanScreen from './components/ScanScreen';
import AddMedicationForm from './components/AddMedicationForm';
import BottomNav from './components/BottomNav';
import { storageUtils } from './utils/storage';
import { calculateMedicationTimes } from './utils/medicationTiming';
import { DEFAULT_DIET_TARGETS } from './utils/dietPresets';
import './App.css';

/**
 * Main App Component
 * Orchestrates the full NutriCare AI application with:
 * - Profile setup (one-time, editable)
 * - Meal time setup (one-time)
 * - Medications management
 * - Diet tracking with default values for seniors aged 60+
 * - Food scanner (placeholder)
 * - Capsule counting
 */
function App() {
  // State management
  const [profile, setProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mealTimes, setMealTimes] = useState(null);
  const [medications, setMedications] = useState([]);
  const [dietTargets, setDietTargets] = useState(DEFAULT_DIET_TARGETS);
  const [dietIntake, setDietIntake] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('medications');
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfile = storageUtils.getProfile();
    const savedMealTimes = storageUtils.getMealTimes();
    const savedMedications = storageUtils.getMedications();
    const savedDietTargets = storageUtils.getDietTargets();
    const savedDietIntake = storageUtils.getDietIntake();

    if (savedProfile) {
      setProfile(savedProfile);
    }

    if (savedMealTimes) {
      setMealTimes(savedMealTimes);
    }

    if (savedMedications && savedMedications.length > 0) {
      setMedications(savedMedications);
    }

    if (savedDietTargets) {
      setDietTargets(savedDietTargets);
    } else {
      // Use defaults if not saved
      storageUtils.saveDietTargets(DEFAULT_DIET_TARGETS);
    }

    if (savedDietIntake) {
      setDietIntake(savedDietIntake);
    }

    setIsLoading(false);
  }, []);

  // Handle profile setup completion
  const handleProfileComplete = (profileData) => {
    setProfile(profileData);
    storageUtils.saveProfile(profileData);
    setShowProfileModal(false);
  };

  // Handle profile update
  const handleProfileUpdate = (profileData) => {
    setProfile(profileData);
    storageUtils.saveProfile(profileData);
    setShowProfileModal(false);
  };

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

  // Handle medication taken
  const handleMedicationTaken = (id) => {
    const updatedMedications = medications.map((med) => {
      if (med.id === id && med.capsuleCount !== null && med.capsuleCount > 0) {
        return { ...med, capsuleCount: med.capsuleCount - 1 };
      }
      return med;
    });
    setMedications(updatedMedications);
    storageUtils.saveMedications(updatedMedications);
  };

  // Handle medication refill
  const handleMedicationRefill = (id, newCount) => {
    const updatedMedications = medications.map((med) => {
      if (med.id === id) {
        return { ...med, capsuleCount: newCount };
      }
      return med;
    });
    setMedications(updatedMedications);
    storageUtils.saveMedications(updatedMedications);
  };

  // Handle diet intake update
  const handleUpdateDietIntake = (categoryKey, count) => {
    const updatedIntake = { ...dietIntake, [categoryKey]: count };
    setDietIntake(updatedIntake);
    storageUtils.saveDietIntake(updatedIntake);
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  // Show profile setup if not completed
  if (!profile) {
    return <ProfileSetup onComplete={handleProfileComplete} />;
  }

  // Show meal time setup if not completed
  if (!mealTimes) {
    return <MealTimeSetup onComplete={handleMealTimesComplete} />;
  }

  // Main app with tabbed interface
  return (
    <div className="app">
      {/* Header with Logo and Settings */}
      <div className="app-header">
        <Logo size="small" />
        <div className="app-header-spacer"></div>
        <button
          className="settings-btn"
          onClick={() => setShowProfileModal(true)}
          aria-label="Edit profile settings"
          title="Edit patient profile"
        >
          ⚙️
        </button>
      </div>

      {/* Patient Greeting */}
      {profile && (
        <div className="patient-greeting">
          <p>Hello, {profile.name}</p>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'medications' && (
        <MedicationsScreen
          medications={medications}
          onAddClick={() => setShowAddForm(true)}
          onDeleteMedication={handleDeleteMedication}
          onTaken={handleMedicationTaken}
          onRefill={handleMedicationRefill}
        />
      )}

      {activeTab === 'scan' && <ScanScreen />}

      {activeTab === 'diet' && (
        <DietTrackingScreen
          dietTargets={dietTargets}
          dietIntake={dietIntake}
          onUpdateIntake={handleUpdateDietIntake}
        />
      )}

      {/* Add Medication Form Modal */}
      {showAddForm && (
        <AddMedicationForm
          mealTimes={mealTimes}
          onSave={handleAddMedication}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ProfileSetup onComplete={handleProfileUpdate} />
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
