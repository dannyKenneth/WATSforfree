import React from 'react'
import Link from 'next/link'
import HowItWorksLink from '@/components/HowItWorksLink'

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center pt-32 px-6 text-center max-w-5xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-slate-300 hover:border-white/20 transition-all cursor-pointer">
        <span className="text-amber-400">New</span>
        <span className="text-slate-400">|</span>
        <span>Version 1.0 Released!</span>
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.05] bg-gradient-to-b from-white via-slate-100 to-slate-400/70 bg-clip-text text-transparent">
        Never pay for campus
        <span className="relative inline-block bg-gradient-to-b from-white via-slate-100 to-slate-400/20 bg-clip-text text-transparent ml-3">
          food again
          
          <svg 
            className="absolute -bottom-3 left-0 w-full h-4 text-amber-400 overflow-visible pointer-events-none" 
            viewBox="0 0 300 12" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M 2 10 Q 150 2 298 9" 
              stroke="currentColor" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              className="opacity-90"
            />
            <path 
              d="M 8 11 Q 150 4 290 10" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              className="opacity-60"
            />
          </svg>
        </span>
        </h1>

      <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl font-normal tracking-tight leading-relaxed">
        Discover free food events, free club merch, and campus drops in real-time. Built specifically for students from the Waterloo Region in mind.
      </p>

      <div className="mt-10 flex items-center gap-4">
        <Link href="/signup" className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-400/20">
          Find Free Stuff
        </Link>
        <HowItWorksLink className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-sm border border-white/10 transition-all">
          How it works
        </HowItWorksLink>
      </div>
    </section>
  )
}

export default Hero