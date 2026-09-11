import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  MapPin, 
  CloudSun, 
  Car, 
  Clock, 
  Eye, 
  Zap, 
  Lightbulb, 
  Navigation, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  TrendingUp, 
  BookmarkCheck, 
  Download, 
  Share2,
  Sliders,
  ChevronRight,
  ShieldCheck,
  Fuel
} from 'lucide-react';
import { 
  PredictionInput, 
  RiskResult, 
  WeatherType, 
  RoadConditionType, 
  TrafficLevelType, 
  VisibilityType, 
  TimeOfDayType, 
  RoadType, 
  LightingType 
} from '../types';
import { predictAccidentRisk, PRESET_SCENARIOS } from '../utils/mlModel';
import { savePrediction } from '../utils/storage';

interface PredictPageProps {
  initialInput?: PredictionInput | null;
  onPredictionSaved: (result: RiskResult) => void;
}

const DEFAULT_INPUT: PredictionInput = {
  location: 'NH-48 National Highway Corridor',
  weather: 'Rainy',
  roadCondition: 'Wet',
  trafficLevel: 'Heavy',
  visibility: 'Poor (100-500m)',
  timeOfDay: 'Late Night (11 PM-5 AM)',
  speedKmh: 85,
  roadType: 'Expressway / Highway',
  lighting: 'Dark / No Streetlights',
  numVehicles: 12
};

export const PredictPage: React.FC<PredictPageProps> = ({ initialInput, onPredictionSaved }) => {
  const [formData, setFormData] = useState<PredictionInput>(initialInput || DEFAULT_INPUT);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<RiskResult | null>(() => {
    // Generate initial result on load for instant preview
    return predictAccidentRisk(initialInput || DEFAULT_INPUT);
  });
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleInputChange = <K extends keyof PredictionInput>(key: K, value: PredictionInput[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setSavedSuccess(false);
  };

  const handleApplyPreset = (presetData: PredictionInput) => {
    setFormData(presetData);
    setSavedSuccess(false);
    // Instant calculate for seamless preset experience
    const res = predictAccidentRisk(presetData);
    setResult(res);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setSavedSuccess(false);

    setTimeout(() => {
      const computedResult = predictAccidentRisk(formData);
      setResult(computedResult);
      setIsAnalyzing(false);

      // Auto save or let user save
      savePrediction(computedResult);
      onPredictionSaved(computedResult);
      setSavedSuccess(true);
    }, 400);
  };

  const handleManualSave = () => {
    if (result) {
      savePrediction(result);
      onPredictionSaved(result);
      setSavedSuccess(true);
    }
  };

  const handleReset = () => {
    setFormData({
      location: 'Main Ring Road Sector 1',
      weather: 'Clear',
      roadCondition: 'Dry',
      trafficLevel: 'Low',
      visibility: 'Good (>1km)',
      timeOfDay: 'Afternoon (11 AM-4 PM)',
      speedKmh: 50,
      roadType: 'Urban Arterial (City Main)',
      lighting: 'Daylight',
      numVehicles: 5
    });
    setSavedSuccess(false);
  };

  const getRiskBadgeStyles = (level: 'LOW' | 'MEDIUM' | 'HIGH') => {
    if (level === 'LOW') {
      return {
        bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        bar: 'bg-emerald-500',
        text: 'text-emerald-400',
        badge: 'bg-emerald-500 text-slate-950 font-bold',
        desc: 'Standard road environment with low likelihood of catastrophic loss of control.'
      };
    }
    if (level === 'MEDIUM') {
      return {
        bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        bar: 'bg-amber-500',
        text: 'text-amber-400',
        badge: 'bg-amber-500 text-slate-950 font-bold',
        desc: 'Elevated hazard probability. Defensive driving and proactive speed moderation advised.'
      };
    }
    return {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      bar: 'bg-rose-500',
      text: 'text-rose-400',
      badge: 'bg-rose-600 text-white font-bold animate-pulse',
      desc: 'Critical hazard threshold! Compound adverse conditions require immediate defensive action.'
    };
  };

  const badgeStyle = result ? getRiskBadgeStyles(result.riskLevel) : getRiskBadgeStyles('MEDIUM');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Preset Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Supervised ML Inference</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Road Accident Risk Predictor</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure 10 physical and environmental variables to assess collision probability and dynamic braking requirements.
          </p>
        </div>

        {/* Quick Scenario Preset Chips */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-xs text-slate-400 flex items-center mr-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-400 mr-1" /> Quick Presets:
          </span>
          {PRESET_SCENARIOS.map((scenario, i) => (
            <button
              key={i}
              id={`preset-btn-${i}`}
              type="button"
              onClick={() => handleApplyPreset(scenario.data)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-orange-500/50 transition-all active:scale-95"
            >
              {scenario.label.split(' ')[0]} {scenario.data.weather} ({scenario.data.speedKmh} km/h)
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form Left, Prediction Results Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-orange-400" />
              <h2 className="text-base font-bold text-slate-100">Environmental & Vehicle Inputs</h2>
            </div>
            <button
              id="form-reset-btn"
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* 1. Location / Stretch Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>1. Location / Road Stretch Corridor</span>
                </span>
                <span className="text-[11px] text-slate-500">Free text or landmark</span>
              </label>
              <input
                id="input-location"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g. NH-48 Expressway Tollway km 32"
                required
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* 2 & 3: Weather and Road Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <CloudSun className="w-3.5 h-3.5 text-blue-400" />
                  <span>2. Weather Condition</span>
                </label>
                <select
                  id="input-weather"
                  value={formData.weather}
                  onChange={(e) => handleInputChange('weather', e.target.value as WeatherType)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="Clear">Clear / Sunny</option>
                  <option value="Rainy">Rainy (Precipitation)</option>
                  <option value="Foggy">Foggy / Dense Mist</option>
                  <option value="Snow">Snow / Sleet</option>
                  <option value="Overcast">Overcast / Gloomy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>3. Road Surface Condition</span>
                </label>
                <select
                  id="input-road-condition"
                  value={formData.roadCondition}
                  onChange={(e) => handleInputChange('roadCondition', e.target.value as RoadConditionType)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="Dry">Dry (High Friction μ=0.75)</option>
                  <option value="Wet">Wet (Reduced Friction μ=0.42)</option>
                  <option value="Icy">Icy / Frost (Hazardous μ=0.15)</option>
                  <option value="Potholes / Damaged">Potholes / Damaged Asphalt</option>
                  <option value="Under Construction">Under Construction / Loose Gravel</option>
                </select>
              </div>
            </div>

            {/* 4 & 5: Traffic Level and Atmospheric Visibility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <Car className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4. Traffic Level</span>
                </label>
                <select
                  id="input-traffic-level"
                  value={formData.trafficLevel}
                  onChange={(e) => handleInputChange('trafficLevel', e.target.value as TrafficLevelType)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="Low">Low (Free Flow)</option>
                  <option value="Moderate">Moderate (Normal Cruising)</option>
                  <option value="Heavy">Heavy (Dense Queueing)</option>
                  <option value="Congested / Gridlock">Congested / Gridlock</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>5. Forward Visibility</span>
                </label>
                <select
                  id="input-visibility"
                  value={formData.visibility}
                  onChange={(e) => handleInputChange('visibility', e.target.value as VisibilityType)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="Good (>1km)">Good (&gt; 1,000 meters)</option>
                  <option value="Moderate (500m-1km)">Moderate (500m - 1,000m)</option>
                  <option value="Poor (100-500m)">Poor (100m - 500m)</option>
                  <option value="Very Poor (<100m)">Very Poor (&lt; 100 meters)</option>
                </select>
              </div>
            </div>

            {/* 6. Vehicle Travel Speed (Interactive Slider & Number) */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-orange-400" />
                  <span>6. Vehicle Travel Speed (km/h)</span>
                </label>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-base font-bold text-orange-400">{formData.speedKmh}</span>
                  <span className="text-xs text-slate-400">km/h</span>
                </div>
              </div>
              <input
                id="input-speed-slider"
                type="range"
                min="15"
                max="140"
                step="5"
                value={formData.speedKmh}
                onChange={(e) => handleInputChange('speedKmh', parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>15 km/h (Slow)</span>
                <span>60 km/h (Urban Limit)</span>
                <span>100 km/h (Expressway)</span>
                <span>140 km/h (Danger)</span>
              </div>
            </div>

            {/* 7 & 8: Road Type and Lighting Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <Navigation className="w-3.5 h-3.5 text-slate-400" />
                  <span>7. Road Infrastructure Type</span>
                </label>
                <select
                  id="input-road-type"
                  value={formData.roadType}
                  onChange={(e) => handleInputChange('roadType', e.target.value as RoadType)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="Expressway / Highway">Expressway / Highway (Multi-Lane)</option>
                  <option value="Urban Arterial (City Main)">Urban Arterial (City Main)</option>
                  <option value="Residential / Local Street">Residential / Local Street</option>
                  <option value="Rural Single Lane">Rural Single Lane</option>
                  <option value="Ghat / Mountain Pass">Ghat / Mountain Pass (Curves & Grades)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
                  <span>8. Lighting Condition</span>
                </label>
                <select
                  id="input-lighting"
                  value={formData.lighting}
                  onChange={(e) => handleInputChange('lighting', e.target.value as LightingType)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="Daylight">Daylight (Full Sun)</option>
                  <option value="Well-Lit Streetlights">Well-Lit Streetlights</option>
                  <option value="Dimly Lit">Dimly Lit / Sporadic Lamps</option>
                  <option value="Dark / No Streetlights">Dark / No Streetlights (Pitch Black)</option>
                </select>
              </div>
            </div>

            {/* 9 & 10: Time of Day and Nearby Vehicles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>9. Time of Day</span>
                </label>
                <select
                  id="input-time-of-day"
                  value={formData.timeOfDay}
                  onChange={(e) => handleInputChange('timeOfDay', e.target.value as TimeOfDayType)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="Morning Rush (7-10 AM)">Morning Rush (7-10 AM)</option>
                  <option value="Afternoon (11 AM-4 PM)">Afternoon (11 AM-4 PM)</option>
                  <option value="Evening Rush (5-8 PM)">Evening Rush (5-8 PM)</option>
                  <option value="Late Night (11 PM-5 AM)">Late Night (11 PM-5 AM)</option>
                  <option value="Dawn / Dusk">Dawn / Dusk (Low Sun Angles)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <Car className="w-3.5 h-3.5 text-cyan-400" />
                  <span>10. Nearby Vehicles in Vicinity</span>
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    id="input-num-vehicles"
                    type="number"
                    min="1"
                    max="60"
                    value={formData.numVehicles}
                    onChange={(e) => handleInputChange('numVehicles', parseInt(e.target.value, 10) || 1)}
                    className="w-24 px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-orange-500 transition"
                  />
                  <span className="text-xs text-slate-400">vehicles within 200m radius</span>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="submit-prediction-btn"
                type="submit"
                disabled={isAnalyzing}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Evaluating Random Forest Model...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>Run AI Risk Prediction</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                id="save-history-btn"
                type="button"
                onClick={handleManualSave}
                disabled={!result}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center justify-center space-x-2"
              >
                <BookmarkCheck className={`w-4 h-4 ${savedSuccess ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{savedSuccess ? 'Saved in History' : 'Save Result'}</span>
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Dynamic Machine Learning Inference Output (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {result ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              {/* Output Header with Risk Level Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Estimated Risk Output</span>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${badgeStyle.badge}`}>
                      {result.riskLevel} RISK
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Conf: {result.confidenceScore}%
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                    {result.riskScore}%
                  </div>
                  <div className="text-[11px] text-slate-400">Risk Score</div>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${badgeStyle.bar}`}
                    style={{ width: `${result.riskScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0% (Safe)</span>
                  <span>40% (Moderate)</span>
                  <span>70% (High Risk)</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Risk Level Description */}
              <div className={`p-3 rounded-xl border text-xs leading-relaxed ${badgeStyle.bg}`}>
                {badgeStyle.desc}
              </div>

              {/* Kinematic Stopping Distance Telemetry Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                    <TrendingUp className="w-4 h-4 text-orange-400" />
                    <span>Kinematic Stopping Distance</span>
                  </span>
                  <span className="font-mono text-xs text-orange-400 font-bold">
                    {result.stoppingDistanceMeters} meters
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  At <strong>{result.input.speedKmh} km/h</strong> on <strong>{result.input.roadCondition}</strong> surface, emergency deceleration to 0 km/h requires approx <strong>{result.stoppingDistanceMeters}m</strong> (includes 1.5s driver perception lag).
                </p>
              </div>

              {/* Contributing Reasons Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
                  <span>Main Contributing Factors</span>
                  <span className="text-[10px] text-slate-400 font-normal">Ranked by Impact</span>
                </h3>

                <div className="space-y-2">
                  {result.contributingFactors.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-200">
                        <span className="flex items-center space-x-1.5">
                          <AlertTriangle className={`w-3.5 h-3.5 ${item.severity === 'high' ? 'text-rose-400' : 'text-amber-400'}`} />
                          <span>{item.factor}</span>
                        </span>
                        <span className="text-[10px] font-mono text-orange-400">{item.impactScore}% impact</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed pl-5">
                        {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Safety Actions */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
                  <span>Actionable Safety Precautions</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Immediate</span>
                </h3>

                <div className="space-y-2">
                  {result.safetyRecommendations.map((rec) => (
                    <div 
                      key={rec.id}
                      className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div className="text-xs space-y-0.5">
                        <div className="font-semibold text-slate-200">{rec.title}</div>
                        <div className="text-[11px] text-slate-400 leading-relaxed">{rec.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Disclaimer Note */}
              <div className="text-[10px] text-slate-500 italic pt-2 border-t border-slate-800/60 text-center">
                Prediction generated by RoadGuard Random Forest v1.0. For educational decision-support only.
              </div>

            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="font-bold text-white text-base">Awaiting Input Submission</h3>
              <p className="text-xs max-w-xs mx-auto">
                Fill out the environmental parameters on the left or select a preset scenario to view instant machine learning classification.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
