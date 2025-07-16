import { useQuery } from '@tanstack/react-query';
import {
  fetchTracks,
  fetchGenres,
  fetchTrackBySlug,
} from '../services/grpc/grpc-tracks.ts';

export const useGenresQuery = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const result = await fetchGenres();
      return result.match(
        (genres) => genres,
        (error) => {
          console.error('Error loading genres:', error.message);
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
  return useQuery({
    queryKey: ['tracks', { page, limit, sort, filter, search }],
    queryFn: async () => {
      const result = await fetchTracks(page, limit, sort, filter, search);
      return result.match(
        (data) => data,
        (error) => {
          console.error('Error loading tracks:', error.message);
          return { tracks: [], totalPages: 0, currentPage: 1 };
        }
      );
    },
  });
};

export const useTrackBySlugQuery = (slug: string | null) => {
  return useQuery({
    queryKey: ['track', slug],
    queryFn: async () => {
      if (!slug) return null;
      const result = await fetchTrackBySlug(slug);
      return result.match(
        (track) => track,
        (error) => {
          console.error('Error loading track by slug:', error.message);
          return null;
        }
      );
    },
    enabled: !!slug,
  });
};
