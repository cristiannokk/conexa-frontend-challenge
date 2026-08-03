import { Episode } from '@/store/useCharacterStore';

export interface EpisodeIntersections {
  shared: Episode[];
  only1: Episode[];
  only2: Episode[];
}

export const getEpisodeIntersections = (
  episodes1: Episode[] = [],
  episodes2: Episode[] = []
): EpisodeIntersections => {
  const ids1 = new Set(episodes1.map((ep) => ep.id));
  const ids2 = new Set(episodes2.map((ep) => ep.id));

  const shared = episodes1.filter((ep) => ids2.has(ep.id));
  const only1 = episodes1.filter((ep) => !ids2.has(ep.id));
  const only2 = episodes2.filter((ep) => !ids1.has(ep.id));

  return { shared, only1, only2 };
};
