import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { PredictPage } from './components/PredictPage';
import { DashboardPage } from './components/DashboardPage';
import { SafetyTipsPage } from './components/SafetyTipsPage';
import { HistoryPage } from './components/HistoryPage';
import { AboutPage } from './components/AboutPage';
import { RouteMapPage } from './components/RouteMapPage';
import { AdvancedModelPage } from './components/AdvancedModelPage';
import { CollegeHubModal } from './components/CollegeHubModal';
import { ActiveTab, PredictionInput, RiskResult } from './types';
import { getStoredPredictions, savePrediction } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [predictions, setPredictions] = useState<RiskResult[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<PredictionInput | null>(null);
  const [collegeHubOpen, setCollegeHubOpen] = useState<boolean>(false);

  // Load persistent predictions on mount
  useEffect(() => {
    const list = getStoredPredictions();
    setPredictions(list);
  }, []);

  const handleRefreshPredictions = () => {
    const list = getStoredPredictions();
    setPredictions(list);
  };

  const handleApplyPreset = (presetData: PredictionInput) => {
    setSelectedPreset(presetData);
    setActiveTab('predict');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePredictionSaved = (newPred: RiskResult) => {
    handleRefreshPredictions();
  };

  const handleSelectPredictionFromList = (pred: RiskResult) => {
    setSelectedPreset(pred.input);
    setActiveTab('predict');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCollegeHub={() => setCollegeHubOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onApplyPreset={handleApplyPreset}
            onOpenCollegeHub={() => setCollegeHubOpen(true)}
          />
        )}

        {activeTab === 'predict' && (
          <PredictPage 
            initialInput={selectedPreset}
            onPredictionSaved={handlePredictionSaved}
          />
        )}

        {activeTab === 'map-routes' && (
          <RouteMapPage />
        )}

        {activeTab === 'advanced-model' && (
          <AdvancedModelPage />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage 
            predictions={predictions}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPrediction={handleSelectPredictionFromList}
          />
        )}

        {activeTab === 'safety' && (
          <SafetyTipsPage />
        )}

        {activeTab === 'history' && (
          <HistoryPage 
            predictions={predictions}
            onRefresh={handleRefreshPredictions}
            onSelectPrediction={handleSelectPredictionFromList}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage 
            onOpenCollegeHub={() => setCollegeHubOpen(true)}
          />
        )}
      </main>

      {/* College Project Viva & Python Hub Modal */}
      <CollegeHubModal 
        isOpen={collegeHubOpen}
        onClose={() => setCollegeHubOpen(false)}
      />

      {/* Global Footer */}
      <Footer 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCollegeHub={() => setCollegeHubOpen(true)}
      />
    </div>
  );
}
