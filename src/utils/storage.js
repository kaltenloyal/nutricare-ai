/**
 * LocalStorage utility functions for persisting medication data
 */

const MEDICATIONS_KEY = 'nutricare_medications';
const MEAL_TIMES_KEY = 'nutricare_meal_times';

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
};
