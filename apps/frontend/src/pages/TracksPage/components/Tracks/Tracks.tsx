import useTrackPageStore from '../../../../stores/trackPageStore.ts';
import TracksListSection from '../../../../components/TrackList/TrackList.tsx';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator.tsx';
import { Typography } from '@mui/material';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination.tsx';
import { useEffect, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce.ts';
import { useTracksQuery } from '../../../../hooks';
import { TFetchTracksResponse } from '../../../../types/types.ts';
import { handleError } from '../../../../services/api/handleError.ts';

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
  const [activeTrackTitle, setActiveTrackTitle] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8082');
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.activeTrackTitle !== undefined) {
          setActiveTrackTitle(data.activeTrackTitle);
        }
      } catch (error) {
        handleError(error);
      }
    };

    ws.onerror = (error) => {
      handleError(error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

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
      <Typography
        variant="h6"
        align="center"
        sx={{ mt: 2, mb: 2 }}
        data-testid="active-track-title"
      >
        {activeTrackTitle
          ? `Active Track: ${activeTrackTitle}`
          : 'No active track'}
      </Typography>
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
  );
};

export default Tracks;
