import Container from '@/ui/Container';
import Paper from '@/ui/Paper';
import { useTrackPageState } from '@/hooks';
import HeaderSection from '@/components/HeaderSection/HeaderSection.tsx';
import FiltersAndBulk from './components/FiltersAndBulk/FiltersAndBulk.tsx';
import Tracks from './components/Tracks/Tracks.tsx';
import React, { Suspense } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator.tsx';

const TrackModals = React.lazy(() => import('./components/TrackModals/TrackModals'));

const TrackPage = () => {
  const state = useTrackPageState();

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
          isSelectMode={state.isSelectMode}
          onToggleSelectMode={() => state.setIsSelectMode(!state.isSelectMode)}
          onOpenModal={() => state.setIsModalOpen(true)}
        />
        <FiltersAndBulk state={state} />
        <Tracks state={state} />
      </Paper>
      <Suspense fallback={<LoadingIndicator message="Loading modals..." />}>
      <TrackModals state={state} />
      </Suspense>
    </Container>
  );
};

export default TrackPage;
