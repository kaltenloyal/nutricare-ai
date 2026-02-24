import React, { useState } from 'react';
import { getDefaultMealTimes } from '../utils/medicationTiming';
import { storageUtils } from '../utils/storage';
import '../styles/MealTimeSetup.css';

/**
 * One-time meal time setup screen with large time pickers
 * Default times: Breakfast 8:00am, Lunch 1:00pm, Dinner 7:00pm
 */
const MealTimeSetup = ({ onComplete }) => {
  const defaultTimes = getDefaultMealTimes();
  const [breakfast, setBreakfast] = useState(defaultTimes.breakfast);
  const [lunch, setLunch] = useState(defaultTimes.lunch);
  const [dinner, setDinner] = useState(defaultTimes.dinner);

  const handleSave = () => {
    const mealTimes = { breakfast, lunch, dinner };
    storageUtils.saveMealTimes(mealTimes);
    onComplete(mealTimes);
  };

  return (
    <div className="meal-time-setup">
      <div className="meal-time-container">
        <h1 className="meal-time-title">Set Your Meal Times</h1>
        <p className="meal-time-subtitle">
          This helps us schedule your medications at the right times
        </p>

        <div className="time-pickers-grid">
          {/* Breakfast Time Picker */}
          <div className="time-picker-card">
            <label htmlFor="breakfast-picker" className="time-picker-label">
              Breakfast
            </label>
            <input
              id="breakfast-picker"
              type="time"
              value={breakfast}
              onChange={(e) => setBreakfast(e.target.value)}
              className="time-picker-input"
              aria-label="Breakfast time"
            />
          </div>

          {/* Lunch Time Picker */}
          <div className="time-picker-card">
            <label htmlFor="lunch-picker" className="time-picker-label">
              Lunch
            </label>
            <input
              id="lunch-picker"
              type="time"
              value={lunch}
              onChange={(e) => setLunch(e.target.value)}
              className="time-picker-input"
              aria-label="Lunch time"
            />
          </div>

          {/* Dinner Time Picker */}
          <div className="time-picker-card">
            <label htmlFor="dinner-picker" className="time-picker-label">
              Dinner
            </label>
            <input
              id="dinner-picker"
              type="time"
              value={dinner}
              onChange={(e) => setDinner(e.target.value)}
              className="time-picker-input"
              aria-label="Dinner time"
            />
          </div>
        </div>

        <button onClick={handleSave} className="save-meal-times-btn">
          Save Meal Times
        </button>
      </div>
    </div>
  );
};

export default MealTimeSetup;
