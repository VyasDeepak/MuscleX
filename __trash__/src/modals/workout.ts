export interface Exercise {
  id: string;
  name: string;
  duration: string;
  image: string;
}

export interface Workout {
  id: string;
  title: string;
  type: string;
  premium: boolean;
  exercises: string[];
}
