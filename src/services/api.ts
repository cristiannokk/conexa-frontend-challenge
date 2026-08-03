import { Character, Episode } from '@/store/useCharacterStore';

const BASE_URL = 'https://rickandmortyapi.com/api';

interface RestOrigin {
  name: string;
  url: string;
}

interface RestCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: RestOrigin;
  episode: string[];
}

interface RestEpisode {
  id: number;
  name: string;
  air_date: string;
  url: string;
}

const fetchEpisodesBatch = async (episodeUrls: string[]): Promise<Map<string, Episode>> => {
  const episodeMap = new Map<string, Episode>();
  if (episodeUrls.length === 0) return episodeMap;

  const episodeIds = Array.from(
    new Set(episodeUrls.map((url) => url.split('/').pop()).filter(Boolean))
  );

  if (episodeIds.length === 0) return episodeMap;

  try {
    const response = await fetch(`${BASE_URL}/episode/${episodeIds.join(',')}`);
    if (!response.ok) return episodeMap;

    const data = await response.json();
    const episodesArray: RestEpisode[] = Array.isArray(data) ? data : [data];

    episodesArray.forEach((ep) => {
      episodeMap.set(ep.url, {
        id: String(ep.id),
        name: ep.name,
        air_date: ep.air_date,
      });
    });
  } catch (error) {
    console.error('Error fetching episodes batch:', error);
  }

  return episodeMap;
};

export const fetchCharacters = async (page: number = 1, name?: string) => {
  try {
    let url = `${BASE_URL}/character?page=${page}`;
    if (name && name.trim() !== '') {
      url += `&name=${encodeURIComponent(name.trim())}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        return {
          info: { pages: 0, count: 0, next: null, prev: null },
          results: [],
        };
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const restCharacters: RestCharacter[] = data.results || [];

    const allEpisodeUrls = restCharacters.flatMap((char) => char.episode);
    const episodeMap = await fetchEpisodesBatch(allEpisodeUrls);

    const formattedCharacters: Character[] = restCharacters.map((char) => ({
      id: String(char.id),
      name: char.name,
      status: char.status,
      species: char.species,
      image: char.image,
      origin: {
        name: char.origin?.name || 'Unknown',
      },
      episode: char.episode
        .map((epUrl) => episodeMap.get(epUrl))
        .filter((ep): ep is Episode => Boolean(ep)),
    }));

    return {
      info: data.info,
      results: formattedCharacters,
    };
  } catch (error) {
    console.error('Error fetching characters via REST API:', error);
    throw error;
  }
};
