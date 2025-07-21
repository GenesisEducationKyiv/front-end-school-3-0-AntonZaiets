import { Container, Paper } from '@mui/material';
import useTrackPageStore from '../../stores/trackPageStore';
import HeaderSection from '../../components/HeaderSection/HeaderSection.tsx';
import Container from '@/ui/Container';
import Paper from '@/ui/Paper';
import useTrackPageStore from '../../stores/trackPageStore';
import HeaderSection from '@/components/HeaderSection/HeaderSection.tsx';
import FiltersAndBulk from './components/FiltersAndBulk/FiltersAndBulk.tsx';
import Tracks from './components/Tracks/Tracks.tsx';
import React, { Suspense } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator.tsx';

const TrackModals = React.lazy(() => import('./components/TrackModals/TrackModals'));

const TrackPage = () => {
  const { isSelectMode, setIsSelectMode, openNewTrackModal } =
    useTrackPageStore();

  const handleToggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
  };

  return (
    <Container
      data-testid="track-page-container"
      disableGutters
      maxWidth={false}
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper
        data-testid="track-page-main"
        sx={{
          flex: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <HeaderSection
          data-testid="header-section"
          isSelectMode={isSelectMode}
          onToggleSelectMode={handleToggleSelectMode}
          onOpenModal={openNewTrackModal}
        />
        <FiltersAndBulk />
        <Tracks />
      </Paper>
      <Suspense fallback={<LoadingIndicator size={24} />}>
        <TrackModals />
      </Suspense>
    </Container>
  );
};

export default TrackPage;
