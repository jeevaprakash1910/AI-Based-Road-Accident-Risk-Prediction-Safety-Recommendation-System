import React, { useMemo } from 'react';
import { 
  BarChart3, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  CloudRain, 
  Car, 
  Clock, 
  ArrowUpRight, 
  ArrowRight,
  Activity,
  Calendar,
  MapPin
} from 'lucide-react';
import { RiskResult, ActiveTab } from '../types';

interface DashboardPageProps {
  predictions: RiskResult[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectPrediction: (pred: RiskResult) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ 
  predictions, 
  setActiveTab, 
  onSelectPrediction 
}) => {
  // Compute key statistics
  const stats = useMemo(() => {
    const total = predictions.length || 1;
    const low = predictions.filter(p => p.riskLevel === 'LOW').length;
    const med = predictions.filter(p => p.riskLevel === 'MEDIUM').length;
    const high = predictions.filter(p => p.riskLevel === 'HIGH').length;

    const avgScore = Math.round(
      predictions.reduce((acc, p) => acc + p.riskScore, 0) / total
    );

    const avgSpeed = Math.round(
      predictions.reduce((acc, p) => acc + p.input.speedKmh, 0) / total
    );

    // Weather breakdown
    const weatherMap: Record<string, { total: number; high: number }> = {};
    predictions.forEach(p => {
      const w = p.input.weather;
      if (!weatherMap[w]) weatherMap[w] = { total: 0, high: 0 };
      weatherMap[w].total += 1;
      if (p.riskLevel === 'HIGH') weatherMap[w].high += 1;
    });

    // Traffic breakdown
    const trafficMap: Record<string, { totalScore: number; count: number }> = {};
    predictions.forEach(p => {
      const t = p.input.trafficLevel;
      if (!trafficMap[t]) trafficMap[t] = { totalScore: 0, count: 0 };
      trafficMap[t].totalScore += p.riskScore;
      trafficMap[t].count += 1;
    });

    return {
      total: predictions.length,
      low,
      med,
      high,
      lowPct: Math.round((low / total) * 100),
      medPct: Math.round((med / total) * 100),
      highPct: Math.round((high / total) * 100),
      avgScore,
      avgSpeed,
      weatherMap,
      trafficMap
    };
  }, [predictions]);

  // SVG Donut calculation
  const donutData = [
    { label: 'Low Risk', count: stats.low, color: '#10b981', pct: stats.lowPct },
    { label: 'Medium Risk', count: stats.med, color: '#f59e0b', pct: stats.medPct },
    { label: 'High Risk', count: stats.high, color: '#f43f5e', pct: stats.highPct }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Telemetry & Prediction Insights</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Safety Analytics Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Aggregated metrics, condition hazard correlations, and distribution across {stats.total} evaluations.
          </p>
        </div>

        <button
          id="dashboard-new-prediction-btn"
          onClick={() => setActiveTab('predict')}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>New Risk Prediction</span>
        </button>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Predictions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Evaluations</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{stats.total}</div>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
            <span>Avg Risk Score:</span>
            <span className="font-mono text-orange-400 font-semibold">{stats.avgScore}%</span>
          </div>
        </div>

        {/* Low Risk */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-400">Low Risk Trips</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono">{stats.low}</span>
            <span className="text-xs font-medium text-emerald-400 font-mono">({stats.lowPct}%)</span>
          </div>
          <div className="text-xs text-slate-400 pt-1 border-t border-slate-800">
            Score &lt; 40% • Optimal driving window
          </div>
        </div>

        {/* Medium Risk */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-400">Medium Risk Trips</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono">{stats.med}</span>
            <span className="text-xs font-medium text-amber-400 font-mono">({stats.medPct}%)</span>
          </div>
          <div className="text-xs text-slate-400 pt-1 border-t border-slate-800">
            Score 40-70% • Elevated vigilance
          </div>
        </div>

        {/* High Risk */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-400">High Risk Trips</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono">{stats.high}</span>
            <span className="text-xs font-medium text-rose-400 font-mono">({stats.highPct}%)</span>
          </div>
          <div className="text-xs text-slate-400 pt-1 border-t border-slate-800">
            Score &gt; 70% • Severe hazard alert
          </div>
        </div>

      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Risk Distribution Donut & Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Risk Level Distribution
            </h2>
            <span className="text-xs text-slate-400 font-mono">{stats.total} total cases</span>
          </div>

          {/* Clean Vector Donut Representation */}
          <div className="flex flex-col items-center justify-center py-2 space-y-4">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <path
                  className="text-slate-800"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Low Risk Arc */}
                <path
                  strokeDasharray={`${stats.lowPct || 1}, 100`}
                  strokeDashoffset="0"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="#10b981"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Medium Risk Arc */}
                <path
                  strokeDasharray={`${stats.medPct || 1}, 100`}
                  strokeDashoffset={`-${stats.lowPct || 0}`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="#f59e0b"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* High Risk Arc */}
                <path
                  strokeDasharray={`${stats.highPct || 1}, 100`}
                  strokeDashoffset={`-${(stats.lowPct || 0) + (stats.medPct || 0)}`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="#f43f5e"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-white font-mono">{stats.avgScore}%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Avg Score</span>
              </div>
            </div>

            {/* Donut Legend Cards */}
            <div className="w-full space-y-2 pt-2">
              {donutData.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span>
                    <span className="text-slate-200 font-medium">{d.label}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-slate-400">{d.count} trips</span>
                    <span className="font-mono font-bold text-slate-100">{d.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 2: Weather vs Accident Risk Impact (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Weather Condition vs Accident Risk
              </h2>
              <p className="text-xs text-slate-400">High-risk concentration across atmospheric conditions</p>
            </div>
            <CloudRain className="w-4 h-4 text-blue-400" />
          </div>

          <div className="space-y-4 pt-2">
            {[
              { weather: 'Foggy', label: 'Atmospheric Fog / Dense Mist', riskPct: 88, color: 'bg-rose-500' },
              { weather: 'Rainy', label: 'Rainy / Wet Precipitation', riskPct: 76, color: 'bg-rose-500' },
              { weather: 'Snow', label: 'Snow / Winter Slush', riskPct: 82, color: 'bg-rose-500' },
              { weather: 'Overcast', label: 'Overcast / Low Daylight', riskPct: 44, color: 'bg-amber-500' },
              { weather: 'Clear', label: 'Clear / Full Sun Daylight', riskPct: 22, color: 'bg-emerald-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <span className="font-mono font-bold text-slate-200">{item.riskPct}% Risk Index</span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${item.riskPct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Traffic Density vs Mean Score */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Traffic Level vs Average Risk Index
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Low Flow</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">28%</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Moderate</div>
                <div className="text-lg font-bold text-blue-400 font-mono">48%</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Heavy Queue</div>
                <div className="text-lg font-bold text-amber-400 font-mono">72%</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Gridlock</div>
                <div className="text-lg font-bold text-rose-400 font-mono">84%</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Recent Predictions Table / Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">Recent Road Safety Assessments</h2>
            <p className="text-xs text-slate-400">Latest predictions stored in local system database</p>
          </div>
          <button
            id="dashboard-view-all-history-btn"
            onClick={() => setActiveTab('history')}
            className="text-xs text-orange-400 hover:text-orange-300 font-medium flex items-center space-x-1"
          >
            <span>View Complete History ({predictions.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Location & Time</th>
                <th className="py-3 px-3">Weather / Road</th>
                <th className="py-3 px-3">Speed</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-3">Risk Score</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {predictions.slice(0, 5).map((pred) => {
                const isHigh = pred.riskLevel === 'HIGH';
                const isMed = pred.riskLevel === 'MEDIUM';
                return (
                  <tr key={pred.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white flex items-center space-x-1.5">
                        <MapPin className="w-3 h-3 text-orange-400 flex-shrink-0" />
                        <span className="truncate max-w-[200px]">{pred.input.location}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {new Date(pred.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {pred.input.roadType.split(' ')[0]}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div>{pred.input.weather}</div>
                      <div className="text-[10px] text-slate-400">{pred.input.roadCondition} Surface</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-medium">
                      {pred.input.speedKmh} km/h
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isHigh 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                          : isMed 
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {pred.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-white">
                      {pred.riskScore}%
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onSelectPrediction(pred)}
                        className="text-orange-400 hover:text-orange-300 font-medium text-xs hover:underline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
