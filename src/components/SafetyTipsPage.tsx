import React, { useState } from 'react';
import { 
  CloudRain, 
  Moon, 
  Car, 
  Eye, 
  Droplets, 
  Gauge, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldAlert, 
  BookOpen, 
  Sliders, 
  Compass, 
  PhoneCall 
} from 'lucide-react';
import { calculateStoppingDistance } from '../utils/mlModel';

export const SafetyTipsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('rain');
  const [simSpeed, setSimSpeed] = useState<number>(75);
  const [simSurface, setSimSurface] = useState<string>('Wet');

  const { reactionDistance, brakingDistance, totalStoppingDistance } = calculateStoppingDistance(simSpeed, simSurface);

  const categories = [
    { id: 'rain', label: 'Rainy Weather', icon: CloudRain, count: 5 },
    { id: 'night', label: 'Night Driving', icon: Moon, count: 5 },
    { id: 'traffic', label: 'Heavy Traffic', icon: Car, count: 5 },
    { id: 'visibility', label: 'Poor Visibility', icon: Eye, count: 5 },
    { id: 'wet', label: 'Wet & Slick Roads', icon: Droplets, count: 5 },
    { id: 'speed', label: 'High-Speed Driving', icon: Gauge, count: 5 }
  ];

  const contentMap: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    primaryRule: string;
    dos: string[];
    donts: string[];
    engineeringFact: string;
  }> = {
    rain: {
      title: 'Rainy Weather Safety Protocols',
      subtitle: 'Managing Hydroplaning & Spray Blindness',
      description: 'Precipitation dramatically reduces tire traction by creating a dynamic water wedge between rubber and asphalt, while heavy downpours slash visibility by up to 70%.',
      primaryRule: 'Reduce standard cruising speed by at least 20-30% and double following headway from 2s to 4s.',
      dos: [
        'Replace wiper blades every 6-12 months to prevent optical streaking in torrential rain.',
        'Turn on headlights (low beam) so oncoming and trailing motorists can spot your silhouette.',
        'Follow tracks of the vehicle ahead where tires have already displaced standing water pools.',
        'Gradually pump brakes or rely on anti-lock brakes (ABS) if you feel front traction slippage.'
      ],
      donts: [
        'NEVER engage Cruise Control on rainy highways; it can trigger sudden wheelspin upon hydroplaning.',
        'Never drive through standing puddles of unknown depth (risk of engine hydrostatic lock).',
        'Avoid hard braking or aggressive steering wheel jerks while crossing painted road lane lines.',
        'Do not tailgate trucks; their massive tires blast blinding spray directly onto your windscreen.'
      ],
      engineeringFact: 'Tire hydroplaning speed formula: V_p = 6.36 * sqrt(p) where p is tire pressure in psi. At 32 psi, hydroplaning can start as low as 60-70 km/h.'
    },
    night: {
      title: 'Night Driving & Circadian Fatigue',
      subtitle: 'Countering Dark Unlit Hazards & Eye Glare',
      description: 'Fatal crash rates per kilometer driven are nearly 3 times higher at night due to impaired depth perception, high-beam glare blindness, and circadian rhythm sleep debt.',
      primaryRule: 'Never overdrive your headlights: your total stopping distance must always remain shorter than your illuminated beam length.',
      dos: [
        'Keep windscreen immaculate inside and out; microscopic grease films amplify oncoming headlight glare.',
        'Shift your gaze toward the white fog line on the left/right shoulder when oncoming cars blast high beams.',
        'Take a brisk 15-minute physical walk or rest break every 2 hours during long midnight stints.',
        'Ensure headlights and tail lamps are thoroughly cleaned from road grime before setting off.'
      ],
      donts: [
        'Never keep high-beams illuminated when approaching within 150 meters of an oncoming vehicle.',
        'Do not rely on coffee, energy drinks, or loud music to mask acute drowsiness (microsleep can strike in 2-3 seconds).',
        'Avoid staring directly into oncoming LED laser beams; look down and along the lane boundary.',
        'Never drive with cabin interior dome lights on; it destroys night pupil dilation and causes reflections.'
      ],
      engineeringFact: 'Human visual acuity drops by over 80% in low-illumination scotopic conditions. A pedestrian dressed in dark clothing becomes visible only 20-30 meters away.'
    },
    traffic: {
      title: 'Heavy Traffic & Congestion Protocols',
      subtitle: 'Mitigating Rear-End Crashes & Stop-Start Fatigue',
      description: 'Stop-and-go congestion provokes driver impatience, impulsive lane-cutting, and frequent rear-end chain collisions caused by accordion compression waves.',
      primaryRule: 'Scan 2 to 3 vehicles ahead over the roofline of the car directly in front of you to anticipate braking waves early.',
      dos: [
        'When stopped at a red light or queue, leave enough tarmac visible so you can see the rear tires of the car ahead touching the pavement.',
        'Signal lane departures at least 3 seconds prior to steering so motorcyclists filtering lanes have reaction time.',
        'Maintain a steady, relaxed crawling pace rather than accelerating hard only to slam brakes immediately.',
        'Check rearview mirror every time you apply brakes to ensure following vehicles are slowing down.'
      ],
      donts: [
        'Never engage in aggressive slalom lane-swapping; real-world trials prove it saves less than 90 seconds while quadrupling collision risk.',
        'Do not text, browse social feeds, or fidget with phone mounts during temporary stop-and-go pauses.',
        'Never box in two-wheelers; motorcyclists have zero crumple zone protection in sudden squeezes.',
        'Do not honk aggressively in static jams; noise pollution elevates collective driver cortisol and road rage.'
      ],
      engineeringFact: 'Accordion shockwaves in highway traffic travel backward at approximately 20 km/h. Smooth braking dampens shockwaves and prevents phantom jams.'
    },
    visibility: {
      title: 'Poor Visibility & Dense Fog Safety',
      subtitle: 'Surviving Thick Fog, Smog & Dust Storms',
      description: 'Fog creates optical illusions that make oncoming objects appear to be moving slower than they actually are, triggering catastrophic multi-vehicle pileups.',
      primaryRule: 'Use low-beam fog lights and roll down the driver window slightly to listen for auditory traffic cues (horns, engine rumbles).',
      dos: [
        'Turn on dedicated front and rear fog lamps immediately when visibility drops below 200 meters.',
        'Follow the painted white reflective line on the pavement edge as a continuous directional guide.',
        'If visibility drops to near zero, pull entirely off the road beyond the shoulder, switch off all lights, and turn on emergency hazard flashers.',
        'Tap the horn periodically when approaching junctions or blind bends in dense fog.'
      ],
      donts: [
        'NEVER use high-beam headlights in fog; the microscopic water droplets reflect light straight back into your eyes, creating a wall of white glare.',
        'Do not stop dead in an active travel lane under any circumstance.',
        'Never attempt to overtake in foggy single-lane or mountain pass corridors.',
        'Do not speed up to catch up to the taillights of another vehicle in front of you (spatial disorientation).'
      ],
      engineeringFact: 'Dense fog (droplet diameter 10-20 microns) causes Mie scattering of visible light. Yellow or low-beam light preserves contrast better than harsh white high beams.'
    },
    wet: {
      title: 'Wet & Slick Road Surface Dynamics',
      subtitle: 'Understanding Surface Friction Loss & Braking Distance',
      description: 'Fresh rain on dry asphalt floats accumulated oil, rubber residues, and diesel fuel to the surface, creating an invisible, soap-slick film during the initial 15 minutes of downpour.',
      primaryRule: 'Treat the first 15-20 minutes of light rain as the most treacherous phase of any storm.',
      dos: [
        'Check tire tread depth regularly; minimum legal tread is 1.6mm, but wet grip deteriorates drastically below 3mm.',
        'Brake gently and progressively in straight lines before entering roadway bends, not while turning.',
        'Keep both hands positioned firmly at 9-and-3 o’clock on the steering wheel to absorb sudden tire pull.',
        'Verify tire pressures monthly; under-inflated tires compress and channel water poorly through treads.'
      ],
      donts: [
        'Never jerk the steering wheel abruptly if you hit an unexpected puddle; hold straight and ease off gas.',
        'Do not brake hard if the car begins to fishtail; look in the direction you want to go and counter-steer gently.',
        'Never drive on bald or mismatched tires with differing tread depths on the same axle.',
        'Avoid sudden downshifting that could break drive-wheel traction on wet slick curves.'
      ],
      engineeringFact: 'Braking coefficient of friction drops from 0.75 (dry asphalt) to 0.35-0.42 (wet asphalt), extending emergency stopping distance by 60% to 100%.'
    },
    speed: {
      title: 'High-Speed Expressway Driving',
      subtitle: 'Kinetic Energy Management & Lane Discipline',
      description: 'Kinetic energy increases with the square of vehicle velocity (KE = 0.5 * m * v²). A crash at 120 km/h delivers 4 times the destructive energy of a crash at 60 km/h.',
      primaryRule: 'Observe the designated expressway speed limit and reserve the farthest right (or left in RHD) lane strictly for overtaking.',
      dos: [
        'Maintain a minimum 3-second gap behind lead vehicles in dry conditions, extending to 5 seconds above 100 km/h.',
        'Always check the rear blind spot with a quick over-the-shoulder glance before commencing lane changes.',
        'Inspect tire sidewalls for bulges, cracks, or embedded nails prior to high-speed long-distance highway travel.',
        'In event of a sudden tire blowout, grip steering firmly, do NOT slam brakes, and allow engine drag to decelerate.'
      ],
      donts: [
        'Never tailgate closely to intimidate or force slower motorists out of the passing lane.',
        'Never weave across multiple highway lanes without signaling and stabilizing between moves.',
        'Do not overload roof racks or cargo bins; top-heavy weight dramatically raises vehicle rollover center of gravity.',
        'Never reverse or back up on an expressway shoulder if you miss an exit ramp; proceed to next exit.'
      ],
      engineeringFact: 'At 120 km/h, your car travels 33.3 meters per second. In the 1.5 seconds it takes to glance at a smartphone text, you travel over 50 meters completely blind.'
    }
  };

  const current = contentMap[activeCategory];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Driver Education & Preventive Guidelines</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Categorized Road Safety Manual</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Evidence-backed defensive driving strategies, vehicular friction physics, and emergency mitigation checklists.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`safety-cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Category Content Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Dos, Don'ts and Rules (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">{current.subtitle}</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{current.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {current.description}
            </p>
          </div>

          {/* Golden Rule Callout */}
          <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-4 flex items-start space-x-3 text-xs text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-300 uppercase tracking-wider block mb-0.5">Defensive Driving Imperative:</strong>
              <span>{current.primaryRule}</span>
            </div>
          </div>

          {/* Dos and Don'ts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Mandatory Actions (Dos) */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Mandatory Actions (Do's)</span>
              </div>
              <ul className="space-y-2.5">
                {current.dos.map((d, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-emerald-400 font-bold text-sm leading-none">•</span>
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Hazards (Don'ts) */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>Critical Hazards (Don'ts)</span>
              </div>
              <ul className="space-y-2.5">
                {current.donts.map((d, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-rose-400 font-bold text-sm leading-none">•</span>
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Engineering & Physics Insight */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 space-y-1">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-wider block">Transportation Engineering Benchmark:</span>
            <p className="italic text-slate-300">{current.engineeringFact}</p>
          </div>

        </div>

        {/* Right: Interactive Kinematic Stopping Simulator (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-orange-400" />
              <span>Braking Physics Simulator</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Simulate total vehicle stopping distance based on speed and road friction coefficient.
            </p>
          </div>

          {/* Speed Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Cruising Speed</span>
              <span className="font-mono text-orange-400">{simSpeed} km/h</span>
            </div>
            <input
              id="sim-speed-slider"
              type="range"
              min="30"
              max="130"
              step="5"
              value={simSpeed}
              onChange={(e) => setSimSpeed(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>30 km/h</span>
              <span>80 km/h</span>
              <span>130 km/h</span>
            </div>
          </div>

          {/* Road Surface Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Road Surface Grip</label>
            <select
              id="sim-surface-select"
              value={simSurface}
              onChange={(e) => setSimSurface(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-orange-500"
            >
              <option value="Dry">Dry Asphalt (μ = 0.75)</option>
              <option value="Wet">Wet Asphalt (μ = 0.42)</option>
              <option value="Icy">Ice / Black Ice (μ = 0.15)</option>
              <option value="Potholes / Damaged">Potholes / Damaged (μ = 0.48)</option>
            </select>
          </div>

          {/* Computed Results Graphic */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Total Required Stopping Distance</span>
              <div className="text-3xl font-extrabold text-white font-mono mt-0.5">
                {totalStoppingDistance} <span className="text-sm font-normal text-slate-400">meters</span>
              </div>
              <span className="text-[10px] text-orange-400 font-mono">
                ~ {Math.round(totalStoppingDistance / 4.5)} car lengths
              </span>
            </div>

            {/* Split bars */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-blue-400 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded bg-blue-500"></span>
                  <span>Perception Distance (1.5s):</span>
                </span>
                <span className="font-mono text-slate-300 font-bold">{reactionDistance} m</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-amber-400 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded bg-amber-500"></span>
                  <span>Mechanical Braking Distance:</span>
                </span>
                <span className="font-mono text-slate-300 font-bold">{brakingDistance} m</span>
              </div>
            </div>

            {/* Visual Road Track Representation */}
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
              <div 
                className="bg-blue-500 h-full" 
                style={{ width: `${(reactionDistance / totalStoppingDistance) * 100}%` }}
                title="Reaction distance"
              ></div>
              <div 
                className="bg-amber-500 h-full" 
                style={{ width: `${(brakingDistance / totalStoppingDistance) * 100}%` }}
                title="Braking distance"
              ></div>
            </div>
          </div>

          {/* Emergency SOS Numbers */}
          <div className="bg-rose-950/30 border border-rose-800/40 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-rose-400 font-bold">
              <PhoneCall className="w-4 h-4" />
              <span>National Emergency Contacts</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block text-[9px]">Emergency SOS</span>
                <strong className="text-white text-sm">112 / 911</strong>
              </div>
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block text-[9px]">Highway Patrol</span>
                <strong className="text-white text-sm">1033</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
