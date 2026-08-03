'use client';

import { Sparkles, ArrowLeftRight, ExternalLink, User, Menu } from 'lucide-react';
import CharacterPicker from '@/components/features/CharacterPicker';
import EpisodeBoard from '@/components/features/EpisodeBoard';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-[#000d27]/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50 w-full">
        <div className="flex justify-between items-center w-full px-4 md:px-8 py-3 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-conexa-neon/10 border border-conexa-neon/30 text-conexa-neon shadow-[0_0_10px_rgba(57,255,20,0.3)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-conexa-neon">
              Conexa
            </span>
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-semibold text-slate-400">
            <a href="#" className="hover:text-conexa-neon transition-colors cursor-pointer">
              Portal
            </a>
            <a href="#" className="hover:text-conexa-neon transition-colors cursor-pointer">
              Multiverse
            </a>
            <a
              href="#"
              className="text-conexa-neon border-b-2 border-conexa-neon pb-0.5 cursor-pointer"
            >
              Compare
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="text-slate-400 hover:text-conexa-neon p-2 rounded-full hover:bg-slate-800/50 transition-colors cursor-pointer">
              <User className="w-5 h-5" />
            </button>
            <button className="md:hidden text-slate-400 hover:text-conexa-neon p-2 rounded-full hover:bg-slate-800/50 transition-colors cursor-pointer">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8">
        <div className="text-center space-y-2 mb-2">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Rick & Morty Character Match
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Analyze shared timelines and episodic intersections across the multiverse.
          </p>
        </div>

        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CharacterPicker pickerId="1" title="Character #1" />
            <CharacterPicker pickerId="2" title="Character #2" />
          </div>

          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#011230] border-2 border-conexa-neon items-center justify-center text-conexa-neon shadow-[0_0_15px_rgba(57,255,20,0.5)] pointer-events-none">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
        </section>

        <section className="pt-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Timeline Intersections
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Explore unique appearances and overlapping episodes.
            </p>
          </div>
          <EpisodeBoard />
        </section>
      </main>

      <footer className="bg-[#000d27] border-t border-slate-800/80 py-6 mt-12 w-full text-xs text-slate-400">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 max-w-[1440px] mx-auto gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-conexa-neon text-sm">Conexa</span>
            <span>|</span>
            <span>Frontend Developer Challenge</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span>Created for Challenge</span>
            <a
              href="#"
              className="text-conexa-neon hover:underline flex items-center gap-1"
            >
              Deploy Link <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Interdimensional Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
