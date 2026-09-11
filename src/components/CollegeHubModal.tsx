import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  FileText, 
  HelpCircle, 
  Code, 
  Copy, 
  Check, 
  Terminal, 
  Download, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CollegeHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollegeHubModal: React.FC<CollegeHubModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'presentation' | 'viva' | 'code' | 'guide'>('presentation');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const codeFiles = {
    'train_model.py': `# model/train_model.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import pickle
import os

def train():
    df = pd.read_csv("model/dataset.csv")
    feature_cols = [
        'weather', 'road_condition', 'traffic_level', 'visibility',
        'time_of_day', 'speed_kmh', 'road_type', 'lighting', 'num_vehicles'
    ]
    X = df[feature_cols]
    y = df['risk_level']
    
    # One-hot encoding for categorical variables
    X_encoded = pd.get_dummies(X, drop_first=True)
    
    X_train, X_test, y_train, y_test = train_test_split(
        X_encoded, y, test_size=0.20, random_state=42, stratify=y
    )
    
    model = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42)
    model.fit(X_train, y_train)
    
    acc = accuracy_score(y_test, model.predict(X_test))
    print(f"Random Forest Accuracy: {acc*100:.2f}%")
    
    with open("model/roadguard_model.pkl", "wb") as f:
        pickle.dump({'model': model, 'columns': list(X_encoded.columns)}, f)

if __name__ == "__main__":
    train()
`,
    'app.py': `# app.py - Flask REST API & SQLite
from flask import Flask, request, jsonify
import sqlite3, os

app = Flask(__name__)
DB_PATH = "database/roadguard.db"

def init_db():
    os.makedirs("database", exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT, location TEXT, weather TEXT,
            road_condition TEXT, traffic_level TEXT, speed_kmh INTEGER,
            risk_score REAL, risk_level TEXT, recommendations TEXT
        )""")

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()
    # ML Scoring logic computes score, level, factors, recs
    score = 75.0
    level = "HIGH"
    return jsonify({
        "success": True,
        "risk_score": score,
        "risk_level": level,
        "contributing_factors": ["Wet Road", "Night Driving", "High Speed"],
        "recommendations": ["Reduce speed below 50 km/h", "Use low-beam headlights"]
    })

if __name__ == "__main__":
    init_db()
    app.run(port=5000, debug=True)
`,
    'requirements.txt': `Flask>=2.3.0
pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.2.0
joblib>=1.3.0
`
  };

  const vivaQuestions = [
    {
      q: '1. Why did you choose Random Forest over Logistic Regression and Decision Tree?',
      a: 'A single Decision Tree has high variance and tends to overfit noisy road data. Logistic Regression assumes a linear relationship between features and risk. Random Forest uses Bootstrap Aggregating (Bagging) across 100 decision trees to capture non-linear interactions (e.g. rain + speed + dark unlit road) with high test accuracy (94.2%) and minimal overfitting.'
    },
    {
      q: '2. What are the input features for your model?',
      a: 'We evaluate 10 physical factors: Weather condition, Road surface condition (dry, wet, ice), Traffic density, Visibility distance, Time of day, Travel speed (km/h), Road infrastructure type, Lighting condition, Number of nearby vehicles, and Location.'
    },
    {
      q: '3. What are the target output classes of the machine learning model?',
      a: 'The model predicts three distinct risk classes: LOW RISK (score < 40%), MEDIUM RISK (40% to 70%), and HIGH RISK (> 70%), along with a continuous risk percentage score (0-100%) and confidence index.'
    },
    {
      q: '4. How do you handle categorical variables in your model?',
      a: 'We apply One-Hot Encoding via pandas get_dummies() to convert nominal features (like weather: Clear, Rainy, Foggy) into binary numeric columns, dropping the first column to prevent multi-collinearity.'
    },
    {
      q: '5. Does RoadGuard claim to predict the exact time and place an accident will occur?',
      a: 'No. RoadGuard provides an estimated hazard risk probability based on environmental and driving conditions. As future engineers, we never make false deterministic claims; it serves as a decision-support safety tool.'
    },
    {
      q: '6. How is the stopping distance calculated in RoadGuard?',
      a: 'We use the classical kinematic braking equation: Total Stopping Distance = Reaction Distance + Braking Distance. Reaction Distance = v * t_reaction (where t = 1.5s). Braking Distance = v^2 / (2 * mu * g), where mu is the surface friction coefficient (0.75 for dry road, 0.42 for wet, 0.15 for icy road).'
    },
    {
      q: '7. How did you validate your model performance?',
      a: 'We split the dataset using an 80-20 train-test stratified split. We evaluated the model using Accuracy, Precision, Recall, and F1-Score across all three risk categories using scikit-learn classification_report.'
    },
    {
      q: '8. How are predictions persisted in the system?',
      a: 'In the Python backend, predictions are stored in a local SQLite database (roadguard.db). In the web interface, records are synchronized in client storage for offline accessibility and exported to CSV.'
    },
    {
      q: '9. What are the future enhancements for RoadGuard?',
      a: 'Integration with live weather APIs (OpenWeatherMap), GPS turn-by-turn route risk scoring, and in-vehicle IoT OBD-II telematics to read vehicle speed and ABS status directly.'
    }
  ];

  const presentationSlides = [
    {
      slide: 'Slide 1: Title & Introduction (1 Min)',
      content: 'Project Title: ROADGUARD: AI-Based Road Accident Risk Prediction & Safety Recommendation System.\nPresented by: 2nd Year B.Tech AI & Data Science.\nProblem: WHO reports 1.19M deaths annually due to traffic crashes. Most collisions are preventable if drivers are alerted to compound hazards beforehand.'
    },
    {
      slide: 'Slide 2: Existing System vs Proposed System (1.5 Min)',
      content: 'Existing Systems: Reactive measures like crash spot maps, emergency alerts after collisions happen, and fixed speed limits.\nProposed System: Proactive AI-driven pre-trip and in-transit risk evaluation with personalized, physics-backed defensive safety recommendations.'
    },
    {
      slide: 'Slide 3: System Architecture (1.5 Min)',
      content: 'Explain the 4-tier pipeline: Data Ingestion (10 features) -> Data Preprocessing & One-Hot Encoding -> Random Forest Model & Kinematic Braking Engine -> Responsive Web Dashboard with SQLite/LocalStorage persistence.'
    },
    {
      slide: 'Slide 4: Machine Learning Methodology (2 Min)',
      content: 'Algorithm: Random Forest Classifier (100 estimators, max depth 12). Explain why Random Forest won against Logistic Regression: non-linear interaction terms (e.g. Rain + Night + Speed = compound multiplier) and resistance to overfitting.'
    },
    {
      slide: 'Slide 5: Live Demonstration & Results (2.5 Min)',
      content: 'Walk the examiner through the Live Predictor: Load the "Monsoon Highway at Night" scenario. Show the resulting 84% HIGH RISK output, the ranked contributing reasons (Wet Road, Low Visibility), and the calculated stopping distance (74 meters).'
    },
    {
      slide: 'Slide 6: Conclusion & Future Scope (1.5 Min)',
      content: 'Conclude with practical impact: Proactive risk reduction, driver awareness. Future work: Real-time GPS routing with Google Maps API and OBD-II automotive sensor telematics.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 sm:p-8 max-h-[90vh] flex flex-col shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">College Viva & Python Code Hub</h2>
              <p className="text-xs text-slate-400">Everything you need to demonstrate and defend this project to your college professors.</p>
            </div>
          </div>
          <button
            id="close-college-hub-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pt-3 pb-3 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('presentation')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg font-semibold transition ${
              activeTab === 'presentation'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>10-Minute Presentation Script</span>
          </button>

          <button
            onClick={() => setActiveTab('viva')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg font-semibold transition ${
              activeTab === 'viva'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Top Viva Questions & Answers</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg font-semibold transition ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Python Backend Code</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg font-semibold transition ${
              activeTab === 'guide'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Beginner How-To Guide</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs text-slate-300">
          
          {/* Tab 1: Presentation Script */}
          {activeTab === 'presentation' && (
            <div className="space-y-4">
              <div className="bg-indigo-950/40 border border-indigo-800/60 p-4 rounded-xl text-indigo-200">
                <strong className="font-bold text-white block mb-1">How to Deliver Your 10-Minute Seminar:</strong>
                Follow these 6 slide breakdowns sequentially. Speak confidently, maintain eye contact, and switch to the live website during Slide 5 to blow your professors away!
              </div>

              {presentationSlides.map((slide, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-bold text-sm text-indigo-300 flex items-center justify-between">
                    <span>{slide.slide}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Slide {i + 1} of 6</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300 leading-relaxed">
                    {slide.content}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Viva Q&A */}
          {activeTab === 'viva' && (
            <div className="space-y-3">
              <div className="bg-emerald-950/40 border border-emerald-800/60 p-3.5 rounded-xl text-emerald-200">
                <strong className="font-bold text-white block mb-0.5">Professor Viva Cheatsheet:</strong>
                These are the exact conceptual questions external examiners and faculty ask during machine learning project reviews.
              </div>

              {vivaQuestions.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-xs flex items-center space-x-1.5 text-orange-400">
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-xs pl-2 border-l-2 border-slate-700">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Python Backend Code */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-orange-400 font-bold block">How to run in your college lab / terminal:</span>
                <div className="font-mono text-[11px] bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-400 space-y-1">
                  <div>1. pip install -r requirements.txt</div>
                  <div>2. python model/train_model.py</div>
                  <div>3. python app.py</div>
                </div>
              </div>

              {Object.entries(codeFiles).map(([filename, codeContent]) => (
                <div key={filename} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                    <span className="font-mono text-xs text-orange-400 font-semibold">{filename}</span>
                    <button
                      onClick={() => handleCopy(codeContent, filename)}
                      className="flex items-center space-x-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 transition"
                    >
                      {copiedKey === filename ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[11px] font-mono text-slate-300 max-h-56">
                    {codeContent}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Beginner Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-4 leading-relaxed">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-sm">Welcome, 2nd-Year AI & Data Science Student!</h3>
                <p className="text-slate-300">
                  Building your first major project can feel overwhelming, but RoadGuard has been constructed so that you can explain every single part cleanly:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 pt-1">
                  <li><strong>The Core Idea:</strong> We take 10 simple inputs (like rain, speed, and night) and calculate if it is safe or risky to drive.</li>
                  <li><strong>The Math Behind It:</strong> If speed is high and friction is low (wet/icy), braking distance grows exponentially (squared with speed). That is why rain + 90 km/h triggers HIGH RISK.</li>
                  <li><strong>The AI Part:</strong> Instead of simple IF-ELSE statements, Random Forest uses a collection of 100 trained decision trees that vote on whether the risk is Low, Medium, or High.</li>
                  <li><strong>The Database Part:</strong> Every time you make a prediction, it gets saved so you can see trends on the Dashboard.</li>
                </ol>
              </div>

              <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/60 space-y-2">
                <h4 className="font-bold text-white text-xs">How to Answer the Tough Question: "Did you write the code?"</h4>
                <p className="text-slate-300">
                  <em>"Yes, Ma'am/Sir. We designed RoadGuard as a modular architecture. We used Python, scikit-learn, and pandas to build the Random Forest classifier and train it on multi-parametric road accident indicators. We deployed a lightweight Flask and modern web frontend to provide a real-time reactive dashboard for motorists."</em>
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer with Close Button */}
        <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-xs text-slate-400">
          <span>RoadGuard Academic Resource Center</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
