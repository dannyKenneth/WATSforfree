import Hero from "@/components/Hero";
import Navbar from "../components/Navbar";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Action from "@/components/Action";
import FAQ from "@/components/FAQ";


export default function Home() {
  return (
    <div>
      <header className="top-0 left-0 w-full">
      <Navbar />
      </header>
      <section id="hero" className="w-full pb-16">
        <Hero />
      </section>
      <section id="about" className="w-full">
        <About />
      </section>
      <section id="features" className="w-full">
        <Features />
      </section>
      <section id="how-it-works" className="w-full scroll-mt-24">
        <HowItWorks />
      </section>
      <section id="faq" className="w-full">
        <FAQ />
      </section>
      <section id="action" className="w-full">
        <Action />
      </section>
      <footer className="w-full max-w-6xl mx-auto px-6 py-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-tight">WATsForFree</span>
          <span>•</span>
          <span>Built for UWaterloo & Wilfrid Laurier students</span>
        </div>
      </footer>
    </div>
    
  );
}
