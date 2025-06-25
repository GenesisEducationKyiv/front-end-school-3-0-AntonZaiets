import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { setParam, getParam } from '../services/api/urlParams.ts';
import { O, pipe } from '@mobily/ts-belt';
import { useDebounce } from './index';
import { useTracksQuery, useGenresQuery } from './index';
import {
  useDeleteTrackMutation,
  useDeleteMultipleTracksMutation,
  useCreateTrackMutation,
  useUpdateTrackMutation,
} from './index';

const useTrackPageState = () => {
  const rawPageParam = getParam('page');
  const rawSortParam = getParam('sort');
  const rawGenreParam = getParam('genre');
  const rawArtistParam = getParam('artist');
  const rawSearchParam = getParam('search');
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState('title');
  const [filter, setFilter] = useState<Record<string, string>>({
    genre: '',
    artist: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
  const [deletingTrackId, setDeletingTrackId] = useState<string | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setPage(
      pipe<O.Option<string>, O.Option<number>, number>(
        rawPageParam,
        O.flatMap((p) => {
          const parsed = parseInt(p, 10);
          return isNaN(parsed) ? O.None : O.Some(parsed);
        }),
        O.getWithDefault(1)
      )
    );

    pipe(rawSearchParam, O.map(setSearchTerm));
    pipe(rawSortParam, O.map(setSort));
    pipe(
      rawGenreParam,
      O.map((value) => setFilter((prev) => ({ ...prev, genre: value })))
    );
    pipe(
      rawArtistParam,
      O.map((value) => setFilter((prev) => ({ ...prev, artist: value })))
    );
  }, []);

  const { data: genres } = useGenresQuery();
  const {
    data: tracksData,
    isLoading,
    isError,
  } = useTracksQuery({
    page,
    limit,
    sort,
    filter,
    search: debouncedSearchTerm,
  });

  const deleteMutation = useDeleteTrackMutation();
  const deleteMultipleMutation = useDeleteMultipleTracksMutation({
    onComplete: () => {
      setSelectedTracks([]);
      setIsSelectMode(false);
    },
  });
  const createTrackMutation = useCreateTrackMutation();
  const updateTrackMutation = useUpdateTrackMutation();

  const handleSortChange = (e: SelectChangeEvent<string>) => {
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
    debouncedSearchTerm,
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
