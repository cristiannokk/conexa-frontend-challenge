import { describe, it, expect } from 'vitest';
import { getEpisodeIntersections } from '@/utils/intersection';
import { Episode } from '@/store/useCharacterStore';

describe('getEpisodeIntersections', () => {
  const ep1: Episode = { id: '1', name: 'Pilot', air_date: 'Dec 2, 2013' };
  const ep2: Episode = { id: '2', name: 'Lawnmower Dog', air_date: 'Dec 9, 2013' };
  const ep3: Episode = { id: '3', name: 'Anatomy Park', air_date: 'Dec 16, 2013' };

  it('correctly calculates shared, only1, and only2 episodes', () => {
    const episodes1 = [ep1, ep2];
    const episodes2 = [ep2, ep3];

    const result = getEpisodeIntersections(episodes1, episodes2);

    expect(result.shared).toEqual([ep2]);
    expect(result.only1).toEqual([ep1]);
    expect(result.only2).toEqual([ep3]);
  });

  it('handles empty lists gracefully', () => {
    const result = getEpisodeIntersections([], []);

    expect(result.shared).toEqual([]);
    expect(result.only1).toEqual([]);
    expect(result.only2).toEqual([]);
  });

  it('handles when no episodes overlap', () => {
    const result = getEpisodeIntersections([ep1], [ep3]);

    expect(result.shared).toEqual([]);
    expect(result.only1).toEqual([ep1]);
    expect(result.only2).toEqual([ep3]);
  });
});
