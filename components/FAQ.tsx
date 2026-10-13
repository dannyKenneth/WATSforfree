"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is WATsForFree completely free to use?",
    answer:
      "Yes! WATsForFree is 100% free for all students across UWaterloo and Wilfrid Laurier. Our goal is to make campus life more affordable and accessible for everyone."
  },
  {
    question: "How do you verify if a free drop is real?",
    answer:
      "Listings are submitted by fellow students and club organizers. Community upvotes, real-time timestamps, and user confirmations help verify live locations before you walk over."
  },
  {
    question: "Which campuses and buildings are covered?",
    answer:
      "We cover main campus spots across UWaterloo (DC, MC, SLC, STC, E7) and Wilfrid Laurier (Lazaridis Hall, Science Building, Concourse, Peters Building), as well as surrounding student housing drops."
  },
  {
    question: "Can I post free items or food from my club/event?",
    answer:
      "Absolutely! Any student or club executive can instantly post free leftovers, pizza drops, textbook giveaways, or corporate merch directly to the feed."
  },
  {
    question: "How fast do notifications arrive when a drop happens?",
    answer:
      "Alerts are delivered in real time (< 30 seconds) through our web portal and community channels as soon as a new drop is verified."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-16 z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Got questions about how WATsForFree tracks campus freebies? Here is everything you need to know.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-[#18093E]/90 border-amber-400/40 shadow-lg shadow-amber-500/5"
                  : "bg-[#18093E]/50 border-purple-500/20 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-base md:text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen
                      ? "bg-amber-400/20 text-amber-400 rotate-180"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 text-sm md:text-base text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;