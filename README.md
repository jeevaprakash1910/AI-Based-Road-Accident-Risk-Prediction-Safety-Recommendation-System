# RoadGuard 🛡️🚗
### AI-Based Road Accident Risk Prediction, Highway Route Safety Navigator & Telematics Recommendation System

[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-Platform-4285f4.svg?logo=google-maps&logoColor=white)](https://mapsplatform.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

> **RoadGuard** is an intelligent transportation safety platform that predicts road traffic collision hazards using supervised machine learning ensembles (Random Forest + Gradient Boosting), non-linear kinematic physics modeling, explainable AI (SHAP), and Google Maps geospatial route analysis.

---

## 📌 One-Line Repository Description (For GitHub About Section)
```text
AI-powered road accident risk prediction, Google Maps highway route navigator, and telematics safety recommendation system built with React, TypeScript, and Explainable AI (SHAP).
```

---

## 🏷️ Recommended GitHub Topics / Tags
`machine-learning` • `road-safety` • `google-maps-api` • `accident-prediction` • `explainable-ai` • `shap` • `intelligent-transportation-systems` • `react` • `typescript` • `telematics`

---

## 🌟 Key Features

### 1. 🎯 Multi-Factor Accident Risk Predictor
- Analyzes 10 environmental, infrastructural, and driver parameters:
  - **Weather**: Clear, Heavy Rain, Dense Fog, Freezing Snow, Overcast.
  - **Surface Friction**: Dry Asphalt ($\mu=0.75$), Wet ($\mu=0.42$), Icy Glaze ($\mu=0.15$), Damaged/Potholes.
  - **Road Type & Geometry**: Expressway, Mountain/Ghat Pass, Urban Arterial, Single Rural Lane.
  - **Lighting & Visibility**: Daylight, Well-lit Streetlights, Dim, Pitch Dark.
  - **Velocity & Congestion**: Cruising speed (km/h) and real-time vehicle density.
- Computes risk percentage (0–100%) classified into **LOW**, **MEDIUM**, or **HIGH** severity bands with model certainty metrics.

### 2. 🗺️ Google Maps Highway Route Navigator (`@vis.gl/react-google-maps`)
- **Fastest vs. Safest Route Tradeoff**: Geospatially compares high-speed corridors against safer divided carriageways.
- **Turn-by-Turn Waypoint Hazard Scoring**: Identifies micro-hazards along routes (crosswinds, aquaplaning zones, accordion braking waves).
- **Historical Blackspot Pinning**: Visualizes known accident zones (e.g., Silk Board Ramp, Tumkur Highway Curve, Nandi Hills Ghat) with past crash counts and specific engineering remedies.
- **Interactive Fallback Vector Grid**: Fully functional even without an immediate API key, with seamless support for Google Maps Platform and free Maps Demo Keys.

### 3. 🔬 Advanced AI Laboratory & Explainable AI (SHAP)
- **Non-Linear Compounding**: Accurately models multiplicative catastrophe triggers ($E_k = \frac{1}{2}mv^2$, centrifugal lateral acceleration $a_c = \frac{v^2}{R}$, and downhill braking grade effects).
- **SHAP (SHapley Additive exPlanations)**: Breaks down the exact percentage points each feature adds or subtracts from baseline risk.
- **Ensemble Consensus**: Demonstrates multi-model voting between Random Forest (100 estimators), Gradient Boosted Trees, and Bayesian safety priors.

### 4. ⚡ In-Transit Telematics HUD & Live Simulator
- **Live Driving Simulator**: Simulates vehicle progression through multi-point highway corridors.
- **Dynamic Perception-Braking Distance**: Calculates total stopping distance ($d = v \cdot t_{reaction} + \frac{v^2}{2 \cdot \mu \cdot g}$).
- **Web Audio Warning Synthesizer**: Generates real-time auditory safety tones (587 Hz advisory, 880 Hz critical alert).
- **Simulated Emergency SOS Dispatch**: Generates emergency telematics payloads with GPS coordinates and trauma center alerts during extreme hazard breaches.

### 5. 🎓 Academic Hub (College Viva & Python Source Code)
- Complete Python training script using `scikit-learn` and `pandas` ready for laboratory reproduction.
- Curated viva question bank with technical answers covering model evaluation, physics validation, and XAI theory.

---

## 🧮 Mathematical & Physical Modeling

1. **Kinetic Energy Impact ($E_k$)**:
   $$E_k = \frac{1}{2} m v^2$$
   *Where $m = 1,400\text{ kg}$ (standard passenger car) and $v = \text{velocity in m/s}$.*

2. **Total Stopping Distance ($D_{\text{total}}$)**:
   $$D_{\text{total}} = (v \cdot t_{\text{perception}}) + \frac{v^2}{2 \cdot g \cdot (\mu + G)}$$
   *Where $t_{\text{perception}} \in [1.2\text{s}, 2.5\text{s}]$ (modulated by driver fatigue), $\mu$ is surface friction, and $G$ is road grade incline fraction.*

3. **Centrifugal Lateral Acceleration ($a_c$)**:
   $$a_c = \frac{v^2}{R \cdot g}$$
   *Evaluated against the vehicle rollover/skid threshold ($a_c > 0.35\text{G}$).*

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/roadguard.git
cd roadguard

# Install dependencies
npm install

# (Optional) Add your Google Maps Platform API Key in .env
# VITE_GOOGLE_MAPS_API_KEY="your_api_key_here"

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Maps Integration**: Google Maps Platform (`@vis.gl/react-google-maps`)
- **Machine Learning & Physics**: Client-side Ensemble Classifier, Kinematic Braking Engine, SHAP Attribution Vectorizer
- **Persistence**: LocalStorage with schema versioning and JSON audit logging

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
