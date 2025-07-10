import { create } from 'zustand';
import { setParam } from '../services/api/urlParams';
import { TrackPageActions, TrackPageState, FilterType } from './types.ts';

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

const useTrackPageStore = create<TrackPageState & TrackPageActions>()((set) => ({
    ...initialTrackPageState,
    setPage: (page: number) => {
      set({ page });
      setParam('page', String(page));
    },
    setSort: (sort: string) => {
      set({ sort, page: 1 });
      setParam('sort', sort);
      setParam('page', '1');
    },
    setFilter: (type: FilterType, value: string) => {
      const actualValue = value === 'All' ? '' : value;
      set((state: TrackPageState) => ({
        filter: { ...state.filter, [type]: actualValue },
        page: 1,
      }));
      setParam(type, actualValue);
      setParam('page', '1');
    },
    setSearchTerm: (searchTerm: string) => set({ searchTerm }),
    setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
    setEditingTrackId: (editingTrackId: string | null) =>
      set({ editingTrackId }),
    openNewTrackModal: () => set({ isModalOpen: true, editingTrackId: null }),
    openEditTrackModal: (id: string) =>
      set({ isModalOpen: true, editingTrackId: id }),
    closeModal: () => set({ isModalOpen: false, editingTrackId: null }),
    setDeletingTrackId: (deletingTrackId: string | null) =>
      set({ deletingTrackId }),
    setSelectedTracks: (updater: (prev: string[]) => string[]) =>
      set((state: TrackPageState) => ({
        selectedTracks: updater(state.selectedTracks),
      })),
    toggleTrackSelection: (id: string) =>
      set((state: TrackPageState) => ({
        selectedTracks: state.selectedTracks.includes(id)
          ? state.selectedTracks.filter((tId) => tId !== id)
          : [...state.selectedTracks, id],
      })),
    setIsSelectMode: (isSelectMode: boolean) => set({ isSelectMode }),
    setIsBulkConfirmOpen: (isBulkConfirmOpen: boolean) =>
      set({ isBulkConfirmOpen }),
    resetSelection: () => set({ selectedTracks: [], isSelectMode: false }),
  })
);

export default useTrackPageStore;
