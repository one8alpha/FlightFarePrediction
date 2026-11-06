import React, { useState, useMemo } from 'react';
import { AIRLINES, SOURCES, DESTINATIONS } from '../data/flightDataset.ts';
import { predictFlightFare, PredictionInput, PredictionResult } from '../utils/mlEngine.ts';
import { Plane, Calendar, Clock, Check, AlertCircle, Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck } from 'lucide-react';

export const LivePredictor: React.FC = () => {
  const [formData, setFormData] = useState<PredictionInput>({
    airline: 'IndiGo',
    source: 'Delhi',
    destination: 'Cochin',
    dateOfJourney: '2024-05-20',
    depTime: '10:00',
    arrivalTime: '13:15',
    totalStops: 0,
    classType: 'Economy',
  });

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('Tuned Random Forest');
  const [prediction, setPrediction] = useState<PredictionResult | null>(() => {
    return predictFlightFare({
      airline: 'IndiGo',
      source: 'Delhi',
      destination: 'Cochin',
      dateOfJourney: '2024-05-20',
      depTime: '10:00',
      arrivalTime: '13:15',
      totalStops: 0,
      classType: 'Economy',
    });
  });

  const [isCalculating, setIsCalculating] = useState(false);

  // Available destinations filtered so source != destination
  const availableDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => d.toLowerCase() !== formData.source.toLowerCase());
  }, [formData.source]);

  const handlePredict = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      const result = predictFlightFare(formData, selectedAlgorithm);
      setPrediction(result);
      setIsCalculating(false);
    }, 150);
  };

  const applyPreset = (preset: Partial<PredictionInput> & { algo?: string }) => {
    const updated = { ...formData, ...preset };
    setFormData(updated);
    if (preset.algo) {
      setSelectedAlgorithm(preset.algo);
    }
    const result = predictFlightFare(updated, preset.algo || selectedAlgorithm);
    setPrediction(result);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase">
              <span>Part M</span>
              <span aria-hidden="true">·</span>
              <span>Stage 13 Front-End Application</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Flight Fare Prediction Calculator
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Interactive deployment model for Roll No. 17. Supply itinerary parameters below to evaluate real-time fare inference.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Model:</span>
            <select
              value={selectedAlgorithm}
              onChange={(e) => {
                setSelectedAlgorithm(e.target.value);
                const res = predictFlightFare(formData, e.target.value);
                setPrediction(res);
              }}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Tuned Random Forest">Tuned Random Forest (R² = 0.866)</option>
              <option value="Decision Tree">Decision Tree Regressor (R² = 0.736)</option>
              <option value="Linear Regression">Multiple Linear Regression (R² = 0.618)</option>
            </select>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-medium text-slate-500">Quick Test Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset({
              airline: 'IndiGo',
              source: 'Delhi',
              destination: 'Mumbai',
              totalStops: 0,
              depTime: '08:00',
              arrivalTime: '10:15',
              classType: 'Economy',
            })}
            className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer"
          >
            Delhi → Mumbai (Non-stop IndiGo)
          </button>

          <button
            type="button"
            onClick={() => applyPreset({
              airline: 'Jet Airways',
              source: 'Bangalore',
              destination: 'Delhi',
              totalStops: 1,
              depTime: '18:55',
              arrivalTime: '08:30',
              classType: 'Economy',
            })}
            className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer"
          >
            Bangalore → Delhi (1-Stop Jet Airways)
          </button>

          <button
            type="button"
            onClick={() => applyPreset({
              airline: 'Jet Airways Business',
              source: 'Delhi',
              destination: 'Cochin',
              totalStops: 2,
              depTime: '20:05',
              arrivalTime: '04:25',
              classType: 'Business',
            })}
            className="text-xs px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-md transition-colors cursor-pointer"
          >
            Delhi → Cochin (Business Class)
          </button>
        </div>
      </div>

      {/* Main Grid: Form Left, Prediction Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <form onSubmit={handlePredict} className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">
            Itinerary & Flight Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Airline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Airline Carrier</label>
              <select
                value={formData.airline}
                onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {AIRLINES.map((airline) => (
                  <option key={airline} value={airline}>{airline}</option>
                ))}
              </select>
            </div>

            {/* Travel Class */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Travel Class</label>
              <select
                value={formData.classType}
                onChange={(e) => setFormData({ ...formData, classType: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Economy">Economy Class</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business Class</option>
              </select>
            </div>

            {/* Source */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Source City</label>
              <select
                value={formData.source}
                onChange={(e) => {
                  const newSource = e.target.value;
                  const newDest = newSource === formData.destination ? (newSource === 'Delhi' ? 'Cochin' : 'Delhi') : formData.destination;
                  setFormData({ ...formData, source: newSource, destination: newDest });
                }}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {SOURCES.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Destination City</label>
              <select
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {availableDestinations.map((dest) => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>

            {/* Date of Journey */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Date of Journey</label>
              <input
                type="date"
                value={formData.dateOfJourney}
                onChange={(e) => setFormData({ ...formData, dateOfJourney: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono-tabular"
              />
            </div>

            {/* Total Stops */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Total Stops (Layover)</label>
              <select
                value={formData.totalStops}
                onChange={(e) => setFormData({ ...formData, totalStops: Number(e.target.value) })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono-tabular"
              >
                <option value={0}>Non-stop (0 stops)</option>
                <option value={1}>1 Stop (Single hub)</option>
                <option value={2}>2 Stops (Dual hubs)</option>
                <option value={3}>3 Stops</option>
              </select>
            </div>

            {/* Dep Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Departure Time</label>
              <input
                type="time"
                value={formData.depTime}
                onChange={(e) => setFormData({ ...formData, depTime: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono-tabular"
              />
            </div>

            {/* Arrival Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Arrival Time</label>
              <input
                type="time"
                value={formData.arrivalTime}
                onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono-tabular"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isCalculating ? (
                <span>Executing Feature Vector Regression...</span>
              ) : (
                <>
                  <span>Predict Flight Fare</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Prediction Output Display Column (Stage 13 Requirement) */}
        <div className="lg:col-span-5 space-y-4">
          {prediction && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-semibold text-indigo-700 uppercase">
                    Stage 17: Prediction Output
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">Estimated Ticket Fare</h3>
                </div>
                <span className="text-[11px] font-mono-tabular bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {prediction.modelUsed}
                </span>
              </div>

              {/* Large Price Display */}
              <div className="text-center py-2 space-y-1">
                <span className="text-xs text-slate-500 block">Predicted Airfare</span>
                <div className="text-4xl font-extrabold text-slate-900 font-mono-tabular tracking-tight">
                  ₹{prediction.predictedFare.toLocaleString('en-IN')}
                </div>
                <span className="text-xs font-mono-tabular text-slate-500 block">
                  Expected Range: ₹{prediction.lowEstimate.toLocaleString('en-IN')} – ₹{prediction.highEstimate.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Flight Summary Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div>
                  <span className="text-slate-500 block">Flight Duration</span>
                  <span className="font-semibold text-slate-900 font-mono-tabular">
                    {prediction.durationFormatted} ({prediction.durationMinutes}m)
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Route Layovers</span>
                  <span className="font-semibold text-slate-900">
                    {formData.totalStops === 0 ? 'Direct Non-stop' : `${formData.totalStops} Stop(s)`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Carrier Class</span>
                  <span className="font-semibold text-slate-900">{formData.airline} · {formData.classType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Itinerary</span>
                  <span className="font-semibold text-slate-900">{formData.source} → {formData.destination}</span>
                </div>
              </div>

              {/* Fare Decomposition Breakdown */}
              <div className="space-y-2 text-xs border-t border-slate-100 pt-4">
                <span className="font-semibold text-slate-900 block">Cost Decomposition Breakdown</span>
                <div className="space-y-1.5 font-mono-tabular text-slate-600">
                  <div className="flex justify-between">
                    <span>Base Fare & Route Distance:</span>
                    <span className="font-medium text-slate-900">₹{prediction.breakdown.baseFare.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Airline Carrier Factor:</span>
                    <span className="font-medium text-slate-900">{prediction.breakdown.airlineFactor}x</span>
                  </div>
                  {prediction.breakdown.layoverPenalty > 0 && (
                    <div className="flex justify-between text-amber-700">
                      <span>Layover Transit & Fuel Fee:</span>
                      <span>+₹{prediction.breakdown.layoverPenalty.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {prediction.breakdown.peakHourSurcharge > 0 && (
                    <div className="flex justify-between text-indigo-700">
                      <span>Peak Hours Surcharge:</span>
                      <span>+₹{prediction.breakdown.peakHourSurcharge.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Seasonality & Demand Index:</span>
                    <span className="font-medium text-slate-900">{prediction.breakdown.seasonalityMultiplier}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Airport Taxes & UDF:</span>
                    <span className="font-medium text-slate-900">₹{prediction.breakdown.airportTaxes.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Actionable Insights */}
              {prediction.insights.length > 0 && (
                <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100 space-y-1.5 text-xs">
                  <span className="font-semibold text-indigo-950 block">Pricing Insights</span>
                  <ul className="space-y-1 text-indigo-900 list-disc list-inside">
                    {prediction.insights.map((ins, i) => (
                      <li key={i}>{ins}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
