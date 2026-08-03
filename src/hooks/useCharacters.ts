import { useState, useEffect, useCallback } from 'react';
import { fetchCharacters } from '@/services/api';
import { Character } from '@/store/useCharacterStore';

export interface UseCharactersReturn {
  characters: Character[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetSearch: () => void;
}

export const useCharacters = (initialPage: number = 1): UseCharactersReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    let isMounted = true;

    const loadCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchCharacters(currentPage, debouncedSearchQuery);
        if (isMounted) {
          setCharacters(response?.results || []);
          setTotalPages(response?.info?.pages || 0);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Error loading characters';
          setError(errorMessage);
          setCharacters([]);
          setTotalPages(0);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCharacters();

    return () => {
      isMounted = false;
    };
  }, [currentPage, debouncedSearchQuery]);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (totalPages > 0 && prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const resetSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
    setCurrentPage(1);
  }, []);

  return {
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
  };
};
