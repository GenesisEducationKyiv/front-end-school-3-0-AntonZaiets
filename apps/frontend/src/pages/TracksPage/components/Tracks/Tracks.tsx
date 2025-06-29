import TracksListSection from '../../../../components/TrackList/TrackList.tsx';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator.tsx';
import { Typography } from '@mui/material';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination.tsx';
import { useEffect, useState } from 'react';

const Tracks = ({ state }) => {
  const [activeTrackTitle, setActiveTrackTitle] = useState<string>('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.activeTrackTitle !== undefined) {
          setActiveTrackTitle(data.activeTrackTitle);
        }
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <>
      {state.isLoading ? (
        <LoadingIndicator data-testid="loading-indicator" />
      ) : state.isError ? (
        <Typography data-testid="error-message" color="error">
          Error loading tracks
        </Typography>
      ) : state.tracksData?.tracks.length === 0 ? (
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
            tracksData={state.tracksData}
            isSelectMode={state.isSelectMode}
            selectedTracks={state.selectedTracks}
            onSelectTrack={state.handleSelectTrack}
            onEditTrack={(id) => {
              state.setEditingTrackId(id);
              state.setIsModalOpen(true);
            }}
            onDeleteTrack={(id) => state.setDeletingTrackId(id)}
          />
          <CustomPagination
            data-testid="pagination"
            currentPage={state.page}
            totalPages={state.tracksData?.totalPages}
            onPageChange={state.setPage}
          />
        </>
      )}
    </>
  );
};

export default Tracks;
