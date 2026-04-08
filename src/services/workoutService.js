import workouts from '../data/workouts.json';
import exercises from '../data/exercises.json';

export const getAllWorkouts = () => workouts;

export const getWorkoutById = (id) => workouts.find(w => w.id === id);

export const getExercisesByIds = (ids) => ids.map(id => exercises.find(e => e.id === id));
