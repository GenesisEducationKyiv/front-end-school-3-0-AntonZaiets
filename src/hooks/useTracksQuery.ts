import { useQuery } from '@tanstack/react-query';
import { fetchTracks, fetchGenres } from '../services/api/tracks';

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
          return [];
        }
      );
    },
  });
};
