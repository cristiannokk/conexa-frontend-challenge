import { create } from 'zustand';

export interface Episode {
  id: string;
  name: string;
  air_date: string;
}

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: { name: string };
  episode: Episode[];
}

interface AppState {
  character1: Character | null;
  character2: Character | null;
  setCharacter1: (char: Character | null) => void;
  setCharacter2: (char: Character | null) => void;
}

export const useCharacterStore = create<AppState>((set) => ({
  character1: null,
  character2: null,
  setCharacter1: (char) => set({ character1: char }),
  setCharacter2: (char) => set({ character2: char }),
}));