export interface PredictionInput {
  airline: string;
  source: string;
  destination: string;
  dateOfJourney: string;
  depTime: string;
  arrivalTime: string;
  totalStops: number;
  classType: string;
}

export interface PredictionResult {
  predictedFare: number;
  lowEstimate: number;
  highEstimate: number;
  durationMinutes: number;
  durationFormatted: string;
  modelUsed: string;
  breakdown: {
    baseFare: number;
    airlineFactor: number;
    layoverPenalty: number;
    seasonalityMultiplier: number;
    peakHourSurcharge: number;
    airportTaxes: number;
  };
  insights: string[];
}

// Distance approximation between Indian airport hubs in kilometers
const ROUTE_DISTANCES: Record<string, number> = {
  'Delhi-Cochin': 2080,
  'Delhi-Bangalore': 1740,
  'Delhi-Mumbai': 1150,
  'Delhi-Kolkata': 1300,
  'Delhi-Hyderabad': 1250,
  'Delhi-New Delhi': 20, // edge case fallback
  'Kolkata-Bangalore': 1560,
  'Kolkata-Delhi': 1300,
  'Kolkata-Cochin': 1880,
  'Kolkata-Hyderabad': 1180,
  'Bangalore-Delhi': 1740,
  'Bangalore-New Delhi': 1740,
  'Bangalore-Cochin': 365,
  'Bangalore-Kolkata': 1560,
  'Bangalore-Hyderabad': 500,
  'Mumbai-Delhi': 1150,
  'Mumbai-Cochin': 1070,
  'Mumbai-Bangalore': 840,
  'Mumbai-Kolkata': 1660,
  'Mumbai-Hyderabad': 620,
  'Chennai-Kolkata': 1360,
  'Chennai-Delhi': 1760,
  'Chennai-Bangalore': 290,
  'Chennai-Cochin': 560,
};

// Base airline pricing factor relative to market average
const AIRLINE_FACTORS: Record<string, number> = {
  'IndiGo': 1.0,
  'Air India': 1.12,
  'Jet Airways': 1.35,
  'Jet Airways Business': 3.8,
  'SpiceJet': 0.88,
  'Multiple carriers': 1.18,
  'Vistara': 1.15,
  'Air Asia': 0.85,
  'GoAir': 0.86,
};

export function calculateFlightDuration(depTime: string, arrivalTime: string): { durationMinutes: number; durationFormatted: string } {
  const [depH, depM] = depTime.split(':').map(Number);
  const [arrH, arrM] = arrivalTime.split(':').map(Number);

  let depTotal = depH * 60 + (depM || 0);
  let arrTotal = arrH * 60 + (arrM || 0);

  if (arrTotal < depTotal) {
    arrTotal += 24 * 60; // Next day arrival
  }

  const durationMinutes = Math.max(45, arrTotal - depTotal);
  const hours = Math.floor(durationMinutes / 60);
  const mins = durationMinutes % 60;

  return {
    durationMinutes,
    durationFormatted: `${hours}h ${mins.toString().padStart(2, '0')}m`,
  };
}

export function predictFlightFare(input: PredictionInput, modelAlgorithm = 'Tuned Random Forest'): PredictionResult {
  const routeKey = `${input.source}-${input.destination}`;
  const reverseRouteKey = `${input.destination}-${input.source}`;
  const distanceKm = ROUTE_DISTANCES[routeKey] || ROUTE_DISTANCES[reverseRouteKey] || 1200;

  const { durationMinutes, durationFormatted } = calculateFlightDuration(input.depTime, input.arrivalTime);

  // Parse journey date
  const journeyDate = new Date(input.dateOfJourney || '2024-05-15');
  const month = journeyDate.getMonth() + 1; // 1-12
  const day = journeyDate.getDate();
  const dayOfWeek = journeyDate.getDay(); // 0 is Sunday, 6 is Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Seasonal index: March & May-June peak summer vacation travel in India
  let seasonalityMultiplier = 1.0;
  if (month === 3) seasonalityMultiplier = 1.18; // March fiscal/holiday spike
  if (month === 5 || month === 6) seasonalityMultiplier = 1.25; // May/June summer holidays
  if (month === 4) seasonalityMultiplier = 0.95; // April post-school reopen dip

  if (isWeekend) {
    seasonalityMultiplier *= 1.12;
  }

  // Dep time factor (peak morning 07:00-10:00 and peak evening 17:00-20:00 demand)
  const [depH] = input.depTime.split(':').map(Number);
  let peakHourSurcharge = 0;
  if ((depH >= 7 && depH <= 10) || (depH >= 17 && depH <= 20)) {
    peakHourSurcharge = 750;
  }

  // Base rate per kilometer (~₹2.8 / km standard Indian domestic rate)
  const baseFare = Math.round(1800 + distanceKm * 2.2 + (durationMinutes / 60) * 320);

  // Airline premium multiplier
  const airlineMult = AIRLINE_FACTORS[input.airline] || 1.0;

  // Layover penalty / stop multiplier: 1 stop adds handling & fuel, 2 stops adds longer flight
  let stopMultiplier = 1.0;
  let layoverPenalty = 0;
  if (input.totalStops === 0) {
    stopMultiplier = 1.0; // Direct flights are efficient, but often in high demand
  } else if (input.totalStops === 1) {
    stopMultiplier = 1.22;
    layoverPenalty = 1450;
  } else if (input.totalStops === 2) {
    stopMultiplier = 1.48;
    layoverPenalty = 2800;
  } else {
    stopMultiplier = 1.65;
    layoverPenalty = 3900;
  }

  // Class factor
  let classFactor = 1.0;
  if (input.classType === 'Business' || input.airline === 'Jet Airways Business') {
    classFactor = 3.6;
  } else if (input.classType === 'Premium Economy') {
    classFactor = 1.6;
  }

  const airportTaxes = 850 + input.totalStops * 250;

  let rawPredictedFare = (baseFare * airlineMult * stopMultiplier + layoverPenalty + peakHourSurcharge) * seasonalityMultiplier * classFactor;

  // Add subtle non-linear variance depending on model algorithm selected
  if (modelAlgorithm === 'Linear Regression') {
    // Linear regression tends to under-predict high peaks and over-predict low-cost budget flights
    rawPredictedFare = rawPredictedFare * 0.92 + 650;
  } else if (modelAlgorithm === 'Decision Tree') {
    // Step-wise discretization
    rawPredictedFare = Math.round(rawPredictedFare / 200) * 200;
  }

  const finalPredictedFare = Math.round(rawPredictedFare);
  const lowEstimate = Math.round(finalPredictedFare * 0.92);
  const highEstimate = Math.round(finalPredictedFare * 1.08);

  const insights: string[] = [];
  if (input.totalStops === 0) {
    insights.push('Non-stop direct flight avoids transit airport passenger handling fees.');
  } else {
    insights.push(`${input.totalStops} layover stop(s) added approx. ₹${layoverPenalty.toLocaleString('en-IN')} in transit fees and flight time.`);
  }

  if (isWeekend) {
    insights.push('Weekend journey carries a +12% weekend travel surge surcharge.');
  } else {
    insights.push('Mid-week travel date offers favorable baseline operational pricing.');
  }

  if (month === 5 || month === 6) {
    insights.push('May/June summer vacation travel seasonality is active (+25% peak index).');
  }

  if (AIRLINE_FACTORS[input.airline] && AIRLINE_FACTORS[input.airline] > 1.2) {
    insights.push(`${input.airline} commands a full-service carrier premium over low-cost airlines.`);
  }

  return {
    predictedFare: finalPredictedFare,
    lowEstimate,
    highEstimate,
    durationMinutes,
    durationFormatted,
    modelUsed: modelAlgorithm,
    breakdown: {
      baseFare: Math.round(baseFare),
      airlineFactor: Number(airlineMult.toFixed(2)),
      layoverPenalty,
      seasonalityMultiplier: Number(seasonalityMultiplier.toFixed(2)),
      peakHourSurcharge,
      airportTaxes,
    },
    insights,
  };
}
