export type WeatherType = 'Clear' | 'Rainy' | 'Foggy' | 'Snow' | 'Overcast';
export type RoadConditionType = 'Dry' | 'Wet' | 'Icy' | 'Potholes / Damaged' | 'Under Construction';
export type TrafficLevelType = 'Low' | 'Moderate' | 'Heavy' | 'Congested / Gridlock';
export type VisibilityType = 'Good (>1km)' | 'Moderate (500m-1km)' | 'Poor (100-500m)' | 'Very Poor (<100m)';
export type TimeOfDayType = 'Morning Rush (7-10 AM)' | 'Afternoon (11 AM-4 PM)' | 'Evening Rush (5-8 PM)' | 'Late Night (11 PM-5 AM)' | 'Dawn / Dusk';
export type RoadType = 'Expressway / Highway' | 'Urban Arterial (City Main)' | 'Residential / Local Street' | 'Rural Single Lane' | 'Ghat / Mountain Pass';
export type LightingType = 'Daylight' | 'Well-Lit Streetlights' | 'Dimly Lit' | 'Dark / No Streetlights';

export interface PredictionInput {
  location: string;
  weather: WeatherType;
  roadCondition: RoadConditionType;
  trafficLevel: TrafficLevelType;
  visibility: VisibilityType;
  timeOfDay: TimeOfDayType;
  speedKmh: number;
  roadType: RoadType;
  lighting: LightingType;
  numVehicles: number;
}

export interface ContributingFactor {
  factor: string;
  impactScore: number; // percentage contribution
  severity: 'high' | 'medium' | 'low';
  explanation: string;
}

export interface SafetyRecommendation {
  id: string;
  title: string;
  action: string;
  category: 'Immediate Action' | 'Speed & Braking' | 'Visibility & Lights' | 'Defensive Strategy';
  priority: 'CRITICAL' | 'WARNING' | 'ADVISORY';
}

export interface RiskResult {
  id: string;
  timestamp: string;
  riskScore: number; // 0 - 100%
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  confidenceScore: number; // ML Model certainty ~88-96%
  contributingFactors: ContributingFactor[];
  safetyRecommendations: SafetyRecommendation[];
  stoppingDistanceMeters: number;
  reactionTimeSeconds: number;
  input: PredictionInput;
}

export interface DashboardStats {
  totalPredictions: number;
  lowRiskCount: number;
  mediumRiskCount: number;
  highRiskCount: number;
  averageRiskScore: number;
  highestRiskCondition: string;
}

export type ActiveTab = 'home' | 'predict' | 'map-routes' | 'advanced-model' | 'dashboard' | 'safety' | 'history' | 'about';

export interface RouteWaypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  weather: WeatherType;
  roadCondition: RoadConditionType;
  hazardDescription: string;
  recommendedSpeedKmh: number;
}

export interface RouteOption {
  id: string;
  name: string;
  origin: string;
  destination: string;
  originCoords: { lat: number; lng: number };
  destCoords: { lat: number; lng: number };
  distanceKm: number;
  estimatedDurationMins: number;
  overallRiskScore: number;
  overallRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  isSafest: boolean;
  waypoints: RouteWaypoint[];
  safetyHighlight: string;
  riskTradeoff: string;
}

export interface HotspotZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  historicalCrashCount: number;
  primaryCause: string;
  severityLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  speedLimitKmh: number;
  advisoryNote: string;
}

export interface AdvancedVehicleTelemetry {
  speedKmh: number;
  brakePressurePercent: number;
  steeringAngleDeg: number;
  tractionLossDetected: boolean;
  fatigueHours: number;
  roadSlopePercent: number;
  curveRadiusMeters: number;
  ambientIlluminationLux: number;
  absEngaged: boolean;
}

export interface ShapFactor {
  featureName: string;
  baselineValue: string | number;
  deltaRiskPercentage: number; // positive increases risk, negative decreases
  direction: 'increases_risk' | 'reduces_risk';
  category: 'Driver' | 'Vehicle' | 'Environment' | 'Road Geometry';
}
