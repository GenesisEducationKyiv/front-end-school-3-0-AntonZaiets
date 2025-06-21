export interface TrackPageState {
  page: number;
  sort: string;
  filter: Record<string, string>;
  searchTerm: string;
  isModalOpen: boolean;
  editingTrackId: string | null;
  deletingTrackId: string | null;
  selectedTracks: string[];
  isSelectMode: boolean;
  isBulkConfirmOpen: boolean;
}

export interface TrackPageActions {
  setPage: (page: number) => void;
  setSort: (sort: string) => void;
  setFilter: (type: string, value: string) => void;
  setSearchTerm: (searchTerm: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingTrackId: (id: string | null) => void;
  openNewTrackModal: () => void;
  openEditTrackModal: (id: string) => void;
  closeModal: () => void;
  setDeletingTrackId: (id: string | null) => void;
  setSelectedTracks: (updater: (prev: string[]) => string[]) => void;
  toggleTrackSelection: (id: string) => void;
  setIsSelectMode: (isSelectMode: boolean) => void;
  setIsBulkConfirmOpen: (isOpen: boolean) => void;
  resetSelection: () => void;
}
