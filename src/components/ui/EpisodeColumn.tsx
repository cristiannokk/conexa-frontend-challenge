import { ReactNode } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Episode } from '@/store/useCharacterStore';
import { EpisodeCard } from '@/components/ui/EpisodeCard';

export interface EpisodeColumnProps {
  title: string;
  episodes: Episode[];
  isHighlighted?: boolean;
  icon?: ReactNode;
  customAvatars?: { name: string; image: string }[];
  emptyMessage?: string;
}

export const EpisodeColumn = ({
  title,
  episodes,
  isHighlighted = false,
  icon,
  customAvatars,
  emptyMessage = 'No episodes found for this timeline.',
}: EpisodeColumnProps) => {
  return (
    <div
      className={`glass-card rounded-xl flex flex-col relative overflow-hidden transition-all duration-300 ${
        isHighlighted
          ? 'h-[400px] lg:h-[580px] lg:-mt-3 glow-border bg-[#152a50]/90 z-10 shadow-2xl'
          : 'h-[360px] lg:h-[520px] border border-slate-700/60'
      }`}
    >
      {isHighlighted && (
        <div className="absolute inset-0 portal-gradient opacity-40 pointer-events-none" />
      )}

      <div className="sticky top-0 z-10 p-4 border-b border-slate-700/50 bg-[#0e1f3d]/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <h3
            className={`font-bold text-lg truncate ${
              isHighlighted ? 'text-conexa-neon' : 'text-white'
            }`}
          >
            {title}
          </h3>
          {icon}
        </div>

        {customAvatars && customAvatars.length === 2 ? (
          <div className="flex -space-x-2 shrink-0">
            {customAvatars.map((av, idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full border-2 border-conexa-neon overflow-hidden relative bg-slate-900"
                title={av.name}
              >
                <Image
                  src={av.image}
                  alt={av.name}
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold flex-shrink-0 ${
              isHighlighted
                ? 'bg-conexa-neon/20 text-conexa-neon border border-conexa-neon/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {episodes.length} {episodes.length === 1 ? 'episode' : 'episodes'}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar relative z-10">
        {episodes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            {isHighlighted ? (
              <div className="flex flex-col items-center p-5 rounded-2xl bg-[#091b39]/90 border border-conexa-neon/50 shadow-[0_0_20px_rgba(57,255,20,0.25)]">
                <div className="w-12 h-12 rounded-full bg-conexa-neon/15 border border-conexa-neon/50 flex items-center justify-center text-conexa-neon mb-3 animate-pulse shadow-[0_0_12px_rgba(57,255,20,0.4)]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-sm font-extrabold text-conexa-neon">
                  "Wubba Lubba Dub Dub!"
                </p>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-[220px]">
                  No shared episodes found in this dimension.
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic leading-relaxed">
                {emptyMessage}
              </p>
            )}
          </div>
        ) : (
          episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              isHighlighted={isHighlighted}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EpisodeColumn;
