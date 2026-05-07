// User Profile & Statistics Data

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  handle: string;
  avatar?: string;
  bio: string;
  age: number;
  height: string;
  weight: string;
  goal: string;
  fitnessLevel: string;
  joinDate: string;
  gender: string;
}

export interface UserStats {
  followers: number;
  following: number;
  totalWorkouts: number;
  totalCalories: number;
  totalMinutes: number;
  currentStreak: number;
  personalRecords: PersonalRecord[];
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface PersonalRecord {
  exercise: string;
  weight: string;
  date: string;
}

export interface DailyProgress {
  date: string;
  calories: number;
  calorieGoal: number;
  steps: number;
  stepGoal: number;
  activeMinutes: number;
  workouts: number;
  water: number;
}

export interface WeeklyData {
  week: string;
  workouts: number;
  calories: number;
  duration: number;
  avgIntensity: string;
}

export const CURRENT_USER: UserProfile = {
  id: 'user_1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  handle: '@alex.fitflow',
  avatar: 'AJ',
  bio: 'Fitness enthusiast | Gym lover | Building strength 💪 | DM for collab',
  age: 28,
  height: '5\'11"',
  weight: '185 lbs',
  goal: 'Build Muscle & Increase Strength',
  fitnessLevel: 'Advanced',
  joinDate: 'January 2023',
  gender: 'Male',
};

export const USER_STATS: UserStats = {
  followers: 113,
  following: 87,
  totalWorkouts: 28,
  totalCalories: 4200,
  totalMinutes: 1280,
  currentStreak: 12,
  personalRecords: [
    { exercise: 'Barbell Bench Press', weight: '315 lbs', date: 'May 2, 2026' },
    { exercise: 'Barbell Squat', weight: '405 lbs', date: 'April 28, 2026' },
    { exercise: 'Deadlift', weight: '495 lbs', date: 'April 25, 2026' },
    { exercise: 'Barbell Row', weight: '335 lbs', date: 'May 1, 2026' },
    { exercise: 'Overhead Press', weight: '225 lbs', date: 'April 20, 2026' },
  ],
  weeklyGoal: 5,
  weeklyProgress: 4,
};

export const TODAY_PROGRESS: DailyProgress = {
  date: 'May 7, 2026',
  calories: 864,
  calorieGoal: 1200,
  steps: 8342,
  stepGoal: 10000,
  activeMinutes: 38,
  workouts: 1,
  water: 6,
};

export const WEEKLY_PROGRESS: WeeklyData[] = [
  { week: 'May 1-7', workouts: 4, calories: 5200, duration: 320, avgIntensity: 'High' },
  { week: 'Apr 24-30', workouts: 5, calories: 6100, duration: 380, avgIntensity: 'Very High' },
  { week: 'Apr 17-23', workouts: 4, calories: 4800, duration: 300, avgIntensity: 'High' },
  { week: 'Apr 10-16', workouts: 3, calories: 3500, duration: 240, avgIntensity: 'Medium' },
  { week: 'Apr 3-9', workouts: 5, calories: 5900, duration: 360, avgIntensity: 'High' },
];

export const MONTHLY_DATA = {
  totalWorkouts: 19,
  totalCalories: 24600,
  totalDuration: 1520,
  avgWorkoutsPerWeek: 4.75,
  avgCaloriesPerDay: 820,
  bestDay: 'Tuesday',
  favoriteExercise: 'Barbell Squats',
};

export const GOALS = [
  {
    id: 'goal_1',
    title: 'Build Muscle',
    description: 'Gain 10 lbs of muscle in 12 weeks',
    progress: 65,
    target: 'December 2026',
    status: 'In Progress',
  },
  {
    id: 'goal_2',
    title: 'Increase Strength',
    description: 'Bench press 3 plates (315 lbs)',
    progress: 100,
    target: 'Completed',
    status: 'Completed',
  },
  {
    id: 'goal_3',
    title: 'Cardio Endurance',
    description: 'Run 5K in under 22 minutes',
    progress: 45,
    target: 'July 2026',
    status: 'In Progress',
  },
];

export const WORKOUT_HISTORY = [
  {
    id: 'wh_1',
    workoutName: 'Leg Day Bash',
    date: 'May 7, 2026',
    time: '06:30 AM',
    duration: '55 min',
    calories: 360,
    difficulty: 'Advanced',
    exercises_completed: 7,
    exercises_total: 7,
    rating: 5,
    notes: 'Great session! Hit all PRs',
  },
  {
    id: 'wh_2',
    workoutName: 'Upper Body Power',
    date: 'May 5, 2026',
    time: '07:00 AM',
    duration: '50 min',
    calories: 320,
    difficulty: 'Intermediate',
    exercises_completed: 6,
    exercises_total: 6,
    rating: 4,
    notes: 'Felt strong today',
  },
  {
    id: 'wh_3',
    workoutName: 'Cardio Blast HIIT',
    date: 'May 3, 2026',
    time: '05:45 AM',
    duration: '30 min',
    calories: 380,
    difficulty: 'Advanced',
    exercises_completed: 5,
    exercises_total: 5,
    rating: 4,
    notes: 'Intense but rewarding',
  },
  {
    id: 'wh_4',
    workoutName: 'Back & Bicep Destroyer',
    date: 'May 1, 2026',
    time: '06:45 AM',
    duration: '50 min',
    calories: 310,
    difficulty: 'Advanced',
    exercises_completed: 6,
    exercises_total: 6,
    rating: 5,
    notes: 'Amazing pump!',
  },
];

export const NUTRITION_TIPS = [
  {
    id: 'tip_1',
    title: 'Protein Timing',
    description: 'Consume protein within 2 hours post-workout for optimal muscle recovery',
    category: 'Nutrition',
  },
  {
    id: 'tip_2',
    title: 'Stay Hydrated',
    description: 'Drink at least 3-4 liters of water daily for optimal performance',
    category: 'Hydration',
  },
  {
    id: 'tip_3',
    title: 'Meal Prep',
    description: 'Prepare meals in advance to stay consistent with your nutrition plan',
    category: 'Planning',
  },
  {
    id: 'tip_4',
    title: 'Pre-Workout Meals',
    description: 'Eat complex carbs 1-2 hours before workout for sustained energy',
    category: 'Nutrition',
  },
];

export const ACHIEVEMENTS = [
  {
    id: 'ach_1',
    title: 'First Workout',
    description: 'Completed your first workout',
    unlockedDate: 'January 15, 2023',
    icon: '🏋️',
  },
  {
    id: 'ach_2',
    title: 'Week Warrior',
    description: 'Complete 7 consecutive days of workouts',
    unlockedDate: 'February 3, 2023',
    icon: '⚡',
  },
  {
    id: 'ach_3',
    title: 'Plate Master',
    description: 'Lift 3 plates (315 lbs) on bench press',
    unlockedDate: 'May 2, 2026',
    icon: '🏆',
  },
  {
    id: 'ach_4',
    title: 'Calorie Crusher',
    description: 'Burn 5000 calories in a week',
    unlockedDate: 'April 28, 2026',
    icon: '🔥',
  },
  {
    id: 'ach_5',
    title: 'Social Butterfly',
    description: 'Get 100 followers',
    unlockedDate: 'March 10, 2026',
    icon: '🦋',
  },
];

export const EXERCISES_LIBRARY = [
  {
    id: 'ex_1',
    name: 'Barbell Squats',
    muscle: 'Legs',
    difficulty: 'Intermediate',
    equipment: 'Barbell',
    description: 'Place barbell on upper back, lower body until thighs are parallel to ground',
  },
  {
    id: 'ex_2',
    name: 'Bench Press',
    muscle: 'Chest',
    difficulty: 'Intermediate',
    equipment: 'Barbell',
    description: 'Lie on bench, press barbell up from chest level',
  },
  {
    id: 'ex_3',
    name: 'Deadlifts',
    muscle: 'Back',
    difficulty: 'Advanced',
    equipment: 'Barbell',
    description: 'Lift barbell from ground to hip level, keeping back straight',
  },
  {
    id: 'ex_4',
    name: 'Barbell Rows',
    muscle: 'Back',
    difficulty: 'Intermediate',
    equipment: 'Barbell',
    description: 'Pull barbell to chest, keeping elbows close to body',
  },
  {
    id: 'ex_5',
    name: 'Pull-ups',
    muscle: 'Back',
    difficulty: 'Advanced',
    equipment: 'Pull-up Bar',
    description: 'Hang from bar and pull your body up until chest reaches bar',
  },
];
