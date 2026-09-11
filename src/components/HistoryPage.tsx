import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  MapPin, 
  Calendar, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import { RiskResult } from '../types';
import { deletePrediction, clearAllPredictions, exportPredictionsCSV } from '../utils/storage';

interface HistoryPageProps {
  predictions: RiskResult[];
  onRefresh: () => void;
  onSelectPrediction: (pred: RiskResult) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ 
  predictions, 
  onRefresh, 
  onSelectPrediction 
}) => {
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectModalPred, setInspectModalPred] = useState<RiskResult | null>(null);

  const filtered = predictions.filter(item => {
    const matchesLevel = filterLevel === 'ALL' || item.riskLevel === filterLevel;
    const matchesSearch = 
      item.input.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.input.weather.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.input.roadType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.riskLevel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this prediction from local history?')) {
      deletePrediction(id);
      onRefresh();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all stored predictions?')) {
      clearAllPredictions();
      onRefresh();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header with Export and Clear Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
            <History className="w-4 h-4" />
            <span>Audit Trail & Persistence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Prediction Assessment History</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, filter, and inspect past environmental accident risk evaluations stored in the database.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            id="export-csv-btn"
            onClick={() => exportPredictionsCSV(filtered)}
            disabled={filtered.length === 0}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Export CSV</span>
          </button>

          <button
            id="clear-history-btn"
            onClick={handleClearAll}
            disabled={predictions.length === 0}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 text-xs font-medium transition disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="history-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by location, weather, road..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center space-x-2 self-start md:self-auto overflow-x-auto w-full md:w-auto">
          <span className="text-xs text-slate-400 mr-1 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" /> Filter:
          </span>
          {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              id={`filter-risk-${lvl}`}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filterLevel === lvl
                  ? 'bg-orange-500 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {lvl === 'ALL' ? 'All Records' : `${lvl} Risk`}
            </button>
          ))}
        </div>

      </div>

      {/* Predictions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Timestamp & Corridor</th>
                  <th className="py-3.5 px-4">Road Profile</th>
                  <th className="py-3.5 px-4">Environment</th>
                  <th className="py-3.5 px-4">Velocity</th>
                  <th className="py-3.5 px-4">Risk Level</th>
                  <th className="py-3.5 px-4">Risk Score</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filtered.map((item) => {
                  const isHigh = item.riskLevel === 'HIGH';
                  const isMed = item.riskLevel === 'MEDIUM';
                  return (
                    <tr 
                      key={item.id} 
                      onClick={() => setInspectModalPred(item)}
                      className="hover:bg-slate-800/50 transition cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white group-hover:text-orange-400 transition-colors flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                          <span className="truncate max-w-[220px]">{item.input.location}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {new Date(item.timestamp).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-slate-200 font-medium">{item.input.roadType}</div>
                        <div className="text-[11px] text-slate-400">{item.input.roadCondition} Surface</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-slate-200">{item.input.weather}</div>
                        <div className="text-[11px] text-slate-400">{item.input.visibility}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-slate-200">
                        {item.input.speedKmh} km/h
                        <div className="text-[10px] text-slate-500">{item.input.trafficLevel} Traffic</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isHigh
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : isMed
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {item.riskLevel}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-base text-white">
                        {item.riskScore}%
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectModalPred(item);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs"
                        >
                          Details
                        </button>
                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="p-1 rounded-lg hover:bg-rose-900/40 text-slate-500 hover:text-rose-400 transition"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <History className="w-8 h-8 text-slate-600 mx-auto" />
            <h3 className="font-bold text-white text-base">No Predictions Match Query</h3>
            <p className="text-xs max-w-sm mx-auto">
              Try adjusting the filter criteria or conduct a new risk evaluation in the Prediction tab.
            </p>
          </div>
        )}
      </div>

      {/* Inspect Detail Modal */}
      {inspectModalPred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-wider">Historical Assessment Detail</span>
                <h3 className="text-lg font-bold text-white mt-1">{inspectModalPred.input.location}</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {new Date(inspectModalPred.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setInspectModalPred(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Strip */}
            <div className="grid grid-cols-3 gap-3 text-center bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Risk Level</span>
                <div className="font-bold text-sm text-white mt-0.5">{inspectModalPred.riskLevel}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Risk Score</span>
                <div className="font-bold text-sm text-orange-400 font-mono mt-0.5">{inspectModalPred.riskScore}%</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Stopping Distance</span>
                <div className="font-bold text-sm text-blue-400 font-mono mt-0.5">{inspectModalPred.stoppingDistanceMeters}m</div>
              </div>
            </div>

            {/* Environmental Snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Weather</span>
                <strong className="text-slate-200">{inspectModalPred.input.weather}</strong>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Road Surface</span>
                <strong className="text-slate-200">{inspectModalPred.input.roadCondition}</strong>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Speed</span>
                <strong className="text-slate-200 font-mono">{inspectModalPred.input.speedKmh} km/h</strong>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Traffic Flow</span>
                <strong className="text-slate-200">{inspectModalPred.input.trafficLevel}</strong>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Visibility</span>
                <strong className="text-slate-200">{inspectModalPred.input.visibility}</strong>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Lighting</span>
                <strong className="text-slate-200">{inspectModalPred.input.lighting}</strong>
              </div>
            </div>

            {/* Contributing Reasons */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Identified Risk Factors</h4>
              <div className="space-y-2">
                {inspectModalPred.contributingFactors.map((f, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <div className="font-semibold text-slate-200 flex justify-between">
                      <span>{f.factor}</span>
                      <span className="font-mono text-orange-400">{f.impactScore}% impact</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{f.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Safety Advice Provided</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {inspectModalPred.safetyRecommendations.map((r, i) => (
                  <li key={i} className="flex items-start space-x-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200 block">{r.title}</strong>
                      <span className="text-slate-400 text-[11px]">{r.action}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectModalPred(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
