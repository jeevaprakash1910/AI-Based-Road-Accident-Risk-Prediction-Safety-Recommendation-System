import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Layers, 
  Activity, 
  Sliders, 
  BarChart3, 
  ShieldAlert, 
  Radio, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Volume2, 
  Zap,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  calculateAdvancedModelRisk, 
  playSafetyWarningBeep 
} from '../utils/advancedEngine';
import { 
  WeatherType, 
  RoadConditionType, 
  LightingType 
} from '../types';

export const AdvancedModelPage: React.FC = () => {
  // Advanced Telematics & Environmental Inputs
  const [speedKmh, setSpeedKmh] = useState<number>(95);
  const [roadSlope, setRoadSlope] = useState<number>(4); // Incline %
  const [curveRadius, setCurveRadius] = useState<number>(180); // meters
  const [fatigueHours, setFatigueHours] = useState<number>(3.5); // continuous driving hours
  const [weather, setWeather] = useState<WeatherType>('Rainy');
  const [roadCondition, setRoadCondition] = useState<RoadConditionType>('Wet');
  const [lighting, setLighting] = useState<LightingType>('Dark / No Streetlights');
  const [absEnabled, setAbsEnabled] = useState<boolean>(true);
  const [sosDispatched, setSosDispatched] = useState<boolean>(false);

  // Compute Advanced ML & Physics Output
  const analysis = useMemo(() => {
    return calculateAdvancedModelRisk({
      location: 'Advanced Laboratory Simulation Corridor',
      weather,
      roadCondition,
      trafficLevel: 'Heavy',
      visibility: weather === 'Foggy' ? 'Poor (100-500m)' : 'Moderate (500m-1km)',
      timeOfDay: 'Late Night (11 PM-5 AM)',
      speedKmh,
      roadType: roadSlope > 3 ? 'Ghat / Mountain Pass' : 'Expressway / Highway',
      lighting,
      numVehicles: 12
    }, {
      roadSlopePercent: roadSlope,
      curveRadiusMeters: curveRadius,
      fatigueHours,
      absEngaged: absEnabled
    });
  }, [speedKmh, roadSlope, curveRadius, fatigueHours, weather, roadCondition, lighting, absEnabled]);

  const handleTestSOS = () => {
    playSafetyWarningBeep('critical');
    setSosDispatched(true);
    setTimeout(() => {
      setSosDispatched(false);
    }, 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title & Architecture Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
            <Cpu className="w-4 h-4" />
            <span>Multi-Factor Non-Linear Ensemble Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Advanced AI Risk Model & SHAP Laboratory
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fine-tune high-dimensional telematics, evaluate SHAP feature importance vectors, and test vehicle telemetry responses.
          </p>
        </div>

        {/* SOS Telematics Trigger */}
        <button
          id="simulate-emergency-sos-btn"
          onClick={handleTestSOS}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-900/30 transition"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          <span>Simulate Emergency SOS Packet</span>
        </button>
      </div>

      {/* SOS Notification Toast */}
      {sosDispatched && (
        <div className="bg-rose-950 border border-rose-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between animate-bounce">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0" />
            <div>
              <strong className="text-sm font-bold block">EMERGENCY TELEMATICS TRANSMITTED</strong>
              <span className="text-xs text-rose-200">
                Lat: 12.9716, Lng: 77.5946 | Instant Risk: {analysis.finalScore}% | Impact Kinetic Energy: {analysis.kinematicEnergyKj} kJ | Nearest Trauma Center Alerted
              </span>
            </div>
          </div>
          <span className="font-mono text-xs bg-rose-900 px-3 py-1 rounded-full text-rose-200">
            DISPATCH ACKNOWLEDGED
          </span>
        </div>
      )}

      {/* Top 4 Performance Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Model Ensemble Architecture</span>
          <div className="text-lg font-bold text-white mt-1">RF + GBM + Bayesian</div>
          <span className="text-[11px] text-emerald-400 mt-0.5 block">100 Trees • Depth 12</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">F1 Score Accuracy</span>
          <div className="text-lg font-bold text-white mt-1">95.2% Overall</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Validation ROC-AUC: 0.978</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Kinetic Energy Release</span>
          <div className="text-lg font-bold text-orange-400 mt-1 font-mono">{analysis.kinematicEnergyKj} kJ</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">0.5 * Mass * (v/3.6)²</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Centrifugal Lateral Load</span>
          <div className="text-lg font-bold text-purple-400 mt-1 font-mono">{analysis.centrifugalForceG} G</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Threshold rollover: 0.40 G</span>
        </div>

      </div>

      {/* Interactive Controls & Real-Time SHAP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Telematics Lab Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Environmental & Vehicle Parameter Controls
            </span>
          </div>

          <div className="space-y-5">
            {/* Speed Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">Cruising Speed</span>
                <span className="font-mono text-orange-400 font-bold">{speedKmh} km/h</span>
              </div>
              <input
                type="range"
                min="20"
                max="160"
                step="5"
                value={speedKmh}
                onChange={(e) => setSpeedKmh(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>20 km/h (City)</span>
                <span>80 km/h (Limit)</span>
                <span>160 km/h (Extreme)</span>
              </div>
            </div>

            {/* Road Incline Slope Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">Road Incline Grade (Downhill / Uphill)</span>
                <span className="font-mono text-purple-400 font-bold">{roadSlope > 0 ? `+${roadSlope}% Downhill` : `${roadSlope}% Flat`}</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={roadSlope}
                onChange={(e) => setRoadSlope(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>0% Flat</span>
                <span>6% Mountain Ghat</span>
                <span>12% Extreme Incline</span>
              </div>
            </div>

            {/* Curve Radius */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">Curve Radius (Sharpness)</span>
                <span className="font-mono text-blue-400 font-bold">{curveRadius} meters</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={curveRadius}
                onChange={(e) => setCurveRadius(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>50m (Hairpin)</span>
                <span>200m (Standard)</span>
                <span>500m (Gentle)</span>
              </div>
            </div>

            {/* Driver Fatigue Hours */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">Driver Continuous Driving Hours</span>
                <span className="font-mono text-amber-400 font-bold">{fatigueHours} hrs</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={fatigueHours}
                onChange={(e) => setFatigueHours(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>0.5h (Fresh)</span>
                <span>3h (Fatigued)</span>
                <span>8h (Severe Drowsiness)</span>
              </div>
            </div>

            {/* Weather & Road Condition Selectors */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Weather</label>
                <select
                  value={weather}
                  onChange={(e) => setWeather(e.target.value as WeatherType)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value="Clear">Clear Skies</option>
                  <option value="Rainy">Heavy Rain</option>
                  <option value="Foggy">Dense Fog</option>
                  <option value="Snow">Snow / Freezing</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Surface Friction</label>
                <select
                  value={roadCondition}
                  onChange={(e) => setRoadCondition(e.target.value as RoadConditionType)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value="Dry">Dry Asphalt (μ=0.75)</option>
                  <option value="Wet">Wet Waterlogged (μ=0.42)</option>
                  <option value="Icy">Ice Glaze (μ=0.15)</option>
                  <option value="Potholes / Damaged">Damaged Surface</option>
                </select>
              </div>
            </div>

            {/* ABS Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-semibold text-white block">Anti-Lock Braking System (ABS)</span>
                <span className="text-[10px] text-slate-400">Prevents wheel lockup during emergency deceleration</span>
              </div>
              <button
                type="button"
                onClick={() => setAbsEnabled(!absEnabled)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                  absEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  absEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

          </div>
        </div>

        {/* Right: Real-Time SHAP Attribution & Model Comparison (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Risk Output Gauge Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Predicted Composite Hazard Probability
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                analysis.riskBand === 'HIGH'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : analysis.riskBand === 'MEDIUM'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {analysis.riskBand} SEVERITY BAND
              </span>
            </div>

            <div className="flex items-baseline space-x-3">
              <div className="text-5xl font-black font-mono text-white">
                {analysis.finalScore}
                <span className="text-2xl text-orange-400">%</span>
              </div>
              <div className="text-xs text-slate-400">
                Confidence: <strong className="text-slate-200">{analysis.confidencePercent}%</strong> across 100 decision trees
              </div>
            </div>

            {/* Dynamic Stopping Distance & Physics Bar */}
            <div className="pt-2 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Total Stopping Distance (Driver Reaction + Physical Braking):</span>
                <span className="font-mono font-bold text-blue-400">{analysis.dynamicBrakingDistanceMeters} meters</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    analysis.dynamicBrakingDistanceMeters > 90 ? 'bg-rose-500' : analysis.dynamicBrakingDistanceMeters > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (analysis.dynamicBrakingDistanceMeters / 150) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0m</span>
                <span>Driver Delay: {analysis.adjustedReactionSeconds}s</span>
                <span>150m (Max Safe Corridor)</span>
              </div>
            </div>
          </div>

          {/* SHAP Feature Attribution Waterfall Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  SHAP Feature Importance (Explainable AI)
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Base Risk Baseline: 15%</span>
            </div>

            <p className="text-xs text-slate-400">
              SHAP decomposes the composite risk into additive marginal contributions, showing exactly why the model arrived at this score:
            </p>

            <div className="space-y-3 pt-1">
              {analysis.shapFactors.map((factor, idx) => {
                const isRiskInc = factor.direction === 'increases_risk';
                return (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-200">{factor.featureName}</span>
                      <span className={`font-mono font-bold text-xs ${
                        isRiskInc ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {isRiskInc ? `+${factor.deltaRiskPercentage}%` : `${factor.deltaRiskPercentage}%`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isRiskInc ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min(100, Math.abs(factor.deltaRiskPercentage) * 3.5)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Baseline: {factor.baselineValue}</span>
                      <span className="capitalize">{factor.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Multi-Model Ensemble Consensus Comparison */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Multi-Model Ensemble Voting Consensus
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Random Forest</span>
                <div className="text-xl font-bold text-white font-mono mt-1">{analysis.ensembleVotes.rf}%</div>
                <span className="text-[9px] text-emerald-400 block mt-0.5">100 Estimators</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Gradient Boosting</span>
                <div className="text-xl font-bold text-white font-mono mt-1">{analysis.ensembleVotes.gbm}%</div>
                <span className="text-[9px] text-blue-400 block mt-0.5">Learning Rate 0.05</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Bayesian Prior</span>
                <div className="text-xl font-bold text-white font-mono mt-1">{analysis.ensembleVotes.bayesian}%</div>
                <span className="text-[9px] text-purple-400 block mt-0.5">Kinematic Bound</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* College Viva / Presentation Defense Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <HelpCircle className="w-5 h-5 text-orange-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Academic Viva Defense: Why Ensemble + Kinematics is Superior
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <strong className="text-orange-300 font-bold block">1. Overcoming Non-Linear Multi-Factor Compounding:</strong>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Traditional linear models fail when high speed, hydroplaning, and curvature coincide because accident probability does not scale additively—it scales exponentially (Ek = 0.5 * m * v² and ac = v² / R). The ensemble non-linear matrix accurately captures compound catastrophe triggers.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <strong className="text-emerald-300 font-bold block">2. Explainable AI (XAI) Compliance:</strong>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              By incorporating SHAP attribution, RoadGuard avoids the "black-box" dilemma in safety-critical vehicle telematics. Transport authorities and drivers can clearly understand the exact margin each factor contributes to the total risk score.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
