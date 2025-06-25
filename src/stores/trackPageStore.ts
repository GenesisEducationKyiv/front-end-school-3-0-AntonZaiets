import { create } from 'zustand';
import { setParam } from '../services/api/urlParams';
import { TrackPageActions, TrackPageState } from './types.ts';

const initialTrackPageState: TrackPageState = {
  page: 1,
  sort: 'title',
  filter: { genre: '', artist: '' },
  searchTerm: '',
  isModalOpen: false,
  editingTrackId: null,
  deletingTrackId: null,
  selectedTracks: [],
  isSelectMode: false,
  isBulkConfirmOpen: false,
};

const useTrackPageStore = create<TrackPageState & TrackPageActions>((set) => ({
  ...initialTrackPageState,
  setPage: (page) => {
    set({ page });
    setParam('page', String(page));
  },
  setSort: (sort) => {
    set({ sort, page: 1 });
    setParam('sort', sort);
    setParam('page', '1');
  },
  setFilter: (type, value) => {
    const actualValue = value === 'All' ? '' : value;
    set((state) => ({
      filter: { ...state.filter, [type]: actualValue },
      page: 1,
    }));
    setParam(type, actualValue);
    setParam('page', '1');
  },
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setEditingTrackId: (editingTrackId) => set({ editingTrackId }),
  openNewTrackModal: () => set({ isModalOpen: true, editingTrackId: null }),
  openEditTrackModal: (id: string) =>
    set({ isModalOpen: true, editingTrackId: id }),
  closeModal: () => set({ isModalOpen: false, editingTrackId: null }),
  setDeletingTrackId: (deletingTrackId) => set({ deletingTrackId }),
  setSelectedTracks: (updater) =>
    set((state) => ({ selectedTracks: updater(state.selectedTracks) })),
  toggleTrackSelection: (id) =>
    set((state) => ({
      selectedTracks: state.selectedTracks.includes(id)
        ? state.selectedTracks.filter((tId) => tId !== id)
        : [...state.selectedTracks, id],
    })),
  setIsSelectMode: (isSelectMode) => set({ isSelectMode }),
  setIsBulkConfirmOpen: (isBulkConfirmOpen) => set({ isBulkConfirmOpen }),
  resetSelection: () => set({ selectedTracks: [], isSelectMode: false }),
}));

export default useTrackPageStore;
