/**
 * LocalStorage utility functions for persisting medication data
 */

const MEDICATIONS_KEY = 'nutricare_medications';
const MEAL_TIMES_KEY = 'nutricare_meal_times';
const SURGERY_TYPE_KEY = 'nutricare_surgery_type';
const DIET_TARGETS_KEY = 'nutricare_diet_targets';
const DIET_INTAKE_KEY = 'nutricare_diet_intake';
const PROFILE_KEY = 'nutricare_profile';

export const storageUtils = {
  /**
   * Get all medications from localStorage
   * @returns {Array} Array of medications
   */
  getMedications: () => {
    try {
      const data = localStorage.getItem(MEDICATIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading medications from storage:', error);
      return [];
    }
  },

  /**
   * Save medications to localStorage
   * @param {Array} medications - Array of medications to save
   */
  saveMedications: (medications) => {
    try {
      localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(medications));
    } catch (error) {
      console.error('Error saving medications to storage:', error);
    }
  },

  /**
   * Add a new medication
   * @param {Object} medication - Medication object to add
   * @returns {Array} Updated medications array
   */
  addMedication: (medication) => {
    const medications = storageUtils.getMedications();
    const newMedication = {
      ...medication,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    medications.push(newMedication);
    storageUtils.saveMedications(medications);
    return medications;
  },

  /**
   * Delete a medication by ID
   * @param {number} id - Medication ID
   * @returns {Array} Updated medications array
   */
  deleteMedication: (id) => {
    const medications = storageUtils.getMedications();
    const filtered = medications.filter((med) => med.id !== id);
    storageUtils.saveMedications(filtered);
    return filtered;
  },

  /**
   * Get meal times from localStorage
   * @returns {Object} Meal times object
   */
  getMealTimes: () => {
    try {
      const data = localStorage.getItem(MEAL_TIMES_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading meal times from storage:', error);
      return null;
    }
  },

  /**
   * Save meal times to localStorage
   * @param {Object} mealTimes - Meal times object
   */
  saveMealTimes: (mealTimes) => {
    try {
      localStorage.setItem(MEAL_TIMES_KEY, JSON.stringify(mealTimes));
    } catch (error) {
      console.error('Error saving meal times to storage:', error);
    }
  },

  /**
   * Check if meal times have been set
   * @returns {boolean} True if meal times are configured
   */
  hasMealTimes: () => {
    return storageUtils.getMealTimes() !== null;
  },

  /**
   * Get surgery type from localStorage
   * @returns {Object} Surgery type object
   */
  getSurgeryType: () => {
    try {
      const data = localStorage.getItem(SURGERY_TYPE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading surgery type from storage:', error);
      return null;
    }
  },

  /**
   * Save surgery type to localStorage
   * @param {Object} surgeryType - Surgery type object
   */
  saveSurgeryType: (surgeryType) => {
    try {
      localStorage.setItem(SURGERY_TYPE_KEY, JSON.stringify(surgeryType));
    } catch (error) {
      console.error('Error saving surgery type to storage:', error);
    }
  },

  /**
   * Get diet targets from localStorage
   * @returns {Object} Diet targets object
   */
  getDietTargets: () => {
    try {
      const data = localStorage.getItem(DIET_TARGETS_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading diet targets from storage:', error);
      return null;
    }
  },

  /**
   * Save diet targets to localStorage
   * @param {Object} targets - Diet targets object
   */
  saveDietTargets: (targets) => {
    try {
      localStorage.setItem(DIET_TARGETS_KEY, JSON.stringify(targets));
    } catch (error) {
      console.error('Error saving diet targets to storage:', error);
    }
  },

  /**
   * Get diet intake from localStorage
   * @returns {Object} Diet intake object
   */
  getDietIntake: () => {
    try {
      const data = localStorage.getItem(DIET_INTAKE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading diet intake from storage:', error);
      return {};
    }
  },

  /**
   * Save diet intake to localStorage
   * @param {Object} intake - Diet intake object
   */
  saveDietIntake: (intake) => {
    try {
      localStorage.setItem(DIET_INTAKE_KEY, JSON.stringify(intake));
    } catch (error) {
      console.error('Error saving diet intake to storage:', error);
    }
  },

  /**
   * Get patient profile from localStorage
   * @returns {Object} Patient profile object
   */
  getProfile: () => {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading profile from storage:', error);
      return null;
    }
  },

  /**
   * Save patient profile to localStorage
   * @param {Object} profile - Patient profile object
   */
  saveProfile: (profile) => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile to storage:', error);
    }
  },
};
