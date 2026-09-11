import { RiskResult } from '../types';

const STORAGE_KEY = 'roadguard_predictions_v1';

export const INITIAL_PREDICTIONS: RiskResult[] = [
  {
    id: 'pred-init-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    riskScore: 84,
    riskLevel: 'HIGH',
    confidenceScore: 94,
    contributingFactors: [
      { factor: 'Atmospheric Fog', impactScore: 32, severity: 'high', explanation: 'Severe forward visibility loss below 150 meters.' },
      { factor: 'Wet Roadway Surface', impactScore: 28, severity: 'high', explanation: 'Damp surface increases braking distance by 55%.' },
      { factor: 'Elevated Speed (88 km/h)', impactScore: 22, severity: 'high', explanation: 'Travel speed dangerously high for restricted visual sightline.' },
      { factor: 'Unlit Roadway', impactScore: 18, severity: 'medium', explanation: 'Absence of overhead lighting prevents road shoulder hazard detection.' }
    ],
    safetyRecommendations: [
      { id: 'r1', title: 'Engage Fog Lights Immediately', action: 'Switch to low-beam fog lights; high beams cause glare reflection.', category: 'Visibility & Lights', priority: 'CRITICAL' },
      { id: 'r2', title: 'Reduce Speed to Below 45 km/h', action: 'Braking distance is currently exceeding forward visual range.', category: 'Speed & Braking', priority: 'CRITICAL' },
      { id: 'r3', title: 'Triple Safe Following Gap', action: 'Keep at least 6 car lengths between you and the vehicle ahead.', category: 'Defensive Strategy', priority: 'WARNING' }
    ],
    stoppingDistanceMeters: 74,
    reactionTimeSeconds: 1.5,
    input: {
      location: 'NH-48 Expressway Sector 9',
      weather: 'Foggy',
      roadCondition: 'Wet',
      trafficLevel: 'Moderate',
      visibility: 'Poor (100-500m)',
      timeOfDay: 'Late Night (11 PM-5 AM)',
      speedKmh: 88,
      roadType: 'Expressway / Highway',
      lighting: 'Dark / No Streetlights',
      numVehicles: 6
    }
  },
  {
    id: 'pred-init-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    riskScore: 24,
    riskLevel: 'LOW',
    confidenceScore: 92,
    contributingFactors: [
      { factor: 'Optimal Road & Weather Profile', impactScore: 10, severity: 'low', explanation: 'Dry pavement and crisp daylight visibility give full vehicle control.' }
    ],
    safetyRecommendations: [
      { id: 'r4', title: 'Maintain Standard Distance', action: 'Adhere to standard 2-second gap behind lead cars.', category: 'Defensive Strategy', priority: 'ADVISORY' },
      { id: 'r5', title: 'Stay Within Posted Limit', action: 'Drive defensively and check blind spots before changing lanes.', category: 'Immediate Action', priority: 'ADVISORY' }
    ],
    stoppingDistanceMeters: 31,
    reactionTimeSeconds: 1.5,
    input: {
      location: 'MG Road City Commercial Zone',
      weather: 'Clear',
      roadCondition: 'Dry',
      trafficLevel: 'Low',
      visibility: 'Good (>1km)',
      timeOfDay: 'Morning Rush (7-10 AM)',
      speedKmh: 45,
      roadType: 'Urban Arterial (City Main)',
      lighting: 'Daylight',
      numVehicles: 12
    }
  },
  {
    id: 'pred-init-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    riskScore: 58,
    riskLevel: 'MEDIUM',
    confidenceScore: 90,
    contributingFactors: [
      { factor: 'Rainy Precipitation', impactScore: 36, severity: 'high', explanation: 'Intermittent rainfall reduces tire grip and causes spray blindness.' },
      { factor: 'Heavy Traffic Flow', impactScore: 28, severity: 'medium', explanation: 'Braking accordion waves trigger rear-end collision hazard.' },
      { factor: 'Wet Roadway Surface', impactScore: 24, severity: 'medium', explanation: 'Surface wetness increases hydroplaning vulnerability.' }
    ],
    safetyRecommendations: [
      { id: 'r6', title: 'Increase Following Gap to 4s', action: 'Allow extra braking margin for emergency stop reactions.', category: 'Defensive Strategy', priority: 'WARNING' },
      { id: 'r7', title: 'Avoid Sudden Lateral Lane Changes', action: 'Signal early and check side wing mirrors for two-wheelers.', category: 'Defensive Strategy', priority: 'WARNING' }
    ],
    stoppingDistanceMeters: 46,
    reactionTimeSeconds: 1.5,
    input: {
      location: 'Outer Ring Road Flyover',
      weather: 'Rainy',
      roadCondition: 'Wet',
      trafficLevel: 'Heavy',
      visibility: 'Moderate (500m-1km)',
      timeOfDay: 'Evening Rush (5-8 PM)',
      speedKmh: 55,
      roadType: 'Urban Arterial (City Main)',
      lighting: 'Well-Lit Streetlights',
      numVehicles: 24
    }
  },
  {
    id: 'pred-init-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    riskScore: 78,
    riskLevel: 'HIGH',
    confidenceScore: 95,
    contributingFactors: [
      { factor: 'Mountain Pass Geometry', impactScore: 34, severity: 'high', explanation: 'Blind hairpin turns and steep gradient increase runaway risk.' },
      { factor: 'Potholes & Pavement Cracks', impactScore: 26, severity: 'high', explanation: 'Cratered pavement risks tire puncture and wheel rim damage.' },
      { factor: 'Unlit Roadway', impactScore: 22, severity: 'medium', explanation: 'Zero street illumination in mountain sector.' }
    ],
    safetyRecommendations: [
      { id: 'r8', title: 'Engage Low Gear Engine Braking', action: 'Do not ride brake pedals down steep ghat descents.', category: 'Speed & Braking', priority: 'CRITICAL' },
      { id: 'r9', title: 'Sound Gentle Horn on Blind Curves', action: 'Alert oncoming vehicles at blind turns before entering curve.', category: 'Immediate Action', priority: 'CRITICAL' }
    ],
    stoppingDistanceMeters: 42,
    reactionTimeSeconds: 1.5,
    input: {
      location: 'Western Ghat Mountain Pass Km 14',
      weather: 'Overcast',
      roadCondition: 'Potholes / Damaged',
      trafficLevel: 'Low',
      visibility: 'Moderate (500m-1km)',
      timeOfDay: 'Dawn / Dusk',
      speedKmh: 42,
      roadType: 'Ghat / Mountain Pass',
      lighting: 'Dark / No Streetlights',
      numVehicles: 4
    }
  },
  {
    id: 'pred-init-5',
    timestamp: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    riskScore: 32,
    riskLevel: 'LOW',
    confidenceScore: 91,
    contributingFactors: [
      { factor: 'Optimal Road & Weather Profile', impactScore: 10, severity: 'low', explanation: 'Clear daylight and paved street with slow community traffic.' }
    ],
    safetyRecommendations: [
      { id: 'r10', title: 'Watch for Pedestrians', action: 'Maintain vigilance for schoolchildren and neighborhood cyclists.', category: 'Defensive Strategy', priority: 'ADVISORY' }
    ],
    stoppingDistanceMeters: 18,
    reactionTimeSeconds: 1.5,
    input: {
      location: 'Greenwood Residential Sector 3',
      weather: 'Clear',
      roadCondition: 'Dry',
      trafficLevel: 'Low',
      visibility: 'Good (>1km)',
      timeOfDay: 'Afternoon (11 AM-4 PM)',
      speedKmh: 30,
      roadType: 'Residential / Local Street',
      lighting: 'Daylight',
      numVehicles: 3
    }
  }
];

export function getStoredPredictions(): RiskResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PREDICTIONS));
      return INITIAL_PREDICTIONS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_PREDICTIONS;
  } catch {
    return INITIAL_PREDICTIONS;
  }
}

export function savePrediction(result: RiskResult): void {
  try {
    const list = getStoredPredictions();
    // Prepend new prediction
    const updated = [result, ...list.filter(p => p.id !== result.id)].slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save prediction to localStorage', err);
  }
}

export function deletePrediction(id: string): RiskResult[] {
  try {
    const list = getStoredPredictions().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list;
  } catch {
    return [];
  }
}

export function clearAllPredictions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear predictions', err);
  }
}

export function exportPredictionsCSV(predictions: RiskResult[]): void {
  const headers = [
    'ID', 'Timestamp', 'Location', 'Risk Level', 'Risk Score (%)',
    'Weather', 'Road Condition', 'Traffic', 'Visibility', 'Speed (km/h)',
    'Road Type', 'Lighting', 'Stopping Distance (m)', 'Top Factor'
  ];
  
  const rows = predictions.map(p => [
    p.id,
    p.timestamp,
    `"${p.input.location.replace(/"/g, '""')}"`,
    p.riskLevel,
    p.riskScore,
    p.input.weather,
    p.input.roadCondition,
    p.input.trafficLevel,
    p.input.visibility,
    p.input.speedKmh,
    p.input.roadType,
    p.input.lighting,
    p.stoppingDistanceMeters,
    `"${(p.contributingFactors[0]?.factor || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `roadguard_accident_risk_data_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
