'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, MapPin, Utensils, ShieldCheck } from "lucide-react"

export default function About() {
  return (
    <section className="relative w-full py-24 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white leading-tight">
            Built for students who want to eat well and save money.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Item 1: Large Featured Alert Box */}
          <Card className="md:col-span-2 bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
            <CardHeader className="p-8 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
                <Bell className="w-5 h-5" />
              </div>
              <CardTitle className="text-2xl font-medium tracking-tight text-white">
                Real-Time Campus Alerts
              </CardTitle>
              <CardDescription className="text-slate-400 text-base font-normal max-w-lg mt-2">
                Instant notifications the second leftover catering, club snacks, or event refreshments drop anywhere on campus.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {/* Mock Notification Graphic */}
              <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Free Pizza & Drinks</div>
                    <div className="text-xs text-slate-400">SLC Great Hall • 8 boxes left</div>
                  </div>
                </div>
                <Badge className="bg-amber-400 text-slate-950 hover:bg-amber-300 font-semibold">
                  Live Drop
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Bento Item 2: Location & Mapping */}
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
            <CardHeader className="p-8">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-medium tracking-tight text-white">
                Precision Pinpointing
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm mt-2 leading-relaxed">
                Clear building locations, exact floor numbers, and room directions so you never wander lost across campus.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-0">
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs border-white/10 bg-white/5 text-slate-300">
                  MC Building
                </Badge>
                <Badge variant="outline" className="text-xs border-white/10 bg-white/5 text-slate-300">
                  3rd Floor
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Bento Item 3: Dietary Tags */}
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader className="p-8">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
                <Utensils className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-medium tracking-tight text-white">
                Dietary Filtering
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm mt-2 leading-relaxed">
                Filter drops instantly by dietary preference so you only get pinged for food you can actually eat.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-0 flex flex-wrap gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Halal
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Vegetarian
              </Badge>
              <Badge className="bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Nut-Free
              </Badge>
            </CardContent>
          </Card>

          {/* Bento Item 4: Verified Drops */}
          <Card className="md:col-span-2 bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader className="p-8">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <CardTitle className="text-2xl font-medium tracking-tight text-white">
                Crowdsourced & Community-Verified
              </CardTitle>
              <CardDescription className="text-slate-400 text-base font-normal max-w-lg mt-2 leading-relaxed">
                Live stock updates from students on the ground ensure you only show up when there's food still remaining.
              </CardDescription>
            </CardHeader>
          </Card>

        </div>
      </div>
    </section>
  )
}