import useTrackPageStore from '../../../../stores/trackPageStore';
import { useTracksQuery, useDebounce } from '../../../../hooks';
import TracksListSection from '../../../../components/TrackList/TrackList.tsx';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator.tsx';
import { Typography } from '@mui/material';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination.tsx';

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
    data: tracksData,
    isLoading,
    isError,
  } = useTracksQuery({
    page,
    limit: 10,
    sort,
    filter,
    search: debouncedSearchTerm,
  });

  return (
    <>
      {isLoading ? (
        <LoadingIndicator data-testid="loading-indicator" />
      ) : isError ? (
        <Typography data-testid="error-message" color="error">
          Error loading tracks
        </Typography>
      ) : !tracksData ||
        !('tracks' in tracksData) ||
        tracksData.tracks.length === 0 ? (
        <Typography
          data-testid="no-tracks"
          variant="h6"
          align="center"
          sx={{ mt: 4 }}
        >
          No Tracks Available
        </Typography>
      ) : (
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
            totalPages={tracksData?.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
};

export default Tracks;
