// Data types for MuscleX
export interface Exercise {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  image?: string;
}

export interface Workout {
  id: string;
  name: string;
  exercises: string[];
  duration: number;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
