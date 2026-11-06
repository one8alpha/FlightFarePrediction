export interface FlightRecord {
  id: string;
  airline: string;
  source: string;
  destination: string;
  route: string;
  depTime: string;
  arrivalTime: string;
  duration: string;
  durationMins: number;
  totalStops: number;
  stopsLabel: string;
  additionalInfo: string;
  dateOfJourney: string;
  price: number;
}

export interface ModelMetric {
  algorithm: string;
  type: string;
  mae: number;
  mse: number;
  rmse: number;
  r2: number;
  trainingTime: string;
  hyperparameters: Record<string, string | number>;
  selectedForProduction?: boolean;
}

export interface ExperimentRecord {
  id: string;
  name: string;
  change: string;
  result: string;
  observation: string;
  conclusion: string;
  metricDelta: string;
}

export interface VivaQuestion {
  id: number;
  category: string;
  question: string;
  answer: string;
  keyConcepts: string[];
}
