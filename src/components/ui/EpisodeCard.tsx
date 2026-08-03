import { Tv } from 'lucide-react';
import { Episode } from '@/store/useCharacterStore';

export interface EpisodeCardProps {
  episode: Episode;
  isHighlighted?: boolean;
}

export const EpisodeCard = ({ episode, isHighlighted = false }: EpisodeCardProps) => {
  return (
    <div
      className={`p-3.5 rounded-lg border transition-all duration-150 group ${
        isHighlighted
          ? 'bg-[#091b39]/90 border-conexa-neon/30 hover:border-conexa-neon shadow-[0_0_8px_rgba(57,255,20,0.1)]'
          : 'bg-[#253453]/40 border-slate-700/50 hover:border-slate-500'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span
          className={`text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border ${
            isHighlighted
              ? 'bg-conexa-neon/10 text-conexa-neon border-conexa-neon/30'
              : 'bg-slate-900/80 text-slate-300 border-slate-700/60'
          }`}
        >
          #{episode.id}
        </span>
        <span className="text-xs text-slate-400 font-medium">
          {episode.air_date}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <Tv
          className={`w-3.5 h-3.5 flex-shrink-0 ${
            isHighlighted ? 'text-conexa-neon' : 'text-slate-400'
          }`}
        />
        <h4 className="font-semibold text-sm text-white truncate" title={episode.name}>
          {episode.name}
        </h4>
      </div>
    </div>
  );
};

export default EpisodeCard;
