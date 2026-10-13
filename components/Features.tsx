"use client";

import React, { useState } from "react";
import {
  Zap,
  MapPin,
  Bell,
  ShieldCheck,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  Navigation,
  Check,
  TrendingUp,
} from "lucide-react";

export function Features() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [synced, setSynced] = useState(false);

  const filters = [
    { id: "all", label: "All Drops" },
    { id: "food", label: "Free Food" },
    { id: "swag", label: "Merch & Swag" },
    { id: "tech", label: "Tech & Print" },
  ];

  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 py-12 z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Everything you need. Zero noise.
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Engineered for UWaterloo and Laurier students to discover, verify, and reach campus perks before supplies run out.
        </p>
      </div>

      {/* 2x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: Real-Time Feed */}
        <div className="p-6 rounded-2xl bg-[#18093E]/70 border border-purple-500/20 backdrop-blur-xl hover:border-amber-400/40 transition-all flex flex-col justify-between group shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE UPDATES
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Live Activity Feed</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Instant updates as soon as free food, textbook sales, or corporate swag hit campus buildings.
            </p>
          </div>

          {/* Interactive Live Mini List */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Free Pizza & Drinks</div>
                  <div className="text-[11px] text-slate-400">Davis Centre Foyer (DC)</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">2m ago</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">GitHub T-Shirts & Stickers</div>
                  <div className="text-[11px] text-slate-400">Lazaridis Hall (LA)</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">14m ago</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Precise Location Coordinates */}
        <div className="p-6 rounded-2xl bg-[#18093E]/70 border border-purple-500/20 backdrop-blur-xl hover:border-amber-400/40 transition-all flex flex-col justify-between group shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-purple-300/70">UW & WLU MAPS</span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Verified Location Pins</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Exact room numbers and building coordinates so you never waste time hunting ghosts across campus.
            </p>
          </div>

          {/* Interactive Map Visual Mockup */}
          <div className="p-4 rounded-xl bg-[#11052C] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                Math & Computer (MC) 3rd Floor
              </span>
              <span className="font-mono text-[10px] text-emerald-400">120m away</span>
            </div>
            
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-amber-200 h-full w-3/4 rounded-full" />
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                ~3 min walk
              </span>
              <span className="text-amber-400 font-mono font-medium">Active Now</span>
            </div>
          </div>
        </div>

        {/* CARD 3: Smart Push Alerts */}
        <div className="p-6 rounded-2xl bg-[#18093E]/70 border border-purple-500/20 backdrop-blur-xl hover:border-amber-400/40 transition-all flex flex-col justify-between group shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-purple-300/70">CUSTOM NOTIFS</span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Targeted Drop Alerts</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Customize alerts by category or building. Only get pinged for perks you actually care about.
            </p>
          </div>

          {/* Notification Stack Preview */}
          <div className="relative pt-2">
            <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center gap-3 backdrop-blur-md transform -rotate-1 shadow-lg">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                WFS
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Free Bubble Tea Drop!</div>
                <div className="text-[11px] text-amber-200/80">SLC Great Hall • 50 cups left</div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: Community Verification */}
        <div className="p-6 rounded-2xl bg-[#18093E]/70 border border-purple-500/20 backdrop-blur-xl hover:border-amber-400/40 transition-all flex flex-col justify-between group shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-emerald-400 font-medium">99.4% ACCURACY</span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Crowdsourced Verification</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Upvoted and verified by peer students in real-time so expired listings get marked immediately.
            </p>
          </div>

          {/* Upvote & Verification Bar */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200">Verified Available</span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +42 Upvotes
              </span>
            </div>
            
            <div className="flex gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">Confirmed by @alex_uw</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400 text-[10px] font-mono">1m ago</span>
            </div>
          </div>
        </div>

        {/* CARD 5: Category Filters */}
        <div className="p-6 rounded-2xl bg-[#18093E]/70 border border-purple-500/20 backdrop-blur-xl hover:border-amber-400/40 transition-all flex flex-col justify-between group shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Filter className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-purple-300/70">SMART FILTERS</span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Instant Categorization</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Filter instantly between dietary preferences, tech gear, study snacks, or free event passes.
            </p>
          </div>

          {/* Interactive Tag Filter Bar */}
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                    : "bg-white/[0.05] text-slate-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* CARD 6: Schedule Sync */}
        <div className="p-6 rounded-2xl bg-[#18093E]/70 border border-purple-500/20 backdrop-blur-xl hover:border-amber-400/40 transition-all flex flex-col justify-between group shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-purple-300/70">TIMETABLE FIT</span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Between-Class Timing</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Find giveaways happening right along your walking route between Waterloo Math lectures and Laurier Business classes.
            </p>
          </div>

          {/* Interactive Calendar Sync Button */}
          <div className="pt-2">
            <button
              onClick={() => setSynced(!synced)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                synced
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-white/[0.05] border-white/10 text-white hover:bg-white/10 hover:border-white/20"
              }`}
            >
              {synced ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Synced with Class Schedule
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Sync Class Timetable
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Features;