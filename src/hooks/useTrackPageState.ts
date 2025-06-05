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

const useTrackPageState = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState('title');
  const [filter, setFilter] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
  const [deletingTrackId, setDeletingTrackId] = useState<string | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);

  const loadTracks = async () => {
    const result = await fetchTracks(
      page,
      limit,
      sort,
      filter,
      debouncedSearchTerm
    );
    return result.match(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error loading tracks:', error.message);
        return [];
      }
    );
  };

  const loadGenres = async () => {
    const result = await fetchGenres();
    return result.match(
      (genres) => {
        return genres;
      },
      (error) => {
        console.error('Error loading genres:', error.message);
        return [];
      }
    );
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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
    queryFn: () => loadTracks(),
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

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilter((prev) => ({ ...prev, [type]: value }));
    setPage(1);
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
