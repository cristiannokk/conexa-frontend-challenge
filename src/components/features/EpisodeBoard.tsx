'use client';

import { Tv, Users, FlaskConical, Brain } from 'lucide-react';
import { useCharacterStore } from '@/store/useCharacterStore';
import { getEpisodeIntersections } from '@/utils/intersection';
import EpisodeColumn from '@/components/ui/EpisodeColumn';

export const EpisodeBoard = () => {
  const { character1, character2 } = useCharacterStore();

  if (!character1 || !character2) {
    return (
      <div className="w-full glass-card border border-slate-700/60 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[320px] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 portal-gradient opacity-30 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-conexa-neon/10 border border-conexa-neon/30 flex items-center justify-center text-conexa-neon mb-4 shadow-[0_0_20px_rgba(57,255,20,0.2)]">
            <Tv className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Timeline Intersections
          </h3>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            Select two characters above to analyze their shared timelines, exclusive appearances, and multiverse intersections.
          </p>
          <div className="flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300">
            <Users className="w-4 h-4 text-conexa-neon" />
            <span>
              {!character1 && !character2
                ? 'Select 2 characters to compare'
                : 'Select 1 more character'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const { shared, only1, only2 } = getEpisodeIntersections(
    character1.episode,
    character2.episode
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <EpisodeColumn
          title={`${character1.name} Only`}
          episodes={only1}
          icon={<FlaskConical className="w-4 h-4 text-slate-400" />}
          emptyMessage={`No exclusive episodic timelines detected for ${character1.name}.`}
        />

        <EpisodeColumn
          title="Shared Episodes"
          episodes={shared}
          isHighlighted={true}
          customAvatars={[
            { name: character1.name, image: character1.image },
            { name: character2.name, image: character2.image },
          ]}
          emptyMessage="No shared episodes found between these two characters."
        />

        <EpisodeColumn
          title={`${character2.name} Only`}
          episodes={only2}
          icon={<Brain className="w-4 h-4 text-slate-400" />}
          emptyMessage={`No exclusive episodic timelines detected for ${character2.name}.`}
        />
      </div>
    </div>
  );
};

export default EpisodeBoard;
