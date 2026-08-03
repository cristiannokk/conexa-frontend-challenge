'use client';

import { ChevronLeft, ChevronRight, RotateCcw, AlertCircle, Search } from 'lucide-react';
import Image from 'next/image';
import { useCharacters } from '@/hooks/useCharacters';
import { useCharacterStore, Character } from '@/store/useCharacterStore';
import { CharacterCard } from '@/components/ui/CharacterCard';

export interface CharacterPickerProps {
  pickerId: '1' | '2' | string;
  title: string;
}

export const CharacterPicker = ({ pickerId, title }: CharacterPickerProps) => {
  const {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    setPage,
    nextPage,
    prevPage,
    resetSearch,
  } = useCharacters(1);

  const { character1, character2, setCharacter1, setCharacter2 } = useCharacterStore();

  const selectedCharacter = pickerId === '1' ? character1 : character2;

  const handleSelect = (char: Character) => {
    if (pickerId === '1') {
      setCharacter1(char);
    } else {
      setCharacter2(char);
    }
  };

  const handleReset = () => {
    resetSearch();
    if (pickerId === '1') {
      setCharacter1(null);
    } else {
      setCharacter2(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const isAlive = status.toLowerCase() === 'alive';
    const isDead = status.toLowerCase() === 'dead';

    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
          isAlive
            ? 'bg-conexa-neon/20 text-conexa-neon border-conexa-neon/30'
            : isDead
            ? 'bg-red-500/20 text-red-400 border-red-500/30'
            : 'bg-slate-700/40 text-slate-300 border-slate-600/40'
        }`}
      >
        Status: {status}
      </span>
    );
  };

  const getPaginationRange = (current: number, total: number) => {
    if (total <= 1) return [1];
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    pages.push(1);

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 1) {
      pages.push('...');
    }

    pages.push(total);

    return pages;
  };

  return (
    <div className="glass-card rounded-xl p-3.5 sm:p-5 border border-slate-700/60 relative overflow-hidden flex flex-col h-[580px] sm:h-[620px] md:h-[660px] shadow-2xl">
      <div className="absolute inset-0 portal-gradient opacity-50 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-700/40">
          <h2 className="text-xl font-extrabold text-conexa-neon flex items-center gap-2">
            {title}
          </h2>
          <button
            type="button"
            onClick={handleReset}
            title="Reset character search and selection"
            className="text-slate-400 hover:text-conexa-neon transition-colors flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded hover:bg-slate-800/50 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-conexa-neon shrink-0" />
            <span>Reset</span>
          </button>
        </div>

        <div className="relative mb-2.5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search character..."
            className="w-full bg-[#011230] border border-slate-700/60 rounded-lg py-1.5 sm:py-2 pl-9 pr-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-conexa-neon focus:ring-1 focus:ring-conexa-neon transition-all"
          />
        </div>

        {selectedCharacter ? (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start p-2.5 sm:p-3 rounded-lg bg-[#091b39]/70 border border-slate-700/60 mb-2.5 shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full glow-border overflow-hidden shrink-0 relative bg-slate-900">
              <Image
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex-grow text-center sm:text-left min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white truncate">
                {selectedCharacter.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start my-1 sm:my-1.5">
                {getStatusBadge(selectedCharacter.status)}
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-xs font-semibold border border-slate-700/60">
                  {selectedCharacter.species}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                <span className="font-bold text-slate-300">Origin:</span>{' '}
                {selectedCharacter.origin?.name || 'Unknown'}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#091b39]/40 border border-dashed border-slate-700/60 text-center mb-2.5 shrink-0">
            <p className="text-xs text-slate-400">
              Select a character from the list below
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#0e1f3d] rounded-lg animate-pulse border border-slate-800 flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-700/60 shrink-0" />
                  <div className="h-3.5 bg-slate-700/60 rounded w-3/4 mt-1" />
                  <div className="h-3 bg-slate-700/40 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center text-red-400">
              <AlertCircle className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-xs font-medium">{error}</p>
            </div>
          ) : characters.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center text-slate-400">
              <p className="text-xs font-medium">No characters found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {characters.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  isSelected={selectedCharacter?.id === char.id}
                  onClick={() => handleSelect(char)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-1 mt-2.5 pt-2.5 border-t border-slate-700/40 shrink-0">
          <button
            onClick={prevPage}
            disabled={currentPage <= 1 || loading}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-conexa-neon hover:bg-slate-800/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar">
            {getPaginationRange(currentPage, totalPages).map((item, idx) =>
              typeof item === 'number' ? (
                <button
                  key={idx}
                  onClick={() => setPage(item)}
                  disabled={loading}
                  className={`w-7 h-7 sm:w-8 sm:h-8 text-xs font-medium rounded-full flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed ${
                    currentPage === item
                      ? 'bg-conexa-neon/20 text-conexa-neon border border-conexa-neon shadow-[0_0_8px_rgba(57,255,20,0.4)] font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item}
                </button>
              ) : (
                <span key={idx} className="text-xs text-slate-500 px-1 select-none">
                  {item}
                </span>
              )
            )}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage >= totalPages || totalPages === 0 || loading}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-conexa-neon hover:bg-slate-800/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterPicker;
