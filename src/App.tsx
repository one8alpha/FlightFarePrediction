import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { PipelineOverview } from './components/PipelineOverview.tsx';
import { DatasetUnderstanding } from './components/DatasetUnderstanding.tsx';
import { EdaDashboard } from './components/EdaDashboard.tsx';
import { ModelEvaluation } from './components/ModelEvaluation.tsx';
import { LivePredictor } from './components/LivePredictor.tsx';
import { VivaAndDeliverables } from './components/VivaAndDeliverables.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('pipeline');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'pipeline' && <PipelineOverview onNavigateTab={setActiveTab} />}
        {activeTab === 'dataset' && <DatasetUnderstanding />}
        {activeTab === 'eda' && <EdaDashboard />}
        {activeTab === 'models' && <ModelEvaluation />}
        {activeTab === 'predictor' && <LivePredictor />}
        {activeTab === 'viva' && <VivaAndDeliverables />}
      </main>

      {/* Clean Academic Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-800">Roll No. 17 · Flight Fare Prediction</span>
            <span className="mx-2">·</span>
            <span>Third Year B.Tech Computer Science & Engineering</span>
            <span className="mx-2">·</span>
            <span>Machine Learning Lab (AY 2026-27)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('pipeline')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Pipeline
            </button>
            <button
              onClick={() => setActiveTab('predictor')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Predictor
            </button>
            <button
              onClick={() => setActiveTab('viva')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Viva Guide
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
