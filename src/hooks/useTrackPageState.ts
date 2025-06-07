import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTracks,
  fetchGenres,
  deleteTrack,
  updateTrack,
  createTrack,
} from '../services/api/tracks';
import useDebounce from './useDebounce.ts';
import { SelectChangeEvent } from '@mui/material';
import { setParam, getParam } from '../services/api/urlParams.ts';
import { O, pipe } from '@mobily/ts-belt';

const useTrackPageState = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(() =>
    pipe<O.Option<string>, O.Option<number>, number>(
      getParam('page'),
      O.flatMap((p) => {
        const parsed = parseInt(p, 10);
        return isNaN(parsed) ? O.None : O.Some(parsed);
      }),
      O.getWithDefault(1)
    )
  );

  const [limit] = useState(10);
  const [sort, setSort] = useState(() =>
    pipe(getParam('sort'), O.getWithDefault('title'))
  );
  const [filter, setFilter] = useState<Record<string, string>>(() => ({
    genre: pipe(getParam('genre'), O.getWithDefault('')),
    artist: pipe(getParam('artist'), O.getWithDefault('')),
  }));
  const [searchTerm, setSearchTerm] = useState(() =>
    pipe(getParam('search'), O.getWithDefault(''))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
  const [deletingTrackId, setDeletingTrackId] = useState<string | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const loadTracks = async () => {
    const result = await fetchTracks(
      page,
      limit,
      sort,
      filter,
      debouncedSearchTerm
    );
    return result.match(
      (data) => data,
      (error) => {
        console.error('Error loading tracks:', error.message);
        return [];
      }
    );
  };

  const loadGenres = async () => {
    const result = await fetchGenres();
    return result.match(
      (genres) => genres,
      (error) => {
        console.error('Error loading genres:', error.message);
        return [];
      }
    );
  };

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: loadGenres,
  });

  const {
    data: tracksData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      'tracks',
      { page, limit, sort, filter, search: debouncedSearchTerm },
    ],
    queryFn: loadTracks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTrack,
    onSuccess: () => queryClient.invalidateQueries(['tracks']),
  });

  const deleteMultipleMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => deleteTrack(+id)));
    },
    onSuccess: () => {
      setSelectedTracks([]);
      setIsSelectMode(false);
      queryClient.invalidateQueries(['tracks']);
    },
  });

  const createTrackMutation = useMutation({
    mutationFn: createTrack,
    onSuccess: () => queryClient.invalidateQueries(['tracks']),
  });

  const updateTrackMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        artist: string;
        album?: string;
        genres: string[];
        coverImage?: string;
      };
    }) => updateTrack(id, data),
    onSuccess: () => queryClient.invalidateQueries(['tracks']),
  });

  const handleSortChange = async (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSort(value);
    setParam('sort', value);
    setPage(1);
    setParam('page', '1');
  };

  const handleFilterChange = (type: string, value: string) => {
    const actualValue = value === 'All' ? '' : value;
    setFilter((prev) => ({ ...prev, [type]: actualValue }));
    setParam(type, actualValue);
    setPage(1);
    setParam('page', '1');
  };

  const handleSelectTrack = (id: string) => {
    setSelectedTracks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const setTrackToEdit = (trackId: string) => {
    setEditingTrackId(trackId);
    openModal();
  };
  const handleDelete = (trackId: string) => setDeletingTrackId(trackId);
  const handleCancelDelete = () => setDeletingTrackId(null);

  return {
    page,
    setPage,
    limit,
    sort,
    setSort,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    editingTrackId,
    setEditingTrackId,
    deletingTrackId,
    setDeletingTrackId,
    selectedTracks,
    setSelectedTracks,
    isSelectMode,
    setIsSelectMode,
    isBulkConfirmOpen,
    setIsBulkConfirmOpen,
    debouncedSearchTerm,
    genres,
    tracksData,
    isLoading,
    isError,
    deleteMutation,
    deleteMultipleMutation,
    createTrackMutation,
    updateTrackMutation,
    handleSortChange,
    handleFilterChange,
    handleSelectTrack,
    openModal,
    closeModal,
    setTrackToEdit,
    handleDelete,
    handleCancelDelete,
  };
};

export default useTrackPageState;
