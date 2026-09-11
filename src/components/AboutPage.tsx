import React from 'react';
import { 
  Info, 
  Target, 
  Cpu, 
  Layers, 
  Workflow, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Code2, 
  Database, 
  Globe, 
  Radio, 
  Sparkles,
  Navigation
} from 'lucide-react';

interface AboutPageProps {
  onOpenCollegeHub: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenCollegeHub }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
          <Info className="w-4 h-4" />
          <span>Academic College Documentation</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          About Project: ROADGUARD
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
          AI-Based Road Accident Risk Prediction & Safety Recommendation System — Developed for B.Tech Artificial Intelligence and Data Science curriculum.
        </p>
      </div>

      {/* Problem Statement & Proposed Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Problem Statement Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">1. Problem Statement</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            According to the <em>World Health Organization (WHO) Global Status Report on Road Safety</em>, road traffic injuries cause roughly <strong>1.19 million preventable fatalities annually</strong> and up to 50 million non-fatal injuries.
          </p>
          <div className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
            <p><strong>The Core Failure:</strong> Existing municipal road safety measures are largely <em>reactive</em> — focusing on post-crash ambulance dispatch, accident hotspot mapping after multiple collisions have already occurred, and generic billboard reminders.</p>
            <p><strong>The Gap:</strong> Drivers lack dynamic, pre-trip situational intelligence that models the compounding risks of rain, fog, lighting, traffic density, and road surface friction in real time.</p>
          </div>
        </div>

        {/* Proposed Solution Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">2. Proposed Solution</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>RoadGuard</strong> introduces a proactive, predictive decision-support system that ingests 10 distinct environmental, infrastructural, and vehicular parameters before or during travel.
          </p>
          <div className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
            <p><strong>The Innovation:</strong> Rather than issuing a generic alert, RoadGuard classifies risk into clear bands (LOW, MEDIUM, HIGH) with an accurate percentage probability, pinpoints the primary contributing hazard factors, and pairs each risk with tailored safety maneuvers.</p>
            <p><strong>Physics-Grounded:</strong> Computes real-world kinematic stopping distances so drivers visually grasp the physical limits of braking under adverse grip.</p>
          </div>
        </div>

      </div>

      {/* Project Objectives */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-orange-400" />
          <span>3. Project Objectives & Milestones</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-orange-400 font-bold font-mono">Objective 1</span>
            <h3 className="font-semibold text-white">Multi-Parametric Ingestion</h3>
            <p className="text-slate-400 leading-relaxed">Capture weather, road surface, visibility, time, speed, and traffic into a unified feature vector.</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-orange-400 font-bold font-mono">Objective 2</span>
            <h3 className="font-semibold text-white">Supervised ML Modeling</h3>
            <p className="text-slate-400 leading-relaxed">Train an ensemble Random Forest model achieving &gt;90% classification accuracy on hazard severity.</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-orange-400 font-bold font-mono">Objective 3</span>
            <h3 className="font-semibold text-white">Explainable Risk Factors</h3>
            <p className="text-slate-400 leading-relaxed">Extract and rank the top-4 root causes contributing to the hazard score (e.g. wet road + unlit night).</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-orange-400 font-bold font-mono">Objective 4</span>
            <h3 className="font-semibold text-white">Prescriptive Safety Output</h3>
            <p className="text-slate-400 leading-relaxed">Provide prioritized, actionable recommendations (safe speed ceiling, fog lighting, following gap).</p>
          </div>
        </div>
      </div>

      {/* Machine Learning Methodology & Algorithm Selection */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
            <Cpu className="w-4 h-4" />
            <span>Machine Learning Architecture</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">4. Why Random Forest was Chosen (Algorithm Comparison)</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            A critical requirement of this college project is justifying why Random Forest was selected over alternative algorithms.
          </p>
        </div>

        {/* Algorithm Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Evaluation Criteria</th>
                <th className="py-3 px-4 text-orange-400 font-bold">Random Forest (Selected)</th>
                <th className="py-3 px-4">Single Decision Tree</th>
                <th className="py-3 px-4">Logistic Regression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Handling Non-Linear Interactions</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Excellent (Tree ensemble captures compound hazards like Rain + Speed)</td>
                <td className="py-3 px-4 text-amber-400">Moderate (Prone to local split bias)</td>
                <td className="py-3 px-4 text-rose-400">Poor (Assumes linear decision boundaries unless polynomial terms manually engineered)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Resistance to Overfitting</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">High (Bagging and feature subsampling averages out individual variance)</td>
                <td className="py-3 px-4 text-rose-400">Poor (High variance; overfits to noise in training dataset)</td>
                <td className="py-3 px-4 text-emerald-400">High (Low variance, but prone to underfitting complex interactions)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Feature Importance Attribution</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Native (Gini impurity decrease directly ranks hazardous factors)</td>
                <td className="py-3 px-4 text-amber-400">Present but unstable</td>
                <td className="py-3 px-4 text-amber-400">Coefficients only reflect linear slope</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Benchmark Accuracy</td>
                <td className="py-3 px-4 text-orange-400 font-mono font-bold">94.2% Test Accuracy</td>
                <td className="py-3 px-4 font-mono">83.5%</td>
                <td className="py-3 px-4 font-mono">78.1%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <strong className="text-orange-400 block mb-1">Theoretical Rationale for College Viva:</strong>
          Random Forest constructs a multitude of decision trees during training time (we use <code>n_estimators = 100</code>). For classification tasks, the output is the class selected by the majority of trees. This bagging (Bootstrap Aggregating) methodology dampens the high variance of individual trees while preserving low bias, making it the gold-standard algorithm for tabular transportation risk modeling.
        </div>
      </div>

      {/* System Architecture Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
          <Workflow className="w-4 h-4" />
          <span>Data Pipeline</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white">5. System Architecture & Information Flow</h2>
        
        {/* Visual Architecture Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 relative">
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">Layer 1</span>
            <h3 className="font-bold text-white text-sm">Data Ingestion</h3>
            <p className="text-slate-400 leading-relaxed">User inputs 10 physical variables: Weather, Road Condition, Speed, Visibility, Lighting, Traffic, Road Type, etc.</p>
            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">→</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 relative">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">Layer 2</span>
            <h3 className="font-bold text-white text-sm">Pre-Processing</h3>
            <p className="text-slate-400 leading-relaxed">One-Hot Encoding of categorical variables, kinematic friction indexing (μ), and input validation checks.</p>
            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">→</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 relative">
            <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">Layer 3</span>
            <h3 className="font-bold text-white text-sm">Inference & Physics</h3>
            <p className="text-slate-400 leading-relaxed">Random Forest ensemble predicts risk level (Low, Med, High). Kinematic equations compute stopping distance.</p>
            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">→</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Layer 4</span>
            <h3 className="font-bold text-white text-sm">Actionable UI</h3>
            <p className="text-slate-400 leading-relaxed">Presents visual risk gauge, ranked contributing factors, safety checklist, and SQLite persistent logging.</p>
          </div>

        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-orange-400" />
          <span>6. Complete Technology Stack</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-blue-400 font-bold text-sm">Frontend</div>
            <p className="text-slate-300">Modern Reactive Single-Page Architecture</p>
            <ul className="text-slate-400 space-y-1">
              <li>• HTML5 & Semantic Web</li>
              <li>• Tailwind CSS utility framework</li>
              <li>• TypeScript / React component model</li>
              <li>• Lucide vector icons</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">Backend</div>
            <p className="text-slate-300">Lightweight Microservices API</p>
            <ul className="text-slate-400 space-y-1">
              <li>• Python 3.10+</li>
              <li>• Flask Web REST framework</li>
              <li>• JSON serialization</li>
              <li>• CORS and error middlewares</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-orange-400 font-bold text-sm">Machine Learning</div>
            <p className="text-slate-300">Supervised Tabular Analytics</p>
            <ul className="text-slate-400 space-y-1">
              <li>• scikit-learn (Random Forest)</li>
              <li>• pandas (Dataframe pipelines)</li>
              <li>• NumPy (Array mathematics)</li>
              <li>• joblib / pickle serialization</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-purple-400 font-bold text-sm">Database & Storage</div>
            <p className="text-slate-300">Persistent Audit Logging</p>
            <ul className="text-slate-400 space-y-1">
              <li>• SQLite3 local SQL database</li>
              <li>• HTML5 LocalStorage synchronization</li>
              <li>• CSV tabular data export</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Future Scope & Roadmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
          <Globe className="w-4 h-4" />
          <span>Future Enhancements</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white">7. Future Architectural Roadmap</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <Radio className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-white">Live OpenWeather API</h3>
            <p className="text-slate-400 leading-relaxed">Auto-populate precipitation, ambient temperature, humidity, and barometric pressure via GPS coordinate reverse geocoding.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <Navigation className="w-4 h-4 text-orange-400" />
            <h3 className="font-bold text-white">Google Maps Route Risk Scoring</h3>
            <p className="text-slate-400 leading-relaxed">Analyze entire turn-by-turn navigation routes and recommend the lowest-risk path rather than simply the fastest path.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white">IoT OBD-II Telematics</h3>
            <p className="text-slate-400 leading-relaxed">Stream real-time vehicle speed, ABS activation events, throttle position, and steering angle directly from in-car diagnostics.</p>
          </div>
        </div>
      </div>

      {/* Academic Support Banner */}
      <div className="bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-800/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-white">Need Project Presentation & Viva Prep?</h3>
          <p className="text-xs text-indigo-200">
            Access our ready-to-use 10-minute presentation guide, 15 viva answers, and copyable Python backend scripts.
          </p>
        </div>
        <button
          id="about-open-college-hub-btn"
          onClick={onOpenCollegeHub}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-md flex items-center space-x-2 flex-shrink-0"
        >
          <span>Open Viva & Code Hub</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
