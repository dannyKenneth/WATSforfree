import React from 'react'
import { Search, BellRing, Sparkles } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Discover Campus Drops",
      description: "Browse live updates on free pizza, coffee, textbooks, and club merch happening right now across UWaterloo and Laurier buildings."
    },
    {
      number: "02",
      icon: BellRing,
      title: "Get Instant Alerts",
      description: "Never miss a giveaway. Receive real-time notifications the moment a new student perk or corporate freebie hits campus."
    },
    {
      number: "03",
      icon: Sparkles,
      title: "Grab & Go",
      description: "Follow verified location pins and coordinates to claim your freebies before supplies run out. Built for busy student schedules."
    }
  ]

  return (
    <section className="relative py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
          How WATsForFree works
        </h3>
        <p className="text-slate-400 text-sm md:text-base">
          Three simple steps to finding free campus food and merch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon
          return (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-mono font-semibold text-slate-600 group-hover:text-amber-400/60 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h4 className="text-xl font-medium text-white mb-3">
                  {step.title}
                </h4>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HowItWorks