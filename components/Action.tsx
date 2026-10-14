import React from 'react'
import { ArrowRight, Sparkles, ShieldCheck, Users, Zap } from 'lucide-react'

export function Action() {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 py-16 z-10">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#18093E]/90 to-[#11052C] border border-amber-400/30 p-8 md:p-14 overflow-hidden shadow-2xl">
        
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-mono font-medium text-amber-400 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>JOIN 4,200+ WATERLOO & LAURIER STUDENTS</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            So, what are you waiting for? <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Never miss free stuff again.
            </span>
          </h2>

          {/* Descriptive text */}
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Stop paying full price for campus snacks, coffee, and merch. Join the lightning-fast student radar today and grab your first freebie in under 5 minutes.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#get-started"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-semibold text-sm hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:scale-[1.02]"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#discord"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white font-medium text-sm border border-white/10 transition-all hover:scale-[1.02]"
            >
              <span>Join Discord Feed</span>
            </a>
          </div>

          {/* Trust Metrics / Micro Footer */}
          <div className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>&lt; 30s alert latency</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% student verified</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Users className="w-4 h-4 text-purple-400 shrink-0" />
              <span>UW & WLU exclusive</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Action