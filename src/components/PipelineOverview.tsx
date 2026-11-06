import React, { useState } from 'react';
import { 
  FileText, Database, Settings2, BarChart3, ListFilter, Split, 
  Layers, Cpu, CheckCircle2, TrendingUp, Sparkles, Save, 
  Layout, ArrowRight, HelpCircle, AlertCircle
} from 'lucide-react';

interface PipelineOverviewProps {
  onNavigateTab: (tabId: string) => void;
}

export const PipelineOverview: React.FC<PipelineOverviewProps> = ({ onNavigateTab }) => {
  const [selectedStage, setSelectedStage] = useState<number>(1);

  const pipelineStages = [
    { step: 1, name: 'Problem Definition', part: 'Part 1', tab: 'pipeline', icon: FileText, desc: 'Define airfare regression task, business motivation, and target variable y.' },
    { step: 2, name: 'Dataset Understanding', part: 'Part 2', tab: 'dataset', icon: Database, desc: 'Analyze 10,683 airline records, 11 raw dimensions, data types, and nulls.' },
    { step: 3, name: 'Data Preprocessing', part: 'Part 3', tab: 'dataset', icon: Settings2, desc: 'Duplicate purge, missing value imputation, datetime parsing, and stop encoding.' },
    { step: 4, name: 'EDA & Visualizations', part: 'Part 4', tab: 'eda', icon: BarChart3, desc: '4+ statistical plots: airline fare boxplots, stops impact, duration scatter, heatmap.' },
    { step: 5, name: 'Feature & Target Selection', part: 'Part 5', tab: 'models', icon: ListFilter, desc: 'Extract X (29 encoded features) and y (Price in ₹); feature importance ranking.' },
    { step: 6, name: 'Train-Test Split', part: 'Part 6', tab: 'models', icon: Split, desc: '80% training (8,546 rows) and 20% testing (2,137 rows) with random_state=42.' },
    { step: 7, name: 'Model Selection', part: 'Part 7', tab: 'models', icon: Layers, desc: 'Implement Linear Regression, Decision Tree, Random Forest, and Gradient Boosting.' },
    { step: 8, name: 'Model Training', part: 'Part 8', tab: 'models', icon: Cpu, desc: 'Train algorithms using MSE loss minimization, bootstrap aggregation, and split depth.' },
    { step: 9, name: 'Model Evaluation', part: 'Part 9', tab: 'models', icon: CheckCircle2, desc: 'Benchmark MAE, MSE, RMSE, and R² scores; comparative analysis table.' },
    { step: 10, name: 'Model Visualization', part: 'Part 10', tab: 'models', icon: TrendingUp, desc: 'Actual vs. Predicted plots, residual distribution histogram, error variance.' },
    { step: 11, name: 'Model Improvement', part: 'Part 11', tab: 'models', icon: Sparkles, desc: 'Experiment 1 (Tuning) & Experiment 2 (Feature Engineering) with documented conclusions.' },
    { step: 12, name: 'Final Model Selection', part: 'Part 12', tab: 'models', icon: Save, desc: 'Select Tuned Random Forest Regressor (R²=0.866, RMSE=₹1,660); serialize model weights.' },
    { step: 13, name: 'Build Front End', part: 'Part 13', tab: 'predictor', icon: Layout, desc: 'Design interactive web UI for parameter entry (airlines, dates, routes, stops).' },
    { step: 14, name: 'Load Model', part: 'Part 14', tab: 'predictor', icon: Database, desc: 'Mount trained model inference weights in the client-side prediction pipeline.' },
    { step: 15, name: 'Take User Input', part: 'Part 15', tab: 'predictor', icon: Settings2, desc: 'Accept user parameters with route validation and automatic duration derivation.' },
    { step: 16, name: 'Generate Prediction', part: 'Part 16', tab: 'predictor', icon: Cpu, desc: 'Transform user input vector through trained encoders and execute regression tree scoring.' },
    { step: 17, name: 'Display Output', part: 'Part 17', tab: 'predictor', icon: BarChart3, desc: 'Render predicted airfare in ₹, confidence spread, breakdown, and flight insights.' },
    { step: 18, name: 'Viva Voce & Defense', part: 'Part 18', tab: 'viva', icon: HelpCircle, desc: 'Defend model decisions, metrics, preprocessing, and examiner what-if scenarios.' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Academic Context Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wide uppercase">
              <span>Third Year B.Tech CSE</span>
              <span aria-hidden="true">·</span>
              <span>Academic Year 2026-27</span>
              <span aria-hidden="true">·</span>
              <span>Machine Learning Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Roll No. 17: Flight Fare Prediction
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              An end-to-end Machine Learning regression pipeline developed in strict accordance with the academic notice guidelines. 
              Encompassing data cleaning, temporal feature engineering, multi-algorithm benchmarking, hyperparameter tuning, interactive deployment, and viva defense.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center sm:text-left">
              <span className="text-xs text-slate-500 block">Assigned Roll No.</span>
              <span className="text-xl font-bold text-slate-900 font-mono-tabular">17</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center sm:text-left">
              <span className="text-xs text-slate-500 block">Task Classification</span>
              <span className="text-sm font-semibold text-indigo-700">Regression</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center sm:text-left">
              <span className="text-xs text-slate-500 block">Best Model R²</span>
              <span className="text-xl font-bold text-emerald-600 font-mono-tabular">0.866</span>
            </div>
          </div>
        </div>
      </div>

      {/* Part A & Part B: Problem Understanding & Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Part A: Problem Understanding */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Part A: Problem Understanding</h2>
            <span className="text-xs font-medium text-slate-500">Stage 1</span>
          </div>

          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong className="text-slate-900">Real-World Requirement:</strong> Airline ticket pricing is highly volatile and driven by dynamic demand, route distance, fuel costs, seasonal spikes, time of day, and layover logistics. Predicting airfare enables consumers to time purchases and allows travel agencies to optimize booking policies.
            </p>
            <p>
              <strong className="text-slate-900">Input Variables (X):</strong> Airline carrier, source city, destination city, date of journey, departure timestamp, arrival timestamp, total stops, and route flight duration.
            </p>
            <p>
              <strong className="text-slate-900">Target Variable (y):</strong> Ticket Price in Indian Rupees (<span className="font-mono-tabular text-slate-900 font-semibold">₹ Price</span>).
            </p>
            
            <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100 text-xs text-indigo-900 space-y-1">
              <span className="font-semibold block text-indigo-950">Why Regression is Appropriate:</span>
              <span>
                Ticket price is a continuous, non-bounded real number (ŷ ∈ ℝ⁺). The objective is to minimize distance-based continuous loss (Mean Squared Error), not classify discrete categories.
              </span>
            </div>
          </div>
        </div>

        {/* Part B: Aim & Objectives */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Part B: Aim & Objectives</h2>
            <span className="text-xs font-medium text-slate-500">Stage 2</span>
          </div>

          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-900">
              <strong className="text-slate-900">Aim:</strong> To develop, evaluate, and deploy a supervised Machine Learning regression pipeline for predicting domestic flight fares based on itinerary, timing, and carrier attributes.
            </p>

            <div className="space-y-1.5 text-xs">
              <span className="font-semibold text-slate-900 block">Specific Objectives:</span>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Load and inspect 10,683 airline ticket transactions from UCI/Kaggle benchmark data.</li>
                <li>Clean missing values, eliminate 220 duplicates, and parse temporal date/hour/duration variables.</li>
                <li>Conduct exploratory data analysis across 5 multi-variable visualizations.</li>
                <li>Split preprocessed dataset into 80% training and 20% testing subsets with fixed random state.</li>
                <li>Train and evaluate at least 4 regression algorithms (Linear, Decision Tree, Random Forest, GBDT).</li>
                <li>Perform hyperparameter tuning experiments to minimize RMSE and prevent overfitting.</li>
                <li>Deploy a reactive front-end interface accepting live user inputs for instantaneous fare inference.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 18-Step Pipeline Interactive Roadmap */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Complete Machine Learning Pipeline (18 Stages)
            </h2>
            <p className="text-xs text-slate-500">
              Interactive representation of the mandatory pipeline prescribed on Page 3 of the notice. Click any stage to inspect or jump to its tab.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span>
            <span>A. Model Development (Steps 1–12)</span>
            <span className="w-3 h-3 rounded-full bg-purple-600 inline-block ml-3"></span>
            <span>B. Front-End & Viva (Steps 13–18)</span>
          </div>
        </div>

        {/* Pipeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.step;
            const isModelDev = stage.step <= 12;

            return (
              <button
                key={stage.step}
                onClick={() => setSelectedStage(stage.step)}
                className={`p-3 text-left rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? isModelDev
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-600'
                      : 'border-purple-600 bg-purple-50/50 shadow-xs ring-1 ring-purple-600'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isModelDev ? 'bg-indigo-100 text-indigo-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {stage.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? (isModelDev ? 'text-indigo-600' : 'text-purple-600') : 'text-slate-400'}`} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block leading-tight">
                    {stage.name}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {stage.part}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        {selectedStage && (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-700 uppercase">
                  Stage {pipelineStages[selectedStage - 1].step}: {pipelineStages[selectedStage - 1].part}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-sm font-semibold text-slate-900">
                  {pipelineStages[selectedStage - 1].name}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {pipelineStages[selectedStage - 1].desc}
              </p>
            </div>

            <button
              onClick={() => onNavigateTab(pipelineStages[selectedStage - 1].tab)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Explore In Detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
