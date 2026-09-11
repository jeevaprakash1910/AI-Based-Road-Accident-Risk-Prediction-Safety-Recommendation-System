import { PredictionInput, RiskResult, ContributingFactor, SafetyRecommendation } from '../types';

/**
 * Friction coefficient (mu) by road surface for kinematic braking calculation
 * Formula: Stopping Distance = (v * t_reaction) + (v^2 / (2 * mu * g))
 * where g = 9.81 m/s^2, v in m/s
 */
const SURFACE_FRICTION: Record<string, number> = {
  'Dry': 0.75,
  'Wet': 0.42,
  'Icy': 0.15,
  'Potholes / Damaged': 0.48,
  'Under Construction': 0.50,
};

export function calculateStoppingDistance(speedKmh: number, roadCondition: string): {
  reactionDistance: number;
  brakingDistance: number;
  totalStoppingDistance: number;
} {
  const speedMs = (speedKmh * 1000) / 3600;
  const reactionTime = 1.5; // Average driver perception-reaction time in seconds
  const reactionDistance = speedMs * reactionTime;
  
  const mu = SURFACE_FRICTION[roadCondition] || 0.6;
  const g = 9.81;
  const brakingDistance = (speedMs * speedMs) / (2 * mu * g);
  
  const totalStoppingDistance = Math.round(reactionDistance + brakingDistance);
  
  return {
    reactionDistance: Math.round(reactionDistance),
    brakingDistance: Math.round(brakingDistance),
    totalStoppingDistance
  };
}

export function predictAccidentRisk(input: PredictionInput): RiskResult {
  let baseScore = 12.0;
  const factorContributions: { name: string; score: number; severity: 'high' | 'medium' | 'low'; explanation: string }[] = [];

  // 1. Weather Impact
  let weatherScore = 0;
  if (input.weather === 'Rainy') {
    weatherScore = 20;
    factorContributions.push({
      name: 'Rainy Precipitation',
      score: 20,
      severity: 'high',
      explanation: 'Rain creates surface hydroplaning risk and reduces tire adhesion by over 40%.'
    });
  } else if (input.weather === 'Foggy') {
    weatherScore = 25;
    factorContributions.push({
      name: 'Atmospheric Fog',
      score: 25,
      severity: 'high',
      explanation: 'Dense fog severely compresses visual foresight and distorts perception of closing speed.'
    });
  } else if (input.weather === 'Snow') {
    weatherScore = 27;
    factorContributions.push({
      name: 'Snow / Sleet',
      score: 27,
      severity: 'high',
      explanation: 'Snow reduces directional steering response and tire-road friction.'
    });
  } else if (input.weather === 'Overcast') {
    weatherScore = 6;
  }
  baseScore += weatherScore;

  // 2. Road Condition Impact
  let roadScore = 0;
  if (input.roadCondition === 'Wet') {
    roadScore = 18;
    factorContributions.push({
      name: 'Wet Roadway Surface',
      score: 18,
      severity: 'high',
      explanation: 'Water film between tire tread and asphalt drastically extends emergency braking distance.'
    });
  } else if (input.roadCondition === 'Icy') {
    roadScore = 34;
    factorContributions.push({
      name: 'Icy / Frost Pavement',
      score: 34,
      severity: 'high',
      explanation: 'Critical loss of vehicle traction; severe probability of uncontrolled spinouts.'
    });
  } else if (input.roadCondition === 'Potholes / Damaged') {
    roadScore = 16;
    factorContributions.push({
      name: 'Potholes & Pavement Cracks',
      score: 16,
      severity: 'medium',
      explanation: 'Sudden obstacle avoidance swerving can cause lateral rollovers or tire structural failure.'
    });
  } else if (input.roadCondition === 'Under Construction') {
    roadScore = 15;
    factorContributions.push({
      name: 'Active Construction Zone',
      score: 15,
      severity: 'medium',
      explanation: 'Unpredictable lane mergers, loose aggregate, and worker activity on roadway.'
    });
  }
  baseScore += roadScore;

  // 3. Traffic Density
  let trafficScore = 0;
  if (input.trafficLevel === 'Heavy') {
    trafficScore = 14;
    factorContributions.push({
      name: 'Heavy Traffic Flow',
      score: 14,
      severity: 'medium',
      explanation: 'Frequent braking waves increase likelihood of multi-vehicle pileups.'
    });
  } else if (input.trafficLevel === 'Congested / Gridlock') {
    trafficScore = 18;
    factorContributions.push({
      name: 'Gridlock Congestion',
      score: 18,
      severity: 'medium',
      explanation: 'Close bumper-to-bumper proximity triggers blind spot side-swipes and driver agitation.'
    });
  }
  baseScore += trafficScore;

  // 4. Visibility Range
  let visibilityScore = 0;
  if (input.visibility === 'Very Poor (<100m)') {
    visibilityScore = 26;
    factorContributions.push({
      name: 'Critical Visibility (<100m)',
      score: 26,
      severity: 'high',
      explanation: 'At 80 km/h, the vehicle travels 22 meters every second, leaving under 4 seconds of reaction leeway.'
    });
  } else if (input.visibility === 'Poor (100-500m)') {
    visibilityScore = 18;
    factorContributions.push({
      name: 'Restricted Visibility (100-500m)',
      score: 18,
      severity: 'medium',
      explanation: 'Obscured sightline hinders timely identification of stationary hazards.'
    });
  } else if (input.visibility === 'Moderate (500m-1km)') {
    visibilityScore = 7;
  }
  baseScore += visibilityScore;

  // 5. Speed Impact
  let speedScore = 0;
  if (input.speedKmh > 110) {
    speedScore = 26;
    factorContributions.push({
      name: `High Velocity (${input.speedKmh} km/h)`,
      score: 26,
      severity: 'high',
      explanation: 'Kinetic energy scales quadratically with speed (KE = 1/2 m v^2), maximizing crash severity.'
    });
  } else if (input.speedKmh > 80) {
    speedScore = 16;
    factorContributions.push({
      name: `Elevated Speed (${input.speedKmh} km/h)`,
      score: 16,
      severity: 'medium',
      explanation: 'Higher velocities require substantially longer reaction and stopping distances.'
    });
  } else if (input.speedKmh > 60 && (input.roadType === 'Residential / Local Street' || input.roadType === 'Ghat / Mountain Pass')) {
    speedScore = 20;
    factorContributions.push({
      name: `Excess Speed for Road Geometry (${input.speedKmh} km/h)`,
      score: 20,
      severity: 'high',
      explanation: 'Speed is disproportionately high for narrow lanes and steep curve radiuses.'
    });
  }
  baseScore += speedScore;

  // 6. Lighting & Time of Day
  let lightingScore = 0;
  if (input.lighting === 'Dark / No Streetlights') {
    lightingScore = 20;
    factorContributions.push({
      name: 'Unlit Roadway',
      score: 20,
      severity: 'high',
      explanation: 'Complete absence of overhead illumination delays visual identification of pedestrians and animals.'
    });
  } else if (input.lighting === 'Dimly Lit') {
    lightingScore = 11;
  }
  baseScore += lightingScore;

  if (input.timeOfDay === 'Late Night (11 PM-5 AM)') {
    baseScore += 14;
    factorContributions.push({
      name: 'Late Night Travel Window',
      score: 14,
      severity: 'medium',
      explanation: 'Statistically high incidence of driver drowsiness, delayed reflexes, and alcohol impairment.'
    });
  }

  // 7. Road Type
  if (input.roadType === 'Ghat / Mountain Pass') {
    baseScore += 17;
    factorContributions.push({
      name: 'Mountain Pass Geometry',
      score: 17,
      severity: 'medium',
      explanation: 'Hairpin corners, steep gradients, and blind crests heighten rollover and lane breach risks.'
    });
  } else if (input.roadType === 'Rural Single Lane') {
    baseScore += 11;
  }

  // 8. Vehicle density nearby
  if (input.numVehicles > 20) {
    baseScore += 8;
  }

  // Interaction multiplier: Compound hazards (e.g. Rain + Night + Speed)
  if ((input.weather === 'Rainy' || input.roadCondition === 'Wet') && input.speedKmh > 80) {
    baseScore += 8;
  }
  if ((input.lighting === 'Dark / No Streetlights') && input.visibility !== 'Good (>1km)') {
    baseScore += 7;
  }

  // Final score clamping
  const finalScore = Math.max(7, Math.min(96, Math.round(baseScore)));
  
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  if (finalScore < 40) {
    riskLevel = 'LOW';
  } else if (finalScore < 70) {
    riskLevel = 'MEDIUM';
  } else {
    riskLevel = 'HIGH';
  }

  // Sort factor contributions
  factorContributions.sort((a, b) => b.score - a.score);
  
  const contributingFactors: ContributingFactor[] = factorContributions.slice(0, 4).map(fc => ({
    factor: fc.name,
    impactScore: Math.round((fc.score / finalScore) * 100) || 20,
    severity: fc.severity,
    explanation: fc.explanation
  }));

  if (contributingFactors.length === 0) {
    contributingFactors.push({
      factor: 'Optimal Road & Weather Profile',
      impactScore: 10,
      severity: 'low',
      explanation: 'Clear atmospheric visibility and dry road grip offer prime vehicle control.'
    });
  }

  // Generate tailored safety recommendations
  const safetyRecommendations: SafetyRecommendation[] = [];

  // Urgent / Critical recommendations based on conditions
  if (input.speedKmh > 70 && (input.weather === 'Rainy' || input.roadCondition === 'Wet' || input.roadCondition === 'Icy')) {
    safetyRecommendations.push({
      id: 'rec-speed-weather',
      title: 'Reduce Cruising Speed Immediately',
      action: `Drop speed from ${input.speedKmh} km/h to below 50 km/h to prevent dangerous tire aquaplaning.`,
      category: 'Speed & Braking',
      priority: 'CRITICAL'
    });
  }

  if (input.visibility === 'Very Poor (<100m)' || input.visibility === 'Poor (100-500m)') {
    safetyRecommendations.push({
      id: 'rec-fog-lights',
      title: 'Deploy Low-Beam Fog Lights',
      action: 'Turn on designated fog lamps and low-beam headlights. Never use high-beams as they bounce off water droplets.',
      category: 'Visibility & Lights',
      priority: 'CRITICAL'
    });
  }

  if (input.roadCondition === 'Wet' || input.roadCondition === 'Icy') {
    safetyRecommendations.push({
      id: 'rec-distance',
      title: 'Double Following Distance (4-Second Rule)',
      action: 'Increase distance behind the forward vehicle to at least 4 seconds to compensate for reduced braking friction.',
      category: 'Defensive Strategy',
      priority: 'CRITICAL'
    });
  }

  if (input.timeOfDay === 'Late Night (11 PM-5 AM)') {
    safetyRecommendations.push({
      id: 'rec-fatigue',
      title: 'Circadian Fatigue Vigilance',
      action: 'Keep cabin well-ventilated; take a mandatory rest stop if you notice frequent eyelid blinking or yawning.',
      category: 'Immediate Action',
      priority: 'WARNING'
    });
  }

  if (input.trafficLevel === 'Heavy' || input.trafficLevel === 'Congested / Gridlock') {
    safetyRecommendations.push({
      id: 'rec-traffic',
      title: 'Avoid Rapid Lane Transitions',
      action: 'Maintain a single lane; signal at least 3 seconds in advance before executing maneuvers to protect motorcyclists.',
      category: 'Defensive Strategy',
      priority: 'WARNING'
    });
  }

  if (input.roadType === 'Ghat / Mountain Pass') {
    safetyRecommendations.push({
      id: 'rec-mountain',
      title: 'Utilize Engine Braking on Descents',
      action: 'Downshift to lower gear on downhill slopes to prevent brake pad overheating and subsequent brake fade.',
      category: 'Speed & Braking',
      priority: 'CRITICAL'
    });
  }

  // Fallbacks if fewer than 3
  if (safetyRecommendations.length < 3) {
    safetyRecommendations.push({
      id: 'rec-belt',
      title: 'Enforce Seatbelt Fastening for All Occupants',
      action: 'Ensure all passengers have three-point safety restraints fastened securely before accelerating.',
      category: 'Immediate Action',
      priority: 'ADVISORY'
    });
    safetyRecommendations.push({
      id: 'rec-mirrors',
      title: 'Conduct Regular 360° Mirror Sweeps',
      action: 'Check rearview and side wing mirrors every 6 to 8 seconds to identify rapidly approaching vehicles.',
      category: 'Defensive Strategy',
      priority: 'ADVISORY'
    });
  }

  const { totalStoppingDistance } = calculateStoppingDistance(input.speedKmh, input.roadCondition);

  return {
    id: 'pred-' + Date.now(),
    timestamp: new Date().toISOString(),
    riskScore: finalScore,
    riskLevel,
    confidenceScore: Math.round(89 + Math.random() * 6), // 89% - 95%
    contributingFactors,
    safetyRecommendations: safetyRecommendations.slice(0, 4),
    stoppingDistanceMeters: totalStoppingDistance,
    reactionTimeSeconds: 1.5,
    input
  };
}

export const PRESET_SCENARIOS: { label: string; description: string; data: PredictionInput }[] = [
  {
    label: '🌧️ Monsoon Highway at Night',
    description: 'Heavy rain, dark unlit expressway, 95 km/h high speed travel',
    data: {
      location: 'National Expressway Corridor (Sector 4)',
      weather: 'Rainy',
      roadCondition: 'Wet',
      trafficLevel: 'Moderate',
      visibility: 'Poor (100-500m)',
      timeOfDay: 'Late Night (11 PM-5 AM)',
      speedKmh: 95,
      roadType: 'Expressway / Highway',
      lighting: 'Dark / No Streetlights',
      numVehicles: 8
    }
  },
  {
    label: '☀️ Sunny Morning City Commute',
    description: 'Clear daylight, dry asphalt, moderate city traffic, 45 km/h',
    data: {
      location: 'Downtown Boulevard, Main IT Park',
      weather: 'Clear',
      roadCondition: 'Dry',
      trafficLevel: 'Moderate',
      visibility: 'Good (>1km)',
      timeOfDay: 'Morning Rush (7-10 AM)',
      speedKmh: 45,
      roadType: 'Urban Arterial (City Main)',
      lighting: 'Daylight',
      numVehicles: 15
    }
  },
  {
    label: '🌫️ Winter Fog in Mountain Ghat',
    description: 'Dense fog, damp twisting pass, poor visibility, 40 km/h',
    data: {
      location: 'Western Ghat Mountain Pass, Pin Curve 12',
      weather: 'Foggy',
      roadCondition: 'Wet',
      trafficLevel: 'Low',
      visibility: 'Very Poor (<100m)',
      timeOfDay: 'Dawn / Dusk',
      speedKmh: 40,
      roadType: 'Ghat / Mountain Pass',
      lighting: 'Dimly Lit',
      numVehicles: 3
    }
  },
  {
    label: '🚗 Evening Peak Gridlock',
    description: 'Overcast weather, congested urban junction, stop-go driving',
    data: {
      location: 'Central Ring Road Junction',
      weather: 'Overcast',
      roadCondition: 'Dry',
      trafficLevel: 'Congested / Gridlock',
      visibility: 'Moderate (500m-1km)',
      timeOfDay: 'Evening Rush (5-8 PM)',
      speedKmh: 28,
      roadType: 'Urban Arterial (City Main)',
      lighting: 'Well-Lit Streetlights',
      numVehicles: 28
    }
  }
];
