import { describe, it, expect, beforeEach } from 'vitest';
import { useCharacterStore, Character } from '@/store/useCharacterStore';

describe('useCharacterStore', () => {
  const dummyCharacter: Character = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    origin: { name: 'Earth (C-137)' },
    episode: [{ id: '1', name: 'Pilot', air_date: 'Dec 2, 2013' }],
  };

  beforeEach(() => {
    useCharacterStore.setState({
      character1: null,
      character2: null,
    });
  });

  it('updates character1 state correctly', () => {
    useCharacterStore.getState().setCharacter1(dummyCharacter);
    expect(useCharacterStore.getState().character1).toEqual(dummyCharacter);
  });

  it('updates character2 state correctly', () => {
    useCharacterStore.getState().setCharacter2(dummyCharacter);
    expect(useCharacterStore.getState().character2).toEqual(dummyCharacter);
  });

  it('clears characters when set to null', () => {
    useCharacterStore.getState().setCharacter1(dummyCharacter);
    useCharacterStore.getState().setCharacter1(null);
    expect(useCharacterStore.getState().character1).toBeNull();
  });
});
