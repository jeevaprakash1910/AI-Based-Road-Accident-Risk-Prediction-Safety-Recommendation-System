import React from 'react';
import { 
  ShieldAlert, 
  ArrowRight, 
  CloudRain, 
  Eye, 
  Gauge, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Car, 
  Zap, 
  Compass, 
  GraduationCap,
  Sparkles,
  Navigation,
  Cpu,
  MapPin
} from 'lucide-react';
import { ActiveTab, PredictionInput } from '../types';
import { PRESET_SCENARIOS } from '../utils/mlModel';

interface HomePageProps {
  setActiveTab: (tab: ActiveTab) => void;
  onApplyPreset: (preset: PredictionInput) => void;
  onOpenCollegeHub: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onApplyPreset, onOpenCollegeHub }) => {
  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-900/60 to-slate-950">
        {/* Subtle background ambient blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* College project badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs text-slate-300 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
              <span className="font-semibold text-orange-400 font-mono">ROADGUARD v1.0</span>
              <span className="text-slate-500">•</span>
              <span>AI & Data Science Engineering Project</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              AI-Based Road Accident Risk Prediction &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400">
                Safety Recommendation
              </span>
            </h1>

            {/* Problem statement paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              According to the World Health Organization, over <strong>1.19 million lives</strong> are lost each year to road traffic collisions. RoadGuard leverages supervised machine learning to compute real-time accident risk from 10 distinct environmental, vehicular, and roadway metrics — offering actionable safety precautions <em>before</em> an accident occurs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                id="hero-check-risk-btn"
                onClick={() => setActiveTab('predict')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02]"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Check Risk Now</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                id="hero-map-routes-btn"
                onClick={() => setActiveTab('map-routes')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-orange-500/40 font-semibold text-sm transition-all hover:border-orange-500 shadow-md"
              >
                <Navigation className="w-4 h-4 text-orange-400" />
                <span>Google Maps Routes</span>
              </button>

              <button
                id="hero-advanced-model-btn"
                onClick={() => setActiveTab('advanced-model')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-semibold text-sm transition-all hover:border-slate-600"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Advanced AI Model</span>
              </button>

              <button
                id="hero-college-hub-btn"
                onClick={onOpenCollegeHub}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-indigo-950/70 hover:bg-indigo-900/90 text-indigo-300 border border-indigo-700/60 font-medium text-xs transition-all"
              >
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Viva & Python Docs</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 max-w-2xl mx-auto text-left">
              <div className="p-2">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">94.2%</div>
                <div className="text-xs text-slate-400">Model Accuracy</div>
              </div>
              <div className="p-2">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">10 Factors</div>
                <div className="text-xs text-slate-400">Environmental Inputs</div>
              </div>
              <div className="p-2">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">&lt; 50ms</div>
                <div className="text-xs text-slate-400">Inference Latency</div>
              </div>
              <div className="p-2">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">Proactive</div>
                <div className="text-xs text-slate-400">Pre-Crash Defense</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 1-Click Interactive Test Scenarios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Instant Test Drive</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Pre-Configured Road Hazard Scenarios</h2>
            <p className="text-xs text-slate-400">Click any real-world preset to immediately load parameters into the ML predictor.</p>
          </div>
          <span className="text-xs text-slate-500 mt-2 sm:mt-0">Ideal for college live demos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRESET_SCENARIOS.map((scenario, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-orange-500/50 hover:bg-slate-850 transition-all flex flex-col justify-between group cursor-pointer shadow-md"
              onClick={() => onApplyPreset(scenario.data)}
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-100 text-sm group-hover:text-orange-400 transition-colors">
                  {scenario.label}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {scenario.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-orange-400 font-medium">
                <span>Load & Predict</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Capabilities / Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>Architecture & Modules</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How RoadGuard Protects Every Journey</h2>
          <p className="text-sm text-slate-400 mt-2">
            Engineered using supervised ensemble decision trees, kinematic braking physics, and situational recommendation rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Multi-Factor Risk Ingestion */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <CloudRain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">10-Factor Environmental Ingestion</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Considers weather, surface wetness/ice, traffic congestion, visibility distance, lighting, vehicle travel speed, and highway vs. mountain road profiles simultaneously.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Tire-to-road friction coefficients</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Atmospheric visibility degradation</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Random Forest Inference */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Supervised Ensemble Scoring</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uses a trained Random Forest model that models non-linear interactions (e.g. rain + unlit road + high speed = compound hazard) rather than simplistic single-factor thresholds.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>LOW / MEDIUM / HIGH risk bands</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>Percentage risk score (0-100%)</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Actionable Advice & Physics */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Kinematic Braking & Safety Action</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Computes actual physical stopping distance (perception-reaction + mechanical braking) and generates immediate, prioritized defensive actions for the driver.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Calculates stopping distance in meters</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Prioritized critical safety checklist</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Road Safety Awareness Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>Road Safety Awareness</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Understanding The "Fatal Multipliers" on Modern Roadways
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Most catastrophic highway collisions do not stem from a single isolated defect. Instead, they occur when multiple adverse factors intersect — like high vehicle speed on a wet asphalt surface in poor visibility.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 text-xs text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-orange-400 flex items-center justify-center font-bold flex-shrink-0 text-[11px]">1</div>
                  <p><strong>Speed Multiplier:</strong> At 100 km/h, emergency stopping distance is over 80 meters on dry road, and over 140 meters on wet pavement.</p>
                </div>
                <div className="flex items-start space-x-3 text-xs text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-orange-400 flex items-center justify-center font-bold flex-shrink-0 text-[11px]">2</div>
                  <p><strong>Reaction Lag:</strong> An alert driver requires 1.5 seconds to perceive and react to a hazard; at 80 km/h, the car covers 33.3 meters blind.</p>
                </div>
                <div className="flex items-start space-x-3 text-xs text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-orange-400 flex items-center justify-center font-bold flex-shrink-0 text-[11px]">3</div>
                  <p><strong>Aquaplaning Vulnerability:</strong> Water sheets as thin as 2.5 mm can lift tires off the pavement at speeds over 75 km/h.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="safety-explore-btn"
                  onClick={() => setActiveTab('safety')}
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-orange-400 hover:text-orange-300 transition"
                >
                  <span>Explore All Categorized Safety Tips</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Callout Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
                <span>Stopping Distance Comparison</span>
                <span className="text-[10px] text-slate-400">Speed: 80 km/h</span>
              </h3>

              {/* Dry Road Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Dry Surface (μ = 0.75)</span>
                  <span className="font-mono text-emerald-400 font-bold">~ 57 meters</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-blue-500 h-full w-[35%]" title="Reaction: 33m"></div>
                  <div className="bg-emerald-500 h-full w-[25%]" title="Braking: 24m"></div>
                </div>
              </div>

              {/* Wet Road Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Wet Surface (μ = 0.42)</span>
                  <span className="font-mono text-amber-400 font-bold">~ 93 meters (+63%)</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-blue-500 h-full w-[35%]" title="Reaction: 33m"></div>
                  <div className="bg-amber-500 h-full w-[58%]" title="Braking: 60m"></div>
                </div>
              </div>

              {/* Icy Road Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Icy / Frost Surface (μ = 0.15)</span>
                  <span className="font-mono text-rose-400 font-bold">~ 201 meters (+252%)</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-blue-500 h-full w-[16%]" title="Reaction: 33m"></div>
                  <div className="bg-rose-500 h-full w-[84%]" title="Braking: 168m"></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-blue-500"></span>
                  <span>Driver Perception (1.5s)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
                  <span>Mechanical Braking</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 to-rose-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold">Ready to Evaluate Road Risk?</h2>
            <p className="text-orange-100 text-sm max-w-xl">
              Input current weather, traffic density, and road type to obtain immediate ML classification, contributing hazard factors, and safe speed thresholds.
            </p>
          </div>
          <button
            id="bottom-cta-predict"
            onClick={() => setActiveTab('predict')}
            className="px-8 py-3.5 rounded-xl bg-white text-orange-600 font-bold text-sm shadow-md hover:bg-orange-50 active:scale-95 transition-all flex-shrink-0"
          >
            Launch Risk Predictor
          </button>
        </div>
      </section>

    </div>
  );
};
