import useTrackPageStore from '../../../../stores/trackPageStore';
import { useTracksQuery, useGenresQuery, useDebounce } from '../../../../hooks';
import FiltersSection from '../../../../components/TrackFilters/TrackFilters.tsx';
import BulkActionsSection from '../../../../components/BulkActionsSection/BulkActionsSection.tsx';
import { SelectChangeEvent } from '@mui/material';
import { TFetchTracksResponse } from '../../../../types/types.ts';

const FiltersAndBulk = () => {
  const {
    searchTerm,
    setSearchTerm,
    sort,
    setSort,
    filter,
    setFilter,
    isSelectMode,
    selectedTracks,
    setSelectedTracks,
    setIsBulkConfirmOpen,
    page,
  } = useTrackPageStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: genres } = useGenresQuery();
  const { data: tracksData = { tracks: [], totalPages: 1, currentPage: 1 } } =
    useTracksQuery({
      page,
      limit: 10,
      sort,
      filter,
      search: debouncedSearchTerm,
    }) as { data: TFetchTracksResponse };

  const handleToggleSelectAll = () => {
    setSelectedTracks((prev) =>
      prev.length === tracksData.tracks.length
        ? []
        : tracksData.tracks.map((t) => t.id)
    );
  };

  return (
    <>
      <FiltersSection
        data-testid="filters-section"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sort={sort}
        onSortChange={(e: SelectChangeEvent<string>) => setSort(e.target.value)}
        filter={filter}
        onFilterChange={setFilter}
        genres={genres}
        tracksData={tracksData}
      />
      <BulkActionsSection
        data-testid="bulk-actions-section"
        isSelectMode={isSelectMode}
        selectedTracks={selectedTracks}
        onToggleSelectAll={handleToggleSelectAll}
        onBulkDelete={() => setIsBulkConfirmOpen(true)}
        tracksData={tracksData}
      />
    </>
  );
};

export default FiltersAndBulk;
