import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  fetchTracks,
  fetchGenres,
  fetchTrackBySlug,
} from '../services/grpc/grpc-tracks';
import { handleError } from '../services/api/handleError.ts';

export const useGenresQuery = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const result = await fetchGenres();
      return result.match(
        (genres) => genres,
        (error) => {
          handleError(error);
          return [];
        }
      );
    },
  });
};

export const useTracksQuery = ({
  page,
  limit,
  sort,
  filter,
  search,
}: {
  page: number;
  limit: number;
  sort: string;
  filter: Record<string, string>;
  search: string;
}) => {
  const queryKey = useMemo(
    () => ['tracks', { page, limit, sort, filter, search }],
    [page, limit, sort, JSON.stringify(filter), search]
  );

  return useQuery({
    queryKey,
    queryFn: async () => {
      const result = await fetchTracks(page, limit, sort, filter, search);
      return result.match(
        (data) => data,
        (error) => {
          handleError(error);
          return { tracks: [], totalPages: 0, currentPage: 1 };
        }
      );
    },
  });
};

export const useTrackBySlugQuery = (slug: string | null) => {
  const queryKey = useMemo(() => ['track', slug], [slug]);

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!slug) return null;
      const result = await fetchTrackBySlug(slug);
      return result.match(
        (track) => track,
        (error) => {
          handleError(error);
          return null;
        }
      );
    },
    enabled: !!slug,
  });
};
