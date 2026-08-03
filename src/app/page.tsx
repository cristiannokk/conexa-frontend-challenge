'use client';

import { ArrowLeftRight } from 'lucide-react';
import CharacterPicker from '@/components/features/CharacterPicker';
import EpisodeBoard from '@/components/features/EpisodeBoard';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-[#000d27]/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50 w-full">
        <div className="flex items-center justify-center w-full px-4 md:px-8 py-3.5 max-w-[1440px] mx-auto">
          <span className="text-2xl font-black tracking-tight text-conexa-neon">
            Conexa
          </span>
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
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 md:px-8 max-w-[1440px] mx-auto gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-conexa-neon text-sm">Conexa</span>
            <span>|</span>
            <span>Developed for Conexa Frontend Challenge</span>
          </div>

          <a
            href="https://github.com/cristiannokk/conexa-frontend-challenge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-300 hover:text-conexa-neon transition-colors font-medium cursor-pointer"
          >
            <svg className="w-4 h-4 text-conexa-neon fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub Repository</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
