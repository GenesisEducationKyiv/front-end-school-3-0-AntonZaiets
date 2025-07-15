import useTrackPageStore from '../../../../stores/trackPageStore';
import { useTracksQuery, useDebounce } from '../../../../hooks';
import TracksListSection from '../../../../components/TrackList/TrackList.tsx';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator.tsx';
import { Typography } from '@mui/material';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination.tsx';
import { TFetchTracksResponse } from '../../../../services/api/types';

const Tracks = () => {
  const {
    page,
    setPage,
    sort,
    filter,
    searchTerm,
    isSelectMode,
    selectedTracks,
    toggleTrackSelection,
    openEditTrackModal,
    setDeletingTrackId,
  } = useTrackPageStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    data: tracksData = { tracks: [], totalPages: 1, currentPage: 1 },
    isLoading,
    isError,
  } = useTracksQuery({
    page,
    limit: 10,
    sort,
    filter,
    search: debouncedSearchTerm,
  }) as { data: TFetchTracksResponse; isLoading: boolean; isError: boolean };

  if (isLoading) {
    return <LoadingIndicator data-testid="loading-indicator" />;
  }

  if (isError) {
    return (
      <Typography data-testid="error-message" color="error">
        Error loading tracks
      </Typography>
    );
  }

  if (!tracksData.tracks.length) {
    return (
      <Typography
        data-testid="no-tracks"
        variant="h6"
        align="center"
        sx={{ mt: 4 }}
      >
        No Tracks Available
      </Typography>
    );
  }

  return (
    <>
      <TracksListSection
        data-testid="tracks-list-section"
        tracksData={tracksData}
        isSelectMode={isSelectMode}
        selectedTracks={selectedTracks}
        onSelectTrack={toggleTrackSelection}
        onEditTrack={openEditTrackModal}
        onDeleteTrack={setDeletingTrackId}
      />
      <CustomPagination
        data-testid="pagination"
        currentPage={page}
        totalPages={tracksData.totalPages}
        onPageChange={setPage}
      />
    </>
  );
};

export default Tracks;
