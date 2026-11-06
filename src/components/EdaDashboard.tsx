import React, { useState } from 'react';
import { BarChart3, TrendingUp, Compass, Grid, Sparkles } from 'lucide-react';

export const EdaDashboard: React.FC = () => {
  const [activeVisual, setActiveVisual] = useState<'airline' | 'stops' | 'duration' | 'monthly' | 'heatmap'>('airline');

  const airlineData = [
    { name: 'Jet Airways Business', avg: 58230, min: 28000, max: 79512, color: '#4338ca' },
    { name: 'Jet Airways', avg: 11643, min: 3873, max: 54826, color: '#4f46e5' },
    { name: 'Multiple carriers', avg: 10902, min: 5797, max: 36983, color: '#6366f1' },
    { name: 'Air India', avg: 9612, min: 2050, max: 31945, color: '#e11d48' },
    { name: 'Vistara', avg: 7800, min: 3687, max: 21730, color: '#9333ea' },
    { name: 'IndiGo', avg: 5673, min: 2220, max: 22153, color: '#0284c7' },
    { name: 'Air Asia', avg: 5594, min: 3383, max: 13774, color: '#ea580c' },
    { name: 'SpiceJet', avg: 4338, min: 1759, max: 23267, color: '#d97706' },
  ];

  const stopsData = [
    { stops: 'Non-stop (0 stops)', median: 4700, avg: 5024, count: 3475, desc: 'Direct point-to-point flights' },
    { stops: '1 Stop', median: 10200, avg: 10594, count: 5625, desc: 'Single transit hub layover' },
    { stops: '2 Stops', median: 12700, avg: 12715, count: 1520, desc: 'Dual transit connections' },
    { stops: '3-4 Stops', median: 13100, avg: 13112, count: 46, desc: 'Multi-leg extended routes' },
  ];

  const monthlyData = [
    { month: 'March', avgPrice: 10650, flightCount: 2724, note: 'Year-end business travel & Holi' },
    { month: 'April', avgPrice: 5770, flightCount: 1079, note: 'Post-school reopening travel dip' },
    { month: 'May', avgPrice: 9150, flightCount: 3465, note: 'Peak summer family vacations' },
    { month: 'June', avgPrice: 8820, flightCount: 3414, note: 'Monsoon travel & return routes' },
  ];

  const correlationMatrix = [
    { feature: 'Price', stops: 0.60, duration: 0.51, month: -0.11, day: -0.15, depHour: 0.01 },
    { feature: 'Total_Stops', stops: 1.00, duration: 0.74, month: 0.05, day: -0.01, depHour: -0.06 },
    { feature: 'Duration_Mins', stops: 0.74, duration: 1.00, month: 0.02, day: -0.02, depHour: 0.00 },
    { feature: 'Journey_Month', stops: 0.05, duration: 0.02, month: 1.00, day: -0.26, depHour: 0.04 },
    { feature: 'Journey_Day', stops: -0.01, duration: -0.02, month: -0.26, day: 1.00, dayHour: 0.00 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase">
              <span>Part D</span>
              <span aria-hidden="true">·</span>
              <span>Stage 5</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Exploratory Data Analysis & Statistical Visualizations
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Analysis of key drivers influencing flight ticket pricing across airlines, layovers, durations, and temporal dimensions.
            </p>
          </div>

          {/* Visual Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveVisual('airline')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeVisual === 'airline' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Airline vs Price
            </button>
            <button
              onClick={() => setActiveVisual('stops')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeVisual === 'stops' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Stops vs Price
            </button>
            <button
              onClick={() => setActiveVisual('duration')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeVisual === 'duration' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Duration Scatter
            </button>
            <button
              onClick={() => setActiveVisual('monthly')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeVisual === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4. Monthly Trends
            </button>
            <button
              onClick={() => setActiveVisual('heatmap')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeVisual === 'heatmap' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              5. Correlation Matrix
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        {/* Visual 1: Airline vs Price */}
        {activeVisual === 'airline' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Visualization 1: Mean & Range of Ticket Price by Airline
                </h3>
                <span className="text-xs text-slate-500">Distribution analysis across 8 major Indian domestic carriers</span>
              </div>
              <span className="text-xs text-indigo-600 font-mono-tabular font-medium">Target Metric: Fare in ₹</span>
            </div>

            {/* Custom Bar Chart with Price Spreads */}
            <div className="space-y-3">
              {airlineData.map((item) => {
                const maxBenchmark = 60000;
                const widthPercent = Math.min(100, Math.round((item.avg / maxBenchmark) * 100));

                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900 w-44 truncate">{item.name}</span>
                      <div className="flex items-center gap-3 font-mono-tabular">
                        <span className="text-slate-400 text-[11px]">Range: ₹{item.min.toLocaleString('en-IN')} - ₹{item.max.toLocaleString('en-IN')}</span>
                        <span className="font-bold text-slate-900 w-20 text-right">₹{item.avg.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${widthPercent}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mandatory Academic Observation Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analytical Observation 1</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Observation:</strong> <code className="text-slate-900 font-mono">Jet Airways Business</code> commands an extraordinary pricing premium (average ₹58,230), reflecting corporate executive amenities. Among economy passenger carriers, <code className="text-slate-900 font-mono">Jet Airways</code> and <code className="text-slate-900 font-mono">Multiple carriers</code> maintain the highest mean fares (~₹11,600 and ~₹10,900), whereas low-cost carriers (<code className="text-slate-900 font-mono">SpiceJet</code> and <code className="text-slate-900 font-mono">Air Asia</code>) cluster between ₹4,300 and ₹5,600.
              </p>
              <p className="text-slate-600">
                <strong>ML Implication:</strong> The airline feature has high discriminatory power. One-Hot Encoding is essential to avoid imposing an artificial ordinal hierarchy between airlines.
              </p>
            </div>
          </div>
        )}

        {/* Visual 2: Stops vs Price */}
        {activeVisual === 'stops' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Visualization 2: Total Stops vs. Ticket Price
                </h3>
                <span className="text-xs text-slate-500">Evaluating transit layovers against ticket expenditure</span>
              </div>
              <span className="text-xs text-indigo-600 font-mono-tabular font-medium">Sample size: 10,682 flights</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stopsData.map((stop) => (
                <div key={stop.stops} className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                  <span className="text-xs font-semibold text-slate-700 block">{stop.stops}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900 font-mono-tabular">₹{stop.avg.toLocaleString('en-IN')}</span>
                    <span className="text-[11px] text-slate-500 font-mono-tabular">avg</span>
                  </div>
                  <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-200">
                    <div className="flex justify-between font-mono-tabular">
                      <span>Median:</span>
                      <span className="font-semibold text-slate-800">₹{stop.median.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-mono-tabular">
                      <span>Count:</span>
                      <span>{stop.count.toLocaleString('en-IN')} flights</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 pt-1 italic">{stop.desc}</p>
                </div>
              ))}
            </div>

            {/* Mandatory Academic Observation Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analytical Observation 2</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Observation:</strong> Non-stop flights have an average fare of ₹5,024, whereas flights with 1 stop surge dramatically by <span className="font-semibold text-indigo-700">+110%</span> to an average of ₹10,594. Flights with 2 stops average ₹12,715. Flights with 3 or 4 stops plateau at ~₹13,100 due to severe passenger inconvenience offsetting further premium charges.
              </p>
              <p className="text-slate-600">
                <strong>ML Implication:</strong> <code className="text-slate-900 font-mono">Total_Stops</code> has a strong positive Spearman correlation ($r = 0.60$) with price. Encoding it ordinally (0, 1, 2, 3, 4) provides our regression models with clear linear and non-linear splits.
              </p>
            </div>
          </div>
        )}

        {/* Visual 3: Duration vs Price */}
        {activeVisual === 'duration' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Visualization 3: Flight Duration (Minutes) vs. Price Scatter Trend
                </h3>
                <span className="text-xs text-slate-500">Exploring continuous flight elapsed time against ticket price</span>
              </div>
              <span className="text-xs text-indigo-600 font-mono-tabular font-medium">Correlation: r = 0.51</span>
            </div>

            {/* SVG Scatter Plot with Trend Line */}
            <div className="h-64 w-full bg-slate-50 border border-slate-200 rounded-lg p-4 relative flex flex-col justify-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#e2e8f0" strokeDasharray="3,3" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#e2e8f0" strokeDasharray="3,3" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#e2e8f0" strokeDasharray="3,3" />
                <line x1="0" y1="190" x2="500" y2="190" stroke="#cbd5e1" />

                {/* Simulated Scatter dots */}
                {[
                  { x: 35, y: 165 }, { x: 42, y: 170 }, { x: 48, y: 155 }, { x: 55, y: 168 },
                  { x: 60, y: 150 }, { x: 95, y: 140 }, { x: 120, y: 130 }, { x: 140, y: 110 },
                  { x: 165, y: 125 }, { x: 180, y: 95 }, { x: 210, y: 88 }, { x: 235, y: 105 },
                  { x: 260, y: 85 }, { x: 290, y: 75 }, { x: 320, y: 80 }, { x: 345, y: 65 },
                  { x: 380, y: 70 }, { x: 420, y: 55 }, { x: 460, y: 50 }, { x: 280, y: 25 },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    fill="#6366f1"
                    opacity="0.75"
                    className="hover:opacity-100 hover:r-6 transition-all"
                  />
                ))}

                {/* Regression Trend Line */}
                <line x1="30" y1="172" x2="470" y2="48" stroke="#4338ca" strokeWidth="2.5" />
              </svg>

              <div className="flex justify-between text-[11px] text-slate-500 pt-2 font-mono-tabular border-t border-slate-200">
                <span>75 mins (1.2h non-stop)</span>
                <span>600 mins (10h 1-stop)</span>
                <span>1200 mins (20h 2-stops)</span>
                <span>1800+ mins (30h multi-leg)</span>
              </div>
            </div>

            {/* Mandatory Academic Observation Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analytical Observation 3</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Observation:</strong> Flight duration displays a prominent positive correlation with ticket price. Direct short-haul flights (75 to 180 minutes) cluster tightly in the ₹3,000–₹6,500 band. Once duration extends beyond 500 minutes (indicating layover wait times in hub airports), prices rise significantly into the ₹8,000–₹16,000 range.
              </p>
              <p className="text-slate-600">
                <strong>ML Implication:</strong> Converting duration strings (&quot;2h 50m&quot;) into a single continuous feature <code className="text-slate-900 font-mono">Duration_Mins</code> gives regressors a direct numeric slope for gradient computation.
              </p>
            </div>
          </div>
        )}

        {/* Visual 4: Monthly Trends */}
        {activeVisual === 'monthly' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Visualization 4: Monthly Price Seasonality
                </h3>
                <span className="text-xs text-slate-500">Quarterly variance across March, April, May, and June</span>
              </div>
              <span className="text-xs text-indigo-600 font-mono-tabular font-medium">Academic Year Period</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {monthlyData.map((m) => (
                <div key={m.month} className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                  <span className="text-sm font-bold text-slate-900 block">{m.month}</span>
                  <div className="text-2xl font-bold text-indigo-700 font-mono-tabular">
                    ₹{m.avgPrice.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-slate-500 block font-mono-tabular">
                    Volume: {m.flightCount.toLocaleString('en-IN')} bookings
                  </span>
                  <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                    {m.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Mandatory Academic Observation Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analytical Observation 4</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Observation:</strong> March witnesses the highest average ticket price (₹10,650), propelled by corporate financial year-end closures and the festival of Holi. April experiences a sharp 46% decline down to ₹5,770, coinciding with school re-openings and off-season lull. Fares rebound in May (₹9,150) and June (₹8,820) during summer vacation peaks.
              </p>
              <p className="text-slate-600">
                <strong>ML Implication:</strong> Decomposing <code className="text-slate-900 font-mono">Date_of_Journey</code> into <code className="text-slate-900 font-mono">Journey_Month</code> and <code className="text-slate-900 font-mono">Journey_Day</code> allows the models to learn these seasonal macro-demand waves.
              </p>
            </div>
          </div>
        )}

        {/* Visual 5: Correlation Matrix Heatmap */}
        {activeVisual === 'heatmap' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Visualization 5: Pearson Correlation Matrix Heatmap
                </h3>
                <span className="text-xs text-slate-500">Pairwise linear correlation coefficients between numerical attributes</span>
              </div>
              <span className="text-xs text-indigo-600 font-mono-tabular font-medium">Metric: Pearson r [-1.0 to +1.0]</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-semibold">
                    <th className="px-4 py-2.5 text-left border border-slate-200">Feature</th>
                    <th className="px-4 py-2.5 border border-slate-200">Price (y)</th>
                    <th className="px-4 py-2.5 border border-slate-200">Total_Stops</th>
                    <th className="px-4 py-2.5 border border-slate-200">Duration_Mins</th>
                    <th className="px-4 py-2.5 border border-slate-200">Journey_Month</th>
                    <th className="px-4 py-2.5 border border-slate-200">Journey_Day</th>
                  </tr>
                </thead>
                <tbody className="font-mono-tabular">
                  {correlationMatrix.map((row) => (
                    <tr key={row.feature} className="border-b border-slate-200">
                      <td className="px-4 py-2.5 font-sans font-semibold text-slate-900 text-left border border-slate-200 bg-slate-50/50">
                        {row.feature}
                      </td>
                      <td className={`px-4 py-2.5 border border-slate-200 font-bold ${row.stops === 1.0 ? 'bg-indigo-600 text-white' : row.stops > 0.4 ? 'bg-indigo-100 text-indigo-900' : 'bg-slate-50 text-slate-700'}`}>
                        {row.stops.toFixed(2)}
                      </td>
                      <td className={`px-4 py-2.5 border border-slate-200 ${row.duration === 1.0 ? 'bg-indigo-600 text-white' : row.duration > 0.4 ? 'bg-indigo-100 text-indigo-900' : 'bg-slate-50 text-slate-700'}`}>
                        {row.duration.toFixed(2)}
                      </td>
                      <td className="px-4 py-2.5 border border-slate-200 bg-slate-50 text-slate-700">
                        {row.month.toFixed(2)}
                      </td>
                      <td className="px-4 py-2.5 border border-slate-200 bg-slate-50 text-slate-700">
                        {row.day.toFixed(2)}
                      </td>
                      <td className="px-4 py-2.5 border border-slate-200 bg-slate-50 text-slate-700">
                        {row.depHour?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mandatory Academic Observation Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analytical Observation 5</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Observation:</strong> <code className="text-slate-900 font-mono">Total_Stops</code> has the strongest positive correlation with ticket price (<span className="font-semibold text-indigo-700">+0.60</span>), followed closely by <code className="text-slate-900 font-mono">Duration_Mins</code> (<span className="font-semibold text-indigo-700">+0.51</span>). <code className="text-slate-900 font-mono">Total_Stops</code> and <code className="text-slate-900 font-mono">Duration_Mins</code> also exhibit high collinearity with each other (+0.74), reflecting that multi-stop flights inherently take longer.
              </p>
              <p className="text-slate-600">
                <strong>ML Implication:</strong> While linear regression will be challenged by collinearity between Stops and Duration (VIF inflation), ensemble tree algorithms easily partition features orthogonally without matrix inversion degradation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
