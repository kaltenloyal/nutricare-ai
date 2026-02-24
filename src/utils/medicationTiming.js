/**
 * Utility functions for calculating medication timing based on frequency and drowsy flag
 */

/**
 * Calculate which meals a medication should be taken at
 * @param {number} frequency - Times per day (1, 2, 3, or 4)
 * @param {boolean} isDrowsy - Whether the medication causes drowsiness
 * @param {Object} mealTimes - Object with breakfast, lunch, dinner times
 * @returns {Array<string>} Array of times when medication should be taken
 */
export const calculateMedicationTimes = (frequency, isDrowsy, mealTimes) => {
  const { breakfast, lunch, dinner } = mealTimes;

  if (frequency === 1) {
    return isDrowsy ? [dinner] : [breakfast];
  }

  if (frequency === 2) {
    return isDrowsy ? [lunch, dinner] : [breakfast, dinner];
  }

  if (frequency === 3) {
    return [breakfast, lunch, dinner];
  }

  if (frequency === 4) {
    // Spread evenly: breakfast, lunch, dinner, and midpoint between lunch and dinner
    const lunchHour = parseInt(lunch.split(':')[0]);
    const dinnerHour = parseInt(dinner.split(':')[0]);
    const midpointHour = Math.floor((lunchHour + dinnerHour) / 2);
    const midpointTime = `${String(midpointHour).padStart(2, '0')}:00`;

    return [breakfast, lunch, midpointTime, dinner];
  }

  return [];
};

/**
 * Parse time string (HH:MM) into minutes for comparison
 * @param {string} timeStr - Time in HH:MM format
 * @returns {number} Minutes since midnight
 */
export const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Format minutes since midnight back to HH:MM format
 * @param {number} minutes - Minutes since midnight
 * @returns {string} Time in HH:MM format
 */
export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

/**
 * Get a formatted time string with AM/PM
 * @param {string} timeStr - Time in HH:MM format
 * @returns {string} Formatted time with AM/PM
 */
export const formatTimeWithPeriod = (timeStr) => {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${period}`;
};

/**
 * Initialize default meal times
 * @returns {Object} Default meal times
 */
export const getDefaultMealTimes = () => ({
  breakfast: '08:00',
  lunch: '13:00',
  dinner: '19:00',
});
