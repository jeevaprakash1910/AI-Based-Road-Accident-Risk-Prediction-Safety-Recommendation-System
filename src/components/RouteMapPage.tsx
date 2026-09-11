// Source: Google Maps Platform Code Assist
import React, { useState, useEffect } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow 
} from '@vis.gl/react-google-maps';
import { 
  Navigation, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Play, 
  Square, 
  Volume2, 
  Gauge, 
  CloudRain, 
  Eye, 
  Compass, 
  Key, 
  ExternalLink,
  Layers,
  Sparkles,
  RotateCcw,
  Zap,
  CheckCircle2,
  Info
} from 'lucide-react';
import { 
  SAMPLE_ROUTES, 
  ACCIDENT_HOTSPOTS, 
  playSafetyWarningBeep,
  calculateAdvancedModelRisk 
} from '../utils/advancedEngine';
import { RouteOption, RouteWaypoint, HotspotZone } from '../types';

interface RouteMapPageProps {
  onSelectWaypoint?: (wp: RouteWaypoint) => void;
}

export const RouteMapPage: React.FC<RouteMapPageProps> = () => {
  // Google Maps API Key handling
  const [apiKey, setApiKey] = useState<string>(
    () => (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || ''
  );
  const [tempKeyInput, setTempKeyInput] = useState<string>('');
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);

  // Selected route & interactive states
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(SAMPLE_ROUTES[0]);
  const [activeWaypoint, setActiveWaypoint] = useState<RouteWaypoint | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<HotspotZone | null>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // In-Transit Driving Simulation State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simTelemetry, setSimTelemetry] = useState<{
    speed: number;
    hazardAlert: string | null;
    currentRisk: number;
    stoppingDistance: number;
    gForce: number;
  }>({
    speed: 75,
    hazardAlert: null,
    currentRisk: 36,
    stoppingDistance: 56,
    gForce: 0.12
  });

  // Map center & zoom
  const mapCenter = {
    lat: selectedRoute.waypoints[0]?.lat || 12.9716,
    lng: selectedRoute.waypoints[0]?.lng || 77.5946
  };

  // Driving Simulation Loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimStep((prev) => {
          const next = (prev + 1) % selectedRoute.waypoints.length;
          const currentWp = selectedRoute.waypoints[next];
          
          const advancedCalc = calculateAdvancedModelRisk({
            location: currentWp.name,
            weather: currentWp.weather,
            roadCondition: currentWp.roadCondition,
            trafficLevel: 'Moderate',
            visibility: currentWp.weather === 'Foggy' ? 'Poor (100-500m)' : 'Good (>1km)',
            timeOfDay: 'Late Night (11 PM-5 AM)',
            speedKmh: currentWp.recommendedSpeedKmh + 20,
            roadType: selectedRoute.id.includes('ghat') ? 'Ghat / Mountain Pass' : 'Expressway / Highway',
            lighting: 'Dimly Lit',
            numVehicles: 8
          }, {
            curveRadiusMeters: currentWp.riskScore > 70 ? 120 : 350,
            fatigueHours: 2.8,
            roadSlopePercent: currentWp.riskScore > 70 ? 6 : 1
          });

          setSimTelemetry({
            speed: currentWp.recommendedSpeedKmh + 15,
            hazardAlert: currentWp.riskScore > 65 ? `CRITICAL: ${currentWp.hazardDescription}` : null,
            currentRisk: advancedCalc.finalScore,
            stoppingDistance: advancedCalc.dynamicBrakingDistanceMeters,
            gForce: advancedCalc.centrifugalForceG
          });

          if (currentWp.riskScore > 65 && audioEnabled) {
            playSafetyWarningBeep('critical');
          } else if (currentWp.riskScore > 40 && audioEnabled) {
            playSafetyWarningBeep('warning');
          }

          setActiveWaypoint(currentWp);
          return next;
        });
      }, 3500);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating, selectedRoute, audioEnabled]);

  const handleStartStopSimulation = () => {
    if (!isSimulating) {
      setIsSimulating(true);
      if (audioEnabled) playSafetyWarningBeep('warning');
    } else {
      setIsSimulating(false);
      setSimStep(0);
      setActiveWaypoint(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header with Google Maps Platform Integration Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
            <Navigation className="w-4 h-4" />
            <span>Google Maps Platform Geospatial Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            AI Highway Route Risk Navigator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Turn-by-turn geospatial risk analysis comparing fastest vs safest routes with real-time waypoint hazard telemetry.
          </p>
        </div>

        {/* Controls: API Key & Audio Toggles */}
        <div className="flex items-center space-x-3">
          <button
            id="toggle-audio-btn"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-medium transition flex items-center space-x-1.5 ${
              audioEnabled
                ? 'bg-slate-800 border-slate-700 text-orange-400'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title="Audio Hazard Alert Tone"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">{audioEnabled ? 'Audio Alert On' : 'Muted'}</span>
          </button>

          <button
            id="configure-maps-key-btn"
            onClick={() => setShowKeyModal(true)}
            className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
          >
            <Key className="w-4 h-4 text-emerald-400" />
            <span>{apiKey ? 'Google Maps Connected' : 'Connect Maps API'}</span>
          </button>
        </div>
      </div>

      {/* Corridor Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SAMPLE_ROUTES.map((route) => {
          const isSelected = selectedRoute.id === route.id;
          const isHigh = route.overallRiskLevel === 'HIGH';
          const isMed = route.overallRiskLevel === 'MEDIUM';
          return (
            <button
              key={route.id}
              id={`select-route-${route.id}`}
              onClick={() => {
                setSelectedRoute(route);
                setActiveWaypoint(null);
                setIsSimulating(false);
              }}
              className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900 border-orange-500 shadow-lg shadow-orange-500/10 scale-[1.01]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {route.isSafest && (
                <div className="absolute top-3 right-3 flex items-center space-x-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  <span>AI Safest Route</span>
                </div>
              )}
              
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                {route.distanceKm} km • ~{route.estimatedDurationMins} mins
              </span>
              <h3 className="font-bold text-sm text-white mt-1 pr-16">{route.name}</h3>
              
              <div className="flex items-center space-x-3 mt-3 text-xs">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isHigh 
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : isMed
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {route.overallRiskScore}% Risk ({route.overallRiskLevel})
                </span>
                <span className="text-[11px] text-slate-400">
                  {route.waypoints.length} Waypoints
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Map & Telematics Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Google Map Viewport (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          
          {/* Map Controls Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {selectedRoute.name}
              </span>
            </div>

            {/* Simulation Run Button */}
            <div className="flex items-center space-x-2">
              <button
                id="drive-simulation-toggle-btn"
                onClick={handleStartStopSimulation}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  isSimulating
                    ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Square className="w-3.5 h-3.5" />
                    <span>Stop Route Simulation</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Simulate Route Drive</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Map Display Container (CF2 Explicit Height mandated) */}
          <div className="relative w-full h-[460px] bg-slate-950 flex items-center justify-center overflow-hidden">
            
            {apiKey ? (
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultCenter={mapCenter}
                  defaultZoom={11}
                  mapId="DEMO_MAP_ID"
                  className="w-full h-full"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                >
                  {/* Origin Marker */}
                  <AdvancedMarker position={selectedRoute.originCoords}>
                    <Pin background="#10b981" borderColor="#065f46" glyphColor="#ffffff" />
                  </AdvancedMarker>

                  {/* Destination Marker */}
                  <AdvancedMarker position={selectedRoute.destCoords}>
                    <Pin background="#6366f1" borderColor="#3730a3" glyphColor="#ffffff" />
                  </AdvancedMarker>

                  {/* Waypoint Markers */}
                  {selectedRoute.waypoints.map((wp, i) => {
                    const isHigh = wp.riskLevel === 'HIGH';
                    const isMed = wp.riskLevel === 'MEDIUM';
                    const pinColor = isHigh ? '#f43f5e' : isMed ? '#f59e0b' : '#10b981';
                    return (
                      <AdvancedMarker
                        key={wp.id}
                        position={{ lat: wp.lat, lng: wp.lng }}
                        onClick={() => setActiveWaypoint(wp)}
                      >
                        <Pin 
                          background={pinColor} 
                          borderColor="#0f172a" 
                          glyphText={`${i + 1}`}
                          scale={activeWaypoint?.id === wp.id ? 1.25 : 1.0}
                        />
                      </AdvancedMarker>
                    );
                  })}

                  {/* InfoWindow for clicked Waypoint */}
                  {activeWaypoint && (
                    <InfoWindow
                      position={{ lat: activeWaypoint.lat, lng: activeWaypoint.lng }}
                      onCloseClick={() => setActiveWaypoint(null)}
                    >
                      <div className="text-slate-900 p-2 max-w-xs space-y-1">
                        <div className="font-bold text-xs">{activeWaypoint.name}</div>
                        <div className="text-[11px] text-slate-600 font-mono">
                          Risk: {activeWaypoint.riskScore}% ({activeWaypoint.riskLevel})
                        </div>
                        <div className="text-[11px] text-slate-700">
                          {activeWaypoint.hazardDescription}
                        </div>
                        <div className="text-[10px] text-orange-600 font-bold">
                          Safe Speed: {activeWaypoint.recommendedSpeedKmh} km/h
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            ) : (
              /* Fallback High-Fidelity Geospatial Vector Overlay when API key not yet connected */
              <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
                {/* Background Grid Lines & Road Corridor SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  
                  {/* Dynamic Curving Corridor Path */}
                  <path 
                    d="M 60,380 C 180,320 220,180 380,210 C 520,240 620,120 760,80" 
                    fill="none" 
                    stroke="#f97316" 
                    strokeWidth="4" 
                    strokeDasharray="8 4"
                  />
                </svg>

                {/* Simulated Geospatial Node Points */}
                <div className="relative z-10 w-full max-w-xl space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs text-slate-300 backdrop-blur">
                    <Navigation className="w-3.5 h-3.5 text-orange-400 animate-spin" />
                    <span>Geospatial Corridor: <strong>{selectedRoute.name}</strong></span>
                  </div>

                  {/* Waypoint Pills along corridor */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                    {selectedRoute.waypoints.map((wp, i) => {
                      const isHigh = wp.riskLevel === 'HIGH';
                      const isMed = wp.riskLevel === 'MEDIUM';
                      const isCurr = activeWaypoint?.id === wp.id;
                      return (
                        <div
                          key={wp.id}
                          onClick={() => setActiveWaypoint(wp)}
                          className={`p-3 rounded-xl border cursor-pointer transition backdrop-blur-md ${
                            isCurr
                              ? 'bg-slate-900 border-orange-500 shadow-lg'
                              : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-400">Node 0{i + 1}</span>
                            <span className={`px-1.5 py-0.2 rounded font-bold ${
                              isHigh ? 'bg-rose-500/20 text-rose-400' : isMed ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {wp.riskScore}%
                            </span>
                          </div>
                          <div className="text-xs font-bold text-white mt-1 truncate">{wp.name}</div>
                          <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                            {wp.hazardDescription}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                    Live satellite mapping ready. For interactive Google Maps tiles, connect your Google Maps API Key or free Maps Demo Key below.
                  </p>
                </div>

              </div>
            )}

            {/* In-Transit Alert Overlay if Simulating */}
            {isSimulating && simTelemetry.hazardAlert && (
              <div className="absolute top-4 left-4 right-4 bg-rose-950/90 border border-rose-600 text-white px-4 py-2.5 rounded-xl text-xs flex items-center justify-between shadow-2xl backdrop-blur-md animate-bounce">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span className="font-bold">{simTelemetry.hazardAlert}</span>
                </div>
                <span className="font-mono text-[10px] bg-rose-900 px-2 py-0.5 rounded text-rose-200">
                  DEFENSIVE SPEED: 35 KM/H
                </span>
              </div>
            )}

          </div>

          {/* Bottom Route Safety Tradeoff Banner */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 font-bold block">Safety Highlight:</strong>
                <span className="text-slate-400 text-[11px]">{selectedRoute.safetyHighlight}</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 font-bold block">Risk & Time Tradeoff:</strong>
                <span className="text-slate-400 text-[11px]">{selectedRoute.riskTradeoff}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: In-Transit Telematics HUD (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active HUD Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Vehicle Telematics HUD
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                isSimulating ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse' : 'bg-slate-800 text-slate-400'
              }`}>
                {isSimulating ? 'LIVE SIMULATION' : 'STANDBY'}
              </span>
            </div>

            {/* Big Risk Gauge Metric */}
            <div className="text-center bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Instant Corridor Risk Probability
              </span>
              <div className="text-4xl font-black font-mono text-white">
                {simTelemetry.currentRisk}
                <span className="text-xl text-orange-400 font-normal">%</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs pt-1">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  simTelemetry.currentRisk >= 70 ? 'bg-rose-500' : simTelemetry.currentRisk >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></span>
                <span className="font-semibold text-slate-300">
                  {simTelemetry.currentRisk >= 70 ? 'CRITICAL HAZARD ZONE' : simTelemetry.currentRisk >= 40 ? 'MODERATE ADVISORY' : 'OPTIMAL CLEAR PATH'}
                </span>
              </div>
            </div>

            {/* Dynamic Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Cruising Speed</span>
                <strong className="text-base text-white font-mono">{simTelemetry.speed} km/h</strong>
                <span className="text-[9px] text-slate-500 block mt-0.5">Recommended &lt;65</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Stopping Distance</span>
                <strong className="text-base text-blue-400 font-mono">{simTelemetry.stoppingDistance} m</strong>
                <span className="text-[9px] text-slate-500 block mt-0.5">Reaction + Braking</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Lateral Centrifugal G</span>
                <strong className="text-base text-purple-400 font-mono">{simTelemetry.gForce} G</strong>
                <span className="text-[9px] text-slate-500 block mt-0.5">Curve stability limit: 0.35G</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Audio Sensor</span>
                <strong className="text-base text-emerald-400 font-mono">{audioEnabled ? 'ONLINE' : 'MUTED'}</strong>
                <span className="text-[9px] text-slate-500 block mt-0.5">880 Hz Warning Chime</span>
              </div>

            </div>

            {/* Active Waypoint Inspection Details */}
            {activeWaypoint ? (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">Selected Waypoint</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {activeWaypoint.lat.toFixed(3)}, {activeWaypoint.lng.toFixed(3)}
                  </span>
                </div>
                <div className="font-bold text-white text-sm">{activeWaypoint.name}</div>
                <p className="text-slate-300 text-[11px]">{activeWaypoint.hazardDescription}</p>
                <div className="pt-2 border-t border-slate-800/80 flex justify-between text-[11px]">
                  <span className="text-slate-400">Weather: <strong className="text-slate-200">{activeWaypoint.weather}</strong></span>
                  <span className="text-slate-400">Surface: <strong className="text-slate-200">{activeWaypoint.roadCondition}</strong></span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
                Click any node on the map or start the simulation to monitor waypoint telemetry.
              </div>
            )}

          </div>

          {/* Historical Accident Hotspots Feed */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Corridor Blackspots & Crash Zones
              </span>
            </div>

            <div className="space-y-3">
              {ACCIDENT_HOTSPOTS.slice(0, 3).map((hs) => (
                <div key={hs.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{hs.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 font-mono">
                      {hs.historicalCrashCount} Crashes
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{hs.primaryCause}</p>
                  <span className="text-[10px] text-orange-400 block pt-0.5">
                    Advisory: {hs.advisoryNote}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Google Maps API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Connect Google Maps Platform</h3>
                <p className="text-xs text-slate-400 mt-0.5">Render real satellite tiles and vector routes</p>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p>
                Enter your Google Maps Platform API key or use the free <strong>Maps Demo Key</strong> for zero-cost prototyping without a billing account:
              </p>
              
              <div className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/60 space-y-1">
                <span className="font-bold text-indigo-300 block">How to get a Free Maps Demo Key:</span>
                <ol className="list-decimal list-inside text-indigo-200 text-[11px] space-y-0.5">
                  <li>Visit the official Maps Demo Key portal.</li>
                  <li>Sign in with any Google account (no credit card requested).</li>
                  <li>Copy and paste the generated demo key below.</li>
                </ol>
                <a
                  href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-orange-400 font-bold hover:underline pt-1"
                >
                  <span>Open Maps Demo Key Generator</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="font-semibold text-slate-200 block">API Key (or Demo Key)</label>
                <input
                  type="password"
                  value={tempKeyInput}
                  onChange={(e) => setTempKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setApiKey(tempKeyInput.trim());
                  setShowKeyModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600"
              >
                Save & Connect
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
