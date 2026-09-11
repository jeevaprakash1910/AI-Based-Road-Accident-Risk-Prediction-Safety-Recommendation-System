import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  BarChart3, 
  BookOpen, 
  History, 
  Info, 
  GraduationCap, 
  Menu, 
  X, 
  CheckCircle2, 
  Navigation, 
  Cpu 
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCollegeHub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenCollegeHub }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as ActiveTab, label: 'Home', icon: Activity },
    { id: 'predict' as ActiveTab, label: 'Risk Prediction', icon: ShieldAlert, highlight: true },
    { id: 'map-routes' as ActiveTab, label: 'Google Maps Routes', icon: Navigation },
    { id: 'advanced-model' as ActiveTab, label: 'Advanced AI Model', icon: Cpu },
    { id: 'dashboard' as ActiveTab, label: 'Analytics', icon: BarChart3 },
    { id: 'safety' as ActiveTab, label: 'Safety Tips', icon: BookOpen },
    { id: 'history' as ActiveTab, label: 'History', icon: History },
    { id: 'about' as ActiveTab, label: 'About', icon: Info },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <button 
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight text-white font-mono">ROAD<span className="text-orange-400">GUARD</span></span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">AI Risk</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Accident Risk Prediction & Safety System</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? item.highlight 
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                        : 'bg-slate-800 text-white border border-slate-700'
                      : item.highlight
                        ? 'text-orange-400 hover:bg-orange-500/10 hover:text-orange-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive && !item.highlight ? 'text-orange-400' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Hubs: College Guide & System Status */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ML Engine Active</span>
            </div>

            <button
              id="nav-college-hub-btn"
              onClick={onOpenCollegeHub}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <GraduationCap className="w-4 h-4" />
              <span>College Viva & Code Hub</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="nav-mobile-college-btn"
              onClick={onOpenCollegeHub}
              className="p-2 rounded-lg bg-indigo-600 text-white text-xs"
              title="College Hub"
            >
              <GraduationCap className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-3 pb-5 space-y-2 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 px-2 text-xs text-slate-400">
            <span>Navigation Menu</span>
            <span className="flex items-center text-emerald-400 text-xs">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Random Forest Ready
            </span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-orange-500 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.highlight && !isActive && (
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">Predict</span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-800">
            <button
              id="mobile-nav-college-hub"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCollegeHub();
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow-md"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Open College Viva & Python Code Hub</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
