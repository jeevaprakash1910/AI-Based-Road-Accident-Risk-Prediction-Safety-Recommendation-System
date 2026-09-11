import React from 'react';
import { ShieldAlert, AlertTriangle, GraduationCap, Heart, ExternalLink } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCollegeHub: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenCollegeHub }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Disclaimer Strip */}
      <div className="bg-amber-950/40 border-b border-amber-800/40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center space-x-3 text-xs text-amber-200/90">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <p>
            <strong className="font-semibold text-amber-300">Academic & Safety Disclaimer: </strong>
            RoadGuard computes an <em>estimated hazard risk probability</em> based on historical meteorological and traffic patterns. It does NOT predict deterministic collisions or guarantee crash immunity. Drivers must exercise full legal compliance, alertness, and defensive driving at all times.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & College Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white font-mono tracking-tight">ROADGUARD AI</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              An intelligent, supervised machine-learning safety decision-support system. Designed for B.Tech Artificial Intelligence and Data Science curriculum, demonstrating real-world multi-parametric hazard modeling.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700">Random Forest Classifier</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700">Python + Flask</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700">Kinematic Braking Model</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700">SQLite History</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-orange-400 transition">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('predict')} className="hover:text-orange-400 transition">
                  Predict Road Risk
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-orange-400 transition">
                  Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('safety')} className="hover:text-orange-400 transition">
                  Categorized Safety Tips
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="hover:text-orange-400 transition">
                  Prediction History
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & College Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">College Project Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenCollegeHub} className="flex items-center space-x-1.5 text-indigo-400 hover:text-indigo-300 transition font-medium">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Viva Q&A & 10-Min Talk</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenCollegeHub} className="hover:text-orange-400 transition">
                  Python Backend & Model Code
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-orange-400 transition">
                  System Architecture & Equations
                </button>
              </li>
              <li>
                <span className="text-slate-500">2nd Year B.Tech Project</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-2 sm:space-y-0">
          <p>© 2026 RoadGuard Safety System. Built for AI & Data Science Engineering Demonstration.</p>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center text-slate-400">
              Zero Unsolicited APIs • Local-First Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
