/**
 * Diet presets for different surgery types
 * Default values follow healthy eating guidelines for adults aged 60+
 */

export const SURGERY_TYPES = {
  CARDIAC: 'cardiac',
  ORTHOPEDIC: 'orthopedic',
  GENERAL: 'general',
  CHRONIC: 'chronic',
};

// Default diet targets for adults aged 60+ - tracked weekly
export const DEFAULT_DIET_TARGETS = {
  greenVegetables: { value: 5, unit: 'cups/week' },
  nonGreenVegetables: { value: null, unit: 'no limit' },
  fish: { value: 4, unit: 'servings/week' },
  redMeat: { value: 2, unit: 'servings/week' },
  fruits: { value: 14, unit: 'servings/week' },
  carbs: { value: 21, unit: 'servings/week' },
  dairy: { value: 7, unit: 'servings/week' },
  friedFood: { value: 2, unit: 'servings/week' },
};

export const DIET_PRESETS = {
  cardiac: {
    label: 'Cardiac Surgery',
    color: '#ef4444',
    defaults: DEFAULT_DIET_TARGETS,
  },
  orthopedic: {
    label: 'Orthopedic Surgery',
    color: '#0891b2',
    defaults: DEFAULT_DIET_TARGETS,
  },
  general: {
    label: 'General Surgery',
    color: '#8b5cf6',
    defaults: DEFAULT_DIET_TARGETS,
  },
  chronic: {
    label: 'Chronic Condition',
    color: '#06b6d4',
    defaults: DEFAULT_DIET_TARGETS,
  },
};

export const FOOD_CATEGORIES = {
  greenVegetables: {
    name: 'Green Vegetables',
    icon: '🥬',
    color: '#22c55e',
  },
  nonGreenVegetables: {
    name: 'Non-Green Vegetables',
    icon: '🥔',
    color: '#f59e0b',
  },
  fish: {
    name: 'Fish/White Meat',
    icon: '🐟',
    color: '#3b82f6',
  },
  redMeat: {
    name: 'Red Meat',
    icon: '🥩',
    color: '#ef4444',
  },
  fruits: {
    name: 'Fruits',
    icon: '🍎',
    color: '#ec4899',
  },
  carbs: {
    name: 'Carbs/Grains',
    icon: '🌾',
    color: '#d97706',
  },
  dairy: {
    name: 'Dairy',
    icon: '🥛',
    color: '#f3f4f6',
    textColor: '#1f2937',
  },
  friedFood: {
    name: 'Fried/Oily Food',
    icon: '🍟',
    color: '#ea580c',
  },
};

/**
 * Food categories available for AI scanning
 * Excludes Water and Sodium (manual tracking only)
 */
export const SCAN_CATEGORIES = {
  greenVegetables: FOOD_CATEGORIES.greenVegetables,
  nonGreenVegetables: FOOD_CATEGORIES.nonGreenVegetables,
  fish: FOOD_CATEGORIES.fish,
  redMeat: FOOD_CATEGORIES.redMeat,
  fruits: FOOD_CATEGORIES.fruits,
  carbs: FOOD_CATEGORIES.carbs,
  dairy: FOOD_CATEGORIES.dairy,
  friedFood: FOOD_CATEGORIES.friedFood,
};
